import { ref, Ref, computed } from 'vue'
import { STFormItem, STFormItemType } from './STForm.model'
import { STTagProps, STTagModeType } from './STTag.model'
import { STDatePickerProps } from './STDatePicker.model'
import { ButtonPassThroughOptions } from 'primevue/button'

export class UseSTFilterStyle {
  public buttonStyleOption: Ref<ButtonPassThroughOptions>
  public buttonOutlineStyleOption: Ref<ButtonPassThroughOptions>
  
  constructor() {
    this.buttonStyleOption = ref(this.getButton())
    this.buttonOutlineStyleOption = ref(this.getButtonOutline())
  }

  public getButton() {
    return {
      root: ({ props, context, parent }) => ({
        class: [
          // Disabled
          { '!bg-[#E7E7E7] !border-[#E7E7E7] !opacity-100 !text-[#9B9B9B] !cursor-not-allowed': context.disabled },
        ]
      }),
    }
  }
  public getButtonOutline() {
    return {
      root: ({ props, context, parent }) => ({
        class: [
          // Disabled
          {'!border-[#E7E7E7] !opacity-100 !text-[#9B9B9B] !cursor-not-allowed': context.disabled },
        ]
      }),
    }
  }
}

export class UseSTFilter {
  public condList: Ref<Array<STFormItem>> = ref([])
  public isExpand: Ref<boolean> = ref(true)
  public expandText: Ref<string> = ref('Components.STFilter.Expand')
  public expandIcon: Ref<string> = ref('pi pi-angle-down')
  public finalCondList: Ref<STTagProps[]> = ref([])

  constructor(condList: Array<STFormItem>) {
    this.setCondList(condList)
  }

  public setCondList(items: Array<STFormItem>) {
    this.condList.value = items
    if (!!this.condList.value) {
      this.setFinalCond()
    }
  }

  public toggleExpand() {
    this.isExpand.value = !this.isExpand.value
    this.expandText.value = this.isExpand.value ? 'Components.STFilter.Expand' : 'Components.STFilter.Collapse'
    this.expandIcon.value = this.isExpand.value ? 'pi pi-angle-down' : 'pi pi-angle-up'
  }

  public checkDisabled() {
    return computed(() => this.condList.value?.every(item => item.Value === null || item.Value === undefined || item.Value.length < 1))
  }

  public setFinalCond() {
    this.finalCondList.value = this.condList.value
      .filter(item => item.Value != null && item.Value != '')
      .map(item => new STTagProps({
        value: `${item.Name}：${item.Value?.name ?? (typeof (item.Value) == 'object' ? (item as STDatePickerProps) : null) ?? item.Value}`
      }))
  }

  public resetCondValue() {
    this.condList.value.forEach(item => item.Value = null)
    this.finalCondList.value = []
  }
}