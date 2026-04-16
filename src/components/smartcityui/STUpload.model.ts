import { Parser } from "marked";

export class UploadProps {
    id?: string;
    styleType?: UploadStyleType = UploadStyleType.ADVANCED;
    acceptFileType?: string = null;
    disabled?: boolean = false;
    name?: string;
    postUrl?: string;
    multiple?: boolean = true;
    maxFileSize?: number = 10000000;
    fileLimit?: number = null;
    customUpload?: boolean = true;
    auto?: boolean = true;
    showUploadStatus?: boolean = true;
    showUploadButton?: boolean = false;
    showCancelButton?: boolean = false;
    chooseLabel?: string = '選擇檔案';
    chooseIcon?: string = 'pi pi-upload';
    cancelLabel?: string = '取消';
    cancelIcon?: string = 'pi pi-times';
    uploadLabel?: string = '上傳';
    uploadIcon?: string = 'pi pi-check';
    withCredentials?: boolean = false;
    uploadFunction?: Function = null;

    currentFiles?: Array<UploadFile> = []

    constructor(init?: Partial<UploadProps>) {
        Object.assign(this, init);
    }

    setStyleType(styleType: UploadStyleType) {
        this.styleType = styleType;
        return this;
    }
    setAcceptFileType(fileType: string) {
        this.acceptFileType = fileType;
        return this;
    }
    setDisabled(disabled: boolean) {
        this.disabled = disabled;
        return this;
    }
    setName(name: string) {
        this.name = name;
        return this;
    }
    setUrl(url: string) {
        this.postUrl = url;
        return this;
    }
    setMultiple(multiple: boolean) {
        this.multiple = multiple;
        return this;
    }
    setMaxFileSize(maxFileSize: number) {
        this.maxFileSize = maxFileSize;
        return this;
    }
    setFileLimit(fileLimit: number) {
        this.fileLimit = fileLimit;
        return this;
    }
    setCustomUpload(customUpload: boolean) {
        this.customUpload = customUpload;
        return this;
    }
    setAuto(auto: boolean) {
        this.auto = auto;
        return this;
    }
    setShowUploadButton(showUploadButton: boolean) {
        this.showUploadButton = showUploadButton;
        return this;
    }
    setShowCancelButton(showCancelButton: boolean) {
        this.showCancelButton = showCancelButton;
        return this;
    }
    setChooseLabel(chooseLabel: string) {
        this.chooseLabel = chooseLabel;
        return this;
    }
    setChooseIcon(chooseIcon: string) {
        this.chooseIcon = chooseIcon;
        return this;
    }
    setCancelLabel(cancelLabel: string) {
        this.cancelLabel = cancelLabel;
        return this;
    }
    setCancelIcon(cancelIcon: string) {
        this.cancelIcon = cancelIcon;
        return this;
    }
    setUploadLabel(uploadLabel: string) {
        this.uploadLabel = uploadLabel;
        return this;
    }
    setUploadIcon(uploadIcon: string) {
        this.uploadIcon = uploadIcon;
        return this;
    }
    setWithCredentials(withCredentials: boolean) {
        this.withCredentials = withCredentials;
        return this;
    }
    setUploadFunction(uploadFunction: Function) {
        this.uploadFunction = uploadFunction;
        return this;
    }

    setCurrentFiles(currentFiles: Array<UploadFile>) {
        this.currentFiles = currentFiles;
        return this;
    }
}

export class UploadEvent {
    constructor(init?: Partial<UploadEvent>) {
        Object.assign(this, init);
    }

    eventSelectedFiles?: Function;
    eventUploadAfter?: Function;
    eventCustomUploadAfter?: Function;
    eventBeforeSend?: Function;
    eventBeforeUpload?: Function;
    eventRemove?: Function;
    eventRemoveUploadedFile?: Function;
    eventError?: Function;
}

export class UploadFile {
    name: string; // name or name.pdf
    size: number; // 1024 bytes => 1KB
    type: string; // contentType => image/png 
    status: UploadFileStatus;
    hasDelete?: boolean = true;// 是否可刪除


    constructor(init?: Partial<UploadFile>) {
        Object.assign(this, init);
    }

    setSize(size?: string) {
        if (size == undefined || size == null) {
            return this;
        }

        let n = Number.parseFloat(size);

        this.size = n;
        return this;

    }
    setStatus(status?: string) {
        if (status == undefined || status == null) {
            this.status = UploadFileStatus.SUCCESS;
            return this;
        }


        if (status == "success") {
            this.status = UploadFileStatus.SUCCESS;
        }
        else if (status == "error") {
            this.status = UploadFileStatus.ERROR;
        }
        else {
            this.status = UploadFileStatus.PENDING;
        }

        return this;
    }
}

export enum UploadStyleType {
    BASIC = 'basic',
    ADVANCED = 'advanced',
    COMBINED = 'combined',
}

export enum UploadFileStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error',
}