import { Bounds, Northeast } from '@/service/googleService/GoogleService.model.ts';
import { Position } from '../geo/Geo.model.ts';
import { LangData } from '@/service/bus/BusService.model.ts';

export class GMMarker {
  type?: MarkerType
  infoId?: string  // routeId or stopId 用於之後查infoWindow資訊
  info_routeid?: string
  info_stopid?: string
  info_stationid?: string
  direction?: number
  position?: Latlng
  markerId?: number // index
  imgUrl?: string = ''
  tag?: MarkerTag = new MarkerTag()
  showInfo?: boolean = false
  iconType?: IconType
  iconStatus?: IconStatus
  markerImgDatas?: Array<GMMarkerImg>;
  routeid: string
  lineName?: string
  stopName?: string
  routename_zh_tw: string
  routename_en: string
  stopname_zh_tw: string
  stopname_en: string
  nearByDistance?: number
  clcikType?: number // 點集的情境
  zIndex?: number
  isFirst?: boolean
  loctowncode?: string
  key?: string
  value?: string
  dotType?: boolean = false

  constructor(init?: Partial<GMMarker>) {
    Object.assign(this, init);
    this.markerImgDatas = [
      new GMMarkerImg(MarkerTypeTxt.bus, "/img/map/blueBus.svg", "/img/map/disabledBus.svg"),
      new GMMarkerImg(MarkerTypeTxt.bike, "/img/map/blueBike.svg", "/img/map/disabledBike.svg"),
      new GMMarkerImg(MarkerTypeTxt.LRT, "/img/map/blueLightRail.svg", "/img/map/disabledLightRail.svg"),
      new GMMarkerImg(MarkerTypeTxt.dot, "/img/map/circle_active.svg", "/img/map/circle_inactive.svg")
    ];
  }

  get setImgUrl(): string {
    return `${this.iconType}_${this.iconStatus}.svg`
  }

  public setTagMarkerPosition() {
    return this.setCustomMarkerTextPosition(this.tag?.tagPosition);
  }
  public setCustomMarkerTextPosition(position: TagPosition): string {
    // 設置marker旁的tag位置
    if (position == TagPositionTxt.right) {
      return 'left-[30px] top-[-4px]'
    } else if (position == TagPositionTxt.top) {
      return 'left-[50%] translate-x-[-50%] bottom-[100%] mb-2'
    } else {
      return ''
    }
  }

  public setCurrentMarkerImage() {
    this.imgUrl = this.markerImgDatas.find(x => x.type == this.type.toString()).getActive();
    return this;
  }
  public setCurrentMarkerImageByDisable() {
    this.imgUrl = this.markerImgDatas.find(x => x.type == this.type.toString()).getInactive();
    return this;
  }

  public setinfoId(id: string) {
    this.infoId = id;
    return this;
  }
  public setinfo_routeid(id: string) {
    this.info_routeid = id;
    return this;
  }
  public setinfo_stopid(id: string) {
    this.info_stopid = id;
    return this;
  }
  public setinfo_station(id: string) {
    this.info_stationid = id;
    return this;
  }
  public setmarkerId(id: number) {
    this.markerId = id;
    return this;
  }

  public setPostion(pos: Latlng) {
    this.position = pos;
    return this;
  }
  public setType(type: MarkerType) {
    this.type = type;
    this.setCurrentMarkerImage();
    return this;
  }
  public setMarkerTag(tag: MarkerTag) {
    this.tag = tag;
    return this;
  }
  public setClickType(clickType: number) {
    this.clcikType = clickType;
    return this;
  }
  public setDirection(direction: number) {
    this.direction = direction;
    return this;
  }
  public setKeyValue() {
    this.key = this.info_stopid
    this.value = this.stopName
    return this;
  }
  public setDotType() {
    this.dotType = true;
    return this;
  }
}

export class LatLngBoundsLiteral {
  north: number
  south: number
  east: number
  west: number

  constructor(init?: Partial<LatLngBoundsLiteral>) {
    Object.assign(this, init);
  }

  public setBoundsLiteral(bounds: Bounds) {
    this.north = bounds.northeast.lat;
    this.east = bounds.northeast.lng;
    this.south = bounds.southwest.lat;
    this.west = bounds.southwest.lng;
    return this;
  }
}
export class Latlng {
  lat?: number
  lng?: number
  isFirst?: boolean

  constructor(init?: Partial<Latlng>) {
    Object.assign(this, init);
  }
  public setLatLng?(pos: Position) {
    this.lat = pos.latitude;
    this.lng = pos.longitude;
    return this;
  }
  public setIsFirst?(isFirst: boolean) {
    this.isFirst = isFirst;
    return this;
  }

}
export type MarkerType = MarkerTypeTxt.bus | MarkerTypeTxt.bike | MarkerTypeTxt.LRT | MarkerTypeTxt.dot | MarkerTypeTxt.routeLine
export enum MarkerTypeTxt {
  bus = 'bus',
  bike = 'bike',
  LRT = 'LRT',
  dot = 'dot',
  routeLine = 'routeLine',
}
export class MarkerTag {
  tagTxt?: string
  tagIcon?: string
  tagPosition?: TagPosition = TagPositionTxt.right
  tagTxtColor?: string = 'text-Surface'  // 請使用tailwind語法
  tagBgColor?: string = 'bg-Primary' // 請使用tailwind語法
  tagBorder?: string // 請帶入顏色及尺寸 ex: 'border-border border-[1rem]'

  constructor(init?: Partial<MarkerTag>) {
    Object.assign(this, init)
  }
}
export type TagPosition = TagPositionTxt.top | TagPositionTxt.right
export enum TagPositionTxt {
  top = 'top',
  right = 'right'
}
export type IconType = IconTypeTxt.circle | IconTypeTxt.busChat | IconTypeTxt.bikeChat | IconTypeTxt.LRTChat | IconTypeTxt.busCircle
export enum IconTypeTxt {
  circle = 'circle',
  busChat = 'busChat',
  bikeChat = 'bikeChat',
  LRTChat = 'LRTChat',
  busCircle = 'busCircle',
}
export type IconStatus = IconStatusTxt.active | IconStatusTxt.inactive | IconStatusTxt.disabled
export enum IconStatusTxt {
  active = 'active',
  inactive = 'inactive',
  disabled = 'disabled'
}
export class TransportTools {
  busStop_Zn?: string
  busStop_En?: string
  youBikeStop_Zn?: string
  youBikeStop_En?: string
  lightRailStop_Zn?: string
  lightRailStop_En?: string
  constructor() {
    this.busStop_Zn = '公車站'
    this.busStop_En = 'Bus Stop'
    this.youBikeStop_Zn = 'YouBike 2.0'
    this.youBikeStop_En = 'YouBike 2.0 Station'
    this.lightRailStop_Zn = '輕軌站'
    this.lightRailStop_En = 'Light Rail Station'
  }
}

export class GMInfoWindow {
  constructor(type: MarkerTypeTxt, title: string, infoData: Array<InfoWindowData>) {
    this.type = type
    this.title = title
    this.infoData = infoData

    this.subTitleTxt = "";//this.setTypeTxt()
  }

  type: MarkerTypeTxt = null
  title?: string = ''
  subTitleTxt?: string = ''
  infoData?: Array<InfoWindowData> = []

  public getSubTitleTxt(langcode: string): string {
    const transportTools = new TransportTools();
    if (this.type == MarkerTypeTxt.bus) {
      return new LangData(transportTools.busStop_Zn, transportTools.busStop_En).setLangCode(langcode).Value;
    } else if (this.type == MarkerTypeTxt.bike) {
      return new LangData(transportTools.youBikeStop_Zn, transportTools.youBikeStop_En).setLangCode(langcode).Value;
    } else if (this.type == MarkerTypeTxt.LRT) {
      return new LangData(transportTools.lightRailStop_Zn, transportTools.lightRailStop_En).setLangCode(langcode).Value;
    } else {
      return ''
    }
  }
}
export class InfoWindowData {
  constructor(init?) {
    Object.assign(this, init)
  }
  routeName?: string   // 站牌名（只有bus有）
  desc?: string = ''    // 開往xxx or 可租/還
  rightText?: string = ''  // 到站狀態 or 可租/還數量
  arrivalTime?: string = ''  // 用於換算到站狀態
  timeStatus?: string = ''
}
export enum PloyLineType {
  walking = "walking",
  transportation = "transportation",
  busLine = "busLine",
  routeLine = "routeLine"
}

export class PloyLineIconSvgStyle {
  path?: string;
  strokeOpacity?: number;
  scale?: number;
  constructor(init?: Partial<PloyLineIconSvgStyle>) {
    Object.assign(this, init);
  }
}

export class PloyLineIconStyle {
  icon?: PloyLineIconSvgStyle;
  offset?: string;
  repeat?: string;

  constructor(init?: Partial<PloyLineIconStyle>) {
    Object.assign(this, init);
  }
  public setIcon(icon: PloyLineIconSvgStyle) {
    this.icon = icon;
    return this;
  }
  public setOffset(val: string) {
    this.offset = val;
    return this;
  }
  public setRepeat(val: string) {
    this.repeat = val;
    return this;
  }
}


export class CustomPloyLine {
  id?: number
  path?: Array<Latlng>
  geodesic?: boolean = false;
  strokeColor?: string
  strokeOpacity?: number
  strokeWeight?: number = 5;
  icons?: any = [];
  stringPath?: string
  type?: string
  lineString?: string
  transportationType?: any
  lineColor?: any

  constructor(init?: Partial<CustomPloyLine>) {
    Object.assign(this, init);
  }
  public convertToLatLng(str: string): Array<Latlng> {
    if (str == "")
      return new Array<Latlng>();
    let latLngArray: Array<Latlng> = new Array<Latlng>();
    const coordinatesString = str.match(/\(([^)]+)\)/)?.[1]
    if (coordinatesString) {
      const coordinatesPairs = coordinatesString.split(',')
      const latLngArrayValue = coordinatesPairs.map((pair) => {
        const [lng, lat] = pair.trim().split(' ')
        return new Latlng({ lat: parseFloat(lat), lng: parseFloat(lng) });
      });

      latLngArray = latLngArrayValue
    } else {
      console.error('不是LINESTRING()')
    }
    return latLngArray
  }
  public setPathData() {
    if (this.lineString == null || this.lineString == "")
      return this;

    this.path = this.convertToLatLng(this.lineString);
    return this;
  }
  public setDataBypolyLine(line: polyLine) {
    this.type = line.type;
    this.lineString = line.lineString;
    return this;
  }
  public setId(id: number) {
    this.id = id;
    return this;
  }
  public setTransportationType(type?: any) {
    this.transportationType = type
    return this;
  }
  public setLineColor(color?: any) {
    this.lineColor = color
    return this;
  }
  public setStrokeWeight(weight?: number) {
    this.strokeWeight = weight
    return this;
  }


  public setDefaultDataByType() {
    if (this.type == PloyLineType.walking) {

      this.strokeColor = "#ACACAC";
      this.strokeOpacity = 0;
      this.icons = [
        new PloyLineIconStyle()
          .setIcon(new PloyLineIconSvgStyle({
            path: "M 0,-1 0,1",
            strokeOpacity: 1,
            scale: 4,
          }))
          .setOffset("2")
          .setRepeat("40px")

      ];

    }
    else if (this.type == PloyLineType.transportation) {
      this.strokeColor = this.lineColor || "#333";
      this.strokeOpacity = 1.0;
    }
    else if (this.type == PloyLineType.busLine) {
      this.strokeColor = "#E7E7E7";
      this.strokeOpacity = 1.0;
    }
    else if (this.type == PloyLineType.routeLine) {
      this.strokeColor = "#CECECE";
      this.strokeOpacity = 1.0;
    }

  }

  public getPathOption() {
    const data = {
      path: this.path,
      geodesic: this.geodesic,
      strokeColor: this.strokeColor,
      strokeOpacity: this.strokeOpacity,
      strokeWeight: this.strokeWeight,
      icons: this.icons
    }
    // console.log('data', data)
    return data
  }


}

export class polyLine {
  type?: string
  lineString: string
  transportationType?: any
  lineColor?: any
  strokeWeight?: number
  constructor(init?: Partial<polyLine>) {
    Object.assign(this, init)
  }
}


export class GMMarkerImg {
  public type?: MarkerType;
  private activeImg?: string;
  private inactiveImg?: string;
  constructor(type?: MarkerType, activeSvg?: string, inactiveSvg?: string) {
    this.activeImg = activeSvg;
    this.inactiveImg = inactiveSvg;
    this.type = type;
  }
  public getActive() {
    return this.activeImg;
  }
  public getInactive() {
    return this.inactiveImg;
  }
}

export enum InfoWindowActionType {
  closeNone = 1,// 關閉後不需要重置其他maker
  closeReset = 2 //  關閉後需要重置其他maker
}  