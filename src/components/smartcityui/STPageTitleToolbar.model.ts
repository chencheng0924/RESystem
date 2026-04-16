import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { STAction } from "./STCommon.model";
import { STPageTitleAction } from "./STPageTitle.model";

export class STPageTitleToolbarProps {

    title?: any;
    actions?: Array<STPageTitleAction> = [];
    isInfo?: boolean = false
    rightActions?: Array<STAction> = [];
    status?: BaseKeyValue;
    isSaveActions?: boolean

    constructor(init?: Partial<STPageTitleToolbarProps>) {
        Object.assign(this, init);
    }
    setActions(items: Array<any>) {
        this.actions = items;
        return this;
    }
    setRightActions(items: Array<STAction>) {
        this.rightActions = items;
        return this;
    }
    setIsInfo(type: boolean) {
        this.isInfo = type
        return this
    }
    setStatus(status: BaseKeyValue) {
        this.status = status
        return this
    }
    setSaveAction(isSaveActions: boolean) {
        this.isSaveActions = isSaveActions
        return this
    }

}


export class STPageTitleToolbarEvent {
    constructor(init?: Partial<STPageTitleToolbarEvent>) {
        Object.assign(this, init);
    }
    submit?: Function;
    change?: Function;

}
