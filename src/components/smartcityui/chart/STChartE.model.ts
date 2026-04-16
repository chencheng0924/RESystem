import { ChartPassThroughOptions, ChartProps } from "primevue/chart";
import { PassThroughOptions } from "primevue/passthrough";
import { DesignToken, PassThrough } from "@primevue/core";
import { CanvasHTMLAttributes } from "vue";
import { STChartPercentageItem } from "./STChartPercentage.model";
import { EChartsOption } from "echarts";

export enum STChartEType {
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



export class STChartETypeProps {
  type?: string;
  data?: object;
  options?: EChartsOption;
  percentageItem?: STChartPercentageItem;
  chartclass?: string;

  constructor(init?: Partial<STChartETypeProps>) {
    Object.assign(this, init);
  }

  setLineType() {

  }
}