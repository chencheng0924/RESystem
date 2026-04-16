import { IVoice } from '@/lib/AIChat/interface/IVoice'
import { BrowserVoice } from './voice.browser'
import { BNCVoice } from './voice.BNC'
import { AIChatStore, useAIChatStore } from '@/lib/AIChat/store/AIChatStore'
import { AzureVoice } from './voice.Azure'

export enum VoiceType {
  BNC = 'bnc',
  BROWSER = 'browser',
  AZURE = 'azure',
}

export const VoiceTypeOptions = [
  { key: VoiceType.BNC, value: '長問', optionsList: new BNCVoice().getTTSLanguage() },
  { key: VoiceType.BROWSER, value: '瀏覽器內建', optionsList: new BrowserVoice().getTTSLanguage() },
  { key: VoiceType.AZURE, value: 'Azure', optionsList: new AzureVoice().getTTSLanguage() },
]

export class VoiceFactoryManager {
  private static instance: VoiceFactoryManager
  private voiceMap: Map<VoiceType, () => IVoice>
  private defaultType: VoiceType
  private AIChatStore: AIChatStore

  private constructor() {
    this.AIChatStore = useAIChatStore()
    this.voiceMap = new Map()
    this.registerVoice(VoiceType.BROWSER, () => new BrowserVoice())
    this.registerVoice(VoiceType.BNC, () => new BNCVoice())
    this.registerVoice(VoiceType.AZURE, () => new AzureVoice())
  }

  static getInstance() {
    if (!this.instance) this.instance = new VoiceFactoryManager()
    return this.instance
  }

  registerVoice(type: VoiceType, creator: () => IVoice) {
    this.voiceMap.set(type, creator)
  }

  setDefault(type: VoiceType) {
    this.defaultType = type
  }

  getVoice(type?: VoiceType): IVoice {
    // 1. 參數優先
    // 2. 沒有參數就用預設設定(from localStorage 或 store預設)

    let voiceType = this.AIChatStore.getVoiceType()
    console.log('voiceType', voiceType)
    this.setDefault(voiceType)

    const useType = this.defaultType
    const creator = this.voiceMap.get(useType)
    if (!creator) throw new Error('沒這播放種類')
    return creator()
  }
}