import { MenuItem } from "primevue/menuitem";
import { STAction, STMenuItem } from "./STCommon.model";

export class STMenubarAction extends STAction {
    label?: string;
    icon?: string;
    url?: string;
    items?: Array<MenuItem> = [];
    constructor(init?) {
        super(init);
        Object.assign(this, init);
    }
    toMenuItem() {
        this.label = this.Text;
        this.icon = this.Icon;
        this.url = this.Url;
        if (this.items?.length == 0)
            this.items = null;
        return this;
    }

    toSubMenuItems() {
        if (this.MenuBtns == null || this.MenuBtns.length == 0)
            return this;

        this.items = this.MenuBtns.map((x) => {
            return new STMenubarAction(x).toMenuItem();
        })

        return this;
    }

    setItems(t?: any, items?: Array<STMenuItem>) {
        if (items == null || items.length == 0) {
            items = [
                new STMenuItem({
                    key: 'chatSetting',
                    label: t('AIChatRoom.Action_Setting')
                }),
                new STMenuItem({
                    key: 'chatLogData',
                    label: t('AIChatRoom.Action_Log')
                }),
                new STMenuItem({
                    key: 'chatDownload',
                    label: t('AIChatRoom.Action_Download')
                }),
                new STMenuItem({
                    key: 'clearChatRecord',
                    label: t('AIChatRoom.Action_Clear')
                })
            ]
        }
        this.items = items;
        return this;
    }

    hasUrl() {
        if (this.url == undefined || this.url == null || this.url == "")
            return false;


        return true;
    }
}

export class STMenubarProps {

    title?: any;
    actions?: Array<STMenubarAction> = [];

    constructor(init?: Partial<STMenubarProps>) {
        Object.assign(this, init);
    }
    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }



}


export class STMenubarEvent {
    constructor(init?: Partial<STMenubarEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;

}
