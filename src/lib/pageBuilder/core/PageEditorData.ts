export class PageEditorData {
  htmlValue?: string
  textValue?: string

  constructor(init?: Partial<PageEditorData>) {
    Object.assign(this, init)
  }

  public setHtmlValue(value: string) {
    this.htmlValue = value
    return this
  }

  public setTextValue(value: string) {
    this.textValue = value
    return this
  }
}

export class PageEditorProps {
  data?: PageEditorData;
  modules?: any;
  height?: string;

  constructor(init?: Partial<PageEditorProps>) {
    Object.assign(this, init)
  }

  setData(data: PageEditorData) {
    this.data = data;
    return this;
  }
}



export class PageEditorEvent {
  constructor(init?: Partial<PageEditorEvent>) {
    Object.assign(this, init);
  }
  textChange?: Function;

}
