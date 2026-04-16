
import { PageFormItem } from "@/lib/pageBuilder/core/PageFormItem";
import { BaseEntityServie } from '@/lib/pageBuilder/service/BaseEntity.Service';
import { BaseResponseCode } from '@/lib/pageBuilder/service/BaseResponseCode';
import { EnvUtils } from "@/utils/envUtils";
let baseUrl = EnvUtils.getRaiPath()
let clientID = EnvUtils.getClientId();
export class MarkdownEditorService extends BaseEntityServie {
    getReplacements(){
        return this.api.rai.AIPrompt.CustomList.getReplacements().then((res) =>{
            if (res.status != BaseResponseCode.SUCCESS)
                return [];
            let datas = res.data
            return datas;
        }).catch((error) => {
            return [];
        });
    }
}