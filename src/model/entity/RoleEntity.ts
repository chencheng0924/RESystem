
import { RMBRole } from "@/api/rbasic/model";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { ITableColumnDefinition } from "@/lib/pageBuilder/interface/ITableColumnDefinition";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageTableColumn } from "@/lib/pageBuilder/core/PageTableColumn";
import { DateExtension } from "@/utils/dateExtension";
export class RoleEntity extends BaseEntity implements RMBRole, ITableColumnDefinition {

   client?: string;
   Title_client?: string = "客戶端 ID"
   id?: string;
   code?: string;
   Title_code?: string = "編碼"
   name?: string;
   Title_name?: string = "名稱"
   enable?: boolean;
   Title_enable?: string = "啟用"
   menuFunctions?: Array<BaseKeyValue>;
   Title_menuFunctions?: string = "相關 選單功能"
   creatorEntity?: BaseKeyValue;
   editorEntity?: BaseKeyValue;
   modifiedDate?: string;
   Title_modifiedDate?: string = "最後修改時間"
   createdDate?: string;
   Title_createdDate?: string = "創建時間"

   constructor(init?) {
      super();
      Object.assign(this, init);
   }

   getTableColumn(cols: Array<PageTableColumn>): Array<PageTableColumn> {
      let col = cols.forEach((x) => {
         if (x.Field == "menuFunctions") {
            x.setCellValue((col, data) => {
               let v: Array<any> = data[col.field];
               if (v == undefined || v == null || v.length === 0)
                  return "";
               return v.map(item => item.value).join(', ');
            }).setTypeToggleSwitch()
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