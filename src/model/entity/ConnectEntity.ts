import { ChangeTenantConnectgetRequest } from "@/api/ridp/model";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";

export class ConnectEntity extends BaseEntity implements ChangeTenantConnectgetRequest {
   tenantId?:string;
   Title_tenantId?:string="租戶ID"
   

 constructor(init?) {
      super();
      Object.assign(this, init);
   }
}