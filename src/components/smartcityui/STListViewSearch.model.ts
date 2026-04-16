import { IObjectGeneric } from '@/lib/pageBuilder/interface/IObjectGeneric';
import { STMenubarAction } from "@/components/smartcityui/STMenubar.model"
import { STCardTitleProps } from './STCardTitle.model';
import { STFormItem } from './STForm.model';

export class STListViewSearchProps {
  id?: string
  title?: string
  dataList?: Array<IObjectGeneric> = []
  showType?: STListViewShowType = STListViewShowType.CARD_TITLE
  listByHtml?: Function = null
  listActionList?: Array<STMenubarAction>
  cardTitleList?: Array<STCardTitleProps>
  isNewBtn?: boolean = true
  showPopover?: boolean = true
  searchConditions?: Array<STFormItem>
  isSearch?: boolean = true;

  currentSelectId?: string = '';
  needRename?: boolean = true;

  constructor(init?: Partial<STListViewSearchProps>) {
    Object.assign(this, init);
  }


  public getCurrentActiveId() {
    if (this.cardTitleList == null || this.cardTitleList.length == 0)
      return 0;

    if (this.currentSelectId == null || this.currentSelectId == '')
      return 0;

    let index = this.cardTitleList.findIndex(x => x.id == this.currentSelectId);

    return index as number;
  }


}

export class STListViewItem {
  id: string
  title: string
  subTitle: string

  constructor(init?: Partial<STListViewItem>) {
    Object.assign(this, init);
  }
}

export enum STListViewShowType {
  BY_HTML = 'BY_HTML',
  CARD_TITLE = 'CARD_TITLE',
  COMPONENT = 'COMPONENT'
}