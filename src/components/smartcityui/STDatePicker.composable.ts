import { ref, Ref } from "vue"
import { DatePickerPassThroughOptions } from 'primevue/datepicker'
import { STDatePickerProps } from './STDatePicker.model'

export class UseSTDatePickerStyle {
  public datePickerStyleOption: Ref<DatePickerPassThroughOptions>

  constructor() {
    this.datePickerStyleOption = ref(this.getDatePickerStyleOption())
  }

  public getDatePickerStyleOption() {
    return {
      day: ({ context }) => ({
        class: [
          {
            '!text-foneTextLevel3 hover:!text-white hover:!bg-fonePrimaryBg': !context?.disabled && !context?.selected,
          }
        ]
      })
    }
  }
}

export class UseSTDatePicker {
  public datePickerProps: Ref<STDatePickerProps> = ref(null)

  constructor(props: STDatePickerProps) {
    this.setProps(props)
  }

  public setProps(props: STDatePickerProps) {
    this.datePickerProps.value = props
  }
}