import { PageBuilder } from '../base/PageBuilder';
import { PageSection } from '../core/PageSection';
import { PageView } from '../core/PageView';
import { IPageCustom } from '../interface/IPageCustom';
import { PageAction } from '../core/PageAction';

import STPageTitleToolbar from '@/components/smartcityui/STPageTitleToolbar.vue';
import { STPageTitleToolbarProps } from '@/components/smartcityui/STPageTitleToolbar.model';
import { STPageTitleAction } from '@/components/smartcityui/STPageTitle.model';
import { BaseKeyValue } from '../model/BaseKeyValue';
import { STAction } from '@/components/smartcityui/STCommon.model';

export class PageSectionPageTitleToolbar extends PageSection implements IPageCustom {

    public rightActions?: Array<PageAction> = []
    public status?: BaseKeyValue;
    public isSaveActions?: boolean
    constructor() {
        super()


    }
    setRightActions(tools?: Array<PageAction>) {
        this.rightActions = tools;

        return this;
    }
    setStatus(status: BaseKeyValue) {
        this.status = status
        return this
    }
    setSaveAction(isSaveActions: boolean) {
        this.isSaveActions = isSaveActions
        return this
    }

    // 取得元件實例
    getComponent() {
        return STPageTitleToolbar;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {
        let toolbarSec = sec as PageSectionPageTitleToolbar;

        sec.Component = STPageTitleToolbar;
        let pros = new STPageTitleToolbarProps();
        pros.setActions(sec.ToolbarActions.map((x) => new STPageTitleAction(x)));
        pros.title = sec.Title;
        pros.setIsInfo(sec.isInfoPage)
        pros.setStatus(this.status);
        pros.setSaveAction(this.isSaveActions);
        pros.setRightActions(this.rightActions.map(x => new STAction(x)));
        sec.Props = pros;

        sec.Events = {
            action: async (e, item: STAction) => {
                const tempAction = new PageAction(item);
                let toolbarSec = sec as PageSectionPageTitleToolbar;
                await view.SetEvent_PageAction(tempAction);

            },
        }


        return toolbarSec;
    }

}