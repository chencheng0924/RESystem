<script lang="ts" setup>
import { watch } from 'vue';
import { CardData, SelectionMode } from './STCardSelect.model';
import { CardSelectController } from './STCardSelect.composable';
import STIcon from '@/components/Icon.vue'

const props = defineProps({
    data: {
        type: Array as () => CardData[],
        required: true
    },
    mode: {
        type: String as () => SelectionMode,
        default: 'multiple'
    },
});

const emit = defineEmits<{
    'update:modelValue': [value: string | string[]];
    'change': [event: { data: CardData | CardData[], count: number }];
    'selected': [data: CardData | CardData[]];
}>();

const controller = new CardSelectController(
    props.data,
    props.mode,
    emit
);

watch(() => props.data, (newData) => {
    controller.options.value = newData || [];

    // 根據新資料中 selected: true 的項目更新選取狀態
    const selectedItems = (newData || []).filter(opt => opt.selected);

    if (props.mode === SelectionMode.MULTIPLE) {
        controller.selectedValue.value = selectedItems.map(item => item.id || '');
    } else {
        controller.selectedValue.value = selectedItems.length > 0 ? (selectedItems[0].id || '') : '';
    }
});
</script>

<template>
    <div class="w-full">
        <div class="grid grid-nogutter grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            <div v-for="option in controller.options.value" :key="option.id"
                class="relative border-2 rounded-xl p-[16px] cursor-pointer min-w-[240px] min-h-[100px] flex flex-col"
                :class="[controller.isSelected(option.id) ? 'border-fonePrimaryClick bg-fonePrimaryBg' : 'border-foneBorder bg-white']"
                @click="controller.handleCardClick(option.id)">
                <div v-if="controller.isSelected(option.id)" class="absolute top-3 right-3">
                    <img src="@/assets/img/icon/ic_success_blue.svg" alt="check" class="w-full h-full">
                </div>
                <div class="flex gap-[11px] flex-1 items-center">
                    <div class="flex-shrink-0" v-if="option.icon">
                        <STIcon :name="option.icon" customClass="!w-[24px] !h-[24px]"
                            :class="controller.isSelected(option.id) ? 'text-fonePrimaryMain' : 'text-foneTextLevel1'">
                        </STIcon>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="text-h3"
                            :class="controller.isSelected(option.id) ? 'text-fonePrimaryMain' : 'text-foneTextLevel1'">
                            {{ option.title }}
                        </div>
                        <div class="text-foneTextLevel2 text-body2">
                            {{ option.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
