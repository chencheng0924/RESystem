import { MicrophoneType } from "@/lib/AIChat/microphone/micFactoryManager";
import { VoiceType } from "@/lib/AIChat/voice/voiceFactoryManager";
import { ChatType } from "@/lib/AIChat/chat/chatFactoryManager";

export class PageAIChatDepsType {
  microphone: MicrophoneType
  voice: VoiceType
  chat: ChatType
  // TODO: 這裡之後再看有什麼type定義
  toolbar: any
  messageToolbar: any
  upload: any

  constructor(init?: Partial<PageAIChatDepsType>) {
    Object.assign(this, init);
  }

  setMicType(type: MicrophoneType) {
    this.microphone = type
    return this
  }

  setVoiceType(type: VoiceType) {
    this.voice = type
    return this
  }

  setChatType(type: ChatType) {
    this.chat = type
    return this
  }

  setToolbarType(type: any) {
    this.toolbar = type
    return this
  }

  setMessageToolbarType(type: any) {
    this.messageToolbar = type
    return this
  }

  setUploadType(type: any) {
    this.upload = type
    return this
  }
}