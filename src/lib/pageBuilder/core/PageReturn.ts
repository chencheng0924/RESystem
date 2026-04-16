import { PageReturnType } from "./PageReturnType";

export class PageReturn {
    constructor(init?) {
        Object.assign(this, init);
    }
    public ReturnType?: PageReturnType = PageReturnType.ReturnNone
    public ReDirection?: string
    public ReturnMessage?: string
    public FileName?: string
    public FileContentType?: string = "application/x-xlsx"

}

export class PageServiceErrorReturn {
    constructor(init?) {
        Object.assign(this, init);
    }
    public details?: Array<any> = [];
    public errorCode?: string
    public isSuccess?: boolean = true;
    public message?: string


}
