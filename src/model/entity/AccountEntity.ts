
import { RMBAccount } from "@/api/rbasic/model";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageTableColumn } from "@/lib/pageBuilder/core/PageTableColumn";
import { ITableColumnDefinition } from "@/lib/pageBuilder/interface/ITableColumnDefinition";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { DateExtension } from "@/utils/dateExtension";

export class AccountEntity extends BaseEntity implements RMBAccount, ITableColumnDefinition {

   id?: string;
   userEntity?: BaseKeyValue;
   Title_userEntity?: string = "使用者"
   ssoProviderEntity?: BaseKeyValue;
   type?: string;
   Title_type?: string = "帳號的類別"
   ssoName?: string;
   Title_ssoName?: string = "SSO 取得的名稱"
   name?: string;
   Title_name?: string = "名稱"
   isValidate?: boolean;
   Title_isValidate?: string = "已驗證"

   constructor(init?) {
      super();
      Object.assign(this, init);
   }

   getTableColumn(cols: Array<PageTableColumn>): Array<PageTableColumn> {
      let col = cols.forEach((x) => {
         if (x.Field == "isValidate") {
            x.setCellValue((col, data) => {
               let v: BaseKeyValue = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return v ? "是" : "否";
            }).setTypeToggleSwitch()
         } else if (x.Field == "userEntity") {
            x.setCellValue((col, data) => {
               let v: BaseKeyValue = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return v.value
            }).setTypeInputText().setShowFilterCondition({ tableFilter: false });
         }
      });
      return cols;
   }

   getCondition(orgCondition: Array<PageFormItem>): Array<PageFormItem> {
      return orgCondition;
   }
}