import { SideBarAppBarBroadController } from "./SideBarAppBarBroadController";
import { SideBarAppBarNarrowController } from "./SideBarAppBarNarrowController";
import { PageBuilder } from "@/lib/pageBuilder/base/PageBuilder";
import { UILayoutBase } from "./UILayoutBase";

export class UILayout {
    static SideBarAppBarNarrow(pagebuilder?: PageBuilder) {
        return new UILayoutController(new SideBarAppBarNarrowController().setPageBuilder(pagebuilder));
    }
    static SideBarAppBarBroad(pagebuilder?: PageBuilder) {
        return new UILayoutController(new SideBarAppBarBroadController().setPageBuilder(pagebuilder));
    }
}


export class UILayoutController {
    private _template: UILayoutBase;

    constructor(template: UILayoutBase) {
        this._template = template;
    }

    public get template(): UILayoutBase {
        return this._template;
    }

}