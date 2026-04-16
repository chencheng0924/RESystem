import { STComponentItem } from "./STCommon.model";

export class STImageViewProps {

    images?: Array<STImageItem> = [];
    constructor(init?: Partial<STImageViewProps>) {
        Object.assign(this, init);
    }
    setFormItems(images: Array<STImageItem>) {
        this.images = images;
        return this;
    }


}


export class STImageItem extends STComponentItem {

    constructor(init?) {
        super(init);
    }

}
