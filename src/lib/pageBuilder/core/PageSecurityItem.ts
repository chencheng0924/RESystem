import { PageSectionType } from "../enum/PageSectionType";
import { PageSecurityType } from "../enum/PageSecurityType";
import { PageType } from "../enum/PageType";

export class PageSecurityItemBase {
    type?: PageSecurityType = PageSecurityType.VIEW;
    userId?: string;
    entityType?: string;
    tenantRoleId?: string;
    roleId?: string;
    tenantId?: string = '';
    status?: string;
    department?: string
    seq?: number = 0;
    pathId?: string// 哪一個 sec

    setType(type?: PageSecurityType) {
        this.type = type;
        return this;
    }
    setUserId(userId?: string) {
        this.userId = userId;
        return this;
    }
    setEntityType(entityType?: string) {
        this.entityType = entityType;
        return this;
    }
    setTenantRoleId(tenantRoleId?: string) {
        this.tenantRoleId = tenantRoleId;
        return this;
    }
    setRoleId(roleId?: string) {
        this.roleId = roleId;
        return this;
    }
    setTenantId(tenantId?: string) {
        this.tenantId = tenantId;
        return this;
    }
    setDepartment(department?: string) {
        this.department = department;
        return this;
    }
    setStatus(status?: string) {
        this.status = status;
        return this;
    }
    setSeq(seq?: number) {
        this.seq = seq;
        return this;
    }
    setPathId(pathId?: string) {
        this.pathId = pathId;
        return this;
    }

    isDepartmentNullAndspecial(dep: string) {
        if (this.department == null)
            return true;


        if (this.department == dep)
            return true;

        return false;
    }
    isStatusNullAndspecial(status: string) {
        if (this.status == null)
            return true;


        if (this.status == status)
            return true;

        return false;
    }

    convertToPageSecurityType(ptype: PageType) {
        if (ptype == PageType.VIEW)
            this.type = PageSecurityType.VIEW
        else if (ptype == PageType.SEARCH)
            this.type = PageSecurityType.SEARCH

        return this;
    }
}


export class PageSecurityItem extends PageSecurityItemBase {


    public sectionType?: PageSectionType;
    public edit?: boolean = true;

    public toolbarActionIds?: Array<string> = []; // menubar 
    public tabExcludeActionIds?: Array<string> = []; // tabs 預設全開

    public formItemExcludeFields?: Array<string> = [];//控制form  在個別鎖

    public tableToolbarExcludeActionIds?: Array<string> = [];
    public tableRowExcludeActionIds?: Array<string> = [];

    public uploadContentExcludeActions?: Array<string> = [];
    public uploadTableRowExcludeActions?: Array<string> = [];
    public isUpload?: boolean;

    public allPageSectionEdit?: boolean = true;
    public menuExcludes?: Array<string> = [];

    constructor(init?) {
        super();
        Object.assign(this, init);
    }
    setAllPageSectionEdit(allPageSectionEdit: boolean) {
        this.allPageSectionEdit = allPageSectionEdit;
        return this;
    }
    setSectionType(secType: PageSectionType) {
        this.sectionType = secType;
        return this;
    }
    setEdit(edit: boolean) {
        this.edit = edit;
        return this;
    }
    setToolbarActionIds(toolbarActionIds: Array<string>) {
        this.toolbarActionIds = toolbarActionIds;
        return this;
    }
    setTabExcludeActionIds(tabExcludeActionIds: Array<string>) {
        this.tabExcludeActionIds = tabExcludeActionIds;
        return this;
    }
    setFormItemExcludeFields(formItemExcludeFields: Array<string>) {
        this.formItemExcludeFields = formItemExcludeFields;
        return this;
    }
    setTableToolbarExcludeActionIds(tableToolbarExcludeActionIds: Array<string>) {
        this.tableToolbarExcludeActionIds = tableToolbarExcludeActionIds;
        return this;
    }
    setTableRowExcludeActionIds(tableRowExcludeActionIds: Array<string>) {
        this.tableRowExcludeActionIds = tableRowExcludeActionIds;
        return this;
    }
    setUploadContentExcludeActions(uploadContentExcludeActions: Array<string>) {
        this.uploadContentExcludeActions = uploadContentExcludeActions;
        return this;
    }
    setUploadTableRowExcludeActions(uploadTableRowExcludeActions: Array<string>) {
        this.uploadTableRowExcludeActions = uploadTableRowExcludeActions;
        return this;
    }
    setMenuExcludes(menuExcludes: Array<string>) {
        this.menuExcludes = menuExcludes;
        return this;
    }

    private setAllEditFalse() {
        this.edit = this.allPageSectionEdit;
        if (this.allPageSectionEdit)
            return this;

        this.toolbarActionIds = [];
        this.tableToolbarExcludeActionIds = [];
        this.tableRowExcludeActionIds = [];
        this.uploadContentExcludeActions = [];
    }
    coverSecurityItem(targetItem: PageSecurityItem) {
        this.setAllEditFalse();
        targetItem.setAllEditFalse();

        this.allPageSectionEdit = targetItem.allPageSectionEdit;
        this.edit = targetItem.edit;
        this.isUpload = targetItem.isUpload;

        this.toolbarActionIds = this.toolbarActionIds.concat(targetItem.toolbarActionIds).distinct();
        this.tabExcludeActionIds = this.tabExcludeActionIds.concat(targetItem.tabExcludeActionIds).distinct();
        this.formItemExcludeFields = this.formItemExcludeFields.concat(targetItem.formItemExcludeFields).distinct();

        this.tableToolbarExcludeActionIds = this.tableToolbarExcludeActionIds.concat(targetItem.tableToolbarExcludeActionIds).distinct();
        this.tableRowExcludeActionIds = this.tableRowExcludeActionIds.concat(targetItem.tableRowExcludeActionIds).distinct();
        this.uploadContentExcludeActions = this.uploadContentExcludeActions.concat(targetItem.uploadContentExcludeActions).distinct();
        this.uploadTableRowExcludeActions = this.uploadTableRowExcludeActions.concat(targetItem.uploadTableRowExcludeActions).distinct();


        return this;
    }

    isCommonItem() {
        if ((!!this.pathId) == false && (!!this.sectionType) == false)
            return true;

        return false;
    }
    isSecPathItem(path: string) {
        if ((!!this.pathId) == true && this.pathId == path)
            return true;

        return false;
    }
    isSecTypeItem(secType: PageSectionType) {
        if ((!!this.sectionType) == true && this.sectionType == secType)
            return true;

        return false;
    }
}