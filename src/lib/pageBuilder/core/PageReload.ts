export class PageReload
{
    ReloadKey?: number = 1;
 
    constructor(init?) {
        Object.assign(this,init);
    }
    Reload() {

        this.ReloadKey++;
        return this;
    }
}