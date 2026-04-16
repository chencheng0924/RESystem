import { PageCardType } from '@/lib/pageBuilder/enum/PageCardType'
import { PageAction } from './PageAction';

export class PageCardTitleItem {
  id: string = '';
  title?: string = '';
  key?:string = '';
  value?:string = '';
  actionList: Array<PageAction> = []
  canEdit: boolean = false
  needRename?: boolean = true

  constructor(init?: Partial<PageCardTitleItem>) {
    Object.assign(this, init)
  }

  setId(id?: string) {
    this.id = id
    return this
  }

  setTitle(title?: string) {
    this.title = title
    return this
  }

  setActionList(actions: Array<PageAction>) {
    this.actionList = actions
    return this
  }

  setCanEdit(state: boolean) {
    this.canEdit = state
    return this
  }

  setNeedRename(state: boolean){
    this.needRename = state
    return this
  }

  convertObject() {
    let obj = {};
    for (let key in this) {
      let v = this[key];
      let keyTemp = key.replace(/^./, key[0].toLowerCase());
      obj[keyTemp] = v;
    }

    return obj;
  }
}