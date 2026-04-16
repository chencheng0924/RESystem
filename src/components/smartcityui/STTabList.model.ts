import { STComponentItem } from "./STCommon.model";
import { STTabAction } from "./STTab.model";


export class STTabListEvent {
    constructor(init?: Partial<STTabListEvent>) {
        Object.assign(this, init);
    }
    notifyItem?: Function;
    tabChangeItem?: Function;

}


export class STTabListProps {
    actions?: Array<STTabAction> = [];
    datas?: Array<STTabListRow>;
    customTabPT?: Object;
    customTabListPT?: Object;
    elementDatas?: Object;
    activeIdx?: Number = 1;
    constructor(init?: Partial<STTabListProps>) {
        Object.assign(this, init);
    }

    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }


}



export class STTabListRow {
    tabName?: string = ''
    tabRow?: Array<STTabRowItem> = []
    constructor(init?) {
        Object.assign(this, init);
    }


    isAllRead() {
        if (this.tabName == null)
            return false;

        let ds = this.tabRow.filter(x => x.isRead == false);
        if (ds.length > 0)
            return false;//有未讀的


        return true;
    }

}

export class STTabRowItem {
    isRead?: boolean = false;
    content?: string;
    createdDate?: string;

    constructor(init?) {
        Object.assign(this, init);
    }
}

