<script setup lang="ts">
import { computed, ref } from 'vue'
import { STCardProps } from '../STCard.model'
import { ThemeSwitchController } from '../STThemeMode.compsable'
import { STFormItem } from '../STForm.model'
import { useI18n } from 'vue-i18n'
import { STAction } from '../STCommon.model'

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

    <div class="w-full flex flex-col relative h-full overflow-hidden">
                      <div class="flex items-center justify-between px-[16px] py-[8px] text-h4 border-b-[1px] border-b-foneBorder">
                        {{ titleValue }}
                        <div class="flex gap-2">
                         <Button v-tooltip.top="t(ac.Text)"
                                    v-for="ac in props.tools"
                                    :icon="ac.Icon" text rounded :aria-label="t(ac.Text)"
                                    @click="actionItemByRow(ac)" />
                        </div>
                      </div>

                      <STForm :items="props.formItems" @change="(e,item) => editorUpdate(e,item)" />
                 
    </div>
</template>
