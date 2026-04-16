
export class RegExpSort {
    constructor(reg: RegExp, sort: number, replaceText?: string) {
        this.reg = reg;
        this.sort = sort;
        this.replaceText = replaceText;
    }
    reg?: RegExp;
    sort?: number;
    replaceText?: string
}
export class RouteSort {

    constructor() {

    }
    private isTaxi?: boolean = false;
    private regexOtherSort?: number = 40000;//中文字
    private regexRule?: Array<RegExpSort> = [
        new RegExpSort(/^\d+/, 10000),
        new RegExpSort(/^紅\d+/, 20000, "紅"),
        new RegExpSort(/^E\d+/, 30000, "紅"),
        new RegExpSort(/^[a-z|A-Z]+/, 50000),
        new RegExpSort(/^黃\d+/, 60000, "黃"),
        new RegExpSort(/^綠\d+/, 70000, "綠"),
        new RegExpSort(/^橘\d+/, 80000, "橘"),
        new RegExpSort(/^H\d+/, 90000, "H"),
        new RegExpSort(/^T\d+/, 99000, "T"),
    ];

    private regexOtherSortTaxi?: number = 160000;//中文字
    private regexRuleTaxi?: Array<RegExpSort> = [

        new RegExpSort(/^紅\d+/, 110000, "紅"),
        new RegExpSort(/^橘\d+/, 120000, "橘"),
        new RegExpSort(/^\d+/, 130000),
        new RegExpSort(/^H\d+/, 140000, "H"),
        new RegExpSort(/^T\d+/, 150000, "T"),

    ];

    public getSort(name: string, isTaxi: boolean = false): number {
        let temp = name;
        let currentRegs = isTaxi ? this.regexRuleTaxi : this.regexRule;
        let currentOther = isTaxi ? this.regexOtherSortTaxi : this.regexOtherSort;


        let s1 = currentOther;
        for (let i = 0; i < currentRegs.length; i++) {
            let reg = currentRegs[i].reg;
            let tempSort = currentRegs[i].sort;
            let replaceText = currentRegs[i].replaceText;
            let isMatch = this.getRegMatch(temp, reg);
            if (isMatch != undefined && isMatch != null) {
                s1 = tempSort + this.regMatchToNum(isMatch, replaceText);
                break;
            }
        }

        return s1;
    }
    private getRegMatch(name, regx) {
        let result = name.match(regx);
        return result;
    }
    private regMatchToNum(result, text) {
        if (result != undefined && result != null) {
            let resString: string = result?.toString();
            return resString.replace(text, "").toNumber();
        }
        return 0;
    }
}