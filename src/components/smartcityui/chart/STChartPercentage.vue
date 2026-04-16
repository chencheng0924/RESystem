<script setup lang="ts">
import { STChartPercentageItem } from './STChartPercentage.model';

const props = defineProps({
    percentageItems: {
        type: Array<STChartPercentageItem>,
    },
   
})
</script>

<template>
    <div class="w-full flex gap-[16px] h-[179px]">
        <div v-for="kpi in props.percentageItems"
        class="bg-foneBgLevel1 px-[19px] w-1/3 flex flex-col items-center justify-center rounded-[6px] gap-[4px]">
        <span class="text-foneTextLevel2 text-h4">{{ kpi.text }}</span>
        <div class="flex items-end gap-[4px]">
            <span class="text-[32px] leading-[38px] font-[500] text-foneTextLevel1 tracking-[-0.05em]">{{ kpi.value }}</span>
            <span class="text-h2 text-foneTextLevel1">{{ kpi.unit }}</span>
        </div>
            <!-- ------------ -->
            <div class="flex flex-col gap-[2px] items-center">
                <div class="flex gap-[4px] items-center h-[21px]">
                    <img :src="`${kpi.diffStatusUrl}`.getIcon('svg')" alt="">
                    <span class="font-[700]" 
                    :class="kpi.getClassContent()">
                    {{ kpi.diffStatusNumber }}
                    </span>
                </div>
                <span class="text-foneTextLevel2 text-body4">{{kpi.diffStatusDesc }}</span>
            </div>
        </div>
    </div>

</template>
