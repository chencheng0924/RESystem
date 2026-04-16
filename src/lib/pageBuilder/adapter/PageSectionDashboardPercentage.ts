
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
import STChartPercentage from "@/components/smartcityui/chart/STChartPercentage.vue";
import { STChartPercentageItem, STChartPercentageProps } from "@/components/smartcityui/chart/STChartPercentage.model";

export enum PageChartPercentageStatusType {
    INCREASE = 'increase',
    DECREASE = 'decrease',
    SAME = 'same'
}
export enum PagePercentageType {
    NONE = "",
    DIFFERENCE = 'difference',
    TAG = 'tag',
    LEGEND = "legend"

}

export class PageChartPercentageItem extends PageTerm {

    PercentageType?: PagePercentageType;
    DiffStatusUrl?: string;// icon url
    DiffStatusClass?: string;// class style
    DiffStatusNumber?: string;//數值
    DiffStatusDesc?: string = '';//描述內容

    constructor(init?) {
        super();
        Object.assign(this, init);
    }
    setDisplayType(type: PagePercentageType) {
        this.PercentageType = type;
        return this;
    }
    setStatusValue(type: string, num: string, desc?: string) {
        this.DiffStatusUrl = type;
        this.DiffStatusNumber = num;
        this.DiffStatusDesc = desc;
        return this;
    }
    setIncreaseValue(num: string, desc?: string) {
        this.setStatusValue(PageChartPercentageStatusType.INCREASE, num, desc);

        return this;
    }
    setDecreaseValue(num: string, desc?: string) {
        this.setStatusValue(PageChartPercentageStatusType.DECREASE, num, desc);
        return this;
    }
    setSameValue(num: string, desc?: string) {
        this.setStatusValue(PageChartPercentageStatusType.SAME, num, desc);
        return this;
    }

    getClassContent() {
        let status = this.DiffStatusUrl;
        if (status == 'decrease')
            return 'text-foneThemeRed';
        else if (status == 'increase')
            return 'text-foneThemeGreen';
        else if (status == 'same')
            return 'text-foneTextLevel2 text-[18px]';

    }
}



export class PageSectionDashboardPercentage extends PageSection implements IPageCustom {

    PageChartPercentageItems?: Array<PageChartPercentageItem> = [];
    constructor() {
        super()
        this.IsPanel = false;
        this.SectionType = PageSectionType.CHART_PERCENTAGE
    }

    setPercentageItems(items: Array<PageChartPercentageItem>) {
        this.PageChartPercentageItems = items;
        return this;
    }


    // 取得元件實例
    getComponent() {
        return STChartPercentage;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let dashboardSec = sec as PageSectionDashboardPercentage;
        dashboardSec.Component = STChartPercentage
        let props = new STChartPercentageProps()
            .setItems(dashboardSec.PageChartPercentageItems.map((x) => {

                let item = new STChartPercentageItem(x.toStartCharLowerCase());
                return item;
            }));


        dashboardSec.Props = props
        return dashboardSec
    }

}

