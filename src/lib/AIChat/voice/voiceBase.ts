import { ref, Ref } from 'vue'
import { VoiceStatus } from '../model/Voice.model'
import { IVoice } from '../interface/IVoice'

export abstract class VoiceBase implements IVoice {
  public playStatus: Ref<VoiceStatus>

  constructor() {
    this.playStatus = ref(VoiceStatus.STOPPED)
  }

  public setPlaying() {
    this.playStatus.value = VoiceStatus.PLAYING
  }
  public setStopped() {
    this.playStatus.value = VoiceStatus.STOPPED
  }
  public setLoading() {
    this.playStatus.value = VoiceStatus.LOADING
  }

  abstract startPlay(content: string): void
  abstract stopPlay(): void
  abstract getTTSLanguage(): any
}