export class PageItemCommon {
    public toStartCharLowerCase() {
        let obj = {};
        for (let key in this) {
            let v = this[key];
            let keyTemp = key.replace(/^./, key[0].toLowerCase());
            obj[keyTemp] = v;
        }

        return obj;
    }
    public toStartCharUpperCase(obj: any) {
        for (let key in obj) {
            let v = obj[key];
            let keyTemp = key.replace(/^./, key[0].toUpperCase());
            this[keyTemp] = v;
        }

        return this;
    }
}