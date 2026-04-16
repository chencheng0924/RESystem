
export enum FileType {
  PDF = 'pdf',
  PPT = 'ppt',
  WORD = 'word',
  VIDEO = 'video'
}

export class STFileItem {
  id: string;
  title: string;
  file: any;
  type: FileType;
  size: string;
  constructor(init?: Partial<STFileItem>) {
    Object.assign(this, init)
  }
}