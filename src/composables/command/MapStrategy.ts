
import { CommangBaseStrategy } from "@/lib/commandFactory/Command.model";
import { mapTrigger } from "@/stores/command/mapTrigger";
import { GMapStore } from '@/stores/map/GMapStore';

// 主要地圖的控制
export class MapStrategy extends CommangBaseStrategy {

    constructor() {
        super(new MapController());
    }
    execute() {
        super.execute();

        return "";
    }
}

class MapController {
    private mapStore: any
    private googleMapStore: any
    constructor() {
        this.mapStore = mapTrigger()
        this.googleMapStore = GMapStore()
    }
    zoom(params) {
        const item = JSON.parse(params.msg)
        if (item.lat && item.lng) {
            const position = {
                lat: +item.lat,
                lng: +item.lng
            }
            this.googleMapStore.setMapCenter(position)
        }
        if (item.zoom) {
            this.googleMapStore.setZoomLevel(+item.zoom)
        }
    }
    async showRoute(params) {
        console.log("MapController->showRoute ", params);
        const check = this.mapStore.watchForRouteIdStatus.findIndex(item => item.routeid == params.routeId && params.dirction == item.dirction)
        if (check !== -1) {
            if (params.type === 'detour' || params.openSubRoute == 'true') {
                this.mapStore.watchForRouteId[check].openSubRoute = true
            } else {
                this.mapStore.watchForRouteId[check].openSubRoute = false
            }
            this.mapStore.watchForRouteId[check].openOldRoute = params.openOldRoute == 'true' ? true : false
            this.mapStore.watchForRouteId[check].toggle = !this.mapStore.watchForRouteId[check].toggle
            this.mapStore.watchForRouteId[check].isResetMap = params.isResetMap
            this.mapStore.watchForRouteIdStatus[check].isDraw = false
            this.mapStore.watchForRouteIdStatus[check].isnew = true
        } else {
            if (params.dirction) {
                this.mapStore.watchForRouteId.push({
                    command: "showRoute",
                    routeid: params.routeId,
                    sessionid: params.sessionId,
                    isResetMap: params.isResetMap,
                    dirction: params.dirction,
                    openSubRoute: params.type === 'detour' || params.openSubRoute == 'true'
                })
                this.mapStore.watchForRouteIdStatus.push({
                    isnew: true,
                    isDraw: false,
                    routeid: params.routeId,
                    sessionid: params.sessionId,
                    dirction: params.dirction,
                    ischeckedSub: params.type === 'detour' || params.openSubRoute == 'true'
                })

                return
            }
            for (let index = 0; index < 2; index++) {
                this.mapStore.watchForRouteId.push({
                    command: "showRoute",
                    routeid: params.routeId,
                    sessionid: params.sessionId,
                    isResetMap: params.isResetMap,
                    dirction: index,
                    openSubRoute: params.type === 'detour' || params.openSubRoute == 'true'
                })
                this.mapStore.watchForRouteIdStatus.push({
                    isnew: true,
                    isDraw: false,
                    routeid: params.routeId,
                    sessionid: params.sessionId,
                    dirction: index,
                    ischeckedSub: params.type === 'detour' || params.openSubRoute == 'true'
                })
            }
        }
    }
    async showRoutes(params) {
        console.log("MapController->showRoutes ", params);
        if (!params || !params.routeIds) {
            return
        }

        params.routeIds.split(',').forEach((id) => {
            for (let index = 0; index < 2; index++) {
                if (id.trim()) {
                    this.mapStore.watchForRouteId.push({
                        command: "showRoutes",
                        routeid: id.trim(),
                        dirction: index
                    })
                    this.mapStore.watchForRouteIdStatus.push({
                        isnew: true,
                        isDraw: false,
                        routeid: id,
                        sessionid: params.sessionId,
                        dirction: index
                    })
                }
            }
        })
    }

    focusPointByBus(params) {
        let platenumb = "";
        if (!params || !params.platenumb) {
            return
        }

        platenumb = params.platenumb;
        this.googleMapStore.focusPointByBus(platenumb);

    }
}