import { ref, Ref } from "vue";
import { STFormItem } from '@/components/smartcityui/STForm.model';



export class STForgetPassWord {

    public formItems: Array<STFormItem>;

    constructor(init?: Partial<STForgetPassWord>) {
        Object.assign(this, init);
    }

    setFormItems(items: Array<STFormItem>) {
        this.formItems = items;
        return this;
    }

}