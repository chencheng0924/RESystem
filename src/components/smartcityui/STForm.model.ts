import { ref, Ref } from "vue";
import { STComponentItem } from "./STCommon.model";

export class STFormProps {

    modelValue?: any;
    items?: Array<STFormItem> = [];

    constructor(init?: Partial<STFormProps>) {
        Object.assign(this, init);
    }
    setFormItems(items: Array<any>) {
        this.items = items;
        return this;
    }


}


export class STFormItem extends STComponentItem {

    constructor(init?) {
        super(init);
    }
}

export class STFormEvent {
    constructor(init?: Partial<STFormEvent>) {
        Object.assign(this, init);
    }
    submit?: Function;
    change?: Function;
    upload?: Function;
    uploadCallback?: Function;
    btnAction?: Function;
    deleteImage?: Function;
    init?: Function;
    iconBtnEvent?: Function;
    formBtnEvent?: Function;
    addItem?: Function;
    deleteItem?: Function;
    tabRowEvent?: Function;
    tabChangeItem?: Function;
    listClickEvent?: Function;
}


export enum STFormItemType {
    // primeVue component
    AutoComplete,
    CascadeSelect,
    Checkbox,
    CheckboxGroup,
    ColorPicker,
    DatePicker,
    Editor,
    FloatLabel,
    IconField,
    InputGroup,
    InputMask,
    InputNumber,
    InputOtp,
    InputText,
    InputTextRegular,
    Knob,
    Listbox,
    MultiSelect,
    MultiSelectSearch,
    Password,
    RadioButton,
    Rating,
    Select,
    SelectButton,
    Slider,
    Textarea,
    ToggleButton,
    ToggleSwitch,
    TreeSelect,
    Upload,
    MarkDown,
    Button,
    ThemeSwitch,
    ImageView,
    Tag,
    ProgressBar,

    CheckboxPassword,
    VerificationImg,
    Account,
    PasswordRule,
    VerificationCode,
    AI,
    MarkdownEditor,
    PageSection,
    IconButton,
    Divider,
    KeyValue,
    Accordion,
    TabList,
    Txt,
    List,
    SystemLanguage,
    ListSelect,
    CustomMenu
}

export enum STFormInputType {
    Text = "text",
    Password = "password",
}