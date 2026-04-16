import * as signalR from '@microsoft/signalr'
import { ref } from 'vue'
import { CommandFactory } from './commandUse'
export class connectSignalR {
  private connection
  private cmd
  constructor() {
    this.connection = ref(null)
    this.cmd = new CommandFactory()
  }

  public async connect(url: string) {
    this.connection = new signalR.HubConnectionBuilder().withUrl(url, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).withAutomaticReconnect().build();
    // this.connection.on('事件方法', (接收參數) => {
    //   處理邏輯
    // })
    this.connection.on('GreetingEvent', (message) => {
      const data = JSON.parse(message)
      console.log('data', data)
      const command = this.cmd.signalRToCommand(data.data[0])
      this.cmd.run(command, data.sessionId);
    });
    await this.connection.start().then(async() => {
      // 若可以取得聊天室id，可先建立連線
      // const chatRoomKey = localStorage.getItem('chatRoomId')
      // if(chatRoomKey){
      //   await this.send('JoinGroup', chatRoomKey)
      // }
    }).catch(error => {
      console.log(error)
    })
  }

  public async send(methodName:string, user:any) {
    await this.connection.invoke(methodName, user).catch(error => {
      console.log(error)
    })
  }
}