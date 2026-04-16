<template>
  <svg class="icon" aria-hidden="true">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">

defineProps<{
  name: string
 
}>()
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
