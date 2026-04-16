export { }
class Group<T> {
    key: string;
    members: T[] = [];
    constructor(key: string) {
        this.key = key;
    }
}

declare global {
    interface Array<T> {
        groupBy<U>(func: (item: T) => any): Array<Group<T>>;
        select<U>(cvt: (item: T) => U): Array<U>;
        where(predicate: (item: T) => boolean): Array<T>;
        firstOrDefault(filter?: (item: T) => any): T;
        lastOrDefault(filter?: (item: T) => any): T;
        orderBy(selector: (item: T) => any): Array<T>;
        orderByDesc(selector: (item: T) => any): Array<T>;
        orderByText(selector: (item: T) => any): Array<T>;
        distinct(): Array<T>;
    }
}

Array.prototype.where = function <T>(predicate: (item: T) => boolean): Array<T> {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (predicate(item))
            result.push(item);
    }
    return result;
}
/** convert an array to another one */
Array.prototype.select = function <T, U>(cvt: (item: T) => U): Array<U> {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        var ci = cvt(item);
        result.push(ci);
    }
    return result;
}

Array.prototype.groupBy = function <T, U extends keyof any>(func: (item: T) => any) {

    let gs = this.reduce((previous, currentItem) => {
        const group = func(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<U, T[]>);

    let result: Array<Group<T>> = [];
    for (let key in gs) {
        let temp = new Group<T>(key);
        temp.members = gs[key];
        result.push(temp);
    }

    return result;
}

Array.prototype.firstOrDefault = function <T>(filter?: (item: T) => any): T {
    if (this.length == 0) {
        return null;
    }
    if (filter == undefined || filter == null) {
        return this[0];
    }
    this.each(function (item) {
        if (filter(item)) {
            return item;
        }
    });
    return null;
}
Array.prototype.lastOrDefault = function <T>(filter?: (item: T) => any): T {
    if (this.length == 0) {
        return null;
    }
    if (filter == undefined || filter == null) {
        return this[this.length - 1];
    }
    this.each(function (item) {
        if (filter(item)) {
            return item;
        }
    });
    return null;
}


Array.prototype.orderBy = function <T>(selector: (item: T) => any): Array<T> {
    let desc = false;
    let res = [...this].sort((a, b) => {
        a = selector(a);
        b = selector(b);

        if (a == b) return 0;
        return (desc ? a > b : a < b) ? -1 : 1;
    });

    //console.log("res", res);
    return res;
}
Array.prototype.orderByDesc = function <T>(selector: (item: T) => any): Array<T> {
    let desc = true;
    let res = [...this].sort((a, b) => {
        a = selector(a);
        b = selector(b);

        if (a == b) return 0;
        return (desc ? a > b : a < b) ? -1 : 1;
    });

    return res;
}

Array.prototype.orderByText = function <T>(selector: (item: T) => any): Array<T> {
    let desc = false;
    let res = [...this].sort((a, b) => {
        a = selector(a);
        b = selector(b);

        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    });

    //console.log("res", res);
    return res;
}

Array.prototype.distinct = function <T>(): Array<T> {
    let res: Array<T> = [...new Set(this)] as Array<T>;
    return res;
}
