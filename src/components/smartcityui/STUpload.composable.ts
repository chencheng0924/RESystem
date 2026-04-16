import { ref, Ref } from 'vue';
import { FileUploadPassThroughOptions } from 'primevue/fileupload';

export class UseUpload {

}

export class UseUploadStyle {
    public basicUploadOption: Ref<FileUploadPassThroughOptions>
    public advancedUploadOption: Ref<FileUploadPassThroughOptions>
    public combinedUploadOption: Ref<FileUploadPassThroughOptions>

    constructor() {
        this.basicUploadOption = ref(this.getBasicUploadStyleOption())
        this.advancedUploadOption = ref(this.getAdvancedUploadStyleOption())
        this.combinedUploadOption = ref(this.getCombinedUploadStyleOption())
    }

    public getBasicUploadStyleOption() {
        return {
            root: ({ context, props }) => ({
                class: [
                    '!border-0 !rounded-none',
                ]
            }),
            header: ({ context, props }) => ({
                class: [
                    '!px-0',
                    '!border-0  !rounded-none',
                ]
            }),
            content: ({ context, props }) => ({
                class: [
                    '!hidden',
                    'flex flex-col gap-[8px]',
                ]
            }),
            empty: ({ context, props }) => ({
                class: [
                    '!hidden',
                    '!order-1',
                ]
            }),
            pcChooseButton: {
                root: ({ context, props }) => ({
                    class: [
                        '!bg-transparent !text-[#4C37CD]',
                    ]
                })
            }
        }
    }
    public getAdvancedUploadStyleOption() {
        return {
            root: ({ context, props }) => ({
                class: [
                    '!px-0 !pt-0',
                    '!border-0 !rounded-none',
                ]
            }),
            header: ({ context, props }) => ({
                class: [
                    '!hidden',
                    '!border-0  !rounded-none',
                ]
            }),
            content: ({ context, props }) => ({
                class: [
                    '!px-0 !pt-0',
                    'flex flex-col gap-[8px]',
                ]
            }),
            empty: ({ context, props }) => ({
                class: [
                    '!order-1',
                ]
            }),
            pcChooseButton: {
                root: ({ context, props }) => ({
                    class: [
                        '!bg-transparent !text-[#4C37CD]',
                    ]
                })
            }
        }
    }
    public getCombinedUploadStyleOption() {
        return {
            root: ({ context, props }) => ({
                class: [
                    '!border-0 !rounded-none',
                ]
            }),
            header: ({ context, props }) => ({
                class: [
                    '!px-0',
                    '!pb-0',
                    '!border-0  !rounded-none',
                ]
            }),
            content: ({ context, props }) => ({
                class: [
                    '!px-0',
                    'flex flex-col gap-[8px]',
                ]
            }),
            empty: ({ context, props }) => ({
                class: [
                    '!px-0',
                    '!order-1',
                ]
            }),
            pcChooseButton: {
                root: ({ context, props }) => ({
                    class: [
                        '!bg-transparent !text-[#4C37CD]',
                    ]
                })
            }
        }
    }
    
}