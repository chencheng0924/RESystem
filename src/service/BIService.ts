import { BaseService } from '@/service/BaseService';

export class BIService extends BaseService {

    constructor(langCode?: string) {
        super();
    }

    // 單一公車路線資訊
    public async getRouteInfo(params: { direction?: string, routeId?: string }) {
        // const paramsTemp = Object.assign({}, params);
        // return this.api.rsuperApi.RealTimeStationStatusQ1.BI.get(paramsTemp).then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 各場站各車輛狀態數量
    public async getStationStatus() {

        // return this.api.rsuperApi.RealTimeStationStatusQ2.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 單一站點資訊
    public async getStopInfo(routeId: string) {
        // const params = { routeId }
        // const paramsTemp = Object.assign({}, params);
        // return this.api.rsuperApi.RealTimeStationStatusQ3.BI.get(paramsTemp).then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 道路施工資料
    public async getRoadworkInfo() {

        // return this.api.rsuperApi.RealTimeStationStatusQ4.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 公車資料（非Highlight行駛中）
    public async getStaticBusInfo() {

        // return this.api.rsuperApi.RealTimeStationStatusQ5.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 公車資料（Highlight行駛中）
    public async getActiveBusInfoByPlateNumber(platenum: string) {
        // const params = { platenum }
        // const paramsTemp = Object.assign({}, params);
        // return this.api.rsuperApi.RealTimeStationStatusQ6.BI.get(paramsTemp).then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 事故資料
    public async getAccidentInfo() {

        // return this.api.rsuperApi.RealTimeStationStatusQ7.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // CCTV
    public async getCCTVData() {
        // return this.api.rsuperApi.RealTimeCctvDataQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 抽水站
    public async getPumpStationData() {
        // return this.api.rsuperApi.PumpingStationDataQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 雨量站
    public async getRainfallData() {
        // return this.api.rsuperApi.TBKCRainFallQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 地震
    public async getEarthquakeData() {
        // return this.api.rsuperApi.EarthquakeKHHQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // CMS
    public async getCmsData() {
        // return this.api.rsuperApi.TrafficCmsKHHQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 高雄地區交通壅塞事件清單
    public async getTrafficJamData() {
        // return this.api.rsuperApi.CongestionEventQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

    // 大型場館
    public async getLargeVenueData() {
        // return this.api.rsuperApi.KKDayConcertsKHHQ1.BI.get().then((res) => {
        //     return res.data.data;
        // }).catch((error) => {
        //     return [];
        // });
    }

}