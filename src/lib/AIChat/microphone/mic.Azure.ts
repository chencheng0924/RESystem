import { ref, Ref } from "vue";
import { IMicrophone } from "../interface/IMicrophone"
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { MicBase } from "./micBase";
import { EnvUtils } from "@/utils/envUtils";
import { AzureConfig } from "../service/Azure.service";
let speechKey = EnvUtils.getSpeechKey()
let speechArea = EnvUtils.getSpeechArea()

export class AzureMicrophone extends MicBase {
  private azureConfig?: AzureConfig
  private speechConfig?: sdk.SpeechConfig
  private audioConfig?: Ref<sdk.AudioConfig>
  private recognizer?: Ref<sdk.SpeechRecognizer>
  public tempResult: Ref<string>

  constructor() {
    super()
    this.audioConfig = ref(null)
    this.recognizer = ref(null)
    this.tempResult = ref('')
    this.azureConfig = new AzureConfig();
    this.speechConfig = this.azureConfig.getConfig();

  }

  private speechInit() {
    this.setLoading()

    this.tempResult.value = ''
    this.audioConfig.value = sdk.AudioConfig.fromDefaultMicrophoneInput()
    this.recognizer.value = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig.value)

    this.recognizer.value.recognizing = (s, e) => this.processRecognizingTranscript(e)
    this.recognizer.value.recognized = (s, e) => this.processRecognizedTranscript(e)
  }

  // 收音結束 觸發
  private processRecognizedTranscript(event) {
    const result = event.result
    if (result.reason == sdk.ResultReason.RecognizedSpeech) {
      const transcript = result.text
      this.tempResult.value = transcript
      console.log('processRecognizedTranscript 1 : ', this.tempResult.value)
      //this.setStopped()
    }
  }
  // 收音中 觸發
  private processRecognizingTranscript(event) {
    const result = event.result
    if (result.reason == sdk.ResultReason.RecognizingSpeech) {
      const transcript = result.text
      //this.tempResult.value = transcript
    }
  }

  private speechRecording() {
    this.recognizer.value.recognizeOnceAsync(() => {
      //console.log('recognizeOnceAsync')

      this.setStopped()
    })
  }

  async startRecord() {
    try {
      console.log("start Azure 啟動語音")
      this.speechInit()
      this.speechRecording()
      this.setRecording()
    } catch (error) {
      console.error('啟動語音辨識失敗:', error)
      this.setStopped()
    }
  }

  stopRecord() {
    try {
      this.recognizer.value.stopContinuousRecognitionAsync(
        () => {
          this.setStopped()
        },
        (error) => {
          this.setStopped()
        }
      )
    } catch (error) {
      this.setStopped()
    }
  }

  public get resultText() {
    return this.tempResult
  }

  public getTTSLanguage() {
    return [
      {
        'playerName': 'zh-TW-YunJheNeural',
        'key': 'zh-TW',
        'value': '中文'
      },
      {
        'playerName': 'en-US-AvaMultilingualNeural',
        'key': 'en-US',
        'value': '英文'
      }
    ]
  }
}