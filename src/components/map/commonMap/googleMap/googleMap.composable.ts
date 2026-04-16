// googleMap.composable.ts
import { inject, Ref } from 'vue';
import { IMap, ILatLng, IMarker, IPolyLine, IInfoWindow, IBounds } from '../imap';
import { useMapStore } from '../store/mapStore'
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

import { GMarker, GMarkerType, LatLng } from './googleMap.model'
import { ToastServiceMethods } from 'primevue/toastservice';

interface IGoogleMapOptions extends LoaderOptions, google.maps.MapOptions {
    apiKey: string;  // 確保 apiKey 是必要的
}

export class GoogleMap implements IMap {
    public apiLoader: Loader;
    public apiOptions: LoaderOptions;
    public mapOptions: google.maps.MapOptions;

    private mapRef: google.maps.Map | null = null;
    private markers
    private tempMarkers: Map<string, google.maps.Marker> = new Map();
    private polylines: Map<string, google.maps.Polyline> = new Map();
    private infoWindows: Map<string, google.maps.InfoWindow> = new Map();
    private currentUserPosition: ILatLng | null = null;
    private isCurrentBtnEnabled: boolean = true;

    private store = useMapStore();

    private locale?: any;
    private $t?: any;
    private $route?: any;
    private $router?: any;
    private toast?: any;

    constructor() {

        //this.toast = inject('toast') as ToastServiceMethods;
    }

    setOption(options: any) {
        const {
            apiKey,
            version,
            libraries,
            language,
            region,
            nonce,
            retries,
            url,
            authReferrerPolicy,
            ...mapOptions
        } = options;

        this.apiOptions = {
            apiKey,
            version,
            libraries,
            language,
            region,
            nonce,
            retries,
            url,
            authReferrerPolicy
        }

        this.mapOptions = mapOptions;

        return this;
    }

    async initialize(element: HTMLElement) {
        let self = this;
        const apiLoader = new Loader(self.apiOptions);
        const googlemaps = await apiLoader.importLibrary("maps");
        this.mapRef = new googlemaps.Map(element, self.mapOptions);

        // self.mapRef.addListener("zoom_changed", () => {
        //     // console.log('zoom_changed');
        //     const zoom = self.mapRef.getZoom();
        //     self.store.getMarkerList().forEach((x) => x.callzoomChange(zoom));
        // });

        return this.mapRef;
    }

    registerMapRef(mapRef): void {
        this.store.setMapRef(mapRef)
    }

    getMapRef(): google.maps.Map | null {
        return this.mapRef;
    }

    // 位置與視圖控制
    setCenter(position: ILatLng): void {
        if (!this.mapRef) return;
        this.mapRef.setCenter(this.toGoogleLatLng(position));
    }

    setUserPosition(point: ILatLng): void {
        this.currentUserPosition = point;
        this.setCenter(point);
    }

    moveMapCenter(position: ILatLng): void {
        this.setCenter(position);
    }

    moveMapToUserPosition(zoomSize: number = 17): void {
        if (this.currentUserPosition) {
            this.setCenter(this.currentUserPosition);
            this.mapRef?.setZoom(zoomSize);
        }
    }

    fitBounds(bounds: IBounds): void {
        if (!this.mapRef) return;
        const googleBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(bounds.south, bounds.west),
            new google.maps.LatLng(bounds.north, bounds.east)
        );
        this.mapRef.fitBounds(googleBounds);
    }

    moveAndZoomMapByBounds(bounds: IBounds): void {
        this.fitBounds(bounds);
    }

    public updateAllMarkers() {
        const markerList = this.store.getMarkerList()
        markerList.forEach((marker) => {
            if (!marker.getContent()) {
                marker.draw(this.mapRef)
            } else {
                marker.setMap(this.mapRef)
            }
        })
    }

    private createMarker(data: any[], layer: string, markerType: GMarkerType): void {
        let self = this
        data.forEach((item) => {
            const position = new LatLng({ lat: item.lat, lng: item.lng || item.long });
            const marker = new GMarker({
                router: self.$router,
                toast: self.toast,
                layer,
                title: "測試標題",
                dataObj: { ...item },
                position,
                type: markerType,
            })

            marker.zoomChange = (markerEntity: GMarker, zoom: number) => {
                if (zoom > 15) {
                    markerEntity.setType(markerType);
                } else {
                    markerEntity.setType(GMarkerType.MARKER_ICON);
                }
                markerEntity.draw(self.mapRef);
            };

            self.store.addMarker(marker);
        })
    }

    async addMarkerToMap(): Promise<void> {
        let self = this;
        // const { roadworkData, accidentData, stationData } = await this.svc.getMarkerData()
        // this.createMarker(roadworkData, "roadWork", GMarkerType.MARKER_TITLE_ICON)
        // this.createMarker(accidentData, "accident", GMarkerType.MARKER_TITLE_ICON)
        // this.createMarker(stationData, "station", GMarkerType.MARKER_TITLE_ICON_STATION)

        const markerList = this.store.getMarkerList()
        console.warn('markerList', markerList);
        console.warn('self.mapRef', self.mapRef);

        markerList.forEach((marker) => marker.draw(self.mapRef))
    }

    // Marker 操作
    async addMarker(marker1?: IMarker): Promise<void> {
        let self = this;

        const wholeContent = () => {
            return `
                <div class="w-fit flex flex-col items-center gap-[5px]">
                    <div class="w-fit bg-[#2a2c2d] flex items-center gap-[5px] p-[5px] pr-[8px] rounded">
                        <img src="src/assets/img/marker/alert_red.svg" alt="">
                        <span class="">緊急救護</span>
                    </div>
                    <figure>
                        <img class="max-w-full max-h-full" src="src/assets/img/marker/triangle_red.svg" alt="">
                    </figure>
                </div>
            `
        }

        const lessContent = () => {
            return `
                <div class="w-fit flex items-center gap-[5px] p-[4px] rounded">
                    <span class="">緊急救護</span>
                </div>
            `
        }

        const markerDiv = document.createElement('div')
        markerDiv.innerHTML = wholeContent()
        const mapRef = self.mapRef

        // mapRef.addListener('zoom_changed', () => {
        //     console.log('zoom_changed111');
        //     const zoom = mapRef.getZoom()
        //     if (zoom > 15) {
        //         markerDiv.innerHTML = wholeContent()
        //     } else {
        //         markerDiv.innerHTML = lessContent()
        //     }
        // })

        let positionOpt = {
            title: marker1.title,
            map: self.mapRef,
            position: marker1.position as any,
            content: markerDiv,
        };

        const marker = new google.maps.marker.AdvancedMarkerElement(positionOpt);

    }

    removeMarker(marker: IMarker): void {
        const existingMarker = this.markers.get(marker.id);
        if (existingMarker) {
            existingMarker.setMap(null);
            this.markers.delete(marker.id);
        }
    }

    setMarkerList(markers: IMarker[]): void {
        this.clearAllMarkerList();
        markers.forEach(marker => this.addMarker(marker));
    }

    getMarkerList(): google.maps.Marker[] {
        return Array.from(this.markers.values());
    }

    clearAllMarkerList(): void {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers.clear();
    }

    // TempMarker 操作
    setTempMarker(target: IMarker): void {
        if (!this.mapRef) return;
        const marker = new google.maps.Marker({
            position: this.toGoogleLatLng(target.position),
            map: this.mapRef,
            icon: target.icon,
            title: target.title
        });
        this.tempMarkers.set(target.id, marker);
    }

    setTempMarkerList(list: IMarker[]): void {
        this.resetTempMarkerList();
        list.forEach(marker => this.setTempMarker(marker));
    }

    resetTempMarkerList(): void {
        this.tempMarkers.forEach(marker => marker.setMap(null));
        this.tempMarkers.clear();
    }

    // 點擊事件
    clickMarker(marker: IMarker, changeImgUrl?: string): void {
        const googleMarker = this.markers.get(marker.id);
        if (googleMarker && changeImgUrl) {
            googleMarker.setIcon(changeImgUrl);
        }
    }

    clickMarkerOtherDisable(marker: IMarker, changeImgUrl?: string): void {
        this.markers.forEach((m, id) => {
            if (id !== marker.id) {
                m.setVisible(false);
            }
        });
        if (changeImgUrl) {
            const clickedMarker = this.markers.get(marker.id);
            if (clickedMarker) {
                clickedMarker.setIcon(changeImgUrl);
            }
        }
    }

    clickCloseInfoWindow(marker: IMarker): void {
        const infoWindow = this.infoWindows.get(marker.id);
        if (infoWindow) {
            infoWindow.close();
        }
    }

    // Polyline 操作
    addPolyline(polyline: IPolyLine): void {
        if (!this.mapRef) return;
        const googlePolyline = new google.maps.Polyline({
            path: polyline.path.map(point => this.toGoogleLatLng(point)),
            strokeColor: polyline.color || '#000000',
            strokeWeight: polyline.weight || 2,
            map: this.mapRef
        });

        this.polylines.set(polyline.id, googlePolyline);
    }

    removePolyline(polylineId: string): void {
        const polyline = this.polylines.get(polylineId);
        if (polyline) {
            polyline.setMap(null);
            this.polylines.delete(polylineId);
        }
    }

    setPolylineList(polylines: IPolyLine[]): void {
        this.clearAllPolyLineList();
        polylines.forEach(polyline => this.addPolyline(polyline));
    }

    getPolyLineList(): google.maps.Polyline[] {
        return Array.from(this.polylines.values());
    }

    clearAllPolyLineList(): void {
        this.polylines.forEach(polyline => polyline.setMap(null));
        this.polylines.clear();
    }

    getPolyLineToCustomPloyLine(info: any[]): IPolyLine[] {
        return info.map((item, index) => ({
            id: `polyline-${index}`,
            path: item.path,
            color: item.color,
            weight: item.weight
        }));
    }

    // InfoWindow 操作
    openInfoWindow(info: IInfoWindow): void {
        if (!this.mapRef) return;
        this.infoWindows.forEach(window => window.close());

        const infoWindow = new google.maps.InfoWindow({
            content: info.content,
            position: this.toGoogleLatLng(info.position)
        });

        infoWindow.open(this.mapRef);
        this.infoWindows.set(info.id, infoWindow);
    }

    closeInfoWindow(infoId: string): void {
        const infoWindow = this.infoWindows.get(infoId);
        if (infoWindow) {
            infoWindow.close();
            this.infoWindows.delete(infoId);
        }
    }

    setInfoWindow(infoData: IInfoWindow, type: number): void {
        this.openInfoWindow(infoData);
    }

    getInfoWindowData(): any {
        return Array.from(this.infoWindows.entries()).map(([id, window]) => ({
            id,
            content: window.getContent(),
            position: window.getPosition()?.toJSON()
        }));
    }

    // 更新選項
    updateOptions(options: Partial<google.maps.MapOptions>): void {
        if (!this.mapRef) return;

        // if (options.center) {
        //     this.setCenter({lat:options.center.lat(), lng:options.center.lng});
        // }

        if (options.zoom !== undefined) {
            this.mapRef.setZoom(options.zoom);
        }

        const mapOptions: google.maps.MapOptions = {};

        if (options.mapTypeControl !== undefined) {
            mapOptions.mapTypeControl = options.mapTypeControl;
        }

        if (options.zoomControl !== undefined) {
            mapOptions.zoomControl = options.zoomControl;
        }

        if (options.fullscreenControl !== undefined) {
            mapOptions.fullscreenControl = options.fullscreenControl;
        }

        this.mapRef.setOptions(mapOptions);
    }

    // 工具方法
    private toGoogleLatLng(position: ILatLng): google.maps.LatLng {
        return new google.maps.LatLng(position.lat, position.lng);
    }
}