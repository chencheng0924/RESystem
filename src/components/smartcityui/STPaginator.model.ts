export class STPaginatorProps {
  totalRecords: number = 0
  rows: number = 0
  first: number = 0
  pageLinkSize: number = 5
  rowsPerPageOptions: number[]
  alwaysShow: boolean = true
  template: string = 'PrevPageLink PageLinks NextPageLink'

  constructor(init?: Partial<STPaginatorProps>) {
    Object.assign(this, init)
  }

  setTotalRecords(val: number) {
    this.totalRecords = val
    return this
  }

  setRows(val: number) {
    this.rows = val
    return this
  }

  setFirst(val: number) {
    this.first = val
    return this
  }

  setPageLinkSize(val: number) {
    this.pageLinkSize = val
    return this
  }

  setRowsPerPageOptions(val: number[]) {
    this.rowsPerPageOptions = val
    return this
  }

  setAlwaysShow(val: boolean) {
    this.alwaysShow = val
    return this
  }
}