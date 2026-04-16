import { ref, Ref } from "vue"
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { STCardTitleProps } from './STCardTitle.model';
import { MenuItem } from "primevue/menuitem";
import { STMenubarAction } from '@/components/smartcityui/STMenubar.model';
import { ThemeSwitchController } from './STThemeMode.compsable';

export class UseSTCardTitleStyle {
  public inputFieldOption: Ref<InputTextPassThroughOptions>

  constructor() {
    this.inputFieldOption = ref(this.getInputFieldStyleOption())
  }

  public getInputFieldStyleOption() {
    return {
      root: ({ context, props }) => ({
        class: [
          'focus:!shadow-none',
          'w-full',
          'h-[24px]',
          '!border-[1px] !border-dashed !border-commBorder',
          '!bg-transparent',
          '!py-[4px] !px-[8px]',
          '!text-commTextLevel1',
          '!text-[16px]',
          'placeholder:!text-commTextLevel1 dark:placeholder:!text-commTextLevel1'
        ]
      }),
    }
  }
}

export class UseSTCardTitle {
  private emit: any
  public props: Ref<STCardTitleProps> = ref(null)
  public canEdit: Ref<boolean> = ref(false)
  public themeController: ThemeSwitchController
  private $t: any

  constructor(emit: any, t: any) {
    this.emit = emit
    this.themeController = new ThemeSwitchController(false)
    this.$t = t
  }

  private setDefaultSubActionMenu() {
    if (!this.props.value.actionList || this.props.value.actionList.length == 0) {
      if(this.props.value.needRename){
        this.props.value.actionList = [
          new STMenubarAction({
            Id: 'selection',
            Url: `ic_more_${this.themeController.getModeString()}`,
            SeverityColor: 'secondary',
            ClassName: '!bg-transparent !rounded-none border-none',
            items: [
              {
                key: 'rename',
                label: this.$t('Components.STCardTitle.Rename')
              },
              // {
              //   key: 'clone',
              //   label: this.$t('Components.STCardTitle.Clone')
              // },
              {
                key: 'delete',
                label: this.$t('Components.STCardTitle.Delete')
              }
            ]
          })
        ]
      }else{
        this.props.value.actionList = [
          new STMenubarAction({
            Id: 'selection',
            Url: `ic_more_${this.themeController.getModeString()}`,
            SeverityColor: 'secondary',
            ClassName: '!bg-transparent !rounded-none border-none',
            items: [
              {
                key: 'delete',
                label: this.$t('Components.STCardTitle.Delete')
              }
            ]
          })
        ]
      }
    }
  }

  public setProps(props: STCardTitleProps) {
    this.props.value = props
    this.canEdit.value = this.props.value.canEdit
    this.setDefaultSubActionMenu()
  }

  public editStatusChange() {
    this.canEdit.value = !this.canEdit.value
    if (!this.canEdit.value) {
      this.emit('renameCompleted', this.props.value.title, this.props.value.id)
    }
  }

  public actionSubBtn(e, menuItem: MenuItem, subMenuItem: MenuItem) {
    let clickedData = this.props.value
    this.emit('actionSubBtn', e, menuItem, subMenuItem, clickedData)
    if (subMenuItem.key == 'rename') {
      this.editStatusChange()
    } else if (subMenuItem.key == 'clone') {
      navigator.clipboard.writeText(this.props.value.title)
        .then(() => {
          console.log('複製成功')
        })
    }
  }

  public eventClickCardTitle(e: Event) {
    this.emit('eventClicked', e, this.props.value)
  }
}