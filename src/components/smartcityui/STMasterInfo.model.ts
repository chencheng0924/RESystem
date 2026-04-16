import { STAvatar } from "./STCommon.model"

export class STMasterInfoProps {
    title?: string
    dateInfo?: string
    desc?: string
    tagSeverity?: string
    tagValue?: string
    avatar?: STAvatar
    cardpt?: any;

    iconTexts?: Array<STIconText> = [];


    constructor(init?: Partial<STMasterInfoProps>) {
        Object.assign(this, init);
    }



}


export class STMasterInfoEvent {
    constructor(init?: Partial<STMasterInfoEvent>) {
        Object.assign(this, init);
    }

    change?: Function;

}


export class STIconText {
    icon?: string;
    text?: string;
    constructor(init?) {
        Object.assign(this, init);
    }

}