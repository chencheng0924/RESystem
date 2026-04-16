import { PageAction } from "../core/PageAction";
import { PageSectionType } from "../enum/PageSectionType";
import { IComponent } from "./IComponent";

export interface IPageSection extends IComponent {

    SectionType: PageSectionType;
    Title: string;
    Id: string;
    Path: string;
    Edit?: boolean;
    Required?: boolean;
    ToolbarActions?: Array<PageAction>//功能按鈕

}
