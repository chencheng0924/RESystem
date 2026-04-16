<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { UseUploadStyle } from "@/components/smartcityui/STUpload.composable";
import { UploadStyleType, UploadFile, UploadFileStatus } from "@/components/smartcityui/STUpload.model";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
    id: {
        type: String,
        default: null
    },
    // 上傳的樣式
    styleType: {
        type: String,
        default: UploadStyleType.ADVANCED // 'BASIC', 'ADVANCED', 'COMBINED'
    },
    // 允許上傳的檔案類型
    acceptFileType: {
        type: String,
        default: null // null 表示不限制
    },
    // 是否禁用上傳功能
    disabled: {
        type: Boolean,
        default: false
    },
    // 是否上傳一次後就 disabled 禁用上傳
    uploadOnce: {
        type: Boolean,
        default: false
    },
    // 上傳檔案的名稱
    name: {
        type: String,
        default: null
    },
    // 上傳檔案的 URL，如果使用自定義上傳邏輯，此屬性無效
    postUrl: {
        type: String,
        default: null
    },
    // 是否允許多檔案上傳
    uploadMultiple: {
        type: Boolean,
        default: true
    },
    // 上傳檔案的最大大小，預設為 10MB
    maxFileSize: {
        type: Number,
        default: 10000000
    },
    // 限制上傳檔案數量
    fileLimit: {
        type: Number,
        default: null // null 表示不限制
    },
    // 是否使用自定義上傳邏輯
    customUpload: {
        type: Boolean,
        default: true
    },
    // 是否自動上傳檔案
    auto: {
        type: Boolean,
        default: true
    },
    // 是否顯示上傳狀態
    showUploadStatus: {
        type: Boolean,
        default: true
    },
    // 是否顯示上傳按鈕
    showUploadButton: {
        type: Boolean,
        default: false
    },
    // 是否顯示取消上傳按鈕
    showCancelButton: {
        type: Boolean,
        default: false
    },
    chooseLabel: {
        type: String,
        default: '選擇檔案'
    },
    chooseIcon: {
        type: String,
        default: 'pi pi-upload'
    },
    cancelLabel: {
        type: String,
        default: '取消'
    },
    cancelIcon: {
        type: String,
        default: 'pi pi-times'
    },
    uploadLabel: {
        type: String,
        default: '上傳'
    },
    uploadIcon: {
        type: String,
        default: 'pi pi-upload'
    },
    withCredentials: {
        type: Boolean,
        default: false
    },
    uploadFunction: {
        type: Function,
        default: null
    },
    currentFiles: {
        type: Array<UploadFile>,
        default: []
    }
})

const style = new UseUploadStyle()
// const toast = useToast()

const fileUploadRef = ref(null)
const filesManual: Ref<UploadFile[]> = ref(props.currentFiles ?? [])
const removeFileCallback = ref(null) // 移除檔案的 callback


const disabled = computed({
    get: () => props.disabled,
    set: (value) => {
        emit('update:disabled', value)
    }
})
const hasDropZone = computed(() => {
    return props.styleType === UploadStyleType.ADVANCED || props.styleType === UploadStyleType.COMBINED
})
const templateStyle = computed(() => {
    switch (props.styleType) {
        case UploadStyleType.BASIC:
            return style.basicUploadOption.value
        case UploadStyleType.ADVANCED:
            return style.advancedUploadOption.value
        case UploadStyleType.COMBINED:
            return style.combinedUploadOption.value
        default:
            return style.advancedUploadOption.value
    }
})


// 檔案類型不正確
const invalidFileTypeMessage = computed(() => {
    // {0}:為檔案名稱，primevue 會自動替換
    // {0}: 檔案格式不正確，僅支援 ${props.acceptFileType} 格式
    return `{0}: ${t('Components.Upload.invalidFileType', { fileType: props.acceptFileType })}`
})

// 檔案大小超過限制
const invalidFileSizeMessage = computed(() => {
    // {0}:為檔案名稱，{1}:為檔案大小限制，primevue 會自動替換
    // {0}: 檔案大小超過限制，檔案應小於 {1}`
    return `{0}: ${t('Components.Upload.invalidFileSize', { size: '{1}' })}`
})

// 檔案數量超過限制
const invalidFileLimitMessage = computed(() => {
    // {0}:為檔案數量，primevue 會自動替換
    // 檔案數量超過限制，數量不能超過 {0} 個
    return `${t('Components.Upload.MaximumFileLimit', { number: '{0}' })}`
})

const storedMessages = ref<any[]>([])

const saveMessages = (messages: any) => {
    if (messages?.length > 0) {
        storedMessages.value = [...messages]
    }
    return '' // template 中不顯示任何內容
}

const removeMessage = (index: number) => {
    if (index >= 0 && index < storedMessages.value.length) {
        storedMessages.value = storedMessages.value.filter((_, i) => i !== index)
    }
}

const saveRemovedFileCallback = (callbackFn) => {
    removeFileCallback.value = callbackFn
    return '' // template 中不顯示任何內容
}


const emit = defineEmits([
    'eventSelectedFiles',
    'eventUploadAfter',
    'eventCustomUploadAfter',
    'eventBeforeSend',
    'eventBeforeUpload',
    'eventRemove',
    'eventRemoveUploadedFile',
    'eventError',
    'update:disabled',
])


const onRemoveUploadedFile = (file, removeFileCallback, index) => {
    console.log('onRemoveUploadedFile');
    removeFileCallback(index)
    emit('eventRemoveUploadedFile', file)
}

const onSelectedFiles = (e) => {
    console.log('onSelectedFiles', e)

    const selectedFiles = e.files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        status: UploadFileStatus.PENDING, // 初始狀態為 PENDING
    }))
    // 過濾掉已經存在的檔案，避免重複添加
    // 使用檔案名稱和大小來確定是否為同一個檔
    const newFiles = selectedFiles.filter(newFile =>
        !filesManual.value.some(existingFile =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
        )
    )
    filesManual.value = [...newFiles, ...filesManual.value,]


    emit('eventSelectedFiles', e)
}

const onTemplatedUpload = (e) => {
    console.log('onTemplatedUpload', e)
    emit('eventUploadAfter', e)
}

const onCustomUploadAfter = async (e) => {
    console.log('onCustomUploadAfter', e)

    await Promise.resolve(props.uploadFunction?.(e)).then((response) => {
        // console.log('Custom upload response:', response)

        // 假設 response 包含成功與失敗的檔案資訊
        if (response) {
            filesManual.value.forEach((file, index) => {
                file.status = UploadFileStatus.SUCCESS

            })
            if (props.uploadOnce) {
                disabled.value = true
            }
        } else {
            filesManual.value.forEach((file, index) => {
                file.status = UploadFileStatus.ERROR
            })

            // const errorMessage = `上傳失敗: ${response.errorMessage || '未知錯誤'}`
            // emit('eventError', errorMessage)
        }
    }).catch((error) => {
        console.error('Custom upload error:', error)
        filesManual.value.forEach((file, index) => {
            file.status = UploadFileStatus.ERROR
        })
        // emit('eventError', `上傳失敗: ${error.message || '未知錯誤'}`)
    })

    emit('eventCustomUploadAfter', e)
}

const onBeforeUpload = (e) => {
    console.log('onBeforeUpload', e)
    emit('eventBeforeUpload', e)
}

const onBeforeSend = (e) => {
    console.log('onBeforeSend', e)
    emit('eventBeforeSend', e)
}

const onProgress = (e) => {
    console.log('onProgress', e)
    // emit('eventProgress', e)
}

const onError = (e) => {
    console.error('onError', e)
    emit('eventError', e)
}

const onRemove = (e) => {
    console.log('onRemove', e)
    emit('eventRemove', e)
}

const triggerFileInput = () => {
    if (props.disabled) return
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
        fileInput.click()
    }
}

const removeFileMenuItem = (index) => {
    filesManual.value.splice(index, 1)
}

// 用檔案名稱確定檔案類型
const getFileTypeByFileName = (fileName) => {
    const name = fileName.toLowerCase()
    let index = name.lastIndexOf('.');
    if (index == -1)
        return 'unknown'
    const fileExtension = name.slice(name.lastIndexOf('.')) || null // 副檔名
    const fileTypes = {
        image: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
        pdf: ['.pdf'],
        excel: ['.xls', '.xlsx', '.csv'],
        ppt: ['.ppt', '.pptx'],
        word: ['.doc', '.docx'],
    }

    for (const type in fileTypes) {
        if (fileTypes[type].includes(fileExtension)) {
            return type
        }
    }
    return 'unknown'
}

// 用 MIME 類型確定檔案類型
const getFileTypeByMIME = (fileType) => {
    const mimeTypes = {
        image: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
        pdf: ['application/pdf'],
        excel: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
        ppt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
        word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    }

    for (const type in mimeTypes) {
        if (mimeTypes[type].includes(fileType)) {
            return type
        }
    }

    return 'unknown'
}

// 驗證檔案格式
const validFileType = (fileType, fileName) => {

    if (fileType) {
        return getFileTypeByMIME(fileType) || 'unknown'
    }

    if (fileName) {
        return fileName ? getFileTypeByFileName(fileName) : 'unknown'
    }

    return 'unknown'
}

// 格式化檔案大小
// 將位元組數轉換為人類可讀的檔案大小格式（使用十進制，1KB = 1000B）
const formatSize = (bytes: number): string => {
    const k = 1000 // 十進制轉換基數
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'] // 檔案大小單位

    // 如果檔案大小為0，直接回傳'0 Bytes'
    if (bytes === 0) {
        return `0 ${sizes[0]}`
    }

    // 計算適合的單位級別（0=B, 1=KB, 2=MB, 3=GB, 4=TB）
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    // 將位元組轉換為對應單位並四捨五入為整數
    const formattedSize = Math.round(bytes / Math.pow(k, i))

    return `${formattedSize} ${sizes[i]}`
}

</script>

<template>
    <div>
        <!-- <Toast /> -->
        <FileUpload ref="fileUploadRef" :id="props.id" :accept="props.acceptFileType" :disabled="disabled"
            :name="props.name" :url="props.postUrl" :auto="props.auto" :customUpload="props.customUpload"
            :maxFileSize="props.maxFileSize" :fileLimit="props.fileLimit" :multiple="props.uploadMultiple"
            :showUploadButton="props.showUploadButton" :showCancelButton="props.showCancelButton"
            :chooseLabel="props.chooseLabel" :chooseIcon="props.chooseIcon" :cancelLabel="props.cancelLabel"
            :cancelIcon="props.cancelIcon" :uploadIcon="props.uploadIcon" :uploadLabel="props.uploadLabel"
            :invalidFileTypeMessage="invalidFileTypeMessage" :invalidFileSizeMessage="invalidFileSizeMessage"
            :invalidFileLimitMessage="invalidFileLimitMessage" :withCredentials="props.withCredentials"
            :pt="templateStyle" @beforeSend="onBeforeSend" @beforeUpload="onBeforeUpload" @select="onSelectedFiles"
            @upload="onTemplatedUpload($event)" @uploader="onCustomUploadAfter($event)" @error="onError"
            @remove="onRemove" @progress="onProgress">

            <!-- <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <Button @click="chooseCallback()" icon="pi pi-upload" outlined severity="primary" label="上傳檔案"></Button>
            </template> -->
            <template
                #content="{ files, uploadedFiles, messages, progress, removeUploadedFileCallback, removeFileCallback }">
                {{ saveRemovedFileCallback(removeFileCallback) }}
                {{ saveMessages(messages) }}
                <div v-if="(files.length > 0 && hasDropZone) || (uploadedFiles.length > 0 && hasDropZone)"
                    class="dropzoneContainer"
                    :class="{ 'cursor-not-allowed': props.disabled, 'cursor-pointer': !props.disabled }"
                    @click="triggerFileInput">
                    <i class="pi pi-plus font-bold"></i>
                    <div class="titleBlock">
                        <span>{{ t('Components.Upload.dropTxt') }}</span>
                        <span class="highlightText"> {{ t('Components.Upload.clickUpload') }}</span>
                    </div>
                    <div class="description">
                        {{ t('Components.Upload.fileTypeLimit') }}{{ props.acceptFileType || t('Components.Upload.any')
                        }}
                        │{{ t('Components.Upload.fileSizeLimit') }} {{ formatSize(props.maxFileSize) }}
                    </div>
                </div>
            </template>

            <template #empty>
                <div v-if="hasDropZone" class="dropzoneContainer"
                    :class="{ 'cursor-not-allowed': props.disabled, 'cursor-pointer': !props.disabled }"
                    @click="triggerFileInput">
                    <i class="pi pi-plus font-bold"></i>
                    <div class="titleBlock">
                        <span>{{ t('Components.Upload.dropTxt') }}</span>
                        <span class="highlightText"> {{ t('Components.Upload.clickUpload') }}</span>
                    </div>
                    <div class="description">
                        {{ t('Components.Upload.fileTypeLimit') }}{{ props.acceptFileType || t('Components.Upload.any')
                        }}
                        │{{ t('Components.Upload.fileSizeLimit') }} {{ formatSize(props.maxFileSize) }}
                    </div>
                </div>
            </template>
        </FileUpload>

        <div class="flex flex-col gap-[8px]">
            <template v-for="(message, index) of storedMessages" :key="message">
                <template v-if="!(message.split(':').length > 1)">
                    <Message severity="error">{{ message }}</Message>
                </template>
                <div v-if="message.split(':').length > 1"
                    class="flex p-2 rounded-border border border-[#E74852] items-center last:mb-[14px]">
                    <div class="grow flex items-center overflow-hidden">
                        <img class="shrink-0" src="@/assets/img/icon/cit_filetype_error.svg" alt="">
                        <div class="grow items-center min-w-0">
                            <div class="flex">
                                <span class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{{
                                    message.split(':')[0]
                                }}</span>
                            </div>
                            <div class="flex items-center">
                                <img class="shrink-0 w-[16px] h-[16px]" src="@/assets/img/icon/cit_validation_error.svg"
                                    alt="">
                                <div class="text-[#E74852] text-[12px]">{{ message.split(':')[1] }}</div>
                            </div>
                        </div>
                        <div class="shrink-0 flex gap-2 items-center">
                            <Button class="[&_.pi]:font-bold [&_.pi]:text-xl" icon="pi pi-trash" text severity="primary"
                                @click="removeMessage(index)" />
                        </div>
                    </div>
                </div>
            </template>

            <div v-for="(file, index) of filesManual" :key="file.name + file.type + file.size"
                class="flex p-2 rounded-border border border-surface items-center last:mb-[14px]"
                :class="{ '!border-[#E74852]': file.status === UploadFileStatus.ERROR && props.showUploadStatus }">
                <div class="grow flex items-center overflow-hidden">

                    <img v-if="validFileType(file.type, file.name) === 'image'" class="shrink-0"
                        src="@/assets/img/icon/cit_filetype_image.svg" alt="">
                    <img v-if="validFileType(file.type, file.name) === 'pdf'" class="shrink-0"
                        src="@/assets/img/icon/cit_filetype_pdf.svg" alt="">
                    <img v-if="validFileType(file.type, file.name) === 'excel'" class="shrink-0"
                        src="@/assets/img/icon/cit_filetype_xlsx.svg" alt="">
                    <img v-if="validFileType(file.type, file.name) === 'ppt'" class="shrink-0"
                        src="@/assets/img/icon/cit_filetype_pptx.svg" alt="">
                    <img v-if="validFileType(file.type, file.name) === 'word'" class="shrink-0"
                        src="@/assets/img/icon/cit_filetype_docx.svg" alt="">
                    <img v-if="props.showUploadStatus && file.status === UploadFileStatus.ERROR" class="shrink-0"
                        src="@/assets/img/icon/cit_filetype_error.svg" alt="">

                    <div class="grow items-center min-w-0">
                        <div class="flex">
                            <span class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">{{ file.name
                            }}</span>
                            <div
                                class="shrink-0 pl-2 ml-2 border-l border-[#D8D8D8] text-[#727272] dark:text-[#FFFFFF80] dark:border-[#39393D]">
                                {{ formatSize(file.size) }}</div>
                        </div>
                        <div v-if="props.showUploadStatus" class="flex items-center">
                            <template v-if="file.status === UploadFileStatus.PENDING">
                                <img class="shrink-0 w-[16px] h-[16px]" src="@/assets/img/icon/cit_sync_all.svg" alt="">
                                <div class="text-[#727272] text-[12px]">{{ t('Components.Upload.Pending') }}</div>
                            </template>
                            <template v-if="file.status === UploadFileStatus.SUCCESS">
                                <img class="shrink-0 w-[16px] h-[16px]"
                                    src="@/assets/img/icon/cit_validation_success.svg" alt="">
                                <div class="text-[#3ABC5D] text-[12px]">{{ t('Components.Upload.Success') }}</div>
                            </template>
                            <template v-if="file.status === UploadFileStatus.ERROR">
                                <img class="shrink-0 w-[16px] h-[16px]" src="@/assets/img/icon/cit_validation_error.svg"
                                    alt="">
                                <div class="text-[#E74852] text-[12px]">{{ t('Components.Upload.Failed') }}</div>
                            </template>
                        </div>
                    </div>
                    <div class="shrink-0 flex gap-2 items-center" v-if="file.hasDelete ?? true">
                        <Button class="[&_.pi]:font-bold [&_.pi]:text-xl" icon="pi pi-trash" text severity="primary"
                            @click="removeFileMenuItem(index), removeFileCallback(index)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dropzoneContainer {
    @apply flex flex-col items-center text-center gap-[4px] px-[24px] py-[32px] bg-[#F6F6F6] border rounded border-dashed;
    @apply dark:bg-[#2E2E2E] dark:text-[#FFFFFFCC] dark:border-[#39393D];

    .titleBlock {
        @apply font-bold text-h4;

        .highlightText {
            @apply text-[#0441C4] dark:text-[#91BFFF];
        }
    }

    .description {
        @apply dark:text-[#FFFFFF80];
    }
}
</style>