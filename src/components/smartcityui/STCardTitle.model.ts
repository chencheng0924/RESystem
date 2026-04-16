import { STMenubarAction } from "@/components/smartcityui/STMenubar.model"

export class STCardTitleProps {
  id: string
  title: string
  actionList: Array<STMenubarAction> = []
  canEdit: boolean = false
  needRename: boolean = true
  constructor(init?: Partial<STCardTitleProps>) {
    Object.assign(this, init);
  }
}