import { PageAction } from "../core/PageAction";
import { PageSection } from "../core/PageSection";
import { PageView } from "../core/PageView";


export interface IPageDrawerSection {
    SourceSection: PageSection;
    DrawerSection: PageSection;
    action: PageAction;
    callBack?: Function;
    CallAction(view: PageView, currentAction: PageAction): Promise<PageView>;

}
