import { PageBuilder } from "@/lib/pageBuilder/base/PageBuilder";
import { PageSection } from "@/lib/pageBuilder/core/PageSection";
import { PageView } from "@/lib/pageBuilder/core/PageView";

export interface IPageCustom {
    // 取得元件實例
    getComponent();
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection;
}