import { Ref, ref } from "vue";
import { DashboardConfig } from "./DashboardConfig";
import { IDashboardLayout } from "./IDashboardLayout";
import { PLDashboard } from "./PLDashboard";
import { PLCar } from "./PLCar";
import { PLPower } from "./PLPower";
import { PLAvailRate } from "./PLAvailRate";
import { PLRoster } from "./PLRoster";
import { PLChatdialog } from "./PLChatdialog";
import { RouteLocationNormalizedLoaded } from "vue-router";

export enum PLItemKey {
    DASHBOARD = "Dashboard",
    CAR = "Car",
    POWER = "Power",
    AVAILRate = "AvailRate",
    ROSTER= "Roster",
    CHATDIALOG = "ChatDialog"
}

export class PLItem {
    config?: IDashboardLayout;
    key?: string;//id
    constructor(key?: string, cfg?: IDashboardLayout) {
        if (key != null)
            this.key = key;
        if (cfg != null)
            this.config = cfg;
    }
}

export class DashboardFactory {
    public leftConfig: Ref<DashboardConfig>;
    public rightConfig: Ref<DashboardConfig>;
    public bottomConfig: Ref<DashboardConfig>;
    public centerConfig: Ref<DashboardConfig>;

    private item?: PLItem;
    private configDatas?: Array<PLItem> = [];
    private $route: Ref<RouteLocationNormalizedLoaded>;
    constructor(route?:any) {
        this.$route = route;
        this.item = new PLItem();

        this.leftConfig = ref(null);
        this.rightConfig = ref(null);
        this.bottomConfig = ref(null);
        this.centerConfig = ref(null);


        this.init();
    }
    private init() {
        this.configDatas.push(new PLItem(PLItemKey.DASHBOARD, new PLDashboard({ $Route: this.$route })));
        this.configDatas.push(new PLItem(PLItemKey.CAR, new PLCar({ $Route: this.$route })));
        this.configDatas.push(new PLItem(PLItemKey.POWER, new PLPower({ $Route: this.$route })));
        this.configDatas.push(new PLItem(PLItemKey.AVAILRate, new PLAvailRate()));
        this.configDatas.push(new PLItem(PLItemKey.ROSTER, new PLRoster()));
        this.configDatas.push(new PLItem(PLItemKey.CHATDIALOG, new PLChatdialog()));
    }

    private getLeftConfig() {
        this.leftConfig.value = this.item.config.LeftConfig;
    }
    private getRightConfigs() {
        this.rightConfig.value = this.item.config.RightConfig;
    }
    private getBottomConfig() {
        this.bottomConfig.value = this.item.config.BottomConfig;
    }
    private getCenterConfig() {
        this.centerConfig.value = this.item.config.CenterConfig;
    }
    public getConfigItem(key: PLItemKey) {
        let item = this.configDatas.find(x => x.key == key);
        this.item = item;
        if (item != null) {
            this.getLeftConfig();
            this.getRightConfigs();
            this.getBottomConfig();
            this.getCenterConfig();
        }
        return item;
    }

}