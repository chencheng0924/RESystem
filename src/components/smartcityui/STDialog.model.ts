import { PageSectionCustom } from "@/lib/pageBuilder/core/PageSection";
import { STAction } from "./STCommon.model";

export class STDialogProps {

    visible?: boolean = false;
    title?: string;
    dialogContent?: STDialogContent;
    actions: Array<STDialogActions> = [];
    mesage?: string;
    customSection?: PageSectionCustom;

    isControllerView?: boolean = false;
    controllerType?: string;
    controllerPKID?: string;
    isGoBack?: boolean = false;
    SectionClass?: string = ''

    constructor(init?: Partial<STDialogProps>) {
        Object.assign(this, init);
    }


    setControllerView(isControllerView: boolean) {
        this.isControllerView = isControllerView;
        return this;
    }
    setControllerType(type: string) {
        this.controllerType = type;
        return this;
    }
    setControllerPKID(id: string) {
        this.controllerPKID = id;
        return this;
    }





}


export class STDialogEvent {
    constructor(init?: Partial<STDialogEvent>) {
        Object.assign(this, init);
    }
    actionItem?: Function;
    change?: Function;
    gobackfunction?: Function;
}


export class STDialogContent {
    Component?: any;
    Props?: any;
    Attrs?: any;
    Events?: any;
    Id?: string;
    value?: any;

    constructor(init?) {
        Object.assign(this, init);
    }

}

export class STDialogActions extends STAction {
    constructor(init?: Partial<STDialogActions>) {
        super(init)
    }
}


export class DialogControllerViewStore {
    static controllerViewKey = 'DialogControllerViewStore';
    static setControllrt(controller: any) {
        window[DialogControllerViewStore.controllerViewKey] = controller
    }
    static getController() {
        return window[DialogControllerViewStore.controllerViewKey];
    }
}