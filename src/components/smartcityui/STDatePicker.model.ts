import { STFormItem } from './STForm.model'
import { DateExtension } from "@/utils/dateExtension"
import { STTimeRangeItem, STTimeType } from './STTimeSelect.model'

export class STDatePickerProps extends STFormItem {
  // 以下為primeVue props
  inline?: boolean = false
  selectionMode?: STDatePickerSelectionMode = STDatePickerSelectionMode.SINGLE
  numberOfMonths?: number = 1
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[];


  constructor(init?: Partial<STDatePickerProps>) {
    super(init)
    Object.assign(this, init)
  }

  public setRangeModeValue(val: Date[]) {
    this.Value = val
    return this
  }

  public resetRangeValue() {
    this.Value = null
    return this
  }

  public toFormat() {
    if (this.Value?.[0] != null && this.Value?.[1] != null) {
      return `${DateExtension.toFormat(this.Value?.[0], 'YYYY/MM/DD')} - ${DateExtension.toFormat(this.Value?.[1], 'YYYY/MM/DD')}`
    } else {
      return ''
    }
  }

  setTwoRange() {
    this.inline = true,
      this.numberOfMonths = 2,
      this.selectionMode = STDatePickerSelectionMode.RANGE

    return this;
  }

  getDayNumber() {
    if (this.Value?.[0] != null && this.Value?.[1] != null) {
      return Math.abs(DateExtension.getDiffDay(this.Value?.[0], this.Value?.[1]));
    }

    return 0;
  }

  getEndDay() {
    if (this.Value?.[0] != null && this.Value?.[1] != null) {
      return this.Value?.[1];
    }
    return null;
  }

  setDefaultValue(item: STTimeRangeItem) {
    if (item == null)
      return this;

    if (item.type != STTimeType.CUSTOM)
      return this;

    this.Value = [];
    if(item.day){
      let startDate = new Date(item.day);
      startDate.setDate(item.day.getDate() + item.dayNumber * (-1));
      this.Value[0] = startDate
      this.Value[1] = item.day;
    } else {
      // 若點開自訂時間區間卻沒選擇，則預設為今天
      this.Value[0] = new Date();
      this.Value[1] = new Date();
    }

    return this;
  }

}

export enum STDatePickerSelectionMode {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  RANGE = 'range'
}