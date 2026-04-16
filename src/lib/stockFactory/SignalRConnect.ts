import { ref } from 'vue'
import * as signalR from '@microsoft/signalr'
import { IStockStrategy } from './IStockStrategy';
import { StockEventItem } from './StockEventItem';
import { Command } from '../commandFactory/CommandFactory';
import { useAIChatStore } from '@/lib/AIChat/store/AIChatStore';
import moment from 'moment';
import axios from 'axios';
import { SignalRElementLog, SignalREvent } from './SignalREvent.model';

export class SignalRConnect implements IStockStrategy {
    connection = null;
    private url?: string;
    private events: Array<StockEventItem> = [];

    private store = useAIChatStore()
    private _chatRoomId?: string = '';
    constructor(url?: string) {
        this.url = url;
        // this.connection = new signalR.HubConnectionBuilder().withUrl(url, {
        //     skipNegotiation: true,
        //     transport: signalR.HttpTransportType.WebSockets
        // })
        //     .withAutomaticReconnect()
        //     .build();

        this.setEvents();
    }
    private setEvents() {
        let self = this;
        let roomId = this._chatRoomId;
        this.events = [
            new StockEventItem({
                eventName: 'GreetingEvent', callBack: (message) => {
                    const data = JSON.parse(message)
                    console.log('GreetingEvent', data)
                }
            }),
            new StockEventItem({
                eventName: 'GroupEvent', callBack: (message, mydata) => {
                    try {
                        const data = JSON.parse(mydata)
                        console.log('GroupEvent', data)
                        self.ShowGroupEvent(data, roomId)
                    } catch {
                        console.log("GroupEvent data parse error")
                    }

                }
            }),
            new StockEventItem({
                eventName: 'PersonalEvent', callBack: (message) => {
                    const data = JSON.parse(message)
                    console.log('PersonalEvent', data)
                }
            }),

        ];
    }
    public setChatRoomId(id) {
        this._chatRoomId = id;
        return this;
    }

    public async startConnect(url?: string, callback?: Function) {
        let roomId = this._chatRoomId;
        if (this.connection == null) {
            //this.url = url;
            const res = await axios.post(`${this.url}/negotiate`);
            const negotiateData = res.data;
            // 如果 Azure SignalR Service 有 url 和 accessToken，則使用 negotiate 方式連線
            if (negotiateData?.url && negotiateData?.accessToken) {
                console.log("使用 negotiate 方式連線");
                this.connection = new signalR.HubConnectionBuilder()
                    .withUrl(negotiateData.url, {
                        accessTokenFactory: () => negotiateData.accessToken,
                        skipNegotiation: true,
                        transport: signalR.HttpTransportType.WebSockets
                    })
                    .withAutomaticReconnect()
                    .configureLogging(signalR.LogLevel.Information)
                    .build();
            } else if (this.url) {
                console.log("使用直接連線方式");
                // 如果沒有 negotiate，則直接使用提供的 URL 連線
                this.connection = new signalR.HubConnectionBuilder().withUrl(this.url, {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                    .withAutomaticReconnect()
                    .build();
            }

            // this.connection = new signalR.HubConnectionBuilder().withUrl(url, {
            //     skipNegotiation: true,
            //     transport: signalR.HttpTransportType.WebSockets
            // }).withAutomaticReconnect().build();

            this.connection.onreconnected(async (connectionId) => {
                console.log(`🔁 Reconnected (connectionId=${connectionId})`);

                if (roomId) {
                    console.log(`Rejoining group ${roomId}`);
                    await this.send('JoinGroup', roomId);
                }
            });
            this.connection.onclose((error) => {
                console.warn('Connection closed', error);
            });
        }



        this.registerEvent();

        await this.connection.start().then(async () => {

            const connectionId = await this.connection.invoke("GetConnectionId");

            console.log("connectionId: ", connectionId);

            if (connectionId && roomId) {
                console.log(`startConnect-->JoinGroup ${roomId}`);
                await this.send('JoinGroup', roomId);
            } else {
                console.warn("connectionId 尚未就緒，無法加群組");
            }

        }).catch(error => {
            console.log(error)
        })

    }
    public async disConnect(callback?: Function) {
        let roomId = this._chatRoomId;
        if (roomId) {
            console.log(`disConnect-->LeaveGroup ${roomId}`);
            await this.send('LeaveGroup', roomId)
        }
        await this.connection.stop().then(async () => {
            if (callback)
                callback();
        }).catch(error => {
            console.log(error)
        })
    }
    public registerEvent() {
        let self = this;
        if (this.connection == null)
            return this;
        if (this.events.length == 0)
            return this;

        // 先移除所有舊的事件監聽
        this.events.forEach((x) => {
            self.connection.off(x.eventName);
        });

        this.events.forEach((x) => {
            let ev = x.eventName;
            self.connection.on(x.eventName, (message, data) => {
                console.log(`${ev} , ${message}`)
                x.callBack(message, data);
            });
        })
        // console.log(this.connection)

    }
    public async send(event: string, data: any) {
        await this.connection.invoke(event, data).catch(error => {
            console.log(error)
        });
    }


    private ShowGroupEvent(data, roomId) {

        let sEvent = new SignalREvent(data);
        let obj: SignalRElementLog = sEvent.getElement(roomId);
        let currentLog: SignalRElementLog = this.store.logData.find(x => x.id == obj.getID());
        if (currentLog == null) {
            this.store.logData.push(obj)
        }
        else {
            if (obj.type.indexOf("FlowAgent") != -1) {
                if (currentLog.data != null && currentLog.data.length > 0) {
                    console.log('obj', obj)
                    let oneData = currentLog.data.firstOrDefault();
                    for (let i = 0; i < obj.data?.length; i++) {

                        oneData['Content'] += SignalRElementLog.getContent(obj.data[i]['Content']);


                    }

                } else {
                    currentLog.data = [];
                    currentLog.data = currentLog.data.concat(obj.data);
                }
            } else {
                console.log('obj', obj)
            }


        }

    }

}