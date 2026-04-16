import { ref , Ref } from 'vue'
import axios from 'axios'
import { 
    PlayerAudioPARA
} from '@/lib/AIChat/model/BNC.model'
export class BNCPlayService {
    private BNCURI:string
    constructor(){
        this.BNCURI = 'https://ttsapi03.bronci.com.tw'
    }
    // 登入Token
    public async BNCLoginTTS(){
        const POST_PARA = {
            "username":"TTSapi0916_04541302",
            "password":"Api091604541302"
        }
        return axios.post(`${this.BNCURI}/api/v1/tts/login`,POST_PARA,{
            headers: {
                "Content-Type" : 'application/json'
            }
        }).then((res)=>{
            if(res.status === 200){
                const result = res.data
                return result
            }
        }).catch((err)=>{
            console.log('err',err)
            return null
        })
    }
    
    // 取得模型清單
    public async BNCModelsGET(token:string){
        return axios.get(`${this.BNCURI}/api/v1/tts/models`,{
            headers: {
                "Content-Type" : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then((res)=>{
            if(res.status === 200){
                const result = res.data
                return result
            }
        }).catch((err)=>{
            console.log('err',err)
            return null
        })
    }

    //取得文字格式選單
    public async BNCTextTypeOptionsGET(token:string){
        return axios.get(`${this.BNCURI}/api/v1/tts/synthesize/text-type-options`,{
            headers: {
                "Content-Type" : 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then((res)=>{
            if(res.status === 200){
                const result = res.data
                return result
            }
        }).catch((err)=>{
            console.log('err',err)
            return null
        })
    }
    
    //文字轉語音
    public async SynthesizePOST(token:string , POST_PARA:PlayerAudioPARA){
        return axios.post(`${this.BNCURI}/api/v1/tts/synthesize`,POST_PARA,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
        }).then((res)=>{
            if(res.status === 200){
                const audioBlob = res.data;
                return audioBlob;
            }
        }).catch((err)=>{
            console.log('err',err)
            return null
        })
    }
}