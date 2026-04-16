import { IMicrophone } from '@/lib/AIChat/interface/IMicrophone'
import { BNCMicrophone } from './mic.BNC'
import { AzureMicrophone } from './mic.Azure'
import { AIChatStore, useAIChatStore } from '@/lib/AIChat/store/AIChatStore'

export enum MicrophoneType {
  BNC = 'bnc',
  AZURE = 'azure'
}

export const MicTypeOptions = [
  { key: MicrophoneType.BNC, value: '長問', optionsList: new BNCMicrophone().getTTSLanguage() },
  { key: MicrophoneType.AZURE, value: 'Azure', optionsList: new AzureMicrophone().getTTSLanguage() }
]

export class MicrophoneFactoryManager {
  private static instance: MicrophoneFactoryManager
  private microphoneMap: Map<MicrophoneType, () => IMicrophone>
  private defaultType: MicrophoneType
  private AIChatStore: AIChatStore

  private constructor() {
    this.AIChatStore = useAIChatStore()
    this.microphoneMap = new Map()
    // TODO: 註冊其他microphone實作
    this.registerMicrophone(MicrophoneType.BNC, () => new BNCMicrophone())
    this.registerMicrophone(MicrophoneType.AZURE, () => new AzureMicrophone())
  }

  static getInstance() {
    if (!this.instance) this.instance = new MicrophoneFactoryManager()
    return this.instance
  }

  registerMicrophone(type: MicrophoneType, creator: () => IMicrophone) {
    this.microphoneMap.set(type, creator)
  }

  setDefault(type: MicrophoneType) {
    this.defaultType = type
  }

  getMicrophone(type?: MicrophoneType): IMicrophone {
    // 1. 參數優先
    // 2. 沒有參數就用預設設定(from localStorage 或 store預設)

    let micType = this.AIChatStore.getMicType()
    console.log('micType:', micType)
    this.setDefault(micType)

    // const useType = type || this.defaultType
    const useType = this.defaultType
    const creator = this.microphoneMap.get(useType)
    if (!creator) throw new Error('沒這麥克風種類')
    return creator()
  }
}