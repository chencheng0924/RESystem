import { ref } from 'vue'
import { defineStore } from 'pinia'
export const MenuStore = defineStore('MenuStore', () => {
    const isMenuCollapsed = ref<boolean>(false);// 左側欄

    // 選中的側邊欄item
    const menuSelected = ref(null)

    return {
        isMenuCollapsed,
        menuSelected
    }
})
