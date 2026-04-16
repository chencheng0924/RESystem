import { MenuItem } from "primevue/menuitem";
import { STAction } from "./STCommon.model";

export class STPageTitleAction extends STAction {

    label?: string;
    icon?: string;
    url?: string;
    items?: Array<MenuItem> = [];
    constructor(init?) {
        super(init);

    }
    toMenuItem() {
        this.label = this.Text;
        this.icon = this.Icon;
        this.url = this.Url;
        return this;
    }
}

export class STPageTitleProps {

    title?: any;
    actions?: Array<STPageTitleAction> = [];
    isInfo?: boolean = false

    constructor(init?: Partial<STPageTitleProps>) {
        Object.assign(this, init);
    }
    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }
    setIsInfo(type: boolean) {
        this.isInfo = type
        return this
    }



}


export class STPageTitleEvent {
    constructor(init?: Partial<STPageTitleEvent>) {
        Object.assign(this, init);
    }
    submit?: Function;
    change?: Function;

}
