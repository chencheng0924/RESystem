// 指令種類

import { CommangBaseStrategy } from "./Command.model";

// 1.Host(預設)
export class HostStrategy extends CommangBaseStrategy {

    constructor() {
        super(new HostController());
    }
    execute() {
        return super.execute();
    }
}




class HostController {
    constructor() {
    }
    // 測試歡迎語
    showWelcome(params) {
        console.log('HostController->showWelcome', params)
    }
}