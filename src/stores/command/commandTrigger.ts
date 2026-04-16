import { ref } from 'vue'
import { defineStore } from "pinia";
import { storeData, allCommandItem, busLineItem, busItemData } from './commandTrigger.model'

export const commandTriggerStore = defineStore('commandTriggerStore', () => {
  const allCommandList = ref<allCommandItem[]>([])
  const watchForAlert = ref<storeData[]>([]);
  const watchForDialog = ref<storeData[]>([]);
  const alertList = ref<storeData[]>([])
  const alertListLimit = ref<number>(10);
  const watchForBusItemData = ref<busItemData>({})
  const selectBusItem = ref()
  const saveAlertList = ref<any[]>([])

  const saveReplaceList = ref([])

  const addAlert = (data: storeData) => {
    if (alertList.value.length == alertListLimit.value) {
      alertList.value.shift();
    }
    alertList.value.push(data)
  }

  return {
    allCommandList,
    watchForAlert,
    watchForDialog,
    alertList,
    addAlert,
    watchForBusItemData,
    selectBusItem,
    saveReplaceList,
    saveAlertList
  }
}, {
  persist: {
    key: 'command-trigger-store',
    storage: sessionStorage,
    paths: ['alertList', 'allCommandList']
  }
});
