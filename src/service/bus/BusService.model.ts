import { VStgIbusRoutegrp, VStgTdxOperator, VStgTdxRoute, VStgTdxEstimatedtimeofarrivalPt1m, VStgTdxAlert, VStgTdxSchedule, VStgTdxStop, VStgTdxRealtimebyfrequencyPt1m } from "@/api/dataApi";
import { BusService } from "./BusService";
import { RouteSort } from "./RouteSortService";
import { DateExtension } from '@/utils/dateExtension'
import { Latlng } from "../geo/Geo.model";

export class ListItem {
    key: string;
    value: string;
    id?: string;
    constructor(k: string, v: string) {
        this.key = k;
        this.value = v;
    }
    setId(id?: string) {
        this.id = id;
        return this;
    }
}

export class RouteDir {
    routeId?: string;
    direction?: number;
    stopId?: string;
    constructor(k: string, v: number, stopId?: string) {
        this.routeId = k;
        this.direction = v;
        this.stopId = stopId;
    }
}


export class LangData {
    constructor(tw?: string, en?: string) {
        this.name_zh_tw = tw;
        this.name_en = en;
    }
    private langCode: string = 'zh_tw';
    private name_zh_tw: string = '';
    private name_en: string = '';
    public id: string = '';
    public townCode?: string = '';
    public setLangCode(langCode: string) {

        if (langCode != null && langCode.indexOf("-") != -1) {
            if (langCode == "zh-TW")
                this.langCode = "zh_tw";
            else if (langCode == "en-US")
                this.langCode = "en";
        }
        else
            this.langCode = langCode;

        return this;
    }
    public get Value() {
        let lang = this.langCode;
        let suffixStr = `_${lang}`;
        return this[`name${suffixStr}`];
    }
    public setId(id: string) {
        this.id = id;
        return this;
    }
    public setTownCode?(townCode: string) {
        this.townCode = townCode;
        return this;
    }
}
export class CStgTdxRoute {
    private busSvc: BusService;
    private langCode: string;
    private routeType?: string | null;
    private master?: string | null;
    private routeGroups?: Array<CStgTdxRouteGroup>;
    public sort?: number;
    constructor(langCode: string, entiy?: VStgTdxRoute) {
        this.entiy = entiy;
        this.langCode = langCode;
        this.routeType = new LangData("一般公車", "General Line").Value;
        this.busSvc = new BusService(this.langCode);
    }


    public entiy: VStgTdxRoute;
    public get lastRouteName() {
        if (this.entiy.masterrouteno != null && this.entiy.masterrouteno != "")
            return this.masterroutename;
        else
            return this.routeName;
    }
    public get homePageLastRouteName() {
        if (this.entiy.masterrouteno != null && this.entiy.masterrouteno != "")
            return this.subRouteName;
        else
            return this.routeName;
    }
    public get routeName(): LangData {
        return new LangData(this.entiy.routename_zh_tw, this.entiy.routename_en).setLangCode(this.langCode);
    }
    public routename(locale: any): LangData {
        return new LangData(this.entiy.routename_zh_tw, this.entiy.routename_en).setLangCode(locale);
    }
    public get masterroutename(): LangData {
        return new LangData(this.entiy.masterroutename_zh_tw, this.entiy.masterroutename_en).setLangCode(this.langCode);
    }
    public get subRouteName(): LangData {
        return new LangData(this.entiy.subroutename_zh_tw, this.entiy.subroutename_en).setLangCode(this.langCode);
    }
    public get headSign(): LangData {
        return new LangData(this.entiy.headsign_zh_tw, this.entiy.headsign_en).setLangCode(this.langCode);
    }
    public get departureStopName(): LangData {
        return new LangData(this.entiy.departurestopname_zh_tw, this.entiy.departurestopname_en).setLangCode(this.langCode);
    }
    public get destinationStopName(): LangData {
        return new LangData(this.entiy.destinationstopname_zh_tw, this.entiy.destinationstopname_en).setLangCode(this.langCode);
    }
    public get routeTypelang(): LangData {

        if (this.entiy.routetype_zh_tw?.indexOf("公車式小黃") != -1)// 只要有小黃 都只算小黃分類
            return new LangData("公車式小黃", "Taxi").setLangCode(this.langCode);

        return new LangData(this.entiy.routetype_zh_tw, this.entiy.routetype_en).setLangCode(this.langCode);
    }
    public get masterRouteDesc(): LangData {
        return new LangData(this.entiy.masterroutedesc_zh_tw, this.entiy.masterroutedesc_en).setLangCode(this.langCode);
    }
    public get headDesc(): LangData {
        return new LangData(this.entiy.headsign_zh_tw, this.entiy.headsign_en).setLangCode(this.langCode);
    }
    //-----------------------------------
    public setRouteGroupInfo() {
        this.routeType = this.routeTypelang.Value;
        this.master = this.entiy.masterrouteno;
        return this;
    }
    // 路線是否包含 某分類
    public isIncludeRouteType(type: string) {
        if (type == "" || this.routeType == null || this.routeType == "")
            return false;

        if (this.routeType.indexOf(type) != -1)
            return true;

        return false;
    }

    public get getRouteType() { return this.routeType; }
    // 跟據方向抓取 往返方向名稱
    public get getDirectionDesc() {
        if (this.entiy.direction == 0)
            return this.destinationStopName;
        else
            return this.departureStopName;
    }
    public getDirectionDescName(direction: number) {
        if (direction == 0)
            return this.destinationStopName.Value;
        else
            return this.departureStopName.Value;
    }
    public getDestinationStopName() {
        return this.destinationStopName.Value;
    }
    // 取得 路線簡圖
    public get getBusImage() {
        if (this.entiy.routemapimageurl == null)
            return "";

        let url = this.entiy.routemapimageurl.replace("http", "https");
        return url;
    }
    // 是否有公車式小黃
    public get isBusTaxi() {
        const name = "公車式小黃";
        if (this.entiy?.routetype_zh_tw?.indexOf(name) != -1)
            return true;

        return false;
    }

    // 是否有公車群組
    public get isBusGroup() {
        if (this.entiy.masterrouteno == null || this.entiy.masterrouteno == "null")
            return false;

        return true;
    }

    // get busGroup
    public getBusGroups() {
        return this.busSvc.getBusGroup(this.entiy.masterrouteno);
    }


    // get operation 營運業者
    public getBusOperator(): Promise<CStgTdxOperator> {
        return this.busSvc.getBusOperator(this.entiy.operatorid).then((res) => {
            if (res.length == 0)
                return null;

            return res[0];
        }).catch((err) => {
            return null;
        });
    }

    // get 首末班次資料 以 該方向的起站來看 時刻
    public async getStartEndTimeTable(direction: number = 0) {
        const array = []
        let ds = await this.getBusSchedules(direction)
        if (ds.length == 0)
            return array;

        let wk = DateExtension.getWeekday(new Date());
        ds = ds.filter(x => x.isVisible(wk))
            .orderBy(x => x.seq)

        if (ds.length == 0)
            return array;

        if (ds.length > 1) {
            array.push(ds[0])
            array.push(ds[ds.length - 1])
        } else if (ds.length = 1) {
            array.push(ds[0])
            array.push(ds[0])
        }
        return array
    }

    // get 時刻表 以 該方向的起站來看 時刻
    public async getBusSchedules(direction: number = 0): Promise<Array<CStgTdxSchedule>> {
        let firstStop: CStgTdxStop = await this.getStartEndStop(direction);
        if (firstStop == null)
            return [];
        return this.busSvc.getBusSchedules(this.entiy.routeid, direction, firstStop.entiy.stopid)
            .then((res) => {
                if (res.length == 0)
                    return new Array<CStgTdxSchedule>();

                return res;
            }).catch((err) => {
                return new Array<CStgTdxSchedule>();
            });
    }



    // get 路線提醒文字
    public getBusAleart(direction: number = 0): Promise<Array<CStgTdxAlert>> {
        return this.busSvc.getBusAlertByRoute(this.entiy.routeid, direction)
            .then((res) => {
                if (res.length == 0)
                    return new Array<CStgTdxAlert>();

                return res;
            }).catch((err) => {
                return new Array<CStgTdxAlert>();
            });
    }

    private _busStopDatas?: Array<CStgTdxStop> = [];
    public busStopDatas(direction: number = 0) {
        if (this._busStopDatas == null || this._busStopDatas.length == 0)
            return this.getBusStops(direction);

        return this._busStopDatas;
    }
    public getBusStops(direction: number = 0): Promise<Array<CStgTdxStop>> {
        let self = this;
        return this.busSvc.getBusStops(this.entiy.routeid, direction)
            .then((res) => {
                if (res.length == 0)
                    return new Array<CStgTdxStop>();

                self._busStopDatas = res;
                return res;
            }).catch((err) => {
                return new Array<CStgTdxStop>();
            });
    }

    public async getStartEndStop(direction: number = 0) {
        let stops = await this.getBusStops(direction);
        if (stops == null)
            return null;
        stops = stops.orderBy(x => x.getSeq());
        //console.log("stops", stops.map(x => `${x.entiy.stopsequence}-${x.entiy.stopname_zh_tw}-${x.entiy.stopid}`));

        return stops.firstOrDefault() as CStgTdxStop;

    }


    public getShapeLine(direction: number = 0) {
        return this.busSvc.getBusShapes(this.entiy.routeid, direction)
            .then((res) => {
                if (res.length == 0)
                    return "";

                return res[0].geometry;
            }).catch((err) => {
                return "";
            });
    }

    public async getShapeLinePoints(direction: number = 0) {
        let line = await this.getShapeLine(direction);
        if (line == "")
            return new Array<Latlng>();

        let latLngArray: Array<Latlng> = new Array<Latlng>();
        const coordinatesString = line.match(/\(([^)]+)\)/)?.[1]
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


    private _sortService?: RouteSort = new RouteSort();
    public setSort() {
        let isTaxi = this.isBusTaxi;
        let seq = this._sortService.getSort(this.entiy.routename_zh_tw, isTaxi);
        this.sort = seq;

        return this;
    }
    public get seq() {
        return this.sort;
    }
    public setSeq(sort) {
        this.sort = sort;
        return this;
    }
}
export class CStgTdxRouteGroup {
    private langCode: string;
    constructor(langCode: string, entiy?: VStgIbusRoutegrp) {
        this.entiy = entiy;
        this.langCode = langCode;
    }
    public entiy: VStgIbusRoutegrp;
    public get ddesc(): LangData {
        return new LangData(this.entiy.ddesczh, this.entiy.ddescen).setLangCode(this.langCode);
    }
    public get departure(): LangData {
        return new LangData(this.entiy.departurezh, this.entiy.departureen).setLangCode(this.langCode);
    }
    public get destination(): LangData {
        return new LangData(this.entiy.destinationzh, this.entiy.destinationen).setLangCode(this.langCode);
    }
    public get routeType(): LangData {
        return new LangData(this.entiy.routetypezh, this.entiy.routetypeen).setLangCode(this.langCode);
    }
    public get routeName(): LangData {
        return new LangData(this.entiy.namezh, this.entiy.nameen).setLangCode(this.langCode);
    }
    public get masterRouteDesc(): LangData {
        return new LangData(this.entiy.masterroutedesczh, this.entiy.masterroutedescen).setLangCode(this.langCode);
    }


}

export class CStgTdxOperator {
    public routeid?: string;
    private langCode: string;
    constructor(langCode: string, entiy?: VStgTdxOperator) {
        this.entiy = entiy;
        this.langCode = langCode;
    }
    public entiy: VStgTdxOperator;

    public get operatorname(): LangData {
        return new LangData(this.entiy.operatorname_zh_tw, this.entiy.operatorname_en).setLangCode(this.langCode);
    }
}

export class CStgBusEstimatedArrivals {
    private langCode: string;
    private routeType?: string | null;
    private master?: string | null;
    private routeGroups?: Array<CStgTdxRouteGroup>;
    constructor(langCode: string, entiy?: VStgTdxEstimatedtimeofarrivalPt1m) {
        this.entiy = entiy;
        this.langCode = langCode;
    }


    public entiy: VStgTdxEstimatedtimeofarrivalPt1m;
    public get lineName(): LangData {
        return new LangData(this.entiy.routename_zh_tw, this.entiy.routename_en).setLangCode(this.langCode);
    }
    public get stopName(): LangData {
        return new LangData(this.entiy.stopname_zh_tw, this.entiy.stopname_en).setLangCode(this.langCode);
    }
    public get subroutename(): LangData {
        return new LangData(this.entiy.subroutename_zh_tw, this.entiy.subroutename_en).setLangCode(this.langCode);
    }
}


export class CStgTdxAlert {
    private langCode?: string;

    constructor(langCode?: string, entiy?: VStgTdxAlert) {
        this.entiy = entiy;
        this.langCode = langCode;
    }

    public entiy?: VStgTdxAlert;

}



export class CStgTdxSchedule {
    private langCode: string;
    constructor(langCode: string, entiy?: VStgTdxSchedule) {
        this.entiy = entiy;
        this.langCode = langCode;
    }


    public entiy: VStgTdxSchedule;
    public get seq() {
        let id = this.entiy.tripid;
        if (id == null || id == "")
            return 0;

        let ds = this.entiy.tripid.split("-");

        return parseInt(ds[ds.length - 1]);
    }
    public isVisible(wk: number)// 1~7 代表星期幾
    {
        let isHoliday = true;
        if (wk < 6)
            isHoliday = false;

        let datas = [
            this.entiy.monday,
            this.entiy.tuesday,
            this.entiy.wednesday,
            this.entiy.thursday,
            this.entiy.friday,
            this.entiy.saturday,
            this.entiy.sunday];
        let current = datas[wk - 1];
        if (isHoliday && this.entiy.tripid.startsWith("2-")) {
            return current == 1 ? true : false;
        }
        else if (isHoliday == false && this.entiy.tripid.startsWith("1-")) {
            return current == 1 ? true : false;
        }
        else
            return false;
    }

    public getTimeString(date: string) {
        // 根據日期找 星期幾 來決定秀不秀


        return this.entiy.arrivaltime;
    }

    public getWK() {
        return `${this.entiy.tripid}  ${this.entiy.monday}-${this.entiy.tuesday}-${this.entiy.wednesday}-${this.entiy.thursday}-${this.entiy.friday}-${this.entiy.saturday}-${this.entiy.sunday}`
    }

    public getArrivaltime(): string {

        let time = this.entiy.arrivaltime;
        if (time == null || time == "")
            return "";

        return time;
        // let ss = time.split(":");
        // if (ss.length < 1)
        //     return "";
        // let hr = parseInt(ss[0]);
        // let min = ss[1];

        // let preText = "";
        // if (hr < 12) {
        //     preText = new LangData("上午", "").setLangCode(this.langCode).Value;
        // }
        // else if (hr == 12) {
        //     preText = new LangData("中午", "").setLangCode(this.langCode).Value;
        // }
        // else if (hr > 12) {
        //     if (this.langCode.indexOf("en") == -1)
        //         hr = hr - 12;

        //     preText = new LangData("下午", "").setLangCode(this.langCode).Value;

        // }

        // return `${preText} ${hr}:${min}`;

    }

}


export class CStgTdxStop {
    private langCode: string;
    constructor(langCode: string, entiy?: VStgTdxStop) {
        this.entiy = entiy;
        this.langCode = langCode;
    }
    public stopDesc?: string;

    public entiy: VStgTdxStop;
    public get routename(): LangData {
        return new LangData(this.entiy.routename_zh_tw, this.entiy.routename_en).setLangCode(this.langCode);
    }
    public get stopname(): LangData {
        return new LangData(this.entiy.stopname_zh_tw, this.entiy.stopname_en).setLangCode(this.langCode);
    }

    public getSeq(): number {
        return this.entiy.stopsequence;
    }

    public setStopDesc() {
        this.stopDesc = this.stopname.Value;
        return this;
    }

}


export class RouteWeek {
    routeid?: string;
    wks?: Array<string>;
    constructor(init?: Partial<RouteWeek>) {
        Object.assign(this, init);
    }

}


export class CStgTdxRealtime implements VStgTdxRealtimebyfrequencyPt1m {
    platenumb?: string;

    operatorid?: string;

    operatorno?: string;

    routeuid?: string;

    routeid?: string;

    routename_zh_tw?: string;

    routename_en?: string;

    subrouteuid?: string;

    subrouteid?: string;

    subroutename_zh_tw?: string;

    subroutename_en?: string;

    direction?: number;

    positionlon?: string;

    positionlat?: string;

    geohash?: string;

    speed?: string;

    azimuth?: string;

    dutystatus?: string;

    busstatus?: string;

    gpstime?: string;

    srcupdatetime?: string;

    updatetime?: string;

    cartype?: string;

    etl_dtm?: string;

    operatorname_zh?: string;

    remaining_battery?: number;

    require_battery?: number;

    driver_name?: string;
    
    constructor(init?) {

        Object.assign(this, init);
    }

    get isRecommendCharge() {
        return this.remaining_battery > this.require_battery
    }
}

