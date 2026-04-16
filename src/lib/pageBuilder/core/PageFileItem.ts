import { PageFileType } from "../enum/PageFileType"

export class PageFileItem {
  Id: string;
  Title: string;
  File: any;
  Type?: PageFileType;
  Size?: string;
  Status?: string = ''
  HasDelete?: boolean = true;

  constructor(init?: Partial<PageFileItem>) {
    Object.assign(this, init)
  }

  setType(type?: PageFileType) {
    this.Type = type
    return this
  }

  setSize(size?: string) {
    this.Size = size
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

  setFileSuccess() {
    this.Status = 'success'
    return this

  }
}