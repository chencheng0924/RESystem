
import axios, { AxiosHeaders } from "axios";
import { AxisContentType, BaseApiFactory, UploadApiFactory } from "@/api/RestApiService";
import { EnvUtils } from "@/utils/envUtils";

// let baseUrl = import.meta.env.VITE_BACKENDGPT_HOST;
let citygovUrl = import.meta.env.VITE_CITYGOVGPT_HOST;
// let aiAgentUrl = import.meta.env.VITE_BACKEND_HOST;
// const baseurl_web = import.meta.env.VITE_BASE_URL;

export class ApiNames {
    static ridpApiUrl = EnvUtils.getRIDPPath();
    static rbasicApiUrl = EnvUtils.getRBasicPath();
    static raiApiUrl = EnvUtils.getRaiPath();
}
const citygovAxios = axios.create()
citygovAxios.interceptors.request.use(
    config => {
        const username = 'fe_client';
        const password = '$2b$12$EixZaYVK1d1bw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW';
        const base64Credentials = btoa(`${username}:${password}`);

        const headers = new AxiosHeaders();
        headers.set('Authorization', `Basic ${base64Credentials}`);
        headers.set('Content-Type', AxisContentType.JSON_DATA);

        config.headers = headers;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export class ApiFactory extends BaseApiFactory {
    constructor() {
        super();

        // this._ridp = new ridp({ globalAxios: this.dataAxios, basePath: ApiNames.ridpApiUrl })


        let upload = new UploadApiFactory();
        // this._raiUpload = new rai({ globalAxios: upload.dataAxios, basePath: ApiNames.raiApiUrl })
    }

    //----api instance------------------------------------------------------------
    // private _citygov: F1V1;
    // public get citygov() {
    //     return this._citygov;
    // }
}




export class UploadFileApiFactory extends UploadApiFactory {
    // private dataAxios: AxiosInstance = dataAxios;
    constructor() {
        super();

    }
    //----api instance------------------------------------------------------------
}