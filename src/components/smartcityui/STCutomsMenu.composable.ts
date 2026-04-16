import { ReloadStore } from "@/stores/reloadStore";
import { ref, Ref } from "vue"
import { MenuService } from '@/service/MenuService';

export class CutomsMenuController {
    private static instance: CutomsMenuController;
    private storeCustomMenuKey = "customMenu";
    public customMenu: Ref<string>;
    public menus: Ref<Array<any>> = ref<Array<any>>([]);
    public menuService: MenuService = new MenuService();
    public model = ref([]);

    constructor() {
        this.customMenu = ref<string>("");
        this.initCustomMenu()
    }

    // 單例模式：取得唯一實例
    public static getInstance(): CutomsMenuController {
        if (!CutomsMenuController.instance) {
            CutomsMenuController.instance = new CutomsMenuController();
        }
        return CutomsMenuController.instance;
    }

    private initCustomMenu() {
        this.getPinnedMenusByLocalStorage();
    }

    public getPinnedMenusByLocalStorage() {

        const menu = localStorage.getItem(this.storeCustomMenuKey);
        try {
            const parsedMenu = JSON.parse(menu);
            this.menus.value = Array.isArray(parsedMenu) ? parsedMenu : [];
            return this.menus.value;
        } catch (error) {
            // 解析失敗也設定預設選單
            this.setDefaultPinnedMenus();
            return this.menus.value;
        }
    }

    private setDefaultPinnedMenus() {
        // 預設釘選「首頁」
        this.menus.value = [
            {
                "label": "Layout.Menu.Home",
                "path": "/",
                "key": "AIHome",
                "parentId": "31884927171600380",
                "sort": 1,
                "id": "3188492717166590",
                "icon": "ic_trend",
                "isCanAdd": false
            }
        ];
        this.setCustomMenuByLocalStorage();
    }

    private setCustomMenuByLocalStorage() {
        localStorage.setItem(this.storeCustomMenuKey, JSON.stringify(this.menus.value));
    }

    // 從 model 中移除指定項目
    private removeItemFromModel(itemId: string) {
        this.model.value.forEach((menu: any) => {
            if (menu.children && Array.isArray(menu.children)) {
                menu.children = menu.children.filter((child: any) => child.id !== itemId);
            }
        });
    }

    // 將項目加回 model 的 children 中
    private addItemBackToModel(item: any) {
        this.model.value.forEach((menu: any) => {
            // 根據 parentId 找到該項目原本所屬的父選單
            if (menu.id === item.parentId) {
                // 檢查是否已存在，避免重複
                const exists = menu.children && menu.children.some((child: any) => child.id === item.id);
                if (!exists) {
                    if (!menu.children) {
                        menu.children = [];
                    }
                    menu.children.push(item);
                }
            }
        });
    }

    // 初始化時過濾掉已在常用選單中的項目
    public filterPinnedItemsFromModel() {
        const pinnedIds = this.menus.value.map((menu: any) => menu.id);
        this.model.value.forEach((menu: any) => {
            if (menu.children && Array.isArray(menu.children)) {
                menu.children = menu.children.filter((child: any) => !pinnedIds.includes(child.id));
            }
        });
    }

    public addMenu(item: any) {
        // 檢查項目是否已存在
        const existingIndex = this.menus.value.findIndex((menu: any) => menu.id === item.id);

        if (existingIndex === -1) {
            // 如果不存在，加入陣列
            this.menus.value.push(item);
        }

        // 從 model 過濾掉已加入的項目
        this.removeItemFromModel(item.id);
    }

    public removeMenu(item: any) {
        const index = this.menus.value.findIndex((menu: any) => menu.id === item.id);

        if (index !== -1) {
            // 從陣列移除項目
            const removedItem = this.menus.value.splice(index, 1)[0];

            // 將項目加回 model 的 children 中
            this.addItemBackToModel(removedItem);
        }
    }

    public async saveChanges() {
        // 使用單例實例來確保資料一致性
        const instance = CutomsMenuController.getInstance();
        instance.setCustomMenuByLocalStorage();
    }

    public resetCustomMenu() {
        // 使用單例實例來確保資料一致性
        const instance = CutomsMenuController.getInstance();

        // 從 localStorage 重新載入原始數據
        const menu = localStorage.getItem(instance.storeCustomMenuKey);
        const originalMenus = menu ? JSON.parse(menu) : [];

        // 取得當前在記憶體中的選單 ID
        const currentMenuIds = instance.menus.value.map((m: any) => m.id);

        // 取得原始選單 ID
        const originalMenuIds = originalMenus.map((m: any) => m.id);

        // 找出被移除的項目（在當前但不在原始）
        const removedItems = instance.menus.value.filter((m: any) => !originalMenuIds.includes(m.id));

        // 將被移除的項目加回 model.children
        removedItems.forEach((removedItem: any) => {
            instance.model.value.forEach((menu: any) => {
                if (menu.id === removedItem.parentId) {
                    const exists = menu.children.some((child: any) => child.id === removedItem.id);
                    if (!exists) {
                        menu.children.push(removedItem);
                    }
                }
            });
        });

        // 找出被加入的項目（在原始但不在當前）
        const addedItems = originalMenus.filter((m: any) => !currentMenuIds.includes(m.id));

        // 將被加入的項目從 model.children 移除
        addedItems.forEach((addedItem: any) => {
            instance.model.value.forEach((menu: any) => {
                if (menu.children && Array.isArray(menu.children)) {
                    menu.children = menu.children.filter((child: any) => child.id !== addedItem.id);
                }
            });
        });

        // 恢復原始選單
        instance.menus.value = originalMenus;

        console.log("已重置釘選選單:", instance.menus.value)
    }

}