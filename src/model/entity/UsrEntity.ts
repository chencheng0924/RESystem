// import { RMBUsrUserSettingEntity, RMBUsrLanguageEntity, RMAUsr } from "@/api/rbasicApi";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { ITableColumnDefinition } from "@/lib/pageBuilder/interface/ITableColumnDefinition";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageTableColumn } from "@/lib/pageBuilder/core/PageTableColumn";
import { RMBUsr } from "@/api/rbasic/model";

export class UsrEntity extends BaseEntity implements RMBUsr, ITableColumnDefinition {//implements RMAUsr

   id?: string;
   Title_id?: string = "id"
   // userSettingEntity?: RMBUsrUserSettingEntity;
   // languageEntity?: RMBUsrLanguageEntity;
   tenants?: Array<BaseKeyValue>;
   Title_tenants?: string = "租戶"
   roles?: Array<BaseKeyValue>;
   Title_roles?: string = "平台角色"
   tenantRoles?: Array<BaseKeyValue>;
   Title_tenantRoles?: string = "租戶角色"
   securityGroups?: Array<BaseKeyValue>;
   Title_securityGroups?: string = "群組"
   name?: string;
   Title_name?: string = "名稱"
   gender?: string;
   Title_gender?: string = "性別"
   birthDay?: string;
   Title_birthDay?: string = "生日"

   account?: string;//帳號

   departments?: Array<BaseKeyValue>;

   constructor(init?) {
      super();
      Object.assign(this, init);
   }

   getDepartmentsByOne() {
      // return '30465081360629760' // 測試用
      if (this.securityGroups == null || this.securityGroups.length == 0)
         return "";

      return this.securityGroups.firstOrDefault()?.key;
   }

   getTableColumn(cols: Array<PageTableColumn>): Array<PageTableColumn> {
      let col = cols.forEach((x) => {
         if (x.Field == "tenants") {
            x.setCellValue((col, data) => {
               let v: BaseKeyValue = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return v.value;
            }).setTypeMultiSelect()
         }
      });
      return cols;
   }

   getCondition(orgCondition: Array<PageFormItem>): Array<PageFormItem> {
      return orgCondition;
   }

}