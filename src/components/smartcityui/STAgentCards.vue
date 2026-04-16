<script setup lang="ts">
import { ref } from 'vue';
import { STCardItem } from './STCardCustom.model';
import Icon from "@/components/Icon.vue"
import { ThemeSwitchController } from './STThemeMode.compsable';
const props = defineProps({
    datas: {
        type: Array<STCardItem>,
            default:[]
    }
})
let themeController = new ThemeSwitchController(false);
let mode = ref(themeController.getModeString()) ;

const emit = defineEmits(['eventActionCard'])
const actionCard=(card)=>{
       emit('eventActionCard', card)
}

</script>

<template>
    <div class="grid grid-cols-2 gap-[16px] pt-[14px] pl-[13px]">

        <div  v-for="card in props.datas"  class="group" >
    
            <div class="w-[332px] h-[154px] rounded-[8px] p-[16px]"
                :class="{
                    'group-hover:shadow-none group-hover:border-foneBorder group-hover:border-[1px] !bg-foneBgLevel1':mode=='dark',
                    'group-hover:shadow-[0px_4px_15px_0px_#626B7640] !bg-foneBg':mode=='light'
                }"
                @click="actionCard(card)"
            >
                <!--- header --->
                <div class="flex justify-between items-start group-hover:items-center">
                    <div>
                        <Avatar :label="'A'" 
                            style="font-size: 18px; font-weight: bold; color: white;" 
                            shape="circle" 
                            class="!min-w-[42px] !h-[42px]" />
                    </div>
                    <!--- text --->  
                    <div class="group-hover:hidden">
                        <div class="flex justify-start items-center">
                            <Icon :name="card.subIconL" v-if="card.subIconL != null" class="mr-[4px]"></Icon>
                            <div v-if="card.subTitleFunc != null" v-html="card.subTitleFunc(card)" style="white-space:normal" ></div>
                            <div v-else class="w-[150px] ">{{ card.subTitle ?? '' }}</div>
                        </div>
                    </div>
                    <!--- btn --->  
                    <div class="hidden group-hover:!block">
                        <div class="cursor-pointer w-[64px] h-[32px] text-[14px] !font-bold leading-[22px] !text-fonePrimaryMain !bg-foneCardHoverbtnBackground flex justify-center items-center rounded-[4px]">選擇</div>
                    </div>
                </div>  
                <!--- body --->
                <div class="text-[16px] font-bold mt-[8px] mb-[4px] leading-[24px] group-hover:text-fonePrimaryHover">{{ card.title }}</div>
                <div class="text-[14px] leading-[22px] text-foneTextDisable line-clamp-2">{{ card.content }}</div>
            </div>




        </div>
    </div>
</template>
