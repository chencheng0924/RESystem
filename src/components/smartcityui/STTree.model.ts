import { MenuItem } from "primevue/menuitem";
import { STAction, STComponentItem, STTreeItem } from "./STCommon.model";
import { TreeNode } from "primevue/treenode";
import { STDataTableAction, STDataTableColumn } from "./STTable.model";
export type TreeMode = 'single' | 'multiple' | 'checkbox';
export class STTreeProps {

    folderStyle?: string;
    treeItems?: Array<STTreeItem> = [];
    treeActions?: Array<STTreeAction> = [];
    selectionKeys: any;
    contextActions?: Array<STTreeAction> = [];
    selectionTreeMode?:TreeMode = 'single'
    constructor(init?: Partial<STTreeProps>) {
        Object.assign(this, init);
    }

    setTreeItems(items: Array<any>) {
        this.treeItems = items;
    }
    setTreeActions(items: Array<any>) {
        this.treeActions = items;
    }
    setContextActions(items: Array<any>) {
        this.contextActions = items;
    }
    setSelectionKeys(sels: any) {
        this.selectionKeys = sels;
        return this;
    }
    setSelectionTreeMode(items:TreeMode){
        this.selectionTreeMode = items
    }
}


export class STTreeEvent {
    constructor(init?: Partial<STTreeEvent>) {
        Object.assign(this, init);
    }

    eventTreeToolActionBtn?: Function;
    eventNodeSelect?: Function;

    eventActionBtn?: Function;
    eventActionBtnByRow?: Function;

}


export class STTreeAction extends STAction {

    label?: string;
    icon?: string;
    url?: string;
    items?: Array<MenuItem>;
    constructor(init?) {
        super(init);

    }
    toMenuItem() {
        this.label = this.Text;
        this.icon = this.Icon;
        this.url = this.Url;
        return this;
    }
}

