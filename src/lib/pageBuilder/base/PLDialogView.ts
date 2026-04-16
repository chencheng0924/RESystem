import { PageView } from "../core/PageView";
import { PageEventBus, PageEventBusItem, PageEventEnum } from "../mitt/PageEventBus";
import { DialogTitleItem } from "../model/DialogTitleItem";

export class PLDialogView extends PageView {

    constructor(init?) {
        super(init);

    }
    public updateAllView() {
        PageEventBus.getInstance.triggerEvent(
            new PageEventBusItem().setEventName(PageEventEnum.PageSecUpdateAll)
        );

    }

    public updateDialogAllView(dialogTitle?: DialogTitleItem, isRefresh: boolean = true) {

        if (dialogTitle) {
            PageEventBus.getInstance.triggerEvent(
                new PageEventBusItem().setEventName(PageEventEnum.PageDialogUpdate).setData(dialogTitle)
            );
        }

        if (isRefresh) {
            this.updateAllView()
        }

    }

}