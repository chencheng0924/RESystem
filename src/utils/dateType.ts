import moment from 'moment'
export class dateType {
  constructor() {}

  public static nowMomentLts() {
    return moment().format('LTS')
  }
}