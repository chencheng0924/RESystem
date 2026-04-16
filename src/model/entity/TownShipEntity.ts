import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";

export class TownShipEntity extends BaseEntity {

   id?: string;
   cityEntity?: any;
   townCode?: string;
   Title_townCode?: string = "Open data 的 town code"
   name?: string;
   Title_name?: string = "名稱"


   constructor(init?) {
      super();
      Object.assign(this, init);
   }
}