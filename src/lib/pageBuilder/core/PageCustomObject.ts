
export class PageCustomObject {
    public DataActionCustom?: Function
    public setDataActionCustom(fun?: Function) {
        this.DataActionCustom = fun;
        return this;
    }
}