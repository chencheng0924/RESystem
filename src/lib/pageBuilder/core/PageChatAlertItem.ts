import { PageAction } from "./PageAction"
import { PageMessage } from "./PageTag"

export class PageChatAlertItem extends PageMessage {
    position?: string = "top"
    Action?: PageAction = null;
    Icon?: string = '';

    constructor(init?: Partial<PageChatAlertItem>) {
        super(init)
        Object.assign(this, init)
    }
    setPositionTop() {
        return this.setPosition("top");
    }
    setPositionBottom() {
        return this.setPosition("bottom");
    }
    setPositionBottomCenter() {
        return this.setPosition("bottom-center");
    }

    setPosition(opsition: string) {
        this.position = opsition;
        return this;
    }
    setAction(action: PageAction) {
        this.Action = action;
        return this;
    }
    setIcon(icon: string) {
        this.Icon = icon;
        return this;
    }
}