import { Ref, ref } from 'vue'

export class STPasswordRule {
  type: STPasswordRuleType
  name: string
  checkFunction: (val: string) => boolean
  isChecked: Ref<boolean> = ref(false)

  constructor(init: Partial<STPasswordRule>) {
    Object.assign(this, init)
  }

  public changeCheckStatus(status: boolean) {
    // console.log(status)
    // console.log(this.isChecked)
    this.isChecked = ref(status)
    return this
  }
}

export enum STPasswordRuleType {
  LIMIT_CHAR = 'LIMIT_CHAR',  // 限制字數
  LEAST_UPPERCASE = 'LEAST_UPPERCASE',  // 至少包含一大寫
  LEAST_NUM = 'LEAST_NUM', // 至少包含一數字
}