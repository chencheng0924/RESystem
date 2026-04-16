import { ref } from 'vue'
import { defineStore } from "pinia";

export const dialogPreScheduledStore = defineStore('dialogPreScheduledStore', () => {
  const stationList = ref<any[]>([])
  const selectStation = ref<any>({});
  const selectYearmonth = ref<any>({})
  return {
    stationList,
    selectStation,
    selectYearmonth
  }
})
