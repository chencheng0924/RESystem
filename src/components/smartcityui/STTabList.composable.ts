import { Ref, ref } from 'vue'
import { TabListPassThroughOptions } from 'primevue/tablist'
import { TabPassThroughOptions } from 'primevue/tab'

export class UseSTTabListStyle {
  public tabListStyleOption: Ref<TabListPassThroughOptions>
  public tabStyleOption: Ref<TabPassThroughOptions>

  constructor() {
    this.tabListStyleOption = ref(this.getTabListStyleOption())
    this.tabStyleOption = ref(this.getTabStyleOption())
  }

  public getTabListStyleOption() {
    return {
      tabList: {
        class: [
          '!w-full !flex !gap-[12px]',
          '!border-solid !border-b-[1px]',
          '!bg-transparent'
        ]
      }
    }
  }

  public getTabStyleOption() {
    return {
      root: ({ props, context }) => ({
        class: [
          '!bg-transparent',
          'cursor-pointer select-none whitespace-nowrap',
          'user-select-none',
          '!border-b-[1px] !border-t-0',
          'py-[12px] px-0',
          {
            'border-transparent': !context.active,
            '!text-body1 !text-commTextLevel2': !context.active,
            '!text-primary !text-h3': context.active,
          }
        ]
      })
    }
  }
}