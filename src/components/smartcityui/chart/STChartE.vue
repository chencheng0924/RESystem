<script setup lang="ts">
import { defineAsyncComponent } from "vue";
// import VChart from "vue-echarts";
// 使用defineAsyncComponent引入package，因為原本的做法會造成primeVue組件樣式消失問題
const VChart = defineAsyncComponent(() => import('vue-echarts'))
import { STChartPercentageItem , STPercentageType } from './STChartPercentage.model';
import { STIconButtonProps } from '@/components/smartcityui/STIconButton.model'
import { EChartsOption } from "echarts";
import { ChartEController } from './STChartE.composable'
const props = defineProps<{
  type?: string,
  data?: object,
  options?: EChartsOption,
  percentageItem?: STChartPercentageItem,
  chartclass?: string
}>()
const controller = new ChartEController().setOption(props.options)
const infoBtnProps = new STIconButtonProps({ iconUrl: '', tooltipText: props.percentageItem?.info })
</script>

<template>
  <div class="w-full bg-foneBgLevel1 rounded-[6px] h-[300px]" :class="{'h-[380px]': props.type == 'heatmap'}">
    <div class="flex justify-start items-center pt-[16px] px-[24px] gap-[4px]" v-if="props.percentageItem != null">
        <div class="text-h2 text-foneTextLevel2"> {{ props.percentageItem?.text }}</div>
        <STIconButton class="p-0" :props="infoBtnProps" />
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

    <div class="px-[24px] flex justify-center">
      <VChart class="w-full h-[250px]" autoresize :option="controller.option.value" :class="props.chartclass"/>
    </div> 
  
  </div>
</template>