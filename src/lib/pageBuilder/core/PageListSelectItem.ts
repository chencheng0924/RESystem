import { BaseKeyValue } from "../model/BaseKeyValue";

export class PageListSelectItem {

    NameKeyValue?: BaseKeyValue;
    EditorKeyValue?: BaseKeyValue;
    IsAvatar?: boolean = true
    IsShowListButton?: boolean = true;

    constructor(init?) {
        Object.assign(this, init);
    }
}