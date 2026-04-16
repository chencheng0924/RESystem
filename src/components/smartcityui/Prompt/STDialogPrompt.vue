
<template>
 

  <div class="flex justify-between w-full pt-2 !rounded-[6px] h-[500px]" >
    <Splitter class="w-full h-full" >
      <SplitterPanel class="flex items-start h-full" :size="30">


        <Tabs value="0">
            <TabList>
                <Tab value="0">{{t('View.PromptConfig.Template_Title')}}</Tab>
                <Tab value="1">{{t('View.PromptConfig.Prompt_History')}}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="h-[500px] w-[400px] flex flex-col gap-[4px] overflow-y-scroll">
                      <div v-for="(data, idx) in props.templates">
                        <div v-html="props.listByHtml(data)" class="p-2 mr-4 rounded-[4px] cursor-pointer hover:text-fonePrimaryClick hover:bg-fonePrimaryBg "
                          @click="() => listClick(data, idx)" ></div>
                      
                      </div>
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="h-[500px] w-[290px] flex flex-col gap-[4px] overflow-y-scroll">
                      <div v-for="(data, idx) in userHistoryLocal" class="flex justify-between items-start">
                        <div v-html="props.listByHtml(data)" class="p-2 mr-4 rounded-[4px] cursor-pointer hover:text-fonePrimaryClick hover:bg-fonePrimaryBg "
                          @click="() => listClick(data, idx)" ></div>
                        <div class="p-2 w-[40px] flex justify-end">
                          <STButtonPopover :actions="actionList" @eventActionSubBtn="()=>deleteClick(data,props.userHistory, idx)"></STButtonPopover>
                        </div>
                      </div>
                    </div>
                </TabPanel>

            </TabPanels>
        </Tabs>




      </SplitterPanel>
      <SplitterPanel class="flex items-start" :size="70">
      <div class="w-full">
 
      <STMarkdownEditor 
                                    :value="context" :readOnly=true 
                                    height="500px"
                                    ></STMarkdownEditor>

      </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>


<style>
.p-splitter{
  border: none !important;
  border-radius: 6px !important;
}
</style>

<script setup lang="ts">
import STMarkdownEditor from '@/components/smartcityui/Markdown/STMarkdownEditor.vue'
import { ref, watchEffect } from 'vue';
import { STDialogPromptItem } from './STDialogPrompt';
import { useI18n } from 'vue-i18n';
import { UseSTCardTitle } from '../STCardTitle.composable';
import { STMenubarAction } from '../STMenubar.model';
import { MenuItem } from 'primevue/menuitem';

const { t, locale } = useI18n()
const props = defineProps({

  templates:{
    type: Array<STDialogPromptItem>,
    default:[]
  },
  userHistory:{
      type: Array<STDialogPromptItem>,
    default:[]
  },
  listByHtml:{
    type: Function,
    default:null
  },
  listClickFun:{
    type: Function,
    default:null
  },
  deleteClickFun:{
    type: Function,
    default:null
  },
  actionList: {
    type: Array<STMenubarAction>,
  }
});
const popoverList= ref(null)
const emit = defineEmits(['actionItem','eventActionSubBtn'])
const controller = new UseSTCardTitle(emit, t)
const context = ref('');

const listClick = async (item : STDialogPromptItem,index)=>{
      context.value = item?.content ?? ''
      let cValue = await props.listClickFun(item);
      if(cValue != undefined && cValue != null && cValue != ""){
        context.value = cValue;
        item.content = cValue;
      }

      emit('actionItem', item);
}
const userHistoryLocal = ref([...props.userHistory]);
const deleteClick = async (item:STDialogPromptItem,row,index)=>{
  userHistoryLocal.value = userHistoryLocal.value.filter((el)=>{
    if(el.data.key !== item.data.key){
      return el
    }
  })
  context.value = item?.content ?? ''
  let cValue = await props.deleteClickFun(item,row);
  if(cValue != undefined && cValue != null && cValue != ""){
    context.value = cValue;
    item.content = cValue;
  }
  emit('actionItem', item);
}

</script>