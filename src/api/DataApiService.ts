import { ODataExpression, ODataQuery } from 'ts-odata-client';
import { ODataV4Context } from 'ts-odata-client';
import { ExcludeProperties } from 'ts-odata-client/lib/ExcludeProperties';
import { ODataQueryBase } from 'ts-odata-client/lib/ODataQueryBase';
import { ODataV4Options, ODataV4QueryProvider } from 'ts-odata-client/lib/ODataV4QueryProvider';
import {
    VStgTdxRoute, VStgTdxStationResponse, VStgTdxStop, VRealSrvEbusTxnMly, VStgTdxRoutefare, VStgTdxNews, VStgTdxShape, VStgTdxAlert, VStgTdxOperator, VStgTdxSchedule, VStgTdxEstimatedtimeofarrivalPt1m, VStgIbusGateway, VStgTdxMetroFirstlasttimetable,
    VStgTdxRailMetroLiveboardPt1m, VStgIbusRoutegrp, VStgCwaWeather7d, VStgMoenvAqxP07,
    VStgTdxMapDistrictBoundary, VStgTbkcOtherKao1999infoPt1m, VStgTdxMetroPeakdistance,
    VStgTdxMetroShape, VStgTdxMetroStationtimetable, VStgMoenvAqxP432, VStgTdxStation,
    VStgTdxRealtimebyfrequencyPt1m, VStgTdxRouteResponse, VStgTdxStopResponse,
    VRealSrvEbusTxnMlyResponse, VStgTdxRoutefareResponse, VStgTdxAlertResponse,
    VStgTdxEstimatedtimeofarrivalPt1mResponse, VStgTdxNewsResponse, VStgTdxOperatorResponse,
    VStgTdxScheduleResponse, VStgTdxShapeResponse, VStgCwaWeather7dResponse, VStgIbusGatewayResponse,
    VStgIbusRoutegrpResponse, VStgMoenvAqxP07Response, VStgMoenvAqxP432Response,
    VStgTbkcOtherKao1999infoPt1mResponse, VStgTdxMapDistrictBoundaryResponse,
    VStgTdxMetroFirstlasttimetableResponse, VStgTdxMetroPeakdistanceResponse,
    VStgTdxMetroShapeResponse, VStgTdxMetroStationtimetableResponse,
    VStgTdxRailMetroLiveboardPt1mResponse, VStgTdxRealtimebyfrequencyPt1mResponse,
    VStgTdxBikeStationResponse, VStgTdxBikeAvailabilityResponse, VStgTdxMetroStationResponse,
    VStgTdxBikeStation, VStgTdxBikeAvailability, VStgTdxMetroStation
} from './dataApi/dataModel';
import { ODataV4QuerySegments } from 'ts-odata-client/lib/ODataV4ExpressionVisitor';
import { useGuestToken } from '@/stores/tokenStore';


class DataApiContext extends ODataV4Context {

    constructor(baseUrl: string, key: string) {


        const gToken = useGuestToken();
        let citygptkey = "";
        let tData = gToken.guestToken;
        if (tData != null) {
            if (tData.access_token != "")
                citygptkey = tData.access_token;
        }
        let ops: RequestInit = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization',
                'Cache-Control': `no-cache`,
                "Ocp-Apim-Subscription-Key": key,
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${key}`
            }
        };
        let test: ODataV4Options = { requestInit: () => { return ops } };
        super(baseUrl, test);
    }
    // 公車路線
    busRouters(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_route${paraString}`;
        return this.createQuery<VStgTdxRouteResponse>(path);
    }
    // 站位資料
    busStations(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_station${paraString}`;
        return this.createQuery<VStgTdxStationResponse>(path);
    }
    // 站牌資料
    busStops(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_stop${paraString}`;
        return this.createQuery<VStgTdxStopResponse>(path);
    }
    //公車之票卡機交易資料
    busCarDdatas(paraString: string) {
        let path = `/abfs/dal/v_real_srv_ebus_txn_mly${paraString}`;
        return this.createQuery<VRealSrvEbusTxnMlyResponse>(path);
    }
    //市區公車之票價資料
    busFare(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_routefare${paraString}`;
        return this.createQuery<VStgTdxRoutefareResponse>(path);
    }
    //市區公車之最新消息資料
    busNews(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_news${paraString}`;
        return this.createQuery<VStgTdxNewsResponse>(path);
    }
    //市區公車之線型資料
    busShapes(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_shape${paraString}`;
        return this.createQuery<VStgTdxShapeResponse>(path);
    }
    //市區公車之營運通阻資料 > 公車時刻 警訊信息
    busAlerts(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_alert${paraString}`;
        return this.createQuery<VStgTdxAlertResponse>(path);
    }
    //市區公車之營運業者資料
    busOperators(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_operator${paraString}`;
        return this.createQuery<VStgTdxOperatorResponse>(path);
    }
    //市區公車之時刻表資料
    busSchedules(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_schedule${paraString}`;
        return this.createQuery<VStgTdxScheduleResponse>(path);
    }
    //市區公車之預估到站資料N1
    busEstimatedArrivals(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_estimatedtimeofarrival_pt1m${paraString}`;
        return this.createQuery<VStgTdxEstimatedtimeofarrivalPt1mResponse>(path);
    }
    //市區公車之即時人數資料 => 公車的人數
    busGetway(paraString: string) {
        let path = `/abfs/dal/v_stg_ibus_gateway${paraString}`;
        return this.createQuery<VStgIbusGatewayResponse>(path);
    }
    //市區公車之定時資料A1 
    busRealTime(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_realtimebyfrequency_pt1m${paraString}`;
        return this.createQuery<VStgTdxRealtimebyfrequencyPt1mResponse>(path);
    }

    //IBUS 路線群組
    busGroups(paraString: string) {
        // console.log(paraString);
        let path = `/abfs/dal/v_stg_ibus_routegrp${paraString}`;
        return this.createQuery<VStgIbusRoutegrpResponse>(path);
    }

    //------city ------------------------------------------------------------
    //高雄市未來一週天氣預報
    cityWeathers(paraString: string) {
        let path = `/abfs/dal/v_stg_cwa_weather_7d${paraString}`;
        return this.createQuery<VStgCwaWeather7dResponse>(path);
    }
    // 空氣品質監測站基本資料
    cityAirQualitys(paraString: string) {
        let path = `/abfs/dal/v_stg_moenv_aqx_p_07${paraString}`;
        return this.createQuery<VStgMoenvAqxP07Response>(path);
    }
    //空氣品質指標(AQI)資料
    cityAqx(paraString: string) {
        let path = `/abfs/dal/v_stg_moenv_aqx_p_432${paraString}`;
        return this.createQuery<VStgMoenvAqxP432Response>(path);
    }
    //全臺市區鄉鎮界圖資
    cityTownsMapDatas(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_map_district_boundary${paraString}`;
        return this.createQuery<VStgTdxMapDistrictBoundaryResponse>(path);
    }
    //高雄1999info
    kao1999Infos(paraString: string) {
        let path = `/abfs/dal/v_stg_tbkc_other_kao1999info_pt1m${paraString}`;
        return this.createQuery<VStgTbkcOtherKao1999infoPt1mResponse>(path);
    }
    //---------------------------------------------------------------
    //高雄市捷運之 即時到離站 資料(包含輕軌) 
    metroLiveboard(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_rail_metro_liveboard_pt1m${paraString}`;
        return this.createQuery<VStgTdxRailMetroLiveboardPt1mResponse>(path);
    }
    //捷運/輕軌離尖峰班距資料
    metroPeak(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_metro_peakdistance${paraString}`;
        return this.createQuery<VStgTdxMetroPeakdistanceResponse>(path);
    }
    //軌道路網實體路線圖資資料
    metroMapShape(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_metro_shape${paraString}`;
        return this.createQuery<VStgTdxMetroShapeResponse>(path);
    }
    //捷運/輕軌首末班車時刻表資料
    metroFLTimetable(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_metro_firstlasttimetable${paraString}`;
        return this.createQuery<VStgTdxMetroFirstlasttimetableResponse>(path);
    }
    //捷運/輕軌站別時刻表資料
    metroStationTimetable(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_metro_stationtimetable${paraString}`;
        return this.createQuery<VStgTdxMetroStationtimetableResponse>(path);
    }
    //捷運/輕軌車站基本資料
    metroStations(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_metro_station${paraString}`;
        return this.createQuery<VStgTdxMetroStationResponse>(path);
    }
    // 自行車 靜態資料
    bikes(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_bike_station${paraString}`;
        return this.createQuery<VStgTdxBikeStationResponse>(path);
    }
    // 自行車 靜態資料
    bikeDynamic(paraString: string) {
        let path = `/abfs/dal/v_stg_tdx_bike_availability${paraString}`;
        return this.createQuery<VStgTdxBikeAvailabilityResponse>(path);
    }
}


export class DataApiFactory {
    private key: string = import.meta.env.VITE_DATA_KEY;
    private dataApiUrl: string = import.meta.env.VITE_DATA_HOST;
    private context: DataApiContext;
    private fun: string = '';

    constructor() {
        this.context = new DataApiContext(this.dataApiUrl, this.key);

    }
    static QueryParameter<T>() {
        return new ODataQueryBase<T, unknown[]>(new ODataV4QueryProvider(""));
    }
    private buildQueryString(query: ODataV4QuerySegments) {
        const queryString = new Array<string>();

        if (query.filter) queryString.push(`filter=${encodeURIComponent(query.filter)}`);

        if (query.orderBy) {
            queryString.push(
                `orderby=${encodeURIComponent(
                    query.orderBy.map((o) => (o.sort ? `${o.field} ${o.sort}` : o.field)).join(","),
                )}`,
            );
        }

        if (query.select) queryString.push(`select=${encodeURIComponent(query.select.join(","))}`);

        if (query.skip) queryString.push(`skip=${Math.floor(query.skip)}`);

        if (typeof query.top === "number" && query.top >= 0) queryString.push(`top=${Math.floor(query.top)}`);

        if (query.count) queryString.push("count=true");

        if (query.expand) queryString.push(`expand=${encodeURIComponent(query.expand.join(","))}`);

        if (queryString.length > 0) return "?" + queryString.join("&");
        return "";
    }
    private async getData(res) {
        //try {
        return res.then((r) => {
            return r.data;
        })
            .catch((err) => {
                console.log(`status : ${res['status']} , msg : ${res['smsg']}`);
                return Array();
            })

    }
    private async getSize(res) {
        //try {
        return res.then((r) => {
            return r.count;
        })
            .catch((err) => {
                return null;
            })

    }
    private async getDataAndSize(res) {
        //try {
        return res.then((r) => {
            return r;
        })
            .catch((err) => {
                console.log(`status : ${res['status']} , msg : ${res['smsg']}`);
                return Array();
            })

    }
    private getExpressionString(expression?): string {
        if (expression) {
            let obj = expression.build();
            return this.buildQueryString(obj);
        }
        return "";
    }

    public setFunctionName(fun: string): DataApiFactory {
        this.fun = fun;
        return this;
    }
    public async getCount() {
        let funName = this.fun;
        const paraString: string = '?count=true';
        let entity = this.context[funName];
        if (entity == null)
            return null;

        return await this.getSize(this.context[funName](paraString).getManyAsync());

    }
    public async getListAll() {
        let funName = this.fun;
        const rowLimit = 2000;
        // 最多 1000筆
        let size = await this.getCount();
        let page: number = 1;
        if (size > rowLimit) {
            page = Math.ceil(size / rowLimit);

        }
        let mehtodName: string = `get${funName.replace(/^./, funName[0].toUpperCase())}`;
        let queryName: string = `query${funName.replace(/^./, funName[0].toUpperCase())}`;
        let datas = [];
        for (let i = 1; i <= page; i++) {

            let skip = (i - 1) * rowLimit;
            const result = await this[mehtodName](
                DataApiFactory[queryName]().top(rowLimit).skip(skip));
            datas = datas.concat(result);
        }
        return datas;
    }

    public async getList(expression?) {
        let funName = this.fun;
        let paraString: string = this.getExpressionString(expression);
        paraString = paraString.replace("orderby", "orderBy");

        return await this.getData(this.context[funName](paraString).getManyAsync());
    }
    public async getListByParameter(expression?: string) {
        let funName = this.fun;

        return await this.getData(this.context[funName](expression).getManyAsync());
    }
    public async getCountByParameter(expression?: string) {
        let funName = this.fun;

        return await this.getSize(this.context[funName](expression).getManyAsync());
    }
    public async getListAndCountByParameter(expression?: string) {
        let funName = this.fun;

        return await this.getDataAndSize(this.context[funName](expression).getManyAsync());
    }

    //-------------------------------------------------------------
    static queryBusRouters() {
        return this.QueryParameter<VStgTdxRoute>();
    }
    async getBusRouters(expression?): Promise<VStgTdxRoute[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busRouters(paraString).getManyAsync());
    }
    static queryBusStations() {
        return this.QueryParameter<VStgTdxStation>();
    }
    async getusStations(expression?): Promise<VStgTdxStation[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busStations(paraString).getManyAsync());
    }
    static queryBusStops() {
        return this.QueryParameter<VStgTdxStop>();
    }
    async getBusStops(expression?): Promise<VStgTdxStop[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busStops(paraString).getManyAsync());
    }
    static queryBusCarDdatas() {
        return this.QueryParameter<VRealSrvEbusTxnMly>();
    }
    async getBusCarDdatas(expression?): Promise<VRealSrvEbusTxnMly[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busCarDdatas(paraString).getManyAsync());
    }
    static queryBusFare() {
        return this.QueryParameter<VStgTdxRoutefare>();
    }
    async getBusFare(expression?): Promise<VStgTdxRoutefare[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busFare(paraString).getManyAsync());
    }
    static queryBusNews() {
        return this.QueryParameter<VStgTdxNews>();
    }
    async getBusNews(expression?): Promise<VStgTdxNews[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busNews(paraString).getManyAsync());
    }
    static queryBusShapes() {
        return this.QueryParameter<VStgTdxShape>();
    }
    async getBusShapes(expression?): Promise<VStgTdxShape[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busShapes(paraString).getManyAsync());
    }
    static queryBusAlerts() {
        return this.QueryParameter<VStgTdxAlert>();
    }
    async queryBusAlerts(expression?): Promise<VStgTdxAlert[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busAlerts(paraString).getManyAsync());
    }
    static queryBusOperators() {
        return this.QueryParameter<VStgTdxOperator>();
    }
    async getBusOperators(expression?): Promise<VStgTdxOperator[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busOperators(paraString).getManyAsync());
    }
    static queryBusSchedules() {
        return this.QueryParameter<VStgTdxSchedule>();
    }
    async getBusSchedules(expression?): Promise<VStgTdxSchedule[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busSchedules(paraString).getManyAsync());
    }
    static queryBusEstimatedArrivals() {
        return this.QueryParameter<VStgTdxEstimatedtimeofarrivalPt1m>();
    }
    async getBusEstimatedArrivals(expression?): Promise<VStgTdxEstimatedtimeofarrivalPt1m[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busEstimatedArrivals(paraString).getManyAsync());
    }
    static queyBusGetway() {
        return this.QueryParameter<VStgIbusGateway>();
    }
    async getBusGetway(expression?): Promise<VStgIbusGateway[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busGetway(paraString).getManyAsync());
    }
    static queryBusRealTime() {
        return this.QueryParameter<VStgTdxRealtimebyfrequencyPt1m>();
    }
    async getBusRealTime(expression?): Promise<VStgTdxRealtimebyfrequencyPt1m[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busRealTime(paraString).getManyAsync());
    }
    static queryBusGroups() {
        return this.QueryParameter<VStgIbusRoutegrp>();
    }
    async getBusGroups(expression?): Promise<VStgIbusRoutegrp[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.busGroups(paraString).getManyAsync());
    }
    static queryCityWeathers() {
        return this.QueryParameter<VStgCwaWeather7d>();
    }
    async getCityWeathers(expression?): Promise<VStgCwaWeather7d[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.cityWeathers(paraString).getManyAsync());
    }
    static querycityAirQualitys() {
        return this.QueryParameter<VStgMoenvAqxP07>();
    }
    async getCityAirQualitys(expression?): Promise<VStgMoenvAqxP07[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.cityAirQualitys(paraString).getManyAsync());
    }
    static queryCityAqx() {
        return this.QueryParameter<VStgMoenvAqxP432>();
    }
    async getCityAqx(expression?): Promise<VStgMoenvAqxP432[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.cityAqx(paraString).getManyAsync());
    }
    static queryCityTownsMapDatas() {
        return this.QueryParameter<VStgTdxMapDistrictBoundary>();
    }
    async getCityTownsMapDatas(expression?): Promise<VStgTdxMapDistrictBoundary[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.cityTownsMapDatas(paraString).getManyAsync());
    }
    static queryKao1999Infos() {
        return this.QueryParameter<VStgTbkcOtherKao1999infoPt1m>();
    }
    async getKao1999Infos(expression?): Promise<VStgTbkcOtherKao1999infoPt1m[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.kao1999Infos(paraString).getManyAsync());
    }
    static queryMetroLiveboard() {
        return this.QueryParameter<VStgTdxRailMetroLiveboardPt1m>();
    }
    async getMetroLiveboard(expression?): Promise<VStgTdxRailMetroLiveboardPt1m[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.metroLiveboard(paraString).getManyAsync());
    }
    static queryMetroPeak() {
        return this.QueryParameter<VStgTdxMetroPeakdistance>();
    }
    async getMetroPeak(expression?): Promise<VStgTdxMetroPeakdistance[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.metroPeak(paraString).getManyAsync());
    }
    static queryMetroMapShape() {
        return this.QueryParameter<VStgTdxMetroShape>();
    }
    async getMetroMapShape(expression?): Promise<VStgTdxMetroShape[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.metroMapShape(paraString).getManyAsync());
    }
    static queryMetroFLTimetable() {
        return this.QueryParameter<VStgTdxMetroFirstlasttimetable>();
    }
    async getMetroFLTimetable(expression?): Promise<VStgTdxMetroFirstlasttimetable[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.metroFLTimetable(paraString).getManyAsync());
    }
    static queryMetroStationTimetable() {
        return this.QueryParameter<VStgTdxMetroStationtimetable>();
    }
    async getMetroStationTimetable(expression?): Promise<VStgTdxMetroStationtimetable[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.metroStationTimetable(paraString).getManyAsync());
    }
    static queryMetroStations() {
        return this.QueryParameter<VStgTdxMetroStation>();
    }
    async getMetroStations(expression?): Promise<VStgTdxMetroStation[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.metroStations(paraString).getManyAsync());
    }

    // 自行車 靜態
    static queryBikes() {
        return this.QueryParameter<VStgTdxBikeStation>();
    }
    async getBikes(expression?): Promise<VStgTdxBikeStation[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.bikes(paraString).getManyAsync());
    }
    // 自行車 動態
    static queryBikeDynamic() {
        return this.QueryParameter<VStgTdxBikeAvailability>();
    }
    async getBikeDynamic(expression?): Promise<VStgTdxBikeAvailability[]> {
        let paraString: string = this.getExpressionString(expression);
        return await this.getData(this.context.bikeDynamic(paraString).getManyAsync());
    }


}
export class DataApi {
    static factroy = new DataApiFactory();
    // 公車路線
    static get busRouters() {
        return DataApi.factroy.setFunctionName("busRouters");
    }
    // 站位資料
    static get busStations() {
        return DataApi.factroy.setFunctionName("busStations");
    }
    // 站牌資料
    static get busStops() {
        return DataApi.factroy.setFunctionName("busStops");
    }
    //公車之票卡機交易資料
    static get busCarDdatas() {
        return DataApi.factroy.setFunctionName("busCarDdatas");
    }
    //市區公車之票價資料
    static get busFare() {
        return DataApi.factroy.setFunctionName("busFare");
    }
    //市區公車之最新消息資料
    static get busNews() {
        return DataApi.factroy.setFunctionName("busNews");
    }
    //市區公車之線型資料
    static get busShapes() {
        return DataApi.factroy.setFunctionName("busShapes");
    }
    //市區公車之營運通阻資料 > 公車時刻 警訊信息
    static get busAlerts() {
        return DataApi.factroy.setFunctionName("busAlerts");
    }
    //市區公車之營運業者資料
    static get busOperators() {
        return DataApi.factroy.setFunctionName("busOperators");
    }
    //市區公車之時刻表資料
    static get busSchedules() {
        return DataApi.factroy.setFunctionName("busSchedules");
    }
    //市區公車之預估到站資料N1
    static get busEstimatedArrivals() {
        return DataApi.factroy.setFunctionName("busEstimatedArrivals");
    }
    //市區公車之即時人數資料 => 公車的人數
    static get busGetway() {
        return DataApi.factroy.setFunctionName("busGetway");
    }
    //市區公車之定時資料A1 
    static get busRealTime() {
        return DataApi.factroy.setFunctionName("busRealTime");
    }

    //IBUS 路線群組
    static get busGroups() {
        return DataApi.factroy.setFunctionName("busGroups");
    }

    //------city ------------------------------------------------------------
    //高雄市未來一週天氣預報
    static get cityWeathers() {
        return DataApi.factroy.setFunctionName("cityWeathers");
    }
    // 空氣品質監測站基本資料
    static get cityAirQualitys() {
        return DataApi.factroy.setFunctionName("cityAirQualitys");
    }
    //空氣品質指標(AQI)資料
    static get cityAqx() {
        return DataApi.factroy.setFunctionName("cityAqx");
    }
    //全臺市區鄉鎮界圖資
    static get cityTownsMapDatas() {
        return DataApi.factroy.setFunctionName("cityTownsMapDatas");
    }
    //高雄1999info
    static get kao1999Infos() {
        return DataApi.factroy.setFunctionName("kao1999Infos");
    }
    //---------------------------------------------------------------
    //高雄市捷運之 即時到離站 資料(包含輕軌) 
    static get metroLiveboard() {
        return DataApi.factroy.setFunctionName("metroLiveboard");
    }
    //捷運/輕軌離尖峰班距資料
    static get metroPeak() {
        return DataApi.factroy.setFunctionName("metroPeak");
    }
    //軌道路網實體路線圖資資料
    static get metroMapShape() {
        return DataApi.factroy.setFunctionName("metroMapShape");
    }
    //捷運/輕軌首末班車時刻表資料
    static get metroFLTimetable() {
        return DataApi.factroy.setFunctionName("metroFLTimetable");
    }
    //捷運/輕軌站別時刻表資料
    static get metroStationTimetable() {
        return DataApi.factroy.setFunctionName("metroStationTimetable");
    }
    static get metroStations() {
        return DataApi.factroy.setFunctionName("metroStations");
    }
    static get metroLives() {
        return DataApi.factroy.setFunctionName("metroLives");
    }

    static get bikes() {
        return DataApi.factroy.setFunctionName("bikes");
    }
    static get bikeDynamic() {
        return DataApi.factroy.setFunctionName("bikeDynamic");
    }

    constructor() {
    }
}
