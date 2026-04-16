<script setup lang="ts">
import { computed, ref } from 'vue'
import { STTimeRangeItem, STTimeRangeItemStyle, STTimeType } from './STTimeSelect.model';
import { STDatePickerProps } from './STDatePicker.model';

const props = defineProps({
  timeRangeItems: {
    type: Array<STTimeRangeItem>,
    default: null,
  }
})


//-------------------------------------------------------------
const defaultRangeItems = [
  new STTimeRangeItem().setToDay('今日').setActive(true),
  new STTimeRangeItem().setWeek('近一週'),
  new STTimeRangeItem().setMonth('近一月'),
  new STTimeRangeItem().setYear('近一年'),
  new STTimeRangeItem().setCustom('自訂時間區間')
]

const popoverDatePicker = ref(null)
const itemRangeItemsRef = ref(props.timeRangeItems ?? defaultRangeItems);
const currentTitemRangeItem = ref(itemRangeItemsRef.value?.find(x => x.active == true))
const datePickerProps = ref<STDatePickerProps>(new STDatePickerProps().setTwoRange().setDefaultValue(currentTitemRangeItem.value))


const showCustomTimeResult = computed(() => {
  if (!!datePickerProps.value?.Value?.[0] && !!datePickerProps.value?.Value?.[1]) {
    return true
  } else {
    return false
  }
})
const customRangeTime = computed(() => {
  if (!!datePickerProps.value?.Value?.[0] && !!datePickerProps.value?.Value?.[1]) {
    return datePickerProps.value.toFormat()
  } else {
    return ''
  }
})

const style = new STTimeRangeItemStyle();

const emit = defineEmits(["eventActionBtn", "eventUpdateCustomDate"])

const actionBtn = (e, item: STTimeRangeItem) => {
  if (item.type == STTimeType.CUSTOM)
    popoverDatePicker.value.toggle(e);
  else
    datePickerProps.value.resetRangeValue();

  itemRangeItemsRef.value.forEach((x) => {
    if (x.label == item.label) {
      x.setActive(true);
      currentTitemRangeItem
    } else {
      x.setActive(false);
    }

  });
  currentTitemRangeItem.value = item;
  if (item.type == STTimeType.CUSTOM)
    return
  emit("eventActionBtn", e, itemRangeItemsRef.value)
}
const updateDatePicker = (val: Date[] | Date) => {
  datePickerProps.value.setRangeModeValue(val as Date[])

  let num = datePickerProps.value.getDayNumber()
  let d = datePickerProps.value.getEndDay();
  currentTitemRangeItem.value.setDayNumber(num)
    .setDay(d);


  if (d == null)
    return;
  emit("eventUpdateCustomDate", itemRangeItemsRef.value)
}

</script>
<template>
  <div class="flex">
    <div v-for="(setting, idx) in itemRangeItemsRef" :key="idx + 'setting'"
      class="flex items-center cursor-pointer hover:!bg-fonePrimaryBg hover:!text-fonePrimaryMain @hover:rounded-md"
      :class="{ '!text-fonePrimaryMain': setting.type == currentTitemRangeItem?.type }"
      @click="(e) => actionBtn(e, setting)">
      <div
        v-if="setting.type == STTimeType.CUSTOM && showCustomTimeResult && setting.type == currentTitemRangeItem.type"
        class="bg-commPrimaryBg p-[8px] rounded-[8px] text-commPrimaryClick text-body3">
        自訂：{{ customRangeTime }}
      </div>
      <div v-else
        class="p-[8px] text-body2 text-commTextLevel2 hover:bg-commPrimaryBg rounded-[6px] hover:text-commPrimaryHover"
        :class="{ '!text-commPrimaryClick !text-h4': setting.type == currentTitemRangeItem?.type }">
        {{ setting.label }}
      </div>
      <div class="w-[1px] h-[19px] bg-commBorder mx-[8px]" v-if="idx != (itemRangeItemsRef.length - 1)"></div>
    </div>
    <Popover ref="popoverDatePicker" :pt="style.getPopoverStyleOption()">
      <STDatePicker :props="datePickerProps" @update:value="(val) => updateDatePicker(val)" />
    </Popover>
  </div>
</template>
