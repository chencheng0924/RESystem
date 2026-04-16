import { Ref, ref } from "vue"
import { STListViewSearchProps } from "./STListViewSearch.model"
import { STSkeletonProps } from '@/components/smartcityui/STSkeleton.model'
import { IObjectGeneric } from "@/lib/pageBuilder/interface/IObjectGeneric"
import { PageSection } from "@/lib/pageBuilder/core/PageSection"
import { MenuItem } from "primevue/menuitem";
import { ChangeSelectStore } from "@/stores/ChangeSelect/ChangeSelectStore"
export class UseSTListViewSearch {
  private emit: any
  public props: Ref<STListViewSearchProps> = ref(null)
  public searchInput: Ref<string> = ref('')
  public isLoading: Ref<boolean> = ref(false)
  public skeletonProps: STSkeletonProps = new STSkeletonProps().setWidthHeight('100%', '200px')
  public activeIdx: Ref<number> = ref(0)

  constructor(emit: any, props: STListViewSearchProps, keyword: string) {
    this.emit = emit
    this.setProps(props)
    this.searchInput.value = keyword
    this.setCurrentActiveId();
  }

  public setProps(props: STListViewSearchProps) {
    this.props.value = new STListViewSearchProps(props)
  }

  public setCurrentActiveId() {

    this.activeIdx.value = this.props.value.getCurrentActiveId();
  }

  public searchKeyword() {
    this.emit('searchKeyword', this.searchInput.value, this.props.value.searchConditions)
  }

  public clearInput() {
    this.searchInput.value = ''
    this.emit('clearSearchKeyword')
  }

  public addNewItem() {
    this.emit('addNewItem')
  }

  public listItemClicked(props: IObjectGeneric, idx: number) {
    this.activeIdx.value = idx
    let entityObj = this.props.value.dataList.find((x, id) => id == idx)
    this.emit('eventListItemClicked', entityObj)
  }

  public activeStyle(item: any, idx) {

    if (idx == this.activeIdx.value) {
      return 'color: var(--fone-primary-click); background-color: var(--fone-primary-bg);'
    }
  }

  public clickedStyle(clickedIdx: number) {
    if (this.activeIdx.value == clickedIdx) {
      return 'color: var(--fone-primary-click); background-color: var(--fone-primary-bg);'
    }
  }

  public actionSubBtn(e, menuItem: MenuItem, subMenuItem: MenuItem, data: any) {
    this.emit('actionSubBtn', e, menuItem, subMenuItem, data)
  }

  public renameCompleted(val: string, id: string) {
    this.emit('renameCompleted', val, id)
  }

  public eventClickCardTitle(e, data) {
    this.emit('eventClicked', e, data)
  }
}