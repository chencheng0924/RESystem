export class STCardNumberProps {

    title?: String;
    number?: String;
    icon?: String;
    iconBlock?: String;
    subTitle?: String;
    subDesc?: String;
    constructor(init?: Partial<STCardNumberProps>) {
        Object.assign(this, init);
    }

}
