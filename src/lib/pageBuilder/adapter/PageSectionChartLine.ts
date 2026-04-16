import STChart from "@/components/smartcityui/chart/STChart.vue";
import { PageSection } from "../core/PageSection";
import { PageSectionType } from "../enum/PageSectionType";
import { IPageCustom } from "../interface/IPageCustom";
import { PageBuilder } from "../base/PageBuilder";
import { PageView } from "../core/PageView";
import { STChartItemColor, STChartTypeProps } from "@/components/smartcityui/chart/STChart.model";
import { PageChartOrgType, PageChartType } from "../enum/PageChartType";
import { PageChartPercentageItem } from "./PageSectionDashboardPercentage";
import { STChartPercentageItem } from "@/components/smartcityui/chart/STChartPercentage.model";
import { PageChartData, PageChartDataItem, PageChartItemColor } from "./PageChartData";

export class PageSectionChartLine extends PageSection implements IPageCustom {

    public PageChartPercentageItem?: PageChartPercentageItem
    public ChartDatas?: PageChartData = new PageChartData();
    public chartType?: PageChartType = PageChartType.LINE;
    public ChartClass?: string = "h-[168px]";
    public LegendItems?: Array<PageChartItemColor>

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
    setLegendItems(items: Array<PageChartItemColor>) {
        this.LegendItems = items;
        return this;
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
        return STChart;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let chartSec = sec as PageSectionChartLine;
        chartSec.Component = STChart
        let ds = this.ChartDatas;
        let ops = this.setChartOptions();
        let props = new STChartTypeProps({
            type: this.getOrgChartType(),
            data: ds,
            options: ops,
            percentageItem: new STChartPercentageItem(this.PageChartPercentageItem.toStartCharLowerCase()),
            chartclass: this.ChartClass,
            legendItems: this.LegendItems?.map(x => new STChartItemColor(x))
        })


        chartSec.Props = props
        return chartSec
    }

    setLineData() {
        const documentStyle = getComputedStyle(document.documentElement);
        let ds = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],

                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(107, 114, 128, 0.2)'
                }
            ]
        };

        return ds;
    }


    setChartOptions() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        let ops = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    },
                    display: false
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        if (this.chartType == PageChartType.HORIZONTAL_BAR) {
            ops = Object.assign(ops, {
                indexAxis: 'y',
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false

                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            })
        }
        else if (this.chartType == PageChartType.DOUGHNUT) {
            return {
                cutout: '75%',
                plugins: {
                    legend: {
                        display: false
                    }
                },
            };
        }

        return ops;
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

        console.log(dataEntity);
        this.ChartDatas = dataEntity;
        return this;

    }
}