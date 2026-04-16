import { ref } from 'vue'
import { defineStore } from "pinia";

export const mgmtStore = defineStore('mgmtStore', () => {
  const pageRoute = ref<string>('');

  const testState = ref<number>(10)

  const updateState = (val:any) => {
    testState.value = val
  }
  return {
    pageRoute,
    testState,
    updateState
  }
})
