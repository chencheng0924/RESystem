export class PageEmptyViewProps {
  title: string
  subTitle: string
  imgUrl: string

  constructor(init?: Partial<PageEmptyViewProps>) {
    Object.assign(this, init)
  }

  public setTitle(value: string) {
    this.title = value
    return this
  }

  public setSubtitle(value: string) {
    this.subTitle = value
    return this
  }

  public setImgUrl(value: string) {
    this.imgUrl = value
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