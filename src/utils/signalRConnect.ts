import * as signalR from '@microsoft/signalr'
import { ref } from 'vue'

import { commandTriggerStore } from "@/stores/command/commandTrigger";
import { CommandFactory } from '@/lib/commandFactory/CommandFactory';
export class connectSignalR {
  private connection
  private cmd
  private store: any
  constructor() {
    this.connection = ref(null)
    this.cmd = new CommandFactory()
    this.store = commandTriggerStore()
  }

  public async connect() {
    this.connection = new signalR.HubConnectionBuilder().withUrl(import.meta.env.VITE_EVENTHUB_URL, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).withAutomaticReconnect().build();
    this.connection.on('GreetingEvent', (message) => {
      const data = JSON.parse(message)
      console.log('data', data)
      const command = this.cmd.signalRToCommand(data.data[0])
      this.cmd.run(command, data.sessionId);
    });
    this.connection.on("GroupEvent", (groupId: string, message: string) => {
      const data = JSON.parse(message)
      console.log('data', data)
      // 查詢民權一路攝影機畫面
      // 顯示28路公車的公車動態
      // 2023年所有路線的準點率和利用率是多少？
      if (data.data[0].content == 'TEST') {
        data.data[0].elementName = 'Host'
        data.data[0].content = 'showAlert msg="{"UID":"A-IN-2024-177936","AuthorityName":"工務局","Title":"道路挖掘／人孔蓋","AdminArea":"前鎮區","Address":"前鎮區瑞興里19鄰瑞愛街29巷1號","Lat":22.607993,"Lon":120.329217,"StartDate":"2024-08-30 10:15:29","EndDate":"2024-08-30 11:00:00","Description":"顯示39路公車的公車動態​","Results":"","Status":"已轉權責機關處理","SrcUpdateTime":"2024-08-30T00:00:00.000Z","UpdateTime":"2024-08-30 00:00:00","InfoTime":"2024-08-30 00:00:00","InfoDate":"2024-08-30","ETL_DTM":"2024-08-30 11:30:11"}"'
        // data.data[0].elementName = 'chart'
        // data.data[0].content = 'showHighchart options="{"content":{"chart_type":"spline","config":{"series":[{"data":[54,74,9,3],"name":"高雄站","stack":"0","type":"spline","xAxis":0,"yAxis":0},{"data":[50,32,25,22],"name":"楠梓站","stack":"0","type":"spline","xAxis":0,"yAxis":0}],"xAxis":[{"categories":["2020","2021","2022","2023"],"opposite":0,"title":{"text":"M3持有率"}}],"yAxis":[{"opposite":0,"title":{"text":"車輛數"}}]}},"type":"chart"}"'
      }
      const command = this.cmd.signalRToCommand(data.data[0])
      this.store.allCommandList.push({ sessionId: data.sessionId, commandText: command })
      this.cmd.run(command, data.sessionId);
    });
    this.connection.on('PersonalEvent', (message) => {
      const data = JSON.parse(message)
      console.log('data', data)
      const command = this.cmd.signalRToCommand(data.data[0])
      this.cmd.run(command);
    });
    await this.connection.start().then(async () => {
      // await this.send('JoinGroup', import.meta.env.VITE_CHATROOM_KEY)
      const chatRoomKey = localStorage.getItem('chatRoomId')
      console.log('chatRoomKey', chatRoomKey)
      if (chatRoomKey) {
        await this.send('JoinGroup', chatRoomKey)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  public async send(methodName: string, user: any) {
    await this.connection.invoke(methodName, user).catch(error => {
      console.log(error)
    })
  }

  public async sendTestSignalR(id: string) {
    //await this.aiSvc.sendTestSignalR(id)
  }

  public changeObject(object: any) {
    const obj = JSON.parse(object)
    const processedObj = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        processedObj[key] = value.replace(/[/]/g, '')
      } else {
        processedObj[key] = value
      }
    }
    return processedObj
  }
}