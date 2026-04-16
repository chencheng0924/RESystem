<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { STTabAction, STTabProps } from './STTab.model'
import { PageEventBus, PageEventEnum } from '@/lib/pageBuilder/mitt/PageEventBus';
import { DateExtension } from "@/utils/dateExtension";
import { STTabListRow } from './STTabList.model';

// 通知專用
const props = defineProps({
  actions: {
    type: Array<STTabAction>,
  },
  datas:{
    type: Array<STTabListRow>,
    default: []
  },
  customTabPT: {
    type: Object
  },
  customTabListPT: {
    type: Object
  },
  elementDatas:{
    type: Object
  },
  activeIdx:{
    type: Number,
    default: ref(Number(localStorage.getItem('TAB_ACTIVE_IDX'))) || ref(0)
  },
})
const emit = defineEmits(['update:modelValue','tabRowEvent','tabChangeEvent'])
const tabRowEvent = (e,item) =>{
  
  e.stopPropagation();

  tabActiveContentRef.value = item.content;
  emit('tabRowEvent',item)
}
const tabChangeEvent = (idx) =>{
  emit('tabChangeEvent',idx)
}

const tabspt = {
  root: ({ props }) => ({
        class: [
            // '!bg-foneAccordionContentBackground'
        ]
    }),


}

const tabListspt = {
  root: ({ props }) => ({
        class: [
            'border-b-[1px] !border-foneBorder',
            // '!bg-foneAccordionContentBackground'

        ]
    }),
  tabList: ({ props }) => ({
        class: [
           '!gap-[24px]',
           '!bg-foneTabsBackground'

        ]
    }),
  content: ({ props }) => ({
        class: [
          // '!bg-foneAccordionContentBackground'
        ]
    }),

}
const tabpt = {
  root: ({ props }) => ({
        class: [
            '!px-[0px]',
              '!bg-foneTabsBackground'

        ]
    }),
}

const tabpanelspt = {
  root: ({ props }) => ({
        class: [
            '!px-[0px] !pt-[16px] !pb-[0px]',
              '!bg-foneTabsBackground'

        ]
    }),
}

const isRead = ref(false);

const clickTag = (e)=>{
    for(var i=0;i<props.datas.length;i++){
      let temp:STTabListRow = new STTabListRow(props.datas[i]) ;
          if(temp.isAllRead()==false){
            isRead.value = false;
            return ;
          }
    } 

    isRead.value = true;
}

const tabActiveContentRef=ref('')


</script>

<template>
  <div v-if="tabActiveContentRef == '' ">

  
  <Tabs :value="props.activeIdx" :pt="tabspt">
    <TabList :pt="tabListspt">
        <Tab v-for="(item,idx) in datas" :value="idx" @click="tabChangeEvent(idx)" :pt="tabpt">
          {{item.tabName}}
        </Tab>
        <div class="ml-auto">
          <Button :disabled="isRead" class="w-[88px] h-[32px] mt-[10px]" :label="props.elementDatas.BtnLabel" :severity="'secondary'" variant="outlined" icon="pi pi-check" @click="clickTag"></Button>
        </div>
    </TabList>
    <TabPanels :pt="tabpanelspt">
        <TabPanel class="p-0" v-for="(item,idx) in datas" :value="idx">
          <div v-for="(row, rIdx) in item.tabRow" :key="rIdx" class="flex flex-col border-b border-foneBorder py-[12px] cursor-pointer" @click="tabRowEvent($event,row)">
            <div class="text-[14px] text-foneTextLevel1 font-bold truncate">
              <span v-if="row.isRead" class="inline-block w-[6px] h-[6px] !bg-foneThemeRed rounded-full mr-[2px]"></span>{{ row.content }}
            </div>
            <div class="text-[12px] leading-[18px] text-foneTextLevel2 pt-[4px]">
              {{ DateExtension.getDateFormat(row.createdDate,'YYYY/MM/DD') }}
            </div>
        </div>

        <div class="text-center text-gray-400 py-4 text-sm">
          沒有更多通知了
        </div>
        </TabPanel>
    </TabPanels>
  </Tabs>
  </div>
  <div v-else>
    <div v-html="tabActiveContentRef"></div>
  </div>
</template>

