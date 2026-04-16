// store/mapStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ILatLng, IMarker, IPolyLine, IInfoWindow } from '../imap';
import { MapFactory, MapProvider } from '../commonMap.model';

export const useMapStore = defineStore('map', () => {
    // State
    const currentProvider = ref<MapProvider>(MapProvider.GOOGLE_MAP);
    const currentCenter = ref<ILatLng | null>(null);
    const currentZoom = ref<number>(12);
    const mapOptions = ref(null)
    let mapFactory: MapFactory = null;
    const mapEntity = computed(() => mapFactory?.getIMap)
    const mapRef = ref(null);
    const markers = ref([]);
    const tempMarkers = ref<IMarker[]>([]);
    const polyLines = ref<IPolyLine[]>([]);
    const activeInfoWindow = ref<IInfoWindow | null>(null);
    const isCurrentBtnEnabled = ref<boolean>(true);
    const userPosition = ref<ILatLng | null>(null);
    const activeMarkerId = computed(() => activeInfoWindow.value?.id);
    const visibleMarkers = computed(() => markers.value.filter(m => m.visible));
    const markerById = computed(() => (id: string) => markers.value.find(m => m.id === id));

    // Actions
    // Provider
    const setProvider = (provider: MapProvider) => {
        currentProvider.value = provider;
    };

    const setMapOptions = (options) => {
        mapOptions.value = options;
    };

    const getMapOptions = () => {
        return mapOptions.value
    };

    const setMapFactory = (map) => {
        mapFactory = map;
    };

    const getMapFactory = () => {
        return mapFactory
    };

    const setMapRef = (map) => {
        mapRef.value = map;
    };

    const getMapRef = () => {
        return mapRef.value;
    };

    // 位置相關
    const setCenter = (center: ILatLng) => {
        currentCenter.value = center;
    };

    const setZoom = (zoom: number) => {
        currentZoom.value = zoom;
    };

    const setUserPosition = (position: ILatLng) => {
        userPosition.value = position;
    };

    // Marker 相關
    const addMarker = (marker: IMarker) => {
        markers.value.push(marker);
    };

    const removeMarker = (markerId: string) => {
        markers.value = markers.value.filter(m => m.id !== markerId);
    };

    const setMarkerList = (newMarkers: IMarker[]) => {
        markers.value = newMarkers;
    };

    const getMarkerList = () => {
        return markers.value
    };

    const clearAllMarkerList = () => {
        markers.value = [];
    };

    const updateMarkerVisibility = (markerId: string, visible: boolean) => {
        const marker = markers.value.find(m => m.id === markerId);
        if (marker) {
            marker.visible = visible;
        }
    };


    // TempMarker 相關
    const setTempMarker = (marker: IMarker) => {
        tempMarkers.value = [marker];
    };

    const setTempMarkerList = (markerList: IMarker[]) => {
        tempMarkers.value = markerList;
    };

    const resetTempMarkerList = () => {
        tempMarkers.value = [];
    };

    // Polyline 相關
    const addPolyline = (polyline: IPolyLine) => {
        polyLines.value.push(polyline);
    };

    const removePolyline = (polylineId: string) => {
        polyLines.value = polyLines.value.filter(p => p.id !== polylineId);
    };

    const setPolylineList = (newPolylines: IPolyLine[]) => {
        polyLines.value = newPolylines;
    };

    const clearAllPolyLineList = () => {
        polyLines.value = [];
    };

    // InfoWindow 相關
    const setInfoWindow = (infoWindow: IInfoWindow) => {
        activeInfoWindow.value = infoWindow;
    };

    const clearInfoWindow = () => {
        activeInfoWindow.value = null;
    };

    // 按鈕控制
    const setCurrentBtnEnabled = (enabled: boolean) => {
        isCurrentBtnEnabled.value = enabled;
    };

    // 重置所有狀態
    const resetState = () => {
        currentCenter.value = null;
        currentZoom.value = 12;
        markers.value = [];
        tempMarkers.value = [];
        polyLines.value = [];
        activeInfoWindow.value = null;
        isCurrentBtnEnabled.value = true;
        userPosition.value = null;
    };

    return {
        // State
        currentProvider,
        currentCenter,
        currentZoom,
        mapFactory,
        mapEntity,
        mapRef,
        markers,
        tempMarkers,
        polyLines,
        activeInfoWindow,
        isCurrentBtnEnabled,
        userPosition,

        // Getters
        activeMarkerId,
        visibleMarkers,
        markerById,

        // Actions
        setProvider,
        setMapOptions,
        getMapOptions,
        setMapFactory,
        getMapFactory,
        setMapRef,
        getMapRef,
        setCenter,
        setZoom,
        setUserPosition,
        addMarker,
        removeMarker,
        setMarkerList,
        getMarkerList,
        clearAllMarkerList,
        updateMarkerVisibility,
        setTempMarker,
        setTempMarkerList,
        resetTempMarkerList,
        addPolyline,
        removePolyline,
        setPolylineList,
        clearAllPolyLineList,
        setInfoWindow,
        clearInfoWindow,
        setCurrentBtnEnabled,
        resetState
    };
});