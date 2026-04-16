import { PageAction } from "../core/PageAction";
import { PageDrawerSection } from "../core/PageDrawerSection";
import { PageSection, PageSectionDataTable, PageSectionForm } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { PageTag } from "../core/PageTag";
import { IGetListEx } from "../interface/IGetList";
import { PageFormItem } from "../core/PageFormItem";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { IPLSingleSearchService } from "../interface/IPLSingleSearchService";
import { PLSingleSearch } from "../base/PLSingleSearch";
import { BaseKeyValue } from "../model/BaseKeyValue";


export class DrawerFormDefinitionBase {
    public view?: PageView;
    public sec?: PageSection;
    public currentAction?: PageAction;
    public service?: any;
    public selectItem: any;//Entity
    public selectRows?: Array<any>;//刪除多選
    public entity?: any;//當前物件
    public wfProcessentity?: any;//流程物件
    public wfTaskentity?: any;//任務物件
    public tempDatas?: any;
    public tempFactory?: any;

    public getSelectItemValue?: Function = (def: DrawerFormDefinitionBase, item: any, field: string) => { return item[field]; }
    public setFormItemDefinition?: Function = async (def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) => {
        return Promise.resolve(currentItems);
    };
    public setFormAction?: Function = async (def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) => { };
    public setFormActionBeforeCheck?: Function = async (def: DrawerFormDefinitionBase, selectItem: PageFormItem) => { return true };// true :通過

    constructor(init?) {
        Object.assign(this, init);
    }

    public cloneItemAndAddId(formItems: Array<PageFormItem>, key: string, id: string) {
        let newdata = { item: [] };
        newdata = Object.assign(newdata, { item: formItems });
        newdata.item.push(new PageFormItem({ Field: key, Value: id }));
        return newdata.item;
    }
    setControllerEntity(entityType: string, entityPKID: string) {
        this.entity = new BaseKeyValue().setKey(entityPKID).setValue(entityType);
        return this;
    }
}


export class TableAddForm extends PageDrawerSection {
    private _formDefinition?: DrawerFormDefinitionBase;
    constructor(def: DrawerFormDefinitionBase) {
        super(def.sec, def.currentAction);
        this._formDefinition = def;

    }
    getFormDefinition() {
        return this._formDefinition;
    }
    getTag() {
        let tag = new PageTag();
        return tag.setText("Components.Drawer.Add").setPrimary();

    }
    async getForm(adjuseAddCondition: boolean = false) {
        let tableSec = this.SourceSection;
        let items = tableSec.TableOps?.Columns.filter(x => x.CanEdit).map((x, index) => {
            let item = x.toPageFormItem(tableSec.Path).SetRowIndex(index);
            if (x.minDateByToDay)
                item.setMinDateByToDay();

            return item;
        });
        if (items?.length > 0 && adjuseAddCondition) {
            items = items.filter(x => x.addConditionShow)
        }

        if (items != null && items.length > 0) {
            items = IGetListEx.setGetList(items, this._formDefinition.view, tableSec, "value");
        }
        if (this._formDefinition.setFormItemDefinition != null)
            items = await this._formDefinition.setFormItemDefinition(this._formDefinition, items);

        let formsSec = new PageSectionForm();
        formsSec.setId("tableAdd_Drawer")
        formsSec.setTitle(tableSec.Title);
        if (!!tableSec.Badge.Text)
            formsSec.SetBadge(tableSec.Badge);
        else
            formsSec.SetBadge(this.getTag());

        formsSec.setActions();
        formsSec.setItems(items);


        this.DrawerSection = formsSec
        this.DrawerSection.WhosCallDreawer = "Add";
        return this;
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        let servie = this._formDefinition.service;
        if (currentAction.Type != PageTableActionEnum.TableOk) {
            view.CloseDrawer();
            return view;
        }

        let sec = this.DrawerSection;

        // 檢查必填
        let isok = sec.FormOps.HasRequestEmptyValue();
        if (isok) {
            view.DrawerView.Message.setDanger().setText("請填寫必填資料");
            return view;
        }

        // 檢查新增用戶密碼
        let checkPassword = sec.FormOps.CheckPassword();
        if (!checkPassword) {
            view.DrawerView.Message.setDanger().setText("請確認密碼");
            return view;
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, sec.FormOps.FormItems);


        view.CloseDrawer();
        view.DrawerView.SourceSection.update();
        view.DrawerView.refresh();
        return view;
    }

}

export class TableEditForm extends TableAddForm {
    constructor(def: DrawerFormDefinitionBase) {
        super(def);
    }
    getTag() {
        let tag = new PageTag();
        return tag.setText("Components.Drawer.Edit").setHelp();

    }
    async setCurrentItemData() {
        await this.getForm();
        let def = this.getFormDefinition();
        let item = def.selectItem;
        let replaceValue = def.getSelectItemValue;
        if (item == null)
            return this;

        this.DrawerSection.WhosCallDreawer = "Edit";
        this.DrawerSection.setRowObject(def.selectItem);
        this.DrawerSection.FormOps.FormItems.forEach((x) => {
            x.Value = item[x.Field];
            if (replaceValue != undefined && replaceValue != null) {
                x.Value = replaceValue(def, item, x.Field);
            }
            x.setDateValueFormate();
        })
        return this;
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        let self = this;
        if (currentAction.Type != PageTableActionEnum.TableOk) {
            view.CloseDrawer();
            return view;
        }

        let sec = this.DrawerSection;

        // 檢查必填
        let isok = sec.FormOps.HasRequestEmptyValue();
        if (isok) {
            view.DrawerView.Message.setDanger().setText("請填寫必填資料");
            return view;
        }

        if (this.getFormDefinition().setFormAction != null)
            await this.getFormDefinition().setFormAction(this.getFormDefinition(), sec.FormOps.FormItems);

        view.CloseDrawer();
        view.DrawerView.SourceSection.update();
        view.DrawerView.refresh();
        return view;
    }
}

export class TableDeletsForm extends PageDrawerSection {
    private _formDefinition?: DrawerFormDefinitionBase;
    constructor(def: DrawerFormDefinitionBase) {
        super(def.sec, def.currentAction);
        this._formDefinition = def;
        this.getForm();
    }
    setSelectDatas(selectRows: Array<any>) {
        this._formDefinition.selectRows = selectRows;
        return this;
    }
    getTag() {
        let tag = new PageTag();
        return tag.setText("Components.Drawer.Delete").setSeverity(PageItemSeverityStyle.DANGER);
    }
    getForm() {
        let title = this.SourceSection.Title;
        let formsSec = new PageSectionForm();
        formsSec.setId("tableDelete_Drawer")
        formsSec.setTitle(title).SetBadge(this.getTag());
        formsSec.setActions();

        this.DrawerSection = formsSec;

    }
    setMessage(txt: string = 'Components.Drawer.Delete_Confirm') {

        //let txt = "確定刪除嗎?";
        this.Message.setInfo().setText(txt)

        return this;
    }

    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        if (currentAction.Type != PageTableActionEnum.TableOk) {
            view.CloseDrawer();
            return view;
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, null);

        view.setInfoToast("操作完成");
        view.CloseDrawer();
        view.DrawerView.SourceSection.update();
        view.DrawerView.refresh();
        return view;
    }
}

//----------------------------------------------------------
// DrawerFormFactory
export class DrawerFormFactory {
    static async createForm(def: DrawerFormDefinitionBase) {
        return await new TableAddForm(def).getForm(true)
    }
    static async editorForm(def: DrawerFormDefinitionBase) {
        return await new TableEditForm(def).setCurrentItemData();
    }
    static deleteForm(def: DrawerFormDefinitionBase) {
        return new TableDeletsForm(def);
    }
}


export class DrawerFormFunctionPattern {
    static async setCreateFormAction(def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) {
        let service: IPLSingleSearchService = def.service;
        let view = def.view;
        let newItem = await service.createEntityDatas(currentItems);

        // let ds = await service.getEntityDatas();
        let pageRow = (def.view as PLSingleSearch).pageRows;
        let ds = await service.getEntityDatasByPageRow(currentItems, 1, pageRow);
        // 找到表格section
        let targetSection = view.getEntitySectionById(def.sec.Id) as PageSectionDataTable;
        if (targetSection != null && newItem != null) {
            targetSection.setDatas(ds.data).setTableTotalRows(ds.totalRows);
            if ((def.view as PLSingleSearch).isBatchFetch) {
                targetSection.TableOps.PageParams.setTotalRows(ds.totalRows).resetPageParam()
            }
        }
        if (service.errorReturn != null && service.errorReturn.isSuccess == false) {
            def.view.setErrorToast(service.errorReturn.message);
            return;
        }
    }
    static async setDeletesFormAction(def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) {
        let service: IPLSingleSearchService = def.service;
        let view = def.view;

        let key = service.getPKIDName();
        let pkids = def.selectRows?.map(x => x[key]);
        await service.deleteEntityDatas(pkids);

        let targetSection = view.getEntitySectionById(def.sec.Id) as PageSectionDataTable;
        if (targetSection != null) {
            if ((def.view as PLSingleSearch).isBatchFetch) {
                let ds = await service.getEntityDatasByPageRow(currentItems, def.tempDatas, 10);
                targetSection.setDatas(ds.data).setTableTotalRows(ds.totalRows);
                targetSection.TableOps.PageParams.setTotalRows(ds.totalRows).setPageIndex(def.tempDatas).setFirst((def.tempDatas - 1) * (def.view as PLSingleSearch).pageRows)
                return
            }
            pkids.forEach(x => targetSection.deleteDataByRow(x, key))
        }

    }
    static async setEditorFormAction(def: DrawerFormDefinitionBase, currentItems: Array<PageFormItem>) {
        let service: IPLSingleSearchService = def.service;
        let view = def.view;
        let sec = def.sec;// 搜尋table 的items


        let updateItems = def.cloneItemAndAddId(currentItems, service.getPKIDName(), def.selectItem[service.getPKIDName()])
        let editItem = await service.updateEntityDatas(updateItems);

        // 找到表格section
        let targetSection = view.getEntitySectionById(def.sec.Id) as PageSectionDataTable;
        if (targetSection != null) {
            updateItems.forEach((x) => {
                def.selectItem[x.Field] = x.Value;
            })
            targetSection.editDatasByRow(def.selectItem, service.getPKIDName());
        }
    }


}



export class DrawerControllerView extends PageDrawerSection {
    private _formDefinition?: DrawerFormDefinitionBase;
    private currentName?: string = "";
    private currentActions?: Array<PageAction>;
    constructor(def: DrawerFormDefinitionBase, title?: string, actions?: Array<PageAction>) {
        super(def.sec, def.currentAction)
        this._formDefinition = def;
        this.currentName = title ?? '';
        this.currentActions = actions
        this.getForm();

    }

    getForm() {
        if (this.currentName == "")
            this.currentName = 'Title';

        let formsSec = new PageSectionForm()
        formsSec.setId("controllerView_Drawer")
        formsSec.setTitle(this.currentName);
        formsSec.setActions(this.currentActions)

        let kv: BaseKeyValue = this._formDefinition.entity as BaseKeyValue;
        formsSec.setControllerView(true)
            .setControllerEntityType(kv.value)
            .setControllerEntityPKID(kv.key)

        // 也要在 DrawerControllerView 本身設定這些屬性
        this.setControllerView(true)
            .setControllerEntityType(kv.value)
            .setControllerEntityPKID(kv.key)

        this.DrawerSection = formsSec
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {


        if (currentAction.Type != PageTableActionEnum.TableOk) {
            view.CloseDrawer();
            return view;
        }


        const controller = window['AgentTemplateDrawerViiew'];
        if (controller && controller.EntitySections) {
            console.log('controller', controller)
            console.log('EntitySections:', controller.EntitySections.map((s: PageSection) => s.Path))

            // 取得「生成提示詞預覽」section
            const previewSection = controller.EntitySections.find((s: PageSection) => s.Path === 'AiAgent_PreView') as PageSectionForm;
            if (previewSection && previewSection.FormOps) {
                const resultItem = previewSection.FormOps.FormItems?.find(x => x.Field === 'result');
                const promptValue = resultItem.Value;
                console.log('生成提示詞:', promptValue);
            }
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, null);

        view.setInfoToast("操作完成");
        view.CloseDrawer();
        return view;
    }
}