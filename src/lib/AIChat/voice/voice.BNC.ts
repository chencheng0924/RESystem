import { PlayerAudioPARA } from '@/lib/AIChat/model/BNC.model'
import { BNCPlayService } from '@/lib/AIChat/service/voice.BNC.service'
import { VoiceBase } from './voiceBase'

export class BNCVoice extends VoiceBase {
  private bncPlayService: BNCPlayService
  private audioInstance: HTMLAudioElement = null

  constructor() {
    super()
    this.bncPlayService = new BNCPlayService()
  }

  public async startPlay(content: string) {
    this.setLoading()
    const playerAudioPARA = new PlayerAudioPARA()
    const chatSetting = JSON.parse(localStorage.getItem('chatRoomSettingNew'))
    playerAudioPARA.voice.languageCode = chatSetting.TTSLanguage.key
    playerAudioPARA.voice.name = chatSetting.TTSLanguage.playerName
    // playerAudioPARA.voice.languageCode = 'nan-TW'
    // playerAudioPARA.voice.name = 'nan-TW-vs2-F01'
    playerAudioPARA.input.text = content
    const bncLoginResult = await this.bncPlayService.BNCLoginTTS()
    if (bncLoginResult) {
      // const BNCModelResult = await this.bncPlayService.BNCModelsGET(bncLoginResult.token)
      // const BNCTextTypeResult = await this.bncPlayService.BNCTextTypeOptionsGET(bncLoginResult.token)
      const BNCTTSResult = await this.bncPlayService.SynthesizePOST(bncLoginResult.token , playerAudioPARA)
      if (BNCTTSResult) {
        this.setPlaying()
        const audioUrl = URL.createObjectURL(BNCTTSResult);
        const audio = new Audio(audioUrl);
        this.audioInstance = audio
        audio.play();
        audio.addEventListener('ended', () => {
            this.setStopped()
        });
      } else {
        this.setStopped()
        console.error('播放失敗')
      }
    }
  }

  public stopPlay() {
    if(this.audioInstance) {
      this.audioInstance.pause()
      this.audioInstance.currentTime = 0
      this.audioInstance = null
    }
    this.setStopped()
  }

  public getTTSLanguage() {
    return [
      {
        'playerName':'cmn-TW-vs2-F01',
        'key':'cmn-TW',
        'value':'中文'
      },
      {
        'playerName':'nan-TW-vs2-F01',
        'key':'nan-TW',
        'value':'台語'
      }
    ]
  }
}