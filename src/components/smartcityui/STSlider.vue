<script lang="ts" setup>
import { STSliderProps } from './STSlider.model'
import { UseSTSlider } from './STSlider.composable'
import { SliderSlideEndEvent } from 'primevue/slider'
const props = withDefaults(defineProps<{
  props?: STSliderProps
}>(), {
  props: () => (new STSliderProps({
    value: 0
  }))
})
const emit = defineEmits<{
  'update:modelValue': [val: number | number[]]
}>()
const controller = new UseSTSlider(emit, props.props.value)
</script>
<template>
  <Slider v-model="controller.modelValue.value" class="w-full" @slideend="(val: SliderSlideEndEvent) => controller.updateValue(val.value)" :min="props.props.min" :max="props.props.max" :step="props.props.step" :range="props.props.range" />
</template>