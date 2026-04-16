import { PageFormItem } from "../core/PageFormItem";
import { PageServiceErrorReturn } from "../core/PageReturn";
import { IPKID } from "./IPKID";

export interface IPLSingleSearchService extends IPKID {
    errorReturn?: PageServiceErrorReturn
    getEntityDatas(conditions?: Array<PageFormItem>, pileNum?: string);
    searchEntityDatas(conditions?: Array<PageFormItem>);
    createEntityDatas(items?: Array<PageFormItem>);
    deleteEntityDatas(pkids?: Array<string>);
    updateEntityDatas(items?: Array<PageFormItem>);
    getPKIDName();
    extraFunc?(conditions?: Array<PageFormItem>)
    getEntityDatasByPageRow?(conditions?: Array<PageFormItem>, pageIndex?: number, pageRows?: number);
    searchEntityDatasByPageRow?(conditions?: Array<PageFormItem>, pageIndex?: number, pageRows?: number);
}