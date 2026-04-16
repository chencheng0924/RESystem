<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { STAccordionConfig } from './STAccordion.model'
import Icon from '@/components/Icon.vue'
const props = defineProps({
  data: {
    type: Array<STAccordionConfig>,
  },
  headerPt: {
    type: Object,
     default:null
  },
  contentPt: {
    type: Object,
     default:null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  panelPt: {
    type: Object,
    default:null
  },
  time: {
    type: String,
    default:''
  },
  tag: {
    type: String,
    default:''
  }
})


const pt={
  root: ({ props }) => ({
        class: [
            // Spacing
            '!border-[0px]'
        ],
        // onClick: (event: MouseEvent) => {
        //     console.log('Clicked header:', event)
        // }
    }),

}

const panelPtTemp ={
  root: ({ props }) => ({
        class: [
            // Spacing
            '!border-[0px]',
             '!bg-foneAccordionHeaderBackground'
        ]
    }),
}

const headerPtTemp ={
  root: ({ props }) => ({
        class: [
            // Spacing
            '!border-[0px]',
            '!font-normal !text-[14px] leading-[22px]',
            '!px-[0px] !py-[5px]',
        ]
    }),
  toggleicon:({ props }) => ({
      class: [
          '!text-foneTextLevel1'
      ]
  }),
}

const contentPtTemp ={
  root: ({ props }) => ({
        class: [
            // Spacing
            '!border-[0px]',
           
        ]
    }),
  content: ({ props }) => ({
      class: [
          // Spacing
          '!border-[0px] !p-[12px]',
          '!bg-foneAccordionContentBackground !rounded-[6px]'
      ]
  }),
}

const accordionRef = ref(null)
const lastClickEvent = ref(null)

function onTabClose(e: any) {
  c({
    ...e,
    originalEvent: lastClickEvent.value,
  })
}

function c(e: any) {
  console.log('Accordion close event:', e)
  e.originalEvent.stopPropagation();
}

function handleHeaderClick(e: Event) {
  lastClickEvent.value = e
}

onMounted(() => {
  const headers = accordionRef.value?.$el?.querySelectorAll('.p-accordion-header')
  headers?.forEach((el) => el.addEventListener('click', handleHeaderClick))
})

onBeforeUnmount(() => {
  const headers = accordionRef.value?.$el?.querySelectorAll('.p-accordion-header')
  headers?.forEach((el) => el.removeEventListener('click', handleHeaderClick))
})

function onAnyClick(event: MouseEvent) {
  lastClickEvent.value = event
}

</script>
<template>
  <Accordion :value="[props.data.firstOrDefault().value]" v-if="!!props.data" multiple :pt="pt"  
  ref="accordionRef"  @tab-close="onTabClose"  @tab-open="onTabClose"
  @click.capture="onAnyClick">
    <template #expandicon> 
      <Icon name="ic_arrow_down" customClass="!w-[18px] !h-[18px]"></Icon>
    </template>
    <template #collapseicon> 
      <Icon name="ic_arrow_up" customClass="!w-[18px] !h-[18px]" ></Icon>
    </template>

    <AccordionPanel :pt="props.panelPt ?? panelPtTemp" v-for="(tab, idx) in props.data" :key="idx + 'accordion'" :value="tab.value" >
      <AccordionHeader :pt="props.headerPt ?? headerPtTemp" >
        <div>
          <span class="mr-[10px]">{{ tab.title }}</span>
          <span v-if="props.tag" class="text-[#00A459] rounded border-2 border-solid border-[#B9D7C9] p-[3px] bg-[#E3F9E9]">{{ props.tag }}</span>
        </div>
      </AccordionHeader>
      <span class="text-foneTextLevel2" v-if="props.time">{{props.time}}</span>
      <AccordionContent :pt="props.contentPt ?? contentPtTemp">
        <div class="text-body2 text-commTextLevel1" v-html="tab.content"></div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>


<style lang="scss">
.p-accordionpanel-active{
  & button{
     font-weight:700 !important;
  }
}
</style>