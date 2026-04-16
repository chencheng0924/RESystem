import { MenuItem } from "primevue/menuitem";
import { STAction, STMenuItem } from "./STCommon.model";

export class STMenuAction extends STAction {
    label?: string;
    icon?: string;
    url?: string;
    items?: Array<MenuItem> = [];
    //command?: Function=null;
    constructor(init?) {
        super(init);
        Object.assign(this, init);
    }
    toMenuItem(fun?: Function) {
        this.label = this.Text;
        this.icon = this.Icon;
        this.url = this.Url;
        this['command'] = fun;
        if (this.items?.length == 0)
            this.items = null;
        return this;
    }

    toSubMenuItems(fun?: Function) {
        if (this.MenuBtns == null || this.MenuBtns.length == 0)
            return this;

        this.items = this.MenuBtns.map((x) => {
            return new STMenuAction(x).toMenuItem(fun);
        })

        return this;
    }

    setItems(t?: any, items?: Array<STMenuItem>) {
        this.items = items;
        return this;
    }

    hasUrl() {
        if (this.url == undefined || this.url == null || this.url == "")
            return false;


        return true;
    }
}

export class STMenuProps {

    title?: any;
    actions?: Array<STMenuAction> = [];

    constructor(init?: Partial<STMenuProps>) {
        Object.assign(this, init);
    }
    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }



}


export class STMenuEvent {
    constructor(init?: Partial<STMenuEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;

}
