import { STItem } from "../STCommon.model";

export enum STPercentageType {
    NONE = "",
    DIFFERENCE = 'difference',
    TAG = 'tag',
    LEGEND = "legend"
}

export class STChartPercentageProps {

    percentageItems?: Array<STChartPercentageItem> = []
    constructor(init?: Partial<STChartPercentageProps>) {
        Object.assign(this, init);
    }
    setItems(items?: Array<STChartPercentageItem>) {
        this.percentageItems = items;
        return this;
    }
}

export class STChartPercentageItem extends STItem {

    percentageType?: STPercentageType;
    diffStatusUrl?: string;// icon url
    diffStatusClass?: string;// class style
    diffStatusNumber?: string;//數值
    diffStatusDesc?: string;//描述內容


    constructor(init?) {
        super();
        Object.assign(this, init);
    }

    getClassContent() {
        let status = this.diffStatusUrl;
        if (status == 'decrease')
            return 'text-foneThemeRed';
        else if (status == 'increase')
            return 'text-foneThemeGreen';
        else if (status == 'same')
            return 'text-foneTextLevel2 text-[18px]';

    }
}