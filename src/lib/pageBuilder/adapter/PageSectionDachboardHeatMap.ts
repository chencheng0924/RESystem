import STChartHeatMap from '@/components/smartcityui/chart/STChartHeatMap.vue'
import { STChartHeatMapProps } from '@/components/smartcityui/chart/STChartHeatMap.model'
import { PageSection } from "../core/PageSection";
import { PageSectionType } from "../enum/PageSectionType";
import { IPageCustom } from "../interface/IPageCustom";
import { PageBuilder } from "../base/PageBuilder";
import { PageView } from "../core/PageView";
// import { PageChartHeatMapItem, PageHeatMapItem } from "./PageSectionDashboardPercentage";

export class PageChartHeatMapItem extends PageSection {

    gridRowLabel: Array<string>;
    gridColLabel: Array<string>;
    gridRowData: Array<string>;
    gridColData: Array<string>;
    gridData: Array<string>;
    chartMapItem: PageHeatMapItem;
    startColors: PageHeapMapColorModel;
    endColors: PageHeapMapColorModel;
    stepColors: number;


    constructor(init?) {
        super();
        Object.assign(this, init);
    }

}
export class PageHeatMapItem {
    chartTitle: string;
    chartSubtitle: string;
    chartValue: string;
    info: string;

    constructor(init?: Partial<PageHeatMapItem>) {
        Object.assign(this, init);
    }

}

export class PageHeapMapColorModel {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(init?: Partial<PageHeapMapColorModel>) {
        Object.assign(this, init);
    }
}
export class PageSectionHeatMap extends PageSection implements IPageCustom {

    public PageChartHeatMapItem?: PageChartHeatMapItem = new PageChartHeatMapItem();
    constructor() {
        super()
    }
    setHeatMapItem(item: PageHeatMapItem) {
        this.PageChartHeatMapItem.chartMapItem = item;
        return this;
    }
    setGridRowLabel(rowLabel: Array<any>) {

        this.PageChartHeatMapItem.gridRowLabel = rowLabel;
        return this;
    }
    setGridColLabel(colLabel: Array<any>) {

        this.PageChartHeatMapItem.gridColLabel = colLabel;
        return this;
    }
    setGridRowData(rowData: Array<any>) {

        this.PageChartHeatMapItem.gridRowData = rowData;
        return this;
    }

    setGridColData(rowData: Array<any>) {

        this.PageChartHeatMapItem.gridColData = rowData;
        return this;
    }

    setGridData(rowData: Array<any>) {

        this.PageChartHeatMapItem.gridData = rowData;
        return this;
    }

    setStartColor(color: PageHeapMapColorModel) {
        this.PageChartHeatMapItem.startColors = color;
        return this;

    }
    setEndColor(color: PageHeapMapColorModel) {
        this.PageChartHeatMapItem.endColors = color;
        return this;
    }
    setStepColor(step: number) {
        this.PageChartHeatMapItem.stepColors = step;
        return this;

    }
    getComponent() {
        return STChartHeatMap
    }

    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let heatMapSec = sec as PageSectionHeatMap;

        heatMapSec.Component = STChartHeatMap;
        heatMapSec.Props = new STChartHeatMapProps({
            gridRowLabel: this.PageChartHeatMapItem.gridRowLabel,
            gridColLabel: this.PageChartHeatMapItem.gridColLabel,
            gridRowData: this.PageChartHeatMapItem.gridRowData,
            gridColData: this.PageChartHeatMapItem.gridColData,
            gridData: this.PageChartHeatMapItem.gridData,
            stepColors: this.PageChartHeatMapItem.stepColors,
            startColors: this.PageChartHeatMapItem.startColors,
            endColors: this.PageChartHeatMapItem.endColors,
            chartHeatMapItem: this.PageChartHeatMapItem.chartMapItem

        })
        console.log('sss', heatMapSec.Props)
        return heatMapSec;
    }
}

