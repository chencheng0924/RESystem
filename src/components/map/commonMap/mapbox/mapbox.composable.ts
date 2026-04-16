// googleMap.composable.ts
import { inject, Ref } from 'vue';
import { IMap, ILatLng, IMarker, IPolyLine, IInfoWindow, IBounds } from '../imap';
import { useMapStore } from '../store/mapStore'

import { ToastServiceMethods } from 'primevue/toastservice';
import mapboxgl from 'mapbox-gl'

export class Mapbox implements IMap {
    public mapOptions: mapboxgl.MapOptions;

    private mapRef: mapboxgl.Map | null = null;
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

    constructor(options?: mapboxgl.MapOptions) {
        console.warn('mapbox.options', options)
        this.mapOptions = options;

        this.toast = inject('toast') as ToastServiceMethods;
    }

    setOption(options: any) {

        this.mapOptions = options;

        return this;
    }

    async initialize(element: HTMLElement) {
        let self = this;
        this.mapRef = new mapboxgl.Map({
            container: element,
            ...self.mapOptions
        })

        this.store.setMapRef(this.mapRef)

        return this.mapRef;
    }

    registerMapRef(mapRef): void {
        this.store.setMapRef(mapRef)
    }

    getMapRef(): mapboxgl.Map | null {
        return this.mapRef;
    }

    // 位置與視圖控制
    setCenter(position: ILatLng): void {
        if (!this.mapRef) return;
        //this.mapRef.setCenter(this.toMapboxLatLng(position));
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
        //this.mapRef.fitBounds(googleBounds);
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

    private createMarker(data: any[], layer: string): void {

    }

    // Marker 操作
    async addMarker(marker: IMarker): Promise<void> {
        const geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [121.5648, 25.0330]
                    },
                    'properties': {
                        'title': 'Mapbox',
                        'description': 'Washington, D.C.'
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [121.5174, 25.0375]
                    },
                    'properties': {
                        'title': 'Mapbox',
                        'description': 'San Francisco, California'
                    }
                }
            ]
        };

        // add markers to map
        for (const feature of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'mapboxMarker w-[50px] h-[50px] pointer';

            // make a marker for each feature and add it to the map
            // new mapboxgl.Marker()
            //     .setLngLat(feature.geometry.coordinates)
            //     .setPopup(
            //         new mapboxgl.Popup({ offset: 25 }) // add popups
            //             .setHTML(
            //                 `<h3 class="text-black">${feature.properties.title}</h3><p class="text-black">${feature.properties.description}</p>`
            //             )
            //     )
            //     .addTo(this.mapRef);
        }
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
        // const marker = new google.maps.Marker({
        //     position: this.toGoogleLatLng(target.position),
        //     map: this.mapRef,
        //     icon: target.icon,
        //     title: target.title
        // });
        //this.tempMarkers.set(target.id, marker);
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
        // const googlePolyline = new google.maps.Polyline({
        //     path: polyline.path.map(point => this.toGoogleLatLng(point)),
        //     strokeColor: polyline.color || '#000000',
        //     strokeWeight: polyline.weight || 2,
        //     map: this.mapRef
        // });

        //this.polylines.set(polyline.id, googlePolyline);
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
            //position: this.toGoogleLatLng(info.position)
        });

        //infoWindow.open(this.mapRef);
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

        //this.mapRef.setOptions(mapOptions);
    }

    // 工具方法
    private toMapboxLatLng(position: ILatLng) {
        return new google.maps.LatLng(position.lat, position.lng);
    }
}