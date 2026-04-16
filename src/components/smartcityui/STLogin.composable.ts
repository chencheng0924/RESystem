import { ref, Ref } from "vue";
import { STFormItem, STFormInputType } from "./STForm.model";
import { TabsPassThroughOptions } from 'primevue/tabs';
import { TabListPassThroughOptions } from 'primevue/tablist';
import { TabPassThroughOptions } from 'primevue/tab';
import { TabPanelsPassThroughOptions } from 'primevue/tabpanels';
import { TabPanelPassThroughOptions } from 'primevue/tabpanel';
import { ButtonPassThroughOptions } from 'primevue/button';




export class UseLoginForm {
    public itemFields: Ref<Array<STFormItem>>;
    public ToggleSwitch(item) {

        if (item.toggle == false) {
            item.InputType = STFormInputType.Text
            item.toggle = true
        } else {
            item.InputType = STFormInputType.Password
            item.toggle = false
        }

    }
}

export class UseLoginTabsStyle {
    public loginTabsStyle: Ref<TabsPassThroughOptions>;
    public loginTabListStyle: Ref<TabListPassThroughOptions>;
    public loginTabStyle: Ref<TabPassThroughOptions>;
    public loginTabPanelsStyle: Ref<TabPanelsPassThroughOptions>;
    public loginTabPanelStyle: Ref<TabPanelPassThroughOptions>;
    public loginButtonStyle: Ref<ButtonPassThroughOptions>;
    constructor() {
        this.loginTabsStyle = ref(this.getloginTabsStyle());
        this.loginTabListStyle = ref(this.getloginTabListStyle());
        this.loginTabStyle = ref(this.getloginTabStyle());
        this.loginTabPanelsStyle = ref(this.getloginTabPanelsStyle());
        this.loginTabPanelStyle = ref(this.getloginTabPanelStyle());
        this.loginButtonStyle = ref(this.getloginButtonStyle());

    }
    public getloginTabsStyle() {
        return {
            root: ({ props }) => ({
                class: []
            })
        };
    };

    public getloginTabListStyle() {
        return {
        }
    };

    public getloginTabStyle() {
        return {
            root: ({ props, context }) => ({
                class: [
                    'relative shrink-0',
                    '!bg-commBg',
                    // Shape
                    '!border-t-0',
                    '',
                    // Spacing
                    'w-[160px]',
                    '!py-4 !px-4',
                    '-mb-px',
                    // Colors and Conditions
                    'outline-transparent',
                    {
                        '!border-b-2 !border-commBorder !text-commTextLevel2': !context.active,
                        '!border-fonePrimaryMain': context.active,
                        'bg-commBg': context.active,
                        '!border-b-2 !text-fonePrimaryMain': context.active,
                    },

                ]
            })
        }
    };

    public getloginTabPanelsStyle() {
        return {
            root: ({ props }) => ({
                class: ['!bg-commBg', '!pt-6 !px-0 !pb-0']
            })
        }
    };

    public getloginTabPanelStyle() {
        return {
            root: ({ props }) => ({
                class: []
            })
        }
    }

    public getloginButtonStyle() {
        return {
            root: ({ props, context }) => ({
                class: [
                    // Disabled
                    { 'opacity-60 pointer-events-none cursor-default': context.disabled },
                    { '!border-fonePrimaryMain !bg-fonePrimaryMain': !context.disabled },
                ]
            }),
            label: ({ props }) => ({
                class: [
                    '!text-h3 text-commBgLevel1 dark:text-commBgLevel1',
                ]
            }),
        }
    }
}


