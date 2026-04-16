import { PopoverPassThroughOptions } from "primevue/popover";
import { ref, Ref } from "vue";
import { STButtonStyle } from "./STButton.model";

export enum STTimeType {
    TODAY,
    WEEK,
    MONTH,
    YEAR,
    CUSTOM
}

export class STTimeRangeItem {
    label?: string;
    type?: STTimeType;
    dayNumber?: number = 1;
    active?: boolean = false;
    day?: Date = null;

    constructor(init?: Partial<STTimeRangeItem>) {
        Object.assign(this, init)
    }

    setToDay(name: string) {
        this.type = STTimeType.TODAY;
        this.dayNumber = 1;
        this.label = name;
        return this;
    }
    setWeek(name: string) {
        this.type = STTimeType.WEEK;
        this.dayNumber = 7;
        this.label = name;
        return this;
    }
    setMonth(name: string) {
        this.type = STTimeType.MONTH;
        this.dayNumber = 30;
        this.label = name;
        return this;
    }
    setYear(name: string) {
        this.type = STTimeType.YEAR;
        this.dayNumber = 365;
        this.label = name;
        return this;
    }
    setCustom(name: string) {
        this.type = STTimeType.CUSTOM;
        this.label = name;
        return this;
    }

    setActive(active?: boolean) {
        this.active = active;
        return this;
    }

    setDayNumber(num: number) {
        this.dayNumber = num;
        return this;
    }
    setDay(date: Date) {
        this.day = date;
        return this;
    }
}

export class STTimeSelectProps {

    timeRangeItems?: Array<STTimeRangeItem> = [];

    constructor(init?: Partial<STTimeSelectProps>) {
        Object.assign(this, init);
    }

    setItems(items: Array<STTimeRangeItem>) {
        this.timeRangeItems = items;
    }

}


export class STTimeSelectEvent {
    constructor(init?: Partial<STTimeSelectEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;
    eventUpdateCustomDate?: Function;
}


export class STTimeRangeItemStyle extends STButtonStyle {

}