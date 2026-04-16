
import { Ref, ref } from 'vue'
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { ButtonPassThroughOptions } from 'primevue/button'
import { DataTablePassThroughOptions } from 'primevue/datatable'
import { PaginatorPassThroughOptions } from 'primevue/paginator';
import { DropdownPassThroughOptions } from 'primevue/dropdown'
import { btntype, STDataTableColumn, STTableViewLayout } from './STTable.model';
import { ToggleSwitchPassThroughOptions } from 'primevue/toggleswitch';

export class UseTableViewStyle {
    public inputTextStyleOption: Ref<InputTextPassThroughOptions>
    public confirmBtnStyleOption: Ref<ButtonPassThroughOptions>
    public resetBtnStyleOption: Ref<ButtonPassThroughOptions>
    public dataTableStyleOption: Ref<DataTablePassThroughOptions>
    public paginatorStyleOption: Ref<PaginatorPassThroughOptions>;
    public selectStyleOption: Ref<DropdownPassThroughOptions>
    public toggleSwitchStyleOption: Ref<ToggleSwitchPassThroughOptions>

    constructor() {
        this.inputTextStyleOption = ref(this.getInputTextStyleOption())
        this.confirmBtnStyleOption = ref(this.getConfirmBtnStyleOption())
        this.resetBtnStyleOption = ref(this.getResetBtnStyleOption())
        this.dataTableStyleOption = ref(this.getDataTableStyleOption())
        this.paginatorStyleOption = ref(this.getPaginatorStyleOption());
        this.selectStyleOption = ref(this.getSelectStyleOption())
        this.toggleSwitchStyleOption = ref(this.getToggleSwitchStyleOption())
    }

    public getInputTextStyleOption() {
        return {
            root: ({ props, state }) => ({
                class: [
                    'w-full border-2 border-grey border-solid py-2 px-5 focus:outline-Primary',
                ]
            }),
        }
    }
    public getConfirmBtnStyleOption() {
        return {
            root: () => {
                return {
                    class: [
                        'w-[5rem] h-[44px] bg-Primary text-white flex justify-center items-center cursor-pointer',
                    ]
                }
            }
        }
    }
    public getResetBtnStyleOption() {
        return {
            root: () => {
                return {
                    class: [
                        'w-[5rem] h-[44px] border-Primary border-[2px] border-solid bg-white text-Primary flex justify-center items-center cursor-pointer',
                    ]
                }
            }
        }
    }
    public getDataTableStyleOption() {
        return {
            // bodyrow: ({ context, props }) => ({
            //   class: ['flex items-center']
            // }),
            column: {
                headerCheckbox: {
                    box: ({ context }) => ({
                        class: {
                            'border-Primary bg-Primary': context.checked
                        },
                    })
                },
                headercell: ({ context }) => ({
                    class: ['bg-Primary']
                }),
                rowCheckbox: {
                    box: ({ context }) => ({
                        class: [
                            'border-[1.5px] border-solid border-Primary',
                            { 'border-Primary bg-Primary': context.checked }
                        ]
                    })
                }
            }
        }
    }
    private getPaginatorStyleOption() {
        return {
            paginatorWrapper: {
                class: ['bg-transparent']
            },
            root: {
                class: ['bg-transparent', 'mobile:px-2', 'miniMobile:!px-0',]
            },
            firstPageButton: ({ context }) => ({
                class: ['hidden']
            }),
            lastPageButton: ({ context }) => ({
                class: ['hidden']
            }),
            pages: () => ({
                class: ['flex gap-2']
            }),
            pageButton: ({ context, props }) => ({
                class: [
                    { 'bg-Primary !text-Surface text-h4 ': context.active },
                    'min-w-[2rem] h-[2rem]',
                    'rounded',
                    'text-TextLevelOne text-body2',
                    'hover:text-Hover',
                    'mobile:min-w-[1.3rem]',
                    'miniMobile:!min-w-[1rem]',
                ]
            }),
            rowPerPageDropdown: {
                root: ({ }) => ({
                    class: 'hidden'
                })
            }
        };
    }
    public getSelectStyleOption() {
        return {
            root: ({ props, state }) => ({
                class: [
                    'rounded-[0.5rem] border-[#E4E7EB] border-[2px] border-solid h-[44px]',
                    'cursor-pointer',
                    { 'outline-Primary': state.focused }
                ]
            }),
            input: ({ props }) => ({
                class: [
                    'text-body2 flex items-center h-[2.75rem] w-[10rem]',
                    { '!text-TextLevelOne': props.modelValue, '!text-[#acacac]': !props.modelValue },
                ]
            }),
            item: ({ context }) => ({
                class: [
                    'h-[3rem] my-[0.5rem] first:mt-0 last:mb-0',
                    'text-TextLevelOne', 'text-body2',
                    { 'bg-PrimaryBG !text-Primary text-h4': context.selected },
                    { 'bg-PrimaryBG': context.focused }
                ]
            }),
            itemLabel: {
                class: [
                    'truncate',
                    'text-wrap text-ellipsis overflow-hidden line-clamp-2'
                ]
            }
        };
    }
    public getToggleSwitchStyleOption() {
        return {
            // root: ({ props, state }) => ({
            //     class: [
            //         '!w-[44px] !h-[26px]'
            //     ]
            // }),
            handle: ({ props, state, context }) => ({
                class: [
                    {'bg-[red]': context.checked}
                ]
            }),
            // input: ({ props }) => ({
            //     class: [
            //         'text-body2 flex items-center h-[2.75rem] w-[10rem]',
            //         { '!text-TextLevelOne': props.modelValue, '!text-[#acacac]': !props.modelValue },
            //     ]
            // }),
            // item: ({ context }) => ({
            //     class: [
            //         'h-[3rem] my-[0.5rem] first:mt-0 last:mb-0',
            //         'text-TextLevelOne', 'text-body2',
            //         { 'bg-PrimaryBG !text-Primary text-h4': context.selected },
            //         { 'bg-PrimaryBG': context.focused }
            //     ]
            // }),
            // itemLabel: {
            //     class: [
            //         'truncate',
            //         'text-wrap text-ellipsis overflow-hidden line-clamp-2'
            //     ]
            // }
        }
    }
}
export class UseTableView {
    private locale?: any;
    private $t?: any;
    private $route?: any;
    public selectedProduct?: Ref<Array<any>>
    public actionList?: Ref<Array<string>>
    public dropDownModel?: Ref<STDataTableColumn>
    public inputModel?: Ref<string>
    public layoutMode?: Ref<STTableViewLayout>

    constructor(t, locale, route, layout: STTableViewLayout) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;
        this.selectedProduct = ref([])
        this.actionList = ref(['add', 'edit', 'delete'])

        this.dropDownModel = ref(null)
        this.inputModel = ref('')
        this.layoutMode = ref(layout)
        // this.searchDataList = ref([{ dropDownModel: '', inputModel: '' }])
        // this.searchDataParams = ref(null)
        this.init();
    }
    public init() {

    }
    public checkBtnType(type: string) {
        const check = this.selectedProduct.value.length
        if (type == btntype.editBtn) {
            if (check !== 1) {
                return true
            } else {
                return false
            }
        } else if (type == btntype.deleteBtn) {
            if (check > 0) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }
    public enterList(list: Array<STDataTableColumn>) {
        const result = list.map(item => item.field).join('/');
        return result
    }
    public resetSearchParams() {

        this.dropDownModel.value = null;
        this.inputModel.value = ''

    }
    public addSearchInput() {

    }
    public minusSearchInput(index: number) {

    }
    public checkKeyValue(item: any) {
        console.log(item)
        if (typeof item == 'object') {
            return true
        } else {
            return false
        }
    }
}