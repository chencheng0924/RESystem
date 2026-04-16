// imap.ts
import { Ref } from 'vue';

// 基礎座標介面
export interface ILatLng {
    lat?: number;
    lng?: number;
}

// 邊界介面
export interface IBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

// 標記點介面
export interface IMarker {
    id?: string;
    position?: ILatLng;
    icon?: string;
    title?: string;
    visible?: boolean;
}

// 路線介面
export interface IPolyLine {
    id: string;
    path: ILatLng[];
    color?: string;
    weight?: number;
}

// 資訊視窗介面
export interface IInfoWindow {
    id: string;
    content: string;
    position: ILatLng;
}

// 地圖介面
export interface IMap {
    setOption(options: any): IMap;
    // 初始化與參考
    initialize(element: HTMLElement): Promise<any>;
    registerMapRef(vueRef: Ref): void;
    getMapRef(): any;

    // 位置與視圖控制
    setCenter(position: ILatLng): void;
    setUserPosition(point: ILatLng): void;
    moveMapCenter(position: ILatLng): void;
    moveMapToUserPosition(zoomSize?: number): void;
    fitBounds(bounds: IBounds): void;
    moveAndZoomMapByBounds(bounds: IBounds): void;

    // Marker
    addMarker(marker: IMarker): void;
    removeMarker(marker: IMarker): void;
    setMarkerList(markers: IMarker[]): void;
    getMarkerList(): any[];
    clearAllMarkerList(): void;
    updateAllMarkers(): void;

    // TempMarker
    setTempMarker?(target: IMarker): void;
    setTempMarkerList?(list: IMarker[]): void;
    resetTempMarkerList?(): void;

    // 點擊事件
    clickMarker?(marker: IMarker, changeImgUrl?: string): void;
    clickMarkerOtherDisable?(marker: IMarker, changeImgUrl?: string): void;
    clickCloseInfoWindow?(marker: IMarker): void;

    // Polyline
    addPolyline(polyline: IPolyLine): void;
    removePolyline(polylineId: string): void;
    setPolylineList(polylines: IPolyLine[]): void;
    getPolyLineList(): any[];
    clearAllPolyLineList(): void;
    getPolyLineToCustomPloyLine?(info: any[]): any;

    // InfoWindow
    openInfoWindow(info: IInfoWindow): void;
    closeInfoWindow(infoId: string): void;
    setInfoWindow(infoData: IInfoWindow, type: number): void;
    getInfoWindowData?(): any;

    // 配置更新
    updateOptions(options): void;
}