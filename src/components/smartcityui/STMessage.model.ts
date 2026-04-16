import { STButtonConfig } from "./STButton.model";

export class STMessageProps {

    title?: string;
    text?: string;
    icon?: string;
    severity?: string;
    life?: number;
    button: STButtonConfig;
    constructor(init?: Partial<STMessageProps>) {
        Object.assign(this, init);
    }



}

export enum STMessageType {
    ERROR = 'error',
    SECONDARY = 'secondary',
    INFO = 'info',
    SUCCESS = 'success',
    WARN = 'warn',
    CONTRAST = 'contrast'
}