export class STCardProps {
    title?: String;
    content?: String;
    constructor(init?: Partial<STCardProps>) {
        this.content = ''
        Object.assign(this, init);
    }

}
