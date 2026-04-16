<script lang="ts" setup>
import { ref } from 'vue'
import { STAttributePanelProps } from './STAttributePanel.model';
import { UseSTAttributePanelStyle } from './STAttributePanel.controller';
import { STFormItem } from './STForm.model';
import STForm from './STForm.vue';
import { ThemeSwitchController } from './STThemeMode.compsable';
const style = new UseSTAttributePanelStyle()
const props = defineProps<{
  attData?: STAttributePanelProps
}>()
let themeController = new ThemeSwitchController(false)
let mode = themeController.getSearchEmptyImage()
let imgSearchEmpty = ref(mode)
const emit = defineEmits<{
  'updateFormData': [val: any]
}>()
const inputChange = (val) => {
  emit('updateFormData', val)
}
</script>
<template>
  <!-- <div class="w-full flex flex-col gap-[8px] h-full overflow-y-scroll"> -->
  <div class="w-full flex flex-col gap-[8px]">
    <div class="flex flex-col px-[16px] py-[8px]">
      <STAccordionCustom :data="props.attData.dataList" :multiple="true" :headerPt="style.accordionHeader"
        :panelPt="style.accordionPanel" :contentPt="style.accordionContentPt">
        <template #header="{ title }">
          <div class="w-full flex justify-start">
            <span class="font-bold">{{ title }}</span>
            <!-- <span>這邊看之後要放什麼</span> -->
          </div>
        </template>
        <template #content="{ content }">
          <div v-if="content && content.length > 0" class="px-[8px]">
            <STForm :items="content" @change="inputChange" @selectChange="inputChange" />
          </div>
          <div v-else class="w-full flex flex-col justify-center items-center gap-[8px]">
            <img :src="imgSearchEmpty" width="84" height="84"/>
            <span class="text-h3">無資料</span>
          </div>
        </template>
      </STAccordionCustom>
    </div>
  </div>
</template>