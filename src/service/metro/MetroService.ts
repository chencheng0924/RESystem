import { DataApi, DataApiFactory } from "@/api/DataApiService";
import { BaseService } from "../BaseService";
import { Geo } from "../geo/GeoService";
import { Position } from "../geo/Geo.model";
import { CStgTdxRailMetroLiveboardPt1m } from "./MetroService.model";

export class MetroService extends BaseService {
    constructor(langCode?: string) {
        super();

    }

    public async getMetroStationsNearBy(distance: number = 100, position?: Position, top: number = 100, type?: boolean) {

        let pos = await Geo.getCurrentPos(type);
        if (position != null)
            pos = position;
        if (pos == null) {
            pos = new Position(22.624605, 120.300357);
        }

        let filter = `?top=${top}&filter=geo.distance(positionlon,positionlat,${pos.longitude},${pos.latitude}) le ${distance}`;
        //console.log(filter);
        const result = await DataApi.metroStations
            .getListByParameter(filter);
        return result;
    }
    //tripheadsign 逆行 順行
    //estimatetime X 分鐘
    //src_sys  krtc是捷運 klrt是輕軌
    //Servicestatus 車次營運服務狀態(0: 正常, 1: 未發車, 2: 不停靠, 3: 末班駛離, 4: 不停靠)
    public async getMetroLiveboards(stationid?: string) {
        const lang = this.langCode;
        let param = null;// 沒給預設抓 20 
        if (stationid != null)
            param = DataApiFactory.queryMetroLiveboard().filter((p) => p.stationid.$equals(stationid))

        const result = await DataApi.metroLiveboard
            .getList(param);
        let ds = result.map((x) => {
            let temp = new CStgTdxRailMetroLiveboardPt1m(lang, x);
            return temp
        });
        return ds

    }


    public async getMetroStationsByName(name: string, top: number = 100) {
        let query = null;
        if (this.langCode == "zh-TW") {
            query = DataApiFactory.queryMetroStations()
                .filter((p) => p.stationname_zh_tw.$contains(name)).top(top);
        }
        else {
            query = DataApiFactory.queryMetroStations()
                .filter((p) => p.stationname_en.$contains(name)).top(top);
        }
        const result = await DataApi.metroStations
            .getList(query);

        return result;
    }
}