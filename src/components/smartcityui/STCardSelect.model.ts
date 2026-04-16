
export class CardData {
    id?: string;
    icon?: string;
    title?: string;
    description?: string;
    selected?: boolean;
    constructor(init?: Partial<CardData>) {
        Object.assign(this, init);
    }
}

export enum SelectionMode {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE'
}

export class STCardSelectProps {
    data: CardData[];
    mode?: string;
    constructor(init?: Partial<STCardSelectProps>) {
        Object.assign(this, init);
    }
}

export class STCardSelectEvent {
    constructor(init?: Partial<STCardSelectEvent>) {
        Object.assign(this, init);
    }
    selected?: Function;
    change?: Function;
}