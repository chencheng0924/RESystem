import { PageSecurityItem } from "../../lib/pageBuilder/core/PageSecurityItem";
import { PageSectionType } from "../../lib/pageBuilder/enum/PageSectionType";
import { PageSecurityType } from "../../lib/pageBuilder/enum/PageSecurityType";
import { IPageSecurity } from "../../lib/pageBuilder/interface/IPageSecurity";

export class PageSecurityEBMDriver implements IPageSecurity {
    getSecurity() {
        let searchSecurity = { type: PageSecurityType.SEARCH, entityType: "EBMDriver" }
        let s = [
            new PageSecurityItem(searchSecurity).setAllPageSectionEdit(true),

            //-----------------------------
            // 查詢頁
            new PageSecurityItem(searchSecurity).setDepartment("30465081360629760")//測試
                .setAllPageSectionEdit(false),

        ];

        s.forEach((x, index) => {
            x.setSeq(index);
        })

        return s;
    }
}