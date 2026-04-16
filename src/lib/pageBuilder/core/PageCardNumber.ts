export class PageCardNumber {
    Title?: string = '';
    Number?: string = '';
    Icon?: string = '';
    IconBlock?: string = '';
    SubTitle?: string = '';
    SubDesc?: string = '';

    constructor(init?) {
        Object.assign(this, init);
    }
}