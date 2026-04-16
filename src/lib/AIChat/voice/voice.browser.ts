import { IVoice } from '@/lib/AIChat/interface/IVoice'
import { Ref } from 'vue'
import { VoiceStatus } from '../model/Voice.model'
import { VoiceBase } from './voiceBase'
export class BrowserVoice extends VoiceBase {
  public startPlay(content: string) {
    if ('speechSynthesis' in window) {
      this.setLoading()
      const utterance = new SpeechSynthesisUtterance(content)
      // TODO: 設定語言
      // utterance.lang = this.locale.value
      utterance.lang = 'zh-TW'
      
      utterance.onstart = () => {
        this.setPlaying()
      }
      
      utterance.onend = () => {
        this.setStopped()
      }
      
      utterance.onerror = () => {
        this.setStopped()
        console.warn('語音播放被暫停或發生錯誤')
      }
      
      speechSynthesis.speak(utterance)
    } else {
      console.error('瀏覽器不支持語音合成')
      this.setStopped()
    }
  }

  public stopPlay() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
    this.setStopped()
  }

  public getTTSLanguage() {
    return [
      {
        'playerName':'cmn-TW-vs2-F01',
        'key':'cmn-TW',
        'value':'中文'
      }
    ]
  }
}