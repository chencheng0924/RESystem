<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
    }
})
</script>

<template>
    <div v-if="props.text" class="errorText mt-[0.5rem] text-body2 text-foneThemeRed">
        {{ props.text }}
    </div>
</template>
