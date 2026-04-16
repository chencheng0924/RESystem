import { STMenubarAction } from "../STMenubar.model"

export class STDialogPromptProps {
    templates?: Array<STDialogPromptItem> = []
    userHistory?: Array<STDialogPromptItem> = []
    listByHtml?: Function
    listClickFun?: Function
    deleteClickFun?: Function
    actionList?: Array<STMenubarAction> = [];
    constructor(init?: Partial<STDialogPromptProps>) {
        Object.assign(this, init);
    }

    setTemplates(templates?: Array<STDialogPromptItem>) {
        this.templates = templates;
        return this;
    }
    setHistorys(historys?: Array<STDialogPromptItem>) {
        this.userHistory = historys;
        return this;
    }
    setActionList(actionList?: Array<STMenubarAction>){
        this.actionList = actionList;
        return this;
    }

}

export class STDialogPromptEvent {
    constructor(init?: Partial<STDialogPromptEvent>) {
        Object.assign(this, init);
    }

    eventEditorUpdate?: Function;
    eventActionBtn?: Function;
}


export class STDialogPromptItem {
    title?: string;
    content?: string
    data?: any
    type?: string
    constructor(init?) {
        Object.assign(this, init);
    }
    setData(data: any) {
        this.data = data;
        return this;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }

    setContent(content: string) {
        this.content = content;
        return this;
    }

}
