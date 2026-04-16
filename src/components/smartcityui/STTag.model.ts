export class STTagProps {
  value: string
  removable: boolean = false
  type: STTagType = STTagType.PRIMARY
  // removeEvent?: (e: Event) => void;

  constructor(init?: Partial<STTagProps>) {
    Object.assign(this, init)
  }
}

export enum STTagModeType {
  SINGLE = 'single',
  GROUP = 'group',
  DYNAMIC = 'dynamic'  // 可動態新增
}

export enum STTagType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  DANGER = 'danger',
  CONTRAST = 'contrast'
}