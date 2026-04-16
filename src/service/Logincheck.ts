import { RESystemStore } from "@/stores/RESystemStore/RESystemStore";
import { TokenData } from "./TokenService";

export class Logincheck {
    static sessionStorageLoginKey: string = "logintoken";
    static sessionStoragegrafanaKey: string = "grafana";

    static clearSessionStorage() {

        sessionStorage.setItem(Logincheck.sessionStorageLoginKey, null)
        RESystemStore().setToken('')
    }
    static setSessionStorage(token) {
        if (token == null)
            return;
        sessionStorage.setItem(Logincheck.sessionStorageLoginKey, JSON.stringify(token))
    }
    static getSessionStorage() {
        const tokenData = JSON.parse(sessionStorage.getItem(Logincheck.sessionStorageLoginKey))
        return tokenData;
    }
    static isLogin() {
        const token = RESystemStore().getToken()
        if (token == undefined || token == null)
            return false;
        return true;
    }
    //-----------------------------------------------------------------
    //---  Grafana ----------------------------------------------------
    //-----------------------------------------------------------------
    static clearGrafanaSessionStorage() {

        sessionStorage.setItem(Logincheck.sessionStoragegrafanaKey, null)
    }
    static setGrafanaSessionStorage(token) {
        if (token == null)
            return;
        sessionStorage.setItem(Logincheck.sessionStoragegrafanaKey, JSON.stringify(token))
    }
    static getGrafanaSessionStorage() {
        const tokenData = JSON.parse(sessionStorage.getItem(Logincheck.sessionStoragegrafanaKey))
        return tokenData;
    }
}

