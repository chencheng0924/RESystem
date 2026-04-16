
import { ApiFactory } from "@/apiRepositories/ApiFactory";
import { PageServiceErrorReturn } from "../core/PageReturn";

export class BaseService {
    public errorReturn?: PageServiceErrorReturn = null
    public lang = null;
    constructor() {
        //this.lang = uselangCodeStroe();
    }
    public get langCode() {
        return this.lang?.langCode ?? 'zh-TW';
    }
    public api = new ApiFactory();
    public rowLimit: number = 100;
    //public langSvc = new LangService(this.langCode);

    public commonParam: any = { IsCrossTenant: false };

    public pageIndex: number = 0

    public setRowLimit(num: number) {
        this.rowLimit = num;
        return this;
    }
    setErrorReturn(error) {
        this.errorReturn = new PageServiceErrorReturn(error);
        return this;
    }
    clearErrorReturn() {
        this.errorReturn = null;
        return this;
    }

    public setPageIndex(num: number) {
        this.pageIndex = num
        return this
    }
}

