import { IPKID } from "./IPKID";

export interface IPLSingleViewService extends IPKID {
    getPKIDName();
    getEntity(id: string, isBasic: boolean);// 取得 物件內容 , isbasic=false 會抓子物件資料

}