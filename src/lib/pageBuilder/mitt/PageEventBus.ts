import mitt from "mitt";

export enum PageEventEnum {
    PageClick = 'PageLayout:Click',
    PageAdd = 'PageLayout:Add',
    PageEdit = 'PageLayout:Edit',
    PageDelete = 'PageLayout:Delete',
    PageConfirm = 'PageLayout:Confirm',
    PageDynamic = 'PageLayout:Dynamic',

    FormItemSaveing = "FormItem:Saveing",  // 儲存中
    FormItemSaved = "FormItem:Saved",  // 已儲存
    FormItemSaveFailed = "FormItem:SaveFailed",  // 儲存失敗

    PageSecUpdateAll = 'PageSection:updateView',
    PageSecUpdateByOne = 'PageSection:updateEntitySection',
    PageSecDrawerUpdate = 'PageSection:updateDrawerSection',
    PageSecUpdateByPageSection = 'PageSection:updatePageSection',

    PageDialogUpdate = 'PageDialog:Update',
    PageDialogClose = 'PageDialog:Close',
    PageDrawerUpdate = 'PageDrawerUpdate:Update',
    PageTableUpdate = 'PageTableUpdate:Update',
    PageGoBack = 'PageGoBack',
    SendToast = 'SendToast',

    ApiError = 'Api:Error'
}

export class PageEventBusItem {
    public eventName?: string;
    public callBack?: Function;
    public data?: any;

    constructor(init?) {
        Object.assign(this, init);
    }
    setEventName(e: string) {
        this.eventName = e;
        return this;
    }
    setData(data: any) {
        this.data = data;
        return this;
    }
}



export class PageEventBus {

    static instance: PageEventBus = null;// 單例
    public static get getInstance(): PageEventBus {
        if (PageEventBus.instance == null) {
            PageEventBus.instance = new PageEventBus();
        }

        return PageEventBus.instance;
    }
    private handlers = new Map<string, any>();

    constructor() { }

    //------------------------------------------------
    //  功能
    private emitter = mitt();
    private eventNames: Array<string> = [
        PageEventEnum.PageClick,
        PageEventEnum.PageAdd,
        PageEventEnum.PageEdit,
        PageEventEnum.PageDelete,
        PageEventEnum.PageConfirm,
        PageEventEnum.PageDynamic,

        PageEventEnum.FormItemSaved,
        PageEventEnum.FormItemSaveing,
        PageEventEnum.FormItemSaveFailed,
        PageEventEnum.PageSecUpdateByPageSection,

        PageEventEnum.PageSecUpdateAll,
        PageEventEnum.PageSecUpdateByOne,
        PageEventEnum.PageSecDrawerUpdate,
        PageEventEnum.PageDialogUpdate,
        PageEventEnum.PageDialogClose,
        PageEventEnum.PageDrawerUpdate,
        PageEventEnum.PageTableUpdate,
        PageEventEnum.PageGoBack,
        PageEventEnum.SendToast,

        PageEventEnum.ApiError
    ]


    // public onMonitor(callBack: Function) {
    //     this.eventNames.forEach((x) => {
    //         PageEventBus.instance.emitter.on(x, (data) => {
    //             callBack(x, data);
    //         })
    //     })
    // }
    // public offMonitor(callBack: Function) {
    //     this.eventNames.forEach((x) => {
    //         PageEventBus.instance.emitter.off(x, (data) => {
    //             callBack(x, data);
    //         })
    //     })

    // }
    public onMonitor(callBack: Function) {
        this.eventNames.forEach((eventName) => {
            const handler = (data) => callBack(eventName, data);
            this.handlers.set(eventName + "_" + callBack.toString(), handler);
            PageEventBus.instance.emitter.on(eventName, handler);
        });
    }
    public offMonitor(callBack: Function) {
        this.eventNames.forEach((eventName) => {
            const key = eventName + "_" + callBack.toString();
            const handler = this.handlers.get(key);
            if (handler) {
                PageEventBus.instance.emitter.off(eventName, handler);
                this.handlers.delete(key);
            }
        });
    }

    public triggerEvent(item: PageEventBusItem) {
        PageEventBus.instance.emitter.emit(item.eventName, item.data);
    }

}