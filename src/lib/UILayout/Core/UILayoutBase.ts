import { EnvUtils } from "@/utils/envUtils";
import { IUILayoutTemplate } from "./IUILayoutTemplate";
import { ThemeSwitchController } from "@/components/smartcityui/STThemeMode.compsable";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { SidebarMenuItem } from "../CSidebarMenu/SidebarMenu.model";
import { PageBuilder } from "@/lib/pageBuilder/base/PageBuilder";
import { PageView } from "@/lib/pageBuilder/core/PageView";
import { DrawerControllerView, DrawerFormDefinitionBase } from "@/lib/pageBuilder/common/DrawerForm";
import { PageDrawerSection } from "@/lib/pageBuilder/core/PageDrawerSection";
import { ref, Ref } from "vue";
import { PageDialogSection } from "@/lib/pageBuilder/core/PageDialogSection";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { CustomView } from "./SideBarAppBarNarrowController";

export class UILayoutBase implements IUILayoutTemplate {
    public builder?: PageBuilder
    public theme = new ThemeSwitchController(true);
    public themMode?: string;
    public DrawerViewRef?: Ref<PageDrawerSection>
    public DrawerVisibleRight?: Ref<boolean>
    public DialogViewRef?: Ref<PageDialogSection>
    public DialogVisible?: Ref<boolean>
    public customView?: CustomView
    constructor() {
        this.setTheme();
        this.setLogoPath();
        this.DrawerViewRef = ref(new PageDrawerSection());
        this.DrawerVisibleRight = ref(false);
        this.DialogViewRef = ref(new PageDialogSection());
        this.DialogVisible = ref(false);
    }
    setPageBuilder(b: PageBuilder) {
        this.builder = b;

        return this;
    }

    public OpenDrawer() {
        this.DrawerVisibleRight.value = true;
    }
    public CloseDrawer() {
        this.DrawerVisibleRight.value = false;
    }
    public OpenDialog() {
        this.DialogVisible.value = true;
        this.customView.DialogVisible = this.DialogVisible.value
    }
    public CloseDialog() {
        this.DialogVisible.value = false;
        this.customView.DialogVisible = this.DialogVisible.value
    }

    // ===========================================================
    // Theme
    // ===========================================================
    setTheme() {
        this.themMode = this.theme.getModeString();
    }
    setLogoPath() {
        if (this.themMode == "light")
            this.LogoPath = "CityPulse.svg".getlogoSvg();
        else
            this.LogoPath = "CityPulseDark.svg".getlogoSvg();
    }

    // ===========================================================
    // 左側 START
    // ===========================================================
    LogoPath: string;
    LogoTitle: string = EnvUtils.getSysTitle();
    // 中 選單
    getMenuDatas() {
        return [];
    }
    // 下 System Menus
    getSystemMenuDatas() {
        return [];
    }
    getPopupMenuDatas() {
        return [];
    }

    // ===========================================================
    // TopBar
    // ===========================================================
    getLeftMenuDatas() {
        return [];
    }
    getRightMenuDatas() {
        return [];
    }

    // 選單的統一入口
    eventMenuClick(e: any, item: SidebarMenuItem, router: any) {
        if (item.path != null && item.path != '') {
            router.push(item.path)
        }
    }
    eventMenuRightClick(e: any, item: SidebarMenuItem, router: any) {

    }

    openChangeTenant(currentTenant: any, tenantList: Array<any>) {

    }

}

