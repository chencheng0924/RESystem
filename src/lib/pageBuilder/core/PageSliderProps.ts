export class PageSliderProps {
  value: number | number[]
  step?: number
  range?: boolean
  disabled?: boolean
  min?: number
  max?: number

  constructor(init?: Partial<PageSliderProps>) {
    Object.assign(this, init)
  }
}