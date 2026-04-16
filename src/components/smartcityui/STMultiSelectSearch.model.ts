
export class STMultiSelectSearchProps {
    options?: any[];
    selected?: any[];
    dialogTitle?: string;
    disabled?: boolean;
    invalid?: boolean;

    constructor(init?: Partial<STMultiSelectSearchProps>) {
        Object.assign(this, init);
    }

    setOptions(options: any[]) {
        this.options = options;
        return this;
    }
    setSelected(selected: any[]) {
        this.selected = selected;
        return this;
    }
    setDialogTitle(dialogTitle: string) {
        this.dialogTitle = dialogTitle;
        return this;
    }
    setDisabled(disabled: boolean) {
        this.disabled = disabled;
        return this;
    }
    setInvalid(invalid: boolean) {
        this.invalid = invalid;
        return this;
    }
}

export class STMultiSelectSearchEvent {
    constructor(init?: Partial<STMultiSelectSearchEvent>) {
        Object.assign(this, init);
    }

    eventInputChange?: Function;
    eventSelectedChange?: Function;
}