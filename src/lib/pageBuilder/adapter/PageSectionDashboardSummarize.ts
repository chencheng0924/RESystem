
import STDashboardBar from "@/components/smartcityui/STDashboardBar.vue";
import { PageBuilder } from "../base/PageBuilder";
import { PageSection } from "../core/PageSection";
import { PageTerm } from "../core/PageTerm";
import { PageView } from "../core/PageView";
import { PageSectionType } from "../enum/PageSectionType";
import { IPageCustom } from "../interface/IPageCustom";
import STChartSummarize from '@/components/smartcityui/chart/STChartSummarize.vue'
import { STChartSummarizeProps } from "@/components/smartcityui/chart/STChartSummarize.model";
import { STItem } from "@/components/smartcityui/STCommon.model";

export class PageSectionDashboardSummarize extends PageSection implements IPageCustom {
    TitleNumber?: string;
    Items?: Array<PageTerm> = [];
    constructor() {
        super()
        this.IsPanel = false;
        this.SectionType = PageSectionType.CHART_SUMMARIZE
    }

    setTitleNumber(num: string) {
        this.TitleNumber = num;
        return this;
    }
    setSummarizeItem(items: Array<PageTerm>) {
        this.Items = items;
        return this;
    }


    // 取得元件實例
    getComponent() {
        return STChartSummarize;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let dashboardSec = sec as PageSectionDashboardSummarize;
        dashboardSec.Component = STChartSummarize
        let props = new STChartSummarizeProps()
            .setTitleAndNumber(dashboardSec.Title, dashboardSec.TitleNumber)
            .setItems(dashboardSec.Items.map(x => new STItem(x.toStartCharLowerCase())))


        dashboardSec.Props = props
        return dashboardSec
    }

}