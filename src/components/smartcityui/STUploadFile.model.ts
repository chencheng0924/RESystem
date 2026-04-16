import { MenuItem } from "primevue/menuitem";
import { STAction } from "./STCommon.model";

export class STUploadFileProps {

    name?: string;
    id?: string;
    postUrl?: string;
    multiple?: boolean = false;
    maxFileSize?: number = 1000000;
    emptyMessage?: string = "請拖曳檔案至此區域";
    customUpload?: boolean = true;
    accept?: string = 'image/*'

    constructor(init?: Partial<STUploadFileProps>) {
        Object.assign(this, init);
    }

    setNameAndId(id: string) {
        this.id = id;
        this.name = id;
        return this;
    }
    setMultiple(multiple: boolean) {
        this.multiple = multiple;
        return this;
    }
    setPostUrl(url: string) {
        this.postUrl = url;
        return this;
    }
    setSize(size: number) {
        this.maxFileSize = size;
        return this;
    }
    setEmptyMessage(msg: string) {
        this.emptyMessage = msg;
        return this;
    }
}


export class STUploadFileEvent {
    constructor(init?: Partial<STUploadFileEvent>) {
        Object.assign(this, init);
    }
    eventUploadAfter?: Function;
    eventRemove?: Function;
    eventRemoveUploadedFile?: Function;

}
