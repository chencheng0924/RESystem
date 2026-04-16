import { ref } from 'vue'
import { defineStore } from 'pinia'
export const STMarkdownEditorStore = defineStore('STMarkdownEditorStore', () => {
  const focusLine = ref<number>(0)  // 暫存focus的行數
  const focusColumn = ref<number>(0)  // 暫存focus的列數
  const setFocusLine = (line: number) => {
    focusLine.value = line
  }
  const setFocusColumn = (column: number) => {
    focusColumn.value = column
  }
  return {
    focusLine,
    focusColumn,
    setFocusLine,
    setFocusColumn
  }
})