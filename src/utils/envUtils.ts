let baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
let idpUrl = import.meta.env.VITE_IDP_BACKEND_URL;
let resetDirUrl = import.meta.env.VITE_RESETPASSWORD_REDIR
let homeDirUrl = import.meta.env.VITE_HOMEREDIRECTION
let bk_Url = import.meta.env.VITE_BACKEND_HOST

let client_id = import.meta.env.VITE_CLIENT_ID
let client_p_id = import.meta.env.VITE_CLIENT_ID_RESETPASSWORD
let client_p_s = import.meta.env.VITE_CLIENT_SECRET_RESETPASSWORD
let eventhub = import.meta.env.VITE_EVENTHUB_URL
let routerPath = import.meta.env.VITE_BASE_URL

let speechKey = import.meta.env.VITE_SPEECH_KEY
let speechArea = import.meta.env.VITE_SPEECH_AREA

let sysTitle = import.meta.env.VITE_SYS_TITLE
let version = import.meta.env.VITE_VERSION

let devUses = import.meta.env.VITE_DEVUSES

const VITE_CLIENT_ID_RESETPASSWORD_VALUE = import.meta.env.VITE_CLIENT_ID_RESETPASSWORD
const VITE_CLIENT_SECRET_RESETPASSWORD_VALUE = import.meta.env.VITE_CLIENT_SECRET_RESETPASSWORD

export class EnvUtils {
    //------------------------------------------------------------------------
    // 可變
    static getBaseUrl() {
        let url = window['env']?.VITE_BASE_BACKEND_URL ?? baseUrl;

        return url
    }
    static getIDPUrl() {
        let base = EnvUtils.getBaseUrl();
        let idpurl = EnvUtils.getWinEnvValue("VITE_IDP_BACKEND_URL", idpUrl);
        if (idpurl == undefined || idpurl == null || idpurl == "")
            idpurl = base
        let url = EnvUtils.getWinEnvValue("VITE_IDP_BACKEND_URL", idpurl);

        return url
    }
    static getClientId() {
        let url = EnvUtils.getWinEnvValue("VITE_CLIENT_ID", client_id);

        return url
    }
    static getClientPId() {
        let url = EnvUtils.getWinEnvValue("VITE_CLIENT_ID_RESETPASSWORD", client_p_id);

        return url
    }
    static getClientPSecret() {
        let url = EnvUtils.getWinEnvValue("VITE_CLIENT_SECRET_RESETPASSWORD", client_p_s);

        return url
    }

    static getRouterPath() {
        let url = routerPath;

        return routerPath
    }

    static getWinEnvValue(winEnvName, defaultValue) {
        if (window['env'] == undefined || window['env'] == null)
            return defaultValue

        let currentValue = window['env'][winEnvName]
        if (currentValue == undefined || currentValue == null || currentValue == "")
            return defaultValue

        return currentValue
    }

    //------------------------------------------------------------------------
    // 拚接

    static getBackendUrl() {
        let chat = bk_Url[0];
        if (chat == "/")
            return bk_Url;
        else {
            return EnvUtils.getBaseUrl();
        }
    }


    static getResetPasswordDirUrl() {
        let url = `${EnvUtils.getBaseUrl()}${resetDirUrl}`

        return url
    }

    static getHomeReDirUrl() {
        let url = `${EnvUtils.getBaseUrl()}${homeDirUrl}`

        return url
    }
    static getEventHubUrl() {
        let url = `${EnvUtils.getBaseUrl()}${eventhub}`

        return url
    }
    //---------------------------------------------------------------
    static getRaiPath() {
        let url = EnvUtils.getBackendUrl();
        if (url.split('/').length <= 3)
            url = `${url}/rai`;

        return url;
    }
    static getRBasicPath() {
        let url = EnvUtils.getBackendUrl();
        if (url.split('/').length <= 3)
            url = `${url}/rbasic`;

        return url;
    }
    static getRIDPPath() {
        let url = EnvUtils.getIDPUrl();
        if (url.split('/').length <= 3)
            url = `${url}/ridp`;

        return url;
    }
    static getRStoragePath() {
        let url = EnvUtils.getBackendUrl();
        if (url.split('/').length <= 3)
            url = `${url}/rstorage`;

        return url;
    }
    //------------------------------------------------------------------------
    // 固定

    static getSpeechKey() {
        return speechKey
    }

    static getSpeechArea() {
        return speechArea
    }
    static getSysTitle() {
        return sysTitle
    }
    static getVersion() {
        return version
    }

    static getDevUses() {
        return devUses
    }

    static getCLIENT_ID_RRESETPASSWORD() {
        return VITE_CLIENT_ID_RESETPASSWORD_VALUE
    }
    static getVITE_CLIENT_SECRET_RESETPASSWORD_VALUE() {
        return VITE_CLIENT_SECRET_RESETPASSWORD_VALUE
    }

    static getRemberTool() {
        return Boolean(VITE_CLIENT_ID_RESETPASSWORD_VALUE && VITE_CLIENT_SECRET_RESETPASSWORD_VALUE)
    }

}