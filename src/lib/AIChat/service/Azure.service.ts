import { EnvUtils } from '@/utils/envUtils'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
let speechKey = EnvUtils.getSpeechKey()
let speechArea = EnvUtils.getSpeechArea()

export class AzureConfig {
    private speechConfig?: sdk.SpeechConfig

    constructor() {
        this.speechInit();
    }

    private speechInit() {
        
        this.speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechArea)
        const locale = JSON.parse(localStorage.getItem('chatRoomSettingNew'))?.STTLanguage
        this.speechConfig.speechRecognitionLanguage = locale?.key || 'zh-TW'
        this.speechConfig.speechSynthesisLanguage = locale?.key || 'zh-TW'
        this.speechConfig.speechSynthesisVoiceName = locale?.playerName || 'zh-TW-YunJheNeural'
        this.speechConfig.setProperty('SpeechServiceConnection_InitialSilenceTimeoutMs', '5000')
        this.speechConfig.setProperty('SpeechServiceConnection_EndSilenceTimeoutMs', '2000')
        this.speechConfig.setProperty('Speech_SegmentationSilenceTimeoutMs', '2000')
    }

    getConfig() {
        return this.speechConfig;
    }

}