import { PageItemCommon } from "./PageItemCommon";

export class PageTerm extends PageItemCommon {
    Text?: string;
    Value?: string;
    Unit?: string;
    constructor(init?) {
        super();
        Object.assign(this, init);
    }
}