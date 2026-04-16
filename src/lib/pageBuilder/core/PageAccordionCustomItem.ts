import { PageFormItem } from "./PageFormItem";

export class PageAccordionCustomItem {
  Title: string; // Accordion 名稱
  Value: string; // Accordion 用於：群組開關控制
  ContentList?: Array<PageFormItem> = [];

  constructor(init?: Partial<PageAccordionCustomItem>) {
    Object.assign(this, init);
  }

  setContentData(contentList: Array<PageFormItem>) {
    this.ContentList = contentList;
    return this;
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