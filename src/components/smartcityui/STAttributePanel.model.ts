import { STAccordionCustomConfig } from "@/components/smartcityui/STAccordionCustom.model"

export class STAttributePanelProps {
  dataList?: STAccordionCustomConfig[]

  constructor(init?: Partial<STAttributePanelProps>) {
    Object.assign(this, init)
  }
}