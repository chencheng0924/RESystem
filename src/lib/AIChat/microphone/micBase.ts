import { ref, Ref } from 'vue'
import { IMicrophone } from '../interface/IMicrophone'
import { MicStatus } from '../model/Mic.model'

export abstract class MicBase implements IMicrophone {
  public recordStatus: Ref<MicStatus>
  abstract resultText: Ref<string>

  constructor() {
    this.recordStatus = ref(MicStatus.STOPPED)
  }

  public setRecording() {
    this.recordStatus.value = MicStatus.RECORDING
  }
  public setStopped() {
    this.recordStatus.value = MicStatus.STOPPED
  }
  public setLoading() {
    this.recordStatus.value = MicStatus.LOADING
  }

  abstract startRecord(): void
  abstract stopRecord(): void
  abstract getTTSLanguage(): any
}