<script setup lang="ts">
import { ref } from 'vue'
import { DateExtension } from "@/utils/dateExtension";
const props = defineProps({
  datas:{
    type: String,
    default: ''
  },
})
const emit = defineEmits(['update:modelValue','notifyEvent'])
const notifyEvent = (item) =>{
  emit('notifyEvent',item)
}

</script>

<template>
  <div v-html="props.datas"></div>
</template>