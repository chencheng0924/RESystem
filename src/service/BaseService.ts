
import { ApiFactory } from '@/apiRepositories/ApiFactory';
// import { LangService } from './langService';
// import { uselangCodeStroe } from '@/stores/langCodeStroe';

export class BaseService {
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
}

// public getBusRoutes() {

//     let para: DefaultApiVStgTdxRouteGetRequest = { filter: "routeid eq '100' " };

//     return this.api.tdxRoute.vStgTdxRouteGet(para).then((res) => {
//         let ds: Array<VStgTdxRoute> = res.data.data;
//         console.log(ds);
//         return ds;
//     }).catch((error) => {
//         return Array<VStgTdxRoute>();
//     });
// }
