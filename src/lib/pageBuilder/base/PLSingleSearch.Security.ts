export class PLSingleSearchSecurity {
    constructor(init?) {
        Object.assign(this, init);
    }

    IsCondition?: boolean = true;
    IsAdd?: boolean = true;
    IsDeletes: boolean = true;
    IsRowActions: boolean = true;
    IsRowEdit: Boolean = true;
    IsRowDelete: Boolean = true;
    IsRowView: boolean = false;
    IsRowEditRestraint: boolean = false;

    setRowView(view: boolean) {
        this.IsRowView = view;
        return this;
    }
    setAddBtnEnable(enable: boolean) {
        this.IsAdd = enable;
        return this;
    }
    setReadonly() {
        this.IsAdd = false;
        this.IsDeletes = false;
        this.IsRowActions = false;

        return this;
    }
    setRowEdit(edit: boolean) {
        this.IsRowEdit = edit;
        return this;
    }
    setRowDelete(del: boolean){
        this.IsRowDelete = del
        return this;
    }
    setRowEditRestraint(editRestraint: boolean){
        this.IsRowEditRestraint = editRestraint
        return this;
    }
    setTopToolsNotShow(){
        this.IsAdd = false;
        this.IsDeletes = false;
        return this;
    }
}