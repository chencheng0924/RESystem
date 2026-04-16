
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import { GoogleThreeOverlayRunCar } from "./GoogleThreeOverlayRunCar";
import { inject, reactive, Reactive } from "vue";
import { GMapStore } from "@/stores/map/GMapStore";
import {
  GMarker,
  GMarkerType,
  ILatlng,
  Latlng,
  MapBusLine,
  MapBusLineSegment,
  MapDynamicBusEntity,
} from "./GoogleMap.model";
import {
  busLineItem,
  busLineStatusItem,
} from "@/stores/command/commandTrigger.model";
import { mapTrigger } from "@/stores/command/mapTrigger";
import { CStgTdxRealtime } from "@/service/bus/BusService.model";
import { Bounds, Northeast } from "@/service/googleService/GoogleService.model";
import { LatLngBoundsLiteral } from "@/service/gmap/gmap.vmodel";
import { commandTriggerStore } from "@/stores/command/commandTrigger";
import { CustomPloyLine } from "@/service/gmap/gmap.vmodel";
let baseUrl = import.meta.env.VITE_BACKENDGPT_HOST;
import { useRouter } from "vue-router";
import { ToastServiceMethods } from 'primevue/toastservice';
import { ToastMessageOptions } from "primevue/toast";
import { CityGovService } from "@/service/CitygovService";
export class useGoogleMap {
  private store = GMapStore();
  public apiOptions: LoaderOptions;
  public mapOptions: google.maps.MapOptions;
  public mapRef: any;
  public myMarker?: any;
  public mapStore: any;
  public commandStore: any;
  public customPloyLine: CustomPloyLine;


  private f1svc: CityGovService;
  private locale?: any;
  private $t?: any;
  private $route?: any;
  private $router?: any;
  private toast?: any;
  constructor(apiOptions) {
    this.$router = useRouter();
    this.toast = inject('toast') as ToastServiceMethods;
    this.apiOptions = apiOptions;

    this.f1svc = new CityGovService();
    this.mapStore = mapTrigger();
    this.commandStore = commandTriggerStore();
    this.customPloyLine = new CustomPloyLine();

    this.init();
  }
  async init() {
    let self = this;
    this.mapOptions = {
      tilt: 60,
      heading: 0,
      zoom: 16,
      // zoom: 18,
      center: { lat: 22.605297515910813, lng: 120.3002314361606 },
      mapId: "8905b3dd9cc1e336",
      fullscreenControl: false,
      clickableIcons: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
      disableDefaultUI: true,
    };
  }

  async initMap(mapDiv: any) {
    let self = this;

    // 1. 載入地圖
    const apiLoader = new Loader(this.apiOptions);
    const googlemaps = await apiLoader.importLibrary("maps");
    this.mapRef = new googlemaps.Map(mapDiv, this.mapOptions);
    this.store.setMapRef(this.mapRef);

    self.mapRef.addListener("zoom_changed", () => {
      const zoom = self.mapRef.getZoom();
      self.store.getGMarkerDatas().forEach((x) => x.callzoomChange(zoom));
    });

    // this.addMarkerToMap()

    //this.setBusLine(new busLineItem({ routeid: '60' }));

    return this.mapRef;
  }

  showToast(options: Partial<ToastMessageOptions>) {
    const defaultOptions: ToastMessageOptions = {
      severity: 'info',
      summary: null,
      detail: null,
      closable: false,
      life: 3000,
      group: null,
      styleClass: null,
      contentStyleClass: null
    };

    const toastOptions = Object.assign({}, defaultOptions, options);
    this.toast.add(toastOptions);
  }

  public async getReplaceLine() {
    if (!this.commandStore.saveReplaceList.length) {
      const res = await fetch(
        `${baseUrl}/bevbussuper/BI/RealTimeStationStatusQ5`
      );
      const data = await res.json();
      this.commandStore.saveReplaceList = data.data;
    }
  }

  async resetMap() {
    let oldoverlayList = this.store.oldfirstpoint;
    if (oldoverlayList && oldoverlayList.length > 0) {
      oldoverlayList.forEach((overlay) => {
        overlay.setMap(null);
      });
      this.store.oldfirstpoint = [];
    }
    this.store.oldfirstpoint = [];
  }

  async setLine(nv: busLineItem[]) {
    this.resetMap();
    await this.getReplaceLine();
    console.log("nv", nv);
    nv.forEach((item, index) => {
      const statusItem = this.mapStore.watchForRouteIdStatus[
        index
      ] as busLineStatusItem;
      // console.log("statusItem", statusItem);
      if (statusItem?.isnew) {
        this.setBusLine_congestion(item);
        // this.setBusLine(item);
        statusItem.isDraw = true;
        statusItem.isnew = false;
      } else {
        statusItem.isDraw = false;
      }
    });
  }

  async setBusLine(item: busLineItem) {
    // console.log("item", item);
    let maDynamicEntity = await this.getDynamicBusLine(item.routeid, item.dirction);
    const idx = this.mapStore.watchForRouteIdStatus.findIndex(
      (x) => x.routeid == item.routeid && x.dirction == item.dirction
    );
    this.mapStore.watchForRouteIdStatus[idx].routeName = maDynamicEntity.routeName;
    if (maDynamicEntity.ReplaceBusLinePoint.length > 0) {
      this.mapStore.watchForRouteIdStatus[idx].hasSubRoute = true;
      // console.log('this.mapStore.watchForRouteIdStatus', this.mapStore.watchForRouteIdStatus)
    }
    if (item.openSubRoute) {
      if (!this.mapStore.watchForRouteIdStatus[idx].hasSubRoute) {
        this.showToast({
          severity: 'info',
          summary: '替代路線生成中',
          group: 'customToast',
          life: 2500,
        });

        setTimeout(() => {
          this.showToast({
            severity: 'error',
            summary: '尚無替代路線',
            group: 'customToast',
            life: 2500
          });
        }, 3000);
      }
      let overlay2 = new GoogleThreeOverlayRunCar(
        this.mapRef,
        maDynamicEntity.getSubFirstPoint(),
        0x00ff00,
        3
      );
      overlay2.setDynamicBusLine(maDynamicEntity);
      overlay2.addMultiRunCarLayer(true);
      if (overlay2 != null) this.store.oldfirstpoint?.push(overlay2);
    }

    if (!item.openOldRoute) {
      let overlay = new GoogleThreeOverlayRunCar(
        this.mapRef,
        maDynamicEntity.getFirstPoint()
      );
      overlay.setDynamicBusLine(maDynamicEntity);
      overlay.addMultiRunCarLayer();
      if (overlay != null) this.store.oldfirstpoint?.push(overlay);
    }

    const center = this.calculateBoundingBoxCenter(
      maDynamicEntity.getOrgBusLinePoint()
    );
    this.getCustomPloyLineBounds(maDynamicEntity.getOrgBusLinePoint());
    this.mapRef.moveCamera({
      center: center,
      tilt: 60,
      heading: 0,
      zoom: 15,
    });
  }
  // 公車路線壅塞情形，含公車站marker
  async setBusLine_congestion(item: busLineItem) {
    let res = await this.f1svc.getBusStopCongestion(item.routeid, Number(item.dirction))
    console.log('res', res);
    let segments = []
    res.segments.forEach(async (seg) => {
      const segment = new MapBusLineSegment(seg)
      segments.push(segment)
    })

    let maDynamicEntity = await this.getDynamicBusLine(item.routeid, item.dirction)
    const points = new MapBusLineSegment().convertLineStringToLatLng(res.meta.new_line_wkt)
    maDynamicEntity.setOrgBusLinePoint(points)
    const idx = this.mapStore.watchForRouteIdStatus.findIndex(
      (x) => x.routeid == item.routeid && x.dirction == item.dirction
    );
    this.mapStore.watchForRouteIdStatus[idx].routeName = maDynamicEntity.routeName;
    if (maDynamicEntity.ReplaceBusLinePoint.length > 0) {
      this.mapStore.watchForRouteIdStatus[idx].hasSubRoute = true;
    }
    let overlay = new GoogleThreeOverlayRunCar(
      this.mapRef,
      maDynamicEntity.getFirstPoint(),
    )
    overlay.setDynamicBusLine(maDynamicEntity)
    overlay.setMultipleLine(segments)
    overlay.addMultiSegmentRunCarLayer(true)
    if (overlay != null) this.store.oldfirstpoint?.push(overlay)

    const center = this.calculateBoundingBoxCenter(
      maDynamicEntity.getOrgBusLinePoint()
    )
    this.getCustomPloyLineBounds(maDynamicEntity.getOrgBusLinePoint())
    this.mapRef.moveCamera({
      center: center,
      tilt: 60,
      heading: 0,
      zoom: 15,
    })
  }


  calculateBoundingBoxCenter(placeList) {
    let minLat = Infinity,
      maxLat = -Infinity;
    let minLng = Infinity,
      maxLng = -Infinity;

    // 計算邊界框
    for (const coord of placeList) {
      minLat = Math.min(minLat, coord.lat);
      maxLat = Math.max(maxLat, coord.lat);
      minLng = Math.min(minLng, coord.lng);
      maxLng = Math.max(maxLng, coord.lng);
    }

    // 計算邊界框的中心
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // 找到最接近中心點的坐標
    let closestPoint = placeList[0];
    let minDistance = Infinity;

    for (const coord of placeList) {
      const distance = Math.sqrt(
        Math.pow(coord.lat - centerLat, 2) + Math.pow(coord.lng - centerLng, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = coord;
      }
    }

    return new Latlng({
      lat: closestPoint.lat,
      lng: closestPoint.lng,
    });
  }

  async addMarkerToMap(): Promise<void> {
    // const { roadworkData, accidentData, stationData } = {};//await this.svc.getMarkerData()
    // this.createMarker(roadworkData, "roadWork", GMarkerType.MARKER_TITLE_ICON)
    // this.createMarker(accidentData, "accident", GMarkerType.MARKER_TITLE_ICON)
    // this.createMarker(stationData, "station", GMarkerType.MARKER_TITLE_ICON_STATION)

    const markerList = this.store.getGMarkerDatas()
    markerList.forEach((marker) => {
      let m = marker.draw(this.mapRef)
    })
  }


  private createMarker(data: any[], layer: string, markerType: GMarkerType): void {
    data.forEach((item) => {
      const position = new Latlng({ lat: item.lat, lng: item.lng || item.long });
      const marker = new GMarker({
        router: this.$router,
        toast: this.toast,
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
        markerEntity.draw(this.mapRef);
      };

      this.store.addGMarker(marker);
    })
  }

  public updateAllMarkers() {
    const markerList = this.store.getGMarkerDatas()
    markerList.forEach((marker) => {
      if (!marker.getContent()) {
        marker.draw(this.mapRef)
      } else {
        marker.setMap(this.mapRef)
      }
    })
  }

  async getDynamicBusLine(routeid: string, direction?: Number) {
    let mapBusEntity = new MapBusLine();
    let list = [];// await this.svc.getBusRouteList(routeid, direction);
    let oneRoute = list.firstOrDefault();
    if (oneRoute == null) return;

    let replaceIdx = this.commandStore.saveReplaceList.findIndex(
      (item) => item.routeid == routeid && item.direction == direction
    );
    // console.log('replaceIdx', replaceIdx)
    // replaceIdx = 2
    let replacepoints;
    if (replaceIdx !== -1) {
      const item = this.commandStore.saveReplaceList[replaceIdx];
      if (item.sub_route) {
        replacepoints = this.customPloyLine.convertToLatLng(item.sub_route);
      }
      // replacepoints = this.customPloyLine.convertToLatLng("LINESTRING(120.28511 22.62091,120.28490 22.62052,120.28271 22.62156,120.28372 22.62350,120.28594 22.62238,120.28697 22.62439,120.28478 22.62543,120.28533 22.62635,120.28611 22.62593,120.28624 22.62595,120.28741 22.62646,120.28876 22.62699,120.29925 22.63041,120.29705 22.63599,120.29645 22.63787,120.30089 22.63788,120.30256 22.63775,120.30519 22.63752,120.30656 22.63751,120.30865 22.63755,120.30849 22.63556,120.31345 22.63522,120.31374 22.63529,120.31408 22.64036,120.31499 22.64033,120.31543 22.64032,120.31580 22.64024,120.31667 22.64013,120.31756 22.64006,120.32103 22.63972,120.32797 22.63909,120.33210 22.63837,120.33228 22.63932,120.33217 22.64071,120.33276 22.64070,120.33409 22.64051,120.34134 22.63923,120.34203 22.64258,120.34582 22.64182,120.34718 22.64743,120.34926 22.65196,120.35114 22.65104,120.35196 22.65074,120.35235 22.65060,120.35270 22.65052,120.35358 22.65041,120.35440 22.65049,120.35515 22.65062,120.35551 22.65073,120.35580 22.65087,120.35614 22.65111,120.35879 22.65031,120.35920 22.65029,120.35941 22.65040,120.35964 22.65074,120.35987 22.65182,120.35979 22.65250,120.35961 22.65319,120.35964 22.65354,120.35980 22.65383,120.35997 22.65402,120.36017 22.65422,120.36024 22.65440,120.36026 22.65459,120.35962 22.65646,120.36117 22.65708,120.36077 22.65849,120.36149 22.65864,120.36083 22.66078,120.36136 22.66089,120.36177 22.66096,120.36214 22.66110,120.36241 22.66139,120.36248 22.66160,120.36252 22.66185,120.36197 22.66557,120.36157 22.66702,120.36103 22.66853,120.35893 22.67227,120.35783 22.67376,120.35744 22.67413,120.35608 22.67285,120.35696 22.67073,120.35724 22.66939,120.35757 22.66866,120.35798 22.66799)")
    }
    let points: Array<ILatlng> = (await oneRoute.getShapeLinePoints(
      oneRoute.entiy.direction
    )) as Array<ILatlng>;
    mapBusEntity.setOrgRouteEntity(oneRoute).setOrgBusLinePoint(points).setRouteName(oneRoute.entiy.routename_zh_tw);

    if (replacepoints) {
      mapBusEntity.setreplaceBusLinePoint(replacepoints);
    }
    let dynamicBusDatas: Array<CStgTdxRealtime> = [];
    // await this.svc.getDynamicBusData(
    //   oneRoute.entiy.routeid,
    //   oneRoute.entiy.direction
    // );
    for (let i = 0; i < dynamicBusDatas?.length; i++) {
      let oneBus: CStgTdxRealtime = dynamicBusDatas[i];
      let oneBusLatlng = new Latlng({
        lat: oneBus.positionlat?.toNumber(),
        lng: oneBus.positionlon?.toNumber(),
      });
      let newPoints = points.map((x) => {
        return new Latlng(x).setTargetDistance(oneBusLatlng);
      });

      let oneDynamic = new MapDynamicBusEntity()
        .setPlatenumb(oneBus.platenumb)
        .setTargetBus(oneBusLatlng)
        .setStartLinePoint(newPoints)
        .setCurrentStartLine() // 將當前位置設定為起始點
        .setRouteId(oneBus.routeid)
        .setRouteName(oneBus.routename_zh_tw)
        .setDirection(oneBus.direction)
        .setOperatorName(oneBus.operatorname_zh)
        .setRemainingBattery(oneBus.remaining_battery)
        .setRequireBattery(oneBus.require_battery)
        .setDriverName(oneBus.driver_name)
        .setIsRecommendCharge(oneBus.isRecommendCharge);

      mapBusEntity.addDynamicBus(oneDynamic);
    }

    //mapBusEntity.showLog();

    return mapBusEntity;
  }

  // 計算line point 邊界
  private getCustomPloyLineBounds(points): Bounds {
    if (points == null || points.length == 0) return null;

    let lats = points.orderBy((x) => x.lat);
    let lngs = points.orderBy((x) => x.lng);
    let latStart = lats.at(0);
    let latEnd = lats.at(-1);
    let lngStart = lngs.at(0);
    let lngEnd = lngs.at(-1);
    let b = new Bounds();
    b.northeast = new Northeast({ lat: latStart.lat, lng: lngEnd.lng });
    b.southwest = new Northeast({ lat: latEnd.lat, lng: lngStart.lng });

    this.moveAndZoomMapByBounds(b);
  }
  private fitBounds(bounds: LatLngBoundsLiteral) {
    this.mapRef.fitBounds(bounds);
  }
  private moveAndZoomMapByBounds(bounds: Bounds) {
    //console.log('mapBounds', bounds);
    this.fitBounds(new LatLngBoundsLiteral()?.setBoundsLiteral(bounds));
  }
}
