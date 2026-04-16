<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { UseSTPasswordRule } from './STPasswordRule.composable'
import { STPasswordRuleType } from './STPasswordRule.model'
const controller = new UseSTPasswordRule()
const props = defineProps({
  checkValue: {
    type: String,
    default: '',
    required: true
  },
  checkRuleTypeList: {
    type: Array<STPasswordRuleType>,
    default: []
  }
})
const allPassed = ref(false)
const checkRules = (val: string) => {
  controller.checkRules(val)
  allPassed.value = controller.allRulesPassed()
}
watch(() => props.checkValue,
  (val) => {
    checkRules(val)
  },
  {
    deep: true
  }
)
onMounted(() => {
  if (props.checkRuleTypeList.length > 0) {
    controller.setRules(props.checkRuleTypeList)
  }
})
</script>

<template>
  <div class="flex flex-col gap-[8px]">
    <span class="text-body2 text-commTextLevel1">新密碼必須包含：</span>
    <div class="flex gap-[4px] items-center" v-for="rule in controller.rulesList" :key="rule.name">
      <img :src="rule.isChecked ? 'success.svg'.getImgPath() : 'success-disabled.svg'.getImgPath()"
        alt="check password">
      <span class="text-body2 text-commTextLevel1">{{ rule.name }}</span>
    </div>
  </div>
</template>