export class STIconButtonProps {
  id: string = ''
  iconUrl: string
  iconClickedUrl: string = ''
  iconDisabledUrl: string = ''
  tooltipText: string
  label: string
  clickedLable: string = ''
  isVertical: boolean
  isClicked: boolean = false
  isDisabled: boolean = false
  tooltipPosition: string = 'bottom'

  constructor(init?: Partial<STIconButtonProps>) {
    Object.assign(this, init)
  }

  setIsClicked(status: boolean) {
    this.isClicked = status
    return this
  }
  setIsDisabled(status: boolean) {
    this.isDisabled = status
    return this
  }
}