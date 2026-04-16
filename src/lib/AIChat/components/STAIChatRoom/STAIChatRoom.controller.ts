import { ref, Ref, nextTick, h, render } from 'vue'
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { GalleriaPassThroughOptions } from 'primevue/galleria'
import { CommentType } from '../../model/STAIChat.model'

export class STMessageBarAction {
  icon: string
  text: string
  click: Function
  hasTooltip: boolean = false
  tooltip: string = ''

  constructor(init?: Partial<STMessageBarAction>) {
    Object.assign(this, init)
  }
}

export class useStyle {
  public inputStyle: Ref<InputTextPassThroughOptions>
  public galleriaStyle: Ref<GalleriaPassThroughOptions>

  constructor() {
    this.inputStyle = ref(this.getInputTextStyleOption())
    this.galleriaStyle = ref(this.getGalleriaStyleOption())
  }

  public getInputTextStyleOption() {
    return ({
      root: ({ props, context }) => ({
        class: ['!w-full !rounded-r-none border-1 h-[2.5rem] border-solid hover:!border-[#806BFF] focus:!border-[#806BFF]']
      }),
    })
  }

  public getGalleriaStyleOption() {
    return ({
      root: ({ props, context }) => ({
        class: ['!border-none !overflow-visible	']
      }),
      prevbutton: ({ props, context }) => ({
        class: ['!absolute !left-[-10%] !bg-transparent']
      }),
      nextButton: ({ props, context }) => ({
        class: ['!absolute !right-[-10%] !bg-transparent']
      }),
      thumbnailcontent: ({ props, context }) => ({
        class: ['!bg-transparent']
      }),
      thumbnailprevbutton: ({ props, context }) => ({
        class: ['!hidden']
      }),
      thumbnailnextbutton: ({ props, context }) => ({
        class: ['!hidden']
      }),
      thumbnailitems: ({ props, context }) => ({
        class: ['!gap-[1rem]']
      }),
      thumbnailitem: ({ props, context }) => ({
        class: ['!flex-none']
      }),
      thumbnailsviewport: ({ props, context }) => ({
        class: ['flex items-center justify-between']
      }),
      mask: ({ props, context }) => ({
        class: ['!bg-black !bg-opacity-90']
      }),
    })
  }
}
export class useAiChatRoom {
  private locale?: any;
  private $t?: any;
  private $route?: any;
  public emit?: any

  public hasCopy?: Ref<boolean>
  public hoveredIcon?: Ref<string>

  public popoverShow?: Ref<any>
  public popoverTitle?: Ref<string>
  public popoverSubTitle?: Ref<string>

  public commentList?: Ref<string[]>
  public currentCommentType?: Ref<string>
  public goodCommentList?: Ref<string[]>
  public badCommentList?: Ref<string[]>
  public selectCommentList?: Ref<string[]>
  public commentInputMes?: Ref<string>
  public imgShowAll?: Ref<boolean>
  public showImgList?: Ref<any[]>
  public showImgValue?: Ref<any>
  public activeIndex?: Ref<number>
  public commentScore?: Ref<number>
  public selectedChatItem?: Ref<any> = ref(null)
  public previewVisible?: Ref<boolean>
  public previewContent?: Ref<string>
  constructor(t, locale, route, emit, popoverRef) {
    this.locale = locale;
    this.$t = t;
    this.$route = route;
    this.emit = emit

    this.hoveredIcon = ref('')
    this.hasCopy = ref(false)

    this.popoverShow = popoverRef
    this.popoverTitle = ref('')
    this.popoverSubTitle = ref(this.$t('Components.STAiChat.Reason'))

    this.commentList = ref(['good', 'bad'])
    this.currentCommentType = ref('good')
    this.goodCommentList = ref([this.$t('Components.STAiChat.Correct'), this.$t('Components.STAiChat.Easy_to_understand'), this.$t('Components.STAiChat.Correct_Answer'), this.$t('Components.STAiChat.Other')])
    this.badCommentList = ref([this.$t('Components.STAiChat.Incorrect'), this.$t('Components.STAiChat.Uncomfortable'), this.$t('Components.STAiChat.Unrelated'), this.$t('Components.STAiChat.Other')])
    this.selectCommentList = ref([])
    this.commentInputMes = ref('')
    this.imgShowAll = ref(false)
    this.showImgList = ref([])
    this.showImgValue = ref()
    this.activeIndex = ref(0)
    this.commentScore = ref(0)
    this.previewVisible = ref(false);
    this.previewContent = ref('')
    this.init()
  }

  public async init() {
  }

  public checkType(data) {
    if (typeof data == 'object') {
      return true
    } else {
      return false
    }
  }

  public async copyText(text: string) {
    await navigator.clipboard.writeText(text);
    this.hasCopy.value = true
  }

  public getImageUrl(name) {
    return new URL(`/src/assets/img/STAichat/${name}.svg`, import.meta.url).href
  }

  public setHoveredIcon(icon?: string) {
    if (icon) {
      this.hoveredIcon.value = icon
    } else {
      this.hoveredIcon.value = ''
    }
  }

  public checkHoveredIcon(icon?: string) {
    if (this.hoveredIcon.value == icon) {
      return true
    } else {
      return false
    }
  }

  public toggle(event?: any, type?: string, item?: any) {
    this.commentScore.value = 0
    this.selectCommentList.value = []
    this.commentInputMes.value = ''
    this.selectedChatItem.value = item
    if (this.popoverShow.value) {
      this.changePopover(type)
      this.popoverShow.value[0].toggle(event);
    }
  }

  public selectToggle(item: string) {
    const index = this.selectCommentList.value.indexOf(item);
    if (index > -1) {
      this.selectCommentList.value.splice(index, 1);
    } else {
      this.selectCommentList.value.push(item);
    }
  }

  public isSelected(item: string): boolean {
    return this.selectCommentList.value.includes(item);
  }

  public changePopover(type?: string) {
    this.currentCommentType.value = type
    this.popoverTitle.value = this.currentCommentType.value == CommentType.good ? this.$t('Components.STAiChat.Good_Title') : this.$t('Components.STAiChat.Bad_Title')
  }

  public submit(disabled: boolean) {
    // if(this.commentInputMes.value == '') return
    if (disabled) return
    const info = {
      comment: this.selectCommentList.value,
      commentText: this.commentInputMes.value,
      score: this.commentScore.value,
      sessionId: this.selectedChatItem.value.snapshot.sessionId
    }
    this.emit('sendComment', info)
    this.toggle()
  }

  public voicePlay(text?: string, index?: number) {
    this.emit('voicePlay', text, index)
  }

  public voiceStop() {
    this.emit('voiceStop')
  }

  public async downloadImage(url: string, filename: string) {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('下載圖片時發生錯誤:', error)
    }
  }

  public downloadAllImages(type?: Boolean) {
    let filename = ''
    if (type) {
      this.showImgList.value.forEach((item, index) => {
        if (item.file) {
          filename = item.file.name.replace('.svg', '')
        } else {
          filename = this.$t('Components.STAiChat.Image')
        }
        this.downloadImage(item.img, filename)
      })
    } else {
      const currentImg = this.showImgList.value[this.activeIndex.value]
      if (currentImg.file) {
        filename = currentImg.file.name.replace('.svg', '')
      } else {
        filename = this.$t('Components.STAiChat.Image')
      }
      this.downloadImage(currentImg.img, filename)
    }
  }

  public openImgShow(list, index: number) {
    this.imgShowAll.value = true
    this.showImgList.value = list
    this.activeIndex.value = index

    nextTick(() => {
      const viewport = document.querySelector('.p-galleria-thumbnails-viewport')
      if (viewport) {
        const vnode = h('div', {
          class: 'custom-div flex items-center gap-[1rem]',
        }, [
          h('div', {
            class: ['flex items-center gap-[8px]'],
            onClick: () => this.downloadAllImages(false)
          }, [
            h('img', { src: this.getImageUrl('downLoad'), class: 'w-[14px] h-[14px] object-contain' }),
            h('div', { class: ['text-h3 text-[#9E8EFF] cursor-pointer'] }, this.$t('Components.STAiChat.Save_Single')),
          ]),
          h('div', {
            class: ['flex items-center gap-[8px]'],
            onClick: () => this.downloadAllImages(true)
          }, [
            h('img', { src: this.getImageUrl('downLoadAll'), class: 'w-[14px] h-[14px] object-contain' }),
            h('div', { class: ['text-h3 text-[#9E8EFF] cursor-pointer'] }, this.$t('Components.STAiChat.Save_All')),
          ]),
        ])
        const container = document.createElement('div')
        render(vnode, container)
        viewport.appendChild(container.firstElementChild)
      }
    })
  }

  public openHostoryImgShow(event: any, item: any) {
    if (event.target.tagName == 'IMG') {
      this.openImgShow([{ img: `data:image/png;base64,${item}` }], 0)
    }
  }

  public convertActions(props: any) {
    if (props.messageBarList.length > 0) {
      return props.messageBarList
    } else return []
  }


  public openPreview(e, item) {
    this.previewContent.value = item.snapshot.content
    this.previewVisible.value = true;
  }


}