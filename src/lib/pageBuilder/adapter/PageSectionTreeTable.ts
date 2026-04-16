
import { PageBuilder } from '../base/PageBuilder';
import { PageSection, PageSectionDataTable, TableOption } from '../core/PageSection';
import { PageView } from '../core/PageView';
import { IPageCustom } from '../interface/IPageCustom';
import STTreeTable from '@/components/smartcityui/STTreeTable.vue';
import { PageAction } from '../core/PageAction';
import { STTreeTableProps } from '@/components/smartcityui/STTreeTable.model';
import { STDataTableAction, STDataTableColumn, STDataTableCustomFunction } from '@/components/smartcityui/STTable.model';
import { PageCustomObject } from '../core/PageCustomObject';

export class PageSectionTreeTable extends PageSectionDataTable implements IPageCustom {

    public promptText?: string = ''
    public promptInsetText?: string = '';
    private tools?: Array<PageAction> = [];
    constructor() {
        super()

    }

    public setCustomObject(custom?: PageCustomObject) {
        this.TableOps.setCustomObject(custom);
        return this;
    }

    // 取得元件實例
    getComponent() {
        return STTreeTable;
    }
    // section 轉 元件
    toComponent(self: PageBuilder, view: PageView, sec: PageSection): PageSection {

        sec.Component = STTreeTable;
        let pros = new STTreeTableProps();
        pros.setDatas(sec.TableOps.Datas);
        let newCols = sec.TableOps.Columns?.map((x) => {
            let tempCol = new STDataTableColumn({
                field: x.Field,
                header: x.Field,
                title: x.Title,
                actions: x.Actions,
                cellValue: x.CellValue,
                cellValueByHtml: x.CellValueByHtml,
                isCellHtml: x.IsCellHtml,
                isImage: x.IsImage,
                isFormItem: x.IsFormItem,
                truncateNum: x.TruncateNum
            });
            return tempCol;
        });
        pros.setColumns(newCols);
        let newAcs = sec.TableOps.CustomAction?.map((x) => {
            return new STDataTableAction(x);
        });
        pros.setActions(newAcs);
        pros.setCustomFunction(new STDataTableCustomFunction(sec.TableOps.CustomObject))

        pros.setShowCheckBox(sec.TableOps.ShowCheckBox)

        sec.Props = pros;

        sec.Events = {
            eventActionBtn: async (item, seles) => {
                const tempAction = new PageAction(item);
                await view.SetEvent_TableToolbarAction(tempAction, seles, sec);
                self.updateEntitySection(view, sec.Path);
            },
            eventActionBtnByRow: async (item, data) => {
                const tempAction = new PageAction(item);
                await view.SetEvent_TableRowAction(tempAction, data, sec);
                self.updateEntitySection(view, sec.Path);
            },
        };
        return sec;
    }

}