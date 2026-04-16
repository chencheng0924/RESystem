import { EnvUtils } from "@/utils/envUtils";
import { ThemeSwitchController } from "@/components/smartcityui/STThemeMode.compsable";
import { SidebarMenuItem } from "../CSidebarMenu/SidebarMenu.model";
import { UILayoutBase } from "./UILayoutBase";
import { DrawerControllerView, DrawerFormDefinitionBase } from "@/lib/pageBuilder/common/DrawerForm";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageSection, PageSectionDialog, PageSectionForm } from "@/lib/pageBuilder/core/PageSection";
import { PageItem, PageItemSeverityStyle } from "@/lib/pageBuilder/enum/PageFormItemEnum";
import { PageSectionFactory } from "@/lib/pageBuilder/adapter/primevue.adapter";
import { PageView } from "@/lib/pageBuilder/core/PageView";
import { RecentListHistoryStore } from "@/stores/RecentList/RecentListHistoryStore";
import { UPPreferenceStore } from "@/stores/userProfilePreference/UPPreferenceStore";
import { Logincheck } from "@/service/Logincheck";
import { useGuestToken } from "@/stores/tokenStore";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { IGetListEx } from "@/lib/pageBuilder/interface/IGetList";
import { PageAction } from "@/lib/pageBuilder/core/PageAction";
import { PageTableActionEnum } from "@/lib/pageBuilder/enum/PageActionEnum";
import { PageEventBus, PageEventBusItem, PageEventEnum } from "@/lib/pageBuilder/mitt/PageEventBus";

export class SideBarAppBarNarrowController extends UILayoutBase {


    recentStore = RecentListHistoryStore()
    userStore = UPPreferenceStore()

    constructor() {
        super()

        this.customView = new CustomView()
    }
    // 中 選單
    getMenuDatas() {
        const menusItemResult = [
            new SidebarMenuItem({ label: "案件資料", path: "/demoHome", icon: 'ic_trend', key: "demoHome" }),
            new SidebarMenuItem({ label: "評價管理", path: "/demoRating", icon: 'ic_trend', key: "demoRating" }),
            new SidebarMenuItem({ label: "派工管理", path: "/demoRepair", icon: 'ic_trend', key: "demoRepair" }),
            new SidebarMenuItem({
                label: "管理頁面", path: "/demoManagement", icon: 'ic_trend', key: "demoManagement",
                children: [
                    new SidebarMenuItem({ label: "用戶管理", path: "/demoUserManagement", icon: 'ic_bell', key: "demoUserManagement" }),
                    new SidebarMenuItem({ label: "維修人員", path: "/demoRepairStaff", icon: 'ic_align_justify', key: "demoRepairStaff" }),
                    // new SidebarMenuItem({ label: "租戶角色", path: "/demoRoleManagement", icon: 'ic_align_justify', key: "demoRoleManagement" })
                ]

            }),
        ]

        return menusItemResult;
    }
    // 下 System Menus
    getSystemMenuDatas() {
        let sysMenus = [
            new SidebarMenuItem({ label: "Layout.Topbar.HelpCenter", path: "/HelpCenter", icon: 'ic_question', key: "HelpCenter" }),
            new SidebarMenuItem({ label: "Layout.Topbar.System_Message", path: "/SystemMessage", icon: 'ic_bell', key: "SystemMessage" }),
            new SidebarMenuItem({ label: "Layout.Topbar.System_Setting", path: "/SystemSetting", icon: 'ic_setting', key: "SystemSetting" })
        ];
        return sysMenus;

    }
    getPopupMenuDatas() {
        return [
            new SidebarMenuItem({ label: "Layout.Sidebar.Profile", path: "/UserProfile", icon: 'ic_people', key: "UserProfile" }),
            new SidebarMenuItem({ label: "Layout.Sidebar.Privacy_Policy", path: "/PrivacyPolicy", icon: 'ic_paper_lock', key: "PrivacyPolicy" }),
            new SidebarMenuItem({ label: "Layout.Sidebar.TermsOfService", path: "/TermsOfService", icon: 'ic_clipboard_list', key: "TermsOfService" }),
            new SidebarMenuItem({ label: "Layout.Sidebar.Logout", path: "/Logout", icon: 'ic_logout', key: "Logout" })

        ];
    }

    // 選單的統一入口
    eventMenuClick(e: any, item: SidebarMenuItem, router: any) {

        if (['HelpCenter', 'SystemMessage', 'SystemSetting'].includes(item.key)) {

            // this.builder.getInit("UILayoutBaseBuilder", "1");
            // this.builder.pageView.value.setDrawerData(item.key, "1", item.label);
            this.openHelpCenter(item.label);

            return;

        }
        else if (['Logout'].includes(item.key)) {
            // userProfile

            Logincheck.clearSessionStorage();
            let gToken = useGuestToken()
            gToken.guestToken = null;
            this.recentStore.clearHistory();
            this.userStore.setUserEntity(null);
            router.push('/login')

            return;
        }

        if (item.path != null && item.path != '') {
            router.push(item.path)
        }

    }
    eventMenuRightClick(e: any, item: SidebarMenuItem, router: any) {

    }

    openHelpCenter(label: string) {
        let items = [
            new PageFormItem({
                Field: "SystemLanguage",
                Name: "",
                Type: PageItem.SystemLanguage,
            }).SetRowIndex(1),
            new PageFormItem({
                Field: "ThemeSwtich",
                Name: "",
                Type: PageItem.ThemeSwitch,
            }).SetRowIndex(2),
        ]

        let formsSec = new PageSectionForm();
        formsSec.setTitle(label);
        formsSec.setItems(items)
            .setPath("ThemeSwtich")


        this.DrawerViewRef.value.DrawerSection = PageSectionFactory.toPrimVueComp(
            this.builder, this.customView, formsSec);
        this.DrawerViewRef.value.DrawerSection.update();
        this.OpenDrawer();
    }

    openChangeTenant(currentTenant: any, tenantList: Array<any>) {

        let items = [];
        items.push(new PageFormItem({
            Field: "fastDialogchangeTenants",
            Name: "", Id: "fastDialogchangeTenants", Value: currentTenant, Type: PageItem.RadioButton
        }).setList(tenantList))
        items = IGetListEx.setGetList(items, this.customView, null, "value");
        //PageFormItem.setOptionLabel(items, "fastDialogchangeTenants", "value");
        let formsSec = new PageSectionDialog();
        formsSec.setId("changeTenants")
        formsSec.setTitle('切換租戶');
        formsSec.setActions([

            new PageAction({ Type: PageTableActionEnum.TableCancel, Text: "Components.STForm.Cancel", Id: "cancel" })
                .setBtnStyle(false, false, PageItemSeverityStyle.CONTRAST),
            new PageAction({ Type: PageTableActionEnum.TableOk, Text: "Components.STForm.Confirm", Id: "ok" })
                .setBtnStyle(false, false, PageItemSeverityStyle.NONE),
        ]
        );
        formsSec.setItems(items);
        formsSec.SectionClass = 'pt-[28px] pb-[11px]'


        this.DialogViewRef.value.DialogSection = PageSectionFactory.toPrimVueComp(
            this.builder, this.customView, formsSec);
        this.DialogViewRef.value.DialogSection.Id = formsSec.generateUUID()
        this.OpenDialog();
    }

}

export class CustomView extends PageView {

    public async SetEvent_FormChange(e: any, currentSec: PageSection) {


        console.log(e)

    }
    public async SetEvent_DialogAction(action: PageAction, sec?: PageSection) {
        console.log("sec", sec)
        if (
            action.Type == PageTableActionEnum.TableOk

        ) {
            let activeTenant: BaseKeyValue = sec.FormOps.FormItems.firstOrDefault()?.Value;
            if (activeTenant == null) return;
            console.log("activeTenant", activeTenant)
            // let tokent = await this.userService.setChangeTenant(activeTenant.key);
            // if (tokent != null) {
            //     await this.tokenSvc.setToken(tokent);
            //     await this.setUserData();
            // }

            // this.reloadMenu.reloadKey++;
            // this.refresh();
            // window.location.reload();




        }
        PageEventBus.getInstance.triggerEvent(
            new PageEventBusItem().setEventName(PageEventEnum.PageDialogClose)
        );
    }

}