import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useBusStore = defineStore('bus', () => {
  // 全路線儲存 --------------------------------------------------------------
  const BusRouteAll = ref([])


  return { 
    BusRouteAll,
   
  }
})