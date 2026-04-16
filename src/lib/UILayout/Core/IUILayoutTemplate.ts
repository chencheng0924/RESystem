import { PageBuilder } from "@/lib/pageBuilder/base/PageBuilder";
import { SidebarMenuItem } from "../CSidebarMenu/SidebarMenu.model";

export interface IUILayoutTemplate {
    // 左側 START============================
    // 上 logo
    LogoPath: string;
    LogoTitle: string;
    // 中 選單
    getMenuDatas();
    // 下 System Menus
    getSystemMenuDatas();
    getPopupMenuDatas();
    // 左側 END============================
    // 上 topbar
    getLeftMenuDatas();
    getRightMenuDatas();


    eventMenuClick(e: any, item: SidebarMenuItem, router: any);
    eventMenuRightClick(e: any, item: SidebarMenuItem, router: any);

    builder?: PageBuilder

}