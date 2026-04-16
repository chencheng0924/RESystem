import { DataApi, DataApiFactory } from "@/api/DataApiService";
import { BaseService } from "@/service/BaseService";
import { Position } from "../geo/Geo.model";
import { Geo } from "../geo/GeoService";
import { CStgTdxBikeAvailability } from "./BikeService.model";

export class BikeService extends BaseService {
    constructor(langCode?: string) {
        super();

    }

    public async getBikeNearBy(distance: number = 100, position?: Position, top: number = 100, type?: boolean) {

        let pos = await Geo.getCurrentPos(type);
        if (position != null)
            pos = position;
        if (pos == null) {
            pos = new Position(22.624605, 120.300357);
        }

        let filter = `?top=${top}&filter=geo.distance(positionlon,positionlat,${pos.longitude},${pos.latitude}) le ${distance}`;
        //console.log(filter);
        const result = await DataApi.bikes
            .getListByParameter(filter);
        return result;
    }


    // Servicestatus  服務狀態:[0:'停止營運',1:'正常營運',2:'暫停營運']   
    // Servicetype   服務類型:[1:'YouBike1.0',2:'YouBike2.0',4:'P-Bike']
    // Availablerentbikes 可租借車數  
    // Availablereturnbikes 可歸還車數
    // Generalbikes 一般自行車可租借車數
    // Electricbikes  電動輔助車可租借車數

    public async getBikes(stationid?: string) {
        const lang = this.langCode;
        let param = null;// 沒給預設抓 20 

        if (stationid != null)
            param = DataApiFactory.queryBikeDynamic().filter((p) => p.stationid.$equals(stationid))

        const result = await DataApi.bikeDynamic
            .getList(param);
        let ds = result.map((x) => {
            let temp = new CStgTdxBikeAvailability(lang, x);
            return temp
        });
        return ds

    }

    public async getBikeByName(name: string, top: number = 100) {
        let query = null;
        if (this.langCode == "zh-TW") {
            query = DataApiFactory.queryBikes()
                .filter((p) => p.stationname_zh_tw.$contains(name)).top(top);
        }
        else {
            query = DataApiFactory.queryBikes()
                .filter((p) => p.stationname_en.$contains(name)).top(top);
        }
        const result = await DataApi.bikes
            .getList(query);

        return result;
    }


}