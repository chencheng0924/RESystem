import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { PageEventBus, PageEventBusItem, PageEventEnum } from "../mitt/PageEventBus";
import { PageMessageBase } from "./PageMessageBase";


export class PageMessage extends PageMessageBase {
    constructor(init?) {
        super(init);
    }



}

export class PageTag extends PageMessageBase {
    constructor(init?) {
        super(init);
    }
}

export class PageToast extends PageMessageBase {
    ToastKey?: number = 1;
    Time?: number = 3000;
    constructor(init?) {
        super(init);
    }
    setToast(title: string, desc: string) {
        this.Title = title;
        this.Text = desc;
        this.ToastKey++;
        PageEventBus.getInstance.triggerEvent(new PageEventBusItem().setEventName(PageEventEnum.SendToast));
        return this;
    }
}