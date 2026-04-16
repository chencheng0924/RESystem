import { ref } from 'vue'
import { defineStore } from "pinia";

export const dialogSearchStore = defineStore('dialogSearchStore', () => {
  const selectStore = ref<Array<any>>([]);
  return {
    selectStore,
  }
})
