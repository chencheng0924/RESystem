import { PageTableColumn } from "../core/PageTableColumn";
import { PageTreeItem } from "../core/PageTreeItem";
import { ITableColumnDefinition } from "../interface/ITableColumnDefinition";
import { ITreeItem } from "../interface/ITrreItem";

export class BaseEntity {

    constructor() { }

    toPageTableColumns(acIDFilters?: Array<string>) {
        let nameKey = "Title_"
        let cols: Array<PageTableColumn> = [];
        for (let key in this) {
            if (key.indexOf(nameKey) == -1)
                continue;

            let colField = key.replace(nameKey, "");
            let colTitle = this[key];

            let tempCol = new PageTableColumn({ Field: colField, Title: colTitle });
            cols.push(tempCol)
        }
        if (acIDFilters != null && acIDFilters.length > 0) {
            let acCol = new PageTableColumn({ Field: "Action", Title: "Components.STTable.Action" }).setActionByFilter(acIDFilters).setEdit(false);
            cols.push(acCol)
        }
        return cols;
    }

    CustomizedPageTableColumns(acIDFilters?: Array<any>){
        let nameKey = "Title_"
        let cols: Array<PageTableColumn> = [];
        for (let key in this) {
            if (key.indexOf(nameKey) == -1)
                continue;

            let colField = key.replace(nameKey, "");
            let colTitle = this[key];

            let tempCol = new PageTableColumn({ Field: colField, Title: colTitle });
            cols.push(tempCol)
        }
        if (acIDFilters != null && acIDFilters.length > 0) {
            let acCol = new PageTableColumn({ Field: "Action", Title: "Components.STTable.Action" }).setActionByFilter(acIDFilters).setEdit(false).setAction(acIDFilters);
            cols.push(acCol)
        }
        return cols;
    }

    public toPageTreeItem(item: ITreeItem) {
        let pageTreeItem = new PageTreeItem({
            Pkid: item.labelId,
            Label: item.topic,
            Data: item
        });

        return pageTreeItem;
    }

    public toTree(datas?: Array<ITreeItem>): Array<PageTreeItem> {
        if (datas == null || datas.length == 0)
            return [];
        datas = datas.orderBy(x => x.sequence);

        let roots = datas.filter(x => (x.parentLabelId == null || x.parentLabelId == ""));
        if (roots.length == 0)
            return [];

        let trees = [];
        for (let i = 0; i < roots.length; i++) {
            let root = roots[i];
            let rootTreeItem = new PageTreeItem({
                Pkid: root.labelId,
                Label: root.topic,
                Data: root
            });

            this.toTreeRecursion(datas, rootTreeItem);


            trees.push(rootTreeItem);
        }

        return trees;
    }
    private toTreeRecursion(datas?: Array<ITreeItem>, targetTreeItem?: PageTreeItem) {
        let childs = datas.filter(x => x.parentLabelId == targetTreeItem.Pkid);
        if (childs.length == 0)
            return;

        for (let i = 0; i < childs.length; i++) {
            let one = childs[i];
            let chTreeItem = new PageTreeItem({
                Pkid: one.labelId,
                Label: one.topic,
                Data: one
            });
            this.toTreeRecursion(datas, chTreeItem);
            targetTreeItem.addChildren(chTreeItem);
        }
    }

    public hasTableColumnDefinition(object: any = this): object is ITableColumnDefinition {
        return 'getTableColumn' in this;
    }
    //------------------------------------------------------------
    //   static function
    //------------------------------------------------------------
    static toStartCharLowerCase(inputObject: any) {
        let obj = {};
        for (let key in inputObject) {
            let v = inputObject[key];
            let keyTemp = key.replace(/^./, key[0].toLowerCase());
            obj[keyTemp] = v;
        }

        return obj;
    }
    static toStartCharUpperCase(inputObject: any) {
        let obj = {};
        for (let key in inputObject) {
            let v = inputObject[key];
            let keyTemp = key.replace(/^./, key[0].toUpperCase());
            obj[keyTemp] = v;
        }

        return obj;
    }
}