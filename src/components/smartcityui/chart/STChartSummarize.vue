<script setup lang="ts">
import { STItem } from '../STCommon.model';

const props = defineProps({
    title: {
        type: String,
    },
    titleNumber: {
        type: String,
    },
    items:{
        type:Array<STItem>,
        default:[]
    }
})
</script>

<template>
    <div class="w-full">
          <div
            class="bg-fonePrimaryDashboard h-[75px] px-[24px] py-[13.5px] flex items-center gap-[16px] rounded-tl-[6px] rounded-tr-[6px] relative">
            <span class="text-[#1E1E22] text-h5">{{ props.title }}</span>
            <span class="text-[#1E1E22] text-[32px] font-[700] leading-[48px]">{{ props.titleNumber }}</span>
            <img :src="'caseBg.svg'.getImgPath()" alt="case bg" class="absolute right-0 bottom-0">
          </div>
          <div
            class="flex w-full h-[104px] bg-foneBgLevel1 rounded-bl-[6px] rounded-br-[6px] border-t-transparent">
            <div class="flex flex-col py-[16px] w-1/3 items-center justify-center gap-[4px]"
              v-for="(detail, idx) in props.items"
              :class="{ 'border-y-transparent border-x-foneBorder': idx >= 1}">
              <span class="text-h5 text-foneTextLevel1">{{ detail.text }}</span>
              <span class="text-[32px] font-[700] leading-[48px] text-fonePrimaryMain">{{ detail.value }}</span>
            </div>
          </div>
      </div>
</template>
