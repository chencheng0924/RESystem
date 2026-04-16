import { ref, Ref } from "vue";
import { EChartsOption } from "echarts";
import { use } from "echarts/core";
import { LineChart, BarChart, HeatmapChart, PieChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent, VisualMapComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
use([CanvasRenderer, LineChart, BarChart, HeatmapChart,  TooltipComponent, GridComponent, LegendComponent, VisualMapComponent, TitleComponent, PieChart]);

export class ChartEController {
  public option: Ref<EChartsOption>
  constructor(){
    this.option = ref()
  }
  public setOption(option){
    this.option.value = option
    return this
  }
}