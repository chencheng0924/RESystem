<script lang="ts" setup>
import { STTimelineProps } from './STTimeline.model'
import { STTagModeType } from './STTag.model'
import { UseSTTimelineStyle, UseSTTimeline } from './STTimeline.composable'
const props = defineProps<{
  props?: STTimelineProps
}>()
const style = new UseSTTimelineStyle()
const controller = new UseSTTimeline()

const emit = defineEmits(["eventActionBtn"])

const actionBtn=(e,item)=>{
  emit("eventActionBtn",e,item)
}


</script>
<template>
  <div class="flex flex-col gap-[16px] w-full">
    <div class="w-full flex gap-[12px]" v-for="(item, idx) in props.props?.data" :key="idx + 'STTimelineItem'">
      <div class="flex flex-col items-center flex-y-1 min-w-[24px]" v-if="!!item?.icon">
        <img :src="`${item.icon}`.getIcon('svg')" alt="timeline icon">
        <div class="w-[1px] flex-1 bg-commTextLevel2"></div>
      </div>
      <div class="flex flex-col gap-[4px] w-full">
        <div class="flex justify-between items-center">
          <span class="text-body2 text-commTextLevel1">{{ item.title }}</span>
          <span class="text-[10px] leading-[18px] font-[400] text-commTextLevel2">{{ item.time }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-h4 text-commTextLevel1"
            @mouseenter="(e) => controller.openPopover(e, item.hasContentPopover)"
            :class="{'cursor-pointer': item.hasContentPopover}">{{ item.content }}</span>
          <STTag :mode="STTagModeType.SINGLE" :props="item.tag" v-if="!!item.tag?.value" />
        </div>
        <div v-if="!!item.comment" class="rounded-[4px] p-[8px] bg-commBgLevel2 text-body2 text-commTextLevel1">{{
          item.comment }}</div>
        <Button v-if="!!item.action?.label" :label="item.action.label" @click="actionBtn($event,item)"
          :severity="item.action.severity" :outlined="item.action.severity == 'outlined'" :icon="item.action.icon"
          iconPos="right" :text="item.action.isText" class="w-fit px-0 py-[8px] hover:!bg-transparent" />
      </div>
    </div>
  </div>

  <Popover :ref="controller.contentPopover" :pt="style.getPopoverStyleOption()">
    <slot name="contentPopover" />
  </Popover>
</template>