import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { GoogleThreeOverlayRunCar } from "@/components/map/GoogleThreeOverlayRunCar";
import { GMarker, MapBusLine, MapDynamicBusEntity } from '@/components/map/GoogleMap.model'
import { mapControllerList } from '@/components/map/mapControll/mapControll.model'
export const GMapStore = defineStore('mapStore', () => {

  const mapObject = ref(null);
  const setMapRef = (map) => {
    mapObject.value = map;
  }
  const getMapRef = () => {
    return mapObject.value;
  }
  // marker相關 ------------------------------------------------------------
  const markerList = ref<GMarker[]>([])
  const addGMarker = (marker: GMarker) => {
    // 新增 marker
    markerList.value.push(marker);
  }
  const removeGMarker = (marker: GMarker) => {
    // 移除 marker
    const index = markerList.value.findIndex(item => item.getId() == marker?.getId())
    if (index > -1) {
      markerList.value.splice(index, 1)
    }
  }
  // 移除指定圖層 marker
  const removeGMarkerByLayer = (layer: string) => {
    markerList.value = markerList.value.filter(marker => {
      if (marker.getLayer() === layer) {
        marker.setMap(null);  // 從地圖上移除標記
        return false;  // 不保留在列表中
      }
      return true;  // 保留其他圖層的標記
    })
  }
  const getGMarkerDatas = () => {
    // 取得地圖上所有marker
    return markerList.value
  }
  const setGMarkerDatas = (arr: GMarker[]) => {
    // 設定地圖上所有marker
    markerList.value = arr
  }
  const removeAllGMarkerDatas = () => {
    // 清除地圖上所有marker
    markerList.value = []
  }


  // 改變縮放大小
  const setZoomLevel = (level: number) => {
    mapObject.value.setZoom(level)
  }

  // 改變位置
  const setPositionToMove = (position: { lat: number, lng: number }) => {
    mapObject.value.panTo(new google.maps.LatLng(position.lat, position.lng))
  }

  // 改變位置 & 縮放
  const setPositionAndZoomLevel = (position: { lat: number, lng: number }, level: number = 18) => {
    mapObject.value.panTo(new google.maps.LatLng(position.lat, position.lng))
    mapObject.value.setZoom(level)
  }

  // 設定地圖中心點
  const setMapCenter = (position: { lat: number, lng: number }) => {
    mapObject.value.setCenter(new google.maps.LatLng(position.lat, position.lng))
  }

  // 原有路線的起點儲存
  const oldfirstpoint = ref<GoogleThreeOverlayRunCar[]>(null)

  // 圖層控制清單儲存
  const mapControllerList = ref<mapControllerList[]>([])




  const focusPoint = (params) => {
    mapObject.value.moveCamera(params)
  }
  const focusPointByBus = (platenumb) => {

    let mapBusLines = oldfirstpoint.value.map((x) => {
      return new MapBusLine(x.dynamicBusLine)
    })

    let dynamicBus: MapDynamicBusEntity = mapBusLines.map(x => x.findBus(platenumb))
      .filter(x => x != undefined && x != null)
      .firstOrDefault();

    const center = dynamicBus.treeJsCurrentPoint ?? dynamicBus.getTargetBus();
    
    focusPoint({
      center: center,
      tilt: 50,
      heading: 0,
      zoom: 18
    })

    // 在聚焦後，向左平移地圖
    setTimeout(() => {
      const pixelsToMoveRight = 300; // 向左移動的像素數
      mapObject.value.panBy(pixelsToMoveRight, 0);
    }, 100); // 短暫延遲以確保地圖已經完成聚焦
  }

  const findMapBusLineByBus = (platenumb) => {

    let mapBusLines = oldfirstpoint.value.map((x) => {
      return new MapBusLine(x.dynamicBusLine)
    })

    let dynamicMapBus = mapBusLines.filter(x => x.isfindBus(platenumb) == true).firstOrDefault();
    return dynamicMapBus;
  }

  // // polyline相關 ------------------------------------------------------------
  // const polyLineList = ref<Array<CustomPloyLine>>()
  // const getPolyLineList = () => {
  //   return polyLineList.value
  // }
  // const setPolyLineList = (info: Array<CustomPloyLine>) => {
  //   polyLineList.value = info
  // }
  // const clearAllPolyLineList = () => {
  //   // 清除地圖上所有PolyLine
  //   polyLineList.value = new Array<CustomPloyLine>();
  // }



  return {
    setMapRef,
    getMapRef,

    addGMarker,
    getGMarkerDatas,
    setGMarkerDatas,
    removeGMarker,
    removeGMarkerByLayer,
    removeAllGMarkerDatas,

    setZoomLevel,
    setPositionToMove,
    setPositionAndZoomLevel,
    setMapCenter,

    oldfirstpoint,
    mapControllerList,

    focusPointByBus,
    focusPoint,
    findMapBusLineByBus
  }
})