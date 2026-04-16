export class STSliderProps {
  value: number | number[]
  step?: number
  range?: boolean
  disabled?: boolean
  min?: number
  max?: number

  constructor(init?: Partial<STSliderProps>) {
    Object.assign(this, init)
  }
}