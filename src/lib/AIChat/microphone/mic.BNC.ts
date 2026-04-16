import { IMicrophone } from "../interface/IMicrophone";
import { BNCService } from "@/lib/AIChat/service/mic.BNC.service"

import { ref, Ref } from "vue";
import { MicBase } from "./micBase";
import { WebsocketAccessInfoReslut } from "../model/BNC.model";

export class BNCMicrophone extends MicBase {
  public service: BNCService

  constructor() {
    super() // 默認一開始是停止
    this.service = new BNCService()
  }

  public async startRecord() {
    this.setLoading()
    const bncLoginResult = await this.service.BNCLogin()
    const bncWebsocketAccessInfoResult = new WebsocketAccessInfoReslut(await this.service.getWebsocketAccessInfo(bncLoginResult.token))
    const connectWebsocketResult = await this.service.connectWebsocket(bncWebsocketAccessInfoResult)
    if (connectWebsocketResult) {
      this.setRecording()
      this.service.rawDataHandler()
    }
  }

  public stopRecord() {
    this.setStopped()
    this.service.stopRecording()
  }

  public get resultText() {
    return this.service?.txtResult;
  }

  public getTTSLanguage() {
    return this.service.getSTTLanguage()
  }
}