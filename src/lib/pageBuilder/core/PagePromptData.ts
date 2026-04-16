export class PagePromptEditorData {
  field: string = ''
  value: string = ''
  insertText: string = ''

  constructor(init?: Partial<PagePromptEditorData>) {
    Object.assign(this, init)
  }
}