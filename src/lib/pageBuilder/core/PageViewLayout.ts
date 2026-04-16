import { PageSectionType } from "../enum/PageSectionType"
import { PageSection } from "./PageSection"

export class PageViewLayout {

    public PageViewTitle?: string

    public TabId?: string
    public Pkid?: string

    // public ReturnData?: PageReturn
    // public EntityActions?: Array<PageAction> = []
    // public EntityTabs?: Array<PageTab> = []
    public EntitySections?: Array<PageSection> = []

    //public EntityListDatas?: Array<GroupComboItem> = [] // 会用到的清单

    constructor(init?) {
        Object.assign(this, init);
        this.EntitySections = [];
    }

    setPKID(pkid: string) {
        this.Pkid = pkid;
        return this;
    }

    setCurrentTab(tabid: string) {
        if (this.EntitySections.length == 0)
            return this;

        let tabsec = this.EntitySections.find(x => x.SectionType == PageSectionType.PAGE_TABS);
        if (tabsec == null)
            return this;

        tabsec.ToolbarActions.forEach((x) => {
            if (x.Id == tabid)
                x.setActive(true);
            else
                x.setActive(false);
        })

    }
}