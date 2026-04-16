import { ref } from 'vue'
import { defineStore } from "pinia";
import { busLineItem, busLineStatusItem } from './commandTrigger.model'

export const mapTrigger = defineStore('mapTrigger', () => {
  const watchForRouteId = ref<busLineItem[]>([])
  const watchForRouteIdStatus = ref<busLineStatusItem[]>([])
  const dashboardHide = ref<boolean>(true);

  return {
    watchForRouteId,
    watchForRouteIdStatus,
    dashboardHide
  }
})
