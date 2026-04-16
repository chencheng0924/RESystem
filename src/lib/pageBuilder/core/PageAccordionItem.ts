export class PageAccordionItem {
  Value: string;
  Title: string;
  Content: string;
  
  constructor(init?: Partial<PageAccordionItem>) {
    Object.assign(this, init);
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