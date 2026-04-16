import { ref, Ref } from 'vue';
import { DialogPassThroughOptions } from 'primevue/dialog';
import { InputTextPassThroughOptions } from 'primevue/inputtext';


export class UseMultiSelectSearchStyle {
    public dialogOption: Ref<DialogPassThroughOptions>
    public inputTextOption: Ref<InputTextPassThroughOptions>

    constructor() {
        this.dialogOption = ref(this.getDialogStyleOption())
        this.inputTextOption = ref(this.getInputTextOption())
    }

    public getDialogStyleOption() {
        return {
            header: () => ({
                class: [
                    'p-3',
                ]
            }),
            content: () => ({
                class: [
                    '!pt-3 !border-foneBorder border-t',
                ]
            }),
        }
    }
    public getInputTextOption() {
        return {
            root: () => ({
                class: [
                    // 'dark:!bg-[#2A2A32]',
                ]
            }),
        }
    }
}