import { PageAction } from "../core/PageAction";
import { PageDialogSection } from "../core/PageDialogSection";
import { PageFormItem } from "../core/PageFormItem";
import { PageSection, PageSectionDialog } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { IGetListEx } from "../interface/IGetList";
import { PageItem, PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { BaseKeyValue } from "../model/BaseKeyValue";

export class DialogChangeTenantForm extends PageDialogSection {
    private _view;
    private currentTenant?: BaseKeyValue;
    constructor(view: any, sec: PageSection, currentAction: PageAction, tenant?: BaseKeyValue) {
        super(sec, currentAction);
        this._view = view;
        this.currentTenant = tenant;
        this.getForm();
    }

    getForm() {
        let tableSec = this.SourceSection;
        let items = [];
        items.push(new PageFormItem({
            Field: "dialogchangeTenants",
            Name: "View.UserProfile.Tenant", Id: "dialogchangeTenants", Value: this.currentTenant, Type: PageItem.Select
        }).setRequest(true))

        items = IGetListEx.setGetList(items, this._view, tableSec);
        PageFormItem.setOptionLabel(items, "dialogchangeTenants", "value");
        let formsSec = new PageSectionDialog();
        formsSec.setId("changeTenants")
        formsSec.setTitle('變更當前租戶');
        formsSec.setActions([
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Components.STForm.Confirm", Icon: "pi pi-check", Id: "ok" })
                .setBtnStyle(true, false, PageItemSeverityStyle.NONE),
            new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Components.STForm.Cancel", Icon: "pi pi-times", Id: "cancel" })
                .setBtnStyle(false, true, PageItemSeverityStyle.DANGER)
        ]
        );
        formsSec.setItems(items);

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

        let sec = this.DialogSection;
        sec.FormOps.FormItems = sec.FormOps?.FormItems.map(x => new PageFormItem(x));
        // 檢查必填
        let isok = sec.FormOps.HasRequestEmptyValue();
        if (isok) {
            view.DrawerView.Message.setDanger().setText("請填寫必填資料");
            return view;
        }
        let item = sec.FormOps.FormItems.find(x => x.Id == "dialogchangeTenants");
        this.setData(item.Value);
        view.CloseDialog();
        return view;
    }

}

export class FastDialogChangeTenantForm extends PageDialogSection {
    private _view;
    private currentTenant?: BaseKeyValue;
    private currentTenantList?: any
    constructor(view: any, sec: PageSection, currentAction: PageAction, tenant?: BaseKeyValue, tenantList?: any) {
        super(sec, currentAction);
        this._view = view;
        this.currentTenant = tenant;
        this.currentTenantList = tenantList.filter(item => item.key !== "");
        this.getForm();
    }

    getForm() {
        let tableSec = this.SourceSection;
        let items = [];
        items.push(new PageFormItem({
            Field: "fastDialogchangeTenants",
            Name: "", Id: "fastDialogchangeTenants", Value: this.currentTenant, Type: PageItem.RadioButton
        }).setList(this.currentTenantList))
        items = IGetListEx.setGetList(items, this._view, tableSec);
        PageFormItem.setOptionLabel(items, "fastDialogchangeTenants", "value");
        let formsSec = new PageSectionDialog();
        formsSec.setId("changeTenants")
        formsSec.setTitle('切換租戶');
        formsSec.setActions([

            new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Components.STForm.Cancel", Id: "cancel" })
                .setBtnStyle(false, false, PageItemSeverityStyle.CONTRAST),
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Components.STForm.Confirm", Id: "ok" })
                .setBtnStyle(false, false, PageItemSeverityStyle.NONE),
        ]
        );
        formsSec.setItems(items);
        formsSec.SectionClass = 'pt-[28px] pb-[11px]'
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

        let sec = this.DialogSection;
        sec.FormOps.FormItems = sec.FormOps?.FormItems.map(x => new PageFormItem(x));
        // // 檢查必填
        // let isok = sec.FormOps.HasRequestEmptyValue();
        // if (isok) {
        //     view.DrawerView.Message.setDanger().setText("請填寫必填資料");
        //     return view;
        // }
        let item = sec.FormOps.FormItems.find(x => x.Id == "fastDialogchangeTenants");
        this.setData(item.Value);
        view.CloseDialog();
        return view;
    }
}
