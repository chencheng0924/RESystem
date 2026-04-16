import { STItem } from "../STCommon.model";

export class STChartSummarizeProps {

    title?: String;
    titleNumber?: String;
    items?: Array<STItem> = [];

    constructor(init?: Partial<STChartSummarizeProps>) {
        Object.assign(this, init);
    }

    setTitleAndNumber(title: string, number: string) {
        this.title = title;
        this.titleNumber = number;
        return this;
    }
    setItems(items?: Array<STItem>) {
        this.items = items;
        return this;
    }
}

