export class ReMarkEntity {
  constructor(init?: Partial<ReMarkEntity>) {
      Object.assign(this, init);
  }
  public reMarkDate?: string
  public reMarkBuilder?: string
  public reMarkType?: string
  public reMarkContent?: string
}
