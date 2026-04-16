import { STCardItem } from "./STCardCustom.model"

export class STCardPanelProps {
  title?: string;
  layout: STCardPanelLayout
  cardItemList: STCardItem[]
  ifScrollable: boolean = false
  wrapperHeight: string = ''  // ifScroll是true才有效
  cardWrapperClass?: string = ''
  cardContentClass?: string = ''
  rowCount?: number = 3   // 在wrap layout模式下，預設一排3張卡片
  colCount?: number = 2   // 在wrap layout模式下，預設2排
  showMode?: STCardPanelMode = STCardPanelMode.PAGINATOR

  constructor(init?: Partial<STCardPanelProps>) {
    Object.assign(this, init)
  }

  setLayout(layout: STCardPanelLayout) {
    this.layout = layout
    return this
  }

  setCardItemList(list: STCardItem[]) {
    this.cardItemList = list
    return this
  }

  setCardPanelTitle(title: string) {
    this.title = title
    return this
  }

  setIfScroll(val: boolean) {
    this.ifScrollable = val
    return this
  }

  setWrapperHeight(height: string) {
    this.wrapperHeight = height
    return this
  }

  setCardWrapperClass(className: string) {
    this.cardWrapperClass = className
    return this
  }

  setCardContentClass(className: string) {
    this.cardContentClass = className
    return this
  }

  setRowCount(row: number) {
    this.rowCount = row
    return this
  }

  setColCount(col: number) {
    this.colCount = col
    return this
  }

  setShowMode(mode: STCardPanelMode) {
    this.showMode = mode
    return this
  }
}

export enum STCardPanelLayout {
  WRAP = 'flex-wrap',
  COLUMN = 'flex-col',
  GRID = 'grid'
}

export enum STCardPanelMode {
  PAGINATOR = 'paginator',
  INFINITE_SCROLL = 'infiniteScroll',
  NONE = 'none'
}