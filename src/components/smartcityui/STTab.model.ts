import { STAction } from "./STCommon.model"
export class STTabAction extends STAction {

    constructor(init?) {
        super(init);
        Object.assign(this, init);
    }

    content: string = "";

}
export class STTabProps {
    actions?: Array<STTabAction> = [];
    activeId?: string
    tabListPt?: any;
    tabPt?: any
    constructor(init?: Partial<STTabProps>) {
        Object.assign(this, init);
    }

    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }

    setActiveValue() {
        this.activeId = this.actions.find(x => x.Active)?.Id;
    }

    public setTabPt(pt: Object) {
        if (pt == null)
            return this;

        this.tabPt = pt
        return this
    }
    public setTabListPt(pt: Object) {
        if (pt == null)
            return this;

        this.tabListPt = pt
        return this
    }
}


export class STTabEvent {
    constructor(init?: Partial<STTabEvent>) {
        Object.assign(this, init);
    }

    eventActionBtn?: Function;

}

