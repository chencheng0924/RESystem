// ------ 測試用 ------ //

import bsuper from "../../src/api/bsuper/api";
import rtraffic from "../../src/api/rtraffic/api";
import { BaseApiFactory } from "./restApiService";
import bstopsuper from "../../src/api/bstopsuper/api";
import rstorage from "../../src/api/rstorage/api";
import rbusmanagement from "@/api/rbusmanagement/api";

let baseUrl = 'https://dev-citygpt.foxconn.com';

export class ApiNames {
    static rBasicApiUrl = baseUrl;
}


export class ApiFactory extends BaseApiFactory {
    // private dataAxios: AxiosInstance = dataAxios;
    constructor() {
        super();
        this._bsuper = new bsuper({ globalAxios: this.dataAxios, basePath: ApiNames.rBasicApiUrl })
        this._rtraffic = new rtraffic({ globalAxios: this.dataAxios, basePath: ApiNames.rBasicApiUrl })
        this._bstopsuper = new bstopsuper({ globalAxios: this.dataAxios, basePath: ApiNames.rBasicApiUrl })
        this._rstorage = new rstorage({ globalAxios: this.dataAxios, basePath: ApiNames.rBasicApiUrl })
        this._rbusmanagement = new rbusmanagement({ globalAxios: this.dataAxios, basePath: ApiNames.rBasicApiUrl })
    }
    //----api instance------------------------------------------------------------
    private _bsuper: bsuper;
    public get bsuper() {
        return this._bsuper;
    }

    private _rtraffic: rtraffic;
    public get rtraffic() {
        return this._rtraffic;
    }

    private _bstopsuper: bstopsuper;
    public get bstopsuper() {
        return this._bstopsuper;
    }

    private _rstorage: rstorage;
    public get rstorage() {
        return this._rstorage;
    }

    private _rbusmanagement: rbusmanagement;
    public get rbusmanagement() {
        return this._rbusmanagement;
    }
}
