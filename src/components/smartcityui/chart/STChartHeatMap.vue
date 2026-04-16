<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { UseSTChartHeatMap } from "@/components/smartcityui/chart/STChartHeatMap.composable";
import { STChartHeatMapItem, STChartHeapMapColorModel } from "@/components/smartcityui/chart/STChartHeatMap.model";
import { STIconButtonProps } from '../STIconButton.model';
const controller = new UseSTChartHeatMap();
const props = defineProps({
    gridRowLabel: {
        type: Array<String>,
        default: []
    },
    gridColLabel: {
        type: Array<String>,
        default: []
    },
    gridRowData: {
        type: Array<String>,
        default: []
    },
    gridColData: {
        type: Array<String>,
        default: []
    },
    gridData: {
        type: Array<String>,
        default: []
    },
    stepColors: {
        type: Number,
        default: 21 // 顏色區塊數量
    },
    startColors: {
        type: STChartHeapMapColorModel,
        default: {}
    },
    endColors: {
        type: STChartHeapMapColorModel,
        default: {}
    },
    chartHeatMapItem: {
        type: STChartHeatMapItem,
        default: {}
    }
})

const gradientColors = computed(() => {
    let startColor = props.startColors //{ r: 158, g: 142, b: 255, a: 0 };
    let endColor = props.endColors//{ r: 128, g: 107, b: 255, a: 1 };
    const colors = [];
    for (let i = 0; i <= props.stepColors; i++) {
        const r = Math.round(controller.interPolate(startColor.r, endColor.r, i / props.stepColors));
        const g = Math.round(controller.interPolate(startColor.g, endColor.g, i / props.stepColors));
        const b = Math.round(controller.interPolate(startColor.b, endColor.b, i / props.stepColors));
        const a = controller.interPolate(startColor.a, endColor.a, i / props.stepColors).toFixed(2);
        colors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
    return colors;
})
const infoBtnProps = new STIconButtonProps({ iconUrl: 'ic_info_dark'.getIcon('svg'), tooltipText: props.chartHeatMapItem.info })
</script>
<style scoped>
.grid-container {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    /* 增加一列 */
    grid-gap: 2px;
}

.grid-row {
    display: grid;
    grid-template-columns: repeat(26, 1fr);
    /* 增加一欄 */
    grid-gap: 2px;

}
</style>

<template>
    <div class="w-full rounded-[6px] border-[1px] border-foneBorder bg-foneBgLevel1 pt-[16px] px-[24px]">
        <div class="flex pb-[10px] text-h2 text-foneTextLevel2 gap-[4px]">{{ props.chartHeatMapItem.chartTitle }}
            <STIconButton class="p-0" :props="infoBtnProps" />
            <!-- <img :src="`ic_info`.getIcon('svg')" /> -->
        </div>
        <div class="flex justify-between pb-[27px]">
            <div class="text-h2 text-foneTextLevel2">{{ props.chartHeatMapItem.chartSubtitle }} <span
                    class="text-[32px] text-foneTextLevel1">{{ props.chartHeatMapItem.chartValue }}</span>
            </div>
            <div class="flex flex-row">
                <div v-for="(color, index) in gradientColors" :key="index"
                    class="flex items-center justify-center w-[10px] h-[18px]" :style="{ backgroundColor: color }">
                    <span v-if="index === 0 || index === 20" class="mt-[50px] text-body4 text-foneTextLevel2">
                        {{ index }}
                    </span>
                </div>
            </div>
        </div>
        <div class="grid-container">
            <div v-for="(week, index) in props.gridRowData" :key="index" class="grid-row">
                <div class="text-body4 text-foneTextLevel1 w-[30px] mr-[10px] whitespace-nowrap">{{ week }}</div>
                <div v-for="(hour, index) in  props.gridColData" :key="index"
                    class="w-[31px] h-[34px] border border-solid border-foneBorder"
                    :style="controller.getCellStyle(week, hour, props.gridData, props.gridRowLabel, props.startColors, props.endColors, props.stepColors)">
                    {{ controller.getCellContent(week, hour, props.gridData, props.gridRowLabel) }}
                </div>
            </div>

            <div class="grid-row">
                <div class="text-body4 text-foneTextLevel1"></div>
                <div v-for="(hour, index) in props.gridColData" :key="index"
                    class="text-body4 text-foneTextLevel1 ml-[16px]">
                    {{ controller.getHourLabel(hour, props.gridColLabel) }}
                </div>
            </div>
        </div>
    </div>
</template>