import { computed, ref, Ref } from "vue"
import { STFormItem } from "./STForm.model"
import { InputTextPassThroughOptions } from "primevue/inputtext"

export class UseSTSearchBarStyle {
  public inputTextStyle: Ref<InputTextPassThroughOptions>

  constructor() {
    this.inputTextStyle = ref(this.getInputTextStyle())
  }

  // public getWidth(width?: string) {
  //   return computed(() => `w-${width}`)
  // }

  public getInputTextStyle(width?: string) {
    return {
      root: ({ props, context, parent }) => ({
        class: [
          // '!w-[347px]',
          { '!rounded-tl-[8px] !rounded-bl-[8px] !rounded-tr-[0px] !rounded-br-[0px]': parent.instance.$name !== 'InputGroup' },
          '!text-body2',
          '!text-commTextLevel1',
          'border',
          { 'border-commThemeRed dark:border-commThemeRed': props.invalid },
          // Invalid State
          'focus:!border-fonePrimaryMain',
          'hover:!border-fonePrimaryMain',
          'blur:!border-fonePrimaryMain',
          'focus-visible:!ring-0',
        ]
      })
    }
  }
}

export class UseSTSearchBar {
  private inputField: Ref<STFormItem> = null
  private emit: any

  constructor(emit: any, input: STFormItem) {
    this.emit = emit
    this.init(input)
  }

  private init(input: STFormItem) {
    this.setDefaultSearchInput(input)
  }

  public setDefaultSearchInput(input: STFormItem) {
    this.inputField = ref(input)
  }

  public get inputFieldProps() {
    return this.inputField.value
  }

  public updateInput(val: string) {
    this.emit('updateInput', val)
  }

  public search() {
    this.emit('clickSearch', this.inputField.value)
  }

  public visibleCleadBtn() {
    return !!this.inputField.value.Value ? true : false
  }

  public clearInput() {
    this.inputField.value.Value = ''
  }
}