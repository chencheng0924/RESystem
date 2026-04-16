import { DrawerFormDefinitionBase, DrawerFormFactory } from "../common/DrawerForm";
import { PageFormItem } from "../core/PageFormItem";
import { PageSectionDataTable } from "../core/PageSection";
import { PageTablePageParams } from "../core/PageTableColumn";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { IPLSingleViewSubTableService } from "../interface/IPLSingleViewSubTableService";
import { BaseResponseCode } from "../service/BaseResponseCode";

export class PLSingleViewSubTable extends PageSectionDataTable {

    public isBatchFetch: boolean = false;  // 是否批次撈資料
    private _pageIndex: number = 1;  // 用於批次撈資料（固定一開始從第一頁）
    public pageRows: number;  // 用於批次撈資料（固定一開始撈 10 筆）
    private _pageParams?: PageTablePageParams


    constructor() {
        super();
        this._pageParams = new PageTablePageParams();
    }

    public async SetEvent_TableToolbarAction(def: DrawerFormDefinitionBase, properity: string) {
        if (def.currentAction.Type == PageTableActionEnum.TableRowAdd) {
            await this.setTableRowAdd(def, properity);

        } else if (def.currentAction.Type == PageTableActionEnum.TableDeletes) {
            if (def.selectRows == null && def.selectRows.length == 0) {
                def.view.currentToast.setWarn().setToast("提醒", "請先選擇預刪除資料!");
                return;
            }
            await this.setTableDeletes(def, properity);
        }
    }
    public async SetEvent_TableRowAction(def: DrawerFormDefinitionBase, properity: string) {
        if (def.currentAction.Type == PageTableActionEnum.TableRowEdit) {
            await this.setTableEditor(def, properity);
        } else if (def.currentAction.Type == PageTableActionEnum.TableRowDelete) {
            if (def.selectRows == null && def.selectRows.length == 0) {
                def.view.currentToast.setWarn().setToast("提醒", "請先選擇預刪除資料!");
                return;
            }
            await this.setTableDeletes(def, properity);
        }
    }
    private async setTableRowAdd(def: DrawerFormDefinitionBase, properity: string) {
        def.setFormAction = async (def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) => {
            let service: IPLSingleViewSubTableService = def.service as IPLSingleViewSubTableService;
            let view = def.view;
            let entity = def.entity;
            let newItem = await service.createEntityBySubTable(entity, currentItems);
            let currentEntity = await service.getEntity(entity.id, false);
            let ds = [];
            if (currentEntity.hasOwnProperty(properity))
                ds = currentEntity[properity];

            let targetSection = view.getEntitySectionById(def.sec.Id) as PageSectionDataTable;
            if (targetSection != null && newItem != null) {
                targetSection.setDatas(ds);
            }
        };
        def.view.DrawerView = await DrawerFormFactory.createForm(def);
    }
    private async setTableDeletes(def: DrawerFormDefinitionBase, properity: string) {
        def.setFormAction = async (def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) => {
            let service: IPLSingleViewSubTableService = def.service as IPLSingleViewSubTableService;
            let view = def.view;
            let key = service.getPKIDName();
            let pkids = def.selectRows?.map((x) => x[key]);
            await service.deleteEntityBySubTable(pkids);
            let entity = def.entity;
            let currentEntity = await service.getEntity(entity.id, false);
            let ds = [];
            if (currentEntity.hasOwnProperty(properity))
                ds = currentEntity[properity];

            let targetSection = view.getEntitySectionById(def.sec.Id) as PageSectionDataTable;
            if (targetSection != null) {
                targetSection.setDatas(ds);
            }
        };
        def.view.DrawerView = DrawerFormFactory.deleteForm(def).setMessage();
    }
    private async setTableEditor(def: DrawerFormDefinitionBase, properity: string) {
        // 子表格的動作可以自行setFormAction
        if(!def.currentAction.resFormAction){
            def.setFormAction = async (def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) => {
                let service: IPLSingleViewSubTableService = def.service as IPLSingleViewSubTableService;
                let view = def.view;
                let entity = def.entity;
                def.sec.FormOps.FormItems = currentItems;
                let updateItems = def.sec.FormOps.cloneItemAndAddId(service.getPKIDName(), def.selectItem[service.getPKIDName()]);
                let newItem = await service.updateEntityBySubTable(entity, updateItems)
                let currentEntity = await service.getEntity(entity.id, false);
                let ds = [];
                if (currentEntity.hasOwnProperty(properity))
                    ds = currentEntity[properity];
    
                let targetSection = view.getEntitySectionById(def.sec.Id) as PageSectionDataTable;
                if (targetSection != null && newItem != null) {
                    targetSection.setDatas(ds);
                    def.view.setInfoToast('變更成功');
                } else {
                    def.view.setErrorToast('變更失敗');
                }
            }
            
        }
        def.view.DrawerView = await DrawerFormFactory.editorForm(def);
    }


    //----------------------------------------------------------------------------------------------------

    public setIsBatchFetch(isBatchFetch: boolean) {
        this.isBatchFetch = isBatchFetch;
        this.setTablePaginator()

        return this;
    }

    public setTablePaginator() {
        if (this.isBatchFetch == false)
            return this;
        this.pageRows = 10
        this._pageParams = new PageTablePageParams().setPageIndex(this._pageIndex).setPageRows(this.pageRows)  // 預設 1 頁 10 筆

        this.setPageParams(this._pageParams);
        return this;
    }

    public setTotalRow(size: number) {
        this._pageParams.setTotalRows(size);

        this.setTableTotalRows(size)
        return this;
    }
    public setPageIndex(pageIndex: number) {
        this._pageIndex = pageIndex;

        return this;
    }
    public getPageIndex() {
        return this._pageIndex;
    }

}