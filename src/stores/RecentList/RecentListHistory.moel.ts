import { ref, Ref } from "vue"

export class RecentItem {
    Name?: string;
    Id?: string;
    StatusName?: string;
    StatusId?: string;
    Date?: string;
    Url?: string;
    TagSeverityColor?: string;
    TagText?: string;
    Avatarlabel?: string;
    EntityType?: string

    constructor(init?) {
        Object.assign(this, init);
        this.setAvatarlabel();
        this.setTagText();
        this.setTagSeverityColor();
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
    setAvatarlabel() {
        if (this.Name == null || this.Name == "")
            return "";

        this.Avatarlabel = this.Name[0];

    }
    setTagText() {
        this.TagText = this.StatusName;
    }
    setTagSeverityColor() {
        this.TagSeverityColor = "contrast";
    }
    setEntityType(entityType: string) {
        this.EntityType = entityType;
        return this;
    }

}

export class RecentListHistory {

    public RecentList?: Ref<Array<RecentItem>>;
    public CountLimit?: number = 10;//只記錄 15筆

    constructor() {
        this.RecentList = ref([]);
    }

}





