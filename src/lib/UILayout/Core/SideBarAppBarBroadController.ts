import { SidebarMenuItem } from "../CSidebarMenu/SidebarMenu.model";
import { UILayoutBase } from "./UILayoutBase";
import { PageSectionFactory } from "@/lib/pageBuilder/adapter/primevue.adapter";
import { PageAction } from "@/lib/pageBuilder/core/PageAction";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageSectionForm, PageSectionDialog, PageSection } from "@/lib/pageBuilder/core/PageSection";
import { PageView } from "@/lib/pageBuilder/core/PageView";
import { PageTableActionEnum } from "@/lib/pageBuilder/enum/PageActionEnum";
import { PageItem, PageItemSeverityStyle } from "@/lib/pageBuilder/enum/PageFormItemEnum";
import { IGetListEx } from "@/lib/pageBuilder/interface/IGetList";
import { PageEventBus, PageEventBusItem, PageEventEnum } from "@/lib/pageBuilder/mitt/PageEventBus";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { Logincheck } from "@/service/Logincheck";
import { RecentListHistoryStore } from "@/stores/RecentList/RecentListHistoryStore";
import { useGuestToken } from "@/stores/tokenStore";
import { UPPreferenceStore } from "@/stores/userProfilePreference/UPPreferenceStore";

export class SideBarAppBarBroadController extends UILayoutBase {


    recentStore = RecentListHistoryStore()
    userStore = UPPreferenceStore()

    constructor() {
        super()

        this.customView = new CustomView()
        this.DrawerViewRef.value.IsMode = true;
    }
    // 中 選單
    getMenuDatas() {
        const menusItemResult = [
            new SidebarMenuItem({ label: "決策中心", path: "/DecisionCenter", icon: 'ic_trend', key: "DecisionCenter" }),
            new SidebarMenuItem({ label: "城市指揮中心", path: "/CityCommandCenter", icon: 'ic_chart_line', key: "CityCommandCenter" }),
            new SidebarMenuItem({
                label: "即時數據管理", path: "/RealtimeDataManagement", icon: 'ic_trending_up', key: "RealtimeDataManagement",
                children: [
                    new SidebarMenuItem({ label: "事件通知", path: "/EventNotification", icon: 'ic_bell', key: "EventNotification" }),
                    new SidebarMenuItem({ label: "大型活動", path: "/LargeEvents", icon: 'ic_align_justify', key: "LargeEvents" })
                ]

            }),
            new SidebarMenuItem({ label: "系統管理類", key: "Sys", isGroupTitle: true }),
            new SidebarMenuItem({ label: "檔案管理", path: "/FilesManagement", icon: 'ic_file', key: "FilesManagement" }),
            new SidebarMenuItem({
                label: "代理人管理", path: "/AgentManagement", icon: 'ic_bot_setting', key: "AgentManagement",
                children: [
                    new SidebarMenuItem({ label: "代理人清單", path: "/AgentList", icon: 'ic_insrtuction', key: "AgentList" }),
                    new SidebarMenuItem({ label: "對話歷史記錄", path: "/AgentChatHistory", icon: 'ic_message', key: "AgentChatHistory" })
                ]

            }),
            new SidebarMenuItem({
                label: "系統管理", path: "/SystemManagement", icon: 'ic_align_setting', key: "SystemManagement",
                children: [
                    new SidebarMenuItem({ label: "用戶管理", path: "/UserManagement", icon: 'ic_person_setting', key: "UserManagement" }),
                    new SidebarMenuItem({ label: "租戶角色", path: "/RoleManagement", icon: 'ic_people', key: "RoleManagement" }),
                    new SidebarMenuItem({ label: "系統通知", path: "/SystemNotification", icon: 'ic_squares_exclude', key: "SystemNotification" }),
                    new SidebarMenuItem({ label: "選單管理", path: "/MenusManagement", icon: 'ic_grid', key: "MenusManagement" }),
                    new SidebarMenuItem({ label: "審計日誌", path: "/LogManagement", icon: 'ic_archive', key: "LogManagement" }),
                ]

            }),
            new SidebarMenuItem({
                label: "對話記錄", path: "/MyChatHistory", icon: 'ic_message_undo', key: "MyChatHistory",
                children: [
                    new SidebarMenuItem({ label: "XXXXXXXX中山路口", path: "/h1", key: "h1" }),
                    new SidebarMenuItem({ label: "XXXXXXXX中山路口", path: "/h2", key: "h2" })
                ]

            }),
        ]


        return menusItemResult;
    }

    getRightMenuDatas() {
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