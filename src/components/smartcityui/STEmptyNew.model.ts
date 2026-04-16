import { STAction } from "./STCommon.model";

export class STEmptyNewProps {

    title?: string;
    desc?: string;
    actions?: Array<STAction>

    constructor(init?: Partial<STEmptyNewProps>) {
        Object.assign(this, init)
    }

    setActions(actions?: Array<STAction>) {
        this.actions = actions;
        return this;
    }
    setTitle(title?: string) {
        this.title = title;
        return this;
    }
    setDesc(desc?: string) {
        this.desc = desc;
        return this;
    }
}



export class STEmptyNewEvent {
    constructor(init?: Partial<STEmptyNewEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;

}
