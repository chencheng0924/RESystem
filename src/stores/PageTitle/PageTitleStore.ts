import { defineStore } from "pinia"
import { PageTitleItem } from "./PageTitleStore.model"
import { ref } from "vue"

export const PageTitleStore = defineStore('PageTitleStore', () => {
    const pageTitleItem = ref<PageTitleItem>(new PageTitleItem())


    return {
        pageTitleItem
    }
})