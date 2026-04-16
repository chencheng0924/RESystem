<script setup lang="ts">
import { ref } from 'vue'
import { STSkeletonProps, STSkeletonType } from './STSkeleton.model'
const props = withDefaults(defineProps<{
  props?: STSkeletonProps
}>(), {
  props: () => (new STSkeletonProps({
    type: STSkeletonType.DEFAULT,
    width: '100%',
    height: '1rem'
  }))
})
</script>
<template>
  <!-- default -->
  <Skeleton v-if="props.props.type == STSkeletonType.DEFAULT" :size="props.props.size" :width="props.props.width" :height="props.props.height" :shape="props.props.shape" :animation="props.props.animation"></Skeleton>
  <!-- card IMG_WITH_FOOTER -->
  <div v-if="props.props.type == STSkeletonType.CARD_IMG_WITH_FOOTER" class="flex flex-col p-[16px] bg-foneBgLevel1 rounded-[8px] border-[1px] border-foneBorder">
    <div class="flex gap-[10px]">
      <Skeleton shape="circle" width="60px" height="60px"></Skeleton>
      <div class="flex flex-col gap-[8px] grow">
        <div class="flex flex-col gap-[4px]">
          <Skeleton width="4rem"></Skeleton>
          <Skeleton width="10rem"></Skeleton>
        </div>
        <Skeleton width="100%" height="6rem"></Skeleton>
      </div>
    </div>
    <Divider align="left" type="solid"></Divider>
    <div class="w-full flex justify-between">
      <div class="flex gap-[2px]">
        <Skeleton width="2rem" height="2rem"></Skeleton>
        <Skeleton width="2rem" height="2rem"></Skeleton>
      </div>
        <Skeleton width="5rem" height="2rem"></Skeleton>
    </div>
  </div>
</template>