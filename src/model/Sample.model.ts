export class SampleEntity {
    constructor(init?: Partial<SampleEntity>) {
        Object.assign(this, init);
    }
    public ID?: string
    public Name?: string
    public SupplierCode?: string;//供應商編號
    public Status?: string//狀態
    public IsActive?: boolean//合格

    public Principal?: string//負責人
    public Numbers?: string;//統一編號
    public Address?: string
}
