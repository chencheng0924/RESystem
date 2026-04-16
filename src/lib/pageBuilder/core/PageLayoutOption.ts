export class PageLayoutOption {

    minWidth?: string = "900";//px
    minHeight?: string = '500';//px

    TopHeight?: string
    BottomHeight?: string

    LeftWidth?: string
    RightWidth?: string

    constructor(init?) {
        Object.assign(this, init);
    }

    setTop(toph: string) {
        this.TopHeight = toph;
        return this;
    }
    setBottom(bottomh: string) {
        this.BottomHeight = bottomh;
        return this;
    }
    setLeft(leftw: string) {
        this.LeftWidth = leftw;
        return this;
    }
    setRight(rightw: string) {
        this.RightWidth = rightw;
        return this;
    }
    setMinHeight(minh: string) {
        this.minHeight = minh;
        return this;
    }
    setMinWidth(minw: string) {
        this.minWidth = minw;
        return this;
    }


}