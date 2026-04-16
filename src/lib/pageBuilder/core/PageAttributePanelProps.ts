import { PageAccordionCustomItem } from "./PageAccordionCustomItem"

export class PageAttributePanelProps {
  dataList?: PageAccordionCustomItem[]

  constructor(init?: Partial<PageAttributePanelProps>) {
    Object.assign(this, init)
  }
}