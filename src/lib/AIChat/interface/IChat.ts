import { ChatSendParams } from "../model/Chat.model";

export interface IChat {
  sendMessage(params: ChatSendParams): Promise<any>;
  sendMessageStream(params: ChatSendParams, callback);

}