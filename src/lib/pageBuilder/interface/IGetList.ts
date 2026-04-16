import { PageFormItem } from '../core/PageFormItem';
import { PageItem } from '../enum/PageFormItemEnum';
import { PageSection } from './../core/PageSection';
export interface IGetList {
    getList(item: PageFormItem, orgSec: PageSection, popupSec?: PageSection): Promise<any>;
}

export class IGetListEx {
    static setGetList(items: Array<PageFormItem>, view: any, tableSec: PageSection, label: string = "name") {

        let listTypes =
            [PageItem.Select,
            PageItem.MultiSelect,
            PageItem.MultiSelectSearch,
            PageItem.CheckboxGroup,
            PageItem.ListSelect

            ];

        items.forEach((x) => {
            if (listTypes.includes(x.Type)) {
                x.setListFunction((str) => {
                    x.FilterWord = str;


                    return (<IGetList>view).getList(x, tableSec);
                }).setOptionLabel(label);

            }

        })
        return items;
    }
}