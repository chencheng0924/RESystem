import { CommangBaseStrategy } from "@/lib/commandFactory/Command.model";


// 主要視窗的控制
export class HostStrategy extends CommangBaseStrategy {

    constructor() {
        super(new HostController());
    }
    execute() {
        const message = super.execute();
        return message;
    }
}

class HostController {
    private commandTriggerStore: any
    constructor() {
        this.commandTriggerStore = [];// commandTriggerStore()
    }
    // 打開對話視窗
    openDialog(params) {
        console.log("HostController->openDialog ", params);
        if (params.msg) {
            params.msg = JSON.parse(params.msg)
        }
        const item = {
            show: true,
            isSignalR: true,
            data: params,
            sessionId: params.sessionId,
            type: 'camera'
        }
        this.commandTriggerStore.watchForDialog.push(item)
        return this.commandTriggerStore.watchForDialog
    }
    // 打開新視窗
    openNewTab(params) {

        console.log("HostController->openNewTab ", params);
    }
    // 倒頁
    redirect(params) {

        console.log("HostController->redirect ", params);
    }
    // 改變主要 dashboard
    displayDashboard(params) {

        console.log("HostController->displayDashboard ", params);
    }
    // 顯示 alert
    showAlert(params) {
        console.log("HostController->showAlert ", params);
        if (params.msg) {
            params.msg = JSON.parse(params.msg)
            const keywords = ["淹水"];
            const check = keywords.some(key => params.msg.event_type.includes(key))
            const checkSame = this.commandTriggerStore.saveAlertList.findIndex(item => item.place == params.msg.place)
            if (check && (checkSame == -1)) {
                this.commandTriggerStore.saveAlertList.push(params.msg)
            }
        }
        if (params.msg.title) {
            params.msg.Description = params.msg.title
        }
        if (params.msg.event_type) {
            params.msg.type = params.msg.event_type
        }
        const item = {
            show: true,
            isSignalR: true,
            data: params,
        }
        this.commandTriggerStore.watchForAlert.push(item)
    }
    showHighchart(params) {
        console.log("HostController->showHighchart ", params);
    }

    // 測試歡迎語
    showWelcome(params) {
        // this.commandTriggerStore.watchForDialog = true
        console.log('HostController->showWelcome', params)
    }

    showDrawerByBus(params) {
        console.log('HostController->showDrawerByBus', params)
        this.commandTriggerStore.watchForBusItemData = {
            routeId: params.routeId,
            dir: params.dir,
            platenum: params.platenum,
            show: true
        }
    }
}