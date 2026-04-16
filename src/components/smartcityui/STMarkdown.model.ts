
export class STMarkdownProps {
    isView?: boolean = true;
    mode?: string = "light";
    content?: string = "";
    constructor(init?: Partial<STMarkdownProps>) {
        Object.assign(this, init);
    }
    setContent(content: string) {
        this.content = content;
        return this;
    }
    setView(view: boolean) {
        this.isView = view;
        return this;
    }


}
