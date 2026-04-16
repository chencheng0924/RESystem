import { ListItem } from "../common/ListItem";
import { ParameterData } from "../common/ParameterData"
import { PageRouterParamEnum } from "../enum/PageRouterParam";
import { PageSectionType } from "../enum/PageSectionType";
import { PageType } from "../enum/PageType";
import { PageAction } from "./PageAction";
import { PageDialogSection } from "./PageDialogSection";
import { PageDrawerSection } from "./PageDrawerSection";
import { PageLayoutOption } from "./PageLayoutOption";
import { PageSection } from "./PageSection";

export class PageBase {
    public ProgressBar?: boolean = false;
    // 左彈對話框
    public RouterPath: PageRouter = new PageRouter();
    public DrawerVisibleRight?: boolean = false;
    public DrawerView?: PageDrawerSection = new PageDrawerSection();
    public DrawerSecondVisibleRight?: boolean = false;
    public DrawerViewSecond?: PageDrawerSection = new PageDrawerSection();
    //  對話框
    public DialogVisible?: boolean = false;
    public DialogView?: PageDialogSection = new PageDialogSection();

    public TabId?: string
    public Pkid?: string
    public EntityName?: string
    public PageSections?: Array<PageSection> = []
    public EntitySections?: Array<PageSection> = []
    public PageActions?: Array<PageAction> = []

    // 基礎設定
    public PageType?: PageType// 左右 还是 单页式
    //public OriginalParametrData?: ParameterData //  是否有转接
    public $t?: any;
    public locale?: any;
    public LayoutOption?: PageLayoutOption = new PageLayoutOption();

    constructor(init?) {
        Object.assign(this, init);
    }

    getPageSectionByPath(path?: string) {
        if (this.PageSections == null || this.PageSections.length == 0)
            return null;
        return this.PageSections.find(x => x.Path == path);
    }
    getPageSectionById(id?: string) {
        if (this.PageSections == null || this.PageSections.length == 0)
            return null;
        return this.PageSections.find(x => x.Id == id);
    }
    getPageSectionByType(type?: PageSectionType) {
        if (this.PageSections == null || this.PageSections.length == 0)
            return null;
        return this.PageSections.find(x => x.SectionType == type);
    }
    getEntitySectionByPath(path?: string) {
        if (this.EntitySections == null || this.EntitySections.length == 0)
            return null;
        return this.EntitySections.find(x => x.Path == path);
    }
    getEntitySectionById(id?: string) {
        if (this.EntitySections == null || this.EntitySections.length == 0)
            return null;
        return this.EntitySections.find(x => x.Id == id);
    }
    getEntitySectionByType(type?: PageSectionType) {
        if (this.EntitySections == null || this.EntitySections.length == 0)
            return null;
        return this.EntitySections.find(x => x.SectionType == type);
    }


}

export class PageRouter {
    private RouterPath?: string = '';
    private RouteParams?: string = '';
    public RouterKey?: number = 1;

    private Params?: Array<ListItem> = [];
    constructor(init?) {
        Object.assign(this, init);
    }
    setRouter(r: string) {
        this.RouterPath = r;
        this.RouterKey++;
        return this;
    }
    getRouter() {
        return this.RouterPath
    }

    setRouteParams(params: string) {
        this.RouteParams = params;
        return this;
    }
    getRouteParams(): Array<ListItem> {
        if (this.RouteParams == null || this.RouteParams == "")
            return [];

        let kvs = this.RouteParams.split("&");
        let items = [];
        kvs.forEach((x) => {
            let kv = x.split("=");
            if (kv.length == 2)
                items.push(new ListItem({ Text: kv[0], Value: kv[1] }));
        })
        this.Params = items;
        return items;
    }
    getParamSource() {
        if (this.Params.length == 0)
            this.getRouteParams();

        let p = this.Params.find(x => x.Text == PageRouterParamEnum.SOURCE);
        if (p != null)
            return p.Value;

        return "";
    }
    getParamPKID() {
        if (this.Params.length == 0)
            this.getRouteParams();

        let p = this.Params.find(x => x.Text == PageRouterParamEnum.PKID);
        if (p != null)
            return p.Value;

        return "";
    }
    getParamByName(name?: string) {
        if (this.Params.length == 0)
            this.getRouteParams();

        let p = this.Params.find(x => x.Text == PageRouterParamEnum.NAME);
        if (p != null)
            return p.Value;

        return "";
    }
}