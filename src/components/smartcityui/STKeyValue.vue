<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<{ name: string; value: string }>>,
    default: () => [{ name: '', value: '' }]
  }
})

let c = ref<Array<{ name: string; value: string }>>([...props.modelValue])

watch(c, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })


watch(() => props.modelValue, (newVal) => {
  c.value = newVal
}, { deep: true })

const emit = defineEmits(['update:modelValue','addKeyValueItem','deleteKeyValueItem'])
const addKeyValueItem = (data) =>{
    emit('addKeyValueItem',data)
}
const deleteKeyValueItem = (data,index) => {
    emit('deleteKeyValueItem',data,index)
}
</script>

<template>
  <div class="flex flex-col gap-[var(--item-gap)]">
    <div
      v-for="(item, index) in c"
      :key="index"
      class="w-full m-auto gridWrapper grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div class="gridContent flex flex-col gap-[var(--label-gap)]">
        <InputText placeholder="名稱" v-model="item.name" />
      </div>
      <div class="gridContent flex flex-col gap-[var(--label-gap)]">
        <InputText placeholder="值" v-model="item.value" />
      </div>
      <div class="flex justify-center items-center w-10">
        <i class="pi pi-plus-circle cursor-pointer" v-if="index === 0" @click="addKeyValueItem(c)"></i>
        <i class="pi pi-minus-circle cursor-pointer" v-if="index !== 0" @click="deleteKeyValueItem(c,index)"></i>
      </div>
    </div>
  </div>
</template>