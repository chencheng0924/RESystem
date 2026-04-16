<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    postUrl: {
        type: String,
    },
    multiple: {
        type: Boolean,
        default: false
    },
    maxFileSize: {
        type: Number,
        default: 1000000
    },
    emptyMessage: {
        type: String,
        default: 'Components.STUploadFile.Drag_File'
    },
    customUpload: {
        type: Boolean,
        default: true
    },
    accept: {
        type: String,
        default: 'image/*'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['eventUploadAfter', "eventRemove", "eventRemoveUploadedFile"])
const uploadAfter = (e) => {
    emit('eventUploadAfter', e)
}
const eventRemove = (e) => {
    console.log("eventRemove");
    emit('eventRemove', e)
}

const eventRemoveUploadedFile = (e) => {
    console.log("eventRemoveUploadedFile");
    emit('eventRemoveUploadedFile', e)
}


</script>

<template>
    <div class="w-full">
        <FileUpload :id="props.id" :name="props.name" :url="props.postUrl" @uploader="uploadAfter($event)"
            :multiple="props.multiple" :accept="props.accept" :maxFileSize="props.maxFileSize" @remove="eventRemove"
            @removeUploadedFile="eventRemoveUploadedFile" customUpload :disabled="props.disabled">
            <template #empty>
                <span>{{ t(props.emptyMessage) }}</span>
            </template>
        </FileUpload>
    </div>
</template>
