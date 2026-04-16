import { ListItem } from './../../service/bus/BusService.model';


export enum SignalREventType {
    TextEvent,// 純文字事件
    DisplayEvent,// 要求於目前頁面中，進行資料顯示
    PopupEvent,// 要求以彈出式視窗的方式，進行資料顯示
    NavigateEvent,// 要求轉向特定的頁面

}

export class SignalREventItem {
    elementName?: string;
    contentType?: string;
    content?: string;
}
export class SignalREventData {
    EventTime?: string;
    SessionId?: string;
    Data: Array<SignalREventItem> = [];
}
