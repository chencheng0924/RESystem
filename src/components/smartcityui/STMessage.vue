<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    severity: {
        type: String,
    },
    icon: {
        type: String,
    },
    life:{
        type:Number
    },
    className: {
        type: String,
    }
})

const pt = {
    root: ({ props }) => ({
        class: [
            {
                'border-1 border-blue-300': props.severity == 'info',
                'border-1 border-green-300': props.severity == 'success',
                'border-1 border-surface-300': props.severity == 'secondary',
                'border-1 border-orange-300': props.severity == 'warn',
                'border-1 border-red-300': props.severity == 'error',
                'border-1 border-purple-300': props.severity == 'contrast'
            },
        ]
    })
}

</script>

<template>
    <div class="w-full" v-if="!!props.text">
        <Message :severity="props.severity" :icon="props.icon" :pt="pt" :life="props.life" :class="props.className">
            <div class="w-full font-bold" v-if="props.title != ''">{{ props.title }}</div>
            <div class="w-full">{{ props.text }}</div>
        </Message>
    </div>
</template>
