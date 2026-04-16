import { PageCardType } from '@/lib/pageBuilder/enum/PageCardType'
import { PageAction } from './PageAction';

export class PageCardItem {
  Id: string;
  LayoutType: PageCardType;
  Title?: string;
  Content?: string;
  SubContent?: string;
  Icon?: string;
  SubIconR?: string;
  SubIconL?: string;
  IsActive: boolean = false;
  SubDesc: string = ''
  ImgUrl?: string
  SubTitle?: string
  FooterIconList?: PageAction[]
  FooterActionButton?: PageAction
  RatingScore?: number  // 評價分數
  SubTitleFunc?: Function = null;
  Data?: any = null;// 紀錄原始資料

  constructor(init?: Partial<PageCardItem>) {
    Object.assign(this, init)
  }

  setLayoutType(type?: PageCardType) {
    this.LayoutType = type
    return this
  }

  setIcon(icon?: string) {
    this.Icon = icon
    return this
  }

  setIsActive(val: boolean) {
    this.IsActive = val
    return this
  }

  setFooterIconList(icons: PageAction[]) {
    this.FooterIconList = icons
    return this
  }

  setFooterActionButton(action: PageAction) {
    this.FooterActionButton = action
    return this
  }

  setRatingScore(score: number) {
    this.RatingScore = score
    return this
  }

  convertObject() {
    let obj = {};
    for (let key in this) {
      let v = this[key];
      let keyTemp = key.replace(/^./, key[0].toLowerCase());
      obj[keyTemp] = v;
    }

    return obj;
  }

  setSubTitleHtml(callback) {
    if (callback == undefined || callback == null)
      return this;
    this.SubTitleFunc = callback;
    return this;
  }


}

export enum PageCardPanelLayout {
  WRAP = 'flex-wrap',
  COLUMN = 'flex-col',
  GRID = 'grid'
}

export enum PageCardPanelMode {
  PAGINATOR = 'paginator',
  INFINITE_SCROLL = 'infiniteScroll',
  NONE = 'none'
}