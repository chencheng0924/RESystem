import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";

export class CityEntity extends BaseEntity {

   id?: string;
   countyCode?: string;
   Title_countyCode?: string = "Open Data 的縣市編號"
   name?: string;
   Title_name?: string = "名稱"


   constructor(init?) {
      super();
      Object.assign(this, init);
   }
}