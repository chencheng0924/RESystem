import { PageViewLayout } from "./PageViewLayout";

export class PagePluginReturn {
    viewLayout?: PageViewLayout;
    currentObjectStr?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
}