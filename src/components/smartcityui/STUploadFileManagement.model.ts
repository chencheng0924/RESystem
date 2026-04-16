import { MenuItem } from "primevue/menuitem";
import { STAction, STComponentItem, STTreeItem } from "./STCommon.model";
import { TreeNode } from "primevue/treenode";
import { STDataTableAction, STDataTableColumn } from "./STTable.model";
import { STTreeAction } from "./STTree.model";
import { STFormItemType } from "./STForm.model";

export class STUploadFileManagementProps {

    edit?: boolean = true;
    item?: STUploadFileItem;
    folderStyle?: string;
    treeItems?: Array<STTreeItem> = [];
    treeActions?: Array<STUploadFileManagementAction> = [];

    data?: Array<any> = [];
    columns?: Array<STDataTableColumn> = [];
    actions?: Array<STDataTableAction> = [];
    selectionKeys: any;
    contextActions?: Array<STTreeAction> = [];

    constructor(init?: Partial<STUploadFileManagementProps>) {
        Object.assign(this, init);
    }

    setUploadItem(item: STUploadFileItem) {
        this.item = item;
    }
    setTreeItems(items: Array<any>) {
        this.treeItems = items;
    }
    setTreeActions(items: Array<any>) {
        this.treeActions = items;
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
    setSelectionKeys(sels: any) {
        this.selectionKeys = sels;
        return this;
    }
    setContextActions(items: Array<any>) {
        this.contextActions = items;
    }
    setEdit(edit: boolean) {
        this.edit = edit;
        return this;
    }
}


export class STUploadFileManagementEvent {
    constructor(init?: Partial<STUploadFileManagementEvent>) {
        Object.assign(this, init);
    }
    eventUploadAfter?: Function;
    eventBeforeUpload?: Function;

    eventRemove?: Function;
    eventRemoveUploadedFile?: Function;
    eventTreeToolActionBtn?: Function;
    eventNodeSelect?: Function;

    eventActionBtn?: Function;
    eventActionBtnByRow?: Function;
    eventUploader?: Function;
    eventBeforSend?: Function;

}


export class STUploadFileItem extends STComponentItem {

    constructor(init?) {
        super(init);
    }
    setMaxSize() {
        this.Maxlength = 10485760;
        return this;
    }

}

export class STUploadFileManagementAction extends STAction {

    constructor(init?) {
        super(init);

    }
}

