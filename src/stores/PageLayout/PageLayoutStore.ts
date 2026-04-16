import { defineStore } from "pinia"
import { Ref, ref } from "vue"
import { PageSavingType } from "./PageSavingType"
import { useI18n } from "vue-i18n"

export const PageLayoutStore = defineStore('PageLayoutStore', () => {
  const { t } = useI18n()
  const savingStatus: Ref<PageSavingType> = ref(PageSavingType.SAVED)
  const savingStatusText: Ref<string> = ref(t('Layout.PageLayout.Saved'))
  const pageMainTitle: Ref<string> = ref('')
  const updateSavingStatus = (status: PageSavingType) => {
    savingStatus.value = status
  }
  const setSavingSaved = () => {
    savingStatus.value = PageSavingType.SAVED
    savingStatusText.value = t('Layout.PageLayout.Saved')
  }
  const setSavingFailed = () => {
    savingStatus.value = PageSavingType.SAVED_FAILED
    savingStatusText.value = t('Layout.PageLayout.SaveFailed')
  }
  const setSaving = () => {
    savingStatus.value = PageSavingType.SAVING
    savingStatusText.value = t('Layout.PageLayout.Saving')
  }
  const setPageMainTitle = (title: string) => {
    pageMainTitle.value = title
  }

  // 選中的側邊欄item
  const selectedItem: Ref<string | null> = ref(null)
  const setSelectedItem = (item: string) => {
    selectedItem.value = item
  }


  return {
    savingStatus,
    savingStatusText,
    updateSavingStatus,
    setSavingSaved,
    setSavingFailed,
    setSaving,
    pageMainTitle,
    setPageMainTitle,
    selectedItem,
    setSelectedItem

  }
})