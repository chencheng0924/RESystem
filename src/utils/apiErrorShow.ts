export class ApiErrorItem {

    public errorCode?: string;
    public errorMsg?: string;
    public responseMsg?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
}
export class ApiErrorShow {
    static lastErrorCode = "";
    static lastError = "";
    static lastTime = 0;
    static interval = 3000


    static sendErrorMessage(error: string, responseMsg?: string) {
        const now = Date.now();
        if (error === ApiErrorShow.lastErrorCode && now - ApiErrorShow.lastTime < ApiErrorShow.interval) {
            return null; // 不重複顯示
        }

        ApiErrorShow.lastErrorCode = error;
        ApiErrorShow.lastError = `ApiErrorCode.${error}`;
        ApiErrorShow.lastTime = now;


        return new ApiErrorItem({
            errorCode: error,
            errorMsg: ApiErrorShow.lastError,
            responseMsg: responseMsg

        })
    }
}
