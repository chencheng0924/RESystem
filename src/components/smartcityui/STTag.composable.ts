import { ref, Ref } from "vue"
import { TagPassThroughOptions } from 'primevue/tag'
import { IconFieldPassThroughOptions } from 'primevue/iconfield'
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { InputIconPassThroughOptions } from "primevue/inputicon"
import { STTagProps, STTagModeType } from './STTag.model'

export class useSTTagStyle {
  public tagStyleOption: Ref<TagPassThroughOptions>
  public iconFieldOption: Ref<IconFieldPassThroughOptions>
  public inputIconOption: Ref<InputIconPassThroughOptions>
  public inputFieldOption: Ref<InputTextPassThroughOptions>

  constructor() {
    this.tagStyleOption = ref(this.getSTTagStyleOption())
    this.iconFieldOption = ref(this.getSTIconFieldStyleOption())
    this.inputIconOption = ref(this.getInputIconStyleOption())
    this.inputFieldOption = ref(this.getInputFieldStyleOption())
  }

  public getSTTagStyleOption() {
    return {
      root: ({ context, props }) => ({
        class: [
          'border-[1px]',
          {
            'border-fonePrimaryMain': props.severity == 'primary',
            'border-commBorder': props.severity == 'secondary',
            'border-commThemeGreen': props.severity == 'success',
            'border-commThemeRed': props.severity == 'danger'
          }
        ]
      }),
    }
  }

  public getSTIconFieldStyleOption() {
    return {
      root: ({ context, props }) => ({
        class: [
          'border-[1px] border-commThemeRed',
        ]
      }),
    }
  }

  public getInputIconStyleOption() {
    return {
      root: ({ context, props }) => ({
        class: [
          '!left-[6px]',
          '!top-[46%]'
        ]
      }),
    }
  }

  public getInputFieldStyleOption() {
    return {
      root: ({ context, props }) => ({
        class: [
          'focus:!shadow-none',
          'w-[84px]',
          'h-[24px]',
          '!border-[1px] !border-dashed !border-commBorder',
          '!bg-transparent',
          '!py-[4px] !pl-[24px] !pr-[8px]',
          '!text-commTextLevel1',
          '!text-[12px]',
          'placeholder:!text-commTextLevel1 dark:placeholder:!text-commTextLevel1'
        ]
      }),
    }
  }
}

export class UseSTTag {
  public props: Ref<STTagProps> = ref(null)
  public groupProps: Ref<STTagProps[]> = ref(null)
  public dynamicValue: Ref<string> = ref('')

  constructor() {
  }

  public setProps(props: STTagProps) {
    this.props.value = props
  }

  public setGroupProps(groupProps: STTagProps[]) {
    this.groupProps.value = groupProps
  }

  public dynamicAddTag() {
    if (this.groupProps.value.length === 0 || !this.dynamicValue.value) return
    const template = this.groupProps.value.firstOrDefault()
    const newTag = new STTagProps({
      value: this.dynamicValue.value,
      type: template.type,
      removable: template.removable
    })
    this.groupProps.value.push(newTag)
    this.resetDynamicValue()
  }

  public resetDynamicValue() {
    this.dynamicValue.value = ''
  }

  public removeTag(idx: number) {
    this.groupProps.value.splice(idx, 1)
  }
}