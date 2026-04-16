import { PageAction } from "../core/PageAction";
import { PageDialogSection } from "../core/PageDialogSection";
import { PageFormItem } from "../core/PageFormItem";
import { PageSection, PageSectionDialog } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItem, PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { BaseKeyValue } from "../model/BaseKeyValue";
import { DialogControllerViewStore } from "@/components/smartcityui/STDialog.model";
import { PageBuilder } from "../base/PageBuilder";

export class DialogFormDefinitionBase {
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
    public getSelectItemValue?: Function = (def: DialogFormDefinitionBase, item: any, field: string) => { return item[field]; }
    public setFormItemDefinition?: Function = async (def: DialogFormDefinitionBase, currentItems: Array<PageFormItem>) => {
        return Promise.resolve(currentItems);
    };
    public setFormAction?: Function = async (def: DialogFormDefinitionBase, currentItems: Array<PageFormItem>) => { };
    public setFormActionBeforeCheck?: Function = async (def: DialogFormDefinitionBase, selectItem: PageFormItem) => { return true };// true :通過

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

export class DialogFormFactory {
    static deleteForm(def: DialogFormDefinitionBase) {
        return new DialogDeleteForm(def);
    }

    static resetForm(def: DialogFormDefinitionBase, title?: string, msg?: string) {
        return new DialogReSetForm(def, title, msg);
    }

    static resetPasswordForm(def: DialogFormDefinitionBase) {
        return new DialogReSetPasswordForm(def);
    }
}
export class DialogReSetPasswordForm extends PageDialogSection {
    private _formDefinition?: DialogFormDefinitionBase;
    private currentName?: string = '';
    constructor(def: DialogFormDefinitionBase) {
        super(def.sec, def.currentAction);
        this._formDefinition = def;
        this.getForm();
    }

    getForm() {
        let formsSec = new PageSectionDialog()
        let items = []
        items.push(new PageFormItem({
            Field: "content",
            Name: "", Id: "content",
            Value: this._formDefinition.view.$t('Dialog.Confirmation_resetConent'),
            Type: PageItem.InputText,
            IsDisplay: true, hasLabel: false
        }))
        formsSec.setItems(items)
        formsSec.setId("resetPasswordConfirm")
        formsSec.setTitle('Dialog.DialogResetPasswordTitle');
        formsSec.setActions([
            new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Dialog.Confirmation_Cancel", Id: "cancel" })
                .setBtnStyle(false, false, PageItemSeverityStyle.CONTRAST),
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Dialog.Confirmation_reset", Id: "ok" })
                .setBtnStyle(false, false, PageItemSeverityStyle.DANGER)
        ]);
        formsSec.SectionClass = "pt-[20px]"
        this.DialogSection = formsSec
    }
    setTitleAndId(title: string, id: string) {
        this.DialogSection.setId(id);
        this.DialogSection.setTitle(title);
        return this;
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        if (currentAction.Type != PageTableActionEnum.TableOk) {

            view.CloseDialog();
            return view;
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, null);

        view.setInfoToast("操作完成");
        view.CloseDialog();
        return view;
    }
}
export class DialogDeleteForm extends PageDialogSection {
    private _formDefinition?: DialogFormDefinitionBase;
    private currentName?: string = '';
    constructor(def: DialogFormDefinitionBase) {
        super(def.sec, def.currentAction);
        this._formDefinition = def;
        this.getForm();
    }

    getForm() {
        let formsSec = new PageSectionDialog()
        let items = []
        items.push(new PageFormItem({
            Field: "content",
            Name: "", Id: "content",
            Value: this._formDefinition.view.$t('Dialog.Confirmation_DeleteContent'),
            Type: PageItem.InputText,
            IsDisplay: true, hasLabel: false
        }))
        formsSec.setItems(items)
        formsSec.setId("deleteConfirm")
        formsSec.setTitle('Dialog.Confirmation_DeleteTitle');
        formsSec.setActions([
            new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Dialog.Confirmation_Cancel", Id: "cancel" })
                .setBtnStyle(false, false, PageItemSeverityStyle.CONTRAST),
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Dialog.Confirmation_OKDelete", Id: "ok" })
                .setBtnStyle(false, false, PageItemSeverityStyle.DANGER)
        ]);
        formsSec.SectionClass = "pt-[20px]"
        this.DialogSection = formsSec
    }
    setTitleAndId(title: string, id: string) {
        this.DialogSection.setId(id);
        this.DialogSection.setTitle(title);
        return this;
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        if (currentAction.Type != PageTableActionEnum.TableOk) {
            console.log('取消')
            view.CloseDialog();
            return view;
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, null);

        view.setInfoToast(this._formDefinition.view.$t("Toast.Info"));
        view.CloseDialog();
        return view;
    }

}

export class DialogReSetForm extends PageDialogSection {
    private _formDefinition?: DialogFormDefinitionBase;
    private currentName?: string = '';
    private currentMessage?: string = '';
    constructor(def: DialogFormDefinitionBase, title?: string, msg?: string) {
        super(def.sec, def.currentAction);
        this._formDefinition = def;
        this.currentName = title;
        this.currentMessage = msg;
        this.getForm();
    }

    getForm() {
        if (this.currentName == "")
            this.currentName = 'Dialog.DialogResetTitle';
        let formsSec = new PageSectionDialog()
        let items = []
        items.push(new PageFormItem({
            Field: "content",
            Name: "", Id: "content",
            Value: this._formDefinition.view.$t(this.currentMessage),
            Type: PageItem.InputText,
            IsDisplay: true, hasLabel: false
        }))
        formsSec.setItems(items)
        formsSec.setId("deleteConfirm")
        formsSec.setTitle(this.currentName);
        formsSec.setActions([
            new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Dialog.Confirmation_Cancel", Id: "cancel" })
                .setBtnStyle(false, true, PageItemSeverityStyle.DANGER).setClass("!w-[4.5rem] !h-[2rem] !flex !justify-center !items-center !text-[12px] !text-foneTextLevel1 !bg-foneBgLevel1 !border-foneBorder !border-solid !border-[1px] !px-2 !rounded-[4px] !cursor-pointer !flex-none"),
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Dialog.DialogReset_OK", Id: "ok" })
                .setBtnStyle(true, false, PageItemSeverityStyle.NONE).setClass("!w-[4.5rem] !h-[2rem] !flex !justify-center !items-center !text-[12px] !text-foneBgLevel1 !bg-foneThemeRed !px-2 !rounded-[4px] !cursor-pointer !border-none !flex-none")
        ]);
        formsSec.SectionClass = "pt-[20px]"
        this.DialogSection = formsSec
    }
    setTitleAndId(title: string, id: string) {
        this.DialogSection.setId(id);
        this.DialogSection.setTitle(title);
        return this;
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        if (currentAction.Type != PageTableActionEnum.TableOk) {

            view.CloseDialog();
            return view;
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, null);

        view.setInfoToast(this._formDefinition.view.$t("Toast.Info"));
        view.CloseDialog();
        return view;
    }

}


export class DialogControllerView extends PageDialogSection {
    private _formDefinition?: DialogFormDefinitionBase;
    private currentName?: string = '';
    constructor(def: DialogFormDefinitionBase, title?: string) {
        super(def.sec, def.currentAction);
        this._formDefinition = def;
        this.currentName = title ?? '';
        this.getForm();
    }

    getForm() {

        if (this.currentName == "")
            this.currentName = 'Dialog.DialogResetTitle';

        let formsSec = new PageSectionDialog()
        formsSec.setId("deleteConfirm")
        formsSec.setTitle(this.currentName);
        // formsSec.setActions([
        //     new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Dialog.Confirmation_Cancel", Id: "cancel" })
        //         .setBtnStyle(false, true, PageItemSeverityStyle.DANGER).setClass("!w-[4.5rem] !h-[2rem] !flex !justify-center !items-center !text-[12px] !text-foneTextLevel1 !bg-foneBgLevel1 !border-foneBorder !border-solid !border-[1px] !px-2 !rounded-[4px] !cursor-pointer !flex-none"),
        //     new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Dialog.DialogReset_OK", Id: "ok" })
        //         .setBtnStyle(true, false, PageItemSeverityStyle.NONE).setClass("!w-[4.5rem] !h-[2rem] !flex !justify-center !items-center !text-[12px] !text-foneBgLevel1 !bg-foneThemeRed !px-2 !rounded-[4px] !cursor-pointer !border-none !flex-none")
        // ]);
        let kv: BaseKeyValue = this._formDefinition.entity as BaseKeyValue;
        formsSec.setControllerView(true)
            .setControllerEntityType(kv.value)
            .setControllerEntityPKID(kv.key)


        this.DialogSection = formsSec
    }
    setTitleAndId(title: string, id: string) {
        this.DialogSection.setId(id);
        this.DialogSection.setTitle(title);
        return this;
    }
    async CallAction(view: PageView, currentAction: PageAction): Promise<PageView> {

        //let controller: PageBuilder = this.getDialogControllerView();


        if (currentAction.Type != PageTableActionEnum.TableOk) {
            console.log('取消')
            view.CloseDialog();
            return view;
        }

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, null);

        view.setInfoToast("操作完成");
        view.CloseDialog();
        return view;
    }

    getDialogControllerView() {
        return DialogControllerViewStore.getController();
    }
}