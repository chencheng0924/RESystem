import { ref, Ref } from "vue";
import { BlockCard } from "./DashboardBlock";
import { DashboardConfig, DashboardGridItem } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import TestBlock from "@/components/dashboard/TestBlock.vue";
import GrafanaBlock from "@/components/dashboard/GrafanaBlock.vue";
import { DashboardStyleType } from "../enum/DashboardType";
import { RouteLocationNormalizedLoaded } from "vue-router";


// 主頁 儀表板佈局
export class PLRoster implements IDashboardLayout {
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
        this.CenterConfig = new DashboardConfig()
        .setItems([
            new DashboardGridItem({ Row: 1, Column: 1 }).setBlock(
                new BlockCard().setComponent(GrafanaBlock)
                    .setProps({
                        title: "行駛公里數",
                        urlKey: "calculateDistance",
                        iframeWidth: `${this.screenWidth.value}`,
                        iframeHeight: "400"
                    })
            ),
            new DashboardGridItem({ Row: 2, Column: 1 }).setBlock(
                new BlockCard().setComponent(GrafanaBlock)
                    .setProps({
                        title: "場站排班表",
                        urlKey: "stationRoster",
                        urlWidth: "1900",
                        urlHeight: "900",
                        iframeWidth: `${this.screenWidth.value}`,
                        iframeHeight: "900"
                    })
            ),
        ])
    }

}