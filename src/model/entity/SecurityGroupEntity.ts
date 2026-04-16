import { RMBSecurityGroup } from "@/api/rbasic/model";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";

export class SecurityGroupEntity extends BaseEntity implements RMBSecurityGroup {

   id?:string;
code?:string;
Title_code?:string="編碼"
clientId?:string;
Title_clientId?:string="用戶的唯一ID"
tenantEntity?:any;
users?:Array<BaseKeyValue>;
Title_users?:string="相關用戶"
menuFunctions?:Array<BaseKeyValue>;
Title_menuFunctions?:string="相關三階功能"
clients?:Array<BaseKeyValue>;
Title_clients?:string="Clients"
creatorEntity?:any;
editorEntity?:any;
createdDate?:string;
Title_createdDate?:string="創建時間"
client?:string;
Title_client?:string="創建客戶端"
modifiedDate?:string;
Title_modifiedDate?:string="最後修改時間"
name?:string;
Title_name?:string="名稱"


 constructor(init?) {
      super();
      Object.assign(this, init);
   }
}