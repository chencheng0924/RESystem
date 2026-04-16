import { ref } from 'vue'
import { defineStore } from 'pinia'
export const ReloadMenuStore = defineStore('reloadMenuStore', () => {
    const reloadKey = ref<number>(0)
    return {
        reloadKey
    }
})
