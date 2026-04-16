<script setup lang="ts">
import Chart from 'primevue/chart';
import { STChartPercentageItem , STPercentageType } from './STChartPercentage.model';
import { STChartItemColor } from './STChart.model';
import { STIconButtonProps } from '@/components/smartcityui/STIconButton.model'
const props = defineProps({
    type: {
        type: String,
    },
    data:{
        type:Object
    },
    options:{
        type:Object
    },
    percentageItem: {
        type: STChartPercentageItem,
    },
    chartclass:{
        type:String
    },
    legendItems:{
        type:Array<STChartItemColor>,
            default:[]
    }
   
   
})
const infoBtnProps = new STIconButtonProps({ iconUrl: 'ic_info_dark'.getIcon('svg'), tooltipText: props.percentageItem?.info })
</script>

<template>
      <div class="w-full bg-foneBgLevel1 rounded-[6px] border-[1px] border-foneBorder h-[300px]">
        <div class="flex justify-start items-center pt-[16px] px-[24px] gap-[4px]" v-if="props.percentageItem != null">
            <div class="text-h2 text-foneTextLevel2"> {{ props.percentageItem?.text }} </div>
            <STIconButton class="p-0" :props="infoBtnProps" />
            <!-- <img :src="'ic_info_dark'.getIcon('svg')" alt="info icon"> -->
            <!-- <div>{{ props.percentageItem?.info }}</div> -->
        </div>
        <div class="flex justify-start pt-[4px] items-center px-[24px] pb-[12px]" 
        v-if="props.percentageItem != null && props.percentageItem.percentageType == STPercentageType.DIFFERENCE">
            <div class="flex items-end">
                <div class="text-[32px] leading-[38px] font-[500] text-foneTextLevel1">{{ props.percentageItem.value }}</div>
                <div class="text-[20px] font-[700] text-foneTextLevel1">{{ props.percentageItem.unit }}</div>
            </div>
           
            <div class="flex flex-col gap-[2px] items-start pl-[16px]">
                <div class="flex gap-[4px] items-center">
                    <img :src="`${props.percentageItem.diffStatusUrl}`.getIcon('svg')" alt="">
                    <span class="font-[700]" 
                    :class="props.percentageItem.getClassContent()">
                    {{ props.percentageItem.diffStatusNumber }}
                    </span>
                </div>
                <span class="text-foneTextLevel2 text-body4">{{props.percentageItem.diffStatusDesc }}</span>
            </div>
        </div>
        <div class="flex justify-start  px-[24px] pb-[12px] h-[48px]" 
        v-if="props.percentageItem != null && props.percentageItem.percentageType == STPercentageType.TAG">
            <!-- <div class="text-[14px] text-foneTextLevel1 bg-foneBgLevel3 px-[12px] py-[8px] rounded-[4px]"> {{ props.percentageItem.value }}</div> -->
        </div>
        <div class="flex justify-start  px-[24px] h-[48px]" 
        v-if="props.percentageItem != null && props.percentageItem.percentageType == STPercentageType.LEGEND">
            <div v-for="item in props.legendItems" class="flex justify-start items-center pr-[12px]">
                <div :class="`rounded-[4px] h-[8px] w-[8px]`" :style="`background-color:${item.color}`"></div>
                <div class="pl-[7px]">{{ item.name }}</div>
            </div>
        </div>


         <div class="pt-[12px] pb-[16px] px-[24px] flex justify-center">
            <Chart :type="props.type" :data="props.data" :options="props.options" :class="props.chartclass"  class="w-full flex justify-center" />
         </div> 
       
     </div>
    
</template>
