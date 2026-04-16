import axios, { AxiosHeaders, AxiosInstance } from "axios";
import { AxisContentType } from "./RestApiService";

export class BaseAxios {
    private keyBearer?: string = "";
    private keyApim?: string = "";
    private version?: number;
    private langString?: string = "";
    private headerOps?: AxiosHeaders = new AxiosHeaders();
    public dataAxios: AxiosInstance;

    constructor(dataAxios?: AxiosInstance, type: AxisContentType = AxisContentType.JSON_DATA) {

        if (dataAxios == null)
            this.dataAxios = axios.create()
        else
            this.dataAxios = dataAxios;

        this.init(type);
    }
    private async init(type: AxisContentType = AxisContentType.JSON_DATA) {
        this.setVersion();
        this.setLang();
        this.setHeaders(type);
        this.checkApiStatus()
    }


    // check response
    private checkApiStatus() {
        // this.router = useRouter();
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
}


