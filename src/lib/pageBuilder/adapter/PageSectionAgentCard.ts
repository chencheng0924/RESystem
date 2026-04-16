
import { PageBuilder } from "../base/PageBuilder";
import { PageSection } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { IPageCustom } from "../interface/IPageCustom";
import { PageCardItem } from "../core/PageCardItem";
import STAgentCards from "@/components/smartcityui/STAgentCards.vue";
import { STAgentCardsProps } from "@/components/smartcityui/STAgentCards.model";
import { STCardItem } from "@/components/smartcityui/STCardCustom.model";


export class PageSectionAgentCards extends PageSection implements IPageCustom {

    datas?: Array<PageCardItem> = [];
    constructor() {
        super()
        this.IsPanel = false;
    }

    setDatas(datas: Array<PageCardItem>) {
        this.datas = datas;
        return this;
    }


    // 取得元件實例
    getComponent() {
        return STAgentCards;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        let AgentCardSec = sec as PageSectionAgentCards;
        AgentCardSec.Component = STAgentCards
        let props = new STAgentCardsProps()
        props.setDatas(AgentCardSec.datas.map((x) => {
            return new STCardItem(x.convertObject())
        }));

        AgentCardSec.Props = props

        AgentCardSec.Events = {

            eventActionCard: async (item: STCardItem) => {
                const tempAction = new PageCardItem(item.convertObject());
                let promptSec = sec as PageSectionAgentCards;
                await view.SetEvent_CardClick(promptSec, tempAction);

            },
        }

        return AgentCardSec
    }

}
