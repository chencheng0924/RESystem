import { IVoice } from '@/lib/AIChat/interface/IVoice'
import { ref, Ref } from 'vue'
import { VoiceStatus } from '../model/Voice.model'
import { VoiceBase } from './voiceBase'
import { AzureConfig } from '../service/Azure.service'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
export class AzureVoice extends VoiceBase {
  private azureConfig?: AzureConfig
  private speechConfig?: sdk.SpeechConfig
  private audioConfig?: Ref<sdk.AudioConfig>
  private recognizer?: Ref<sdk.SpeechSynthesizer>
  private player?: Ref<sdk.SpeakerAudioDestination>
  private stream = null
  private isPlayingFlag = false;
  private audioContext = new AudioContext();
  private sourceNode: AudioBufferSourceNode | null = null;

  constructor() {
    super()
    this.audioConfig = ref(null)
    this.recognizer = ref(null)
    this.player = ref(null)

    this.azureConfig = new AzureConfig();
    this.speechConfig = this.azureConfig.getConfig();
    //this.speechInit();

  }

  get isPlaying(): boolean {
    return this.isPlayingFlag;
  }

  private async playAudioBuffer(arrayBuffer: ArrayBuffer) {
    const decoded = await this.audioContext.decodeAudioData(arrayBuffer.slice(0));
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = decoded;
    this.sourceNode.connect(this.audioContext.destination);
    this.sourceNode.onended = () => {
      console.log('語音播放完成');
      this.isPlayingFlag = false;
    };
    this.isPlayingFlag = true;
    this.sourceNode.start(0);
  }

  private speechInit() {
    this.stream = sdk.AudioOutputStream.createPullStream();
    this.audioConfig.value = sdk.AudioConfig.fromStreamOutput(this.stream);
    this.recognizer.value = new sdk.SpeechSynthesizer(this.speechConfig, this.audioConfig.value)
  }
  public startPlay(content: string) {
    this.speechInit();
    const buffer: number[] = [];
    this.isPlayingFlag = true;
    let self = this;

    this.setLoading()

    this.recognizer.value.speakTextAsync(content, async (result) => {
      self.setPlaying()
      const arrayBuffer = result.audioData; // 這是完整音訊資料
      await this.playAudioBuffer(arrayBuffer);
      self.recognizer.value?.close();
      self.recognizer.value = null;

    }, (error) => {

      console.error('TTS 合成錯誤:', error);
      self.recognizer.value?.close();
      self.recognizer.value = null;

    })
    // 收集音訊資料
    this.stream.read = (dataBuffer: ArrayBuffer) => {
      if (dataBuffer) {
        buffer.push(...new Uint8Array(dataBuffer));
      }
      return 0;
    };

  }

  public stopPlay() {

    console.log('stopPlay : ', this.isPlayingFlag)

    this.setStopped()
    if (this.sourceNode) {
      try {
        this.sourceNode.stop();
        this.sourceNode.disconnect();
      } catch (err) {
        console.warn('停止播放失敗或已停止');
      }
    }
    this.sourceNode = null;
    this.isPlayingFlag = false;

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
      },

    ]
  }
}