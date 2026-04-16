import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { IAIChatDeps } from "../interface/IAIChatDeps";
import { MicrophoneType } from "../microphone/micFactoryManager";
import { VoiceType } from "../voice/voiceFactoryManager";
import { ChatType } from "../chat/chatFactoryManager";

export enum btnType {
  Mic = 0,
  Picture = 1,
  text = 2
}

export class STImgItem {
  img: string
  imgBase64: string
  file: any
  constructor(init?) {
    Object.assign(this, init);
  }
}

export class STFileItem {
  imgPath: string
  fileExt: string
  file: any
  fileId: string
  fileName: string
  constructor(init?) {
    Object.assign(this, init);
  }
  setFileExt(ext: string) {
    this.fileExt = ext;

    let extMap = [
      { ext: '.code', path: 'cit_filetype_code'.getIcon('svg') },
      { ext: '.docx', path: 'cit_filetype_docx'.getIcon('svg') },
      { ext: 'error', path: 'cit_filetype_error'.getIcon('svg') },
      { ext: '.pdf', path: 'cit_filetype_pdf'.getIcon('svg') },
      { ext: '.pptx', path: 'cit_filetype_pptx'.getIcon('svg') },
      { ext: '.xlsx', path: 'cit_filetype_xlsx'.getIcon('svg') }
    ]

    let extItem = extMap.find(x => x.ext == ext);
    if (extItem)
      this.imgPath = extItem.path;
    else {
      let error = extMap.find(x => x.ext == 'error');
      this.imgPath = error.path;
    }

    return this;
  }
  setFileResourceId(id: string) {
    this.fileId = id;
    return this;
  }
}



export class STAichatProps {
  defaultDataList?: Array<any>;
  agentData?: STAichatAgentData;
  allowCreateChatRoom?: boolean;
  visibleToolBar?: boolean;
  chatRoomId?: string;// 已有chatroom id
  chatMessages?: Array<any>// 聊天資料
  chatRoomDisabled?: boolean;
  depsType?: STAIChatDepsType;


  constructor(init?: Partial<STAichatProps>) {
    Object.assign(this, init);
  }

}


export class STAichatEvent {
  constructor(init?: Partial<STAichatEvent>) {
    Object.assign(this, init);
  }
  eventInit?: Function;

}

export class STAichatAgentData {
  key?: string;
  name?: string;
  type?: number;
  typeName?: string = '';
  llm?: STAichatLLMAttributes

  constructor(init?: Partial<STAichatAgentData>) {
    Object.assign(this, init);
  }

  getEntity() {
    let default_agentID = this.key ?? '';
    let default_agentType = this.type ?? STAIAgentType.AGENT;


    if (this.type == STAIAgentType.AGENT) {
      return {
        agentType: {
          key: 'Standard'
        },
        agentEntity: {
          key: default_agentID
        }
      }
    }
    else if (this.type == STAIAgentType.CHATGROUP) {
      return {
        agentType: {
          key: 'GroupChat'
        },
        agentEntity: {
          key: default_agentID
        }
      }
    }
    else if (this.type == STAIAgentType.FLOW) {
      return {
        agentType: {
          key: 'Flow'
        },
        agentEntity: {
          key: default_agentID
        }
      }
    }
    else if (this.type == STAIAgentType.PROXY) {
      return {
        agentType: {
          key: 'Proxy'
        },
        agentEntity: {
          key: default_agentID
        }
      }
    }
    else if (this.type == STAIAgentType.SUMMARY) {
      return {
        agentType: {
          key: 'Summary'
        },
        agentEntity: {
          key: default_agentID
        }
      }
    }
    else if (this.type == STAIAgentType.LIBRARY) {
      return {
        agentType: {
          key: 'Library'
        },
        agentEntity: {
          key: default_agentID
        }
      }
    }
  }

  isGroupAgent() {
    if (this.type == STAIAgentType.CHATGROUP)
      return true;

    return false;
  }

}

export class STAichatLLMAttributes {
  id?: string;
  name?: string;
  isFunctionCallingSupported?: boolean;
  isFunctionCallingStreamingSupported?: boolean;

  constructor(init?) {
    Object.assign(this, init);
  }
}



export class STAiMessageItem {
  content?: string;
  contentType?: string;
  isResType?: boolean;// 是否為機器人的訊息
  sessionId?: string;
  createTime?: string;
  duration?: string;
  playLoading?: boolean = false
  playStatus?: boolean = false
  audioInstance?: any
  constructor(init?) {
    Object.assign(this, init);
  }
}

export class STAiMessage {
  snapshot?: STAiMessageItem;
  constructor(init?) {
    Object.assign(this, init);
  }
  setContentData(item: STAiMessageItem) {
    this.snapshot = item;
    return this;
  }
}

export class STAiSettingProps {
  isDebug?: boolean
  userInitial?: string
  showSignalR?: boolean
  showFunctionCall?: boolean
  showTotalTime?: boolean
  finalShowTotalTime?: boolean
  TTSSetting?: BaseKeyValue
  STTSetting?: BaseKeyValue
  isStream?: boolean
  isA2A?: boolean

  constructor(init?) {
    Object.assign(this, init);
  }
}

export enum STAIAgentType {
  AGENT,
  CHATGROUP,
  SUMMARY,
  FLOW,
  PROXY,
  LIBRARY
}

export enum CommentType {
  good = 'good',
  bad = 'bad',
}

export enum ChatNoticeType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export class ChatNotice {
  visible: boolean = false
  type: ChatNoticeType = ChatNoticeType.INFO
  message: string = ''
  duration?: number = 3000

  constructor(init?) {
    Object.assign(this, init);
  }

  setVisible(visible: boolean) {
    this.visible = visible
    return this
  }
  setType(type: ChatNoticeType) {
    this.type = type
    return this
  }
  setMessage(message: string) {
    this.message = message
    return this
  }
  setDuration(duration: number) {
    this.duration = duration
    return this
  }
}

export class STAIChatDepsType {
  microphone: MicrophoneType
  voice: VoiceType
  chat: ChatType
  // TODO: 這裡之後再看有什麼type定義
  toolbar: any
  messageToolbar: any
  upload: any

  constructor(init?: Partial<STAIChatDepsType>) {
    Object.assign(this, init);
  }

  setChatTypeA2A() {
    this.chat = ChatType.A2A;
    return this;
  }

  setChatTypeDefault() {
    this.chat = ChatType.F1;
    return this;
  }
}