import { PageAction } from "./PageAction";
import { PageFormItem } from "./PageFormItem";
import { PageTab } from "./PageTab";

import { PageSectionType } from "../enum/PageSectionType";
import { IPageSection } from "../interface/IPageSection";
import { IObjectGeneric } from "../interface/IObjectGeneric";
import { PageTableColumn, PageTablePageParams, PageTableShowMode, PageTableViewLayout } from "./PageTableColumn";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItem, PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { PageMessage, PageTag } from "./PageTag";
import { PageAvatar } from "./PageAvatar";
import { PageTreeItem } from "./PageTreeItem";
import { ILayout } from "../interface/ILayout";
import { PageCardNumber } from "./PageCardNumber";
import { PageNode } from './PageNode'
import { PageEdge } from './PageEdge'
import { PageCustomObject } from "./PageCustomObject";
import { PageLayoutEnum } from "../enum/PageLayoutEnum";
import { PageTimelineItem } from "./PageTimelineItem";
import { PagePanelItem } from "./PagePanelItem.new";
import { PageChatItem } from "./PageChatItem";
import { PageCardItem, PageCardPanelLayout, PageCardPanelMode } from "./PageCardItem";
import { PageFileItem } from "./PageFileItem";
import { PageAccordionItem } from "./PageAccordionItem";
import { IPageCustom } from "../interface/IPageCustom";
import { PageBuilder } from "../base/PageBuilder";
import { PageView } from "./PageView";
import { PageChatAlertItem } from "./PageChatAlertItem";
import { PageTimeRangeItem } from "./PageTimeRangeItem";
import { PageTerm } from "./PageTerm";
import { PageEmptyViewProps } from "./PageEmptyView";

import { DateExtension } from "@/utils/dateExtension";
import { Base64Extension } from "@/utils/base64Extension";
import { PageCardTitleItem } from "./PageCardTitleItem";
import { PageListViewSearchProps } from "./PageListViewSearchProps";
import { PageSliderProps } from "./PageSliderProps";
// import { PageAttributePanelItem } from "./PageAttributePanelItem";
import { PageAttributePanelProps } from "./PageAttributePanelProps";
import { PageAiChatAgentData } from "./PageAiChatItem";
import { PageEventBus, PageEventBusItem, PageEventEnum } from "../mitt/PageEventBus";
import { PageAIChatDepsType } from "./PageAIChatDeps";
import { PageIconText } from "./PageIconText";
import { PageCardSelectProps } from "./PageCardSelect";
import { PageVersionProps } from "./PageVersion";

//------------------------------------------
// Options class
//------------------------------------------
export class ChartOption {
    constructor(init?) {
        Object.assign(this, init);
    }

    public HasData?: boolean = false;
    public Type?: string //line , bar ...

}
export class TableOption {

    constructor(init?) {
        Object.assign(this, init);
    }

    public Datas?: Array<any> = [];
    public Columns?: Array<PageTableColumn>
    public ColDefinitions?: Array<PageFormItem> = []

    public IsSearchCondition?: boolean = false;//是否有查詢條件

    public IsClone?: boolean = false  // 表格上方
    public IsExport?: boolean = false
    public IsRowEdit?: boolean = false
    public IsRowDelete?: boolean = false
    public IsRowAdd?: boolean = false
    public IsRowUpload?: boolean = false
    public IsCellEdit?: boolean = false// 是否 cell edit (不弹匡直接编辑)

    public IsRowView?: boolean = false
    public IsRowClone?: boolean = false
    public IsColumnMenu?: boolean = false//调整显示栏位 , 可以动态开关栏位
    public IsFliterable?: boolean = false
    public IsSelectAll?: boolean = false
    public IsPageable?: boolean = true

    public DialogHiddenColumns?: string // row edit 弹窗时隐藏
    public DialogShowColumns?: string  // row edit 弹窗时打开
    public DialogDisableColumns?: string  // row edit 弹窗时锁定
    public DeleteRowMsg?: string = "是否确定要删除?"
    public EditHiddenCols?: string  // 不要编辑的栏位
    public EditRequestCols?: string  // 必填栏位
    public CustomAction?: Array<PageAction>  // 客制化按扭
    public RowViewURL?: string
    public TableHeight?: Number // 固定高度
    public DialogFormate?: Number  // 套用标准要求填写 对话筐
    public PageSize?: Number

    public EntityTabs?: Array<PageTab> = [];
    public CustomObject?: PageCustomObject = new PageCustomObject();// 列表中的
    public IsSubTable?: boolean = false;
    public SubTableKey?: string = '';
    public SubTable?: TableOption
    public ShowCheckBox?: boolean = true

    public PageParams?: PageTablePageParams = null
    public TableTotalRows?: number = 0
    public SearchKeyWord?: string = ''

    public SetNoEdit() {
        this.IsRowEdit = false;
        this.IsRowDelete = false;
        this.IsRowAdd = false;
        this.IsRowUpload = false;
        this.IsCellEdit = false; // 是否 cell edit (不弹匡直接编辑)
        this.IsRowView = false;
        this.IsRowClone = false;
        this.IsColumnMenu = false;
        this.IsFliterable = false;
        return this;
    }
    public RemoveColumn(field: string) {
        if (this.Columns == null || this.Columns.length == 0)
            return;
        this.Columns = this.Columns.filter(x => x.Field != field);

        return this;
    }
    public SetSearchEnable(enable: boolean) {
        this.IsSearchCondition = enable;
        return this;
    }

    public setCustomObject(custom?: PageCustomObject) {
        this.CustomObject = custom;
        return this;
    }

    public setSearchKeyWord(text: string) {
        this.SearchKeyWord = text;
        return this;
    }

}
export class FormOption {
    constructor(init?) {
        Object.assign(this, init);
    }
    public FormItems?: Array<PageFormItem> = []
    public CustomAction?: Array<PageAction> = [] // 客制化按扭

    // 找出必填且沒有值得資料
    public getRequestAndEmptyItems() {
        if (this.FormItems == null || this.FormItems.length == 0)
            return [];
        let emptys = this.FormItems
            .filter(x => x.IsRequest)
            .filter(x => x.isEmpty());

        return emptys;
    }

    public HasRequestEmptyValue() {
        let ds = this.getRequestAndEmptyItems();
        if (ds == null || ds.length == 0)
            return false;

        return true;
    }

    public CheckPassword() {
        let CheckPasswordArr = []
        let pa = ''
        let check = ''
        CheckPasswordArr = this.FormItems.filter((el) => {
            if (el.Field === 'password') { return el }
            if (el.Field === 'checkPassword') { return el }
        })
        if (CheckPasswordArr.length !== 2)
            return true
        CheckPasswordArr.forEach((el) => {
            if (el.Field === 'password') pa = el.Value || '';
            if (el.Field === 'checkPassword') check = el.Value || '';
        })
        return pa === check;
    }

    public cloneItemAndAddId(key: string, id: string) {

        let newdatas = this.FormItems.map(x => {
            if (x.DateOps && x.Value && x.DateType == 'DateString') {
                x.Value = DateExtension.getDateFormat(x.Value, x.DateOps.DateFormat)
            }
            return new PageFormItem(x)
        })
        //console.log('newdatas', newdatas)
        newdatas.push(new PageFormItem({ Field: key, Value: id }));
        return newdatas;
    }

    public updateItemValue(item: PageFormItem) {
        let itemFind = this.FormItems.find(x => x.Field == item.Field);
        if (itemFind) {
            itemFind.Value = item.Value;
        }

        return this;
    }

    public updateItemValueByObject(obj: any) {
        if (obj == undefined || obj == null)
            return this;
        for (let key in obj) {
            let itemFind = this.FormItems.find(x => x.Field == key);
            if (itemFind) {
                itemFind.Value = obj[key];
            }
        }


        return this;
    }
    public checkItemErrotText(obj: any, fields: Array<string>, titles: Array<string>) {
        if (obj == undefined || obj == null)
            return this;
        fields.forEach((field, index) => {
            let itemFind: PageFormItem = this.FormItems.find(x => x.Field == field);
            if (itemFind) {
                let num = parseFloat(itemFind.Value ?? 0);
                let min = obj[`${field}_MIN`];
                let max = obj[`${field}_MAX`];
                itemFind.SliderMin = min
                itemFind.SliderMax = max
                if (num < min || num > max)
                    itemFind.ErrorText = 'Layout.PageLayout.OutOfRangeValue';
                else
                    itemFind.ErrorText = '';

                itemFind.Name = titles[index]
            }

        })

        return this;
    }

    public toObjectByItems(obj: any) {
        if (obj == undefined || obj == null)
            return this;
        for (let key in obj) {
            let itemFind = this.FormItems.find(x => x.Field == key);
            if (itemFind) {
                obj[key] = itemFind.Value;
            }
        }


        return obj;
    }
}
export class MasterInfoOption {
    constructor(init?) {
        Object.assign(this, init);
    }
    public Title?: string = '';
    public TagInfo?: PageTag = new PageTag();
    public DateInfo?: string = '';
    public Description?: string = '';
    public AvatarInfo?: PageAvatar = new PageAvatar();
    public IsTag?: boolean = false;
    public IsAvatar?: boolean = false;
    public Cardpt?: any;
    public IconTexts?: Array<PageIconText> = [];

    setTitle(title: string) {
        this.Title = title;
        return this;
    }
    setDateInfo(date: string) {
        this.DateInfo = date;
        return this;
    }
    setDescription(desc: string) {
        this.Description = desc;
        return this;
    }
    setTage(tag: PageTag) {
        this.IsTag = true;
        this.TagInfo = tag;
        return this;
    }
    setAvator(avator: PageAvatar) {
        this.IsAvatar = true;
        this.AvatarInfo = avator;
        return this;
    }
    getTag() {
        if (this.IsTag)
            return this.TagInfo;

        return null;
    }
    getAvatar() {
        if (this.IsAvatar)
            return this.AvatarInfo;

        return null;
    }
    setCardPT(obj: any) {
        this.Cardpt = obj
        return this
    }

    setIconTexts(obj: Array<PageIconText>) {
        this.IconTexts = obj
        return this
    }


}

export type TreeMode = 'single' | 'multiple' | 'checkbox';
export class TreeOption {
    constructor(init?) {
        Object.assign(this, init);
    }

    Items?: Array<PageTreeItem> = [];
    ToolbarActions?: Array<PageAction> = []//功能按鈕
    ContextActions?: Array<PageAction> = []//右鍵按鈕
    SelectionKeys?: any;// 物件 { 'key':true }
    SelectionTreeMode: TreeMode = 'single'
}
export class CardNumberOption {
    constructor(init?) {
        Object.assign(this, init);
    }

    cardNumber?: PageCardNumber = new PageCardNumber();
}

export class WorkflowOption {
    constructor(init?) {
        Object.assign(this, init);
    }

    Nodes?: Array<PageNode> = [];
    Edges?: Array<PageEdge> = []
    Actions?: Array<PageAction> = []//功能按鈕
    Zoom?: number = 1;
    InitPostionX?: number = 0;
    InitPostionY?: number = 0;

    setPosition(x: number, y: number) {
        this.InitPostionX = x;
        this.InitPostionY = y;
        return this;
    }
    setZoom(zoom: number) {
        this.Zoom = zoom;
        return this;
    }
}
export class ChatOption {
    constructor(init?) {
        Object.assign(this, init);
    }

    public ChatlineItems?: Array<PageChatItem> = [];
    public ChatAlertItems?: Array<PageChatAlertItem> = [];
    public DisplaySample?: boolean = false;
}

//------------------------------------------
// PageSection base class
//------------------------------------------
export class PageSection implements IPageSection, ILayout {
    constructor(init?) {
        Object.assign(this, init);
        this.setId();
    }

    Component?: any = null;
    Props?: IObjectGeneric = {};
    Attrs?: IObjectGeneric = {};
    Events?: IObjectGeneric = {};

    public Path: string = ''
    public Id: string = ''
    public Title: string = '標題'
    public SectionType: PageSectionType = PageSectionType.FORM;
    public Edit?: boolean = true;
    public Required?: boolean = false;
    public ToolbarActions?: Array<PageAction> = []//功能按鈕
    public TabId?: string = 'basic'
    public Badge?: PageTag = new PageTag();
    public Message?: PageMessage = new PageMessage();
    public IsPanel?: boolean = true;
    public Display?: boolean = true;

    public RowIndex?: number = 0;
    public ColIndex?: number = 0;
    public LayoutType?: PageLayoutEnum = PageLayoutEnum.LEFT;

    public Seq?: number = 0;

    // 各類設定物件 
    public TableOps?: TableOption;
    public FormOps?: FormOption = new FormOption();
    public MasterInfoOps?: MasterInfoOption = new MasterInfoOption();
    public TreeOps?: TreeOption = new TreeOption();
    public CardOps?: CardNumberOption = new CardNumberOption();
    public WFOption?: WorkflowOption = new WorkflowOption();
    public TimelineItems?: Array<PageTimelineItem> = [];
    public PromptHistoryResult?: Array<any> = [];
    public WhosCallDreawer?: string = '';

    // new Panel test
    public PanelItem?: PagePanelItem = new PagePanelItem()
    public ChatOps?: ChatOption = new ChatOption();

    public CardItemList?: Array<PageCardItem> = []
    public FileItemList?: Array<PageFileItem> = []
    public AccordionItemList?: Array<PageAccordionItem> = []
    public AccordionMultiple?: boolean = false
    public SearchBarInputField?: PageFormItem = new PageFormItem()
    public EmptyViewProps?: PageEmptyViewProps = new PageEmptyViewProps()

    // 對話框設定
    public IsControllerView?: boolean = false;
    public EntityType?: string;
    public EntityPKID?: string;
    public EntityObject?: any;


    public isInfoPage?: boolean = false
    public customSection?: PageSectionCustom;

    public IsGoBack?: boolean = false;//是否有 反回按鈕 for dialog section
    public SectionClass?: string;//

    public DrawerBack?: boolean = false;
    public EmptyTitle?: string = 'Layout.PageLayout.No_Data'
    public EmptySubTitle?: string = ''
    public penalPt?: Object;

    public setTabId(tabid: string) {
        this.TabId = tabid;
        return this;
    }
    public setId(id?: string) {
        if (id == null || id == "")
            this.Id = this.generateUUID();
        else
            this.Id = id;
        return this;
    }
    public setRefreshId() {

        this.Id = this.generateUUID();

        return this;
    }
    public setTitle(title: string) {
        this.Title = title;
        return this;
    }
    public setPath(path: string) {
        this.Path = path;
        return this;
    }

    public SetEdit(edit?: boolean): PageSection {
        this.Edit = edit;
        return this;
    }
    public SetBadge(badge?: PageTag): PageSection {
        this.Badge = badge;
        return this;
    }
    public SetDrawerBack(drawerBack?: boolean): PageSection {
        this.DrawerBack = drawerBack;
        return this;
    }
    setToolbarActions(acs: Array<PageAction>) {
        this.ToolbarActions = acs;
        return this;
    }
    getToolbarActions() {
        return this.ToolbarActions;
    }
    setPanel(block: boolean) {
        this.IsPanel = block;
        return this;
    }

    SetRowIndex(index: number): PageSection {
        this.RowIndex = index;
        return this;
    }

    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    isFormEdit() {
        if (this.SectionType != PageSectionType.FORM)
            return false;

        return this.Edit;
    }

    setLayoutType(layoutType: PageLayoutEnum) {
        this.LayoutType = layoutType;
        return this;
    }

    // new Panel test
    setPanelItem(panelItem: PagePanelItem) {
        this.PanelItem = panelItem
        return this
    }


    isPageCustom(object: any = this): object is IPageCustom {
        return 'getComponent' in this;
    }

    setIsInfoPage(type: boolean) {
        this.isInfoPage = type
        return this
    }

    update(isPageSection?: boolean) {

        if (isPageSection) {
            PageEventBus.getInstance.triggerEvent(
                new PageEventBusItem()
                    .setEventName(PageEventEnum.PageSecUpdateByPageSection)
                    .setData(this.Path)
            );
        }
        else {
            PageEventBus.getInstance.triggerEvent(
                new PageEventBusItem()
                    .setEventName(PageEventEnum.PageSecUpdateByOne)
                    .setData(this.Path)
            );
        }



    }
    updateDarwer() {
        PageEventBus.getInstance.triggerEvent(
            new PageEventBusItem()
                .setEventName(PageEventEnum.PageSecDrawerUpdate)
        );
    }

    setControllerView(isControllerView: boolean) {
        this.IsControllerView = isControllerView;
        return this;
    }
    setControllerEntityType(entityType: string) {
        this.EntityType = entityType;
        return this;
    }
    setControllerEntityPKID(entityPKID: string) {
        this.EntityPKID = entityPKID;
        return this;
    }

    setGoBack(isgoback: boolean) {
        this.IsGoBack = isgoback;
        return this;
    }

    getClass(obj?: any) {

        if (obj)
            return Object.assign(this.SectionClass ?? {}, obj);
        else
            return this.SectionClass ?? {};

    }

    setRowObject(obj: any) {
        this.EntityObject = obj;
        return this;
    }
    getRowObject() {
        return this.EntityObject;

    }
    setEmptyTitleAndSubTitle(title: string, subTitle: string) {
        this.EmptyTitle = title;
        this.EmptySubTitle = subTitle;
        return this;
    }
    public setPanelPt(pt: Object) {
        this.penalPt = pt
        return this
    }
}

//------------------------------------------
// any type Pagesection class
//------------------------------------------
export class PageSectionDataTable extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.TABLE;
        this.TableOps = new TableOption();

    }
    setDatas(ds: Array<any>) {
        if (ds == undefined || ds == null)
            ds = [];
        this.TableOps.Datas = ds;
        this.TableOps.TableTotalRows = ds.length
        return this;
    }
    setColumns(cols: Array<PageTableColumn>) {
        this.TableOps.Columns = cols;
        return this;
    }
    getActions() {
        return this.TableOps.CustomAction;
    }
    setActions(acs: Array<PageAction>) {
        this.TableOps.CustomAction = acs;
        return this;
    }
    setDatasByRow(row: any, first: boolean = false) {
        if (this.TableOps.Datas == null)
            this.TableOps.Datas = [];

        if (first)
            this.TableOps.Datas.unshift(row);
        else
            this.TableOps.Datas.push(row);

        return this;
    }
    deleteDataByRow(rowId: any, idKey: string) {
        if (this.TableOps.Datas == null)
            this.TableOps.Datas = [];


        for (let i = 0; i < this.TableOps.Datas.length; i++) {
            let id = this.TableOps.Datas[i][idKey];
            if (id == rowId) {
                this.TableOps.Datas.splice(i, 1);
                this.TableOps.TableTotalRows = this.TableOps.TableTotalRows - 1;
                break;
            }

        }
        return this;
    }
    editDatasByRow(row: any, idKey: string) {
        if (this.TableOps.Datas == null)
            this.TableOps.Datas = [];

        this.TableOps.Datas.forEach((x) => {
            if (x[idKey] == row[idKey]) {
                Object.assign(x, row);
            }

        })

        return this;
    }

    getColumnAction() {
        let col = this.TableOps.Columns.find(x => x.Field == "Action");
        if (col == null)
            return [];

        return col.Actions;
    }
    setColumnAction(acs: Array<PageAction>) {
        let col = this.TableOps.Columns.find(x => x.Field == "Action");
        if (col == null)
            return [];

        if (acs.length == 0)
            this.TableOps.Columns = this.TableOps.Columns.filter(x => x.Field != "Action");
        else
            col.Actions = acs;
    }
    setMessageInfo(text: string) {
        this.Message.setTitle("說明").setText(text).setSecondary();
        return this;
    }
    getSubTableColumnAction() {
        if (this.TableOps.SubTable == null)
            return [];
        let col = this.TableOps.SubTable.Columns.find(x => x.Field == "Action");
        if (col == null)
            return [];

        return col.Actions;
    }
    setSubTableColumnAction(acs: Array<PageAction>) {
        if (this.TableOps.SubTable == null)
            return [];
        let col = this.TableOps.SubTable.Columns.find(x => x.Field == "Action");
        if (col == null)
            return [];

        if (acs.length == 0)
            this.TableOps.SubTable.Columns = this.TableOps.SubTable.Columns.filter(x => x.Field != "Action");
        else
            col.Actions = acs;
    }
    //------------------------------------------------------------------------------
    // 子表格
    setSubTable() {
        if (this.TableOps.SubTable == null)
            this.TableOps.SubTable = new TableOption();

        this.TableOps.SubTable.IsSubTable = true;
        return this;
    }
    setSubTableCols(cols: Array<PageTableColumn>) {

        this.TableOps.SubTable.Columns = cols;
        return this;
    }
    setSubTableDatasKey(key: string) {
        this.TableOps.SubTable.SubTableKey = key;
        return this;
    }
    getSubTableActions() {
        return this.TableOps.SubTable.CustomAction;
    }
    setSubTableActions(acs: Array<PageAction>) {
        this.TableOps.SubTable.CustomAction = acs;
        return this;
    }
    setShowCheckbox(val: boolean) {
        this.TableOps.ShowCheckBox = val
        return this
    }

    setPageParams(pageParams: PageTablePageParams) {
        this.TableOps.PageParams = pageParams
        return this
    }
    setTableTotalRows(totalRows: number) {
        this.TableOps.TableTotalRows = totalRows
        return this
    }
}
export class PageSectionForm extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.FORM;
        this.FormOps = new FormOption();

    }
    setItems(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    setActions(acs?: Array<PageAction>) {
        if (acs == null || acs.length == 0) {
            acs = [
                new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Components.STForm.Confirm", Icon: "pi pi-check", Id: "ok" })
                    .setBtnStyle(true, false, PageItemSeverityStyle.NONE),
                new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Components.STForm.Cancel", Icon: "pi pi-times", Id: "cancel" })
                    .setBtnStyle(false, true, PageItemSeverityStyle.DANGER)
            ];
        }
        this.FormOps.CustomAction = acs;
        return this;
    }
    setMessageInfo(text: string) {
        this.Message.setTitle("說明").setText(text).setInfo();
        return this;
    }
    setAllDisable(disable: boolean) {
        if (this.FormOps == null)
            return this;
        if (this.FormOps.FormItems.length == 0)
            return this;

        this.FormOps.FormItems.forEach((x) => {
            x.IsDisabled = disable
        })

        return this;
    }
}
export class PageSectionTitle extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.PAGE_TITLE;
        this.TabId = "-1"
        this.setPanel(false);
    }
}
export class PageSectionMenubar extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.PAGE_MENUBAR;
        this.TabId = "-1"
        this.setPanel(false);
    }
}
export class PageSectionMenu extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.MENU;

        this.setPanel(false);
    }
}
export class PageSectionMessage extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.PAGE_MESSAGE;
        this.TabId = "-1"
        this.setPanel(false);
    }
}
export class PageSectionMasterInfo extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.PAGE_MASTER_INFO;
        this.TabId = "-1"
        this.setPanel(false);
        this.MasterInfoOps = new MasterInfoOption();
    }
}
export class PageSectionTabs extends PageSection {
    public TabPt: Object = {}
    public TabListPt: Object = {}

    constructor() {
        super();
        this.SectionType = PageSectionType.PAGE_TABS;
        this.TabId = "-1"
        this.setPanel(false);
    }
    setCurrentTabId(id: string) {
        this.ToolbarActions.forEach((x) => {
            x.Active = false;
        })
        let ac = this.ToolbarActions.find(x => x.Id == id);
        if (ac)
            ac.Active = true;

        return this;
    }
    // 客製tab樣式
    public setTabPt(pt: Object) {
        this.TabPt = pt
        return this
    }
    // 客製tabList樣式
    public setTabListPt(pt: Object) {
        this.TabListPt = pt
        return this
    }

}

export class PageSectionTabContent extends PageSectionTabs {
    public TargetSection?: PageSection
    public TabPt: Object = {}
    public TabListPt: Object = {}
    constructor() {
        super();
        this.SectionType = PageSectionType.TABCONTENT;
    }

    setTargetSection(sec: PageSection) {
        this.TargetSection = sec;
        return this;
    }
    setCurrentTabId(id: string) {
        this.ToolbarActions.forEach((x) => {
            x.Active = false;
        })
        let ac = this.ToolbarActions.find(x => x.Id == id);
        if (ac)
            ac.Active = true;

        return this;
    }
    // 客製tab樣式
    public setTabPt(pt: Object) {
        this.TabPt = pt
        return this
    }
    // 客製tabList樣式
    public setTabListPt(pt: Object) {
        this.TabListPt = pt
        return this
    }

    // ================可使用的預設樣式================

    // tab padding客製化
    public setTabPtByCustomPadding(padding: string = 'py-[12px] px-[8px]') {
        this.TabPt = {
            root: ({ props, context }) => ({
                class: [
                    `${padding}`,
                    '!bg-transparent',
                    'cursor-pointer select-none whitespace-nowrap',
                    'user-select-none',
                    '!border-b-[1px] !border-t-0',
                    {
                        'border-transparent': !context.active,
                        '!text-body1 !text-commTextLevel2': !context.active,
                        '!text-primary !text-h3': context.active,
                    }
                ]
            })
        }
        return this
    }
}

export class PageSectionSearchTable extends PageSectionDataTable {
    constructor() {
        super();
        this.SectionType = PageSectionType.TABLE_SEARCH;
        this.TableOps = new TableOption();
        this.FormOps = new FormOption();
        this.TableOps.SetSearchEnable(true);
    }

    setSearchConditions(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    setSearchActions(acs?: Array<PageAction>) {
        if (acs == null || acs.length == 0) {
            acs = [
                new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Components.STTable.Search", Icon: "pi pi-search", Id: "search" })
                    .setBtnStyle(false, false, PageItemSeverityStyle.CONTRAST),
            ];
        }
        this.FormOps.CustomAction = acs;
        return this;
    }

    getSearchConditions() {
        return this.FormOps?.FormItems;
    }
    public setCustomObject(custom?: PageCustomObject) {
        this.TableOps.setCustomObject(custom);
        return this;
    }

    setTabActions(tabs: Array<PageTab>) {
        this.TableOps.EntityTabs = tabs

        return this;
    }
    setTabActive(id: string) {
        if (id == null || id == "")
            return this;

        if (this.TableOps.EntityTabs == undefined ||
            this.TableOps.EntityTabs == null ||
            this.TableOps.EntityTabs.length == 0
        ) {
            return this;
        }

        this.TableOps.EntityTabs.forEach((x) => {
            if (x.Id == id)
                x.Active = true;
            else
                x.Active = false;
        })

        return this;
    }

    setSearchKeyWordUpdate() {
        PageEventBus.getInstance.triggerEvent(
            new PageEventBusItem()
                .setEventName(PageEventEnum.PageTableUpdate)
                .setData(this.TableOps.Datas)
        );
    }
}

export class PageSectionUploadFile extends PageSectionDataTable {
    constructor() {
        super();
        this.SectionType = PageSectionType.FILE_UPLOAD;
        this.FormOps = new FormOption();
        this.TableOps = new TableOption();
        this.TreeOps = new TreeOption();
    }
    setUploadInfo(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    setTreeData(items: Array<PageTreeItem>) {
        this.TreeOps.Items = items;
        return this;
    }
    setTreeActions(items: Array<PageAction>) {
        this.TreeOps.ToolbarActions = items;
        return this;
    }
    changeUrlkey(id: string) {
        if (this.FormOps?.FormItems == null ||
            this.FormOps?.FormItems.length == 0
        ) {
            return this;
        }
        let uploadItem = this.FormOps?.FormItems.find(x => x.Type == PageItem.Upload);
        if (uploadItem == null)
            return this;

        uploadItem.UrlID = id;
    }
    getUrlkey() {
        if (this.FormOps?.FormItems == null ||
            this.FormOps?.FormItems.length == 0
        ) {
            return "";
        }
        let uploadItem = this.FormOps?.FormItems.find(x => x.Type == PageItem.Upload);
        if (uploadItem == null)
            return "";

        return uploadItem.UrlID;
    }
    setContextActions(items: Array<PageAction>) {
        this.TreeOps.ContextActions = items;
        return this;
    }
    getContextActions() {
        return this.TreeOps.ContextActions;
    }
    setMessageInfo(text: string) {
        this.Message.setTitle("說明").setText(text).setSecondary();
        return this;
    }
    getColumnAction() {
        let col = this.TableOps.Columns.find(x => x.Field == "Action");
        if (col == null)
            return [];

        return col.Actions;
    }
    setColumnAction(acs: Array<PageAction>) {
        let col = this.TableOps.Columns.find(x => x.Field == "Action");
        if (col == null)
            return [];

        if (acs.length == 0)
            this.TableOps.Columns = this.TableOps.Columns.filter(x => x.Field != "Action");
        else
            col.Actions = acs;
    }
}
export class PageSectionUpload extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.UPLOAD;
    }

}
export class PageSectionPopover extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.PAGE_POPVER;

    }

    setListItemActions(acs: Array<PageAction>) {
        this.ToolbarActions = acs;
        return this;
    }
}
export class PageSectionCardNumber extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.DASHBOARD_CARDNUMBER;
        this.CardOps = new CardNumberOption();
        this.setPanel(false);
    }

    setNameAndNumber(name: string, number: string) {
        this.CardOps.cardNumber.Title = name;
        this.CardOps.cardNumber.Number = number;
        return this;
    }
    setIcon(icon: string, iconStyle?: string) {
        this.CardOps.cardNumber.Icon = icon;
        if (iconStyle != null)
            this.CardOps.cardNumber.IconBlock = iconStyle;
        return this;
    }
    setSubDesc(subName: string, subDesc?: string) {
        this.CardOps.cardNumber.SubTitle = subName;
        if (subDesc != null)
            this.CardOps.cardNumber.SubDesc = subDesc;
        return this;
    }
}
export class PageSectionTreeForm extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.TREE_FORM;
        this.FormOps = new FormOption();
        this.TreeOps = new TreeOption();
    }
    setSelectTreeData(items: any) {
        this.TreeOps.SelectionKeys = items;
        return this;
    }
    setFormData(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }
    setTreeData(items: Array<PageTreeItem>) {
        this.TreeOps.Items = items;
        return this;
    }
    setTreeActions(items: Array<PageAction>) {
        this.TreeOps.ToolbarActions = items;
        return this;
    }
    setTreeMode(items) {
        this.TreeOps.SelectionTreeMode = items;
        return this;
    }
    getTreeActions() {
        return this.TreeOps.ToolbarActions;
    }
    setContextActions(items: Array<PageAction>) {
        this.TreeOps.ContextActions = items;
        return this;
    }
    updateTreeItemName(item: PageTreeItem) {
        this.TreeOps.Items.forEach((x) => {
            if (x.Pkid == item.Pkid) {
                x.Label = item.Label;
            } else {
                if (x.Children?.length > 0)
                    this.updateTreeItemNameRecursion(item, x);
            }

        })
    }
    private updateTreeItemNameRecursion(reNameItem: PageTreeItem, targetItem: PageTreeItem) {
        targetItem.Children.forEach((x) => {
            if (x.Pkid == reNameItem.Pkid) {
                x.Label = reNameItem.Label;
            } else {
                if (x.Children?.length > 0)
                    this.updateTreeItemNameRecursion(reNameItem, x);
            }
        })
    }
    getContextActions() {
        return this.TreeOps.ContextActions;
    }
}
export class PageSectionTree extends PageSectionDataTable {
    constructor() {
        super();
        this.SectionType = PageSectionType.TREE;
        this.TreeOps = new TreeOption();
    }
    setTreeData(items: Array<PageTreeItem>) {
        this.TreeOps.Items = items;
        return this;
    }
    setTreeActions(items: Array<PageAction>) {
        this.TreeOps.ToolbarActions = items;
        return this;
    }
    setTreeMode(items) {
        this.TreeOps.SelectionTreeMode = items;
        return this;
    }
    getTreeActions() {
        return this.TreeOps.ToolbarActions;
    }
    setContextActions(items: Array<PageAction>) {
        this.TreeOps.ContextActions = items;
        return this;
    }
    updateTreeItemName(item: PageTreeItem) {
        this.TreeOps.Items.forEach((x) => {
            if (x.Pkid == item.Pkid) {
                x.Label = item.Label;
            } else {
                if (x.Children?.length > 0)
                    this.updateTreeItemNameRecursion(item, x);
            }

        })
    }
    private updateTreeItemNameRecursion(reNameItem: PageTreeItem, targetItem: PageTreeItem) {
        targetItem.Children.forEach((x) => {
            if (x.Pkid == reNameItem.Pkid) {
                x.Label = reNameItem.Label;
            } else {
                if (x.Children?.length > 0)
                    this.updateTreeItemNameRecursion(reNameItem, x);
            }
        })
    }
    getContextActions() {
        return this.TreeOps.ContextActions;
    }
}
export class PageSectionDialog extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.DIALOG;
        this.FormOps = new FormOption();

    }
    setItems(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    setActions(acs?: Array<PageAction>) {
        if (acs == null || acs.length == 0) {
            acs = [
                new PageAction({ Type: PageTableActionEnum.TableOk, Text: "確定", Icon: "pi pi-check", Id: "ok" })
                    .setBtnStyle(true, false, PageItemSeverityStyle.NONE),
                new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "取消", Icon: "pi pi-times", Id: "cancel" })
                    .setBtnStyle(false, true, PageItemSeverityStyle.DANGER)
            ];
        }
        this.FormOps.CustomAction = acs;
        return this;
    }

    setCustomSection(sec: PageSectionCustom) {
        this.customSection = sec;
        return this;
    }
}

export class PageSectionMarkdown extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.MARKDOWN;
        this.FormOps = new FormOption();
        this.setPanel(false);
    }
    setItems(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

}

export class PageSectionWorkflow extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.WORKFLOW;
        this.WFOption = new WorkflowOption();

    }
    setNodes(nodes: Array<PageNode>) {
        this.WFOption.Nodes = nodes;
        return this;
    }
    setEdges(edges: Array<PageEdge>) {
        this.WFOption.Edges = edges;
        return this;
    }
    setActions(acs: Array<PageAction>) {
        this.WFOption.Actions = acs;
        return this;
    }
    setViewPort(x: number, y: number, zoom: number) {
        this.WFOption.setPosition(x, y);
        this.WFOption.setZoom(zoom);
    }

}

export class PageSectionSearchFilter extends PageSectionDataTable {
    constructor() {
        super();
        this.SectionType = PageSectionType.TABLE_SEARCH_FILTER;
        this.FormOps = new FormOption();
    }

    setSearchConditions(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    getSearchConditions() {
        return this.FormOps?.FormItems;
    }
}

export class PageSectionTimeline extends PageSection {

    constructor() {
        super();
        this.SectionType = PageSectionType.TIMELINE;
    }

    setTimelineItem(items?: Array<PageTimelineItem>) {
        this.TimelineItems = items;
        return this;
    }
}


export class PageSectionChatLine extends PageSection {

    constructor() {
        super();
        this.SectionType = PageSectionType.CHATLINE;
        this.ChatOps = new ChatOption();
    }

    setChatlineItem(items?: Array<PageChatItem>) {
        this.ChatOps.ChatlineItems = items;
        return this;
    }
    setChatAlertItem(items?: Array<PageChatAlertItem>) {
        this.ChatOps.ChatAlertItems = items;
        return this;
    }
    setDisplaySample(isSample: boolean) {
        this.ChatOps.DisplaySample = isSample;
        return this;
    }
}

export class PageSectionCardPanel extends PageSection {
    public CardPanelLayout: PageCardPanelLayout
    public CardPanelTitle: string
    public CardPanelIfScrollable: boolean
    public CardPanelWrapperHeight: string
    public CardWrapperClass: string
    public CardContentClass: string
    public RowCount: number
    public ColCount: number
    public ShowMode: PageCardPanelMode
    public PaginatorRows: number
    public PaginatorFirst: number
    public DataTotalCount?: number
    public AutoScroll?: boolean

    constructor() {
        super()
        this.SectionType = PageSectionType.CARDPANEL
    }

    setCardItem(items?: Array<PageCardItem>) {
        this.CardItemList = items
        return this
    }

    setPanelLayout(layout: PageCardPanelLayout) {
        this.CardPanelLayout = layout
        return this
    }

    setCardPanelTitle(title: string) {
        this.CardPanelTitle = title
        return this
    }

    setCardPanelIfScrollable(val: boolean) {
        this.CardPanelIfScrollable = val
        return this
    }

    setCardPanelWrapperHeight(val: string) {
        this.CardPanelWrapperHeight = val
        return this
    }

    setCardWrapperClass(val: string) {
        this.CardWrapperClass = val
        return this
    }

    setCardContentClass(val: string) {
        this.CardContentClass = val
        return this
    }

    setRowCount(row: number) {
        this.RowCount = row
        return this
    }

    setColCount(col: number) {
        this.ColCount = col
        return this
    }

    setPaginatorRows(rows: number) {
        this.PaginatorRows = rows
        return this
    }

    setPaginatorFirst(first: number) {
        this.PaginatorFirst = first
        return this
    }

    setShowMode(mode: PageCardPanelMode) {
        this.ShowMode = mode
        return this
    }

    setDataTotalCount(total: number) {
        this.DataTotalCount = total
        return this
    }

    setAutoScroll(status: boolean) {
        this.AutoScroll = status
        return this
    }
}

export class PageSectionFileDownload extends PageSection {
    constructor() {
        super()
        this.SectionType = PageSectionType.FILE_DOWNLOAD
    }

    setFileItem(items?: Array<PageFileItem>) {
        this.FileItemList = items
        return this
    }
}

export class PageSectionAccordion extends PageSection {
    constructor() {
        super()
        this.SectionType = PageSectionType.ACCORDION
    }

    setAccordionItem(items?: Array<PageAccordionItem>) {
        this.AccordionItemList = items
        return this
    }

    setAccordionMultiple(status: boolean) {
        this.AccordionMultiple = status
        return this
    }
}

export class PageSectionSearchBar extends PageSection {
    constructor() {
        super()
        this.SectionType = PageSectionType.SEARCHBAR
    }

    setSearchBarInput(items?: PageFormItem) {
        this.SearchBarInputField = items
        return this
    }

    setValue(val: string) {
        this.SearchBarInputField.Value = val
        return this
    }

    getValue() {
        return this.SearchBarInputField.Value
    }
}

// 包含tab的custom section
export class PageSectionCustomTab extends PageSectionTabContent implements IPageCustom {
    constructor() {
        super()
        this.SectionType = PageSectionType.CUSTOM
    }

    // 取得元件實例
    getComponent() { }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {
        return sec;
    }
}


export class PageSectionCustom extends PageSection implements IPageCustom {
    constructor() {
        super()
        this.SectionType = PageSectionType.CUSTOM
    }

    // 取得元件實例
    getComponent() { }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {
        return sec;
    }
}

export class PageSectionDashboardBar extends PageSection {
    TimeSelectItems: Array<PageTimeRangeItem> = [];
    constructor() {
        super()
        this.IsPanel = false;
        this.SectionType = PageSectionType.DASHBOARD_BAR
    }

    setTimeSelectItems(items: Array<PageTimeRangeItem>) {
        this.TimeSelectItems = items;
        return this;
    }
}

export class PageSectionEditor extends PageSection {
    public HtmlValue?: string
    public Height?: string
    public HtmlValueBase64?: string
    constructor() {
        super()
        this.SectionType = PageSectionType.EDITOR
    }

    setHtmlValue(value?: string) {
        this.HtmlValue = value;
        return this;
    }
    setHtmlValueBase64(value?: string) {
        this.HtmlValueBase64 = value;
        return this;
    }
    getHtmlValueBase64() {
        return this.HtmlValueBase64;
    }
    getHtmlValue() {
        return this.HtmlValue;
    }
    convertBase64() {
        if (this.HtmlValue == undefined || this.HtmlValue == null || this.HtmlValue == '')
            return this;

        this.HtmlValueBase64 = Base64Extension.toBase64(this.HtmlValue);
        return this;
    }
    convertString() {
        if (this.HtmlValueBase64 == undefined || this.HtmlValueBase64 == null || this.HtmlValueBase64 == '')
            return this;

        this.HtmlValue = Base64Extension.toString(this.HtmlValueBase64);
        return this;
    }
}

export class PageSectionEmptyView extends PageSection {
    constructor() {
        super()
        this.SectionType = PageSectionType.EMPTY_VIEW
    }

    setEmptyViewProps(props: PageEmptyViewProps) {
        this.EmptyViewProps = props
        return this
    }
}

export class PageSectionCardTitle extends PageSection {
    public PageSecCardTitleProps?: PageCardTitleItem

    constructor() {
        super()
        this.SectionType = PageSectionType.CARDTITLE
    }

    setProps(props?: PageCardTitleItem) {
        this.PageSecCardTitleProps = props
        return this
    }
}

export class PageSectionListViewSearch extends PageSection {
    public PageSecListViewSearchProps?: PageListViewSearchProps
    public TargetCustomSecList?: PageSection[]
    public searchKeyword?: string

    constructor() {
        super()
        this.SectionType = PageSectionType.LISTVIEW_SEARCH
    }

    setProps(props?: PageListViewSearchProps) {
        this.PageSecListViewSearchProps = props
        return this
    }

    setTargetCustomSecList(secs?: PageSection[]) {
        this.TargetCustomSecList = secs
        return this
    }
    setSearchKeyword(keyword: string) {
        this.searchKeyword = keyword
        return this
    }
}

export class PageSectionTableView extends PageSectionDataTable {
    public CardPanelLayout: PageCardPanelLayout
    public CardPanelTitle: string
    public CardPanelIfScrollable: boolean
    public CardPanelWrapperHeight: string
    public CardWrapperClass: string
    public CardContentClass: string
    public RowCount: number
    public ColCount: number
    public ShowMode: PageCardPanelMode
    public PaginatorRows: number
    public PaginatorFirst: number
    public DataTotalCount?: number
    public AutoScroll?: boolean
    public LayoutMode?: PageTableViewLayout
    public TableShowMode?: PageTableShowMode
    public SearchKeyword?: string

    constructor() {
        super();
        this.SectionType = PageSectionType.TABLE_VIEW;
        this.TableOps = new TableOption();
        this.FormOps = new FormOption();
    }
    // card layoue mode
    setCardItem(items?: Array<PageCardItem>) {
        this.CardItemList = items
        return this
    }

    setCardPanelLayout(layout: PageCardPanelLayout) {
        this.CardPanelLayout = layout
        return this
    }

    setCardPanelTitle(title: string) {
        this.CardPanelTitle = title
        return this
    }

    setCardPanelIfScrollable(val: boolean) {
        this.CardPanelIfScrollable = val
        return this
    }

    setCardPanelWrapperHeight(val: string) {
        this.CardPanelWrapperHeight = val
        return this
    }

    setCardWrapperClass(val: string) {
        this.CardWrapperClass = val
        return this
    }

    setCardContentClass(val: string) {
        this.CardContentClass = val
        return this
    }

    setCardRowCount(row: number) {
        this.RowCount = row
        return this
    }

    setCardColCount(col: number) {
        this.ColCount = col
        return this
    }

    setCardPaginatorRows(rows: number) {
        this.PaginatorRows = rows
        return this
    }

    setCardPaginatorFirst(first: number) {
        this.PaginatorFirst = first
        return this
    }

    setCardShowMode(mode: PageCardPanelMode) {
        this.ShowMode = mode
        return this
    }

    setCardDataTotalCount(total: number) {
        this.DataTotalCount = total
        return this
    }

    setCardAutoScroll(status: boolean) {
        this.AutoScroll = status
        return this
    }

    setLayoutMode(mode: PageTableViewLayout) {
        this.LayoutMode = mode
        return this
    }

    setTableShowMode(mode: PageTableShowMode) {
        this.TableShowMode = mode
        return this
    }

    setSearchConditions(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    setSearchVisible(state: boolean) {
        this.TableOps.SetSearchEnable(state)
        return this
    }

    setSearchKeyword(txt: string) {
        this.SearchKeyword = txt
        return this
    }

    deleteCardDataByRow(rowId: any, idKey: string) {
        if (this.CardItemList == null)
            this.CardItemList = []


        for (let i = 0; i < this.CardItemList.length; i++) {
            let id = this.CardItemList[i][idKey]
            if (id == rowId) {
                this.CardItemList.splice(i, 1)
                break
            }

        }
        return this
    }
}

export class PageSectionAiChat extends PageSection {
    public AiDefaultDataList: any[] = []
    public AiAgentData?: PageAiChatAgentData  // key: agentId, name: agentType + id
    public AllowCreateChatRoom: boolean = false // 是否新增聊天室
    public VisibleToolBar: boolean = false// 隱藏工具列
    public ChatRoomId?: string;// room id
    public ChatMessages?: any[] = []// 聊天訊息
    public ChatRoomDisabled?: boolean = false  // 沒語言模型參數就不能使用聊天室

    constructor() {
        super()
        this.SectionType = PageSectionType.AI_CHAT
    }

    setDefaultDataList(data: any[]) {
        this.AiDefaultDataList = data
        return this
    }

    setAiAgentData(data: PageAiChatAgentData) {
        this.AiAgentData = data
        return this
    }

    setAllowCreateChatRoom(allow: boolean) {
        this.AllowCreateChatRoom = allow
        return this
    }

    setVisibleToolbar(status: boolean) {
        this.VisibleToolBar = status
        return this
    }

    setChatRoomId(chatRoomId: string) {
        this.ChatRoomId = chatRoomId
        return this
    }
    setChatMessages(chatMessages: Array<any>) {
        this.ChatMessages = chatMessages
        return this
    }
    setChatRoomDisabled(status: boolean) {
        this.ChatRoomDisabled = status
        return this
    }

}

export class PageSectionSlider extends PageSection {
    public sliderProps?: PageSliderProps

    constructor() {
        super()
        this.SectionType = PageSectionType.SLIDER
    }

    setSliderProps(props: PageSliderProps) {
        this.sliderProps = props
        return this
    }
}

export class PageSectionAttributePanel extends PageSection {
    public attributePanelProps?: PageAttributePanelProps

    constructor() {
        super()
        this.SectionType = PageSectionType.ATTRIBUTE_PANEL
    }

    setAttributePanelProps(props: PageAttributePanelProps) {
        this.attributePanelProps = props
        return this
    }
}

// TODO-DELELE: 測試用，之後會改成AI_CHAT
export class PageSectionAIChatNew extends PageSection {
    public AiDefaultDataList: any[] = []
    public AiAgentData?: PageAiChatAgentData  // key: agentId, name: agentType + id
    public AllowCreateChatRoom: boolean = false // 是否新增聊天室
    public VisibleToolBar: boolean = false// 隱藏工具列
    public ChatRoomId?: string;// room id
    public ChatMessages?: any[] = []// 聊天訊息
    public ChatRoomDisabled?: boolean = false  // 沒語言模型參數就不能使用聊天室

    public ChatRoomDisabledMessage?: string;
    public DepsType?: PageAIChatDepsType = null // 聊天室所有功能type
    public ShowSendMessage?: boolean = true; // 顯示傳送訊息筐
    public speechServiceResult?: any
    constructor() {
        super()
        this.SectionType = PageSectionType.AI_CHAT_NEW
    }

    setDefaultDataList(data: any[]) {
        this.AiDefaultDataList = data
        return this
    }

    setAiAgentData(data: PageAiChatAgentData) {
        this.AiAgentData = data
        return this
    }

    setAllowCreateChatRoom(allow: boolean) {
        this.AllowCreateChatRoom = allow
        return this
    }

    setVisibleToolbar(status: boolean) {
        this.VisibleToolBar = status
        return this
    }

    setChatRoomId(chatRoomId: string) {
        this.ChatRoomId = chatRoomId
        return this
    }
    setChatMessages(chatMessages: Array<any>) {
        this.ChatMessages = chatMessages
        return this
    }
    setChatRoomDisabled(status: boolean) {
        this.ChatRoomDisabled = status
        return this
    }

    setDepsType(depsType: PageAIChatDepsType) {
        this.DepsType = depsType
        return this
    }
    setChatRoomDisabledMessage(msg: string) {
        this.ChatRoomDisabledMessage = msg
        return this
    }
    setShowSendMessage(isShow?: boolean){
        this.ShowSendMessage = isShow
        return this
    }
    setSpeechServiceResult(speechServiceResult?: any){
        this.speechServiceResult = speechServiceResult
        return this
    }
}

export class PageSectionKeyValue extends PageSection {
    constructor() {
        super();
        this.SectionType = PageSectionType.KeyValue;
        this.FormOps = new FormOption();

    }
    setItems(items: Array<PageFormItem>) {
        this.FormOps.FormItems = items;
        return this;
    }

    setActions(acs?: Array<PageAction>) {
        if (acs == null || acs.length == 0) {
            acs = [
                new PageAction({ Type: PageTableActionEnum.TableOk, Text: "確定", Icon: "pi pi-check", Id: "ok" })
                    .setBtnStyle(true, false, PageItemSeverityStyle.NONE),
                new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "取消", Icon: "pi pi-times", Id: "cancel" })
                    .setBtnStyle(false, true, PageItemSeverityStyle.DANGER)
            ];
        }
        this.FormOps.CustomAction = acs;
        return this;
    }

    setCustomSection(sec: PageSectionCustom) {
        this.customSection = sec;
        return this;
    }
}

export class PageSectionTabList extends PageSection {
    constructor() {
        super();
    }
}

export class PageSectionCardSelect extends PageSection {
    public cardSelectProps?: PageCardSelectProps
    constructor() {
        super();
        this.SectionType = PageSectionType.CARDSELECT;
    }
    setCardSelectProps(props: PageCardSelectProps) {
        this.cardSelectProps = props;
        return this;
    }
}

export class PageSectionVersion extends PageSection {
    public versionProps?: PageVersionProps
    constructor() {
        super();
        this.SectionType = PageSectionType.VERSION;
    }
    setVersionProps(props: PageVersionProps) {
        this.versionProps = props;
        return this;
    }
}