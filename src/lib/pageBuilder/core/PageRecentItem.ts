
export class PageRecentItem {
    Name?: string
    Id?: string
    StatusName?: string
    StatusId?: string
    Date?: string
    Url?: string
    EntityType?: string

    constructor(init?) {
        Object.assign(this, init);
    }
    setName(name: string) {
        this.Name = name;
        return this;
    }
    setId(id: string) {
        this.Id = id;
        return this;
    }
    setStatusName(name: string) {
        this.StatusName = name;
        return this;
    }
    setStatusId(StatusId: string) {
        this.StatusId = StatusId;
        return this;
    }
    setDate(date: string) {
        this.Date = date;
        return this;
    }
    setUrl(url: string) {
        this.Url = url;
        return this;
    }
    setEntityType(entityType: string) {
        this.EntityType = entityType;
        return this;
    }

}