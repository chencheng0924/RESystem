import { STPosition, STAvatar } from '@/components/smartcityui/STCommon.model'
import { STMessageProps } from '@/components/smartcityui/STMessage.model'

export class STChatProps {
  display?: STChatDisplayType = STChatDisplayType.SIMPLE
  contentList?: STChatItem[] = []
  alertList?: STChatAlertItem[] = []

  constructor(init?: Partial<STChatProps>) {
    Object.assign(this, init);
  }
}

export class STChatItem {
  id?: string
  type?: STChatItemType = STChatItemType.CONTENT
  name?: string
  time?: string
  content?: string
  unread?: number = 0
  imgUrl?: string
  avatar?: STAvatar
  isActive?: boolean = false

  constructor(init?: Partial<STChatItem>) {
    Object.assign(this, init);
  }

  public get avatarName() {
    if (!this.name) return ''
    return this.name.substring(0, 1)
  }

  public convertObject() {
    let obj = {};
    for (let key in this) {
      let v = this[key];
      let keyTemp = key.replace(/^./, key[0].toUpperCase());
      obj[keyTemp] = v;
    }

    return obj;
  }

}

export class STChatAlertItem extends STMessageProps {
  position?: STPosition

  constructor(init?: Partial<STChatAlertItem>) {
    super(init)
    Object.assign(this, init)
  }
}

export enum STChatItemType {
  CONTENT = 'content',
  LOG = 'log'
}

export enum STChatDisplayType {
  SIMPLE = 'simple',
  DETAIL = 'detail'
}


export class STChatEvent {
  constructor(init?: Partial<STChatEvent>) {
    Object.assign(this, init);
  }

  eventClick?: Function;
  eventActionBtn?: Function;
}
