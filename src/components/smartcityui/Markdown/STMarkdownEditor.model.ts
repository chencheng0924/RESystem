import { STPosition, STAvatar } from '@/components/smartcityui/STCommon.model'
import { STMessageProps } from '@/components/smartcityui/STMessage.model'

export class STMarkdownEditorProps {

  value?: string = ''
  readOnly?: boolean = false;
  constructor(init?: Partial<STMarkdownEditorProps>) {
    Object.assign(this, init);
  }
}


export class STMarkdownEditorEvent {
  constructor(init?: Partial<STMarkdownEditorEvent>) {
    Object.assign(this, init);
  }

  'update:value'?: Function;
}
