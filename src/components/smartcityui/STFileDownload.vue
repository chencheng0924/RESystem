<script lang="ts" setup>
import { STFileItem } from './STFileDownload.model'
const props = defineProps<{
  props?: STFileItem[]
}>()
const emit = defineEmits<{
  'download': [val: any]
}>()
const download = (file: any) => {
  emit('download', file)
}
</script>
<template>
  <div class="flex flex-wrap w-full gap-[16px]">
    <div v-for="(file, idx) in props.props" :key="idx + 'file'"
      class="w-[342px] py-[8px] px-[16px] flex items-center justify-between bg-commBgLevel1 rounded-[4px] border-solid border-[2px] border-transparent hover:!border-b-commPrimaryClick cursor-pointer group">
      <div class="flex gap-[8px] items-center">
        <img :src="`ic_${file.type}`.getIcon('svg')" :alt="file.type">
        <span class="text-h5 text-commTextLevel1">{{ file.title }}</span>
        <div class="w-[1px] h-[16px] bg-commBorder"></div>
        <span class="text-body2 text-commTextLevel2">{{ file.size }}</span>
      </div>
      <div class="hidden group-hover:!flex gap-[4px] py-[4px] px-[8px]" @click="download(file.file)">
        <span class="text-h4 text-commPrimaryClick">下載</span>
        <img :src="'ic_download'.getIcon('svg')" alt="download">
      </div>
    </div>
  </div>
</template>