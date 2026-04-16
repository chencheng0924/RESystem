import { BaseEntity } from "../model/BaseEntity";
import { PageView } from "../core/PageView";
import { IPLSingleSearchService } from "../interface/IPLSingleSearchService";
import { PageTableColumnActionEnum, PageTablePageParams } from "../core/PageTableColumn";
import { PageAction } from "../core/PageAction";
import { PageSection, PageSectionSearchTable } from "../core/PageSection";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { PLSingleSearchSecurity } from "./PLSingleSearch.Security";
import { PageRouterParamEnum } from "../enum/PageRouterParam";
import { DrawerFormDefinitionBase, DrawerFormFactory, DrawerFormFunctionPattern } from "../common/DrawerForm";
import { PageType } from "../enum/PageType";
import { ITableColumnDefinition } from "../interface/ITableColumnDefinition";
import { IGetListEx } from "../interface/IGetList";
import { DialogFormDefinitionBase, DialogFormFactory } from "@/lib/pageBuilder/common/dialogForm";
import { ReloadStore } from "@/stores/reloadStore";
import { PageCardItem } from "../core/PageCardItem";
import { PageSectionProjectCard } from "../adapter/PageSectionProjectCard";
import { PageSectionEmptyNew } from "../adapter/PageSectionEmptyNew";

export class PLSingleSearchAndNew extends PageView {
    private _svc: IPLSingleSearchService;
    private _entity: BaseEntity;
    private _securityCenter?: PLSingleSearchSecurity;
    private _entityPath: string;
    private _entityTitle: string;
    private _columnLimit: number = 4;
    public drawerWidth?: string = '40rem';
    public isBatchFetch: boolean = false;  // 是否批次撈資料
    private _pageIndex: number = 1;  // 用於批次撈資料（固定一開始從第一頁）
    public pageRows: number;  // 用於批次撈資料（固定一開始撈 10 筆）
    private _pageParams?: PageTablePageParams
    public reloadStore: any;

    constructor(init?) {
        super(init);
        this._securityCenter = new PLSingleSearchSecurity();
        this.PageType = PageType.SEARCH;
        this.setTablePaginator()
        this.reloadStore = ReloadStore();
    }

    public setIsBatchFetch(isBatchFetch: boolean) {
        this.isBatchFetch = isBatchFetch;
        this.setTablePaginator()
    }
    public setTablePaginator() {
        if (this.isBatchFetch) {
            this.pageRows = 10
            this._pageParams = new PageTablePageParams().setPageIndex(this._pageIndex).setPageRows(this.pageRows)  // 預設 1 頁 10 筆
        }
    }
    public resetPageIndex() {
        this._pageIndex = 1
    }
    public getPageIndex() {
        return this._pageIndex;
    }
    public setService(svc: IPLSingleSearchService) {
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
    public setSecurityCenter(security: PLSingleSearchSecurity) {
        this._securityCenter = security;
        return this;
    }

    public async SetInitData(params?: string, className?: string, pileNum?: string) {

        if (this._svc == null)
            return;


        this.setEntityName(className);
        // 1. 取資料
        // let ds = await this._svc.getEntityDatas(null, pileNum);
        let ds = null;
        if (this.reloadStore.reloadSearchCondition) {
            ds = await this._svc.searchEntityDatasByPageRow(this.reloadStore.reloadSearchCondition, this.reloadStore.reloadPageParams.PageIndex, this.reloadStore.reloadPageParams.PageRows);
        } else {
            ds = await this._svc.getEntityDatasByPageRow(null, this._pageIndex, this.pageRows);
        }


        // if (ds?.data.length == 0) {
        //     this.getDataEmptyByNew();
        //     return;
        // }

        this.getSearchTableSection(ds);

    }
    public getSearchTableColumns(hasTableColumnDefinition) {
        // 2. 設定 data 編輯功能
        let rowActions = [
            PageTableColumnActionEnum.rowedit,
            PageTableColumnActionEnum.rowdelete,
            PageTableColumnActionEnum.rowView,
            PageTableColumnActionEnum.rowEditRestraint
        ];
        if (this._securityCenter.IsRowActions == false)
            rowActions = [];
        if (this._securityCenter.IsRowEdit == false)
            rowActions = rowActions.filter(x => x != PageTableColumnActionEnum.rowedit)
        if (this._securityCenter.IsRowDelete == false)
            rowActions = rowActions.filter(x => x != PageTableColumnActionEnum.rowdelete)
        if (this._securityCenter.IsRowView == false)
            rowActions = rowActions.filter(x => x != PageTableColumnActionEnum.rowView)
        if (this._securityCenter.IsRowEditRestraint == false)
            rowActions = rowActions.filter(x => x != PageTableColumnActionEnum.rowEditRestraint)


        let cols = [];
        if (this._entity.hasTableColumnDefinition()) {
            cols = this._entity.toPageTableColumns(rowActions)
            let customCols = (<object>this._entity) as ITableColumnDefinition;
            if (customCols != null) {
                hasTableColumnDefinition = true;
                cols = customCols.getTableColumn(cols);
            }
        } else {
            cols = this._entity.toPageTableColumns(rowActions)
        }

        return cols;
    }
    private getSearchTableSection(ds: any) {

        let pathID = this._entityPath;
        let layout = this;
        this.reloadStore.reloadPageParams.setTotalRows(ds.totalRows);
        let hasTableColumnDefinition = false;
        let cols = this.getSearchTableColumns(hasTableColumnDefinition);

        // 3.設定 整個表格 編輯功能
        let acs = [

            new PageAction({ Type: PageTableActionEnum.TableRowAdd, Text: "Components.STTable.Add", Icon: "pi pi-plus", Id: "add" })
                .setBtnStyle(false, false, PageItemSeverityStyle.NONE),
            new PageAction({ Type: PageTableActionEnum.TableDeletes, Text: "Components.STTable.Delete", Icon: "pi pi-trash", Id: "delete" })
                .setBtnStyle(false, false, PageItemSeverityStyle.CONTRAST),
        ]
        if (this._securityCenter.IsAdd == false)
            acs = acs.filter(x => x.Type != PageTableActionEnum.TableRowAdd)
        if (this._securityCenter.IsDeletes == false)
            acs = acs.filter(x => x.Type != PageTableActionEnum.TableDeletes)


        // 4. 設定查詢條件
        const size = this._columnLimit;
        let conditions = cols.filter(x => x.CanEdit).map((x, index) => {
            let i = 0;
            if (cols.length > size)
                i = Math.floor(index / size);
            return x.toPageFormItem(pathID).SetRowIndex(i);
        });
        if (hasTableColumnDefinition) {
            let custom = (<object>this._entity) as ITableColumnDefinition;
            if (custom != null) {
                conditions = custom.getCondition(conditions);
            }
        }

        if (this._securityCenter.IsCondition == false)
            conditions = [];


        // 5. build PageSection 
        let tb = new PageSectionSearchTable().setId().setTitle(this._entityTitle).setPath(pathID);

        if (this.hasGetList())
            conditions = IGetListEx.setGetList(conditions, this, tb, "value");

        if (this.reloadStore.reloadSearchCondition) {
            conditions = this.reloadStore.reloadSearchCondition;
        }
        tb.setDatas(ds.data)
            .setColumns(cols)
            .setActions(acs)
            .setSearchConditions(conditions)
            .setSearchActions()
            .setTableTotalRows(ds.totalRows)

        if (this.isBatchFetch)
            tb.setPageParams(this._pageParams.setTotalRows(ds.totalRows))

        if (this.reloadStore.reloadPageParams) {
            let param = new PageTablePageParams(this.reloadStore.reloadPageParams)
            tb.setPageParams(param)
        }
        layout.EntitySections.push(tb);
    }
    public async SetEvent_TableToolbarAction(currentAction: PageAction, selectRows?: Array<any>, sec?: PageSection) {

        let def = new DrawerFormDefinitionBase({
            view: this,
            sec: sec,
            currentAction: currentAction,
            service: this._svc,
            selectRows: selectRows,
            tempDatas: this._pageIndex  // 用於刪除時（批次撈資料模式），記錄當前頁數
        });


        if (currentAction.Type == PageTableActionEnum.TableRowAdd) {
            def.setFormAction = DrawerFormFunctionPattern.setCreateFormAction;
            this.DrawerView = await DrawerFormFactory.createForm(def);
        }
        else if (currentAction.Type == PageTableActionEnum.TableDeletes) {
            if (selectRows != null && selectRows.length > 0) {
                // def.setFormAction = DrawerFormFunctionPattern.setDeletesFormAction;
                // this.DrawerView = DrawerFormFactory.deleteForm(def).setMessage();
                let defDialog = new DialogFormDefinitionBase({
                    view: this,
                    sec: sec,
                    currentAction: currentAction,
                    service: this._svc,
                    selectRows: selectRows,
                    tempDatas: this._pageIndex
                });
                defDialog.setFormAction = DrawerFormFunctionPattern.setDeletesFormAction
                this.DialogView = await DialogFormFactory.deleteForm(defDialog)
                this.OpenDialog();
                return
            }
            else {
                this.currentToast.setWarn().setToast("提醒", "請先選擇預刪除資料!");
                return;
            }
        }
        this.OpenDrawer();
        return;
    }
    public async SetEvent_TableRowAction(currentAction: PageAction, item?: any, sec?: PageSection) {

        let def = new DrawerFormDefinitionBase({
            view: this,
            sec: sec,
            currentAction: currentAction,
            service: this._svc,
            selectRows: [item],
            selectItem: item,
            tempDatas: this._pageIndex  // 用於刪除時（批次撈資料模式），記錄當前頁數
        });

        if (currentAction.Type == PageTableActionEnum.TableRowEdit) {
            def.setFormAction = DrawerFormFunctionPattern.setEditorFormAction
            this.DrawerView = await DrawerFormFactory.editorForm(def);
            this.DrawerView.setWidth(this.drawerWidth);
        }

        else if (currentAction.Type == PageTableActionEnum.TableRowDelete) {
            // def.setFormAction = DrawerFormFunctionPattern.setDeletesFormAction
            // this.DrawerView = await DrawerFormFactory.deleteForm(def);
            let defDialog = new DialogFormDefinitionBase({
                view: this,
                sec: sec,
                currentAction: currentAction,
                service: this._svc,
                selectRows: [item],
                selectItem: item,
                tempDatas: this._pageIndex
            });
            defDialog.setFormAction = DrawerFormFunctionPattern.setDeletesFormAction
            this.DialogView = await DialogFormFactory.deleteForm(defDialog)
            this.OpenDialog();
            return
        }

        else if (currentAction.Type == PageTableActionEnum.TableRowView) {
            let selPKID = item[this._svc.getPKIDName()];
            let entityName = this.getEntityName();
            let param = `${PageRouterParamEnum.SOURCE}=${entityName}&${PageRouterParamEnum.PKID}=${selPKID}`;
            let url = `/${entityName}Info/${param}`;
            this.RouterPath.setRouter(url);
            return;
        }

        this.OpenDrawer();
        return;
    }
    public async SetEvent_TableSearchAction(currentAction: PageAction, conditions?: any, sec?: PageSection) {
        const a = "";
        this.OpenProgressBar();
        // let ds = await this._svc.searchEntityDatas(conditions);
        this.resetPageIndex()  // 如果搜尋就要重整當前頁碼
        this.reloadStore.reloadSearchCondition = conditions;
        let ds = await this._svc.searchEntityDatasByPageRow(conditions, this._pageIndex, this.pageRows);
        let targetSection = this.getEntitySectionById(sec.Id) as PageSectionSearchTable;
        if (targetSection != null) {
            targetSection.setSearchConditions(conditions)
            targetSection.setDatas(ds.data).setTableTotalRows(ds.totalRows);
            if (this.isBatchFetch)
                targetSection.TableOps.PageParams.setTotalRows(ds.totalRows).resetPageParam()
        }
        this.CloseProgressBar();
        return;
    }

    public async SetEvent_TablePageChange(event: any, sec?: PageSection, conditions?: any) {
        this.OpenProgressBar();
        let tableSec = this.getEntitySectionByPath(sec.Path) as PageSectionSearchTable
        this._pageIndex = event.page + 1
        this.pageRows = event.rows
        this.reloadStore.reloadPageParams.setPageIndex(event.page + 1).setPageRows(event.rows).setTotalRows(event.totalRows).setFirst(event.first)
        tableSec.TableOps.PageParams.setPageRows(this.pageRows)
        // let newData = await this._svc.getEntityDatasByPageRow(null, this._pageIndex, this._pageRows)
        let newData = await this._svc.searchEntityDatasByPageRow(conditions, this._pageIndex, this.pageRows)
        tableSec.TableOps.PageParams.setPageIndex(this._pageIndex).setFirst(event.first).setTotalRows(newData.totalRows)
        tableSec.setDatas(newData.data)
        this.CloseProgressBar();
    }

    // 最近查看 section
    public getRecentlyViewed(datas: Array<any>) {

        let ds = datas.map((x) => {
            return new PageCardItem({
                Id: x.id,
                Title: x.name,
                Content: x.agentDescription ?? '',
                //SubIconL: "ic_bot"
            })
            // .setSubTitleHtml((cardItem) => {
            //     return "<span class='text-[12px]'>已使用 23 次</span>";
            // });
        });

        let sec2 = new PageSectionProjectCard()
            .setTitle('最近查看專案')
            .setPath("Recently_Viewed")
        sec2.setDatas(ds)
            .setTabId('Basic')

        this.EntitySections.splice(0, 0, sec2);

    }

    // 沒資料時的 New 畫面
    public getDataEmptyByNew() {

        let sec = new PageSectionEmptyNew()
            .setPanel(false)
            .setPath("EmptyNew")
            .setTitle('AI_Agent.Add_Project_Title')
            .setDesc('AI_Agent.Add_Project_Desc')
            .setActions([
                new PageAction({ Type: PageTableActionEnum.PageAction, Text: "AI_Agent.Add_Project", Icon: "pi pi-plus", Id: "New" })
                    .setBtnStyle(false, false, PageItemSeverityStyle.NONE),
            ])

        this.EntitySections.push(sec)

    }

    public async updateNewAfter() {
        if (this.EntitySections.find(x => x.Path == "EmptyNew") == null)
            return;

        let ds = null;
        if (this.reloadStore.reloadSearchCondition) {
            ds = await this._svc.searchEntityDatasByPageRow(this.reloadStore.reloadSearchCondition, this.reloadStore.reloadPageParams.PageIndex, this.reloadStore.reloadPageParams.PageRows);
        } else {
            ds = await this._svc.getEntityDatasByPageRow(null, this._pageIndex, this.pageRows);
        }

        if (ds?.data.length == 0) {
            return;
        }

        this.EntitySections.length = 0;
        this.getSearchTableSection(ds);
    }

}
