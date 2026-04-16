import { PageMessage } from './PageTag';
import { IPageDrawerSection } from "../interface/IPageDrawerSection";
import { PageAction } from "./PageAction";
import { PageSection } from "./PageSection";
import { PageView } from "./PageView";

export class PageDrawerSection implements IPageDrawerSection {
    constructor(sec?: PageSection, currentAction?: PageAction) {
        if (sec)
            this.SourceSection = sec;
        if (currentAction)
            this.action = currentAction;
    }
    Width?: string = '40rem';
    SourceSection: PageSection;
    DrawerSection: PageSection = new PageSection();
    DrawerSectionSecond: PageSection = new PageSection();
    Message?: PageMessage = new PageMessage();
    action: PageAction;
    callBack?: Function;
    UpdateKey?: number = 0;
    IsFullWidth?: boolean = false
    showTag: boolean = true // 是否顯示tag

    IsMode?: boolean = true;
    IsDismissible?: boolean = true;
    Pt?: any = null;

    IsControllerView?: boolean = false;
    EntityType?: string;
    EntityPKID?: string;

    CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {
        return null;
    }
    callApply() {
        if (this.callBack != null)
            this.callBack();
    }
    setWidth(width: string) {
        this.Width = width;
        return this;
    }
    refresh() {
        this.UpdateKey++;
        return this;
    }
    openFullScreen() {
        this.IsFullWidth = !this.IsFullWidth;
    }
    setShowTag(type: boolean) {
        this.showTag = type
        return this
    }

    setMode(mode) {
        this.Pt = null;
        this.IsMode = mode;
        if (this.IsMode == false) {
            this.Pt = { mask: { class: 'pointer-events-none' } };
        }

        return true;
    }
    resetUpdateKey() {
        this.UpdateKey = 0
        return this
    }

    setDismissable(dismissable: boolean) {
        this.IsDismissible = dismissable;
        return this;
    }
    CallBackAction(view: PageView) {
        return null;
    }

    setControllerView(isControllerView: boolean) {
        this.IsControllerView = isControllerView;
        return this;
    }
    setControllerEntityType(entityType: string) {
        this.EntityType = entityType;
        return this;
    }

    setControllerEntityPKID(entityPKID: string) {
        this.EntityPKID = entityPKID;
        return this;
    }
}