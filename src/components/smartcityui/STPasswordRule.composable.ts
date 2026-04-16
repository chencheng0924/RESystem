import { ref, Ref } from 'vue'
import { STPasswordRule, STPasswordRuleType } from './STPasswordRule.model'

// class STPasswordRuleFactory {
//   static createRule(type: STPasswordRuleType): STPasswordRule {
//     switch (type) {
//       case STPasswordRuleType.LIMIT_CHAR:
//         return new STPasswordRule({
//           type: STPasswordRuleType.LIMIT_CHAR,
//           name: '6個字元以上',
//           checkFunction: (val: string) => val.length >= 6
//         })
//       case STPasswordRuleType.LEAST_UPPERCASE:
//         return new STPasswordRule({
//           type: STPasswordRuleType.LEAST_UPPERCASE,
//           name: '至少包含一個大寫字母',
//           checkFunction: (val: string) => /[A-Z]/.test(val)
//         })
//       case STPasswordRuleType.LEAST_NUM:
//         return new STPasswordRule({
//           type: STPasswordRuleType.LEAST_NUM,
//           name: '至少包含一個數字',
//           checkFunction: (val: string) => /\d/.test(val)
//         })
//       default:
//         throw new Error('no this type')
//     }
//   }
// }

class STPasswordRuleFactory {
  private static ruleMap: Map<STPasswordRuleType, STPasswordRule> = new Map()

  static registerRule(type: STPasswordRuleType, rule: STPasswordRule) {
    this.ruleMap.set(type, rule)
  }

  static createRule(type: STPasswordRuleType): STPasswordRule {
    const passwordRule = this.ruleMap.get(type)
    return passwordRule
  }
}

STPasswordRuleFactory.registerRule(STPasswordRuleType.LIMIT_CHAR,
  new STPasswordRule({
    type: STPasswordRuleType.LIMIT_CHAR,
    name: '6個字元以上',
    checkFunction: (val: string) => val.length >= 6
  })
)

STPasswordRuleFactory.registerRule(STPasswordRuleType.LEAST_UPPERCASE,
  new STPasswordRule({
    type: STPasswordRuleType.LEAST_UPPERCASE,
    name: '至少包含一個大寫字母',
    checkFunction: (val: string) => /[A-Z]/.test(val)
  })
)

STPasswordRuleFactory.registerRule(STPasswordRuleType.LEAST_NUM,
  new STPasswordRule({
    type: STPasswordRuleType.LEAST_NUM,
    name: '至少包含一個數字',
    checkFunction: (val: string) => /\d/.test(val)
  })
)

export class UseSTPasswordRule {
  private rulesMap: Map<STPasswordRuleType, STPasswordRule>
  private activeRules: Ref<Array<STPasswordRule>>
  private defaultRuleType: Array<STPasswordRuleType> = [STPasswordRuleType.LIMIT_CHAR, STPasswordRuleType.LEAST_UPPERCASE]

  constructor(initialRules?: STPasswordRuleType[]) {
    this.rulesMap = new Map()
    this.activeRules = ref([])

    this.initRules()
    if (initialRules == undefined || initialRules == null) {
      initialRules = this.defaultRuleType;
    }
    this.setRules(initialRules)
  }

  private initRules() {
    Object.values(STPasswordRuleType).forEach(type => {
      this.rulesMap.set(type, STPasswordRuleFactory.createRule(type))
    })
  }

  public setRules(types: STPasswordRuleType[]) {
    this.activeRules.value = types.map(type => this.rulesMap.get(type))
  }

  public checkRules(value: string) {
    this.activeRules.value.forEach(rule => {
      rule.changeCheckStatus(rule.checkFunction(value))
    })
  }

  public allRulesPassed(): boolean {
    return this.activeRules.value.every(rule => rule.isChecked)
  }

  public get rulesList() {
    return this.activeRules.value
  }
}