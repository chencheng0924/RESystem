import { onMounted, onUnmounted, ref } from "vue"


// 監聽元素尺寸變化，取響應式的寬度和高度
export const useElementSize = (elementSelector: string) => {
    const width = ref(0)
    const height = ref(0)

    // ResizeObserver 實例
    let observer: ResizeObserver | null = null

    // 更新元素尺寸的函數
    const updateSize = () => {
        const element = document.querySelector(elementSelector) as HTMLElement
        if (element) {
            const rect = element.getBoundingClientRect()
            width.value = rect.width
            height.value = rect.height
        }
    }

    onMounted(() => {
        const element = document.querySelector(elementSelector)
        if (element) {
            // 創建ResizeObserver來監聽元素尺寸變化
            observer = new ResizeObserver(() => {
                updateSize()
            })
            observer.observe(element)
            // 初始化大小
            updateSize()
        }
    })

    onUnmounted(() => {
         // 在組件卸載時停止觀察
        if (observer) {
            observer.disconnect()
        }
    })

    // 返回響應式的寬度和高度
    return { width, height }
}