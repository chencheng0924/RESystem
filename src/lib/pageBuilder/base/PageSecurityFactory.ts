import { IPageSecurityFactory } from '../interface/IPageSecurity';
import { PageSection, PageSectionDataTable, PageSectionTree, PageSectionUploadFile, PageSectionUpload } from "../core/PageSection";
import { PageSecurityItem, PageSecurityItemBase } from "../core/PageSecurityItem";
import { PageSectionType } from "../enum/PageSectionType";
import { PageSecurityType } from "../enum/PageSecurityType";

export class PageSecurityFactory {

    private userBase?: PageSecurityItemBase
    private _securityDatas: Array<PageSecurityItem> = [];
    private _entityType?: string;
    constructor() {
        this.userBase = new PageSecurityItemBase()
        // .setType(PageSecurityType.VIEW)
        // .setEntityType("SCMSupplierActivity")
        // .setStatus('5')
        // .setDepartment('30469163274160128');
    }
    public setUserBase(userBase?: PageSecurityItemBase) {
        this.userBase = userBase;
        return this;
    }
    public getSecurityDatas() {
        this._entityType = this.userBase.entityType;

        let datas = IPageSecurityFactory.getAllSceurity();

        this._securityDatas = datas;
        return datas;
    }

    private getSecurityDatasFilter() {
        if (this._securityDatas.length == 0)
            return;
        this._securityDatas = this._securityDatas.orderBy(x => x.seq);

        // view+tenant+entityType  > status  > dep
        let user = this.userBase;
        let ds = this._securityDatas.filter(
            x => x.type == user.type &&
                x.tenantId == user.tenantId &&
                x.entityType == user.entityType);
        if (ds.length == 0) {
            // 抓 tenant
            this._securityDatas = this._securityDatas.filter(
                x => x.type == PageSecurityType.TENANT &&
                    x.tenantId == user.tenantId &&
                    x.entityType == user.entityType);
            return;
        }

        let depDs = ds.filter(x => x.isDepartmentNullAndspecial(user.department));
        if (depDs.length == 0) {
            this._securityDatas = ds;
            return;
        }

        let statusDs = depDs.filter(x => x.isStatusNullAndspecial(user.status));
        if (statusDs.length == 0) {
            this._securityDatas = depDs;
            return;
        }




        this._securityDatas = statusDs;
        return;
    }

    private coverSecurityItem(current: PageSecurityItem, datas: Array<PageSecurityItem>) {
        if (datas.length == 0)
            return current;
        for (let i = 0; i < datas.length; i++) {
            let itemTemp = datas[i];
            if (i == 0)
                current = new PageSecurityItem(itemTemp);
            else
                current = current.coverSecurityItem(itemTemp);
        }
        return current;
    }
    public setSecurityBySection(sec: PageSection) {
        if (this._securityDatas.length == 0)
            return sec;

        this.getSecurityDatasFilter();
        let lastSecurityDatas = this._securityDatas;
        if (lastSecurityDatas.length == 0)
            return sec;
        //console.log("lastSecurityDatas", lastSecurityDatas);

        let lastSecurityItem: PageSecurityItem = null;
        // 1.
        let commonSecurity = lastSecurityDatas.filter(x => x.isCommonItem());
        lastSecurityItem = this.coverSecurityItem(lastSecurityItem, commonSecurity)

        // 特殊
        let specialSecurity = lastSecurityDatas.filter(x => x.isSecPathItem(sec.Path));
        lastSecurityItem = this.coverSecurityItem(lastSecurityItem, specialSecurity)

        let secTypeSecurity = lastSecurityDatas.filter(x => x.isSecTypeItem(sec.SectionType));
        lastSecurityItem = this.coverSecurityItem(lastSecurityItem, secTypeSecurity)

        if (lastSecurityItem != null)
            sec = this.setSecurity(sec, lastSecurityItem);

        return sec;
    }

    private setSecurity(sec: PageSection, securityItem: PageSecurityItem) {
        if (this._securityDatas.length == 0)
            return sec;

        if (securityItem.allPageSectionEdit == false)
            securityItem.edit = securityItem.allPageSectionEdit;
        sec.SetEdit(securityItem.edit);
        if (sec.SectionType == PageSectionType.PAGE_MENUBAR)
            return this.setPageSectionMenubar(sec, securityItem);
        else if (sec.SectionType == PageSectionType.PAGE_TABS)
            return this.setPageSectionTabs(sec, securityItem);
        else if (sec.SectionType == PageSectionType.FORM)
            return this.setPageSectionForm(sec, securityItem);
        else if (sec.SectionType == PageSectionType.TABLE)
            return this.setPageSectionTable(sec, securityItem);
        else if (sec.SectionType == PageSectionType.FILE_UPLOAD)
            return this.setPageSectionUploadMgmt(sec, securityItem);
        else if (sec.SectionType == PageSectionType.UPLOAD)
            return this.setPageSectionUpload(sec, securityItem);
        else if (sec.SectionType == PageSectionType.MARKDOWN)
            return this.setPageSectionMarkdown(sec, securityItem);
        else if (sec.SectionType == PageSectionType.TREE)
            return this.setPageSectionTree(sec, securityItem);
        else if (sec.SectionType == PageSectionType.TABLE_SEARCH)
            return this.setPageSectionSearchTable(sec, securityItem);

        return sec;
    }

    private setPageSectionMenubar(sec: PageSection, securityItem: PageSecurityItem) {
        let toolsBar = sec.getToolbarActions();
        if (securityItem.toolbarActionIds.length == 0)
            sec.setToolbarActions([]);
        else {
            sec.setToolbarActions(
                toolsBar.filter(x => securityItem.toolbarActionIds.includes(x.Id) == true)
            );
        }

        return sec;
    }
    private setPageSectionTabs(sec: PageSection, securityItem: PageSecurityItem) {
        let toolsBar = sec.getToolbarActions();
        if (securityItem.tabExcludeActionIds.length > 0) {
            sec.setToolbarActions(
                toolsBar.filter(x => securityItem.tabExcludeActionIds.includes(x.Id) == false)
            );
        }

        return sec;
    }
    private setPageSectionForm(sec: PageSection, securityItem: PageSecurityItem) {
        if (securityItem.formItemExcludeFields.length > 0) {
            sec.FormOps.FormItems.forEach((x) => {
                if (securityItem.formItemExcludeFields.includes(x.Field))
                    x.IsDisabled = true;
            })
        }
        if (sec.Edit == false) {
            sec.FormOps.FormItems.forEach((x) => {
                x.IsDisabled = true;
            })
        }
        return sec;
    }
    private setPageSectionUploadMgmt(sec: PageSection, securityItem: PageSecurityItem) {

        let tsec = sec as PageSectionUploadFile;
        // row action 
        let rowAcs = tsec.getColumnAction();
        if (securityItem.uploadTableRowExcludeActions.length > 0) {
            tsec.setColumnAction(
                rowAcs.filter(x => securityItem.uploadTableRowExcludeActions.includes(x.Id) == false)
            );
        }
        if (sec.Edit == false) {
            tsec.setActions([]);

        }

        // content action
        let contextAcs = tsec.getContextActions();
        if (securityItem.uploadContentExcludeActions.length > 0) {
            tsec.setContextActions(
                contextAcs.filter(x => securityItem.uploadContentExcludeActions.includes(x.Id) == false)
            );
        }
        else {
            if (sec.Edit == false) {
                tsec.setContextActions([])
            }
        }

        return tsec;
    }
    private setPageSectionUpload(sec: PageSection, securityItem: PageSecurityItem) {

        let tsec = sec as PageSectionUpload;

        return tsec;
    }
    private setPageSectionTable(sec: PageSection, securityItem: PageSecurityItem) {
        let tsec = sec as PageSectionDataTable;
        let toolsBar = tsec.getActions();
        if (securityItem.tableToolbarExcludeActionIds.length > 0) {
            tsec.setActions(
                toolsBar.filter(x => securityItem.tableToolbarExcludeActionIds.includes(x.Id) == false)
            );
        }

        // row action 
        let rowAcs = tsec.getColumnAction();
        if (securityItem.tableRowExcludeActionIds.length > 0) {
            tsec.setColumnAction(
                rowAcs.filter(x => securityItem.tableRowExcludeActionIds.includes(x.Id) == false)
            );
        }

        // 是否有子表
        if (sec.TableOps.SubTable?.IsSubTable) {
            // row action 
            let rowAcs = tsec.getSubTableColumnAction();
            if (securityItem.tableRowExcludeActionIds.length > 0) {
                tsec.setSubTableColumnAction(
                    rowAcs.filter(x => securityItem.tableRowExcludeActionIds.includes(x.Id) == false)
                );
            }

        }


        if (sec.Edit == false) {
            tsec.setActions([]);
            tsec.setColumnAction([]);
            tsec.setSubTableColumnAction([]);
        }
        return tsec;
    }
    private setPageSectionSearchTable(sec: PageSection, securityItem: PageSecurityItem) {

        let tsec = sec as PageSectionDataTable;
        let toolsBar = tsec.getActions();
        if (securityItem.tableToolbarExcludeActionIds.length > 0) {
            tsec.setActions(
                toolsBar.filter(x => securityItem.tableToolbarExcludeActionIds.includes(x.Id) == false)
            );
        }

        // row action 
        let rowAcs = tsec.getColumnAction();
        if (securityItem.tableRowExcludeActionIds.length > 0) {
            tsec.setColumnAction(
                rowAcs.filter(x => securityItem.tableRowExcludeActionIds.includes(x.Id) == false)
            );
        }

        if (sec.Edit == false) {
            tsec.setActions([]);
            tsec.setColumnAction([]);
        }
        return tsec;
    }
    private setPageSectionWorkflow(sec: PageSection, securityItem: PageSecurityItem) {

        return sec;
    }
    private setPageSectionTree(sec: PageSection, securityItem: PageSecurityItem) {

        let tsec = sec as PageSectionTree;
        // row action 
        let rowAcs = tsec.getTreeActions();
        if (securityItem.tableToolbarExcludeActionIds.length > 0) {
            tsec.setTreeActions(
                rowAcs.filter(x => securityItem.tableToolbarExcludeActionIds.includes(x.Id) == false)
            );
        }
        if (sec.Edit == false) {
            tsec.setTreeActions([]);

        }

        // content action
        let contextAcs = tsec.getContextActions();
        if (securityItem.uploadContentExcludeActions.length > 0) {
            tsec.setContextActions(
                contextAcs.filter(x => securityItem.uploadContentExcludeActions.includes(x.Id) == false)
            );
        }
        else {
            if (sec.Edit == false) {
                tsec.setContextActions([])
            }
        }

        return tsec;
    }
    private setPageSectionMarkdown(sec: PageSection, securityItem: PageSecurityItem) {

        return sec;
    }

}
