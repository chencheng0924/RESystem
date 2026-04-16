export class WebsocketAccessInfoReslut {
    constructor(init?: Partial<WebsocketAccessInfoReslut>) {
        Object.assign(this, init)
    }
    code: number
    data: WebsocketAccessInfoData[]
}
  
export class WebsocketAccessInfoData {
    url: string
    ticket: string
    expiredInSec: number
}

export interface Input{
    text:string
    type:string
}

export interface Voice{
    model: string
    languageCode: string
    name: string
}

export interface AudioConfig{
    speakingRate: number
}

export class PlayerAudioPARA{
    input: Input = {
        text: '',
        type: 'common'
    }
    voice: Voice = {
        model:'melotts',
        languageCode:'',
        name:''
    }
    audioConfig: AudioConfig = {
        speakingRate:1
    }
}