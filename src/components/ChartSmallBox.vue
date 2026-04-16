<template>
    <div class="chart-small-box">
        <div v-if="option" class="chart-area">
            <v-chart class="chart" :option="option" autoresize />
        </div>
        <div class="words w-full">
            <div class="tit">{{ title }}</div>
            <div class="content w-full ">
                <template v-if="colorType === 0 || colorType === 1 ">
                    <div class="value" :class="{'red':colorType == 1, 'green': colorType == 0 }">{{ customVal }}{{ customUnit }}</div>
                </template>
                <template v-else>
                    <div class="value w-full" :class="[colorType, {'text-center': !option}]">{{ customVal }}{{ customUnit }}</div>
                </template>
                <div class="rate" :class="{'red':colorType == 1, 'green': colorType == 0}">
                    <template v-if="colorType === 0 || colorType === 1 && !!iconType">
                        <img v-if="colorType === 0 && iconType === 'down'" src="../assets/img/dashboard/down.svg"/>
                        <img v-else-if="colorType === 0 && iconType === 'up'" src="../assets/img/dashboard/up-green.svg"/>
                        <img v-else-if="colorType === 1 && iconType === 'down'" src="../assets/img/dashboard/down-red.svg"/>
                        <img v-else-if="colorType === 1 && iconType === 'up'" src="../assets/img/dashboard/up.svg"/>
                    </template>
                    {{ rateVal }}{{ rateUnit }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['option', 'title', 'colorType', 'iconType', 'customVal', 'customUnit', 'rateVal', 'rateUnit'])
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
]);
</script>
<style lang="scss" scoped>
.chart-small-box {
    // width: 100%;
    min-width: 250px;
    background: linear-gradient(90.6deg, rgba(11, 14, 19, 0.4) 25.17%, rgba(11, 14, 19, 0.32) 44.9%, rgba(11, 14, 19, 0.4) 70.75%, rgba(11, 14, 19, 0.504) 99.47%);
    padding: 12px 16px;
    display: flex;
    gap: 16px;
    .chart-area {
        width: 56px;
        .chart {
            height: 46px;
        }
    }
    .words{
        text-align: left;
        .tit{
            font-size: 14px;
            font-weight: bold;
            line-height: 22px;
            color: rgba(255, 255, 255, 0.80);
        }
        .content{
            display: flex;
            font-weight: bold;
            gap: 8px;
            .value{
                font-size: 16px;
                line-height: 24px;
                white-space: nowrap;
            }
            .rate{
                font-size: 16px;
                line-height: 24px;   
                display: flex;
                align-items: center;
                gap: 4px
            }
        }
        .red{
            color: #E74852;
        }
        .green{
            color: #62F65E;
        }
    }
}
</style>