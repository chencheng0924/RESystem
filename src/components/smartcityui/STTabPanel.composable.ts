import { Ref, ref } from 'vue'
import { TabPanelPassThroughOptions } from 'primevue/tabpanel'

export class UseSTTabPanelStyle {
  public tabPanelStyleOption: Ref<TabPanelPassThroughOptions>

  constructor() {
    this.tabPanelStyleOption = ref(this.getTabPanelStyleOption())
  }

  public getTabPanelStyleOption () {
    return {
      root: {
        class: [
          '!p-0',
          'bg-transparent',
        ]
      }
    }
  }
}