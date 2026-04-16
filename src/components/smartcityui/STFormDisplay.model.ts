import { STAction } from "./STCommon.model";
import { STFormItem } from "./STForm.model";

export class STFormDisplayProps {
    title?: string
    subTitleItems?: Array<STFormItem>
    contentItems?: Array<STFormItem>
    isEditor?: boolean
    actions?: Array<STAction>;

    constructor(init?: Partial<STFormDisplayProps>) {
        Object.assign(this, init)
    }

    setActions(actions: Array<STAction>) {
        this.actions = actions
        return this
    }
    setTitle(title: string) {
        this.title = title
        return this
    }
    setSubTitle(subTitle: Array<STFormItem>) {
        this.subTitleItems = subTitle
        return this
    }
    setContent(content: Array<STFormItem>) {
        this.contentItems = content
        return this
    }
    setIsEditor(isEditor: boolean) {
        this.isEditor = isEditor
        return this
    }

}


export class STFormDisplayEvent {
    constructor(init?: Partial<STFormDisplayEvent>) {
        Object.assign(this, init);
    }
    eventAction?: Function;
}