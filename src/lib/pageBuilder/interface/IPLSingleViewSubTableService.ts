import { PageFormItem } from "../core/PageFormItem";
import { BaseEntity } from "../model/BaseEntity";
import { IPLSingleViewService } from "./IPLSingleViewService";

export interface IPLSingleViewSubTableService extends IPLSingleViewService {
    createEntityBySubTable(entity: BaseEntity, items?: Array<PageFormItem>);
    updateEntityBySubTable(entity: BaseEntity, items?: Array<PageFormItem>)
    deleteEntityBySubTable(pkids);

}