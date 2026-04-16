import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useCustomStore = defineStore('custom', () => {
  const customData = ref<any>({})
  const patternList = ref<any>([])
  const routeVersionList = ref<any>([])
  const optionList = ref<any>({
    ebmBusStations: [],
    ebmStyle: [],
    ebmEnergyType: []
  })
  const timetableInfoData = ref<any>({})

  return { 
    customData,
    patternList,
    routeVersionList,
    optionList,
    timetableInfoData
  }
}, {
  persist: {
    key: 'custom-store',
    storage: localStorage,
    paths: ['customData', 'optionList', 'timetableInfoData']
  }
})