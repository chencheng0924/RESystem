import { PageSecurityItem } from "@/lib/pageBuilder/core/PageSecurityItem";
import { PageSecurityType } from "@/lib/pageBuilder/enum/PageSecurityType";
import { SidebarMenuItem } from "@/lib/UILayout/CSidebarMenu/SidebarMenu.model";

export class MenuService {

    private storeCustomMenuKey = "customMenu";
    menus? = [

    ];

    getSideIconMenus() {
        return [];
    }

    private getMenuItemConfig(key: string): { icon: string; isCanAdd: boolean } {
        const menuConfigMap: { [key: string]: { icon: string; isCanAdd: boolean } } = {
            'AIHome': { icon: 'ic_trend', isCanAdd: false },
            'PlatformChart': { icon: 'ic_chart_column', isCanAdd: false },
            'Dashboard': { icon: 'ic_chart_line', isCanAdd: false },
            'AIProject': { icon: 'ic_rocket', isCanAdd: false },
            'AIAgent': { icon: 'ic_flag', isCanAdd: false },
            'AISummary': { icon: 'ic_message', isCanAdd: false },
            'AIFlow': { icon: 'ic_diagram_project', isCanAdd: false },
            'AIChatGroup': { icon: 'ic_people', isCanAdd: false },
            'AIProxy': { icon: 'ic_sitemap', isCanAdd: false },
            'AIBatchChatAgentInfo': { icon: 'ic_message_add', isCanAdd: false },
            'AIChatFeedback': { icon: 'ic_message_like', isCanAdd: false },
            'AIPlugin': { icon: 'ic_toolbox', isCanAdd: false },
            'AIMcpPlugin': { icon: 'ic_cctv', isCanAdd: false },
            'AILibrary': { icon: 'ic_book', isCanAdd: false },
            'AIPrompt': { icon: 'ic_brain_circuit', isCanAdd: false },
            'AIPlanner': { icon: 'ic_route', isCanAdd: false },
            'AITool': { icon: 'ic_wand_sparkles', isCanAdd: false },
            'AILLMModel': { icon: 'ic_squares_exclude', isCanAdd: false },
            'AIEmbeddingModel': { icon: 'ic_insrtuction', isCanAdd: false },
            'AIVectorDb': { icon: 'ic_columns_4', isCanAdd: false },
            'AITag': { icon: 'ic_siren_fill', isCanAdd: false },
            'AIPromptTemplate': { icon: 'ic_clipboard_list', isCanAdd: false },
            'Usr': { icon: 'ic_paper_person', isCanAdd: false },
            'TenantRole': { icon: 'ic_person_setting', isCanAdd: false },
            'AITenantParameter': { icon: 'ic_setting_2', isCanAdd: false },
            'AIChatRoom': { icon: 'ic_layers', isCanAdd: false },
            'AIChatRoomNode': { icon: 'ic_setting_3', isCanAdd: false },
            'AIAgentFunctionUsage': { icon: 'ic_setting_2', isCanAdd: false },
            'Client': { icon: 'ic_tips', isCanAdd: false },
            'Tenant': { icon: 'ic_person_move', isCanAdd: false },
            'AIMenuScope': { icon: 'ic_align_setting', isCanAdd: false },
            'Role': { icon: 'ic_window', isCanAdd: false },
            'AILoginLink': { icon: 'ic_cursor', isCanAdd: false },
            'AISystemBulletin': { icon: 'ic_lightbulb', isCanAdd: false },
            'AIHelpContent': { icon: 'ic_question', isCanAdd: false }
        };

        // 返回預設值
        return menuConfigMap[key] || { icon: 'ic_sitemap', isCanAdd: false };
    }
    private setDefaultPinnedMenus() {
        // 預設釘選「首頁」
        let homeItem = [
            {
                "label": "Layout.Menu.Home",
                "path": "/",
                "key": "Home",
                "parentId": "",
                "sort": 1,
                "id": "3188492717166590",
                "icon": "ic_trend",
                "isCanAdd": false
            }
        ];
        // 立即儲存到 localStorage
        localStorage.setItem(this.storeCustomMenuKey, JSON.stringify(homeItem));
    }


    async getMenus() {

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


        // 從 localStorage 的 customMenu 讀取常用選單
        let customMenu = localStorage.getItem(this.storeCustomMenuKey);
        let customMenuData: any[] = [];

        // 如果 localStorage 沒有資料，設定預設的常用選單（首頁）
        if (customMenu == null || customMenu.length == 2) {
            this.setDefaultPinnedMenus();
            customMenu = localStorage.getItem(this.storeCustomMenuKey);
        }

        customMenuData = JSON.parse(customMenu);

        // 取得已釘選項目的 ID 列表
        const pinnedIds = customMenuData.map((item: any) => item.id);

        // 從所有選單中過濾掉已釘選的項目
        const filteredMenus = menusItemResult.map((menu: any) => {
            if (menu.children && Array.isArray(menu.children)) {
                return {
                    ...menu,
                    children: menu.children.filter((child: any) => !pinnedIds.includes(child.id))
                };
            }
            return menu;
        });

        // 將「首頁」項目添加回選單頂部
        const home = {
            "children": [
                {
                    "label": "Layout.Menu.Home",
                    "path": "/",
                    "key": "Home",
                    "parentId": "",
                    "sort": 1,
                    "id": "3188492717166590",
                    "icon": "ic_trend",
                    "isCanAdd": false
                },


            ],
        }
        filteredMenus.unshift(home);

        // 為 children 陣列中的物件添加 icon 欄位
        // const menusWithIcons = this.addIconsToMenuChildren(filteredMenus)
        return menusItemResult
    }

}