import { Ref, ref } from 'vue'
import { EditorPassThroughOptions, EditorTextChangeEvent } from 'primevue/editor'
import { PopoverPassThroughOptions } from "primevue/popover"
import { STButtonConfig, STButtonType } from '@/components/smartcityui/STButton.model'
import { TooltipDirectivePassThroughOptions } from 'primevue/tooltip'
import { STEditorData } from './STEditor.model'
import { STIconButtonProps } from './STIconButton.model'
// import Quill from 'quill'

export class UseSTEditorStyle {
  public editorStyleOption: Ref<EditorPassThroughOptions>
  public popoverStyleOption: Ref<PopoverPassThroughOptions>
  public tooltipStyleOption: Ref<TooltipDirectivePassThroughOptions>

  constructor() {
    this.editorStyleOption = ref(this.getEditorStyleOption())
    this.popoverStyleOption = ref(this.getPopoverStyleOption())
    this.tooltipStyleOption = ref(this.getTooltipStyleOption())
  }

  public getEditorStyleOption() {
    return {
      toolbar: ({ context, props }) => ({
        class: [
          'flex'
        ]
      }),
      content: ({ context, props }) => ({
        class: [
          'p-0',
        ]
      }),
    }
  }

  public getPopoverStyleOption() {
    return {
      root: {
        class: [
          'before:!hidden after:!hidden'
        ]
      },
      content: {
        class: 'p-0'
      },
      transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
      }
    }
  }

  public getTooltipStyleOption() {
    return {
      arrow: ({ context, props }) => ({
        class: [
          ''
        ]
      }),
      text: () => ({
        class: [
          'py-[0.25rem] px-[0.5rem] !text-body2',
        ]
      })
    }
  }
}

export class UseSTEditor {
  private quill: any
  private actionBtnList: Ref<STButtonConfig[]>
  public popoverBtn: Ref<any>
  public changeEventValue: Ref<EditorTextChangeEvent>
  public modelValue: Ref<STEditorData>
  private emit: any
  public permissionList: Ref<Permission[]>
  public activePermission: Ref<Permission>
  public copyBtn = new STIconButtonProps({
    iconUrl: 'ic_tool_copy'.getIcon('svg'),
    tooltipText: '複製'
  })

  constructor(quill: any, emit: any) {
    this.emit = emit

    this.modelValue = ref(new STEditorData())
    this.actionBtnList = ref([]);
    this.popoverBtn = ref(null)
    this.changeEventValue = ref(null)
    this.permissionList = ref([])
    this.activePermission = ref()
    this.init(quill)
  }

  private init(quill: any) {
    this.setPermissionList()
    this.setPermissionStatus(Permission.PUBLIC)
    // const ColorStyle = Quill.import('attributors/style/color') as quillAtt
    // ColorStyle.whitelist = [
    //   '#FFFFFF', '#9E8EFF', '#FFC700', '#62F65E', '#0AE7E7'
    // ]
    // Quill.register('formats/color', ColorStyle, true)
  }

  public setModelValue(val: STEditorData) {
    this.modelValue.value = val
  }

  public setPermissionList() {
    this.permissionList.value = [
      Permission.PUBLIC,
      Permission.PRIVATE
    ]
  }

  public setPermissionStatus(status: Permission) {
    this.activePermission.value = status
  }

  public togglePermissionPop(event: Event) {
    this.popoverBtn.value.toggle(event)
  }

  public setPermission(event: Event, status: Permission) {
    this.setPermissionStatus(status)
    this.togglePermissionPop(event)
  }

  public get actionBtnListData() {
    return this.actionBtnList.value
  }

  public textChange(val: EditorTextChangeEvent) {

    this.modelValue.value.setHtmlValue(val.htmlValue)
    this.modelValue.value.setTextValue(val.textValue)
    this.changeEventValue.value = val

    //console.log(val)
    this.emit('textChange', this.modelValue.value)
  }

  public copy() {
    navigator.clipboard.writeText(this.changeEventValue.value?.textValue ?? this.modelValue.value?.textValue)
      .then(() => {
        console.log('複製成功')
      })
  }

  public autoSave() {
    // TODO: 自動儲存api
    // 存htmlValue才會保留格式
  }
}

interface QuillAtt {
  attrName: string
  keyName: string
  scope: string
  whitelist: string[]
}

enum Permission {
  PUBLIC = '開放',
  PRIVATE = '私人'
}