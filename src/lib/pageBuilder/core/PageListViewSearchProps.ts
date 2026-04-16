import { PageCardType } from '@/lib/pageBuilder/enum/PageCardType'
import { PageAction } from './PageAction';
import { IObjectGeneric } from '@/lib/pageBuilder/interface/IObjectGeneric';
import { PageCardTitleItem } from '@/lib/pageBuilder/core/PageCardTitleItem'
import { STFormItem } from '@/components/smartcityui/STForm.model';

export class PageListViewSearchProps {
  id: string = '';
  title?: string = '';
  showType?: PageListViewShowType = PageListViewShowType.CARD_TITLE
  dataList?: Array<IObjectGeneric> = []
  listByHtml?: Function = null
  listActionList?: Array<PageAction> = []
  cardTitleList?: Array<PageCardTitleItem> = []
  isNewBtn?: boolean = true
  showPopover?: boolean = true
  searchConditions?: Array<STFormItem> = []
  currentSelectId?: string = '';
  isSearch?: boolean = true;
  needRename?: boolean = true;
  constructor(init?: Partial<PageListViewSearchProps>) {
    Object.assign(this, init)
  }

  setId(id?: string) {
    this.id = id
    return this
  }
  setIsSearch(isSearch?: boolean) {
    this.isSearch = isSearch
    return this
  }

  setTitle(title?: string) {
    this.title = title
    return this
  }

  setDataList(datas: Array<IObjectGeneric>) {
    this.dataList = datas
    return this
  }

  setListByHtml(html) {
    this.listByHtml = html
    return this
  }

  setCardTitleList(data: PageCardTitleItem[]) {
    this.cardTitleList = data
    return this
  }

  setShowType(type: PageListViewShowType) {
    this.showType = type
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

  setNewBtn(newbtn: boolean) {
    this.isNewBtn = newbtn;
    return this
  }

  setShowPopover(showPopover: boolean) {
    this.showPopover = showPopover;
    return this
  }

  setSearchConditions(conditions: Array<STFormItem>) {
    this.searchConditions = conditions;
    return this
  }

  setNeedRename(needRename: boolean){
    this.needRename = needRename;
    return this
  }
}

export class PageListViewItem {
  id: string
  title: string
  subTitle: string

  constructor(init?: Partial<PageListViewItem>) {
    Object.assign(this, init);
  }
}

export enum PageListViewShowType {
  BY_HTML = 'BY_HTML',
  CARD_TITLE = 'CARD_TITLE',
  COMPONENT = 'COMPONENT'
}