import { IChat } from '../interface/IChat';
import { ChatSendParams } from '../model/Chat.model';
import { STAiAgentService } from '../service/STAIChatService';
import { AIChatStore, useAIChatStore } from '../store/AIChatStore';

export class F1Chat implements IChat {
  private chatSvc: STAiAgentService
  private AIChatStore: AIChatStore

  constructor() {
    this.chatSvc = new STAiAgentService()
    this.AIChatStore = useAIChatStore()
  }

  public async sendMessage(params: ChatSendParams): Promise<any> {
    console.log('F1Chat_sendMessage', params)
    let chatRoomSetting = this.AIChatStore.getChatSetting()
    return await this.chatSvc.getChatRoomDataNew(chatRoomSetting, params.roomId, params.message, params.uploadData, params.signal)
  }

  public sendMessageStream(params: ChatSendParams, callback) {
    console.log('F1ChatStream_sendMessage', params)
    let chatRoomSetting = this.AIChatStore.getChatSetting()
    return this.chatSvc.getChatRoomDataStream(chatRoomSetting, params.roomId, params.message, params.uploadData, params.signal, callback)
  }


}