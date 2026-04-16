import { IAIChatDeps } from "./interface/IAIChatDeps";
import { MicrophoneFactoryManager, MicrophoneType } from '@/lib/AIChat/microphone/micFactoryManager'
import { VoiceFactoryManager, VoiceType } from "./voice/voiceFactoryManager";
import { ChatFactoryManager, ChatType } from "./chat/chatFactoryManager";

export class STAIChatBuilder {
  private _micType?: MicrophoneType
  private _voiceType?: VoiceType
  private _chatType?: ChatType
  // TODO: 這裡之後再看有什麼type定義
  private _toolbarType?: any
  private _messageToolbarType?: any
  private _uploadType?: any


  constructor() {
  }

  setMicType(type: MicrophoneType) {
    this._micType = type
    return this
  }

  setVoiceType(type: VoiceType) {
    this._voiceType = type
    return this
  }

  setChatType(type: ChatType) {
    this._chatType = type
    return this
  }

  setToolbarType(type: any) {
    this._toolbarType = type
    return this
  }

  setMessageToolbarType(type: any) {
    this._messageToolbarType = type
    return this
  }

  setUploadType(type: any) {
    this._uploadType = type
    return this
  }

  build(): IAIChatDeps {
    const mic = MicrophoneFactoryManager.getInstance().getMicrophone(this._micType)
    const voice = VoiceFactoryManager.getInstance().getVoice(this._voiceType)
    const chat = ChatFactoryManager.getInstance().getChat(this._chatType)

    // TODO: 其他功能依賴

    return {
      microphone: mic,
      voice: voice,
      chat,
      // upload,
      // toolbar,
      // messageToolbar
    }
  }
}