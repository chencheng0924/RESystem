export class mapControllerList{
  title?: string
  checked?: boolean
  subchecked?: boolean = false
  type?: string
  routeid?: string
  dirction: Number
  hasSubRoute: boolean = false
  constructor(init?){
    Object.assign(this, init);
  }
}