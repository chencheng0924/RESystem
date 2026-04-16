export class FilterBuilder {
    private para?: string = '';
    private prarList?: Array<string> = [];

    constructor() { }

    public addContains(name: string, value: string) {
        if (value == undefined || value == null || value == '')
            return this;

        this.prarList.push(` contains(${name},'${value}') `)
        return this;
    }
    public addOR() {
        this.prarList.push(` or `)
        return this;
    }
    public addAND() {
        this.prarList.push(` and `)
        return this;
    }
    public build() {
        if (this.prarList.length == 0)
            return '';

        this.para = `filter=${this.prarList.join("")}`;
        return this.para;
    }
}