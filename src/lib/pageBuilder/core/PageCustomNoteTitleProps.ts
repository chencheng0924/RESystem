import { STButtonConfig } from "@/components/smartcityui/STButton.model";

export class PageCustomNoteTitleSectionProps {
  id: string = ''
  title: string = ''
  updateTime: string = ''
  author: string = ''
  actionList: Array<STButtonConfig> = []
  isLoading: boolean = false
  isFavorite: boolean = false
  isOwn: boolean = false

  constructor(init?: Partial<PageCustomNoteTitleSectionProps>) {
    Object.assign(this, init);
  }

  setId(val: string) {
    this.id = val
    return this
  }

  setTitle(val: string) {
    this.title = val
    return this
  }

  setUpdateTime(val: string) {
    this.updateTime = val
    return this
  }

  setAuthor(val: string) {
    this.author = val
    return this
  }

  setActionList(actions: Array<STButtonConfig>) {
    this.actionList = actions
    return this
  }

  setIsLoading(val: boolean) {
    this.isLoading = val
    return this
  }

  setIsFavorite(val: boolean) {
    this.isFavorite = val
    return this
  }

  setIsOwn(val: boolean) {
    this.isOwn = val
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