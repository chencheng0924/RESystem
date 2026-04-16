import { PageFormItem } from "../core/PageFormItem";
import { BaseEntity } from "../model/BaseEntity";
import { BaseService } from "./BaseService";

export class BaseEntityServie extends BaseService {
    toEntity(items?: Array<PageFormItem>): BaseEntity {
        let entity: BaseEntity = new BaseEntity();
        items.forEach((x) => {
            entity[x.Field] = x.Value;
        })

        return entity;
    }

}