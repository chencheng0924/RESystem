import { BaseService } from '@/service/BaseService';
import { DataApi, DataApiFactory } from '@/api/DataApiService';
import { CStgTdxOperator, CStgTdxRoute, CStgTdxRouteGroup, LangData, CStgBusEstimatedArrivals, ListItem, CStgTdxAlert, RouteDir, CStgTdxSchedule, CStgTdxStop, RouteWeek, CStgTdxRealtime } from './BusService.model';
import { VStgIbusRoutegrp, VStgTdxOperator, VStgTdxRoute, VStgTdxEstimatedtimeofarrivalPt1m, VStgTdxShape, VStgTdxAlert, VStgTdxSchedule, VStgTdxStop } from '@/api/dataApi';
import { useBusStore } from '@/stores/bus/BusStore'
import { Geo } from '../geo/GeoService';

import { Position } from '@/service/geo/Geo.model';
import { FilterBuilder } from '@/api/FilterBuilder';

const busStore = useBusStore()
export class BusService extends BaseService {


    constructor(langCode?: string) {
        super();
    }

    public getRouteTypes() {
        return [
            new LangData("全部", "All").setId("all").setLangCode(this.langCode),
            new LangData("一般公車", "General Line").setId("generalLine").setLangCode(this.langCode),
            new LangData("幹線公車", "Main Line").setId("mainLine").setLangCode(this.langCode),
            new LangData("快線公車", "Express Line").setId("fast").setLangCode(this.langCode),
            new LangData("紅線接駁", "Red Line").setId("red").setLangCode(this.langCode),
            new LangData("橘線接駁", "Orange Line").setId("orange").setLangCode(this.langCode),
            new LangData("黃線接駁", "Yellow Line").setId("yellow").setLangCode(this.langCode),
            new LangData("綠線接駁", "Green Line").setId("green").setLangCode(this.langCode),
            new LangData("公車式小黃", "Taxi").setId("taxi").setLangCode(this.langCode),
            new LangData("其他", "Other").setId("other").setLangCode(this.langCode)];
    }
    //-------公車群組------------------------------------------------------------
    // 棄用
    // public async getBusGroupsAll() {
    //     let datas = await DataApi.busGroups.getListAll();
    //     return datas;
    // }
    public async getBusGroup(masterNo: string) {
        if (masterNo == null || masterNo == "")
            return [];

        if (!busStore.BusRouteAll.length) {
            console.log("busStore.routeAll.length in ")
            const lang = this.langCode;
            let datas: Array<VStgTdxRoute> = await DataApi.busRouters.getList(
                DataApiFactory.queryBusRouters()
                    .filter((p) => p.masterrouteno.$equals(masterNo)
                    ));

            var newGroups: Array<CStgTdxRoute> = datas
                .groupBy(x => x.routeid)
                .select(x => x.members.firstOrDefault())
                .map((x) => {
                    return new CStgTdxRoute(lang, x)
                });

            return newGroups;
        }
        else {
            // console.log("busStore.routeAll.length out ")
            let rs: Array<CStgTdxRoute> = busStore.BusRouteAll;
            let newGroups: Array<CStgTdxRoute> = rs.filter(x => x.entiy.masterrouteno == masterNo)
                .groupBy(x => x.entiy.routeid)
                .select(x => x.members.firstOrDefault())
            return newGroups;
        }
    }
    //-------公車路線------------------------------------------------------------
    public async getBusRoutesAll() {
        if (!busStore.BusRouteAll.length) {
            const lang = this.langCode;
            //let datas: Array<VStgTdxRoute> = await DataApi.busRouters.getListAll();
            let filter = "?top=1000";
            let datas: Array<VStgTdxRoute> = await DataApi.busRouters.getListByParameter(filter);
            var ds = datas.map((x) => {
                let tempRoute = new CStgTdxRoute(lang, x);
                tempRoute.setRouteGroupInfo();
                tempRoute = tempRoute.setSort();
                return tempRoute;
            }).orderBy(x => x.seq)
                .groupBy(x => x.seq)
                .flatMap((x) => {
                    x.members = x.members.orderByText(yy => yy.entiy.routename_zh_tw);
                    x.members.forEach((item, i) => {
                        item.setSeq(item.seq + i / 10);
                    })
                    return x.members;
                })


            //console.log(ds.map((x) => { return { name: x.entiy.routename_zh_tw, seq: x.seq } }));
            busStore.BusRouteAll = ds
            return ds;
        } else {
            return busStore.BusRouteAll
        }
    }
    public async getBusRoutesByEqName(name: string) {
        const lang = this.langCode;
        let query = null;
        if (lang == "zh-TW") {
            query = DataApiFactory.queryBusRouters()
                .filter((p) => p.routename_zh_tw.$equals(name));
        }
        else {
            query = DataApiFactory.queryBusRouters()
                .filter((p) => p.routename_en.$equals(name));
        }

        let datas: Array<VStgTdxRoute> = await DataApi.busRouters.getList(query)

        var routeInfo: Array<CStgTdxRoute> = datas.map((x) => {
            return new CStgTdxRoute(lang, x)
        });

        return routeInfo;
    }
    public async getBusRoutesByName(name: string) {
        const lang = this.langCode;
        let query = null;
        if (lang == "zh-TW") {
            query = DataApiFactory.queryBusRouters()
                .filter((p) => p.routename_zh_tw.$contains(name));
        }
        else {
            query = DataApiFactory.queryBusRouters()
                .filter((p) => p.routename_en.$contains(name));
        }

        let datas: Array<VStgTdxRoute> = await DataApi.busRouters.getList(query)

        var routeInfo: Array<CStgTdxRoute> = datas.map((x) => {
            return new CStgTdxRoute(lang, x)
        });

        return routeInfo;
    }
    public async getBusRoutesById(routeid: string) {
        const lang = this.langCode;
        let datas: Array<VStgTdxRoute> = await DataApi.busRouters.getList(
            DataApiFactory.queryBusRouters().filter((p) => p.routeid.$equals(routeid))
        )

        var routeInfo: Array<CStgTdxRoute> = datas.map((x) => {
            return new CStgTdxRoute(lang, x)
        });

        return routeInfo;
    }
    public async getBusRoutesByIds(routeids: Array<string>) {
        const lang = this.langCode;
        let filter = `?filter=routeid in ('${routeids.join("','")}')`
        const datas = await DataApi.busRouters
            .getListByParameter(filter);
        var routeInfo: Array<CStgTdxRoute> = datas.map((x) => {
            return new CStgTdxRoute(lang, x)
        });
        return routeInfo;
    }
    // 以公車分類找
    public async getRouteByRouteType(routeType: string) {
        routeType = routeType == "All" ? 'all' : routeType;
        let allDs = await this.getBusRoutesAll();
        //console.log(allDs);
        return !routeType || routeType == '全部' || routeType == 'all' ? allDs : allDs.filter(x => x.isIncludeRouteType(routeType));
    }
    //-------營運資料今日 資料 20 比------------------------------------------------------------
    public async getBusOperatorAll() {
        const lang = this.langCode;
        let datas: Array<VStgTdxOperator> = await DataApi.busOperators.getListAll();

        var opers: Array<CStgTdxOperator> = datas.map((x) => {
            return new CStgTdxOperator(lang, x)
        });


        return opers;
    }
    public async getBusOperator(operatorid: string) {
        const lang = this.langCode;
        let datas: Array<VStgTdxOperator> = await DataApi.busOperators.getList(
            DataApiFactory.queryBusOperators()
                .filter((p) => p.operatorid.$equals(operatorid))
        );

        var opers: Array<CStgTdxOperator> = datas.map((x) => {
            return new CStgTdxOperator(lang, x)
        });

        return opers;
    }
    public async getBusOperatorByIds(operatorids: Array<string>) {
        const lang = this.langCode;
        let filter = `?filter=operatorid in ('${operatorids.join("','")}')`;
        const datas = await DataApi.busOperators
            .getListByParameter(filter);
        var routeInfo: Array<CStgTdxOperator> = datas.map((x) => {
            return new CStgTdxOperator(lang, x)
        });
        return routeInfo;
    }
    //首頁營運資訊取前六筆
    public async getBusAlertByToDay(top?: number) {
        const result = await DataApi.busAlerts
            .getList(
                DataApiFactory.queryBusAlerts().top(top)
                //     .filter((p) => p.updatetime.$contains("2024-07-01"))
            );

        return result;
    }
    // 營運資料總筆數
    public async getBusAlertTotalCount() {
        const result = await DataApi.busAlerts.getCount();
        return result;
    }
    // 營運資料分頁
    public async getBusAlertByTake(top: number, skip: number) {
        const result = await DataApi.busAlerts
            .getList(
                DataApiFactory.queryBusAlerts().top(top).skip(skip)
            );

        return result;
    }
    // 營運資料詳細頁
    public async getBusAlertById(id: string) {
        const result = await DataApi.busAlerts
            .getList(
                DataApiFactory.queryBusAlerts().filter((x) => x.alertid.$equals(id))
            );

        return result;
    }
    public async getBusAlertAll() {
        const result = await DataApi.busAlerts
            .getList(DataApiFactory.queryBusAlerts().top(1000));

        return result;
    }
    // // 營運資料篩選功能 //, dateSort: string
    public async getBusAlertByFilter(keyWord?: string, timeSort?: string, top?: number, skip?: number) {
        let alertidSort = 'desc'
        let result = null;
        let filterBuild = new FilterBuilder();
        let filterPara = filterBuild.addContains("title", keyWord)
            .addOR()
            .addContains("routename_zh_tw", keyWord)
            .addOR()
            .addContains("routename_en", keyWord)
            .addOR()
            .addContains("description", keyWord)
            .build();

        let allParameters = `?orderby=updatetime ${timeSort}&orderby=alertid ${alertidSort}&skip=${skip}&top=${top}&count=true`;
        if (filterPara != "")
            allParameters = allParameters + "&" + filterPara;

        result = await DataApi.busAlerts.getListAndCountByParameter(allParameters)
        return result;
    }
    public async getBusAlertByRoute(routeId: string, direction: number) {
        const lang = this.langCode;
        const result: Array<VStgTdxAlert> = await DataApi.busAlerts
            .getList(
                DataApiFactory.queryBusAlerts()
                    .filter((x) => x.routeid.$equals(routeId)
                        .and(x.direction.$equals(direction))
                    )
            );
        const ds = result.map(x => {
            return new CStgTdxAlert(lang, x);
        })
        return ds;
    }
    //首頁公告消息取前六筆
    public async getBusNewsByToDay(top?: number) {
        const result = await DataApi.busNews
            .getList(
                DataApiFactory.queryBusNews().top(top)
                //     .filter((p) => p.updatetime.$contains("2024-07-01"))
            );

        return result;
    }
    // 公告消息總筆數
    public async getBusNewsTotalCount() {
        const result = await DataApi.busNews.getCount();
        return result;
    }
    // 公告消息分頁
    public async getBusNewsByTake(top: number, skip: number) {
        const result = await DataApi.busNews
            .getList(
                DataApiFactory.queryBusNews().top(top).skip(skip)
            );

        return result;
    }
    // 公告消息詳細頁
    public async getBusNewstById(id: string) {
        const result = await DataApi.busNews
            .getList(
                DataApiFactory.queryBusNews().filter((x) => x.newsid.$contains(id))
            );

        return result;
    }
    // 公告消息篩選功能
    public async getBusNewsByFilter(keyWord: any, timeSort: string, top?: number, skip?: number) {
        const rootApi = DataApi.busNews;
        let alertidSort = 'desc'
        let result = null;
        let filter = `?filter=contains(title ,'${keyWord}') or contains(description ,'${keyWord}')&orderby=updatetime ${timeSort}&orderby=newsid ${alertidSort}&top=${top}&skip=${skip}`
        //let filter = `?filter=contains(title ,'${keyWord}') or contains(description ,'${keyWord}')`

        result = await DataApi.busNews.getListByParameter(filter)
        result.totalCount = await DataApi.busNews.getCountByParameter(`${filter}&count=true`)

        return result;
    }
    public async getBusNewstAll() {
        const result = await DataApi.busNews
            .getList(
                DataApiFactory.queryBusNews().top(1000)
            );

        return result;
    }

    //----站牌---------------------------------------------------------------
    public async getBusStops(routeId: string, direction: number) {
        const lang = this.langCode;
        const result: Array<VStgTdxStop> = await DataApi.busStops
            .getList(DataApiFactory.queryBusStops()
                .filter((p) => p.routeid.$equals(routeId)
                    .and(p.direction.$equals(direction))
                ).top(100)
            );

        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    // 只用routeid
    public async getBusStopsByStationid(stationId: string) {
        const lang = this.langCode;
        const result: Array<VStgTdxStop> = await DataApi.busStops
            .getList(DataApiFactory.queryBusStops()
                .filter((p) => p.stationid.$equals(stationId)
                ).top(100)
            );

        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    // 一次查多個stationid
    public async getBusStopsByStationidGroup(stationId: Array<string>) {
        const lang = this.langCode;
        const result: Array<VStgTdxStop> = await DataApi.busStops
            .getList(DataApiFactory.queryBusStops()
                .filter((p) => p.stationid.$in(stationId)
                ).top(100)
            );

        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    public async getBusStopsByStation(stationId: string, direction: number) {
        const lang = this.langCode;
        const result: Array<VStgTdxStop> = await DataApi.busStops
            .getList(DataApiFactory.queryBusStops()
                .filter((p) => p.stationid.$equals(stationId)
                    .and(p.direction.$equals(direction))
                ).top(100)
            );

        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    // 站牌 by name
    public async getBusStopByName(name: string) {
        let query = null;
        if (this.langCode == "zh-TW") {
            query = DataApiFactory.queryBusStops()
                .filter((p) => p.stopname_zh_tw.$contains(name)).top(500);
        }
        else {
            query = DataApiFactory.queryBusStops()
                .filter((p) => p.stopname_en.$contains(name)).top(500);
        }
        const result = await DataApi.busStops
            .getList(query);


        return result;
    }
    // 用路線id找該路線所有站牌
    public async getStopByBusRoute(routeid: string, direction: number): Promise<CStgTdxStop[]> {
        const lang = this.langCode;
        const result = await DataApi.busStops
            // .getList(
            //     DataApiFactory.queryBusStops().filter((p) => p.routeid.$equals(routeid).and(p.stopname_zh_tw.$equals(stopName)))
            // ) : await DataApi.busStops
            .getList(
                DataApiFactory.queryBusStops().filter((p) => p.routeid.$equals(routeid).and(p.direction.$equals(direction))).top(100)
            );
        // .getListByParameter(filter);
        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    public async getStopByBusRouteAllDir(routeid: string): Promise<CStgTdxStop[]> {
        const lang = this.langCode;
        const result = await DataApi.busStops
            .getList(
                DataApiFactory.queryBusStops().filter((p) => p.routeid.$equals(routeid)).top(1000)
            );
        // .getListByParameter(filter);
        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    // 站牌 by 行政區 待完善
    public async getBusStopByDistrict(id: string): Promise<CStgTdxStop[]> {
        const lang = this.langCode;
        const result = await DataApi.busStops
            .getList(
                DataApiFactory.queryBusStops().filter((p) => p.loctowncode.$equals(id)).top(2000)
            );

        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    public async getBusStopByDistrictBytop(id: string, top: number, skip: number): Promise<CStgTdxStop[]> {
        const lang = this.langCode;
        const result = await DataApi.busStops
            .getList(
                DataApiFactory.queryBusStops().filter((p) => p.loctowncode.$equals(id)).top(top).skip(skip)
            );

        let datas = result.map(x => new CStgTdxStop(lang, x));
        return datas;
    }
    public async getBusStopByDistrictCount(id: string): Promise<number> {
        const lang = this.langCode;
        let filter = `?count=true&filter=loctowncode eq '${id}'`;
        const result = await DataApi.busStops
            .getCountByParameter(filter);

        return result;
    }
    public async getBusStopByDistrictAll(id: string) {

        return this.getBusStopByDistrict(id);
    }

    // 票價查詢
    public async getBusStopFare(routeid: string, direction: number, startStopid: string, endStopid: string) {
        let filter = `?filter=routeid eq '${routeid}' and direction eq ${direction} and originstopid eq '${startStopid}' and destinationstopid eq '${endStopid}'`
        const result = await DataApi.busFare
            .getListByParameter(filter);

        return result;
    }
    // 站牌 by 附近 distance 單公尺
    public async getBusStopNearBy(distance: number = 100, position?: Position, checkTrue: boolean = false) {
        let pos
        if (position != null)
            pos = position;
        if (position == null) {
            pos = await Geo.getCurrentPos(checkTrue);
            // pos = new Position(22.624605, 120.300357);
        }
        //pos = new Position(22.624605, 120.300357);
        let filter = `?top=${distance == 1000 ? 300 : 100}&filter=geo.distance(positionlon,positionlat,${pos.longitude},${pos.latitude}) le ${distance}`;
        //console.log(filter);
        const result = await DataApi.busStops
            .getListByParameter(filter);
        // console.log('result', result)
        return result;
    }

    public async getBusEstimatedArrivals(stopid: string) {
        const lang = this.langCode;
        let datas: Array<VStgTdxEstimatedtimeofarrivalPt1m> = await DataApi.busEstimatedArrivals.getList(
            DataApiFactory.queryBusEstimatedArrivals().filter((p) => p.stopid.$equals(stopid))
        )

        let ds = datas.map((x) => {
            let temp = new CStgBusEstimatedArrivals(lang, x);
            return temp
        });
        return ds
    }

    public async getBusLineStartAndEnd(routeid: string) {
        let datas: Array<VStgIbusRoutegrp> = await DataApi.busGroups.getList(
            DataApiFactory.queryBusGroups().filter((p) => p.routeid.$equals(routeid))
        )
        return datas
    }

    // && p.direction.$equals(direction)
    public async getBusShapes(routeid: string, direction: number) {
        let datas: Array<VStgTdxShape> = await DataApi.busShapes.getList(
            DataApiFactory.queryBusShapes().filter((p) => p.routeid.$equals(routeid).and(p.direction.$equals(direction)))
        )
        return datas
    }

    //-------公車時刻表------------------------------------------------------------
    public async getBusSchedules(routeid?: string, direction?: number, stopid?: string) {
        const lang = this.langCode;
        let filter = `?top=500&filter=`;
        let paras = [];
        if (routeid != null && routeid != undefined)
            paras.push(`routeid eq '${routeid}'`);
        if (direction != null && direction != undefined)
            paras.push(`direction eq ${direction}`);
        if (stopid != null && stopid != undefined && stopid != "undefined")
            paras.push(`stopid eq '${stopid}'`);


        filter += paras.join(" and ");


        let datas: Array<VStgTdxSchedule> = await DataApi.busSchedules.getListByParameter(filter)
        let ds = datas.map(x => new CStgTdxSchedule(lang, x));
        //console.log("getBusSchedules", ds);
        return ds
    }


    public async getDynamicBus(id: string, dir: number): Promise<any> {
        const lang = this.langCode;
        let filter = `?count=true&filter=loctowncode eq '${id}'`;
        const result = await DataApi.busRealTime.getList(
            DataApiFactory.queryBusRealTime().filter((p) => p.routeid.$equals(id).and(p.direction.$equals(dir)))
        )

        return result.map(x => new CStgTdxRealtime(x));
    }
}

