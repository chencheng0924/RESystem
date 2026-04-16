import { BlockCard } from "./DashboardBlock";
import { DashboardConfig, DashboardGridItem } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import TestBlock from "@/components/dashboard/TestBlock.vue";
import GrafanaBlock from "@/components/dashboard/GrafanaBlock.vue";
import RoadWorksAccident from "@/components/dashboard/roadWorksAccident/RoadWorksAccident.vue";
import { DashboardStyleType } from "../enum/DashboardType";
import { RouteLocationNormalizedLoaded } from "vue-router";
// 主頁 儀表板佈局
export class PLDashboard implements IDashboardLayout {
    RightConfig?: DashboardConfig;
    LeftConfig?: DashboardConfig;
    BottomConfig?: DashboardConfig;
    $Route?: RouteLocationNormalizedLoaded;

    constructor(init?) {
        Object.assign(this, init);

        this.init();
    }

    private init() {
        const queryStationName = this.$Route?.query["stationName"]
        
        this.LeftConfig = new DashboardConfig()
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "各場站值勤狀況",
                            urlKey: "siteOnDutyStatus",
                            iframeHeight: "200",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "各場站準點率​",
                            urlKey: "sitePunctuality",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 3, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: 'flex flex-col',
                            grafanaBlockProps: [
                                {
                                    title: "各場站用電狀況​",
                                    urlKey: "sitePowerUsageStatus",
                                    iframeHeight: "200",
                                    urlStationName: queryStationName
                                },
                                {
                                    urlKey: "powerCost",
                                    iframeHeight: "120",
                                    urlStationName: queryStationName
                                }
                            ]
                        })
                ),
            ])
        this.RightConfig = new DashboardConfig()
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: 'flex',
                            grafanaBlockClass: 'flex-grow',
                            grafanaBlockProps: [
                                {
                                    urlKey: "totalPowerConsumption",
                                    iframeHeight: "80",
                                    iframeWidth: "130",
                                    urlStationName: queryStationName
                                },
                                {
                                    urlKey: "simulatedGreenPowerUsage",
                                    iframeHeight: "80",
                                    iframeWidth: "130",
                                    urlStationName: queryStationName
                                },
                                {
                                    urlKey: "carbonEmissionReduction",
                                    iframeHeight: "80",
                                    iframeWidth: "130",
                                    urlStationName: queryStationName
                                },
                            ]
                        })
                ),
                new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "今日重點指標​",
                            urlKey: "dailyKeyIndicators",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 3, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "擁塞路段即時影像​",
                            urlKey: "congestionTrafficCams",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 4, Column: 1 }).setBlock(
                    new BlockCard().setComponent(RoadWorksAccident)
                        .setProps({
                            title: "今日施工與事故清單",
                            containerClass: "w-[400px] h-[480px] overflow-y-hidden",
                        })
                ),
            ])
        this.BottomConfig = new DashboardConfig()
            .setStyle(DashboardStyleType.HORIZONTAL)
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "dailyTotalPowerConsumption",
                            iframeHeight: "80",
                            iframeWidth: "230",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 1, Column: 2 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "dailyRemainingPower",
                            iframeHeight: "80",
                            iframeWidth: "230",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 1, Column: 3 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "dailyEstimatedPower",
                            iframeHeight: "80",
                            iframeWidth: "230",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 1, Column: 4 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "dailyCarbonReduction",
                            iframeHeight: "80",
                            iframeWidth: "230",
                            urlStationName: queryStationName
                        })
                ),
            ])
    }
}