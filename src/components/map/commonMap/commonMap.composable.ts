// commonMap.composable.ts
import { Ref, ref } from 'vue'
import { MapFactory } from './commonMap.model'
import { useMapStore } from './store/mapStore'
import type { ILatLng, IMarker, IPolyLine, IInfoWindow, IBounds, IMap } from './imap'

export class CommonMapController {
    public store = useMapStore()
    private mapRef?: Ref<any>;
    private mapFactory?: MapFactory = null;
    constructor() {
        this.mapRef = ref(null);
    }

    // 初始化方法，接收 DOM 元素和配置
    async initialize(element: HTMLElement, options: any) {

        try {
            this.mapFactory = new MapFactory(options)
            this.mapRef.value = await this.mapFactory.getIMap.initialize(element)
            this.store.setMapFactory(this.mapFactory)
            this.store.setMapOptions(options);
            this.store.setMapRef(this.mapRef)
            return this.mapRef.value;
        } catch (error) {
            console.error('地圖初始化失敗:', error)
            throw error
        }
    }

    setMapRef(mRef) {
        this.mapRef.value = mRef
        this.store.setMapRef(this.mapRef)
    }
    getMapRef() {
        let map = this.store.getMapRef();
        if (map != undefined && map != null)
            return map;

        return this.mapRef.value;
    }

    getIMap(): IMap {
        if (this.mapFactory == null) {
            let mapFactoryStore = this.store.getMapFactory();
            if (mapFactoryStore) {
                let mapF = new MapFactory(mapFactoryStore.mapOptions);
                mapF.components = mapFactoryStore.components;
                mapF.target = mapFactoryStore.target;
                return mapF.getIMap;
            }
        }
        return this.mapFactory.getIMap;
    }

    // Marker 相關方法
    addMarker(marker: IMarker) {
        this.getIMap().addMarker(marker)
    }

    removeMarker(marker: IMarker) {
        this.getIMap().removeMarker(marker)
    }

    setMarkerList(markers: IMarker[]) {
        this.getIMap().setMarkerList(markers)
    }

    clearAllMarkerList() {
        this.getIMap().clearAllMarkerList()
    }

    updateAllMarkers() {
        this.getIMap().updateAllMarkers()
    }

    // Polyline 相關方法
    addPolyline(polyline: IPolyLine) {
        this.getIMap().addPolyline(polyline)
    }

    removePolyline(polylineId: string) {
        this.getIMap().removePolyline(polylineId)
    }

    setPolylineList(polylines: IPolyLine[]) {
        this.getIMap().setPolylineList(polylines)
    }

    // InfoWindow 相關方法
    openInfoWindow(info: IInfoWindow) {
        this.getIMap().openInfoWindow(info)
    }

    closeInfoWindow(infoId: string) {
        this.getIMap().closeInfoWindow(infoId)
    }

    // 位置控制方法
    setCenter(position: ILatLng) {
        this.getIMap().setCenter(position)
    }

    setZoom(zoom: number) {
        this.getIMap().updateOptions({ zoom })
    }


}


// export class useCommonMap {
//     public store = useMapStore();
//     public mapFactory: MapFactory;
//     public isInitialized: boolean = false;
//     public currentCenter: ILatLng | null = null;
//     public currentZoom: number = 12;
//     public currentOptions: any;
//     public markerList: any;

//     // constructor(initialOptions) {
//     //     this.currentOptions = initialOptions;
//     //     this.mapFactory = new MapFactory({
//     //         ...initialOptions,
//     //     });
//     // }
//     constructor() {}

//     // 初始化方法
//     public async initialize(element: HTMLElement, mapOption: any): Promise<void> {
//         try {
//             await this.mapFactory.getMap.initialize(element);
//             this.store.setMapFactory(this.mapFactory);
//             this.currentOptions = mapOption;
//             this.isInitialized = true;
//         } catch (error) {
//             console.error('地圖初始化失敗:', error);
//             throw error;
//         }
//     }

//     // 取得地圖實例
//     public getMapRef(): any {
//         return this.mapFactory.getMap.getMapRef();
//     }

//     // 位置控制方法
//     public setCenter(position: ILatLng): void {
//         this.currentCenter = position;
//         this.mapFactory.getMap.setCenter(position);
//     }

//     public setUserPosition(point: ILatLng): void {
//         this.mapFactory.getMap.setUserPosition(point);
//     }

//     public moveMapCenter(position: ILatLng): void {
//         this.mapFactory.getMap.moveMapCenter(position);
//     }

//     public moveMapToUserPosition(zoomSize: number = 17): void {
//         this.mapFactory.getMap.moveMapToUserPosition(zoomSize);
//     }

//     // 標記點操作方法
//     public addMarker(marker: IMarker): void {
//         this.mapFactory.getMap.addMarker(marker);
//     }

//     public removeMarker(marker: IMarker): void {
//         this.mapFactory.getMap.removeMarker(marker);
//     }

//     public setMarkerList(markers: IMarker[]): void {
//         this.mapFactory.getMap.setMarkerList(markers);
//     }

//     public getMarkerList(): any[] {
//         return this.mapFactory.getMap.getMarkerList();
//     }

//     public clearAllMarkerList(): void {
//         this.mapFactory.getMap.clearAllMarkerList();
//     }

//     // 臨時標記點操作
//     public setTempMarker(target: IMarker): void {
//         this.mapFactory.getMap.setTempMarker?.(target);
//     }

//     public setTempMarkerList(list: IMarker[]): void {
//         this.mapFactory.getMap.setTempMarkerList?.(list);
//     }

//     public resetTempMarkerList(): void {
//         this.mapFactory.getMap.resetTempMarkerList?.();
//     }

//     // 路線操作方法
//     public addPolyline(polyline: IPolyLine): void {
//         this.mapFactory.getMap.addPolyline(polyline);
//     }

//     public removePolyline(polylineId: string): void {
//         this.mapFactory.getMap.removePolyline(polylineId);
//     }

//     public setPolylineList(polylines: IPolyLine[]): void {
//         this.mapFactory.getMap.setPolylineList(polylines);
//     }

//     public clearAllPolyLineList(): void {
//         this.mapFactory.getMap.clearAllPolyLineList();
//     }

//     // 資訊視窗操作
//     public openInfoWindow(info: IInfoWindow): void {
//         this.mapFactory.getMap.openInfoWindow(info);
//     }

//     public closeInfoWindow(infoId: string): void {
//         this.mapFactory.getMap.closeInfoWindow(infoId);
//     }

//     public setInfoWindow(infoData: IInfoWindow, type: number): void {
//         this.mapFactory.getMap.setInfoWindow(infoData, type);
//     }

//     // 視圖控制
//     public fitBounds(bounds: IBounds): void {
//         this.mapFactory.getMap.fitBounds(bounds);
//     }

//     public moveAndZoomMapByBounds(bounds: IBounds): void {
//         this.mapFactory.getMap.moveAndZoomMapByBounds(bounds);
//     }

//     // 地圖提供商切換
//     public switchMapProvider(provider: MapProvider): void {
//         this.mapFactory.setTarget(provider);
//         // 切換後重新套用當前選項
//         this.updateMapOptions(this.currentOptions);
//     }

//     // 更新地圖選項
//     public updateMapOptions(options): void {
//         this.currentOptions = { ...this.currentOptions, ...options };
//         this.mapFactory.updateOptions(this.currentOptions);
//     }

//     // 取得當前狀態
//     public getIsInitialized(): boolean {
//         return this.isInitialized;
//     }

//     public getCurrentCenter(): ILatLng | null {
//         return this.currentCenter;
//     }

//     public getCurrentZoom(): number {
//         return this.currentZoom;
//     }
// }
