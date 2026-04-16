export class PageTextEditorProps {
  HtmlValue: string = ''
  TextValue: string = ''
  PermissionStatus: PageTextEditorPermisson = PageTextEditorPermisson.PUBLIC

  constructor(init?: Partial<PageTextEditorProps>) {
    Object.assign(this, init)
  }

  public setHtmlValue(value: string) {
    this.HtmlValue = value
    return this
  }

  public setTextValue(value: string) {
    this.TextValue = value
    return this
  }

  public setPermissionStatus(status: PageTextEditorPermisson) {
    this.PermissionStatus = status
    return this
  }

  public convertObject() {
    let obj = {};
    for (let key in this) {
        let v = this[key];
        let keyTemp = key.replace(/^./, key[0].toLowerCase());
        obj[keyTemp] = v;
    }

    return obj;
  }
}

export enum PageTextEditorPermisson {
  PUBLIC = 'public',
  PRIVATE = 'private'
}