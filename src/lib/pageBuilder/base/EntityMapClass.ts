export class EntityItem {
    public EntityType?: string;
    public EntityName?: string;
    constructor(init?) {
        Object.assign(this, init);
    }
}

export class EntityMapClass {
    private mappingDatas: Array<EntityItem> = [
        new EntityItem({ EntityType: 'PDMPlan', EntityName: '科專計畫' }),
        new EntityItem({ EntityType: 'PDMPlanItem', EntityName: '計畫分項' }),
        new EntityItem({ EntityType: 'PDMRTNote', EntityName: '研發紀錄簿' }),
        new EntityItem({ EntityType: 'PDMRTNoteStatus', EntityName: '研發紀錄簿狀態' })
    ];
    constructor() {

    }

    getEntityName(type: string) {
        if (this.mappingDatas.length == 0)
            return "";

        return this.mappingDatas.find(x => x.EntityType == type)?.EntityName ?? '';
    }
}
