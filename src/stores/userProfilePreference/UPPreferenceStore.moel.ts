import { TenantEntity } from "@/model/entity/TenantEntity";
import { UsrEntity } from "@/model/entity/UsrEntity";

export class UPPreference {

    public TenantEntity: TenantEntity
    public PageRowLimit: number = 100;
    public UserEntity: UsrEntity

    constructor(init?) {
        Object.assign(this, init);
        this.TenantEntity = new TenantEntity();
        this.TenantEntity.id = "30261659951063040"
        this.TenantEntity.name = "鴻海"
    }

}




