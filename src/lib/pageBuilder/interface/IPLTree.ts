import { DialogConfirmDeleteForm } from "../common/DialogConfirmDeleteForm";
import { DialogReNameForm } from "../common/DialogReNameForm";
import { DialogRequestForm } from "../common/DialogRequestForm";
import { PageAction } from "../core/PageAction";
import { PageSection, PageSectionTree } from "../core/PageSection";
import { PageTreeItem } from "../core/PageTreeItem";
import { PageView } from "../core/PageView";
import { PageTableActionEnum } from "../enum/PageActionEnum";
import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";

export interface IPLTree {
    SetEvent_TreeToolbarAction(action: PageAction, selectRows?: Array<any>, sec?: PageSection);
    SetEvent_DialogAction(action: PageAction, sec?: PageSection);

    reNameNode(currentAction: PageAction, sec: PageSection);
    addItemRoot(currentAction: PageAction, sec: PageSection);
    addItemChildren(currentAction: PageAction, sec: PageSection);
    deleteTreeItem(currentAction: PageAction, sec: PageSection);
    requestTreeItem(currentAction: PageAction, sec: PageSection);
}


export class IPLTreeFactory {
    static getPageSectionTree(ds: Array<PageTreeItem>) {

        let treeTools = [
            new PageAction({ Type: PageTableActionEnum.TableRowAdd, Icon: "pi pi-plus", Id: "add" })
                .setBtnStyle(false, false, PageItemSeverityStyle.NONE),
        ]
        let treeNodeActions = [
            new PageAction({ Type: PageTableActionEnum.TreeNodeAction, Icon: "pi pi-plus", Id: "addChild", Text: "新增子項" }),
            new PageAction({ Type: PageTableActionEnum.TreeNodeAction, Icon: "pi pi-trash", Id: "deleteNode", Text: "刪除" }),
            new PageAction({ Type: PageTableActionEnum.TreeNodeAction, Icon: "pi pi-file-edit", Id: "reNameeNode", Text: "重新命名" }),
            new PageAction({ Type: PageTableActionEnum.TreeNodeAction, Icon: "pi pi-check-square", Id: "isRequest", Text: "必填" }),
        ]

        let sec = new PageSectionTree().setId()
            .setTreeData(ds)
            .setTreeActions(treeTools)
            .setContextActions(treeNodeActions)

        return sec;
    }
    static async SetEvent_TreeToolbarAction(view: PageView, action: PageAction, selectRows?: Array<any>, sec?: PageSection) {
        if (action.Type == PageTableActionEnum.TreeNodeAction) {
            const oneNode = selectRows.firstOrDefault();
            if (oneNode == null)
                return;
            if (action.Id == "addChild") {
                view.DialogView = new DialogReNameForm(sec, action).setData(oneNode).setTitleAndId("新增子項", "addItemChildren");
                view.OpenDialog();

            }
            else if (action.Id == "deleteNode") {
                view.DialogView = new DialogConfirmDeleteForm(sec, action).setData(oneNode);
                view.OpenDialog();


            }
            else if (action.Id == "reNameeNode") {

                view.DialogView = new DialogReNameForm(sec, action, oneNode.topic).setData(oneNode);
                view.OpenDialog();

            }
            else if (action.Id == "isRequest") {

                view.DialogView = new DialogRequestForm(sec, action, oneNode.isRequired).setData(oneNode);
                view.OpenDialog();

            }
        }
        else if (PageTableActionEnum.TableRowAdd) {
            view.DialogView = new DialogReNameForm(sec, action).setTitleAndId("新增", "addItemRoot");
            view.OpenDialog();
        }




    }

    static async SetEvent_DialogAction(view: IPLTree, action: PageAction, sec?: PageSection) {

        //console.log("SetEvent_DialogAction", action);
        if (action.Type == PageTableActionEnum.TableOk && sec.Id == "reName")
            await view.reNameNode(action, sec);
        else if (action.Type == PageTableActionEnum.TableOk && sec.Id == "addItemChildren")
            await view.addItemChildren(action, sec);
        else if (action.Type == PageTableActionEnum.TableOk && sec.Id == "addItemRoot")
            await view.addItemRoot(action, sec);
        else if (action.Type == PageTableActionEnum.TableOk && sec.Id == "deleteConfirm")
            await view.deleteTreeItem(action, sec);
        else if (action.Type == PageTableActionEnum.TableOk && sec.Id == "isRequest")
            await view.requestTreeItem(action, sec);

    }
}