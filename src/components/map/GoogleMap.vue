<script setup>
import { onMounted, nextTick, watch, computed } from 'vue'
import { useGoogleMap } from '@/components/map/GoogleMap.composable'
import { GMapStore } from '@/stores/map/GMapStore'
import { mapTrigger } from "@/stores/command/mapTrigger";

const mapKey = import.meta.env.VITE_MAP_KEY;
let controller = new useGoogleMap({
    apiKey: mapKey,
    version: "beta",
    libraries: ["marker"]
});

const mapStore = mapTrigger()
watch(() => mapStore.watchForRouteId,async (newVal, oldVal) => {
    if(newVal.length > 0){
        controller.setLine(newVal)
        mapStore.dashboardHide = false
    }
}, {
  immediate: true,
  deep: true
})

const store = GMapStore()
watch(() => store.getGMarkerDatas(), (newMarkers) => {
    if (newMarkers.length > 0) {
        controller.updateAllMarkers()
    }
}, { deep: true })

const props = defineProps({
    setHeight: {
        type: Number,
        default: null
    }
})

const mapStyle = computed(() => {
    if (!props.setHeight) {
      return 'h-screen' // 全屏高度
    } else {
      return `!h-[calc(100vh-${props.setHeight}px)]`
    }
})

onMounted(async () => {
    const mapDiv = document.getElementById("map")
    await controller.initMap(mapDiv)
    //await controller.addMarker()
    //overlay(map)
    await nextTick()
})
</script>
<template>
    <div>
        <div class="googleMap" :class="mapStyle" id="map"></div>
    </div>
</template>
<style scoped lang="scss">
.googleMap {
    width: 100%;
    height: calc(100vh);

    :deep(.gm-style) {

        // .gm-style-iw-a {
        //   .gm-style-iw-t {
        //     .gm-style-iw {
        //       background-color: #2869FFE6 !important;
        //     }
        //   }
        // }
        .gm-style-iw-c {
            background-color: #4C37CD;
            min-width: 90px !important;
            padding: 5px;
            box-shadow: none;

            .gm-style-iw-d {
                // width: 80px;
                overflow: hidden !important;
                margin-bottom: 5px;

                .contentWindow {
                    padding: 4px 8px;
                    color: rgba(255, 255, 255, 1);
                    display: flex;
                    flex-direction: column;
                    font-weight: 700;
                    font-size: 14px;

                    .windowName {
                        font-weight: bold;
                    }

                    .factoryName {
                        font-size: 18px;
                        font-weight: 700;
                        color: rgba($color: #ffffff, $alpha: 0.8);
                    }

                    .factoryStatus {
                        margin-top: 12px;
                        color: rgba($color: #ffffff, $alpha: 0.8);
                        font-weight: 700;
                        font-size: 14px;
                    }

                    .customTable {
                        margin-top: 16px;
                        display: grid;
                        grid-template-columns: auto auto auto;
                        grid-template-rows: auto auto;
                        row-gap: 1px;
                        column-gap: 1px;

                        >div {
                            text-align: center;
                            background-color: #282153;
                            padding: 8px 24px;

                            &.head {
                                font-weight: 700;
                                font-size: 12px;
                            }

                            &.body {
                                font-weight: 400;
                                font-size: 14px;
                                background-color: #31247C;
                            }
                        }
                    }

                    .checkBtn {
                        cursor: pointer;
                        margin-top: 16px;
                        padding: 8px 16px;
                        background: #00000026;
                        display: flex;
                        align-items: center;
                        width: 112px;
                        gap: 4px;
                        white-space: nowrap;
                        border-radius: 4px;
                    }
                }
            }

            // >button {
            // display: none !important;
            // }
        }

        .gm-style-iw-tc {
            filter: none;
            -webkit-filter: none;
            width: 12px;
            height: 8px;

            &::after {
                background-color: #4C37CD;
                width: 12px;
                height: 8px;
                // display: none;
            }
        }
    }
}
</style>
