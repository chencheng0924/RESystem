import { ConditionItem } from '../common/ConditionItem';
import { ListItem } from '../common/ListItem';
import { PageAction } from './PageAction';
import { PageBase } from './PageBase';
import { PageChangeListReturn } from './PageChangeListReturn';
import { PageItem } from '../enum/PageFormItemEnum';
import { PageReturn } from './PageReturn';
import { PageReturnType } from './PageReturnType';
import { TableOption } from './PageSection';

export class PageSearch extends PageBase {
    public QueryParameter: string;


    constructor(init?) {
        super();
        Object.assign(this, init);
    }

    public IsCategorytCondition(): boolean {
        return false;
    }

    public GetPageTitle(): string {
        return "";
    }

    public GetConditions(): Array<ConditionItem> {
        return [];
    }

    public GetSearchBlockTemplate(): string {
        return "<p class='searchTitle'>#:Name#</p>";
    }

    public GetSearchBlockPKIDName(): string {
        return "Pkid";
    }

    public GetSearchDatas(condtions: Array<ConditionItem>, pkid: string): string {
        return "";
    }

    public GetSearchColumns(): string {
        return "";
    }

    public GetSearchListDatas(): string {
        return "";
    }

    public GetColorPKID(): string {
        return "";
    }

    public GetTableOption(): TableOption {
        return new TableOption();
    }

    public GetPageSearchAddEdit(data: string): string {
        return '';
    }

    public GetPageSearchDelete(data: string): string {
        return '';
    }

    public GetPageSearchCustomAction(acid: string, data: string, conds: string): PageReturn {
        return new PageReturn(PageReturnType.ReturnNone);
    }

    public GetTableRowList(objData: string, tabid: string, acid: string, rowData: string, key: string): Array<ListItem> {
        return [];
    }

    public GetListChange(objData: string, tabid: string, acid: string, rowData: string, key: string): PageChangeListReturn {
        return new PageChangeListReturn();
    }

    public GetOtherActions(): Array<PageAction> {
        return [];
    }

    public SetSearchActions(condtions: Array<ConditionItem>, acid: string): PageReturn | null {
        return null;
    }

    public SetCondition(condtions: Array<ConditionItem>): Array<ConditionItem> {
        if (!this.QueryParameter) return condtions;
        const para = this.QueryParameter.replace("?", "");
        const ps = para.split('&');
        const statusName = ps.find(x => x.startsWith("status="));
        if (!statusName) return condtions;
        const statusValue = statusName.replace("status=", "");

        const temp = condtions.find(x => x.ElementID === "Status");
        const status = statusValue.split(',');
        if (temp.Value) status.push(temp.Value);

        temp.Items = temp.Items.filter(x => status.includes(x.Value));
        temp.Type = PageItem.MultiSelect;
        temp.Value = Array.from(new Set(status)).join(",");

        return condtions;
    }
}

