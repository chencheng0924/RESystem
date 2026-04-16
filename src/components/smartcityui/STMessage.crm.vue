<script setup lang="ts">
import { STButtonConfig } from './STButton.model';
import { STMessageProps } from './STMessage.model'
const props = defineProps<{
  props: STMessageProps
}>()
const pt = {
  content: {
    class: [
      '!w-full'
    ]
  },
  text: {
    class: [
      '!w-full'
    ]
  }
}
const emit = defineEmits(['eventActionBtn'])
const actionItem = (e,item: STButtonConfig) => {
    emit('eventActionBtn', e, item)
}
</script>

<template>
  <div v-if="!!props.props?.title || !!props.props.text">
    <Message :severity="props.props.severity" :pt="pt">
      <template #icon v-if="!!props.props.icon">
        <img :src="`${props.props.icon}`.getIcon('svg')" alt="message icon" class="py-[3px]">
      </template>
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col gap-[4px]">
          <div class="text-h4 text-commTextLevel1" v-if="props.props.title != ''">{{ props.props.title }}</div>
          <div class="text-body2 text-commTextLevel1">{{ props.props.text }}</div>
        </div>

        <Button v-if="!!props.props.button" :label="props.props.button.label" @click="actionItem($event,props.props.button)"
          :severity="props.props.button.severity" :outlined="props.props.button.severity == 'outlined'"
          :icon="props.props.button.icon" iconPos="right" class="h-[30px] !py-[4px] !px-[12px] !rounded-[6px]" />
      </div>
    </Message>
  </div>
</template>
