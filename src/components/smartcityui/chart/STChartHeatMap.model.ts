export class STChartHeatMapProps {
    gridRowLabel: Array<string>;
    gridColLabel: Array<string>;
    gridRowData: Array<string>;
    gridColData: Array<string>;
    gridData: Array<string>;
    chartHeatMapItem: STChartHeatMapItem;
    startColors: STChartHeapMapColorModel;
    endColors: STChartHeapMapColorModel;
    stepColors: number;

    constructor(init?: Partial<STChartHeatMapProps>) {
        Object.assign(this, init);
    }

}

export class STChartHeatMapItem {
    chartTitle: string;
    chartSubtitle: string;
    chartValue: string;
    info?: string;

    constructor(init?: Partial<STChartHeatMapItem>) {
        Object.assign(this, init);
    }

}

export class STChartHeapMapColorModel {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(init?: Partial<STChartHeapMapColorModel>) {
        Object.assign(this, init);
    }
}