import { STPromptProps } from '@/components/smartcityui/Prompt/STPrompt.model';
import { Events } from '@/composables/mitt/mitt';
import { PageBuilder } from '../base/PageBuilder';
import { PageSection } from '../core/PageSection';
import { PageView } from '../core/PageView';
import { IPageCustom } from '../interface/IPageCustom';
import STPromptAndTool from '@/components/smartcityui/Prompt/STPromptAndTool.vue';
import STPrompt from '@/components/smartcityui/Prompt/STPrompt.vue';
import { PageAction } from '../core/PageAction';
import { STAction } from '@/components/smartcityui/STCommon.model';
import { PageFormItem } from '../core/PageFormItem';

export class PageSectionPrompt extends PageSection implements IPageCustom {

    public promptText?: string = ''
    public promptInsetText?: string = '';
    private tools?: Array<PageAction> = [];
    private isNewLayout?: boolean = false;
    constructor() {
        super()

        this.tools = [
            new PageAction({ Text: "View.PromptConfig.Prompt_Library", Icon: "pi pi-book", Id: "library", IsOutlined: true, SeverityColor: 'None' }),
            new PageAction({ Text: "View.PromptConfig.Prompt_Snapshot", Icon: "pi pi-instagram", Id: "save", IsText: true, SeverityColor: 'danger' })
        ]

        this.isNewLayout = import.meta.env.VITE_AGENTUI_NEW == "true" ? true : false;

        if (this.isNewLayout) {
            this.tools = [

                new PageAction({ Text: "View.PromptConfig.Prompt_Snapshot", Id: "save", Message: "View.PromptConfig.Prompt_Snapshot_Msg" }),
                // new PageAction({ Text: "View.PromptConfig.Prompt_Custom", Id: "custom", Message: "View.PromptConfig.Prompt_Custom_Msg" }),
                new PageAction({ Text: "View.PromptConfig.Prompt_Library", Id: "library", Message: "View.PromptConfig.Prompt_Library_Msg" }),
            ]
        }


    }

    setPrompt(text: string) {
        this.promptText = text;
        return this;
    }
    getPrompt() {
        return this.promptText;

    }
    setInsertPrompt(text: string) {
        this.promptInsetText = text;
        return this;
    }
    setTools(tools: Array<PageAction>) {
        this.tools = tools;
        return this;
    }

    // 取得元件實例
    getComponent() {
        return this.isNewLayout ? STPromptAndTool : STPrompt;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let promptSec = sec as PageSectionPrompt;
        promptSec.Component = this.isNewLayout ? STPromptAndTool : STPrompt
        let h = 'calc(100vh - 176px)';
        if (this.isNewLayout)
            h = 'calc(100vh - 390px)';
        let props = new STPromptProps()
            .setPrompt(this.promptText, "View.PromptConfig.Prompt_Label", h)
            .setTools(this.tools.map(x => new STAction(x)))
            .setInsertPrompt(this.promptInsetText);


        promptSec.Props = props

        promptSec.Events = {
            eventEditorUpdate: async (event, selectitem) => {
                let item: PageFormItem = event["targetItem"];
                let promptSec = sec as PageSectionPrompt;

                promptSec.promptText = item.Value;
                await view.SetEvent_FormChange(event, promptSec);
            },
            eventActionBtn: async (item) => {
                const tempAction = new PageAction(item);
                let promptSec = sec as PageSectionPrompt;
                await view.SetEvent_TableToolbarAction(tempAction, null, promptSec);

            },
        }
        return promptSec
    }

}