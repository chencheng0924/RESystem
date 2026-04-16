<script setup lang="ts">
import { computed, ref } from 'vue'
import { STCardProps } from '../STCard.model'
import { ThemeSwitchController } from '../STThemeMode.compsable'
import { STFormItem } from '../STForm.model'
import { useI18n } from 'vue-i18n'
import { STAction, STComponentItem } from '../STCommon.model'
import Icon from "@/components/Icon.vue"
const { t, locale } = useI18n()
const emit = defineEmits([
"eventEditorUpdate","eventActionBtn"
])
const props = defineProps({
    title:{
        type:String,
        default:''
    },
    tools: {
        type: Array<STAction>,
        default:[]
    },
    formItems:{
         type: Array<STFormItem>,
        default:[]
    }
})
const editorUpdate=(e,item)=> {
    emit('eventEditorUpdate', e,item)
  }

const actionItemByRow = (item: STAction) => {
    emit('eventActionBtn', item);
}



// const splideCardClicked=(card: STCardProps)=> {
//     emit('eventSplideCardClicked', card)
//   }



// const saveHistory=(data: any)=>{
//     emit('eventSaveHistory',data)
//   }

// const loadHistory=()=>{
//     emit('eventLoadHistory')
//   }
// let showCardZone = ref(false)
//  const updateCardZoneStatus=()=> {
//     showCardZone.value = !showCardZone.value
// }



let splideOptions = {
      rewind: true,
      perPage: 2,
      arrows: false,
      omitEnd: true,
      padding: { left: 0, right: '10%' },
      pagination: false,
      gap: '20px',
      breakpoints: {
        1300: {
          perPage: 1,
          padding: { left: 0, right: '30%' }
        },
        1100: {
          perPage: 1,
          padding: { left: 0, right: '20%' }
        },
      }
    };
let themeController = new ThemeSwitchController(false)
let emptyImg = themeController.getSearchEmptyImage()
let imgSearchEmpty = ref(emptyImg)
const splideCardList = []// propmt list

const titleValue = ref(props.title);

if(titleValue.value== ''){
    titleValue.value = t('View.PromptConfig.Prompt_Title')
}



</script>

<template>

    <div class="w-full flex flex-col relative h-full overflow-hidden bg-foneBgLevel1 p-[20px]">             
    <STForm :items="props.formItems" @change="(e,item) => editorUpdate(e,item)" />
    <div>
      <!-- 標題 -->
      <div class="flex justify-start pt-[16px] pb-[8px]">
        <div class="ic/24/lightbulb pr-[4px]">
            <Icon name="ic_lightbulb" custom-class="!w-[18px] !h-[18px] !text-foneTextLevel1"></Icon>
        </div>
        <div class="text-[14px] leading-[22px]">
            {{t('View.PromptConfig.Prompt_Library_Title') }}
        </div>
      </div>
      <!-- 方塊選項 -->
      <div class="w-full h-[94px] flex gap-4 ">
        <div v-for="item in  props.tools" class="flex-1 flex-col h-[94px] bg-foneBgLevel6 rounded-[4px] p-[12px] cursor-pointer hover:bg-fonePropmtCardBackground"
        @click="actionItemByRow(item)">
          <div class="text-[14px] leading-[22px] font-bold text-foneTextLevel1 pb-[4px] line-clamp-1">{{ t(item.Text) }}</div>
          <div class="text-[14px] leading-[22px] text-foneTextLevel1 line-clamp-2">{{ t(item.Message ?? '') }}</div>
        </div>

      </div>

      
    </div>
                 
    </div>
</template>
