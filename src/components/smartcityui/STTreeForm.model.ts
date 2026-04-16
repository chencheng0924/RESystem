import { STTreeItem } from "./STCommon.model";
import { STFormItem } from "./STForm.model";
import { STTreeAction, TreeMode } from "./STTree.model";

export class STTreeFromProps {

    folderStyle?: string;
    treeItems?: Array<STTreeItem> = [];
    treeActions?: Array<STTreeAction> = [];
    selectionKeys: any;
    contextActions?: Array<STTreeAction> = [];
    selectionTreeMode?:TreeMode = 'single'
    items?: Array<STFormItem> = [];   
    constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
    setSelectTreeItems(items:any){
        this.selectionKeys = items
        return this;
    }
    setFormItems(items: Array<any>) {
        this.items = items;
        return this;
    }
    setTreeItems(items: Array<any>) {
        this.treeItems = items;
        return this;
    }
    setTreeActions(items: Array<any>) {
        this.treeActions = items;
        return this;
    }
    setContextActions(items: Array<any>) {
        this.contextActions = items;
        return this;
    }
    setSelectionKeys(sels: any) {
        this.selectionKeys = sels;
        return this;
    }
    setSelectionTreeMode(items:TreeMode){
        this.selectionTreeMode = items
        return this;
    }
}