export enum StockEventEnum {
    SEND, //送出
    RECEIVE // 接收

}

export class StockEventItem {
    public eventName?: string;
    public callBack?: Function;
    public data?: any;
    public type?: StockEventEnum = StockEventEnum.RECEIVE

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
    setCallBack(fun?: Function) {
        this.callBack = fun;
        return this;
    }
}
