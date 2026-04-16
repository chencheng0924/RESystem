export class PageChangeListReturn {
    ReturnType?: string;
    ReturnMessage?: string;
    ReturnData?: string;

    constructor(init?) {
        Object.assign(this, init);
    }
}