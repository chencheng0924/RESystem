import { ref, Ref } from "vue";
import { BlockCard } from "./DashboardBlock";
import { DashboardConfig, DashboardGridItem } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import GrafanaBlock from "@/components/dashboard/GrafanaBlock.vue";
import { RouteLocationNormalizedLoaded } from "vue-router";


// 主頁 儀表板佈局
export class PLChatdialog implements IDashboardLayout {
    CenterConfig?: DashboardConfig;
    $Route?: RouteLocationNormalizedLoaded;
    propsData?: any
    private screenWidth: Ref<number>;
    constructor(propsData?:any, init?) {
        Object.assign(this, init);
        this.screenWidth = ref(window.innerWidth - 80);
        this.propsData = ref(propsData)
        this.init();
    }

    private init() {
        const data = {
            title: "攝影機影像",
            urlKey: "cctv",
            iframeHeight: "300",
            urlCCTVRoadName: this.propsData.value?.roadname || '公園二路',
            urlCCTV: this.propsData.value?.url || "https://cctv6.kctmc.nat.gov.tw/11a631f9",
        }
        console.log('data', data)
        this.CenterConfig = new DashboardConfig().setItems(
            [
              new DashboardGridItem().setBlock(
                new BlockCard().setComponent(GrafanaBlock)
                    .setProps(data)
              ),
            ]
        )
    }

}