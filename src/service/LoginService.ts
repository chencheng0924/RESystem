import { useGuestToken } from '@/stores/tokenStore';
import { Logincheck } from './Logincheck';
import axios, { AxiosHeaders } from 'axios';
import { AxisContentType } from '@/api/RestApiService';
import { UserService } from './UserService';
import { TokenData, TokenService, UserData } from './TokenService';
import { UPPreferenceStore } from '@/stores/userProfilePreference/UPPreferenceStore';
import { LoginAccount } from '@/model/Login.model';
import { Session } from '@/utils/sessionManagement';
import { EnvUtils } from '@/utils/envUtils';


const baseUrl = EnvUtils.getRIDPPath();
const cid = EnvUtils.getClientId();
const url = EnvUtils.getRouterPath();
const redirtionTemp = EnvUtils.getHomeReDirUrl();

// 忘記密碼
const cidForgetPassword = EnvUtils.getClientPId()
const clientSecretForgetPassword = EnvUtils.getClientPSecret()
export class LoginService {
    //--------------------------------------------------------------------
    public dataAxios?;
    public formAxios?;
    public gToken = null;

    constructor(langCode?: string) {
        this.gToken = useGuestToken()
        this.init();
        this.initForm();
    }

    private init() {
        this.dataAxios = axios.create()
        this.dataAxios.defaults.withXSRFToken = true
        this.dataAxios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        this.dataAxios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
        this.dataAxios.defaults.timeout = 60000;

        let headerOps = new AxiosHeaders();
        headerOps.set('Access-Control-Allow-Origin', '*');
        headerOps.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headerOps.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
        headerOps.set('X-Api-Version', '1');
        headerOps.set('Content-Type', AxisContentType.JSON_DATA);

        this.dataAxios.interceptors.request.use(
            async config => {
                config.headers = headerOps;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );


    }
    private initForm() {
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
                let xsessionid = Session.getXSessionId()
                if (xsessionid != undefined && xsessionid != null && xsessionid != "") {
                    headerOps.set('X-SessionId', xsessionid);
                }
                config.headers = headerOps;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    // 登入取token vMLogin
    public async login(params: LoginAccount) {
        
    }

    private async setUserData(guestToken) {
        const tokenEntity = new TokenData(guestToken)
        const uData: UserData = tokenEntity.getUser();

        let userStore = UPPreferenceStore();
        userStore.setUserEntity(uData);

    }


    public loginToCodeflowURL() {
        let base = baseUrl;
        let redirection = redirtionTemp
        let url = `${baseUrl}/portal/Authorize?client_id=maas.ai.app&response_type=code&redirect_uri=${redirection}`;

        return url;
    }
    public async loginToSSO(code: string) {
        let para = {
            grant_type: 'authorization_code',
            client_id: cid,
            code: code,
            redirect_uri: redirtionTemp
        }

    }

    public async getLoginLink() {

        let url = EnvUtils.getRaiPath() + `/Basic/AILoginLink`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Version': '1',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization',
                },

            });

            let ds = await response;
            if (response.ok == false) {
                return null;
            }
            return ds.json();
        } catch (error) {

            return null;
        }

    }
}
