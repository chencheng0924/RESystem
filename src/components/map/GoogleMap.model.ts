import { CStgTdxRoute } from "@/service/bus/BusService.model";
import { Geo } from "@/service/geo/GeoService";
import { CommonExtension } from "@/utils/commonExtension";
import { nextTick, Reactive } from "vue";
import { Router } from "vue-router";
import { ToastServiceMethods } from "primevue/toastservice";
import { ToastMessageOptions } from "primevue/toast";
import { GMapStore } from "@/stores/map/GMapStore";
import { CommandFactory } from "@/lib/commandFactory/CommandFactory";

export interface ILatlng {
    lat?: number
    lng?: number
}

export class Latlng {
    seq?: number
    lat?: number
    lng?: number
    targetDistance?: number;// 與目標物的距離

    constructor(init?: Partial<Latlng>) {
        Object.assign(this, init);
    }
    public setLatLng?(pos: Latlng) {
        this.lat = pos.lat;
        this.lng = pos.lng;
        return this;
    }

    public toGooglelatlng() {
        return { lat: this.lat, lng: this.lng };
    }

    public setTargetDistance(target: Latlng) {
        this.targetDistance = Geo.getDistanceByLatLng(this.lat, this.lng, target.lat, target.lng);
        return this;
    }
}
export enum GMarkerType {
    MARKER_ICON,
    MARKER_DYNAMIC_BTN,
    MARKER_TITLE_ICON,
    MARKER_TITLE_ICON_STATION,
    MARKER_BUS_INFO,
    MARKER_BUS_STOPS,
}
export class GMarker {
    private layer?: string = ''
    private position?: Latlng;
    private contentMarker?: google.maps.marker.AdvancedMarkerElement;
    private id?: string;
    public type?: GMarkerType = GMarkerType.MARKER_ICON;
    private title?: string;
    private dataObj?: Record<string, any>;
    private gen?: GMarkerHTMLGenerate;
    public zoomChange?: Function;
    public zoomState?: string;
    private router?: Router;
    private toast?: ToastServiceMethods;

    constructor(init?) {
        Object.assign(this, init);
        this.gen = new GMarkerHTMLGenerate();
    }

    setLayer(layer?: string) {
        this.layer = layer;
        return this;
    }
    getLayer() {
        return this.layer;
    }
    setId(id?: string) {
        if (id == null || id == "")
            this.id = CommonExtension.generateUUID();

        this.id = id;
        return this;
    }
    getId() {
        return this.id;
    }
    setContent(content?: google.maps.marker.AdvancedMarkerElement) {
        this.contentMarker = content;
        return this;
    }
    getContent() {
        return this.contentMarker;
    }
    setPosition(position?: Latlng) {
        this.position = position;
        return this;
    }
    getPosition() {
        return this.position;
    }
    setType(type?: GMarkerType) {
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setZoomState(state: string) {
        this.zoomState = state;
        return this;
    }
    getZoomState() {
        return this.zoomState;
    }
    setMap(map: any) {
        if (this.contentMarker == null)
            return;

        this.contentMarker.map = map;
        return this;
    }
    removeMap(map: any) {
        this.setMap(null);
        return this;
    }
    callzoomChange(zoom) {
        if (this.zoomChange == null)
            return;

        this.zoomChange(this, zoom);

    }
    // 生成 Marker
    draw(map: any, hasPosition: boolean = true) {
        if (map == undefined || map == null)
            return;

        const iconObj = this.generalIconByLayerValue();
        const replaceData = Object.assign({}, this.dataObj, iconObj);

        if (this.contentMarker != null) {
            this.contentMarker.map = map;
            this.contentMarker.innerHTML = this.gen.getMarkerHTML(this.type, replaceData);
            return;
        }
        const markerDiv = document.createElement('div')
        markerDiv.innerHTML = this.gen.getMarkerHTML(this.type, replaceData);

        const positionOpt = {
            map,
            content: markerDiv,
        } as { [key: string]: any };

        if (hasPosition) {
            positionOpt.position = this.position.toGooglelatlng();
        }

        const marker = new google.maps.marker.AdvancedMarkerElement(positionOpt);

        // 為整個 AdvancedMarkerElement 添加點擊事件監聽器
        marker.addListener("click", (event) => {

            // 獲取點擊事件的目標元素
            const clickedElement = event.domEvent.target;

            if (clickedElement.classList.contains("affectRoute")) {
                console.log("影響路線＿被點擊了！");
                this.showAffectRoute()
            }
            if (clickedElement.classList.contains("alternativeRouteBtn")) {
                console.log("替代路線＿被點擊了！");
                this.showAlternateRoute(clickedElement)
            }
            if (clickedElement.classList.contains("alertDriverBtn")) {
                console.log("通知司機＿被點擊了！");
                this.notifyDriver()
            }
            if (clickedElement.classList.contains("infoBtn")) {
                console.log("場站查看詳情＿被點擊了！");
                this.navigateWithParam()
            }
            if (clickedElement.classList.contains("carInfoBtn")) {
                console.log("公車查看詳情＿被點擊了！");
                this.showCarInfo()
            }
        });

        // 使用 content.addEventListener 來監聽 hover 事件
        if (marker.content) {
            marker.content.addEventListener('mouseenter', () => {
                console.log('marker mouseenter', marker.content);
                marker.zIndex = 9999; // 設定為最高層
            });

            marker.content.addEventListener('mouseleave', () => {
                console.log('marker mouseleave');
                marker.zIndex = null; // 恢復預設層級
            });
        }

        this.contentMarker = marker;
        return marker
    }

    private generalIconByLayerValue() {
        if (!this.layer)
            return {};
        if (this.layer == 'accident')
            return {
                mapMarkIcon: 'triangle_red.svg'.getMarker(),
                titleIcon: 'alert_red.svg'.getMarker(),
                arrowIcon: 'triangle_red.svg'.getMarker(),
                hilighted: 'hilighted.png'.getMarker()
            };
        if (this.layer == 'roadWork')
            return {
                mapMarkIcon: 'triangle_yellow.svg'.getMarker(),
                titleIcon: 'Fence.svg'.getMarker(),
                arrowIcon: 'triangle_yellow.svg'.getMarker(),
                hilighted: 'hilighted.png'.getMarker()
            };
        if (this.layer == 'station')
            return {
                mapMarkIcon: 'triangle_blue.svg'.getMarker(),
                statusIcon: 'dot_red.svg'.getMarker(),
                titleIcon: 'Factory.svg'.getMarker(),
                arrowIcon: 'triangle_blue.svg'.getMarker(),
                hilighted: 'hilighted.png'.getMarker()
            };
        if (this.layer == 'flood')
            return {
                mapMarkIcon: 'triangle_blue1.svg'.getMarker(),
                titleIcon: 'floodCar.svg'.getMarker(),
                arrowIcon: 'triangle_blue1.svg'.getMarker(),
                hilighted: 'hilighted.png'.getMarker()
            };
        if (this.layer == 'bus')
            return {
                titleIcon: 'floodCar.svg'.getMarker(),
                busDotIcon: 'busDot.svg'.getMarker(),
            };
        if (this.layer == 'busStop')
            return {
                busStopIcon: 'circle_inactive.svg'.getMarker(),
            };
    }

    // 影響路線
    showAffectRoute() {
        const routeIdList = this.dataObj?.routeid
        let cmd = new CommandFactory();
        console.log('routeIdList', routeIdList)
        cmd.run(`Map showRoutes routeIds=${routeIdList}`);
    }

    // 替代路線
    showAlternateRoute(e) {
        const routeId = e.dataset.routeid
        const routeName = e.dataset.routename
        const direction = e.dataset.direction
        const googleMapStore = GMapStore()
        const controlTrigger = googleMapStore.mapControllerList.find((list) => list.title === routeName && list.hasSubRoute)

        if (controlTrigger) {
            let cmd = new CommandFactory();
            cmd.run(`Map showRoute routeId="${routeId}" openSubRoute="${true}" dirction=${controlTrigger.dirction}`, '')
            controlTrigger.subchecked = true
        } else {
            // 沒有替代路線可以顯示
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
    }

    // 場站詳情
    async navigateWithParam() {
        const stationName = this.dataObj?.deopT_NAME
        await this.router.push(`/dashboardCar?stationName=${stationName}`)
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

    // 通知司機
    notifyDriver() {
        this.showToast({
            severity: 'info',
            summary: '正在通知司機',
            group: 'customToast',
            life: 3000,
        });

        setTimeout(() => {
            this.showToast({
                severity: 'success',
                summary: '已成功通知司機',
                group: 'customToast',
                life: 3000
            });
        }, 4000);
    }

    // 顯示車輛詳情
    showCarInfo() {
        const { platenumb, routeId, direction } = this.dataObj

        let cmd = new CommandFactory();
        cmd.run(`Map focusPointByBus platenumb="${platenumb}"`);
        cmd.run(`Host showDrawerByBus routeId="${routeId}" dir="${direction}" platenum=${platenumb}`);
    }
}

export class GMarkerHTMLItem {
    type?: GMarkerType;
    html?: string = ''
    constructor(init?) {
        Object.assign(this, init)
    }
}

export class GMarkerHTMLGenerate {

    private markerDatas?: Array<GMarkerHTMLItem> = [];
    constructor() {
        this.markerDatas = [
            new GMarkerHTMLItem({
                type: GMarkerType.MARKER_ICON,
                html: `
                        <div class="w-fit flex items-center">
                            <img class="mapMarkIcon" src="[mapMarkIcon]" alt="">
                        </div>
                    `
            }),
            new GMarkerHTMLItem({
                type: GMarkerType.MARKER_DYNAMIC_BTN,
                html: `
                        <div class="flex flex-col gap-[5px] text-white">
                            <span>[routename]</span>
                            <div>
                                <Button class="alternativeRouteBtn w-fit bg-[#34343A] px-[12px] py-[4px] rounded" data-routeId="[routeid]" data-routename="[routename]" data-direction="[direction]">替代路線</Button>
                                <Button class="alertDriverBtn w-fit bg-[#34343A] px-[12px] py-[4px] rounded">通知司機</Button>
                            </div>
                        </div>
                    `
            }),
            new GMarkerHTMLItem({
                type: GMarkerType.MARKER_TITLE_ICON,
                html: `
                        <div class="w-fit group flex flex-col items-center gap-[5px] text-[14px] text-white hover:z-20">
                            <div class="z-[4] infoBlock absolute -top-[16px] min-w-[200px] max-w-[320px] w-max left-1/2 -translate-x-1/2 -translate-y-full invisible group-hover:!visible bg-[#4e3eae] p-[12px] pb-[16px] rounded">
                                <ul>
                                    <li>
                                        <span class="label">時間：</span><span> [time_range] </span>
                                    </li>
                                    <li>
                                        <span class="label">事件：</span><span> [place] [title] </span>
                                    </li>
                                    <li class="affectRoute underline">
                                        <span class="label affectRoute">影響路線：</span><span class="affectRoute">[routename]</span>
                                    </li>
                                    <li class="routeListBlock flex flex-wrap items-center gap-[5px] mt-[8px]">
                                        [DYNAMIC_BLOCK_START]

                                        [DYNAMIC_BLOCK_END]
                                    </li>
                                </ul>
                                <div class="z-[3] absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[20px] h-[20px] bg-[#4e3eae] transform rotate-45 rounded"></div>
                            </div>
                            <div class="z-[3] relative flex flex-col items-center gap-[5px]">
                                <div class="w-fit z-[3] bg-[#2a2c2d] flex items-center gap-[5px] p-[5px] rounded">
                                    <img class="titleIcon" src="[titleIcon]" alt="">
                                    <span class="">[event_type]</span>
                                </div>
                                <figure class="z-[2]">
                                    <img class="arrowIcon max-w-full max-h-full" src="[arrowIcon]" alt="">
                                </figure>
                                <figure class="absolute invisible group-hover:!visible z-[1] bottom-[-60px]">
                                    <img class="hilighted max-w-none pt-[10px]" src="[hilighted]" alt="">
                                </figure>
                            </div>
                        </div>
                    `
            }),
            new GMarkerHTMLItem({
                type: GMarkerType.MARKER_TITLE_ICON_STATION,
                html: `
                        <div class="w-fit group flex flex-col items-center gap-[5px] text-[14px] text-white ">
                            <div class="infoBlock *:font-bold z-[4] absolute -top-[16px] left-1/2 -translate-x-1/2 -translate-y-full w-max max-w-[400px] invisible group-hover:!visible bg-[#4e3eae] p-[16px] rounded">
                                <div class="title text-[18px] font-bold mb-[16px]">[deopT_NAME]</div>
                                <div class="contentRow w-[330px]">
                                    <table class="w-full">
                                        <thead class="bg-[#373156]">
                                            <tr class="*:border *:border-[#4e3eae] *:text-[14px] *:text-center *:w-[33.3%] *:py-[8px]">
                                                <th class="total ">總車輛</th>
                                                <th class="safe text-[#62F65E]">安全執勤</th>
                                                <th class="risky text-[#E74852]">有風險執勤</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-[#31247C]">
                                            <tr class="*:border *:border-[#4e3eae] *:text-[14px] *:text-center *:w-[33.3%] *:py-[8px] *:min-h-[38px]">
                                                <td>[total_cnt]</td>
                                                <td class="safe text-[#62F65E]">[duty_cnt]</td>
                                                <td class="risky text-[#E74852]">0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="subTitle text-[14px] font-bold mt-[12px] mb-[8px]">充電樁狀態</div>
                                <div class="contentRow w-[330px]">
                                    <table class="w-full">
                                        <thead class="bg-[#373156]">
                                            <tr class="*:border *:border-[#4e3eae] *:text-[14px] *:text-center *:py-[8px]">
                                                <th>充電中</th>
                                                <th class="safe">閒置中</th>
                                                <th class="risky">今日用電量</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-[#31247C]">
                                            <tr class="*:border *:border-[#4e3eae] *:text-[14px] *:text-center *:py-[8px] *:min-h-[38px]">
                                                <td>[charge_cnt]</td>
                                                <td>[outof_cnt]</td>
                                                <td>[total_cumulative_electrictiy_usage_kw] kw <span>([prop]%)</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Button class="infoBtn w-fit bg-[#34343A] px-[12px] py-[4px] rounded mt-[16px]">查看詳情</Button>
                                <div class="z-[3] absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[20px] h-[20px] bg-[#4e3eae] transform rotate-45 rounded"></div>
                            </div>
                            <div class="relative flex flex-col items-center gap-[5px]">
                                <div class="w-fit z-[3] bg-[#2a2c2d] flex items-center gap-[5px] p-[5px] rounded">
                                    <img class="statusIcon" src="[statusIcon]" alt="">
                                    <img class="titleIcon" src="[titleIcon]" alt="">
                                    <span class="">[deopT_NAME]</span>
                                </div>
                                <figure class="z-[2]">
                                    <img class="arrowIcon max-w-full max-h-full" src="[arrowIcon]" alt="">
                                </figure>
                                <figure class="absolute invisible group-hover:!visible z-[1] bottom-[-60px]">
                                    <img class="hilighted max-w-none pt-[10px]" src="[hilighted]" alt="">
                                </figure>
                            </div>
                        </div>
                    `
            }),
            new GMarkerHTMLItem({
                type: GMarkerType.MARKER_BUS_INFO,
                html: `
                        <div class="w-fit group flex flex-col items-center gap-[5px] text-[14px] text-white hover:z-20">
                            <div class="z-[4] infoBlock absolute -top-[16px] min-w-[200px] max-w-[320px] w-max left-1/2 -translate-x-1/2 -translate-y-full invisible group-hover:!visible bg-[#4e3eae] p-[12px] pb-[16px] rounded">
                                <ul>
                                    <li>
                                        <span class="label">路線：</span><span> [routeName] </span>
                                    </li>
                                    <li>
                                        <span class="label">車牌：</span><span> [platenumb] </span>
                                    </li>
                                    <li>
                                        <span class="label">營運商：</span><span> [operatorName] </span>
                                    </li>
                                    <li>
                                        <span class="label">駕駛人：</span><span> [driverName] </span>
                                    </li>
                                    <li>
                                        <span class="label">現有電量：</span><span> [remainingBattery]%</span>
                                    </li>
                                    <li>
                                        <span class="label">任務所需電量：</span><span> [requireBattery]%</span>
                                    </li>
                                    <li>
                                        <span class="label">回程建議充電：</span><span> [isRecommendCharge] </span>
                                    </li>
                                </ul>
                                <Button class="carInfoBtn w-fit bg-[#34343A] px-[12px] py-[4px] rounded mt-[16px]">查看詳情</Button>
                                <div class="z-[3] absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[20px] h-[20px] bg-[#4e3eae] transform rotate-45 rounded"></div>
                            </div>
                            <div class="z-[3] relative flex flex-col items-center justify-center">
                                <figure class="z-[2] w-[32px] h-[32px]">
                                    <img class="busDotIcon w-full h-full" src="[busDotIcon]" alt="">
                                </figure>
                                <div class="absolute w-[200px] pt-[100px]"></div>
                            </div>
                        </div>
                    `
            }),
            new GMarkerHTMLItem({
                type: GMarkerType.MARKER_BUS_STOPS,
                html: `
                    <div class="w-fit group flex flex-col items-center gap-[5px] text-[14px] text-white hover:z-20">
                        <div class="z-[4] infoBlock absolute -top-[16px] w-fit left-1/2 -translate-x-1/2 -translate-y-full invisible group-hover:!visible bg-[#4e3eae] p-[12px] pb-[16px] rounded whitespace-nowrap">
                            <ul>
                                <li>
                                    <span class="label break-keep">站名：[from_stop_name]</span>
                                </li>
                            </ul>
                            <div class="z-[3] absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[20px] h-[20px] bg-[#4e3eae] transform rotate-45 rounded"></div>
                        </div>
                        <div class="z-[3] relative flex flex-col items-center justify-center">
                            <figure class="z-[2] w-[12px] h-[12px]">
                                <img class="w-full h-full" src="[busStopIcon]" alt="">
                            </figure>
                        </div>
                    </div>
                `
            })
        ]
    }
    private getMarkerItem(type: GMarkerType) {

        let markerHTML = this.markerDatas.find(x => x.type == type);
        return markerHTML;
    }

    public getMarkerHTML(type: GMarkerType, replaceData?: any, replaceHtmLElement?: any) {
        let html = this.getMarkerItem(type)?.html;
        let dynamicHtml = ''

        if (html == null || html == "")
            return "";

        if (!!replaceData == false)
            return html;

        for (let key in replaceData) {

            if (type === GMarkerType.MARKER_TITLE_ICON && key === "routename") {
                const routeList = replaceData[key].split(",")
                if (routeList.length > 0) {
                    routeList.forEach((route, index) => {
                        let btnHtml = this.getMarkerItem(GMarkerType.MARKER_DYNAMIC_BTN)?.html
                        btnHtml = btnHtml.replaceAll(`[routename]`, route)
                        btnHtml = btnHtml.replaceAll(`[routeid]`, replaceData.routeid?.toString().split(",")[index])

                        const direction = route.includes('返程') ? '1' : '0'
                        btnHtml = btnHtml.replaceAll(`[direction]`, direction)

                        dynamicHtml += btnHtml
                    })
                    const regex = /\[DYNAMIC_BLOCK_START\]([\s\S]*?)\[DYNAMIC_BLOCK_END\]/
                    html = html.replace(regex, dynamicHtml);
                    dynamicHtml = ''
                }
            }

            html = html.replaceAll(`[${key}]`, replaceData[key]);
        }

        return html;
    }
}




export class MapBusLine {
    public OrgBusLinePoint?: Array<ILatlng> = [];
    public ReplaceBusLinePoint?: Array<ILatlng> = [];
    public OrgRouteEntity?: CStgTdxRoute;
    public DynamicBusLatLngs?: Array<MapDynamicBusEntity> = [];
    public BusLineSegments?: Array<MapBusLineSegment> = [];
    public routeName?: string

    constructor(init?) {
        Object.assign(this, init);
    }
    setRouteName(routeName: string) {
        this.routeName = routeName
        return this
    }
    setOrgRouteEntity(entity: CStgTdxRoute) {
        this.OrgRouteEntity = entity;
        return this;
    }
    getOrgRouteEntity() {
        return this.OrgRouteEntity;
    }
    setOrgBusLinePoint(points: Array<ILatlng>) {
        this.OrgBusLinePoint = points;
        return this;
    }
    setreplaceBusLinePoint(points: Array<ILatlng>) {
        this.ReplaceBusLinePoint = points;
        return this;
    }
    getOrgBusLinePoint() {
        return this.OrgBusLinePoint;
    }
    getreplaceBusLinePoint() {
        return this.ReplaceBusLinePoint;
    }
    addDynamicBus(entity: MapDynamicBusEntity) {
        this.DynamicBusLatLngs.push(entity);
        return this;
    }

    showLog() {
        this.DynamicBusLatLngs.forEach((x) => {

            console.log(`target : ${x.getTargetBus().lat} , ${x.getTargetBus().lng}`);
            let strs = x.getStartLinePoint().map(point => point.targetDistance);
            let logString = strs.join("\n");
            console.log(logString);
        })
    }

    getFirstPoint() {
        if (this.OrgBusLinePoint.length == 0)
            return null;

        return this.OrgBusLinePoint.firstOrDefault();
    }

    getSubFirstPoint() {
        console.log('this.ReplaceBusLinePoint', this.ReplaceBusLinePoint)
        if (this.ReplaceBusLinePoint.length == 0)
            return null;

        return this.ReplaceBusLinePoint.firstOrDefault();
    }

    findBus(platenumb: string) {
        if (this.DynamicBusLatLngs == null || this.DynamicBusLatLngs.length == 0)
            return null;

        return this.DynamicBusLatLngs.find(x => x.getPlatenumb() == platenumb);
    }

    isfindBus(platenumb: string) {
        if (this.DynamicBusLatLngs == null || this.DynamicBusLatLngs.length == 0)
            return false;

        let find = this.DynamicBusLatLngs.find(x => x.getPlatenumb() == platenumb);
        return find == null ? false : true;
    }
}

export class MapDynamicBusEntity {
    public treeJsTarget3DModel: Reactive<any>;// 載入模型
    public treeJsRouterLineCurve: Reactive<any>;// three 路線資料 3維資料
    public treeJsRouterLineGeometry: Reactive<any>;// three 路線3d幾何資料
    public treeJsCurrentPoint?: Latlng;//行走中的動態點

    public platenumb?: string;//車牌
    public targetBus?: Latlng;//當前動態點
    public targetStartLinePoint?: Array<Latlng> = [];//起始點位

    public routeId?: string;
    public routeName?: string;
    public direction?: number;
    public operatorName?: string;
    public remainingBattery?: number;
    public requireBattery?: number;
    public driverName?: string;
    public isRecommendCharge?: string;

    constructor(init?) {
        Object.assign(this, init);
    }
    setPlatenumb(platenumb: string) {
        this.platenumb = platenumb;
        return this;
    }
    getPlatenumb() {
        return this.platenumb;
    }

    setStartLinePoint(points: Array<Latlng>) {
        this.targetStartLinePoint = points;
        return this;
    }
    getStartLinePoint() {
        return this.targetStartLinePoint;
    }

    setTargetBus(point: Latlng) {
        this.targetBus = point;
        return this;
    }
    getTargetBus() {
        return this.targetBus;
    }
    setCurrentStartLine() {
        if (this.targetStartLinePoint.length == 0)
            return;

        this.targetStartLinePoint.forEach((x, index) => {
            x.seq = index;
        })

        let shortDustance = this.targetStartLinePoint.orderBy(x => x.targetDistance).firstOrDefault();

        this.targetStartLinePoint = this.targetStartLinePoint.orderBy(x => x.seq)
            .filter(x => x.seq >= shortDustance.seq);

        return this;
    }
    setRouteId(routeId: string) {
        this.routeId = routeId;
        return this;
    }
    setRouteName(routename: string) {
        this.routeName = routename;
        return this;
    }
    setDirection(direction: number) {
        this.direction = direction;
        return this;
    }
    setOperatorName(routename: string) {
        this.operatorName = routename;
        return this;
    }
    setRemainingBattery(remainingBattery: number) {
        this.remainingBattery = remainingBattery;
        return this;
    }
    setRequireBattery(requireBattery: number) {
        this.requireBattery = requireBattery;
        return this;
    }
    setDriverName(driverName: string) {
        this.driverName = driverName;
        return this;
    }
    setIsRecommendCharge(isRecommendCharge: boolean) {
        this.isRecommendCharge = isRecommendCharge ? '是' : '否';
        return this;
    }
}

export class MapBusLineSegment {
    public route_id: number;
    public direction: number;
    public seq_from: number;
    public seq_to: number;
    public from_stop_name: string;
    public to_stop_name: string;
    public from_lat: number;
    public from_lon: number;
    public to_lat: number;
    public to_lon: number;
    public level_color: string;
    public congestion_status: string;
    public segment_wkt: string;

    public treeJsTarget3DModel: Reactive<any>;// 載入模型
    public treeJsRouterLineCurve: Reactive<any>;// three 路線資料 3維資料
    public treeJsRouterLineGeometry: Reactive<any>;// three 路線3d幾何資料
    public treeJsCurrentPoint?: Latlng;//行走中的動態點

    constructor(init?) {
        Object.assign(this, init);
    }

    get hexColorToNumber() {
        return parseInt(this.level_color.replace('#', ''), 16)
    }

    get segmentPath() {
        return this.convertLineStringToLatLng(this.segment_wkt);
    }

    // lineString 轉經緯度
    public convertLineStringToLatLng(linestring: string): any[] {
        // 空字串檢查
        if (!linestring) {
            console.error('輸入字串為空');
            return new Array<Latlng>();
        }

        // LINESTRING 格式檢查
        if (!linestring.startsWith('LINESTRING')) {
            console.error('輸入格式錯誤：需要 LINESTRING 格式');
            return new Array<Latlng>();
        }

        try {
            // 提取座標
            const coordinates = linestring
                .replace(/LINESTRING\s*\(/, '')  // 移除 'LINESTRING(' 和可能的空格
                .replace(/\)$/, '')              // 移除結尾的 ')'
                .trim()                          // 移除前後空白
                .split(/,\s*/)                   // 用逗號分割，同時處理可能的空格
                .map(coord => {
                    const [lng, lat] = coord.trim().split(' ').map(Number);

                    // 座標有效性檢查
                    if (isNaN(lat) || isNaN(lng)) {
                        throw new Error(`無效的座標: ${coord}`);
                    }

                    return new Latlng({ lat, lng });
                });

            return coordinates;
        } catch (error) {
            console.error('座標轉換錯誤:', error);
            return new Array<Latlng>();
        }
    }
}