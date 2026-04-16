import { STFormItem, STFormItemType } from './STForm.model'

export class STFilterProps {
  condList?: STFormItem[]  // 目前只有input & select & datepicker

  constructor(init?: Partial<STFilterProps>) {
    Object.assign(this, init)
  }
}



export class STFilterEvent {
  constructor(init?: Partial<STFilterEvent>) {
    Object.assign(this, init);
  }
  search?: Function;
  change?: Function;

}
