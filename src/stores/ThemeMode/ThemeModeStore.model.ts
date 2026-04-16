export class PageTitleItem {
    public IsBack?: boolean = false;
    public BaclUrl?: string = ''
    public Title?: string = '';
    constructor(init?) {
        Object.assign(this, init);
    }
}