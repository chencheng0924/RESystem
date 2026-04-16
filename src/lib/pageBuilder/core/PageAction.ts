import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { PageTag } from "./PageTag";

export class PageActionWFOption {
    IsSelectNextUser?: boolean = false;
    roles?: string;//逗號分隔

    constructor(init?) {
        Object.assign(this, init);
    }
}

export class PageAction {
    Enable?: boolean = true;
    Url?: string;
    Type?: PageTableActionEnum = null;
    Text?: string;
    Icon?: string;
    Id: string;
    Sort?: number;
    Active?: boolean = false

    IsDownload: boolean = false; // 是否下载
    Message?: string; // 提示信息
    MenuBtns?: PageAction[];
    Tag?: PageTag = new PageTag();
    Tooltip?: string;
    IsSubTable: boolean = false;
    resFormAction: boolean = false; // 是否需要重置formAction

    // style
    IsOutlined?: boolean = true;
    IsText?: boolean = false;
    SeverityColor?: PageItemSeverityStyle = PageItemSeverityStyle.NONE; //danger
    BackgroundColor?: string; // 自訂背景色
    TextColor?: string; // 自訂文字顏色

    class?: string = '';
    constructor(init?) {
        Object.assign(this, init);
    }
    setBtnStyle(outlined: boolean, text: boolean, SeverityColor: PageItemSeverityStyle) {
        this.IsOutlined = outlined;
        this.IsText = text;
        this.SeverityColor = SeverityColor;
        return this;
    }
    setActive(active: boolean) {
        this.Active = active;
        return this;
    }
    setTag(tag: PageTag) {
        this.Tag = tag;
        return this;
    }
    setToolTip(tip: string) {
        this.Tooltip = tip;
        return this;
    }
    setClass(style: string) {
        this.class = style;
        return this;
    }

    setBackgroundColor(color: string) {
        this.BackgroundColor = color;
        return this;
    }

    setTextColor(color: string) {
        this.TextColor = color;
        return this;
    }

    setSubActions(acs: Array<PageAction>) {
        this.MenuBtns = acs;
        return this;
    }
}

