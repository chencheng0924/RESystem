
import { PageBuilder } from "../base/PageBuilder";
import { PageSection } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { IPageCustom } from "../interface/IPageCustom";
import { PageCardItem } from "../core/PageCardItem";
import { STAgentCardsProps } from "@/components/smartcityui/STAgentCards.model";
import { STCardItem } from "@/components/smartcityui/STCardCustom.model";
import STEmptyNew from "@/components/smartcityui/STEmptyNew.vue";
import { STEmptyNewProps } from "@/components/smartcityui/STEmptyNew.model";
import { PageAction } from "../core/PageAction";
import { STAction } from "@/components/smartcityui/STCommon.model";
import STFormDisplay from "@/components/smartcityui/STFormDisplay.vue";
import { STFormDisplayProps } from "@/components/smartcityui/STFormDisplay.model";
import { PageFormItem } from "../core/PageFormItem";
import { STFormItem } from "@/components/smartcityui/STForm.model";


export class PageSectionFormDisplay extends PageSection implements IPageCustom {

    title?: string
    subTitle?: Array<PageFormItem>
    content?: Array<PageFormItem>
    actions?: Array<STAction>;
    constructor() {
        super()

    }
    setActions(actions?: Array<PageAction>) {
        this.actions = actions;
        return this;
    }
    setTitle(title?: string) {
        this.title = title;
        return this;
    }
    setSubTitle(subTitle?: Array<PageFormItem>) {
        this.subTitle = subTitle;
        return this;
    }
    setContent(content?: Array<PageFormItem>) {
        this.content = content;
        return this;
    }

    // 取得元件實例
    getComponent() {
        return STFormDisplay;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let emptyNewSec = sec as PageSectionFormDisplay;
        emptyNewSec.Component = STFormDisplay
        let props = new STFormDisplayProps()
        props.setActions(emptyNewSec.actions);
        props.setTitle(emptyNewSec.title);
        props.setSubTitle(emptyNewSec.subTitle.map(x => new STFormItem(x)));
        props.setContent(emptyNewSec.content.map(x => new STFormItem(x)));
        props.setIsEditor(emptyNewSec.Edit);

        emptyNewSec.Props = props

        emptyNewSec.Events = {
            eventAction: async (e, item: STAction) => {
                const tempAction = new PageAction(item);
                let emptyNewSec = sec as PageSectionFormDisplay;
                await view.SetEvent_PageToolbarAction(tempAction, emptyNewSec);

            },
        }

        return emptyNewSec
    }

}
