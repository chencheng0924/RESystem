<script setup lang="ts">
import { ref } from 'vue';
import { STAccordionCustomConfig } from './STAccordionCustom.model'
import { AccordionPassThroughOptions } from 'primevue/accordion'
import { ThemeSwitchController } from '@/components/smartcityui/STThemeMode.compsable';

const props = defineProps({
  data: {
    type: Array<STAccordionCustomConfig>,
  },
  headerPt: {
    type: Object
  },
  contentPt: {
    type: Object
  },
  multiple: {
    type: Boolean,
    default: false
  },
  panelPt: {
    type: Object
  },
  accordionIndexValue: {
    type: Array<string>
  }
})
const emit = defineEmits<{
  'updateValue': [val: string[]],
}>()
const updateValue = (val) => {
  emit('updateValue', val)
}
let themeController = new ThemeSwitchController(false)
let emptyImg = themeController.getSearchEmptyImage()
let imgSearchEmpty = ref(emptyImg)
</script>
<template>
  <Accordion :value="props.accordionIndexValue ?? [props.data?.firstOrDefault()?.value]" v-if="!!props.data" multiple @update:value="updateValue">
    <AccordionPanel :pt="props.panelPt" v-for="(tab, idx) in props.data" :key="idx + 'accordion'" :value="tab.value" v-if="props.data.length > 0">
      <AccordionHeader :pt="props.headerPt">
        <slot name="header" :title="tab.title"></slot>
      </AccordionHeader>
      <AccordionContent :pt="props.contentPt">
        <slot name="content" :content="tab.contentList"></slot>
      </AccordionContent>
    </AccordionPanel>
    <div v-else class="mt-[200px] w-full flex flex-col justify-center items-center gap-[12px]">
      <img :src="imgSearchEmpty" class="w-[100px]" />
      <div class="text-h3 text-foneTextLevel2">無設定檔</div>
    </div>
  </Accordion>
</template>