<!-- 
  STTag共有三種模式: SINGLE單一 / GROUP群組 / DYNAMIC 動態新增
  mode為 SINGLE 須傳入props
  mode為 GROUP/DYNAMIC 須傳入groupProps
-->
<script lang="ts" setup>
import { computed, watchEffect, watch } from 'vue'
import { STTagProps, STTagModeType } from './STTag.model'
import { useSTTagStyle, UseSTTag } from './STTag.composable'

const style = new useSTTagStyle()
const controller = new UseSTTag()

const props = defineProps<{
  mode: STTagModeType,
  props?: STTagProps,  // mode為 SINGLE 時使用
  groupProps?: STTagProps[]  // mode為 GROUP / DYNAMIC 時使用
}>()

const emit = defineEmits<{
  'update:groupProps': [val: STTagProps[]],
  'update:props': [val: STTagProps]
}>()

watchEffect(() => {
  if (props.props) {
    controller.setProps(props.props)
  } else if (props.groupProps) {
    controller.setGroupProps(props.groupProps)
  }
})
const update = (val: STTagProps[]) => {
  emit('update:groupProps', val)
}
const updateProps = (val: STTagProps) => {
  emit('update:props', val)
}
watch(() => controller.groupProps.value,
  (val) => {
    update(val)
  },
  {
    deep: true
  }
)
watch(() => controller.props.value,
  (val) => {
    updateProps(val)
  },
  {
    deep: true
  }
)
</script>
<template>
  <!-- single tag -->
  <div v-if="props.mode == STTagModeType.SINGLE">
    <Tag :value="controller.props.value?.value" :severity="controller.props.value?.type" :pt="style.getSTTagStyleOption()"></Tag>
  </div>

  <!-- group tag -->
  <div v-if="props.mode == STTagModeType.GROUP" class="flex flex-wrap gap-[4px]">
    <Tag :value="tag.value" :severity="tag.type" v-for="(tag, idx) in controller.groupProps.value" :key="idx + 'groupTag'">
      {{ tag.value }}
      <img :src="'ic_close'.getIcon('svg')" alt="close icon" class="cursor-pointer" v-if="tag.removable"
        @click="controller.removeTag(idx)">
    </Tag>
  </div>

  <!-- dynamic tag 動態新增 -->
  <div v-if="props.mode == STTagModeType.DYNAMIC">
    <div class="flex flex-col gap-[4px]">
      <IconField>
        <InputIcon :pt="style.getInputIconStyleOption()">
          <img :src="'ic_add'.getIcon('svg')" alt="add icon">
        </InputIcon>
        <InputText v-model="controller.dynamicValue.value" placeholder="新增標籤" :pt="style.getInputFieldStyleOption()"
          @blur="controller.dynamicAddTag()" @keyup.enter="controller.dynamicAddTag()" />
      </IconField>
      <div class="flex flex-wrap gap-[4px]">
        <Tag :value="tag.value" :severity="tag.type" v-for="(tag, idx) in controller.groupProps.value"
          :key="idx + 'dynamicTag'">
          {{ tag.value }}
          <img :src="'ic_close'.getIcon('svg')" alt="close icon" class="cursor-pointer" v-if="tag.removable"
            @click="controller.removeTag(idx)">
        </Tag>
      </div>
    </div>
  </div>
</template>