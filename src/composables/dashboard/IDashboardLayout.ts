import { RouteLocationNormalizedLoaded } from "vue-router";
import { DashboardConfig } from "./DashboardConfig";

export interface IDashboardLayout {
    RightConfig?: DashboardConfig;
    LeftConfig?: DashboardConfig;
    BottomConfig?: DashboardConfig;
    CenterConfig?: DashboardConfig;
    $Route?: RouteLocationNormalizedLoaded;
}