export class PageTreeItem {

    Pkid: string;
    Label?: string;
    Data?: any;
    Type?: string;
    Icon?: string;
    Children?: Array<PageTreeItem>;
    Selectable?: Boolean = true;
    preNodeValueByHtml?: Function;
    postNodeValueByHtml?: Function;
    IsRequest?: Boolean = false;

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
    setChildrens(childs: Array<PageTreeItem>) {
        this.Children = childs;
        return this;
    }
    addChildren(item: PageTreeItem) {
        if (this.Children == undefined || this.Children == null)
            this.Children = [];

        this.Children.push(item);

        return this;
    }
    setPreNodeValueunction(callback: Function) {
        this.preNodeValueByHtml = callback;
        return this;
    }
    setPostNodeValueFunction(callback: Function) {
        this.postNodeValueByHtml = callback;
        return this;
    }
}