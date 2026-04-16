<script setup lang="ts">
import STCard from './STCard.vue';

const props = defineProps({
    title: {
        type: String,
    },
    number: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconBlock: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    subDesc: {
        type: String,
    }
})
</script>

<template>
    <div>
        <STCard class="!shadow-none">
            <template #title>
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">{{ props.title }}</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ props.number }}</div>
                    </div>
                    <div class="flex items-center justify-center rounded-border" style="width: 2.5rem; height: 2.5rem"
                        :class="props.iconBlock">
                        <i :class="props.icon"></i>
                    </div>
                </div>
            </template>
            <template #content>
                <span class="text-primary font-medium">{{ props.subTitle }}</span>
                <span class="text-muted-color">{{ props.subDesc }}</span>
            </template>
        </STCard>
    </div>
</template>
