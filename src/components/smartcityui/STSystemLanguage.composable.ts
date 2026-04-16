import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";
import { ref, Ref } from "vue"



export class STSystemLanguage {



    public getLanguageList() {
        let list: Array<BaseKeyValue> = [];
        list.push(new BaseKeyValue({ key: 'English', value: 'en-US' }));
        list.push(new BaseKeyValue({ key: '繁體中文', value: 'zh-TW' }));
        list.push(new BaseKeyValue({ key: '简体中文', value: 'zh-CN' }));
        return list;
    }
}