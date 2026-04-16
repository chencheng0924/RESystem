import { ref, Ref } from "vue"
import { PopoverPassThroughOptions } from "primevue/popover"
import { TooltipDirectivePassThroughOptions } from 'primevue/tooltip'

export class UseSTTimelineStyle {
  public popoverStyleOption: Ref<PopoverPassThroughOptions>
  public tooltipStyleOption: Ref<TooltipDirectivePassThroughOptions>

  constructor() {
    this.popoverStyleOption = ref(this.getPopoverStyleOption())
    this.tooltipStyleOption = ref(this.getTooltipStyleOption())
  }

  public getPopoverStyleOption() {
    return {
      root: {
        class: [
          // 'rounded-md shadow-lg',
          // '!border-none',
          '!rounded-[8px]',
          'absolute !left-[180px]',
          'z-40 transform origin-center',
          '!bg-commBgLevel2',
          'after:!border-b-commBgLevel2'
        ]
      },
      content: {
        // class: 'p-5 items-center flex'
      },
    }
  }

  public getTooltipStyleOption() {
    return {
      arrow: ({ context, props }) => ({
        class: [
          '!border-t-[#333333] !border-b-[#333333]'
        ]
      }),
      text: () => ({
        class: [
          'py-[0.25rem] px-[0.5rem] !text-body2 !bg-[#333333]',
        ]
      })
    }
  }
}

export class UseSTTimeline {
  public contentPopover: Ref<any> = ref()

  constructor() {

  }

  public openPopover(e: Event, show: boolean) {
    if (!show) return
    this.contentPopover.value.toggle(e)
  }
}