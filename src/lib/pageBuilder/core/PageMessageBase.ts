import { PageItemSeverityStyle } from "../enum/PageFormItemEnum";

export class PageMessageBase {
    constructor(init?) {
        Object.assign(this, init);

    }

    SeverityColor?: PageItemSeverityStyle = PageItemSeverityStyle.INFO; //danger
    Text?: string = ''
    Title?: string = ''
    IsColse?: boolean = false;
    Life?: number;

    setSeverity(color?: PageItemSeverityStyle) {
        this.SeverityColor = color;
        return this;
    }
    setText(txt?: string) {
        this.Text = txt;
        return this;
    }
    setTitle(title?: string) {
        this.Title = title;
        return this;
    }
    setSuccess() {
        return this.setSeverity(PageItemSeverityStyle.SUCCESS)
    }
    setInfo() {
        return this.setSeverity(PageItemSeverityStyle.INFO)
    }
    setWarn() {
        return this.setSeverity(PageItemSeverityStyle.WARN)
    }
    setError() {
        return this.setSeverity(PageItemSeverityStyle.ERROR)
    }
    setSecondary() {
        return this.setSeverity(PageItemSeverityStyle.SECONDARY)
    }
    setContrast() {
        return this.setSeverity(PageItemSeverityStyle.CONTRAST)
    }
    setDanger() {
        return this.setSeverity(PageItemSeverityStyle.DANGER)
    }
    setPrimary() {
        return this.setSeverity(PageItemSeverityStyle.NONE)
    }
    setHelp() {
        return this.setSeverity(PageItemSeverityStyle.HELP)
    }
    setClose(close: boolean) {
        this.IsColse = close;
        return this;
    }
}
