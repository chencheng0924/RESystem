<!-- 
  STDatePicker
-->
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { STDatePickerProps, STDatePickerSelectionMode } from './STDatePicker.model'
import { UseSTDatePicker, UseSTDatePickerStyle } from './STDatePicker.composable'

const props = withDefaults(defineProps<{
  props?: STDatePickerProps
}>(), {
  props: () => (new STDatePickerProps({
    inline: false,
    numberOfMonths: 1,
    selectionMode: STDatePickerSelectionMode.SINGLE
  }))
})

const controller = new UseSTDatePicker(props.props)
const style = new UseSTDatePickerStyle()

const emit = defineEmits<{
  'update:value': [val: Date | Date[]]
}>()

const update = (val: Date | Date[]) => {
  emit('update:value', val)
}
</script>

<template>
  <DatePicker v-model:modelValue="controller.datePickerProps.value.Value" :inline="controller.datePickerProps.value.inline"
    :numberOfMonths="controller.datePickerProps.value.numberOfMonths" :selectionMode="controller.datePickerProps.value.selectionMode" :selectOtherMonths="true"
    @update:modelValue="update" :appendTo="'self'" :placeholder="controller.datePickerProps.value.Placeholder" :id="controller.datePickerProps.value.Id" :pt="style.datePickerStyleOption.value">
      <template #date="slotProps">
        <div v-if="slotProps.date.today"
          class="after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:rounded-[50%] after:content-[' '] after:w-[4px] after:h-[4px] after:bg-fonePrimaryMain">
          {{ slotProps.date.day }}
        </div>
        <template v-else>{{ slotProps.date.day }}</template>
      </template>
    </DatePicker>
</template>

<style lang="scss" scoped>
:deep(.p-datepicker-day-cell:has(.p-datepicker-day-selected)) {
  padding: 0px !important;
  width: 45.5px;
  height: 45.5px;
  border-radius: 4px;
  background-color: var(--comm-primary-main);
}

:deep(.p-datepicker-day-cell:has(.p-datepicker-day-selected-range)) {
  background-color: transparent;
  padding: 0;
}

:deep(.p-datepicker-day-selected) {
  margin: 0;
  width: 45.5px;
  height: 40px;
  border-radius: 0px;

  &:focus-visible {
    box-shadow: none;
  }
}

:deep(.p-datepicker-day-selected-range) {
  width: 45.5px;
  height: 40px;
  background-color: var(--comm-primary-bg);
  border-radius: 0;
}
</style>