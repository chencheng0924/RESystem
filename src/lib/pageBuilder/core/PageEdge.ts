export class PageEdge {
    Id?: string;
    NodeFromId?: string;
    NodeToId?: string;
    Label?: string;//名稱
    LabelKey?: string;//名稱

    constructor(init?) {
        Object.assign(this, init);
    }
}