import { DrawerFormDefinitionBase } from "../common/DrawerForm";
import { PageAction } from "../core/PageAction";
import { PageSection } from "../core/PageSection";

export interface IPageViewBySection {
    getSection();

}

export interface IPageViewBySectionTable extends IPageViewBySection {
    SetEvent_TableToolbarAction(def: DrawerFormDefinitionBase);
    SetEvent_TableRowAction(def: DrawerFormDefinitionBase);
    SetEvent_TablePageChange?(def: DrawerFormDefinitionBase, conditions?: any);
}



export class IPageViewBySectionFactory {

}