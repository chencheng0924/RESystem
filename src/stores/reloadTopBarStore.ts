import { ref } from 'vue'
import { defineStore } from 'pinia'
export const ReloadTopBarStore = defineStore('reloadTopBarStore', () => {
    const reloadTopBarkey = ref<number>(0)
    return {
        reloadTopBarkey
    }
})
