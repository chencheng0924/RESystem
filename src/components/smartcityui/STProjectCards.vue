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
    <div class="grid grid-cols-4 gap-[16px] pt-[14px] pl-[13px]">

        <div  v-for="card in props.datas"  class="group" >
    
            <div class="rounded-[8px] p-[16px]"
                :class="{
                    'group-hover:shadow-none border-foneBorder border-[1px] !bg-foneBgLevel1':mode=='dark',
                    'group-hover:shadow-[0px_4px_15px_0px_#626B7640] !bg-foneBg':mode=='light'
                }"
                @click="actionCard(card)"
            >
                <!--- header --->
                <div class="flex justify-between">
                    <div class="text-[16px] font-bold leading-[24px]">{{ card.title }}</div>
                    <!--- text --->  
                    <div class="w-[81px]">
                        <div class="flex justify-start items-center">
                            <Icon :name="card.subIconL" v-if="card.subIconL != null" class="mr-[4px]"></Icon>
                            <div v-if="card.subTitleFunc != null" v-html="card.subTitleFunc(card)" style="white-space:normal" ></div>
                            <div v-else class="w-[150px] ">{{ card.subTitle ?? '' }}</div>
                        </div>
                    </div>
                  
                </div>  
                <!--- body --->
                <div class="text-[14px] leading-[22px] text-foneTextDisable line-clamp-2">{{ card.content }}</div>
            </div>




        </div>
    </div>
</template>
