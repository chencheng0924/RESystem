import STChartE from "@/components/smartcityui/chart/STChartE.vue";
import { PageSection } from "../core/PageSection";
import { PageSectionType } from "../enum/PageSectionType";
import { IPageCustom } from "../interface/IPageCustom";
import { PageBuilder } from "../base/PageBuilder";
import { PageView } from "../core/PageView";
import { STChartETypeProps } from "@/components/smartcityui/chart/STChartE.model";
import { PageChartOrgType, PageChartType } from "../enum/PageChartType";
import { PageChartPercentageItem } from "./PageSectionDashboardPercentage";
import { STChartPercentageItem } from "@/components/smartcityui/chart/STChartPercentage.model";
import { PageChartData, PageChartDataItem } from "./PageChartData";
import { EChartsOption, graphic } from "echarts";
import { PageEChartOptionData } from '@/lib/pageBuilder/adapter/PageEChartData'

export class PageSectionChartE extends PageSection implements IPageCustom {

    public PageChartPercentageItem?: PageChartPercentageItem
    public ChartDatas?: PageChartData = new PageChartData();
    public chartType?: PageChartType = PageChartType.LINE;
    public ChartClass?: string = "h-[168px]";
    public ChartOptions?: EChartsOption = {}

    public ChartOptionData?: PageEChartOptionData = new PageEChartOptionData()

    constructor() {
        super()
        this.IsPanel = false;
        this.SectionType = PageSectionType.CHART
    }

    setPercentageItem(item: PageChartPercentageItem) {
        this.PageChartPercentageItem = item;
        return this;
    }
    setChartType(type: PageChartType) {
        this.chartType = type;
        return this;
    }
    setChartClass(className: string) {
        this.ChartClass = className;
        return this;
    }
    setChartOptionData(options: PageEChartOptionData) {
        this.ChartOptionData = options
        return this
    }

    private getOrgChartType() {

        if (this.chartType.indexOf("_bar") != -1)
            return PageChartOrgType.VERTICAL_BAR;
        else
            return this.chartType;
    }


    //-----------------------------------------------------------------
    //  轉換 object
    //-----------------------------------------------------------------

    // 取得元件實例
    getComponent() {
        return STChartE;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let chartSec = sec as PageSectionChartE;
        chartSec.Component = STChartE
        let ds = this.ChartDatas;
        let ops = this.setChartOptions()
        let props = new STChartETypeProps({
            type: this.getOrgChartType(),
            data: ds,
            options: ops,
            percentageItem: new STChartPercentageItem(this.PageChartPercentageItem.toStartCharLowerCase()),
            chartclass: this.ChartClass,
        })


        chartSec.Props = props
        return chartSec
    }

    ////////////////////////////////////////////////////////////////
    // Chart options
    ////////////////////////////////////////////////////////////////

    private getBaseTooltip(tooltipUnit: string) {
        return {
            trigger: 'axis',
            borderWidth: 0,
            backgroundColor: '#0441C4',
            textStyle: {
                color: '#FFF',
                align: 'left',
                fontWeight: 'bold'
            },
            axisPointer: {
                type: 'line',
                z: 0,
                lineStyle: {
                    type: 'solid',
                    color: '#D8D8D8'
                }
            },
            valueFormatter: (value: number) => value + tooltipUnit,
            formatter: function (params) {
                let tooltipHtml = '';
                //console.log("params", params);
                params.forEach(item => {

                    let label = item.value;
                    if (item.seriesName != undefined && item.seriesName != null && item.seriesName != "") {
                        label = `${item.seriesName}-${label}`
                    }

                    tooltipHtml += `<div>${item.name}</div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#fff;"></span> ${label}${tooltipUnit}<br/>`;
                });
                return tooltipHtml;
            }
        }
    }

    private getBaseAxisStyle() {
        return {
            axisTick: { show: false },
            axisLabel: {
                show: true,
                color: '#727272',
                interval: 0,
                rotate: 45,

                formatter: function (value) {
                    // 每12個字換行
                    return value.replace(/(.{12})/g, '$1\n');
                }
            },
            axisLine: {
                lineStyle: { color: '#39393D' }
            }
        }
    }

    private getVerticalChartAxis(axisData: string[]) {
        return {
            xAxis: {
                type: 'category',
                data: axisData,
                ...this.getBaseAxisStyle()
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: { color: '#39393D' }
                },
                ...this.getBaseAxisStyle(),
                axisLabel: {
                    show: true,
                    align: 'left',
                    margin: 40,
                }
            },
            grid: {
                top: 40,
                left: 60,
                right: 20,
                bottom: 100, // 給旋轉後的文字足夠空間
            },
        }
    }

    private getHorizontalBarAxis(axisData: string[]) {
        return {
            xAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: { color: '#39393D' }
                },
                ...this.getBaseAxisStyle(),
                axisLabel: {
                    align: 'left',
                    margin: 10,
                }
            },
            yAxis: {
                type: 'category',
                data: axisData,
                ...this.getBaseAxisStyle()
            }
        }
    }

    private getHeatmapOptions(chartData: PageEChartOptionData) {
        return {
            title: {
                text: `{a|${chartData.heatMapTitle}} {b|${chartData.heatMapTitleValue}}`,
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 16,
                            fontWeight: 'bold',
                            verticalAlign: 'bottom',
                            color: '#727272'
                        },
                        b: {
                            fontSize: 32,
                            fontWeight: 'bold',
                            verticalAlign: 'bottom',
                            color: '#FFFFFFCC'
                        }
                    },
                },
                left: -5,
            },
            xAxis: {
                type: 'category',
                axisLabel: { interval: 3 },
                axisLine: { show: false },
                axisTick: { show: false },
                data: chartData.xAxisData,
                ...this.getHeatmapGridStyle()
            },
            yAxis: {
                type: 'category',
                axisLine: { show: false },
                axisTick: { show: false },
                data: chartData.yAxisData,
                ...this.getHeatmapGridStyle()
            },
            visualMap: this.getHeatmapVisualMap(chartData),
            legend: { show: false }
        }
    }

    private getHeatmapGridStyle() {
        return {
            splitLine: {
                show: true,
                interval: 0,
                lineStyle: {
                    color: '#1D1D1E',
                    width: 2,
                },
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(158, 142, 255, 0.1)', 'rgba(158, 142, 255, 0.1)'],
                },
            }
        }
    }

    private getHeatmapVisualMap(chartData: PageEChartOptionData) {
        return {
            min: chartData.heatMapVisualMapMin,
            max: chartData.heatMapVisualMapMax,
            calculable: false,
            orient: 'horizontal',
            text: [chartData.heatMapVisualMapMax.toString(), chartData.heatMapVisualMapMin.toString()],
            textStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
            },
            right: 20,
            top: 0,
            borderWidth: 0,
            indicatorStyle: { color: '#ffffff' },
            inRange: {
                color: ['rgba(158, 142, 255, 0)', 'rgba(128, 107, 255, 1)'],
            }
        }
    }

    public setChartOptions() {
        const { series, legend, color, grid } = this.ChartOptionData
        const axisData = this.ChartDatas.labels

        let baseOptions = {
            color,
            tooltip: this.getBaseTooltip(this.ChartOptionData.tooltipUnit),
            grid,
            ...this.getVerticalChartAxis(axisData),
            legend,
            series
        }

        switch (this.chartType) {
            case PageChartType.HORIZONTAL_BAR:
                return {
                    ...baseOptions,
                    ...this.getHorizontalBarAxis(axisData)
                } as EChartsOption

            case PageChartType.DOUGHNUT:
                return {
                    ...baseOptions,
                    color: this.ChartOptionData.pieColorList,
                    tooltip: {
                        ...baseOptions.tooltip,
                        trigger: 'item'
                    },
                    xAxis: { show: false },
                    yAxis: { show: false }
                } as EChartsOption

            case PageChartType.HEATMAP:
                return {
                    ...baseOptions,
                    tooltip: {
                        ...baseOptions.tooltip,
                        trigger: 'item',
                        formatter: ({ data }) => {
                            const day = data[1]
                            const hour = data[0]
                            return `${day} ${hour}：${data[2]}${this.ChartOptionData.tooltipUnit}`
                        },
                    },
                    ...this.getHeatmapOptions(this.ChartOptionData)
                } as EChartsOption

            default:
                return baseOptions as EChartsOption
        }
    }


    //-----------------------------------------------------------------
    //  轉換 object
    //-----------------------------------------------------------------
    public convertChartOneLineDatas(title: string, labelKey: string, dataKey: string, datas: Array<any>) {
        const documentStyle = getComputedStyle(document.documentElement);
        let dataEntity = new PageChartData();
        let ls = datas.map(x => x[labelKey]);
        let ds = datas.map(x => x[dataKey]);
        dataEntity.setLabels(ls);
        dataEntity.setDataSets([
            new PageChartDataItem().setDatas(ds).setlabel(title)

        ]);
        this.ChartDatas = dataEntity.setLineFill(true, documentStyle.getPropertyValue('--p-gray-500'));
        return this;

    }
    public convertChartMultiLineDatas(title: string, labels: Array<string>, datas: Array<PageChartDataItem>) {
        const documentStyle = getComputedStyle(document.documentElement);
        let dataEntity = new PageChartData();
        dataEntity.setLabels(labels);
        dataEntity.setDataSets(datas);

        this.ChartDatas = dataEntity;
        return this;

    }
    public convertChartDoughnutDatas(title: string, labelKey: string, dataKey: string, datas: Array<any>,
        bkColors: Array<string>, hoverBkColors: Array<string>
    ) {
        const documentStyle = getComputedStyle(document.documentElement);
        let dataEntity = new PageChartData();
        let ls = datas.map(x => x[labelKey]);
        let ds = datas.map(x => x[dataKey]);
        dataEntity.setLabels(ls);
        dataEntity.setDataSets([
            new PageChartDataItem().setDatas(ds).setlabel(title)
                .setHoverBackgroundColor(hoverBkColors)
                .setBackgroundColor(bkColors)
                .setBorderWidthAndColor("", 0)

        ]);

        this.ChartDatas = dataEntity;
        return this;

    }

    // 長條圖Series
    public convertBarChartSeries(barWidth: number = 24) {
        this.ChartOptionData.series = this.ChartDatas.datasets.map(el => {
            return {
                name: '',
                type: 'bar',
                data: el.data,
                emphasis: {
                    focus: 'self',
                    itemStyle: {
                        color: '#0146DB',
                    }
                },
                barWidth: barWidth,
                itemStyle: {
                    color: '#0441C4',
                    borderRadius: this.chartType == PageChartType.HORIZONTAL_BAR ? [0, 2, 2, 0] : [4, 4, 0, 0]
                }
            }
        })
        return this
    }

    // 漸層底色折線圖
    public convertGradientLineChartSeries() {
        this.ChartOptionData.series = this.ChartDatas.datasets.map(el => {
            return {
                data: el.data,
                type: 'line',
                smooth: 0.6,
                symbol: 'circle',
                symbolSize: 6,
                showSymbol: false,
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(76, 55, 205, 0.5)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(76, 55, 205, 0)'
                        }
                    ])
                },
            }
        })
        return this
    }

    // 多條折線圖
    public convertMultLineChartSeries() {
        const defaultLineChartConfig = {
            type: 'line',
            smooth: 0.6,
            symbol: 'circle',
            symbolSize: 6,
            showSymbol: false
        }
        this.ChartOptionData.series = this.ChartDatas.datasets.map(el => {
            return {
                name: el.label,
                data: el.data,
                ...defaultLineChartConfig
            }
        })
        return this
    }

    // 圓餅圖
    public convertPieChartSeries() {
        const result = this.ChartDatas.labels.map((name, idx) => ({
            name,
            value: this.ChartDatas.datasets.firstOrDefault().data[idx]
        }))
        this.ChartOptionData.series = {
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            data: result
        }
        return this
    }

    // heatmap
    public convertHeatMapChartSeries(data: Array<any>) {
        this.ChartOptionData.series = [{
            type: 'heatmap',
            data: data,
            emphasis: {
                itemStyle: {
                    color: 'rgba(158, 142, 255, 1)'
                }
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: '#1D1D1E',
            },
        }]
        return this
    }
}