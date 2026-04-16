export class STAccordionConfig {
  value: string;
  title: string;
  content: string;
  
  constructor(init?: Partial<STAccordionConfig>) {
    Object.assign(this, init);
  }
}