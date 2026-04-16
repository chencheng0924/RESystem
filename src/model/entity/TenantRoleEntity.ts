
import { RMBTenantRole } from "@/api/rbasic/model";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageTableColumn } from "@/lib/pageBuilder/core/PageTableColumn";
import { ITableColumnDefinition } from "@/lib/pageBuilder/interface/ITableColumnDefinition";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { DateExtension } from "@/utils/dateExtension";

export class TenantRoleEntity extends BaseEntity implements RMBTenantRole, ITableColumnDefinition {

   name?: string;
   Title_name?: string = "名稱"
   id?: string;
   tenantEntity?: BaseKeyValue;
   code?: string;
   Title_code?: string = "編碼"
   enable?: boolean;
   Title_enable?: string = "啟用"
   clients?: Array<BaseKeyValue>;
   Title_clients?: string = "Clients"
   creatorEntity?: BaseKeyValue;
   editorEntity?: BaseKeyValue;
   createdDate?: string;
   Title_modifiedDate?: string = "最後修改時間"
   client?: string;
   Title_client?: string = "客戶端 ID"
   Title_createdDate?: string = "創建時間"
   modifiedDate?: string;
   
   constructor(init?) {
      super();
      Object.assign(this, init);
   }

   getTableColumn(cols: Array<PageTableColumn>): Array<PageTableColumn> {
      let col = cols.forEach((x) => {
         if (x.Field == "clients") {
            x.setCellValue((col, data) => {
               let v: Array<any> = data[col.field];
               if (v == undefined || v == null || v.length === 0)
                  return "";
               return v.map(item => item.value).join(', ');
            }).setTypeInputText().setShowFilterCondition({ form: false, tableFilter: false });
         } else if (x.Field == "modifiedDate") {
            x.setCellValue((col, data) => {
               let v: string = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return DateExtension.getDateFormat(v)
            }).setTypeToggleSwitch().setShowFilterCondition({ tableColumn: false, form: false, tableFilter: false });
         } else if (x.Field == "enable") {
            x.setCellValue((col, data) => {
               let v: BaseKeyValue = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return v ? "是" : "否";
            }).setTypeToggleSwitch()
         } 
      });
      return cols;
   }

   getCondition(orgCondition: Array<PageFormItem>): Array<PageFormItem> {
      return orgCondition;
   }
}