import { BaseKeyValue } from "@/lib/pageBuilder/model/BaseKeyValue";

export class STListSelectProps {

    datas: Array<STListSelectItem> = [];
    selectAjax?: Function;

    constructor(init?: Partial<STListSelectProps>) {
        Object.assign(this, init);
    }

}

export class STListSelectEvent {
    constructor(init?: Partial<STListSelectEvent>) {
        Object.assign(this, init);
    }
    removeItem?: Function; //刪除項目
    change?: Function; // 變更值

}



export class STListSelectItem {

    NameKeyValue?: BaseKeyValue;
    EditorKeyValue?: BaseKeyValue;
    IsAvatar?: boolean = true
    IsShowListButton?: boolean = true;
    ListButtonIcon?: string = 'ic_arrow_down'

    constructor(init?) {
        Object.assign(this, init);
    }

    setEmpty() {
        this.NameKeyValue = new BaseKeyValue().setKey("-1").setValue("無可設定的成員");
        this.IsShowListButton = false
        return this;
    }
    getAvatar() {
        if (this.NameKeyValue?.value == null || this.NameKeyValue?.value == "")
            return "無";


        return this.NameKeyValue?.value?.charAt(0)
    }
    setUpIcon() {
        this.ListButtonIcon = "ic_arrow_up";
    }
    setDownIcon() {
        this.ListButtonIcon = "ic_arrow_down";
    }
}