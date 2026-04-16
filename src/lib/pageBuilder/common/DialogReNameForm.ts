import { PageAction } from "../core/PageAction";
import { PageDialogSection } from "../core/PageDialogSection";
import { PageFormItem } from "../core/PageFormItem";
import { PageSection, PageSectionDialog } from "../core/PageSection";
import { PageView } from "../core/PageView";
import { PageTableActionEnum } from "../enum/PageActionEnum";

export class DialogReNameForm extends PageDialogSection {

    private currentName?: string = '';
    constructor(sec: PageSection, currentAction: PageAction, name?: string) {
        super(sec, currentAction);

        this.currentName = name;
        this.getForm();
    }

    getForm() {
        let tableSec = this.SourceSection;
        let items = [];
        items.push(new PageFormItem({ Name: "名稱", Id: "rename", Value: this.currentName }).setRequest(true))

        let formsSec = new PageSectionDialog();
        formsSec.setId("reName")
        formsSec.setTitle('重新命名');
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
        let item = sec.FormOps.FormItems.find(x => x.Id == "rename");
        if (item != null) {
            this.LastName = item.Value;
        }

        view.CloseDialog();
        return view;
    }

}
