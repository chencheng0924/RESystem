import { ref } from 'vue'
import { defineStore } from "pinia";

export const permissionStore = defineStore('permissionStore', () => {
  const selectType = ref<string>('');
  const selectPkid = ref<string>('');
  const selectItemData = ref<any>({});
  return {
    selectType,
    selectPkid,
    selectItemData
  }
}, {
  persist: true
})
