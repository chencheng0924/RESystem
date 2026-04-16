import { BaseEntity } from "../model/BaseEntity";
import { PageView } from "../core/PageView";
import { PageAction } from "../core/PageAction";
import { PageSection, PageSectionMenubar, PageSectionMessage, PageSectionTitle } from "../core/PageSection";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageMessage } from "../core/PageTag";
import { PLSingleViewSecurity } from "./PLSingleView.Security";
import { PageRouter } from "../core/PageBase";
import { PageSectionType } from "../enum/PageSectionType";
import { IPLSingleViewService } from "../interface/IPLSingleViewService";
import { PageType } from "../enum/PageType";
import { IPageViewBySectionTable } from "../interface/IPageViewBySection";

export class PLSingleView extends PageView {
    private _svc: IPLSingleViewService;
    private _entity: BaseEntity;
    private _securityCenter?: PLSingleViewSecurity;
    private _entityPath: string;
    private _entityTitle: string;
    private _columnLimit: number = 4;
    private _routerEntity?: PageRouter;
    private _entityToolbars?: Array<PageAction> = [];//entity的動作

    public orgSection: Array<PageSection> = [];
    public pageViewSections: Array<any> = [];// 記錄從物件展開出來的section

    constructor(init?) {
        super(init);
        this._securityCenter = new PLSingleViewSecurity();
        this.PageType = PageType.VIEW;
        this.IsBack = true;
    }
    public setService(svc: IPLSingleViewService) {
        this._svc = svc;
        return this;
    }
    public setEntity(entity: BaseEntity, path: string, title: string) {
        this._entity = entity;
        this._entityPath = path;
        this._entityTitle = title;
        this.Title = this._entityTitle;
        return this;
    }
    public setSecurityCenter(security: PLSingleViewSecurity) {
        this._securityCenter = security;
        return this;
    }
    public setRouterEntity(routerEntity: PageRouter) {
        this._routerEntity = routerEntity;
        return this;
    }
    public async SetInitData(params?: string, className?: string) {
        let pathID = this._entityPath;
        let layout = this;
        if (this._svc == null)
            return;

        this._routerEntity = new PageRouter().setRouteParams(params)

        this.setPKID(this._routerEntity.getParamPKID());
        this.setEntityName(className);

        await this.setPageSections();
        let tabid = [this.TabId];
        this.EntitySections = this.orgSection.filter(x => tabid.indexOf(x.TabId) != -1);
    }
    public setEntityToolbars(tools: Array<PageAction>) {
        this._entityToolbars = tools;
        return this;
    }
    public setMessage(msgObj: PageMessage) {
        let sec = this.getPageSectionByType(PageSectionType.PAGE_MESSAGE);
        if (sec != null)
            sec.Message = msgObj;

        return this;
    }


    //----------------------------------------------------------------------------------
    public async setPageSections() {
        // 增加section
        if (this._securityCenter.IsEntityTitle)
            this.getPageTitle();
        if (this._securityCenter.IsEntityToolbar)
            this.getPageMenubar();

        if (this._securityCenter.IsEntityMessage)
            this.getPageMessage();


    }
    private async getPageTitle() {
        let entityName = this._routerEntity.getParamSource();
        let secTitle = `${entityName}.Title`;
        let acs = [
            new PageAction({
                Type: PageTableActionEnum.PageLink, Text: secTitle, Icon: "pi pi-credit-card", Id: "search"
                , Url: `/${entityName}`
            }),
            new PageAction({ Type: PageTableActionEnum.PageLink, Text: this._entityTitle, Icon: "pi pi-id-card", Id: "info" })
        ]

        let sec = new PageSectionTitle().setId().setTitle(secTitle).setPath(`${entityName}Info_Title`)
            .setToolbarActions(acs);
        this.PageSections.push(sec);
    }
    public updatePageTitle(title) {
        let sec = this.getPageSectionByType(PageSectionType.PAGE_TITLE);
        if (sec == undefined || sec == null)
            return;

        let acs = sec.getToolbarActions();
        let ac = acs.find(x => x.Id == "info");
        if (ac != null) {
            ac.Text = title;
        }

        sec.update();
    }




    private getPageMenubar() {
        let entityName = this.getEntityName();
        let acs = this._entityToolbars;
        let sec = new PageSectionMenubar().setId().setPath(`${entityName}Info_menubar`)
            .setToolbarActions(acs);
        this.PageSections.push(sec);

    }
    private getPageMessage() {
        let entityName = this.getEntityName();
        let sec = new PageSectionMessage().setId().setTitle("").setPath(`${entityName}Info_pagemessage`);

        this.PageSections.push(sec);
    }

    public checkSectionFormData(sec: PageSection) {
        let errorItems = sec.FormOps.FormItems.filter(x => (!!x.ErrorText) == true);
        if (errorItems.length > 0) {
            this.setErrorToast("有錯誤資料無法保存");
            return false;
        }

        let isok = sec.FormOps.HasRequestEmptyValue()
        if (isok) {
            this.setErrorToast("請填寫必填欄位");
            return false;
        }

        return true;
    }

    //----------------------------------------------------------------------------------
    //   
    //----------------------------------------------------------------------------------
    public async setIPageSection() {

    }
    public hasTableEvent(object: any = this): object is IPageViewBySectionTable {
        return 'SetEvent_TableToolbarAction' in object;
    }


}

