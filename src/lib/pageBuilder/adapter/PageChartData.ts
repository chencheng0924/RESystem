export class PageChartDataItem {

    type?: string;
    label?: string;
    data?: Array<any> = [];
    fill?: boolean = false;

    tension: number = 0.4
    backgroundColor: string | Array<string> = 'rgba(107, 114, 128, 0.2)'
    borderWidth?: number;
    borderColor?: string | Array<string>;
    //-----------------------------------
    hoverBackgroundColor?: Array<string>

    //----Radar-------------------------------
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverBackgroundColor?: string;
    pointHoverBorderColor?: string;

    constructor(init?) {
        Object.assign(this, init);
    }
    setDatas(ds: Array<any>) {
        this.data = ds;
        return this;
    }
    setfillAndBackground(fill: boolean, bk?: any) {
        this.fill = fill;
        if (bk != null) {
            this.backgroundColor = bk;
        }
        return this;
    }
    setBackgroundColor(color: any) {
        this.backgroundColor = color;
        return this;
    }
    setHoverBackgroundColor(color: any) {
        this.hoverBackgroundColor = color;
        return this;
    }
    setlabel(label: string) {
        this.label = label;
        return this;
    }
    setType(type: string) {
        this.type = type;
        return this;
    }
    setBorderWidthAndColor(color: string, width: number = 1) {
        this.borderWidth = width;
        this.borderColor = color;
        return this;
    }
    setPointOps(bkColor: any, borderColor: any, hbkColor: any, hborderColor: any) {
        this.pointBackgroundColor = bkColor;
        this.pointBorderColor = borderColor;
        this.pointHoverBackgroundColor = hbkColor;
        this.pointHoverBorderColor = hborderColor;

        return this;
    }
}

export class PageChartData {
    public datasets?: Array<PageChartDataItem> = [];
    public labels?: Array<string>

    constructor(init?) {
        Object.assign(this, init);
    }

    public setLabels(ls: Array<string>) {
        this.labels = ls;
        return this;
    }
    public setDataSets(ds: Array<PageChartDataItem>) {
        this.datasets = ds;
        return this;
    }

    public setLineFill(fill: boolean, bkColor?: string) {
        if (this.datasets == null || this.datasets.length == 0)
            return this;

        this.datasets.forEach((x) => {
            x.setfillAndBackground(fill, bkColor);
        });

        return this;
    }
}


export class PageChartItemColor {
    public name?: string;
    public color?: string;

    constructor(init?) {
        Object.assign(this, init);
    }
}