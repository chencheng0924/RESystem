import { ref, Ref } from "vue";
import { BlockCard } from "./DashboardBlock";
import { DashboardConfig, DashboardGridItem } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import TestBlock from "@/components/dashboard/TestBlock.vue";
import GrafanaBlock from "@/components/dashboard/GrafanaBlock.vue";
import ChargingStopDropdown from "@/components/dashboard/chargingStopDropdown/ChargingStopDropdown.vue";
import { DashboardStyleType } from "../enum/DashboardType";
import { RouteLocationNormalizedLoaded } from "vue-router";


// 主頁 儀表板佈局
export class PLPower implements IDashboardLayout {
    RightConfig?: DashboardConfig;
    LeftConfig?: DashboardConfig;
    BottomConfig?: DashboardConfig;
    CenterConfig?: DashboardConfig;
    $Route?: RouteLocationNormalizedLoaded;

    private screenWidth: Ref<number>;


    constructor(init?) {
        Object.assign(this, init);
        this.screenWidth = ref(window.innerWidth - 80);

        this.init();
    }

    private init() {
        const queryChargingStopName = this.$Route?.query["chargingStopName"]

        this.CenterConfig = new DashboardConfig({ RowGap: 0, ColumnGap: 0 })
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(ChargingStopDropdown)
                        .setProps({
                            title: "充電樁供電分析",
                            containerClass: `w-[${this.screenWidth.value}px] h-[100px]`
                        })
                ),
                new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: "flex flex-col",
                            grafanaBlockClass: "flex-grow w-full h-full",
                            grafanaBlockProps: [
                                {
                                    urlKey: "chargePostInfo",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${this.screenWidth.value}`,
                                    iframeHeight: "350"
                                },
                                {
                                    urlKey: "chargePostInfoTable",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${this.screenWidth.value}`,
                                    iframeHeight: "500"
                                },
                            ]
                        })
                ),
                new DashboardGridItem({ Row: 3, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: "flex flex-col",
                            grafanaBlockClass: "flex-grow w-full h-full",
                            title: "充電樁用電與電價(月報表)​",
                            grafanaBlockProps: [
                                {
                                    urlKey: "chargePostUsageAndPriceMonthly",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${this.screenWidth.value}`,
                                    iframeHeight: "450"
                                },

                            ]
                        })
                ),
                new DashboardGridItem({ Row: 4, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: "flex",
                            grafanaBlockClass: "flex-grow w-full h-full",
                            grafanaBlockProps: [
                                {
                                    title: "各充電樁使用率(月報表)​​",
                                    urlKey: "chargePostUsageRateMonthly",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${Number(this.screenWidth.value) / 2}`,
                                    iframeHeight: "400"
                                },
                                {
                                    title: "各充電樁提供電度(月報表)​​",
                                    urlKey: "chargePostElectricityProvidedMonthly",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${Number(this.screenWidth.value) / 2}`,
                                    iframeHeight: "400"
                                },

                            ]
                        })
                ),
                new DashboardGridItem({ Row: 5, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: "flex",
                            grafanaBlockClass: "flex-grow w-full h-full",
                            grafanaBlockProps: [
                                {
                                    title: "充電樁各時段充電電價(月報表)​",
                                    urlKey: "chargePostHourlyPriceMonthly",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${Number(this.screenWidth.value) / 3}`,
                                    iframeHeight: "450"
                                },
                                {
                                    title: "充電樁各時段充電電度(月報表)​​",
                                    urlKey: "chargePostHourlyUsageMonthly",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${Number(this.screenWidth.value) / 3}`,
                                    iframeHeight: "450"
                                },
                                {
                                    title: "充電樁各時段使用次數(月報表)​​",
                                    urlKey: "chargePostHourlyFrequencyMonthly",
                                    urlChargingStopName: queryChargingStopName,
                                    iframeWidth: `${Number(this.screenWidth.value) / 3}`,
                                    iframeHeight: "450"
                                },

                            ]
                        })
                ),
            ])
    }

}