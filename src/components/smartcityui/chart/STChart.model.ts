import { ChartPassThroughOptions, ChartProps } from "primevue/chart";
import { PassThroughOptions } from "primevue/passthrough";
import { DesignToken, PassThrough } from "@primevue/core";
import { CanvasHTMLAttributes } from "vue";
import { STChartPercentageItem } from "./STChartPercentage.model";

export enum STChartType {
    PIE = "pie",
    DOUGHTNUT = "doughtnut",
    LINE = "line",
    RADAR = "radar",
    POLARARE = "polarArea ",
    VERTICAL_BAR = "bar",
    HORIZONTAL_BAR = "bar",
    STACKED_BAR = "bar",
    COMBO = "bar"
}



export class STChartTypeProps {
    type?: string;
    data?: object;
    options?: object;
    percentageItem?: STChartPercentageItem;
    chartclass?: string;
    legendItems?: Array<STChartItemColor>

    constructor(init?: Partial<STChartTypeProps>) {
        Object.assign(this, init);
    }

    setLineType() {

    }
}



export class STChartItemColor {
    public name?: string;
    public color?: string;

    constructor(init?) {
        Object.assign(this, init);
    }
}