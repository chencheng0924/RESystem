import { PageFormItem } from "../core/PageFormItem";
import { PageTableColumn } from "../core/PageTableColumn";

export interface ITableColumnDefinition {
    getTableColumn(cols: Array<PageTableColumn>): Array<PageTableColumn>;
    getCondition(orgCondition: Array<PageFormItem>): Array<PageFormItem>;
}