import { STButtonConfig } from "./STButton.model";
import { STIconButtonProps } from "./STIconButton.model";

export class STCardItem {
  id: string;
  layoutType: STCardItemType;
  title?: string;
  content?: string;
  subContent?: string;
  icon?: string;
  isActive: boolean = false;
  subIconR?: string
  subIconL?: string
  subDesc: string = ''
  imgUrl?: string
  subTitle?: string
  footerIconList?: STIconButtonProps[]
  footerActionButton?: STButtonConfig
  ratingScore?: number  // 評價分數
  subTitleFunc?: Function = null;
  data?: any = null;// 紀錄原始資料

  constructor(init?: Partial<STCardItem>) {
    Object.assign(this, init)
  }

  setFooterIconList(icons: STIconButtonProps[]) {
    this.footerIconList = icons
    return this
  }

  setFooterActionButton(btn?: STButtonConfig) {
    this.footerActionButton = btn
    return this
  }

  setRatingScore(score: number) {
    this.ratingScore = score
    return this
  }


  convertObject() {
    let obj = {};
    for (let key in this) {
      let v = this[key];
      let keyTemp = key.replace(/^./, key[0].toUpperCase());
      obj[keyTemp] = v;
    }

    return obj;
  }

}

export enum STCardItemType {
  LR,
  TLRB,
  IMG_WITH_FOOTER,
  AGENT_CARD
}

// LR：

/// ////////////////////// ///
///                        ///
/// Title/////////////icon ///
///                        ///
/// ////////////////////// ///


// TLRB：

/// ////////////////////////////// ///
/// Title/////////////////////icon ///
/// content                        ///
/// subLIcon subContent///subRIcon ///
/// ////////////////////////////// ///


// IMG_WITH_FOOTER

/// //////////////////////////////////////// ///
/// |   Img   |////Title//////////////////// ///
/// |         |////SubTitle///////////////// ///
/// |_________|///////////////////////////// ///
///                ContentContentContent     ///
///                ContentContentContent     ///
///                ContentContentContent     ///
///                ContentContentContent     ///
/// ________________________________________ ///
/// FooterIconList        FooterActionButton ///
/// ////////////////////////////////////////////