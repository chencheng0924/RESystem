export class BaseKeyValue {
    key?: string;
    value?: string;
    id?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
    setKey(id: string) {
        this.key = id;
        return this;
    }
    setValue(v: string) {
        this.value = v;
        return this;
    }
}