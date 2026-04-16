import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";
import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";

export class DriverEntity extends BaseEntity {
   id?: string;
   ebmDriverTypeEntity?: BaseKeyValue;
   name?: string;
   mobile?: string;
   eMail?: string;
   gender?: any;
   password?: string;
   ebmBusStationEntity?: BaseKeyValue;
   UsrEntity?: any;
   code?: string
   userCode?: string
   constructor(init?) {
      super();
      Object.assign(this, init);
   }
}