<script setup lang="ts">
import STPanel from '@/components/smartcityui/STPanel.vue'
import { useI18n } from 'vue-i18n'
import Icon from "@/components/Icon.vue"
import { STAction } from './STCommon.model'
import { STFormItem } from './STForm.model'

const { t, locale } = useI18n()
const emit = defineEmits(['eventAction'])
const props = defineProps({
    title: {
        type: String,
        default:''
    },
    subTitleItems: {
        type: Array<STFormItem>,
        default:[]
    },
    contentItems: {
        type: Array<STFormItem>,
        default:[]
    },
    isEditor:{
        type:Boolean,
        default:true
    },
    actions:{
        type:Array<STAction>,
    },

})


const actionfunction=(e,item)=>{
    emit("eventAction",e,item)
}
</script>

<template>
<div class="w-full bg-foneBgLevel1 rounded-[8px] pb-[20px] ">
    <!-- header -->
    <div class="flex justify-between items-center px-[20px] pt-[10px]">
        <!-- 左側標題 -->
        <div class="flex items-center">
            <div class="w-[4px] h-[16px] bg-fonePrimaryMain"></div>
            <h4 class="pl-[8px] font-bold">{{ t(props.title) }}</h4>
            <div v-if="props.isEditor" class="pl-[6px]">
                    <Button v-for="item in props.actions" @click="actionfunction($event, item)" text v-tooltip.bottom="t(item.Tooltip)"
                    severity="secondary" class="!w-[32px] !h-[32px]">
                    <template #icon>
                        <Icon :name="item.Icon" custom-class="text-fonePrimaryMain !w-[18px] !h-[18px]"></Icon>
                    </template>
                    </Button>
            </div>
        </div> 
        <!-- 右側標題 -->
        <div class="flex items-center justify-start">
            <div v-for="(subTitleItem,index) in props.subTitleItems" class="flex justify-start items-center">
                <div class="text-foneTextLevel2 text-[14px] leading-[22px]">{{ t(subTitleItem.Name)}}：</div>
                <div class="text-foneTextLevel1 text-[14px] leading-[22px]"> {{ subTitleItem.Value?.value ?? subTitleItem.Value}}</div>
                <div v-if="props.subTitleItems.length-1 != index" class="h-[16px] w-[1px] bg-foneBorder mx-[8px]"></div>
            </div>
             
        </div>       
    
    </div>
    <!-- content-->
    <div class="px-[20px] pt-[16px]">
        <div v-for="(subTitleItem,index) in props.contentItems" class="flex justify-start items-center">
                <div class="text-foneTextLevel1 text-[14px] leading-[22px]">{{ t(subTitleItem.Name)}}：</div>
                <div class="text-foneTextLevel1 text-[14px] leading-[22px]"> {{ subTitleItem.Value?.value ?? subTitleItem.Value}}</div>
        </div>
    </div>  


</div>
</template>