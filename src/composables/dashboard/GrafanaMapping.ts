import { TokenData, TokenService } from "@/service/TokenService";
import { ref, Ref } from "vue";
import { GrafanaUrlParams } from "@/composables/interface/IGrafanaMapping";

const grafana_host = import.meta.env.VITE_GRAFANA_HOST;
const grafana_role = import.meta.env.VITE_GRAFANA_ROLE;
export class GrafanaItem {
    constructor(init?) {
        Object.assign(this, init);
    }

    public Key?: string;//代號
    public Name?: string;//中文名
    public Url?: string;//網址 絕對路徑
    public Params?: any;// 參數

}

export class GrafanaMapping {
    private mapping?: Array<GrafanaItem> = [];
    private tokenSvc?: TokenService;
    public token?: Ref<string>;
    private roleId: string = grafana_role// Viewer

    constructor(init?) {
        Object.assign(this, init);
        this.token = ref("");


        this.tokenSvc = new TokenService();
        this.setMappingData();
        this.init();
    }

    private async init() {

    }

    private async getToken() {
        let r = this.roleId;
        let tokenEntity: TokenData = await this.tokenSvc.getCurrentGrafanaToken({ role: r });

        this.token.value = tokenEntity.access_token;
    }

    private setMappingData() {
        this.mapping = [
            new GrafanaItem({
                Name: "各場站值勤狀況", Key: "siteOnDutyStatus",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=4",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "各場站準點率​", Key: "sitePunctuality",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=6",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "各場站用電狀況​", Key: "sitePowerUsageStatus",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=8",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "用電成本​", Key: "powerCost",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=34",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日重點指標​", Key: "dailyKeyIndicators",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=10",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "擁塞路段即時影像​", Key: "congestionTrafficCams",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=38",
                Params: {
                    height: "var-h", width: "var-w",
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日施工與事故清單", Key: "dailyRoadworksAndIncidents",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=32",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日總用電量", Key: "dailyTotalPowerConsumption",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=16",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日剩餘電量", Key: "dailyRemainingPower",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=20",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日預估電量", Key: "dailyEstimatedPower",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=22",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日累計減碳", Key: "dailyCarbonReduction",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=24",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "累計用電量", Key: "totalPowerConsumption",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=46",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "綠電使用量(模擬)", Key: "simulatedGreenPowerUsage",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=48",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "碳排減少量", Key: "carbonEmissionReduction",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&kiosk=&panelId=50"
            }),
            new GrafanaItem({
                Name: "總車輛", Key: "totalCars",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=4",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "車輛清單", Key: "carList",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=6",
                Params: {
                    height: "var-h1", width: "var-w1",
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "場站即時影像", Key: "stationLiveStream",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=8",
                Params: {
                    height: "var-h2", width: "var-w2",
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "車輛使用率", Key: "carUtilization",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=10",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "當日排班作業監控", Key: "dailyScheduleMonitor",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=38",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "今日總用電量(車輛管理)", Key: "dailyTotalPowerConsumption_car",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=16",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "當日脫班班次", Key: "dailyMissedCarTrips",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=20",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "妥善車輛", Key: "operationalCars",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=22",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "出勤人數", Key: "attendeeCount",
                Url: "/ksbus/d-solo/AsK6w9TSz/5aC056uZ54ef6YGLLei7iumaiue4veimvQ?orgId=3&reload=1&kiosk=&panelId=24",
                Params: {
                    stationName: "var-depot"
                }
            }),
            new GrafanaItem({
                Name: "充電樁資訊", Key: "chargePostInfo",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=4",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "充電樁資訊表", Key: "chargePostInfoTable",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=8",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "充電樁用電與電價(月報表)", Key: "chargePostUsageAndPriceMonthly",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=16",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "各充電樁使用率(月報表)​", Key: "chargePostUsageRateMonthly",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=20",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "各充電樁提供電度(月報表)​", Key: "chargePostElectricityProvidedMonthly",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=22",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "充電樁各時段充電電價(月報表)​", Key: "chargePostHourlyPriceMonthly",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=26",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "充電樁各時段充電電度(月報表)​", Key: "chargePostHourlyUsageMonthly",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=24",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "充電樁各時段使用次數(月報表)​", Key: "chargePostHourlyFrequencyMonthly",
                Url: "/ksbus/d-solo/m3_wX9TIz/a32d47cc-348d-564b-8bbd-2dd39733f2ff?orgId=3&kiosk=&panelId=28",
                Params: {
                    chargingStopName: "var-charging_stop"
                }
            }),
            new GrafanaItem({
                Name: "月份妥善率​", Key: "monthlyAvailabilityRate",
                Url: "/ksbus/d-solo/er3NXroIz/5aal5ZaE546H5YiG5p6Q?orgId=3&kiosk=&panelId=4"
            }),
            new GrafanaItem({
                Name: "車輛不可用原因", Key: "carUnavailabilityReasons",
                Url: "/ksbus/d-solo/er3NXroIz/5aal5ZaE546H5YiG5p6Q?orgId=3&kiosk=&panelId=20"
            }),
            new GrafanaItem({
                Name: "路線妥善率", Key: "routeAvailabilityRate",
                Url: "/ksbus/d-solo/er3NXroIz/5aal5ZaE546H5YiG5p6Q?orgId=3&kiosk=&panelId=16"
            }),
            new GrafanaItem({
                Name: "各車輛妥善率", Key: "individualCarAvailabilityRate",
                Url: "/ksbus/d-solo/er3NXroIz/5aal5ZaE546H5YiG5p6Q?orgId=3&kiosk=&panelId=22"
            }),
            new GrafanaItem({
                Name: "車輛不可用詳情", Key: "carUnavailabilityDetails",
                Url: "/ksbus/d-solo/er3NXroIz/5aal5ZaE546H5YiG5p6Q?orgId=3&kiosk=&panelId=8"
            }),
            new GrafanaItem({
                Name: "車輛不可用詳情圖", Key: "carUnavailabilityChart",
                Url: "/ksbus/d-solo/er3NXroIz/5aal5ZaE546H5YiG5p6Q?orgId=3&kiosk=&panelId=24"
            }),
            new GrafanaItem({
                Name: "行駛公里數", Key: "calculateDistance",
                Url: "/ksbus/d-solo/B3fIu9TIz/5aC056uZ54ef6YGLL-WgtOermeaOkueZvOePrQ?orgId=3&reload=1&kiosk=&panelId=4"
            }),
            new GrafanaItem({
                Name: "場站排班表", Key: "stationRoster",
                Url: "/ksbus/d-solo/B3fIu9TIz/5aC056uZ54ef6YGLL-WgtOermeaOkueZvOePrQ?orgId=3&reload=1&kiosk=&panelId=38"
            }),
            new GrafanaItem({
                Name: "cctv", Key: "cctv",
                Url: "/ksbus/d-solo/e40f9621-f299-4aaa-9547-fa266dff83a2/6aGN5aSW55So6YCU?orgId=3&panelId=2",
                Params: {
                    height: "var-h",
                    width: "var-w",
                    cctvUrl: "cctv_url", // 影像來源
                    cctvRoadName: "cctv_roadname" // 道路名稱
                }
            }),
            new GrafanaItem({
                Name: "儀表板里程", Key: "dashboardMileage",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&t=1726733976&reload=1&var-RouteID=60&var-Direction=0&var-Platenum=EAL-2682&kiosk=&from=1726712528376&to=1726734128376&panelId=56",
                Params: {
                    height: "var-h",
                    width: "var-w",
                    routeId: "var-RouteID", // 路線id
                    direction: "var-Direction", // 路線方向
                    platenum: "var-Platenum" // 車牌號碼
                }
            }),
            new GrafanaItem({
                Name: "本月用電效率", Key: "elecEffic",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&t=1726733976&reload=1&kiosk=&from=1726712557895&to=1726734157895&panelId=58",
                Params: {
                    height: "var-h",
                    width: "var-w",
                    routeId: "var-RouteID", // 路線id
                    direction: "var-Direction", // 路線方向
                    platenum: "var-Platenum" // 車牌號碼
                }
            }),
            new GrafanaItem({
                Name: "車輛詳情", Key: "carDetails",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&t=1726733976&reload=1&kiosk=&from=1726712575145&to=1726734175145&panelId=60",
                Params: {
                    height: "var-h1",
                    width: "var-w1",
                    routeId: "var-RouteID", // 路線id
                    direction: "var-Direction", // 路線方向
                    platenum: "var-Platenum" // 車牌號碼
                }
            }),
            new GrafanaItem({
                Name: "故障詳情", Key: "faultDetails",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&t=1726733976&reload=1&kiosk=&from=1726712604878&to=1726734204878&panelId=62",
                Params: {
                    height: "var-h2",
                    width: "var-w2",
                    routeId: "var-RouteID", // 路線id
                    direction: "var-Direction", // 路線方向
                    platenum: "var-Platenum" // 車牌號碼
                }
            }),
            new GrafanaItem({
                Name: "歷史行車作業", Key: "HistDriving",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&var-Refresh=2&t=1726733976&reload=1&kiosk=&from=1726712626012&to=1726734226012&panelId=64",
                Params: {
                    height: "var-h3",
                    width: "var-w3",
                    routeId: "var-RouteID", // 路線id
                    direction: "var-Direction", // 路線方向
                    platenum: "var-Platenum" // 車牌號碼
                }
            }),
            new GrafanaItem({
                Name: "即時車速壅塞程度", Key: "liveTrafficCongestionLevel",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&t=1727143201&reload=1&kiosk=&panelId=66",
                Params: {
                    stationName: "var-depot",
                    routeId: "var-RouteID",
                    direction: "var-Direction",
                    platenum: "var-Platenum"
                }
            }),
            new GrafanaItem({
                Name: "剩餘電量/預估剩餘電量", Key: "remainingEstimatedPower",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&t=1727143201&&reload=1&kiosk=&panelId=68",
                Params: {
                    stationName: "var-depot",
                    routeId: "var-RouteID",
                    direction: "var-Direction",
                    platenum: "var-Platenum"
                }
            }),
            new GrafanaItem({
                Name: "即時通知", Key: "liveNotification",
                Url: "/ksbus/d-solo/1-B8Q9oSk/5aC056uZ54ef6YGLLeWNs-aZgueHn-mBi-ebo-aOpw?orgId=3&t=172714320&kiosk=&panelId=70",
                Params: {
                    stationName: "var-depot",
                    routeId: "var-RouteID",
                    direction: "var-Direction",
                    platenum: "var-Platenum"
                }
            }),
        ]
    }

    public getGrafanaItem(key: string) {
        let urlData = this.mapping.find(x => x.Key == key);
        if (urlData == null)
            return;

        return urlData;
    }

    public async getGrafanaItemUrl(params: GrafanaUrlParams) {
        const { key, width, height, stationName, chargingStopName, cctvUrl, cctvRoadName, routeId, direction, platenum } = params;

        let paramNames: { [key: string]: string } = {
            width: 'w',
            height: 'h',
        };

        // if (!this.token.value)
        //     await this.getToken();

        let urlData = this.getGrafanaItem(key);
        if (urlData == null)
            return;

        if (urlData.Params && typeof urlData.Params === 'object') {
            paramNames = {
                ...paramNames,
                ...urlData.Params
            };
        }

        const queryParams = new URLSearchParams({
            noTitle: '',
            // auth_token: this.token.value
        });

        if (width) {
            queryParams.append(paramNames.width, width);
        }
        if (height) {
            queryParams.append(paramNames.height, height);
        }
        if (stationName && paramNames?.stationName) {
            queryParams.append(paramNames?.stationName, stationName);
        }
        if (chargingStopName && paramNames?.chargingStopName) {
            queryParams.append(paramNames?.chargingStopName, chargingStopName);
        }
        if (cctvUrl && paramNames?.cctvUrl) {
            queryParams.append(paramNames?.cctvUrl, cctvUrl);
        }
        if (cctvRoadName && paramNames?.cctvRoadName) {
            queryParams.append(paramNames?.cctvRoadName, cctvRoadName);
        }

        if (routeId && paramNames?.routeId) {
            queryParams.append(paramNames?.routeId, routeId);
        }

        if (direction && paramNames?.direction) {
            queryParams.append(paramNames?.direction, direction);
        }

        if (platenum && paramNames?.platenum) {
            queryParams.append(paramNames?.platenum, platenum);
        }


        const url = `${grafana_host}${urlData.Url}&${queryParams.toString()}`;

        return url;
    }
}
