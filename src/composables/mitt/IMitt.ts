import { Emitter } from "mitt"
import { emitter, Events } from './mitt'

export interface IMitt {
  mitt: Emitter<Events>
  emitPageUpdate(): void  // 發送頁面更新事件
  emitPageUpdateEntitySection(path): void  // 發送頁面指定Sec更新事件
  emitCustomEvent(eventType: any): void  // 發送自定義事件
  setOnCustomEvent(eventType: any, callback: (data?: any) => void): void  // 監聽自定義事件
}