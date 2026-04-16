import { IChat } from "./IChat";
import { IMicrophone } from "./IMicrophone";
import { IVoice } from "./IVoice";
import { IUpload } from "./IUpload";
import { IToolbar } from "./IToolbar";
import { IMessageToolbar } from "./IMessageToolbar";
import { ShallowRef } from 'vue'

export interface IAIChatDeps {
  voice: IVoice;
  microphone: IMicrophone;
  chat: IChat;
  // upload: IUpload;
  // toolbar: IToolbar;
  // messageToolbar: IMessageToolbar;
}