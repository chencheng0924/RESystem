import { ListItem } from "./ListItem";

export class GroupComboItem {
    constructor(init?) {
        Object.assign(this, init);
    }

    public ItemName?: string
    public ItemValue?: Array<ListItem> = []
}