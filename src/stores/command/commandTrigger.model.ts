export class storeData {
  data?: itemData
  show?: boolean = false
  isSignalR?: boolean = true
  sessionId?: string
  showText?: string
  position?: string
  type?: string
}

export class busItemData {
  show?: boolean = false
  routeId?: string
  dir?: string
  platename?: string
}

export class itemData {
  text: string
  sessionId?: string
  msg?: any
}

export class allCommandItem {
  sessionId?: string
  commandText: string
}

export class busLineItem {
  command?: string
  routeid?: string
  dirction?: Number
  sessionid?: string
  toggle?: boolean = false
  isResetMap?: boolean = true
  hasSubRoute?: boolean
  openSubRoute?: boolean = false
  openOldRoute?: boolean = false
  isSubRoute?: boolean = false
  constructor(init?) {
    Object.assign(this, init);
  }
}

export class busLineStatusItem {
  isDraw?: boolean
  isChecked?: boolean
  ischeckedSub?: boolean
  isnew?: boolean
  isDrawSub?: boolean
  isnewSub?: boolean
  routeid?: string
  sessionid?: string
  hasSubRoute?: boolean

  setDraw(val: boolean) {
    this.isDraw = val
    return this
  }

  setNew(val: boolean) {
    this.isnew = val
    return this
  }
}