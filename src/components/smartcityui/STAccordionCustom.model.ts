import { STFormItem } from "./STForm.model";

export class STAccordionCustomConfig {
  title: string;  // Accordion 名稱
  value: string;   // Accordion 用於群組開關
  contentList: STFormItem[];
  
  constructor(init?: Partial<STAccordionCustomConfig>) {
    Object.assign(this, init);
  }
}