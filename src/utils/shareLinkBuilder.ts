export class ShareLinkBuilder {
    constructor() { }

    private title?: string;
    private description?: string;
    private url?: string;
    private type?: string;
    private id?: string;

    public setTitle(title: string) {
        this.title = title;
        return this;
    }
    public setDesc(description: string) {
        this.description = description;
        return this;
    }

    public setUrl(url: string) {
        this.url = url;
        return this;
    }

    public setType(type: string) {
        this.type = type;
        return this;
    }

    public setId(id: string) {
        this.id = id;
        return this;
    }

    public async share() {
        const shareData = {
            title: this.title,
            text: this.description,
            url: this.url,
        };
        console.log(shareData)
        try {
            if (navigator.share)
                await navigator.share(shareData);
            else {
                console.log("請確認網址為 https , 或瀏覽器不支援請更新瀏覽器版本")
                return {
                    canShare: false,
                    ...shareData,
                }
            }

        } catch (err) {
            console.error("err", err);
        }
    }
}