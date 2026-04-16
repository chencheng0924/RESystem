// ------ 測試用 ------ //

import { TokenService } from '@/service/TokenService';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';
const dataAxios = axios.create()
// // 设置接口超时时间
dataAxios.defaults.withXSRFToken = true
dataAxios.defaults.xsrfCookieName = 'XSRF-TOKEN';
dataAxios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
dataAxios.defaults.timeout = 60000;
const datakey = process.env.VITE_DATA_KEY || "";

// const datakey = ""
export enum AxisContentType {
    FORM_DATA = "multipart/form-data",
    JSON_DATA = "application/json"
}

export class BaseApiFactory {
    private keyBearer?: string = "";
    private keyApim?: string = "";
    private version?: number;
    private langString?: string = "";
    private headerOps?: AxiosHeaders = new AxiosHeaders();
    // --- 測試差異--- //
    // private tokenSvc = process.env.VITE_ENV === 'apiTest' ? null : new TokenService();

    public dataAxios: AxiosInstance = dataAxios;
    constructor(customAxios?: AxiosInstance, type: AxisContentType = AxisContentType.JSON_DATA) {
        if (customAxios != null)
            this.dataAxios = customAxios;

        this.init(type);
    }
    getDefaults() {
        // // 设置接口超时时间
        const defaults = {
            withXSRFToken: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            timeout: 60000
        }
        return defaults
    }
    private async init(type: AxisContentType) {
        // --- 測試差異--- //
        let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMwODdiZGY1LTI2ODgtNGU0NC1iNmEzLTFkOThkYmNjYWRkOSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXR5Z3B0LmlkZW50aXR5IiwiYXVkIjoiY2l0eWdwdC5idXNzdG9wLmFwcCIsInN1YiI6IjI5ODQ3OTg2MjUyNjY0ODMyIiwianRpIjoiNjc4YWU5ODgtN2E5OS00MjhiLTgyNmEtZDFhZThiODU0YjdmIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSB0cmFmZmljIGJhc2ljIHN0b3JhZ2UgdHJhZmZpYy5yZWFkIHRyYWZmaWMud3JpdGUgYmFzaWMucmVhZCBiYXNpYy53cml0ZSBtZXNzYWdlIiwidGVuYW50IjoiMjkzOTM2MTg0MTQ1MzQ2NTYiLCJyb2xlIjoiVGVuYW50LkJ1c1N0b3BTeXN0ZW1BZG1pbiIsImRlcGFydG1lbnQiOiIiLCJuYmYiOjE3Mzg4MDM5NzcsImV4cCI6MTczODgwODE3NywiaWF0IjoxNzM4ODA0NTc3fQ.MIBsjC64Uoit-r-p4Uz8T1qnZq_7HimBJn40nxaNBRo5eFq-favu3MZxxp0Yog7sGkJ_In__ERidjJE28SD9qG3i2itl3WP1CR4nYC6oyqOJtZh9T4NlSIMsYV7Unj6N5o_WZgsUvOR6Bg7LyQOrpbcJKKwhDwXJEosfVeUd1D90gy6WMcc9ZOdiTZgM9nhNLdw1xu-KwXLXh7nrNt6I5LIQN7q50OmyIzScIbJX8JR3OjzjfsswRwazj6xL1gDcq9VlGYbSWdkBTRNDfYSPk_LWXXH92bt0eHHpdGrsryPYxiaNwZRtaqgKPu2Iy_sJEjNdjxtnuFBuori8ZifqgA" 
        this.setkeyBearer(token);
        this.setkeyApim(datakey);
        this.setVersion();
        this.setLang();

        this.setHeaders(type);
        // this.checkApiStatus()
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
    private setkeyBearer(key: string) {
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
    public setHeaders(type: string) {
        this.dataAxios.interceptors.request.use(
            config => {
                const headers = new AxiosHeaders(type);
                Object.entries({
                    ...this.getHeaderOps(type)?.toJSON(),
                    ...config.headers
                }).forEach(([key, value]) => headers.set(key, value));
                config.headers = headers;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
    public getHeaderOps(type: string) {
        this.headerOps?.set('Access-Control-Allow-Origin', '*');
        this.headerOps?.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        this.headerOps?.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
        if (this.keyBearer != null && this.keyBearer != "")
            this.headerOps?.set('Authorization', `Bearer ${this.keyBearer}`);
        if (this.version != null)
            this.headerOps?.set('X-Api-Version', '1');
        if (this.keyApim != null && this.keyApim != "")
            this.headerOps?.set('Ocp-Apim-Subscription-Key', this.keyApim);
        if (this.langString != null && this.langString != "")
            this.headerOps?.set('Accept-Language', this.langString);

        this.setContentType(type);
        return this.headerOps;
    }
    private setContentType(type: string) {
        if (type == null || type == "")
            return this;
        this.headerOps?.set('Content-Type', type);
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
    }
}
