import { PageAction } from "../core/PageAction";
import { PageDrawerSection } from "../core/PageDrawerSection";
import { PageFormItem } from "../core/PageFormItem";
import { PageSectionForm } from "../core/PageSection";
import { PageTag } from "../core/PageTag";
import { PageView } from "../core/PageView";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { DrawerFormDefinitionBase } from "./DrawerForm";

export class DrawerFormImageUpload extends PageDrawerSection {
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
        return tag.setText("上傳圖片").setPrimary();

    }
    async getForm(title: string = '', items: Array<PageFormItem>) {
        let tableSec = this.SourceSection;

        let formsSec = new PageSectionForm();
        formsSec.setId("tableAdd_Drawer")

        formsSec.setTitle(title == '' ? tableSec.Title : title);
        if (!!tableSec.Badge.Text)
            formsSec.SetBadge(tableSec.Badge);
        else
            formsSec.SetBadge(this.getTag());

        formsSec.setActions([
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "離開", Icon: "pi pi-check", Id: "ok" })
                .setBtnStyle(true, false, PageItemSeverityStyle.NONE),
        ]);
        formsSec.setItems(items);

        this.DrawerSection = formsSec

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

        if (this._formDefinition.setFormAction != null)
            await this._formDefinition.setFormAction(this._formDefinition, sec.FormOps.FormItems);


        view.CloseDrawer();
        return view;
    }

}