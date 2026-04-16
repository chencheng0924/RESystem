import { DateExtension } from "@/utils/dateExtension";
import { PageItem } from "../enum/PageFormItemEnum";
import { ILayout } from "../interface/ILayout";
import { BaseKeyValue } from "../model/BaseKeyValue";
import { PageFileItem } from "./PageFileItem";

export enum EnumSelectType {
    NONE = "",
    DROPDOWN = "dropdown",
    COMBOX = "combox",
    AUTOCOMPLETE = "autocomplete",
}

export class SelectOption {
    GroupListKey?: string; // 从GroupComboItem找
    List?: string; // 直接给 listData
    Ajax?: string; // url 
    IsFilter?: boolean = true; // contains
    DataTextField?: string = "Text"; // key
    DataValueField?: string = "Value"; // value
    SelectType?: EnumSelectType = EnumSelectType.NONE; // D; dropdown ,C:combox , A:autocomplete
    IsChangeEvent?: boolean = false;
    ActionID?: string;
    FormActionID?: string;

    constructor(init?) {
        Object.assign(this, init);
    }

}

export class DateOption {
    DatePickerFormat?: string = "yyyy/MM/dd";
    DateFormat?: string = "YYYY/MM/DD"

    constructor(init?) {
        Object.assign(this, init);
    }

}

export class PageFormItem implements ILayout {
    Field?: string;
    Id?: string = "";
    Name?: string = "";
    Type?: PageItem = PageItem.InputText; // input ,select 
    IsRequest?: boolean = false;
    IsDisabled?: boolean = false;
    IsHidden?: boolean = false
    Value?: any; // 值
    Icon?: string;
    Seq?: number = 0; // 值
    SelectOps?: SelectOption;
    DateOps?: DateOption;
    IsDisplayDiv: boolean = false;
    AlwaysEnable?: boolean = false;
    BtnLabel?: string = '';


    ErrorText?: string;
    Maxlength?: number;
    Placeholder?: string;
    HasFilter?: boolean = false;
    List?: Array<any> | Function;
    ListAjax?: Function;
    OptionLabel?: string
    OptionValue?: string

    // form的layout排列
    RowIndex?: number = 0;
    ColIndex?: number = 0;
    FilterPlaceholder?: string = '';
    CanEdit?: Boolean = true;

    Url?: string // 上傳網址
    UploadMultiple?: boolean = false;
    UploadCallBack?: Function;
    UploadOnce?: boolean = false; // 是否上傳一次後就 disabled
    UploadFiles?: Array<PageFileItem> = []

    UrlID?: string
    Mask?: string = '';
    MinDate?: Date;
    MaxDate?: Date;
    Verification?: Function;
    IsDisplay?: boolean = false;
    IsFullWidth?: boolean = false

    // IsInfoSearch?: boolean
    DateType?: string

    Button?: any;
    SelectionMode?: string; // "single" | "multiple" | "range"

    SliderMax?: number = 100;
    SliderMin?: number = 0;
    SliderStep?: number = 1;
    SliderRange?: boolean = false;

    MinFractionDigits?: number = 0;
    MaxFractionDigits?: number = 2;

    ClassName?: string = '';
    MarkdownHeight?: string = '500px'
    ComponentType?: any = null;
    AcceptFileType?: string = 'image/*'
    RemoteAjaxMode?: boolean = false;//是否要動態搜尋清單
    FilterWord?: string = ''//RemoteAjaxMode=true 時 , 會傳入的搜尋文字
    InsertText?: string = ''; // markdown 插入文字

    showFilterCondition: any = {
        tableColumn: true,
        tableFilter: true,
        form: true,
    }
    addConditionShow?: boolean = true; // 是否顯示新增條件

    beforeMessage: any = {
        severity: 'info',
        text: ''
    }

    Time?: string = '';
    Tag?: string = '';

    constructor(init?) {
        Object.assign(this, init);

        if (this.Type === PageItem.DatePicker) {
            this.DateOps = new DateOption();
        } else if (this.Type === PageItem.Select || this.Type === PageItem.MultiSelect) {
            this.SelectOps = new SelectOption();
        }
    }
    isEmpty() {
        if (this.Value == undefined || this.Value == null || this.Value == "")
            return true;

        if (this.Type == PageItem.Select) {
            if ((this.Value as BaseKeyValue).key == "")
                return true;

        }
        return false;
    }
    setId(id: string) {
        this.Id = id;
        return this;
    }
    setIdByPath(path: string) {
        this.Id = `${path}_${this.Field}`;
        return this;
    }

    SetOrder(seq: number): PageFormItem {
        this.Seq = seq;
        return this;
    }

    SetDisable(isdisable: boolean): PageFormItem {
        this.IsDisabled = isdisable;
        return this;
    }
    // 永遠開啟
    SetAlwaysEnable(alwaysEnable: boolean): PageFormItem {
        this.AlwaysEnable = alwaysEnable;
        return this;
    }


    SetRowIndex(index: number): PageFormItem {
        this.RowIndex = index;
        return this;
    }
    setList(list: Array<any>) {
        this.List = list;
        return this;
    }
    setListFunction(callback: Function) {
        this.ListAjax = callback;
        return this;
    }
    setOptionLabel(lable: string) {
        this.OptionLabel = lable;
        return this;
    }
    setOptionValue(value: string) {
        this.OptionValue = value;
        return this;
    }
    setRequest(req: boolean) {
        this.IsRequest = req;
        return this;
    }
    setMask(mask: string) {
        this.Mask = mask;
        return this;
    }
    setMinDateByToDay() {
        if (this.Type != PageItem.DatePicker)
            return this;

        let dateNowMin = new Date(Date.now());
        dateNowMin.setDate(dateNowMin.getDate());
        this.MinDate = dateNowMin;
    }

    setDateValueFormate() {
        if (this.Type == PageItem.Select && (!!this.Value) == true) {
            this.Value = new BaseKeyValue(this.Value);
            return this;
        }
        if (this.Type != PageItem.DatePicker)
            return this;
        if (!!this.Value == false)
            return this;

        this.Value = DateExtension.getDateFormat(this.Value, 'YYYY-MM-DD');
        return this;
    }

    setVerification(verification: Function) {
        this.Verification = verification;
        return this;
    }
    setIsDisplay(display: boolean) {
        this.IsDisplay = display;
        return this;
    }
    setHidden(hidden: boolean) {
        this.IsHidden = hidden;
        return this;
    }


    static setRequest(items: Array<PageFormItem>, field: string) {
        let activity = items.find(x => x.Field == field);
        if (activity != null) {
            activity.setRequest(true);
        }
    }
    static setOptionLabel(items: Array<PageFormItem>, field: string, key: string) {
        let activity = items.find(x => x.Field == field);
        if (activity != null) {
            activity.setOptionLabel(key);
        }
    }

    convertObject() {
        let obj = {};
        for (let key in this) {
            let v = this[key];
            let keyTemp = key.replace(/^./, key[0]);
            obj[keyTemp] = v;
        }

        return obj;
    }

    SetValue(value: any): PageFormItem {
        this.Value = value;
        return this;
    }
    setSelectionMode(type) {
        this.SelectionMode = type
        return this
    }

    SetClassName(className: string): PageFormItem {
        this.ClassName = className
        return this
    }

    SetMarkdownHeight(height: string): PageFormItem {
        this.MarkdownHeight = height
        return this
    }
    setNumberMaxMin(max: number, min: number, step: number) {
        this.SliderMax = max;
        this.SliderMin = min;
        this.SliderStep = step;
        return this;
    }
    setInsertText(text: string) {
        this.InsertText = text;
        return this;
    }
    setBeforeMessage(message: any) {
        this.beforeMessage = message;
        return this;
    }
}

