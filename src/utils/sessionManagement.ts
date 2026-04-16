
export class Session {

    static getSessionLang(): string {
        return sessionStorage.getItem('locale');
    }
    static setSessionLang(lang: string) {
        sessionStorage.setItem('locale', lang);
    }

    static getXSessionId(): string {
        return sessionStorage.getItem('xsessionCode');
    }
    static setXSessionId(lang: string) {
        sessionStorage.setItem('xsessionCode', lang);
    }
}