import { DataTablePassThroughOptions } from 'primevue/datatable';
import { STAction, STComponentItem } from './STCommon.model';
import { object } from 'zod';
import { STFormItem } from './STForm.model';
import { STCardPanelProps } from './STCardPanel.model';
import { STPaginatorProps } from './STPaginator.model';
import { STTabAction } from './STTab.model';
export enum btntype {
    addBtn = 'add',
    editBtn = 'edit',
    deleteBtn = 'delete'
}
// export class SearchDataParams {
//     answer?: string;
//     name?: string;
//     tenantId?: string;
//     id?: string;
//     value?: string

//     constructor(init?: Partial<SearchDataParams>) {
//         Object.assign(this, init);
//     }
// }
// export class searchData {
//     dropDownModel?: any;
//     inputModel?: string

//     constructor(init?: Partial<searchData>) {
//         Object.assign(this, init);
//     }

//     public reset?() {
//         this.dropDownModel = '';
//         this.inputModel = '';
//         return this;
//     }
// }

export class STDataTableColumn {
    field?: string;
    header?: string;
    title?: string
    sort?: boolean = false;
    isKeyValue?: boolean = false;
    actions?: Array<STDataTableAction> = [];
    isCellHtml?: boolean = false;
    cellValue?: Function = null;
    cellValueByHtml?: Function = null;
    isImage?: boolean = false;
    isFormItem?: boolean = false
    truncateNum?: number = null // 最常200字
    showFilterCondition?: any = {
        tableColumn: true,
        tableFilter: true,
        form: true,
    }
    constructor(init?: Partial<STDataTableColumn>) {
        Object.assign(this, init);
    }
    setSort(sort: boolean) {

        this.sort = sort;

        return this;
    }
    isActions() {
        if (this.actions == null || this.actions.length == 0)
            return false;

        return true;
    }

}

export class STDataTablePageParams {
    pageIndex?: number;
    pageRows?: number;
    totalRows?: number
    first?: number

    constructor(init?: Partial<STDataTablePageParams>) {
        Object.assign(this, init);
    }
}


export class STDataTableProps {
    showCheckBox?: Boolean = true;
    data?: Array<any> = [];
    columns?: Array<STDataTableColumn> = [];
    pageParams?: STDataTablePageParams;
    actions?: Array<STDataTableAction> = [];

    searchEnable?: boolean = false;
    searchConditions?: Array<STConditionItem> = [];
    searchActions?: Array<STDataTableAction> = [];

    customObject?: STDataTableCustomFunction;

    //----------------------------------
    // sub table
    isSubTable?: boolean = false;
    subTableKey?: string = '';
    subTableColumns?: Array<STDataTableColumn> = [];

    //----------------------------------
    // Card Layout Mode
    cardProps?: STCardPanelProps
    cardPaginatorProps?: STPaginatorProps
    cardDataTotalCount?: number
    cardAutoScroll?: boolean

    layoutMode?: STTableViewLayout
    tableShowMode?: STTableShowMode
    searchKeyword?: string = ''
    alignFrozen?: string = 'right'
    frozen?: boolean = true;

    tableTotalRows?: number = this.data.length
    //----------------------------------
    tabActions?: Array<STTabAction> = [];
    activeId?: string = '1'
    searchInput?: string = '';

    emptyTitle?: string = 'Layout.PageLayout.No_Data'
    emptySubTitle?: string = ''

    constructor(init?: Partial<STDataTableProps>) {
        Object.assign(this, init);
    }
    setColumns(cols: Array<any>) {
        this.columns = cols;
        return this;
    }
    setDatas(ds: Array<any>) {
        this.data = ds;
        return this;
    }
    setActions(acs: Array<any>) {
        this.actions = acs;
        return this;
    }

    setSearchEnable(enable: boolean) {
        this.searchEnable = enable;
        return this;
    }
    setSearchActions(acs: Array<any>) {
        this.searchActions = acs;
        return this;
    }
    setSearchCondition(conds: Array<any>) {
        this.searchConditions = conds;
        return this;
    }
    setCustomFunction(custom?: STDataTableCustomFunction) {
        this.customObject = custom;
        return this;
    }
    //--------------------------------------------
    setSubColumns(cols: Array<any>) {
        this.subTableColumns = cols;
        return this;
    }
    setSubKey(key: string) {
        if (key == null || key == "")
            return this;
        this.subTableKey = key;
        this.isSubTable = true;
        return this;
    }
    setShowCheckBox(val: boolean) {
        this.showCheckBox = val
        return this
    }
    setCardProps(cardProps: STCardPanelProps) {
        this.cardProps = cardProps
        return this
    }
    setCardPaginatorProps(paginatorProps: STPaginatorProps) {
        this.cardPaginatorProps = paginatorProps
        return this
    }
    setCardDataTotalCount(cardTotal: number) {
        this.cardDataTotalCount = cardTotal
        return this
    }
    setCardAutoScroll(autoScroll: boolean) {
        this.cardAutoScroll = autoScroll
        return this
    }

    setLayoutMode(mode: STTableViewLayout) {
        this.layoutMode = mode
        return this
    }

    setTableShowMode(mode: STTableShowMode) {
        this.tableShowMode = mode
        return this
    }

    setSearchKeyword(txt: string) {
        this.searchKeyword = txt
        return this
    }

    setPageParams(pageParams: STDataTablePageParams) {
        this.pageParams = pageParams
        return this
    }

    setTableTotalRows(totalRows: number) {
        this.tableTotalRows = totalRows
        return this
    }
    setTabActions(tabActions: Array<STTabAction>) {
        this.tabActions = tabActions;
        return this;
    }
    setSearchInput(searchInput: string) {
        this.searchInput = searchInput;
        return this;
    }
    setEmptyTitleAndSubTitle(title: string, subTitle: string) {
        this.emptyTitle = title;
        this.emptySubTitle = subTitle;
        return this;
    }

}

export class STDataTableEvent {
    constructor(init?: Partial<STDataTableEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;
    eventActionBtnByRow?: Function;
    eventPageChange?: Function;
    eventSearchActionBtn?: Function;
    eventUploadAfter?: Function;
    change?: Function;
}

export class STDataTableAction extends STAction {

    constructor(init?) {
        super(init);

    }
}



export class STConditionItem extends STComponentItem {

    constructor(init?) {
        super(init);
    }

    // toFormItem() {
    //     return new STFormItem(this);
    // }
}

export class STDataTableCustomFunction {

    DataActionCustom?: Function
    constructor(init?) {
        Object.assign(this, init);
    }
}

export enum STTableViewLayout {
    TABLE = 'table',
    CARD = 'card'
}

export enum STTableShowMode {
    SCROllABLE = 'scrollable',
    PAGINATOR = 'paginator'
}
