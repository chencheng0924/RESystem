import { RMBTenant } from "@/api/rbasic/model";
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { PageTableColumn } from "@/lib/pageBuilder/core/PageTableColumn";
import { ITableColumnDefinition } from "@/lib/pageBuilder/interface/ITableColumnDefinition";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { DateExtension } from "@/utils/dateExtension";

export class TenantEntity extends BaseEntity implements RMBTenant, ITableColumnDefinition {

   name?: string;
   Title_name?: string = "名稱"
   id?: string;
   tenantRoles?: Array<BaseKeyValue>;
   Title_tenantRoles?: string = "相關租戶角色管理"
   securityGroups?: Array<BaseKeyValue>;
   Title_securityGroups?: string = "相關權限群組"
   appProducts?: Array<BaseKeyValue>;
   Title_appProducts?: string = "相關應用產品"
   creatorEntity?: BaseKeyValue;
   editorEntity?: BaseKeyValue;
   createdDate?: string;
   Title_createdDate?: string = "創建時間"
   modifiedDate?: string;
   Title_modifiedDate?: string = "最後修改時間"
   client?: string;
   Title_client?: string = "客戶端 ID"
   isPublic?: boolean;
   Title_isPublic?: string = "是否公開給非租戶用戶"

   constructor(init?) {
      super();
      Object.assign(this, init);
   }

   getTableColumn(cols: Array<PageTableColumn>): Array<PageTableColumn> {
      let col = cols.forEach((x) => {
         if (x.Field == "isPublic") {
            x.setCellValue((col, data) => {
               let v: BaseKeyValue = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return v ? "是" : "否";
            }).setTypeToggleSwitch()
         }  else if (x.Field == "createdDate") {
            x.Title = '建立時間'
            x.setCellValue((col, data) => {
               let v: string = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return DateExtension.getDateFormat(v)
            }).setTypeToggleSwitch().setShowFilterCondition({ form: false, tableFilter: false });
         }  else if (x.Field == "modifiedDate") {
            x.setCellValue((col, data) => {
               let v: string = data[col.field];
               if (v == undefined || v == null)
                  return "";
               return DateExtension.getDateFormat(v)
            }).setTypeToggleSwitch().setShowFilterCondition({ tableColumn: false, form: false, tableFilter: false });
         }  else if(x.Field == 'tenantRoles'){
            x.setCellValue((col, data) => {
               let v: Array<any> = data[col.field];
               if (v == undefined || v == null || v.length === 0)
                  return "";
               return v.map(item => item.value).join(', ');
            }).setTypeMultiSelect().setShowFilterCondition({ tableFilter: false });
         } else if(x.Field == 'securityGroups'){
            x.setCellValue((col, data) => {
               let v: Array<any> = data[col.field];
               if (v == undefined || v == null || v.length === 0)
                  return "";
               return v.map(item => item.value).join(', ');
            }).setTypeInputText().setShowFilterCondition({ form: false, tableFilter: false });
         } else if(x.Field == 'appProducts'){
            x.setCellValue((col, data) => {
               let v: Array<any> = data[col.field];
               if (v == undefined || v == null || v.length === 0)
                  return "";
               return v.map(item => item.value).join(', ');
            }).setTypeInputText().setShowFilterCondition({ form: false, tableFilter: false });
         } 
      });
      return cols;
   }

   getCondition(orgCondition: Array<PageFormItem>): Array<PageFormItem> {
      return orgCondition;
   }
}