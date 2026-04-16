export class PageTab {
    constructor(init?) {
        Object.assign(this, init);
    }
    public Id?: string
    public Text?: string;
    public Active?: boolean = false
    public Url?: string

    setActive(ac: boolean) {
        this.Active = ac;
        return this;
    }
}