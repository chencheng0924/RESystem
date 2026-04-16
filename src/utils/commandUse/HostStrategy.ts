import { CommandEntity, convertToArray } from './commandUse'
import { CommangBaseStrategy } from './commandStrategy'

// 指令種類
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