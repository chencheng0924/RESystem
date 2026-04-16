import { defineStore } from 'pinia'
import { STAIChatDepsType } from '../model/STAIChat.model'
import { VoiceTypeOptions, VoiceType } from '../voice/voiceFactoryManager'
import { MicrophoneType, MicTypeOptions } from '../microphone/micFactoryManager'
import { ref } from 'vue'

export const useAIChatStore = defineStore('AIChat', () => {
  const chatRoomSetting = 'chatRoomSettingNew'
  const defaultSetting = {
    isDebug: false,
    userInitial: '',
    showSignalR: false,
    showFunctionCall: false,
    showTotalTime: true,
    STTSetting: MicTypeOptions.find(opt => opt.key === MicrophoneType.BNC),  // 語音監聽 mic
    TTSSetting: VoiceTypeOptions.find(opt => opt.key === VoiceType.BNC),  // 語音播放 voice
    isStream: true,
    isA2A: true
  }

  const setChatSetting = (settingData) => {
    localStorage.setItem(chatRoomSetting, JSON.stringify(settingData))
  }

  const getChatSetting = () => {
    let data = localStorage.getItem(chatRoomSetting)
    if (data) {
      return JSON.parse(data)
    } else {
      return defaultSetting
    }
  }

  const getMicType = () => {
    let setting = getChatSetting()
    return setting.STTSetting.key
  }

  const getVoiceType = () => {
    let setting = getChatSetting()
    return setting.TTSSetting.key
  }

  const setType = (depsType: STAIChatDepsType) => {
    const setting = getChatSetting() || defaultSetting
    const updatedSetting = {
      ...setting,
      STTSetting: depsType.microphone ? {
        key: depsType.microphone,
        value: MicTypeOptions.find(opt => opt.key === depsType.microphone)?.value
      } : defaultSetting.STTSetting,
      TTSSetting: depsType.voice ? {
        key: depsType.voice,
        value: VoiceTypeOptions.find(opt => opt.key === depsType.voice)?.value
      } : defaultSetting.TTSSetting
    }
    setChatSetting(updatedSetting)
  }

  const logData = ref([])

  const resetLogData = () => {
    logData.value = []
  }

  // 聊天中的 對話記錄
  const messageLogData = ref([])
  const resetMessageLogData = () => {
    messageLogData.value = []
  }

  return {
    defaultSetting,
    setChatSetting,
    getChatSetting,
    getMicType,
    getVoiceType,
    setType,
    logData,
    resetLogData,

    messageLogData,
    resetMessageLogData
  }
})

export type AIChatStore = ReturnType<typeof useAIChatStore>