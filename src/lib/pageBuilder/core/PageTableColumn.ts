import { STDataTablePageParams } from "@/components/smartcityui/STTable.model";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItem } from "../enum/PageFormItemEnum";
import { PageAction } from "./PageAction";
import { PageFormItem } from "./PageFormItem";

export enum PageTableColumnActionEnum {
    rowResetPassword = "rowResetPassword",
    rowView = "rowView",
    rowedit = "rowedit",
    rowdelete = "rowdelete",
    rowEditRestraint = "rowEditRestraint"
}

export class PageTableColumn {
    constructor(init?) {
        Object.assign(this, init);
    }

    public Field?: string
    public Title?: string
    public Sortable?: boolean = true;
    public Hidden?: boolean = false;
    public Template?: string
    public Width?: string
    public Type?: PageItem = PageItem.InputText
    public HasFilter?: boolean = false;
    public Actions?: Array<PageAction> = [];
    public CanEdit?: Boolean = true;
    public CellValue?: Function = null; // (col , rowObject )=>{}
    public IsCellHtml?: boolean = false;
    public CellValueByHtml?: Function = null;
    public IsRequest?: boolean = false;
    public IsImage?: boolean = false;
    public IsFormItem?: boolean = false;

    public Mask?: string = ''
    public Placeholder?: string = '';
    public minDateByToDay?: boolean = false;
    public Verification?: Function;
    public Url?: string = '';
    public FilterIndex?: number;
    public IsInfoSearch?: boolean = true
    public DateType?: string = 'DateTime'

    public value?: any
    public SliderMax?: number = 100;
    public SliderMin?: number = 0;
    public SliderStep: number = 1;
    public MinFractionDigits?: number = 0;
    public MaxFractionDigits?: number = 2;
    public IsDisabled?: boolean = false;
    public RemoteAjaxMode?: boolean = false;//是否要動態搜尋清單
    public TruncateNum?: number = 150;// 文字

    public showFilterCondition: any = {
        tableColumn: true,
        tableFilter: true,
        form: true,
    }
    public addConditionShow?: boolean = true; // 是否顯示新增條件

    // add
    // edit
    // condition 
    // display


    public DefaultActions: Array<PageAction> = [
        new PageAction({ Type: PageTableActionEnum.TableRowResetPassword, Text: "Components.STTable.ResetPassword", Icon: "pi pi-wrench", Id: "rowResetPassword" }),
        new PageAction({ Type: PageTableActionEnum.TableRowView, Text: "Components.STTable.View", Icon: "pi pi-external-link", Id: "rowView" }),
        new PageAction({ Type: PageTableActionEnum.TableRowEdit, Text: "Components.STTable.Edit", Icon: "pi pi-pencil", Id: "rowedit" }),
        new PageAction({ Type: PageTableActionEnum.TableRowEditRestraint, Text: "Components.STTable.Edit", Icon: "pi pi-user", Id: "rowEditRestraint" }),
        new PageAction({ Type: PageTableActionEnum.TableRowDelete, Text: "Components.STTable.Delete", Icon: "pi pi-trash", Id: "rowdelete" }),
    ]

    public toPageFormItem(path?: string, value?: any) {
        if (this.Hidden)
            return null;

        let self = this;
        return new PageFormItem({
            Field: self.Field,
            Id: `${path}_${self.Field}`,
            Name: self.Title,
            Type: self.Type,
            Value: value,
            HasFilter: self.HasFilter,
            CanEdit: self.CanEdit,
            IsRequest: self.IsRequest,
            Mask: self.Mask,
            Placeholder: self.Placeholder,
            Verification: self.Verification,
            Url: self.Url,
            IsInfoSearch: self.IsInfoSearch,
            DateType: self.DateType,
            SliderMax: self.SliderMax,
            SliderMin: self.SliderMin,
            SliderStep: self.SliderStep,
            IsDisabled: self.IsDisabled,
            MinFractionDigits: self.MinFractionDigits,
            MaxFractionDigits: self.MaxFractionDigits,
            RemoteAjaxMode: self.RemoteAjaxMode,
            showFilterCondition: self.showFilterCondition,
            addConditionShow: self.addConditionShow,
        });
    }
    setType(type: PageItem) {
        this.Type = type;
        return this;
    }
    setTypeToggleSwitch() {
        return this.setType(PageItem.ToggleSwitch);
    }
    setTypeSelect(remoteAjaxMode: boolean = false) {
        this.RemoteAjaxMode = remoteAjaxMode;
        return this.setType(PageItem.Select);
    }
    setTypeMultiSelect(remoteAjaxMode: boolean = false) {
        this.RemoteAjaxMode = remoteAjaxMode;
        return this.setType(PageItem.MultiSelect);
    }
    setTypeInputText() {
        return this.setType(PageItem.InputText);
    }
    setTypeDatePicker() {
        return this.setType(PageItem.DatePicker);
    }
    setTypeAutoComplete() {
        return this.setType(PageItem.AutoComplete);
    }
    setTypeInputNumber() {
        return this.setType(PageItem.InputNumber);
    }
    setTypeRadioButton() {
        return this.setType(PageItem.RadioButton);
    }
    setTypeTextarea() {
        return this.setType(PageItem.Textarea);
    }
    setTypeMarkDown() {
        return this.setType(PageItem.MarkDown);
    }
    setTypeMarkDownEditor() {
        return this.setType(PageItem.MarkdownEditor);
    }
    setTypePassword() {
        return this.setType(PageItem.Password);
    }
    setTypeSilder() {
        return this.setType(PageItem.Slider);
    }
    setTypeListSelect() {
        return this.setType(PageItem.ListSelect);
    }


    setTypeMask(mask: string, text: string) {
        this.Mask = mask;
        this.Placeholder = text;
        return this.setType(PageItem.InputMask);
    }
    setMinDateByDay(mindate: boolean) {
        this.minDateByToDay = mindate;
        return this;
    }

    setFilter(filter: boolean) {
        this.HasFilter = filter;
        return this;
    }
    setFilterTrue() {
        return this.setFilter(true);
    }
    setActionByFilter(acIds: Array<string>) {
        this.Actions = this.DefaultActions.filter(x => acIds.includes(x.Id));
        return this;
    }
    setAction(acs?: Array<PageAction>) {
        if (acs == null || acs.length == 0) {
            acs = this.DefaultActions;
        }

        this.Actions = acs;
        return this;
    }
    setActionFiles() {

        this.Actions = [
            //new PageAction({ Type: PageTableActionEnum.TableRowFileOpen, Text: "查看", Icon: "pi pi-file", Id: "rowOpenFile" }),
            new PageAction({ Type: PageTableActionEnum.TableRowDownload, Text: "下載", Icon: "pi pi-download", Id: "rowDownloadFile" }),
            new PageAction({ Type: PageTableActionEnum.TableRowDelete, Text: "刪除", Icon: "pi pi-trash", Id: "rowdelete" })]
        return this;
    }
    setEdit(edit: boolean) {
        this.CanEdit = edit;
        return this;
    }

    setCellValue(callback) {
        this.CellValue = callback;
        return this;
    }
    setCellValueHtml(callback) {
        this.IsCellHtml = true;
        this.CellValueByHtml = callback;
        return this;
    }
    setRequest(request: boolean) {
        this.IsRequest = request;
        return this;
    }
    setVerification(verification: Function) {
        this.Verification = verification;
        return this;
    }

    setImage(isImage: boolean) {
        this.IsImage = isImage;
        return this;
    }
    setIsFormItem(isFormItem: boolean) {
        this.IsFormItem = isFormItem;
        return this;
    }

    setShowFilterCondition(condition: any) {
        Object.keys(condition).forEach(key => {
            if (this.showFilterCondition.hasOwnProperty(key)) {
                this.showFilterCondition[key] = condition[key];
            }
        });
        return this
    }

    setAddConditionShow(condition: boolean) {
        this.addConditionShow = condition;
        return this;
    }

    setIsInfoSearch(isInfoSearch: boolean) {
        this.IsInfoSearch = isInfoSearch;
        return this;
    }

    setDateType(DateType: string) {
        this.DateType = DateType
        return this
    }

    setNumberMaxMin(max: number, min: number, step: number) {
        this.SliderMax = max;
        this.SliderMin = min;
        this.SliderStep = step;
        return this;
    }

    setIsDisabled(isDisabled: boolean) {
        this.IsDisabled = isDisabled;
        return this;
    }
    setTruncateNum(wordLength: number) {
        this.TruncateNum = wordLength;
        return this;
    }
}

export enum PageTableViewLayout {
    TABLE = 'table',
    CARD = 'card'
}

export enum PageTableShowMode {
    SCROllABLE = 'scrollable',
    PAGINATOR = 'paginator'
}

export class PageTablePageParams {
    PageIndex?: number;
    PageRows?: number;
    First?: number;
    TotalRows?: number

    constructor(init?: Partial<PageTablePageParams>) {
        Object.assign(this, init);
    }

    setPageIndex(pageIndex: number) {
        this.PageIndex = pageIndex;
        return this;
    }
    setPageRows(pageRows: number) {
        this.PageRows = pageRows;
        return this;
    }
    setTotalRows(totalRows: number) {
        this.TotalRows = totalRows;
        return this;
    }
    setFirst(first: number) {
        this.First = first;
        return this;
    }
    resetPageParam() {
        this.PageIndex = 1
        this.First = 0
        return this
    }

    toSTDataTablePageParams() {
        let self = this

        return new STDataTablePageParams({
            pageIndex: self.PageIndex,
            pageRows: self.PageRows,
            totalRows: self.TotalRows,
            first: self.First
        })
    }
}
