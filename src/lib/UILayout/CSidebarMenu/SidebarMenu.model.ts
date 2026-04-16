import { STAction } from "@/components/smartcityui/STCommon.model";

export class SidebarMenuProps {

    constructor(init?: Partial<SidebarMenuProps>) {
        Object.assign(this, init);
    }

}


export class SidebarMenuEvent {
    constructor(init?: Partial<SidebarMenuEvent>) {
        Object.assign(this, init);
    }
    eventActionBtn?: Function;

}





export class SidebarMenuItem {
    key?: string;
    path?: string;// 頁面路徑 e.g. /Home
    isActive?: boolean;
    label?: string
    icon?: string;

    isCanAdd?: string// 右側是否有 New btn
    AddTooltip?: string = "新增"

    children?: Array<SidebarMenuItem> // 子選單
    isChildrenPopup?: boolean = false;//子選單是否往右側彈出 , 預設是往下展開  ic_arrow_right
    isChildren?: boolean = false;
    isChildrenCollapsed?: boolean = false;// 預設展開
    childrenIcon?: string = 'ic_arrow_up';// 向上 , ic_arrow_up

    currentSelectKey?: string;

    isGroupTitle?: boolean = false

    constructor(init?) {
        Object.assign(this, init);
        if (this.children != undefined && this.children != null && this.children.length > 0) {
            this.isChildren = true;
        }
        else {
            this.isChildren = false;
        }
    }

    getClass(currentCollapsed: boolean) {
        return [
            'flex items-center hover:text-fonePrimaryMain hover:bg-fonePrimaryBg rounded cursor-pointer',
            {
                'bg-fonePrimaryBg text-fonePrimaryMain': this.isActive,
                'justify-center px-[12px] py-[5px] my-1': currentCollapsed,
                'px-[12px] py-[5px] gap-2': !currentCollapsed
            }
        ];

    }

    getAddTooltip() {
        return this.isCanAdd ? '新增' : ''
    }

    switchChildrenIcon() {
        if (this.isChildrenPopup) {
            this.childrenIcon = "ic_arrow_right";
            return this;
        }

        if (this.isChildrenCollapsed) {
            this.childrenIcon = 'ic_arrow_down';
        }
        else {
            this.childrenIcon = 'ic_arrow_up';
        }

        return this;
    }

    setChildrenPopup(isChildrenPopup: boolean = true) {
        this.isChildrenPopup = isChildrenPopup;
        this.isChildrenCollapsed = true;// 預設收闔
        this.switchChildrenIcon();
        return this;
    }
    getChildrenActive(selectMenuKety: string) {
        if (this.isChildren == false) {
            return false;
        }

        if (this.key == selectMenuKety)
            return true;
        else
            return false;

    }
    setActive() {
        if (this.currentSelectKey == this.key)
            this.isActive = true;
        else
            this.isActive = false;

    }

    toSTAction() {
        return new STAction({ Id: this.key, Tooltip: this.label, Icon: this.icon, Url: this.path })
    }
}