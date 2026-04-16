import { PageAction } from "../core/PageAction";
import { PageSection } from "../core/PageSection";
import { PageView } from "../core/PageView";


export interface IPageDialogSection {
    SourceSection: PageSection;
    DialogSection: PageSection;
    LastName?: string;
    action: PageAction;
    callBack?: Function;
    CallAction(view: PageView, currentAction: PageAction): Promise<PageView>;

}
