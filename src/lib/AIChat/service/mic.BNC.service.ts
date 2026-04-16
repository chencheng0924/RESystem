import { ref, Ref } from 'vue'
import axios from 'axios'

import { EnvUtils } from '@/utils/envUtils';
import { Parser } from '../microphone/Parser'
import { WebsocketAccessInfoReslut } from '../model/BNC.model';
let stream: MediaStream | null = null;

let routerPath = EnvUtils.getRouterPath();
export class BNCService {
    private BNCURI: string
    private mode: string
    private model: string
    private sampleRate: number
    private websocket: any
    private cb: any
    private wsUrl: string
    private parser: any
    private device: string
    private audioContext: any
    private channel: number
    private interval: any
    private chunks: Array<[]>
    public txtResult: Ref<string>
    public dealWithStatus: Ref<any>

    public recordingStatus: Ref<boolean>// true 錄音中 , false 錄音停

    constructor() {
        this.BNCURI = 'https://asr-azure.bronci.com.tw:8451'
        // this.BNCURI = 'https://10.36.235.242'
        this.mode = 'raw'
        this.model = 'basic-model'
        this.sampleRate = 16000
        this.websocket = null
        this.cb = null
        this.wsUrl = ''
        this.parser = new Parser()
        this.device = 'default'
        this.audioContext = null
        this.channel = 1
        this.interval = null
        this.chunks = []
        this.txtResult = ref('')
        this.dealWithStatus = ref('服務準備中')

        this.recordingStatus = ref(false)
    }
    // 取得長問登入Token
    public async BNCLogin() {
        const POST_PARA = {
            "username": "ASR0816_04541302",
            "password": "Api081604541302"
        }
        return axios.post(`${this.BNCURI}/api/v1/login`, POST_PARA, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {
                const result = res.data
                return result
            }
        }).catch((err) => {
            console.log('err', err)
            return null
        })
    }

    // 取得 ASR 系統的 websocket 訪問資訊
    public async getWebsocketAccessInfo(token) {
        return axios.get(`${this.BNCURI}/api/v1/streaming/transcript/access-info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.status === 200) {
                const result = res.data
                return result
            }
        }).catch((err) => {
            console.log('err', err)
            return null
        })
    }

    // 連接到 ASR and Parser websocket
    public async connectWebsocket(bncWebsocketAccessInfoResult: WebsocketAccessInfoReslut) {
        return new Promise((resolve, reject) => {
            this.wsUrl = bncWebsocketAccessInfoResult.data[0].url + `?ticket=${bncWebsocketAccessInfoResult.data[0].ticket}&rate=${this.sampleRate}&modelName=${this.model}&type=${this.mode}`
            console.log('this.wsUrl', this.wsUrl)
            this.websocket = new WebSocket(this.wsUrl);
            this.websocket.binaryType = "arraybuffer";
            this.websocket.onopen = () => {
                console.log("ASR service websocket opened");
                resolve("websocket connected!");
            };
            this.websocket.onmessage = (e) => {
                const data = JSON.parse(e.data)
                console.log('data', data)
                if (data.code === 180) {

                    this.recordingStatus.value = true  // 錄音開始
                }
                this.dealWithStatus.value = data.code === 100 ? data.message : '服務準備中'
                this.dealWithStatus.value = data.code === 180 ? data.message : '服務準備中'
                if (data.result && data.result?.[0]?.transcript?.length > 0) {
                    data.result[0].transcript = data.result[0].transcript
                        .replace(/<sil>/gi, "")
                        .replace(/<unk>/gi, "")
                        .replace(/\n/gi, "");

                    if (data.result[0].transcript.length > 0) {
                        // this.cb(data);
                        this.txtResult.value = data.result[0]?.transcript ?? ''
                        console.log('data.result[0]', data.result[0])
                        // 將最終結果傳送給 Parser
                        if (data.result[0].final === 1) {
                            this.parser.send(data.result[0].transcript);
                        }
                    }
                } else {
                    //   this.cb(data);
                }
            };

            this.websocket.onclose = (event) => {
                // this.cb({ status: "closed", message: "websocket closed" });
                this.parser.close();
                console.log("ASR service websocket closed");
            };

            this.websocket.onerror = (e) => {
                // this.cb({ status: "error", message: e });
                console.log("ASR service websocket error ", e);
                this.parser.close();
                reject(e);
            };
        });
    }

    // 處理麥克風資料
    public async rawDataHandler() {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            // audio: {
            //   deviceId: {
            //     exact: this.device,
            //   },
            //   noiseSuppression: false,
            //   autoGainControl: false,
            // },
            video: false,
        });
        this.handleStream(stream)
    }

    //處理及時性的聲音資料
    public async handleStream(stream) {
        const AudioContext = (window.AudioContext || (window as any).webkitAudioContext);
        if (!this.audioContext) {
            this.audioContext = new AudioContext({
                sampleRate: this.sampleRate,
            });
        }
        const source = this.audioContext.createMediaStreamSource(stream);
        console.log('this.audioContext', this.audioContext)
        try {
            console.log('BASE_URL', routerPath)
            await this.audioContext.resume();
            await this.audioContext.audioWorklet.addModule(
                `${routerPath}convert-bits-worklet.js`
            );
        } catch (error) {
            throw new Error(`AudioContext error: ${error}`);
        }
        const processNode = new AudioWorkletNode(
            this.audioContext,
            "convert-bits-processor",
            {
                channelCount: this.channel,
            }
        );
        processNode.port.onmessage = (e) => {
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                if (e.data.eventType === "data") {
                    this.websocket.send(e.data.audioBuffer);

                }
            }
        };

        // get bits from audio worklet every 1 second
        this.interval = setInterval(() => {
            processNode.port.postMessage({
                eventType: "ping",
            });
        }, 1000);

        source.connect(processNode).connect(this.audioContext.destination);
    }

    // 停止錄音
    public stopRecording() {
        this.recordingStatus.value = false // 錄音停
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
            if (this.audioContext) {
                this.audioContext.close();
            }
            this.audioContext = null;

            if (this.websocket?.readyState === WebSocket.OPEN) {
                this.websocket.close();
            }
            this.websocket = null;

            if (this.interval) {
                clearInterval(this.interval);
            }
            console.log("錄音已停止");
        }
    }

    // 語音種類
    public getSTTLanguage() {
        let list = [
            {
                'playerName': 'cmn-TW-vs2-F01',
                'key': 'cmn-TW',
                'value': '中文'
            },
            {
                'playerName': 'nan-TW-vs2-F01',
                'key': 'nan-TW',
                'value': '台語'
            }
        ]
        return list
    }
}