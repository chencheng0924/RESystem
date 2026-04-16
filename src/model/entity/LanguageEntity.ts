
import { RMBLanguage } from "@/api/rbasic/model";
import { BaseEntity } from "@/lib/pageBuilder/model/BaseEntity";


export class LanguageEntity extends BaseEntity implements RMBLanguage {

   id?: string;
   code?: string;

   enable?: boolean;

   name?: string;
   Title_name?: string = "名稱"
   Title_code?: string = "語系編碼"
   Title_enable?: string = "啟用"

   test?: string;
   Title_test?: string = "測試"
}