import { BlockCard } from "./DashboardBlock";
import { DashboardConfig, DashboardGridItem } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import TestBlock from "@/components/dashboard/TestBlock.vue";
import GrafanaBlock from "@/components/dashboard/GrafanaBlock.vue";
import { DashboardStyleType } from "../enum/DashboardType";
import { RouteLocationNormalizedLoaded } from 'vue-router';

// 主頁 儀表板佈局
export class PLCar implements IDashboardLayout {
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
                            title: "總車輛",
                            urlKey: "totalCars",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "車輛清單",
                            urlKey: "carList",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 3, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "場站即時影像",
                            urlKey: "stationLiveStream",
                            urlStationName: queryStationName
                        })
                ),

            ])
        this.RightConfig = new DashboardConfig()
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "車輛使用率",
                            urlKey: "carUtilization",
                            urlStationName: queryStationName
                        })
                ),
                new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            title: "當日排班作業監控",
                            urlKey: "dailyScheduleMonitor",
                            urlStationName: queryStationName,
                            urlWidth: "1100",
                            iframeHeight: "900",
                        })
                ),
            ])
        this.BottomConfig = new DashboardConfig()
            .setStyle(DashboardStyleType.HORIZONTAL)
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "dailyTotalPowerConsumption_car",
                            urlStationName: queryStationName,
                            iframeHeight: "80",
                            iframeWidth: "230"
                        })
                ),
                new DashboardGridItem({ Row: 1, Column: 2 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "dailyMissedCarTrips",
                            urlStationName: queryStationName,
                            iframeHeight: "80",
                            iframeWidth: "230"
                        })
                ),
                new DashboardGridItem({ Row: 1, Column: 3 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "operationalCars",
                            urlStationName: queryStationName,
                            iframeHeight: "80",
                            iframeWidth: "230"
                        })
                ),
                new DashboardGridItem({ Row: 1, Column: 4 }).setBlock(
                    new BlockCard().setComponent(GrafanaBlock)
                        .setProps({
                            urlKey: "attendeeCount",
                            urlStationName: queryStationName,
                            iframeHeight: "80",
                            iframeWidth: "230"
                        })
                ),
            ])
    }
}