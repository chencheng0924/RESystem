import { Bounds } from '@/service/googleService/GoogleService.model';
import { LatLngBoundsLiteral } from './../../service/gmap/gmap.vmodel';
import { CustomPloyLine, GMInfoWindow, GMMarker, polyLine } from '@/service/gmap/gmap.vmodel';
import { Latlng } from '../../service/gmap/gmap.vmodel';
import { Ref } from 'vue';
export interface IMap {
    initCenter();
    registerMapRef(vueRef: Ref);
    getMapRef();
    // 設定中心位置
    setUserPosition(point: Latlng);
    moveMapCenter(position: Latlng);
    moveMapToUserPosition(zoomSize: number);
    // 符合邊界
    fitBounds(bounds: LatLngBoundsLiteral);
    moveAndZoomMapByBounds(bounds: Bounds);

    //--Marker -----------
    addMapMarker(gm: GMMarker);
    removeMapMarker(gm: GMMarker);
    setMapMarkerList(arr: GMMarker[]);
    getMapMarkerList();
    clearAllMarkerList();

    clickMarker(marker: GMMarker, changeImgUrl?: string);
    clickMarkerOtherDisable(marker: GMMarker, changeImgUrl?: string);
    clickCloseInfoWindow(marker: GMMarker);

    //--Polyline------------------
    setPolylineList(polyline: CustomPloyLine[]);
    getPolyLineList(): Array<CustomPloyLine>;
    clearAllPolyLineList();
    // polyLine to CustomPloyLine
    getPolyLineToCustomPloyLine(info: polyLine[]);

    //----InfoWindow-----------------------------
    setMapInfoWindow(infoData: GMInfoWindow, type: number);
    getInfoWindowData();
    openInfoWindow(stopid);

    setTempMarker(target: GMMarker);
    setTempMarkerList(list: GMMarker[]);
    resetTempMarkerList();

    enableCurrentBtn(enable: boolean);
    getCurrentBtn();

}