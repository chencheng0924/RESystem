import { STComponentItem } from "./STCommon.model";



export class STKeyValueItem {

    constructor(init?: Partial<STKeyValueItem>) {
        Object.assign(this, init);
    }

}

export class STKeyValueEvent {
    constructor(init?: Partial<STKeyValueEvent>) {
        Object.assign(this, init);
    }
    addItem?: Function;
    deleteItem?: Function;

}