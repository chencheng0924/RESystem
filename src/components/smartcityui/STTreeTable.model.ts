import { STDataTableColumn, STDataTableAction, STDataTableCustomFunction } from "./STTable.model";

export class STTreeTableProps {
    showCheckBox?: Boolean = true;
    data?: Array<any> = [];
    columns?: Array<STDataTableColumn> = [];
    actions?: Array<STDataTableAction> = [];
    customObject?: STDataTableCustomFunction;

    alignFrozen?: string = 'right'
    frozen?: boolean = true;


    constructor(init?: Partial<STTreeTableProps>) {
        Object.assign(this, init);
    }
    setColumns(cols: Array<any>) {
        this.columns = cols;
        return this;
    }
    setDatas(ds: Array<any>) {
        this.data = ds;
        return this;
    }
    setActions(acs: Array<any>) {
        this.actions = acs;
        return this;
    }


    setCustomFunction(custom?: STDataTableCustomFunction) {
        this.customObject = custom;
        return this;
    }
    //--------------------------------------------

    setShowCheckBox(val: boolean) {
        this.showCheckBox = val
        return this
    }

}

export class STTreeTableEvent {
    constructor(init?: Partial<STTreeTableEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;
    eventActionBtnByRow?: Function;

}