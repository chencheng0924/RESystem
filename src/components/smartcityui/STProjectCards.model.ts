import { STCardItem } from "./STCardCustom.model";

export class STAgentCardsProps {

    datas?: Array<STCardItem> = [];
    constructor(init?: Partial<STAgentCardsProps>) {

        Object.assign(this, init);
    }

    setDatas(datas: Array<STCardItem>) {
        this.datas = datas;
        return this;
    }


}
