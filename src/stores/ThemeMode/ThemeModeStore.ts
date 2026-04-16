import { defineStore } from "pinia"
import { ref } from "vue"

export const ThemeModeStore = defineStore('ThemeModeStore', () => {
    const sidebarVisible = ref<boolean>(true)
    const updateSidebarVisible = (visible?: boolean) => {

        if (visible) {
            sidebarVisible.value = visible
            return
        }
        sidebarVisible.value = !sidebarVisible.value
    }
    const setVisible = (visible?: boolean) => {

        sidebarVisible.value = visible;
    }
    return {
        sidebarVisible,
        updateSidebarVisible,
        setVisible
    }
})


// document.documentElement.classList.toggle('themeDark', isDark)
// document.documentElement.classList.toggle('themeLight', !isDark && this.themeConfig.value === ThemeType.LIGHT)