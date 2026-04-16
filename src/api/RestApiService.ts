
import { TokenData, TokenService } from '@/service/TokenService';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';
export enum AxisContentType {
    FORM_DATA = "multipart/form-data",
    JSON_DATA = "application/json; charset=utf-8",
    ENCODED_DATA = "application/x-www-form-urlencoded",
    FROMURL_DATA = "application/x-www-form-urlencoded",
}


const dataAxios = axios.create()
// 设置接口超时时间
dataAxios.defaults.withXSRFToken = true
dataAxios.defaults.xsrfCookieName = 'XSRF-TOKEN';
dataAxios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
dataAxios.defaults.timeout = 60000;
const datakey = import.meta.env.VITE_DATA_KEY;
export class BaseApiFactory {
    private keyBearer?: string = "";
    private keyApim?: string = "";
    private version?: number;
    private langString?: string = "";
    private headerOps?: AxiosHeaders = new AxiosHeaders();

    public dataAxios: AxiosInstance = dataAxios;
    public tokenSvc: TokenService;
    constructor(customAxios?: AxiosInstance, type: AxisContentType = AxisContentType.JSON_DATA) {
        if (customAxios != null)
            this.dataAxios = customAxios;

        this.tokenSvc = new TokenService();
        this.init(type);
    }
    private async init(type: AxisContentType = AxisContentType.JSON_DATA) {
        // let token = ''
        let token: TokenData = await this.tokenSvc.getCurrentToken();

        this.setkeyBearer(token.access_token);
        this.setkeyApim(datakey);
        this.setVersion();
        this.setLang();

        this.setHeaders(type);
        this.checkApiStatus()
    }


    // check response
    private checkApiStatus() {
        // this.router = useRouter();
        this.dataAxios.interceptors.request.use(
            (config) => {
                // 如果url包含ExportFile，則將responseType設為blob
                if (config.url.includes('ExportFile')) {
                    config.responseType = 'blob';
                }
                if (config.url.includes('ridp/Connect')) {
                    config.headers['Content-Type'] = AxisContentType.ENCODED_DATA;
                }
                return config;
            },
        )
        this.dataAxios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {

                return Promise.reject(error);
            }
        );
    }
    public setkeyBearer(key: string) {
        this.keyBearer = key;
        return this;
    }
    private setkeyApim(key: string) {
        this.keyApim = key;
        return this;
    }
    private setVersion(ver: number = 1) {
        this.version = ver;
        return this;
    }
    private setLang(lang = "zh-TW") {
        this.langString = lang;
        return this;
    }
    // set Axios Header
    // public setHeaders() {
    //     this.dataAxios.interceptors.request.use(
    //         async config => {
    //             config.headers = this.getHeaderOps();
    //             return config;
    //         },
    //         error => {
    //             return Promise.reject(error);
    //         }
    //     );
    // }
    public setHeaders(type: string) {
        this.dataAxios.interceptors.request.use(
            config => {
                const headers = new AxiosHeaders(type);
                const customHeaders = this.getHeaderOps(type).toJSON();
                Object.entries(customHeaders).forEach(([key, value]) => {
                    headers.set(key, value);
                });
                Object.entries(config.headers || {}).forEach(([key, value]) => {
                    headers.set(key, value);
                });
                config.headers = headers;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
    public getHeaderOps(type: string) {
        this.headerOps.set('Access-Control-Allow-Origin', '*');
        this.headerOps.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        this.headerOps.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
        if (this.keyBearer != null && this.keyBearer != "")
            this.headerOps.set('Authorization', `Bearer ${this.keyBearer}`);
        if (this.version != null)
            this.headerOps.set('X-Api-Version', '1');
        if (this.keyApim != null && this.keyApim != "")
            this.headerOps.set('Ocp-Apim-Subscription-Key', this.keyApim);
        if (this.langString != null && this.langString != "")
            this.headerOps.set('Accept-Language', this.langString);

        this.setContentType(type);
        return this.headerOps;
    }
    public getDefaults() {
        // // 设置接口超时时间
        const defaults = {
            withXSRFToken: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            timeout: 60000
        }
        return defaults
    }
    private setContentType(type: string) {
        if (type == null || type == "")
            return this;
        this.headerOps.set('Content-Type', type);
    }
    public async resetHeaderOps() {
        let token: TokenData = await this.tokenSvc.getCurrentToken();
        this.setkeyBearer(token?.access_token);
        this.setHeaders(AxisContentType.JSON_DATA);
        return this;
    }

    public getkeyBearer() {
        return this.keyBearer;
    }
    public async gteToken() {
        let token = await this.tokenSvc.getCurrentToken();
        return token?.access_token;
    }
}



export class UploadApiFactory extends BaseApiFactory {

    constructor() {
        let formAxios = axios.create()
        formAxios.defaults.withXSRFToken = true
        formAxios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        formAxios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
        formAxios.defaults.timeout = 60000;
        super(formAxios, AxisContentType.FORM_DATA);

        this.dataAxios = formAxios;
    }
}

declare module 'axios' {
    export interface AxiosRequestConfig {
        timeMark?: {
            startTime: number
        }
    }
    export interface AxiosResponse {
        timeMark?: {
            requestTime: number
            responseTime: number
            duration: number
        }
    }
}