import { StockEventItem } from "./StockEventItem";

export interface IStockStrategy {
    connection?: any;
    startConnect(url?: string, callback?: Function);
    disConnect(callback?: Function, lastChatRoomId?: string);
    registerEvent();
    send(event: string, data: any);

}