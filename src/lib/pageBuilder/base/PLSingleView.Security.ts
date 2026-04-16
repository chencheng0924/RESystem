
export class PLSingleViewSecurity {
    constructor(init?) {
        Object.assign(this, init);
    }
    IsBasicData?: boolean = true;

    IsEntityTitle?: boolean = true;
    IsEntityToolbar?: boolean = true;
    IsEntityMessage?: boolean = false;

    setMessageOpen(isMsg: boolean) {
        this.IsEntityMessage = isMsg;
        return this;
    }
    setBasicData(basic: boolean) {
        this.IsBasicData = basic;
        return this;
    }
    setEntityTitle(isEntityTitle: boolean) {
        this.IsEntityTitle = isEntityTitle;
        return this;
    }

}