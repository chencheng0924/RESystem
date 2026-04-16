<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { VersionHistoryController } from './STVersion.compsable';
import { VersionRecord, GroupedVersionRecord } from "./STVersion.model.ts";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
    data: {
        type: Array as () => VersionRecord[],
        default: () => [],
    }
})

const controller = new VersionHistoryController();
const selectedIndex = ref<number | null>(0);

const groupedVersions = computed<GroupedVersionRecord[]>(() => {
    return controller.getGroupedVersions();
});

const hasMore = computed(() => {
    return controller.hasMore();
});

const handleLoadMore = () => {
    controller.loadMore();
};

const handleVersionClick = (index: number) => {
    selectedIndex.value = index;
};

const isSelected = (index: number) => {
    return selectedIndex.value === index;
};

onMounted(async () => {
    controller.setVersions(props.data);
});
</script>

<template>
    <div class="w-full bg-foneBgLevel2 px-[8px] py-[20px] max-h-[844px] overflow-y-auto">
        <div v-for="(version, index) in groupedVersions" :key="index" @click="handleVersionClick(index)"
            class="p-[4px_12px] my-2 cursor-pointer transition-colors" :class="[
                isSelected(index) ? 'bg-fonePrimaryBg rounded' : '',
                index === 0 ? 'rounded' : ''
            ]">
            <div class="flex items-center mb-[2px] gap-[8px]">
                <span class="text-h3" :class="isSelected(index) ? 'text-fonePrimaryClick' : 'text-commTextLevel1'">
                    {{ index === 0 ? t('Components.STVersion.CurrentVersion') : version.timeLabel }}
                </span>
                <template v-if="index === 0">
                    <span :class="isSelected(index) ? 'text-fonePrimaryClick' : 'text-commTextLevel1'">｜</span>
                    <span class="text-h5" :class="isSelected(index) ? 'text-fonePrimaryClick' : 'text-commTextLevel1'">
                        {{ version.timeLabel }}</span>
                </template>
            </div>
            <div class="flex flex-col gap-[8px]">
                <div v-for="user in version.users" :key="user.userId || user.name" class="flex items-center gap-[8px]">
                    <Avatar v-if="user.avatar" :image="user.avatar" shape="circle" size="normal"
                        class="!w-[32px] !h-[32px]" />
                    <Avatar v-else :label="user.name.slice(0, 1)" shape="circle" size="normal"
                        class="!w-[32px] !h-[32px] !text-[14px]" />
                    <span class="text-body3 text-foneTextLevel2">
                        {{ user.name }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="hasMore" class="p-[4px_12px] cursor-pointer" @click="handleLoadMore">
            <span class="text-fonePrimaryMain text-h5">{{ t('Components.STVersion.More') }}</span>
        </div>
    </div>
</template>