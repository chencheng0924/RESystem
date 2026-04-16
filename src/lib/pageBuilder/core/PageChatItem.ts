import { PageAvatar } from "./PageAvatar";

export class PageChatItem {
    Id?: string = ""
    Type?: string = "";// 顯示類型
    Name?: string = ""
    Time?: string = ""
    Content?: string = ""
    Unread?: number = 0
    ImgUrl?: string = ""
    Avatar?: PageAvatar = null
    IsActive?: boolean = false

    constructor(init?) {
        Object.assign(this, init);
        this.setChatTextType();
    }

    public setChatTextType() {
        this.Type = "content";
        return this;
    }
    public setChatLogType() {
        this.Type = "log";
        return this;
    }
    public setIsActive(active: boolean) {
        this.IsActive = active;
        return this;
    }
    public convertObject() {
        let obj = {};
        for (let key in this) {
            let v = this[key];
            let keyTemp = key.replace(/^./, key[0].toLowerCase());
            obj[keyTemp] = v;
        }

        return obj;
    }

    public setAvatarLable(label: string) {
        this.Avatar = new PageAvatar().setLable(label);

        return this;
    }
}