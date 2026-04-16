import { STAction } from "../STCommon.model";
import { STFormItem, STFormItemType } from "../STForm.model";

export class STPromptProps {

    title?: string;
    tools?: Array<STAction>;
    formItems?: Array<STFormItem> = [];
    constructor(init?: Partial<STPromptProps>) {
        Object.assign(this, init);
    }
    setPrompt(prompt: string, text?: string, height?: string) {
        let h = 'calc(100vh - 176px)'
        if (height) {
            h = height;
        }

        let item = new STFormItem({
            Id: 'prompt',
            Field: 'prompt',
            Type: STFormItemType.MarkdownEditor,
            Value: prompt,
            MarkdownHeight: height,
        })

        if (text) {
            item.Name = text;
        }

        this.formItems = [item];
        return this;
    }
    setInsertPrompt(prompt: string) {

        let item = this.formItems.find(x => x.Id == "prompt");
        if (item != null) {
            item.InsertText = prompt;
        }



        return this;
    }
    setItems(items: Array<STFormItem>) {
        this.formItems = items;
        return this;
    }
    setTools(tools: Array<STAction>) {

        this.tools = tools;
        return this;
    }

}

export class STPromptEvent {
    constructor(init?: Partial<STPromptEvent>) {
        Object.assign(this, init);
    }

    eventEditorUpdate?: Function;
    eventActionBtn?: Function;
}
