import { PageSection } from "@/lib/pageBuilder/core/PageSection";
import { STAction } from "./STCommon.model"
import { STTabAction } from "./STTab.model";

export class STTabContentProps {
    actions?: Array<STTabAction> = [];
    activeId?: string
    section?: PageSection = null;
    tabListPt?: object = {}
    tabPt?: object = {}

    constructor(init?: Partial<STTabContentProps>) {
        Object.assign(this, init);
    }

    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }

    setActiveValue() {
        this.activeId = this.actions.find(x => x.Active)?.Id;
    }
    setSection(sec: PageSection) {
        this.section = sec;
        return this;
    }

    setTabListPt(pt: object) {
        this.tabListPt = pt
        return this
    }

    setTabPt(pt: object) {
        this.tabPt = pt
        return this
    }

}


export class STTabContentEvent {
    constructor(init?: Partial<STTabContentEvent>) {
        Object.assign(this, init);
    }

    eventActionBtn?: Function;

}

