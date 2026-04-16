<script setup lang="ts">
import { ref } from 'vue'
import inputText from 'primevue/inputtext'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeHolder: {
    type: String,
    default: '',
  },
  stylePt: {
    type: Object,
    default: {}
  },
  targetmodel: {
    type: String,
    default: '',
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
const updateValue = (val: string) => {
  emit('update:modelValue', val)
}
</script>
<style>

</style>
<template>
    <inputText :disabled="props.isDisabled" :modelValue="targetmodel" @update:modelValue="updateValue" :placeHolder="props.placeHolder" :pt="props.stylePt" />
</template>