<script lang="ts" setup>
const emit = defineEmits(['isConnect', 'add'])
// const onAdd = () => emit('add')
</script>

<template>
	<div :class="['target', $style.line]" />
</template>

<style lang="scss" module>
.line{
	width: 6px;
	height: 8px;
	margin-left: -3px;
	background: var(--fone-border);
}
</style>
