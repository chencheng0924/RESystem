<script setup lang="ts">
// const props = defineProps({
//     title: {
//         type: String,
//         default: ''
//     },
//     linkTitle: {
//         type: String,
//         default: ''
//     },
//     linkUrl: {
//         type: String,
//         default: ''
//     }
// })
import { PagePanelItem } from '@/lib/pageBuilder/core/PagePanelItem.new'

const props = defineProps<{
  props?: PagePanelItem
}>()
</script>

<template>
  <div class="h-full flex flex-col gap-[16px]">
    <div class="flex items-center w-full justify-between">
      <div class="flex items-center gap-[8px]" v-if="!!props.props.title">
        <div class=" w-[4px] h-[16px] bg-fonePrimaryMain"></div>
        <span class="text-h3 text-foneTextLevel1">{{ props.props.title }}</span>
      </div>
      <router-link :to="props.props.linkUrl" v-if="!!props.props.linkUrl">
        <div class="flex items-center">
          <span class="text-h4 text-fonePrimaryMain">{{ props.props.linkTitle }}</span>
          <img :src="'Arrow-right'.getIcon('svg')" alt="arrow">
        </div>
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>
