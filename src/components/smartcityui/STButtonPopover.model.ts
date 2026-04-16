import { STButtonStyle } from "./STButton.model";
import { STMenubarAction } from "./STMenubar.model";
import { ThemeSwitchController } from "./STThemeMode.compsable";


export class STButtonPopoverProps {
    actions?: Array<STMenubarAction>
    constructor(init?: Partial<STButtonPopoverProps>) {
        Object.assign(this, init);
    }

    setItems(items: Array<STMenubarAction>) {
        this.actions = items;
    }

}


export class STButtonPopoverEvent {
    constructor(init?: Partial<STButtonPopoverEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;
    eventActionSubBtn?: Function;
}



export class STButtonPopoverStyle extends STButtonStyle {

}

export class STButtonPopover {
    private emit: any
    private $t: any
    private props: any
    public themeController: ThemeSwitchController
    constructor(emit: any, t: any, props) {
        this.emit = emit
        this.$t = t
        this.props = props
        this.themeController = new ThemeSwitchController(false)
        this.convertActions()
    }

    convertActions() {
        let defaultAction = [
            new STMenubarAction({
                Id: 'selection',
                Url: `ic_more_${this.themeController.getModeString()}`,
                SeverityColor: 'secondary',
                ClassName: '!bg-transparent !rounded-none border-none',
            }).setItems(this.$t)
        ]
        if(!this.props.actions || this.props.actions.length == 0) {
            return defaultAction
        } else {
            // let newActions = [...defaultAction, ...this.props.actions]
            // return newActions.reverse()
            return this.props.actions
        }
    }
}