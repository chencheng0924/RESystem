import { STMenubarAction } from "./STMenubar.model";
import { STTimeRangeItem } from "./STTimeSelect.model";

export class STDashboardBarProps {

    timeRangeItems?: Array<STTimeRangeItem> = [];
    rightActions?: Array<STMenubarAction> = [];
    constructor(init?: Partial<STDashboardBarProps>) {
        Object.assign(this, init);
    }

    setItems(items: Array<STTimeRangeItem>) {
        this.timeRangeItems = items;
    }

    setActions(items: Array<STMenubarAction>) {
        this.rightActions = items;
    }

}


export class STDashboardBarEvent {
    constructor(init?: Partial<STDashboardBarEvent>) {
        Object.assign(this, init);
    }

    eventActionBtn?: Function;
    eventActionSubBtn?: Function;
    eventActionDate?: Function;
    eventUpdateCustomDate?: Function;
}