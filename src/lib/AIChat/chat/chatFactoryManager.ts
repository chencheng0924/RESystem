import { AIChatStore, useAIChatStore } from '@/lib/AIChat/store/AIChatStore'
import { IChat } from '@/lib/AIChat/interface/IChat'
import { F1Chat } from './chat.F1'
import { A2A023Chat } from './chat.A2A023'

// api 的連接方式 noStream , Stream
export enum ChatType {
  F1 = 'f1', // 一般的方式
  OPENAI = 'openai',
  A2A = 'A2A_023', // 0.2.3 version
}

// api 來源
export enum ChatTraceType {
  START,
  PROCESSING,
  END
}


export class ChatFactoryManager {
  private static instance: ChatFactoryManager

  private chatMap: Map<ChatType, () => IChat>
  private defaultType: ChatType

  private constructor() {
    this.registerChat();

    this.setDefault(ChatType.F1)   // 預設type
  }

  static getInstance() {
    if (!this.instance) this.instance = new ChatFactoryManager()
    return this.instance
  }

  registerChat() {
    this.chatMap = new Map()
    this.chatMap.set(ChatType.F1, () => new F1Chat())
    this.chatMap.set(ChatType.A2A, () => new A2A023Chat())
  }


  setDefault(type: ChatType) {
    this.defaultType = type
  }


  getChat(type?: ChatType): IChat {
    // 1. 參數優先
    // 2. 沒有參數就預設(from factory預設)

    const useType = type || this.defaultType
    const creator = this.chatMap.get(useType)
    if (!creator) throw new Error('沒這chat種類')
    return creator()
  }
}