import { ref, Ref } from "vue";
import { BlockCard } from "./DashboardBlock";
import { DashboardConfig, DashboardGridItem } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import TestBlock from "@/components/dashboard/TestBlock.vue";
import GrafanaBlock from "@/components/dashboard/GrafanaBlock.vue";
import { DashboardStyleType } from "../enum/DashboardType";
import { RouteLocationNormalizedLoaded } from "vue-router";


// 妥善率分析 儀表板佈局
export class PLAvailRate implements IDashboardLayout {
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
        this.CenterConfig = new DashboardConfig({ RowGap: 0, ColumnGap: 0 })
            .setItems([
                new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: "flex",
                            grafanaBlockClass: "flex-grow w-full h-full",
                            grafanaBlockProps: [
                                {
                                    title: "月份妥善率​",
                                    urlKey: "monthlyAvailabilityRate",
                                    iframeWidth: `${(Number(this.screenWidth.value) / 3) * 2}`,
                                    iframeHeight: "380"
                                },
                                {
                                    title: "車輛不可用原因",
                                    urlKey: "carUnavailabilityReasons",
                                    iframeWidth: `${(Number(this.screenWidth.value) / 3) * 1}`,
                                    iframeHeight: "380"
                                },
                            ]
                        })
                ),
                new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                    new BlockCard().setComponent(TestBlock)
                        .setProps({
                            containerClass: "flex",
                            grafanaBlockClass: "flex-grow w-full h-full",
                            grafanaBlockProps: [
                                {
                                    title: "路線妥善率​",
                                    urlKey: "routeAvailabilityRate",
                                    iframeWidth: `${(Number(this.screenWidth.value) / 3) * 1}`,
                                    iframeHeight: "470"
                                },
                                {
                                    title: "各車輛妥善率​​",
                                    urlKey: "individualCarAvailabilityRate",
                                    iframeWidth: `${(Number(this.screenWidth.value) / 3) * 1}`,
                                    iframeHeight: "470"
                                },
                                {
                                    title: "車輛不可用詳情​",
                                    urlKey: "carUnavailabilityDetails",
                                    iframeWidth: `${(Number(this.screenWidth.value) / 3) * 0.5}`,
                                    iframeHeight: "470"
                                },
                                {
                                    title: "車輛不可用詳情圖",
                                    urlKey: "carUnavailabilityChart",
                                    iframeWidth: `${(Number(this.screenWidth.value) / 3) * 0.5}`,
                                    iframeHeight: "470"
                                },
                            ]
                        })
                ),
            ])
    }

}