
import { RMBDepartment } from "@/api/rbasic/model";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
export class DepartmentEntity extends BaseEntity implements RMBDepartment {

   id?: string;
   Title_id?: string = "ID"
   labelId?: string;
   Title_labelId?: string = "標籤"
   parentLabelId?: string;
   Title_parentLabelId?: string = "父階標籤"
   users?: Array<BaseKeyValue>;
   Title_users?: string = "群組用戶"
   name?: string;
   Title_name?: string = "群組名"
   tenantId?: string;
   Title_tenantId?: string = "租戶"


}