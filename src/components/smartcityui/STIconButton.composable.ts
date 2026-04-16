import { ref, Ref } from "vue"
import { TooltipDirectivePassThroughOptions } from 'primevue/tooltip'

export class useIconButtonStyle {
  public tooltipStyleOption: Ref<TooltipDirectivePassThroughOptions>

  constructor() {
    this.tooltipStyleOption = ref(this.getTooltipStyleOption())
  }

  public getTooltipStyleOption() {
    return {
      arrow: ({ context, props }) => ({
        class: [
          // '!border-t-[#333333] !border-b-[#333333]'
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