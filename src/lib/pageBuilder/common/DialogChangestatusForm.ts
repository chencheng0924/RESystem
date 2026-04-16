import { BaseKeyValue } from "../model/BaseKeyValue";
import { PageAction } from "../core/PageAction";
import { PageDialogSection } from "../core/PageDialogSection";
import { PageFormItem } from "../core/PageFormItem";
import { PageSection, PageSectionDialog } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { IGetListEx } from "../interface/IGetList";
import { PageItem } from "../enum/PageFormItemEnum";

export class DialogChangestatusForm extends PageDialogSection {
    private _view;
    private currentStatus?: BaseKeyValue;
    constructor(view: any, sec: PageSection, currentAction: PageAction, status?: BaseKeyValue) {
        super(sec, currentAction);
        this._view = view;
        this.currentStatus = status;
        this.getForm();
    }

    getForm() {
        let tableSec = this.SourceSection;
        let items = [];
        items.push(new PageFormItem({
            Field: "dialogChangeStatus",
            Name: "狀態", Id: "dialogChangeStatus", Value: this.currentStatus, Type: PageItem.Select
        }).setRequest(true))

        items = IGetListEx.setGetList(items, this._view, tableSec);
        PageFormItem.setOptionLabel(items, "dialogChangeStatus", "value");
        let formsSec = new PageSectionDialog();
        formsSec.setId("changeStatus")
        formsSec.setTitle('變更狀態');
        formsSec.setActions();
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
        let item = sec.FormOps.FormItems.find(x => x.Id == "dialogChangeStatus");
        this.setData(item.Value);
        view.CloseDialog();
        return view;
    }

}
