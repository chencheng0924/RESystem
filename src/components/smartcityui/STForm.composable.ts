import { ref, Ref } from "vue";
import { STFormItem } from "./STForm.model";
import { InputTextPassThroughOptions } from 'primevue/inputtext';
import { InputIconPassThroughOptions } from 'primevue/inputicon';
import { CheckboxPassThroughOptions } from 'primevue/checkbox';
export class useForm {
    public itemFields: Ref<Array<STFormItem>>;


    private locale?: any;
    private $t?: any;
    private $route?: any;
    constructor(t, locale, route) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;

        this.itemFields = ref([]);

        this.init();
    }
    public init() {

    }
    public setItems(items: Array<STFormItem>) {
        this.itemFields.value = items;
    }
    public getItemGroupBy() {
        if (!this.itemFields.value.length) return
        return this.itemFields.value?.groupBy(x => x.RowIndex);
    }

    // 檢查若list裡面沒有value，則添加 Value 到 List 中的函式
    public addValueToListIfNotExists(list: any[], value: any[], optionValue?: string, allList?: any[]) {
        if (list == undefined || list == null)
            list = [];
        if (value != null && Array.isArray(value)) {
            value.forEach(singleValue => {
                if (singleValue != null && typeof singleValue === 'object') {
                    // 檢查 singleValue 是否只有 key 沒有 value
                    if (singleValue.key && !singleValue.value) {
                        // 從 allList 中找出對應的完整物件
                        const matchedItem = allList?.find(item => item.key === singleValue.key);
                        if (matchedItem) {
                            // 用完整的物件替換只有 key 的物件
                            Object.assign(singleValue, matchedItem);
                        }
                    }

                    const exists = list?.some(item => item.key === singleValue.key);
                    if (!exists) {
                        list.push(singleValue);
                    }
                } else if (typeof singleValue === 'string') {
                    // 如果是字串，直接從 allList 中找出對應的物件
                    const matchedItem = allList?.find(item => item.key === singleValue);
                    if (matchedItem) {
                        const exists = list?.some(item => item.key === matchedItem.key);
                        if (!exists) {
                            list.push(matchedItem);
                        }
                    }
                }
            });
        }
        return list;
    }
}



export class UseFormItemStyle {
    public inputTextStyle: Ref<InputTextPassThroughOptions>;
    public inputIconStyle: Ref<InputIconPassThroughOptions>;
    public checkboxStyle: Ref<CheckboxPassThroughOptions>;
    constructor() {
        this.inputTextStyle = ref(this.getInputTextStyle());
        this.inputIconStyle = ref(this.getInputIconStyle());
        this.checkboxStyle = ref(this.getCheckboxStyle())
    }
    public getInputTextStyle() {
        return {
            root: ({ props, context }) => ({
                class: [
                    'h-[40px]',
                    '!text-body2',
                    '!text-commTextLevel1',
                    'border',
                    { 'border-commThemeRed hover:!border-commThemeRed blur:!border-commThemeRed focus:!border-commThemeRed dark:border-commThemeRed': props.invalid },
                    // Invalid State
                    // 'focus:!border-fonePrimaryMain',
                    // 'hover:!border-fonePrimaryMain',
                    'blur:!border-commPrimaryClick',
                    'focus-visible:!ring-0',

                ]
            })
        };
    };

    public getInputIconStyle() {
        return {
            root: ({ props, context }) => ({
                class: [
                    '!top-[40%]',
                    // '!left-[6px]'

                ]
            })
        };
    };

    public getCheckboxStyle() {
        return {
            root: ({ props, context }) => ({
                class: [


                ]
            }),
            box: ({ props, context }) => ({
                class: [

                    {
                        'peer-hover:!border-fonePrimaryMain dark:peer-hover:border-fonePrimaryMain ': !context.checked && !props.invalid,
                        '!border-fonePrimaryMain !bg-fonePrimaryMain': context.checked,
                    }
                ]

            }),
            input: {
                class: [
                    'peer',

                ]
            },
        };
    }
}