export class MessageLog {
    id?: string;
    subid?: string;
    contentType?: string;
    content?: string
    time?: string
    type?: string

    constructor(init?) {
        Object.assign(this, init);
    }
}