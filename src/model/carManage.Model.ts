export class CarManageEntity {
  constructor(init?: Partial<CarManageEntity>) {
      Object.assign(this, init);
  }
  public ID?: string
  public SubordinateStation?: string
  public BusEnergyType?: string
  public BusClassification?: string;
  public BusBrandId?: string
  public VehicleStatus?: string
  public LicensePlateNumber?: string
  public carPlateNum?: string
  public ManufactureYM?: string
}
