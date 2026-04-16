import { useGuestToken } from '@/stores/tokenStore';
import { DateExtension } from "@/utils/dateExtension";
import axios, { AxiosHeaders } from 'axios';
import { AxisContentType } from '@/api/RestApiService';
import { ApiNames } from '@/apiRepositories/ApiFactory';
import { JwtDecode } from '@/utils/jwtDecode';
import { Logincheck } from './Logincheck';
import { RESystemStore } from '@/stores/RESystemStore/RESystemStore';

import { BaseAxios } from '@/api/BaseAxios';
import { EnvUtils } from '@/utils/envUtils';

const routerPath = EnvUtils.getRouterPath();
const baseurl = EnvUtils.getRIDPPath();
const cid = EnvUtils.getClientId();
const urlLogin = EnvUtils.getResetPasswordDirUrl()
export class UserData {
    tenant?: string;
    userId?: string;
    scope?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
}

export interface SCCMJwtPayload {
    iss?: string;
    aud?: string;
    sub?: string;
    jti?: string;
    scope?: string;
    tenant?: string;
    nbf?: number;
    exp?: number;
    iat?: number;
    role?: string;
    department?: string;
}


export class TokenData {
    private limtMinutes: number = 5;//5 分鐘前
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    issued_token_type?: string;
    scope?: string;
    token_type?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
    public isExpirationSoon() {
        if (this.expires_in == null)
            return true;
        let d = DateExtension.getTimestampTodate(this.expires_in);

        let diff = DateExtension.getDiffMinutesByNow(d);
        if (diff < this.limtMinutes)
            return true;

        return false;
    }
    public isExpired() {
        if (this.expires_in == null)
            return true;
        let d = DateExtension.getTimestampTodate(this.expires_in);

        let diff = DateExtension.getDiffMinutesByNow(d);
        if (diff < 0)
            return true;

        return false;
    }

    public getUser(): UserData {
        if (!!this.access_token == false)
            return null;

        const data: SCCMJwtPayload = new JwtDecode().decodeToken(this.access_token)
        return new UserData({ tenant: data.tenant, userId: data.sub, scope: data.scope });
    }

}

export class TokenService extends BaseAxios {

    public gToken = null;
    private refreshSvc: RefreshService
    constructor() {
        super();
        this.initSvc();
        this.gToken = useGuestToken()
    }
    private initSvc() {
        //this._ridp = new ridp({ globalAxios: this.dataAxios, basePath: baseurl });
        this.refreshSvc = new RefreshService();
    }

    // private _ridp: ridp;
    // public get bsuper() {

    //     return this._ridp;
    // }

    private getLoginStorageToken() {
        let storgeToken = Logincheck.getSessionStorage();
        if (!!storgeToken) {
            const loginTokenEntity = new TokenData(storgeToken)
            return loginTokenEntity;
        }

        if (this.gToken.guestToken != null) {
            const tokenEntity = new TokenData(this.gToken.guestToken)
            return tokenEntity;
        }

        const piniaToken = RESystemStore().getToken();
        if (piniaToken) {
            let expiresIn: number | undefined;
            try {
                const payload = new JwtDecode().decodeToken(piniaToken) as { exp?: number };
                if (typeof payload.exp === 'number') {
                    expiresIn = payload.exp;
                }
            } catch {
                /* 非 JWT 時給合成過期時間，避免立刻走 refresh 並被導回 login */
            }
            if (expiresIn == null) {
                expiresIn = Math.floor(Date.now() / 1000) + 3600;
            }
            return new TokenData({
                access_token: piniaToken,
                expires_in: expiresIn,
            });
        }

        return null;
    }

    public async getCurrentToken() {


        let token = this.getLoginStorageToken();
        if (token != null) {
            if (token.isExpirationSoon() == false)
                return token;

            if (TokenComing.getInstance().isComing)
                return token;
        }


        let param = {
            clientId: cid
        }

        TokenComing.getInstance().isComing = true;

        let tokenTemp = await this.refreshSvc.getRefreshToken();
        if (tokenTemp) {

            this.gToken.guestToken = tokenTemp;
            TokenComing.getInstance().isComing = false;
            return tokenTemp;
        } else {

            window.location.replace(`${routerPath}login`);
            TokenComing.getInstance().isComing = false;
            return null;
        }

    }

    public setToken(data) {
        Logincheck.setSessionStorage(data);
        let tData = new TokenData(data);
        this.gToken.guestToken = tData;
    }


    //-----------------------------------------------------------------
    //---  Grafana ----------------------------------------------------
    //-----------------------------------------------------------------
    private getGrafanaStorageToken() {
        let storgeToken = Logincheck.getGrafanaSessionStorage();
        if (!!storgeToken) {
            const loginTokenEntity = new TokenData(storgeToken)
            if (loginTokenEntity.isExpired() == false)
                return loginTokenEntity;
        }

        return null;
    }
    public getCurrentGrafanaToken(params?) {

        // let storgeToken = this.getGrafanaStorageToken();
        // if (storgeToken != null) {
        //     return Promise.resolve(storgeToken);
        // }

        // this.resetHeaderops();
        // let para = {} as GuestTokenTokenpostRequest
        // if (params != undefined && params != null) {
        //     para = Object.assign(para, params);
        // }
        // return this.rsuperApi.GuestToken.Token.post(para).then((res) => {
        //     let tData = new TokenData(res.data);
        //     if (tData.access_token == null) {

        //         return null;
        //     }
        //     Logincheck.setGrafanaSessionStorage(tData);

        //     return tData;
        // }).catch((error) => {

        //     return null;
        //     //return null;
        // });

        return null;
    }

}


export class RefreshService extends BaseAxios {
    public formAxios?;

    constructor() {
        super();
        this.initSvc();
    }
    private initSvc() {

        this.formAxios = axios.create()
        this.formAxios.defaults.withXSRFToken = true
        this.formAxios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        this.formAxios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
        this.formAxios.defaults.timeout = 60000;

        let headerOps = new AxiosHeaders();
        headerOps.set('Access-Control-Allow-Origin', '*');
        headerOps.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headerOps.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
        headerOps.set('X-Api-Version', '1');
        headerOps.set('Content-Type', AxisContentType.FROMURL_DATA);

        this.formAxios.interceptors.request.use(
            async config => {
                config.headers = headerOps;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

    }


    public async getRefreshToken() {
        let storgeToken = Logincheck.getSessionStorage();
        let tData = new TokenData(storgeToken);
        let param = {
            grant_type: 'refresh_token',
            client_id: cid,
            refresh_token: tData.refresh_token
        };

        try {
            if (tData.access_token == null) {
                window.location.replace(`${routerPath}login`);
                return null;
            }

            Logincheck.setSessionStorage(tData);
            return tData;
        } catch (ex) {
            return null;
        }


    }
}


export class TokenComing {
    static instance: TokenComing = null;
    static getInstance() {
        if (TokenComing.instance == null)
            TokenComing.instance = new TokenComing();


        return TokenComing.instance;
    }

    public isComing: boolean = false;
}