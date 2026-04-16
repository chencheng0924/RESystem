import { PageAccordionCustomItem } from "./PageAccordionCustomItem"

export class PagePromptConfigAccordion {
  mainTitle?: string = ''
  dataList?: PageAccordionCustomItem[]

  constructor(init?: Partial<PagePromptConfigAccordion>) {
    Object.assign(this, init)
  }
}