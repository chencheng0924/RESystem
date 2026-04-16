import { PageTimeType } from "../enum/PageTimeType";
import { PageItemCommon } from "./PageItemCommon";

export class PageTimeRangeItem extends PageItemCommon {
    Label?: string;
    Type?: PageTimeType;
    DayNumber?: number = 1;
    Active?: boolean = false;
    Day?: Date = null;

    constructor(init?: Partial<PageTimeRangeItem>) {
        super();
        Object.assign(this, init)
    }

    setToDay(name: string) {
        this.Type = PageTimeType.TODAY;
        this.DayNumber = 1;
        this.Label = name;
        return this;
    }
    setWeek(name: string) {
        this.Type = PageTimeType.WEEK;
        this.DayNumber = 7;
        this.Label = name;
        return this;
    }
    setMonth(name: string) {
        this.Type = PageTimeType.MONTH;
        this.DayNumber = 30;
        this.Label = name;
        return this;
    }
    setYear(name: string) {
        this.Type = PageTimeType.YEAR;
        this.DayNumber = 365;
        this.Label = name;
        return this;
    }
    setCustom(name: string) {
        this.Type = PageTimeType.CUSTOM;
        this.Label = name;
        return this;
    }

    setActive(active?: boolean) {
        this.Active = active;
        return this;
    }

    setDayNumber(num: number) {
        this.DayNumber = num;
        return this;
    }
    setDay(date: Date) {
        this.Day = date;
        return this;
    }
}