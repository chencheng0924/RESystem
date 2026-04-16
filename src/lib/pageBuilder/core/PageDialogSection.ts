import { PageMessage } from './PageTag';
import { PageAction } from "./PageAction";
import { PageSection } from "./PageSection";
import { PageView } from "./PageView";
import { IPageDialogSection } from '../interface/IPageDialogSection';

export class PageDialogSection implements IPageDialogSection {
    constructor(sec?: PageSection, currentAction?: PageAction) {
        if (sec)
            this.SourceSection = sec;
        if (currentAction)
            this.action = currentAction;
    }
    SourceSection: PageSection;
    DialogSection: PageSection = new PageSection();
    Message?: PageMessage = new PageMessage();
    action: PageAction;
    callBack?: Function;
    LastName?: string;
    CurrentData?: any;
    DialogType?: string;


    CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {
        return null;
    }
    callApply() {
        if (this.callBack != null)
            this.callBack();
    }
    // 保存選種的資料
    setData(select: any) {
        this.CurrentData = select;
        return this;
    }
    setDialogType(type) {
        this.DialogType = type;
        return this;
    }

}