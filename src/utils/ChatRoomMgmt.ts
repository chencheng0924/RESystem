import { SignalRConnect } from "@/lib/stockFactory/SignalRConnect";
let signalRURL = import.meta.env.VITE_EVENTHUB_URL

export class ChatRoomMagement {
    private signalRInstance?: SignalRConnect
    private openSignalR: boolean = true;
    private chatRoomId?: string = ''
    private agentId?: string = ''
    private userId?: string = ''
    private storageKey: string = '';

    constructor(agentid: string, userid: string) {
        this.agentId = agentid;
        this.userId = userid;
        this.storageKey = `${this.agentId}_${this.userId}`;
    }

    getChatRoomId() {
        this.chatRoomId = localStorage.getItem(this.storageKey);
        if (this.chatRoomId == "null")
            return '';
        return this.chatRoomId ?? '';
    }
    setChatRoomId(chatroomid: string) {
        if (this.storageKey == null || this.storageKey == '') {
            console.log('setChatRoomId storageKey is empty ')
            return this;
        }

        this.chatRoomId = chatroomid;
        localStorage.setItem(this.storageKey, chatroomid);
        return this;
    }

    //-----------------------------------------------------------------------------------------

    setOpenSignalR(open: boolean) {
        this.openSignalR = open;
        return this;
    }
    startSignalR() {
        if (this.openSignalR == false)
            return this;


        if (this.signalRInstance == null) {
            this.signalRInstance = new SignalRConnect(signalRURL)
        }

        this.signalRInstance.setChatRoomId(this.chatRoomId);

        // 註冊
        this.signalRInstance.registerEvent();
        this.signalRInstance.startConnect(signalRURL);

    }
    endSignalR() {
        if (this.signalRInstance == null) {
            return;
        }
        this.signalRInstance.setChatRoomId(this.chatRoomId);
        this.signalRInstance.disConnect();
    }

}