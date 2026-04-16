import { EnvUtils } from "@/utils/envUtils";
import { IStockStrategy } from "./IStockStrategy";
import { SignalRConnect } from "./SignalRConnect";

let signalRURL = EnvUtils.getEventHubUrl();
export class StockFactory {

    static _instance: StockFactory = null;
    static startSignalR(autoEnd: boolean = true) {
        if (autoEnd && StockFactory._instance != null) {
            StockFactory._instance.disConnect();
            StockFactory._instance = null;
        }
        // console.log(StockFactory._instance)
        if (StockFactory._instance == null) {
            let instance = new StockFactory(new SignalRConnect(signalRURL));
            StockFactory._instance = instance;


        }


        StockFactory._instance.startConnect();
        return StockFactory._instance;
    }
    static endSignalR() {
        // console.log(StockFactory._instance)
        if (StockFactory._instance == null) {
            let instance = new StockFactory(new SignalRConnect(signalRURL));
            StockFactory._instance = instance;


        }
        StockFactory._instance.disConnect();
        return StockFactory._instance;
    }


    private _stockInstance: IStockStrategy;

    constructor(instance: IStockStrategy) {
        this._stockInstance = instance;
    }

    public async startConnect() {
        if (StockFactory._instance._stockInstance == null) {
            return;
        }
        try {

            // 連線
            await StockFactory._instance._stockInstance.startConnect();
        } catch (ex) {

        }


    }
    public async disConnect(callBack?: Function) {
        if (StockFactory._instance._stockInstance == null) {
            return;
        }
        try {
            // 斷線
            await StockFactory._instance._stockInstance.disConnect(callBack);
        } catch (ex) {

        }
    }

    public async send(event: string, data: any) {
        await StockFactory._instance.send(event, data);
    }


}