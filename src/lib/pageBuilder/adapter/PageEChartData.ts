import { PageChartData } from "./PageChartData"

export class PageEChartOptionData {
  chartDatas?: PageChartData
  series?: object = {}
  tooltipUnit?: string = ''
  legend?: object = {}
  color?: string | string[] = '#9E8EFF'
  grid?: object = { top: 5, left: 40, right: 15, bottom: 30 }
  xAxis?: object = {}
  yAxis?: object = {}

  heatMapTitle?: string = ''
  heatMapTitleValue?: string = ''
  heatMapVisualMapMin?: number = 0
  heatMapVisualMapMax?: number = 100

  xAxisData?: string[] = []
  yAxisData?: string[] = []

  pieColorList?: string[] = ['#EE5587', '#85CEE5', '#EAE088', '#FFA552']

  constructor(init?: Partial<PageEChartOptionData>) {
    Object.assign(this, init)
  }

  setTooltipUnit(unit: string) {
    this.tooltipUnit = unit
    return this
  }

  setLegend(legendData?: string[]) {
    this.legend = {
      itemWidth: 8.28,
      itemHeight: 8.28,
      textStyle: {
        color: '#727272'
      },
      left: 'left',
      icon: 'circle',
      // data: legendData,
    }
    return this
  }

  setColor(color: string | string[]) {
    this.color = color
    return this
  }

  setGrid(grid: object) {
    this.grid = grid
    return this
  }

  setXAxis(xAxis: object) {
    this.xAxis = xAxis
    return this
  }

  setYAxis(yAxis: object) {
    this.yAxis = yAxis
    return this
  }

  setHeatMapTitle(title: string) {
    this.heatMapTitle = title
    return this
  }

  setHeatMapTitleValue(val: string) {
    this.heatMapTitleValue = val
    return this
  }

  setPieColorList(data: string[]) {
    this.pieColorList = data
    return this
  }

  setXAxisData(data: string[]) {
    this.xAxisData = data
    return this
  }

  setYAxisData(data: string[]) {
    this.yAxisData = data
    return this
  }

  setHeatMapVisualMapMin(num: number) {
    this.heatMapVisualMapMin = num
    return this
  }

  setHeatMapVisualMapMax(num: number) {
    this.heatMapVisualMapMax = num
    return this
  }
}