export class STEditorData {
  htmlValue?: string
  textValue?: string

  constructor(init?: Partial<STEditorData>) {
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

export class STEditorProps {
  data?: STEditorData;
  modules?: any;
  height?: string;

  constructor(init?: Partial<STEditorProps>) {
    Object.assign(this, init)
  }

  setData(data: STEditorData) {
    this.data = data;
    return this;
  }
}



export class STEditorEvent {
  constructor(init?: Partial<STEditorEvent>) {
    Object.assign(this, init);
  }
  textChange?: Function;

}
