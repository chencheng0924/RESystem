import { ref, Ref } from "vue"
import { STCardItem } from "./STCardCustom.model";

export class UseSTCardCustom {
  private emit: any
  public props: Ref<STCardItem> = ref(null)
  public avatarBg: Ref<string> = ref('')
  private avatarBgColorList = ['#B982FF', '#27CBCB', '#DB6349', '#686EFF']

  constructor(emit: any, props: STCardItem) {
    this.emit = emit
    this.setProps(props)
    this.setRandomAvatarBg()
  }

  private setProps(props: STCardItem) {
    this.props.value = props
  }

  private setRandomAvatarBg() {
    const randomIdx = Math.floor(Math.random() * this.avatarBgColorList.length)
    this.avatarBg.value = `background-color: ${this.avatarBgColorList[randomIdx]};`
  }

  public ratingUpdate = (score: number) => {
    this.props.value.ratingScore = score
    this.emit('eventRatingUpdate', this.props.value)
  }

  public deleteCard = () => {
    this.emit('eventDeleteCard', this.props.value)
  }
}