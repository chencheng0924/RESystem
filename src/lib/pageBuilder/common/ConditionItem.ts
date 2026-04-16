import { ListItem } from "./ListItem";
import { PageItem } from "../enum/PageFormItemEnum";

export class ConditionItem {
    constructor(init?) {
        Object.assign(this, init);
    }

    public Name?: string
    public Type?: PageItem = PageItem.InputText //:select,input,date,mulitSelect
    public Id?: string
    public ElementID?: string
    public Disable?: boolean = false
    public Hide?: boolean = false
    public SelectAjax?: string
    public Islike?: boolean = false
    public Value?: string
    public Category?: string
    public Items?: Array<ListItem> = [];
}