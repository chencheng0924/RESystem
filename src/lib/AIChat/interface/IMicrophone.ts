import { Ref } from "vue"
import { MicStatus } from "../model/Mic.model"

export interface IMicrophone {
  startRecord(): void
  stopRecord(): void
  recordStatus: Ref<MicStatus>
  resultText: Ref<string> // 語音轉文字的結果
  getTTSLanguage(): any // 取得TTS語言列表
}