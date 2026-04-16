import { TreeNode } from "primevue/treenode";
import { STFormItemType } from "./STForm.model";
import { UploadFile, UploadStyleType } from "@/components/smartcityui/STUpload.model";

export class STAction {
    Enable?: boolean = true;
    Url?: string;
    Type?: number = null;
    Text?: string;
    Icon?: string;
    Id: string;
    Sort?: number;
    Active?: boolean = false

    IsDownload: boolean = false; // 是否下载
    Message?: string; // 提示信息
    PopupDialog?: boolean = false;//開對話框
    BeforeConfirmDialog?: boolean = false; // 执行前提示
    Tooltip?: string;

    // style
    IsOutlined?: boolean = false;
    IsText?: boolean = false;
    SeverityColor?: string = "success"
    MenuBtns?: STAction[];
    ClassName?: string = '';
    IconPos?: IconPosition = IconPosition.RIGHT;

    class?: string = '';
    constructor(init?) {
        Object.assign(this, init);
    }

}

export class STMenuItem {
    key?: string;
    label?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
}


export class STAvatar {
    constructor(init?) {
        Object.assign(this, init);

        if (this.Label == '')
            this.Label = null;
        if (this.Icon == '')
            this.Icon = null;
        if (this.Image == '')
            this.Image = null;


    }
    Label?: string = 'U';
    Icon?: string = '';
    Image?: string = '';

    Size?: string = 'large';//"normal" | "large" | "xlarge"
    Shape?: string = 'circle';//"square" | "circle"
    BadgeNumber?: number = 0;
    IsBage?: boolean = false;

    setLable(l: string) {
        this.Label = l;
        return this;
    }
    setIcon(icon: string) {
        this.Icon = icon;
        return this;
    }

    setImage(img: string) {
        this.Image = img;
        return this;
    }


}


export class STComponentItem {
    Id?: string = "";
    Name?: string = "";
    Type?: STFormItemType; // input ,select 
    IsRequest?: boolean = false;
    IsDisabled?: boolean = false;
    Value?: any = ""; // 值
    Seq?: number = 0; // 值
    IsDisplayDiv?: boolean = false;
    Icon?: string;
    BtnLabel?: string = '';
    Btnseverity?: string = 'secondary';

    ErrorText?: string;
    Maxlength?: number;
    Placeholder?: string;
    HasFilter?: boolean = false;
    OptionLabel?: string
    OptionValue?: string
    List?: Array<any>;
    ListAjax?: Function;
    FilterPlaceholder?: string
    Url?: string // 上傳網址
    UploadMultiple?: boolean = false
    UploadAuto?: boolean = true; // 是否自動上傳
    UploadShowStatus?: boolean = true; // 是否顯示上傳狀態
    UploadStyleType?: string = UploadStyleType.ADVANCED;
    UploadCallback?: Function;
    UploadOnce?: boolean = false; // 是否上傳一次後就 disabled
    UploadFiles?: Array<UploadFile> = []

    UrlID?: string
    AcceptFileType?: string = 'image/*'

    // form的layout排列
    RowIndex?: number = 0;
    ColIndex?: number = 0;
    hasLabel?: boolean = true;
    InputType?: string = "text";
    Img?: string = "";
    toggleOnImg?: string = "";
    toggleOffImg?: string = "";
    toggle?: boolean = false;
    RefreshImg?: string = "";
    VerifyImg?: string = "";
    CloseImg?: string = "";
    buttonLabel?: string = "";
    IsDisplay?: boolean = false;
    IsInfoSearch?: boolean = true
    DateType?: string

    SliderMax?: number = 100;
    SliderMin?: number = 0;
    SliderStep?: number = 1;
    SliderRange?: boolean = false;

    MinFractionDigits?: number = 0;  // InputNumber 手動輸入的小數位數
    MaxFractionDigits?: number = 2;  // InputNumber 手動輸入的小數位數

    ClassName?: string = '';
    MarkdownHeight?: string = '500px'
    ComponentType?: any = null;// 用在 PageSection
    RemoteAjaxMode?: boolean = false;//是否要動態搜尋清單
    InsertText?: string = ''; // markdown 插入文字
    showFilterCondition?: any = {
        tableColumn: true,
        tableFilter: true,
        form: true,
    }
    beforeMessage: any = {
        severity: 'info',
        text: null
    }

    Time?: string = '';
    Tag?: string = '';
    
    constructor(init?) {
        Object.assign(this, init);
    }

}


export class STTreeItem {

    Pkid: string;
    Label?: string;
    Data?: any;
    Type?: string;
    Icon?: string;
    Children?: Array<STTreeItem>;
    Selectable?: Boolean = true;


    constructor(init?) {
        Object.assign(this, init);
    }

    setFolderIconClose() {
        this.Icon = 'pi pi-folder';
        return this;


    }
    setFolderIconOpen() {
        this.Icon = 'pi pi-folder-open';
        return this;

    }
    setChildrens(childs: Array<STTreeItem>) {
        this.Children = childs;
        return this;
    }
    addChildren(item: STTreeItem) {
        if (this.Children == undefined || this.Children == null)
            this.Children = [];

        this.Children.push(item);

        return this;
    }

    toSTTreeItem(node: TreeNode) {

        this.Pkid = node.key;
        this.Label = node.label;
        this.Data = node.data;
        this.Type = node.type;
        this.Icon = node.icon;
        this.Selectable = node.selectable;

        return this;
    }

    toPrimeVueTreeNode() {
        let root = {
            key: this.Pkid,
            label: this.Label,
            data: this.Data,
            type: this.Type,
            icon: this.Icon,
            selectable: this.Selectable
        } as TreeNode;

        root = this.toPrimeVueTreeNodeRecursion(this, root);

        return root;
    }
    toPrimeVueTreeNodeRecursion(item: STTreeItem, targetItem: TreeNode) {
        if (item.Children == undefined || item.Children == null)
            return targetItem;

        let chs: Array<TreeNode> = [];
        for (let i = 0; i < item.Children.length; i++) {
            let itemTemp = item.Children[i];
            let chTemp = {
                key: itemTemp.Pkid,
                label: itemTemp.Label,
                data: itemTemp.Data,
                type: itemTemp.Type,
                icon: itemTemp.Icon,
                selectable: itemTemp.Selectable
            } as TreeNode;
            chTemp = this.toPrimeVueTreeNodeRecursion(itemTemp, chTemp);

            chs.push(chTemp);
        }
        targetItem['children'] = chs;
        return targetItem;
    }

}

export enum STPosition {
    CENTER = 'center',
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    TOPLEFT = 'top-left',
    TOPCENTER = 'top-center',
    TOPRIGHT = 'top-right',
    BOTTOMLEFT = 'bottom-left',
    BOTTOMCENTER = 'bottom-center',
    BOTTOMRIGHT = 'bottom-right',
    FULL = 'full'
}



export enum ActionEnum {
    TableRowEdit,
    TableRowDelete,
    TableRowAdd,
    TableDeletes,// 批次删
    TableClone,
    TableOk,
    TableCancel,
    TableRowView,
    TableRowDownload,
    TableRowFileOpen,
    TableImport,
    TableExport,
    TableDownload,

    PageLink,//
    PageAction,//

    TreeNodeAction,
    SignOut,
    SignIn,
    TableRowEnable,
    TableRowScore,
    TableCustom,
    TableRowResetPassword,

}

export class STItem {
    text?: string;
    value?: string;
    unit?: string;
    info?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
}

export enum IconPosition {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom'
}