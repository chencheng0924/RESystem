export class PageCardSelectProps {
    data: CardData[];
    mode?: string;
    constructor(init?: Partial<PageCardSelectProps>) {
        Object.assign(this, init);
    }
}


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