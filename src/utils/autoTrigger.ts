import { addInterval, removeInterval } from '@/utils/intervalManager'

export class CountTime {
  duration: number
  callback: Function
  intervalCallback?: Function
  private remainingSeconds: number
  intervalId: any
  checkStart?: boolean
  checkValue?: boolean
  constructor(duration: number, callback: Function) {
    this.duration = duration; // 計時器持續時間(以毫秒為單位)
    this.callback = callback; // 計時器到期時要執行的回調函數
    this.remainingSeconds = duration / 1000; // 剩餘秒數
    this.intervalId = null;
    this.checkStart = false
  }

  public start() {
    this.checkStart = true
    this.intervalId = window.setInterval(() => {
      this.remainingSeconds--;
      if (this.intervalCallback != null)
        this.intervalCallback();
      //console.log(" this.remainingSeconds", this.remainingSeconds);
      if (this.remainingSeconds <= 0) {
        this.callback();
        this.reset();
      }
    }, 1000);

    // 將新的計時器 ID 添加到全局變數中
    if (this.intervalId !== null) {
      addInterval(this.intervalId)
    }
  }

  public stop() {
    this.checkStart = false
    if (this.intervalId) {
      // 從全局變數中移除計時器 ID
      removeInterval(this.intervalId)
      window.clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  public reset() {
    this.remainingSeconds = this.duration / 1000;
  }
  public getDisplayTime() {
    return this.remainingSeconds;
  }
}