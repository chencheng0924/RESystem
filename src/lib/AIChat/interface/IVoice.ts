import { Ref } from "vue"
import { VoiceStatus } from "../model/Voice.model"

export interface IVoice {
  startPlay(content: string): void
  stopPlay?(): void
  playStatus: Ref<VoiceStatus>
  getTTSLanguage(): any
}
