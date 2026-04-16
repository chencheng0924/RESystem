<script setup lang="ts">
import { computed } from 'vue';
import { useIconButtonStyle } from './STIconButton.composable'
import { STIconButtonProps } from './STIconButton.model'
const { tooltipStyleOption } = new useIconButtonStyle()
const emit = defineEmits(['onClick'])
const props = defineProps<{
  props: STIconButtonProps
}>()
const pos = { position: props.props.tooltipPosition }
</script>

<template>
  <div class="flex justify-center items-center cursor-pointer p-[8px]" :class="{ 'flex-col': props.props.isVertical, 'bg-crmPrimaryBg rounded-[4px]': props.props.isClicked }" @click="emit('onClick')"
    v-tooltip:[pos]="{ value: props.props.tooltipText, pt: tooltipStyleOption }">
    <img :src="props.props.iconDisabledUrl" alt="disabled icon" v-if="props.props.isDisabled">
    <img :src="props.props.isClicked ? props.props.iconClickedUrl : props.props.iconUrl" v-else>
    <span class="text-body2 text-crmTextLevel1" :class="{'!text-crmPrimaryClick': props.props.isClicked, '!text-crmTextDisable': props.props.isDisabled}" v-if="!!props.props.label">{{ props.props.isClicked && !!props.props.clickedLable ? props.props.clickedLable : props.props.label }}</span>
  </div>
</template>
