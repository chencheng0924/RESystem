<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { UseMultiSelectSearchStyle } from "@/components/smartcityui/STMultiSelectSearch.composable";


const props = defineProps({
    options: {
        type: Array as () => any[],
        default: () => []
    },
    selected: {
        type: Array as () => any[],
        default: () => []
    },
    dialogTitle: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    invalid: {
        type: Boolean,
        default: false
    },
})

const style = new UseMultiSelectSearchStyle()

const isVisible = ref(false)
const isComposing = ref(false)
const inputVal = ref('')

const list = computed(() => (props.options || []))
const dialogTitle = computed(() => props.dialogTitle || t('Components.STMultiSelectSearch.Tool'))
const selected = computed({
    get: () => props.selected,
    set: (value) => {
        emit('update:selected', value)
        emit('selectedChange', value)
    }
})

watch(() => [inputVal.value, isComposing.value], (newVal) => {
    const [input, composing] = newVal
    if (!composing) {
        emit('inputChange', input)
    }
})

const emit = defineEmits([
    'inputChange',
    'update:selected',
    'selectedChange'
])

const compositionStart = () => {
    isComposing.value = true
}

const compositionEnd = () => {
    isComposing.value = false
}

const onInputChange = (value: string) => {
    if (!isComposing.value) {
        inputVal.value = value
    }
}

const showDialog = () => {
    console.log("showDialog")
    if (props.disabled) {
        return
    }
    isVisible.value = true
}

const removeItem = (itemToRemove: any) => {
    selected.value = selected.value.filter(item => item.key !== itemToRemove.key)
}

const getChat = (data) => {
    return data?.getFirstChat();
}

</script>

<template>
    <div>
        <template v-if="selected.length === 0">
            <div class="rounded min-h-[35px] flex items-center justify-end p-3.5
                bg-[#f2f2f2] dark:bg-[#1d1d1e] dark:border border-foneBorder" :class="{
                    'cursor-not-allowed': props.disabled,
                    'cursor-pointer group': !props.disabled,
                    'border border-[#e74852] hover:border-[#fa5964b5]': props.invalid,
                    'hover:border-fonePrimaryHover': !props.disabled && !props.invalid
                }" @click="showDialog">
                <i class="pi pi-plus"
                    :class="{ 'group-hover:text-fonePrimaryMain': !props.disabled && !props.invalid }"></i>
            </div>
        </template>

        <template v-else>
            <ul class="flex flex-col gap-2" :class="{
                'border rounded !border-[#e74852]': props.invalid,
            }">
                <li v-for="(item, idx) in selected" :key="item.key" class="flex items-center justify-between rounded pl-3 py-2
                    bg-[#f2f2f2] dark:bg-[#1d1d1e] dark:border border-foneBorder" :class="{
                        'cursor-not-allowed': props.disabled,
                        'group hover:bg-fonePrimaryBg hover:border-fonePrimaryMain': !props.disabled,
                    }">
                    <div class="flex items-center">
                        <Avatar :label="getChat(item.value)" class="mr-2 shrink-0" size="large" />
                        <div class="group-hover:text-fonePrimaryMain">
                            <div>{{ item.value }}</div>
                            <div class="line-clamp-1">{{ item.desc }}</div>
                        </div>
                    </div>
                    <div class="flex flex-nowrap">
                        <Button v-if="idx === 0"
                            class="!text-foneTextLevel1 group-hover:!text-fonePrimaryMain hover:!bg-transparent"
                            :class="{ '!cursor-not-allowed': props.disabled }" size="small" icon="pi pi-plus" text
                            :disabled="props.disabled" @click="showDialog" />
                        <Button class="!text-foneTextLevel1 group-hover:!text-fonePrimaryMain hover:!bg-transparent"
                            size="small" icon="pi pi-trash" text :class="{ '!cursor-not-allowed': props.disabled }"
                            :disabled="props.disabled" @click="removeItem(item)" />
                    </div>
                </li>
            </ul>
        </template>

        <Dialog v-model:visible="isVisible" modal :header="dialogTitle" :style="{ width: '55rem' }"
            :pt="style.getDialogStyleOption()">
            <div class="flex gap-3 h-[60vh]">
                <div class="w-[40%] flex flex-col shrink-0">
                    <IconField>
                        <InputIcon class="pi pi-search !text-black dark:!text-white" />
                        <InputText v-model="inputVal" :placeholder="t('Components.STMultiSelectSearch.Search')"
                            :pt="style.getInputTextOption()" @update:modelValue="onInputChange"
                            @compositionstart="compositionStart" @compositionend="compositionEnd" />
                    </IconField>
                    <div class="font-bold text-lg my-2">{{ t('Components.STMultiSelectSearch.Selected') }}</div>
                    <div class="overflow-y-auto flex-1">
                        <ul class="flex flex-col gap-2">
                            <li v-for="item in selected" :key="item.key"
                                class="group flex items-center justify-between rounded pl-3 py-2 bg-fonePrimaryBg">
                                <span class="font-semibold text-fonePrimaryMain">{{ item.value }}</span>
                                <Button class="!text-fonePrimaryMain" size="small" icon="pi pi-trash" text rounded
                                    @click="removeItem(item)" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="overflow-y-auto">
                    <ul class="flex flex-col gap-2">
                        <li v-for="item in list" :key="item.key"
                            class="bg-[#f2f2f2] dark:bg-[#232324] py-2 px-3 rounded">
                            <div class="flex gap-3 items-center">
                                <Checkbox :inputId="item.key" name="checked" v-model="selected"
                                    :value="{ key: item.key, value: item.value }" />
                                <Avatar :label="getChat(item.value)" class="shrink-0" size="large" />

                                <label :for="item.key" class="cursor-pointer">
                                    <div class="font-semibold text-l"> {{ item.value }} </div>
                                    <div>{{ item.desc }}</div>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <template #footer>
                <Button class="!w-fit" :label="t('Components.STMultiSelectSearch.Close')" outlined
                    @click="isVisible = false" />
            </template>
        </Dialog>
    </div>
</template>