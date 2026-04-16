import { STButtonConfig } from './STButton.model'
import { STTagProps } from './STTag.model'
import { TooltipOptions } from 'primevue/tooltip'

export class STTimelineProps {
  data?: STTimelineItem[]
  lazyLoad?: boolean = true

  constructor(init?: Partial<STTimelineProps>) {
    Object.assign(this, init)
  }
}

export class STTimelineItem {
  id?: string
  icon?: string
  title?: string
  content?: string
  time?: string
  tag?: STTagProps
  action?: STButtonConfig
  comment?: string
  hasContentPopover: boolean = false  // content是否要Popover, true的話slot也要放

  constructor(init?: Partial<STTimelineItem>) {
    Object.assign(this, init)
  }

}



export class STTimelineEvent {
  constructor(init?: Partial<STTimelineEvent>) {
    Object.assign(this, init);
  }
  eventActionBtn?: Function;
}