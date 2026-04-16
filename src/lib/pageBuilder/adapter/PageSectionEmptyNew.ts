
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


export class PageSectionEmptyNew extends PageSection implements IPageCustom {

    title?: string = '';
    desc?: string = '';
    actions?: Array<PageAction> = [];
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
    setDesc(desc?: string) {
        this.desc = desc;
        return this;
    }

    // 取得元件實例
    getComponent() {
        return STEmptyNew;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let emptyNewSec = sec as PageSectionEmptyNew;
        emptyNewSec.Component = STEmptyNew
        let props = new STEmptyNewProps()
        props.setActions(emptyNewSec.actions);
        props.setTitle(emptyNewSec.title);
        props.setDesc(emptyNewSec.desc);

        emptyNewSec.Props = props

        emptyNewSec.Events = {
            eventActionBtn: async (item: STAction) => {
                const tempAction = new PageAction(item);
                let emptyNewSec = sec as PageSectionEmptyNew;
                await view.SetEvent_PageAction(tempAction);

            },
        }

        return emptyNewSec
    }

}
