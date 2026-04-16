import { PageAction } from "./PageAction";
import { PageBase } from "./PageBase";
import { PageSection, PageSectionCardTitle } from "./PageSection";
import { PageToast } from "./PageTag";
import { PageSectionType } from "../enum/PageSectionType";
import { PageTreeItem } from "./PageTreeItem";
import { PageRecentItem } from "./PageRecentItem";
import { PageNode } from "./PageNode";
import { PageEdge } from "./PageEdge";
import { PageReload } from "./PageReload";
import { PageFormItem } from "./PageFormItem";
import { PageTimelineItem } from "./PageTimelineItem";
import { PageChatItem } from "./PageChatItem";
import { PageTimeRangeItem } from "./PageTimeRangeItem";
import { IGetList } from "../interface/IGetList";
import { MenuItem } from "primevue/menuitem";
import { PageState } from "primevue/paginator";
import { PageCardTitleItem } from "./PageCardTitleItem";
import { IObjectGeneric } from "../interface/IObjectGeneric";
import { PageCardItem } from "./PageCardItem";
import { PageTableViewLayout } from "./PageTableColumn";
import { PageEditorData } from "./PageEditorData";
import { useDebounceFn } from '@vueuse/core'
import { PageEventBus, PageEventBusItem, PageEventEnum } from "../mitt/PageEventBus";
import { PageViewport } from "./PageViewport";
import { STFormItem } from "@/components/smartcityui/STForm.model";
export class PageView extends PageBase {
  public Title?: string = '';
  public IsBack?: boolean = false;
  public reload?: PageReload = new PageReload();
  public currentToast?: PageToast = new PageToast();
  private recentItem?: PageRecentItem = null;
  public autoSaveForm?: boolean = false;
  private autoSaveDebounceTime?: number = 1500;
  private autoSaveOld?: boolean = false;
  public IsToolBar?: boolean = true;
  constructor(init?) {
    super();
    Object.assign(this, init);
  }
  public OpenDrawer() {
    if (this.autoSaveOld) {
      this.autoSaveForm = false
    }
    this.DrawerVisibleRight = true;
  }
  public CloseDrawer() {
    this.autoSaveForm = this.autoSaveOld
    this.DrawerVisibleRight = false;
  }
  public OpenDrawerSecond() {
    if (this.autoSaveOld) {
      this.autoSaveForm = false
    }
    this.DrawerSecondVisibleRight = true;
  }
  public CloseDrawerSecond() {
    this.autoSaveForm = this.autoSaveOld
    this.DrawerSecondVisibleRight = false;
  }
  public OpenProgressBar() {
    this.ProgressBar = true;
  }
  public CloseProgressBar() {
    this.ProgressBar = false;
  }
  public OpenDialog() {
    this.DialogVisible = true;
  }
  public CloseDialog() {
    this.DialogVisible = false;
  }

  public async SetInitData(params?: string, className?: string) { }
  public getPageRecentItem() {
    return this.recentItem;
  }
  public setPageRecentItem(item: PageRecentItem) {
    this.recentItem = item;
    return this;
  }

  public setPKID(pkid: string) {
    this.Pkid = pkid;
    return this;
  }
  public setEntityName(entityName: string) {
    this.EntityName = entityName;
    return this;
  }
  public getPKID() {
    return this.Pkid;
  }
  public getEntityName() {
    return this.EntityName;
  }

  public setCurrentTab(tabid: string) {
    if (this.PageSections.length == 0) return this;

    let tabsec = this.PageSections.find(
      (x) => x.SectionType == PageSectionType.PAGE_TABS
    );
    if (tabsec == null) return this;

    tabsec.ToolbarActions.forEach((x) => {
      if (x.Id == tabid) x.setActive(true);
      else x.setActive(false);
    });
  }

  setLocalize(t: any, locale: any) {
    this.$t = t
    this.locale = locale
    return this
  }
  setSuccessToast(msg: string) {
    this.currentToast.setSuccess().setToast(this.$t('Components.Toast.Success'), this.$t(msg));
  }
  setInfoToast(msg: string) {
    this.currentToast.setInfo().setToast(this.$t('Components.Toast.Info'), this.$t(msg));
  }
  setErrorToast(msg: string) {
    this.currentToast.setError().setToast(this.$t('Components.Toast.Error'), this.$t(msg));
    if (this.autoSaveForm)
      this.SaveFailed();
  }
  setWarnToast(msg: string) {
    this.currentToast.setWarn().setToast(this.$t('Components.Toast.Warn'), this.$t(msg));
  }

  public hasGetList(object: any = this): object is IGetList {
    return 'getList' in this;
  }

  public setAutoSaveForm(status: boolean) {
    this.autoSaveForm = status;
    this.autoSaveOld = status;
    return this;
  }
  public setAutoSaveDebounceTime(time: number) {
    this.autoSaveDebounceTime = time;
    return this;
  }
  debouncedSave = useDebounceFn(async (data: any, currentSec: PageSection) => {
    await this.SetEvent_AutoSaveAction(currentSec, data)

  }, this.autoSaveDebounceTime)


  public SaveOk() {
    PageEventBus.getInstance.triggerEvent(new PageEventBusItem().setEventName(PageEventEnum.FormItemSaved));
  }
  public SaveFailed() {
    PageEventBus.getInstance.triggerEvent(new PageEventBusItem().setEventName(PageEventEnum.FormItemSaveFailed));
  }
  public Saveing() {
    PageEventBus.getInstance.triggerEvent(new PageEventBusItem().setEventName(PageEventEnum.FormItemSaveing));
  }

  public updateSectionAll() {
    PageEventBus.getInstance.triggerEvent(new PageEventBusItem().setEventName(PageEventEnum.PageSecUpdateAll));
  }
  // -----------------------------------------------------------------------------------------------------
  public async loadEntity() {
    return this;
  }
  public refresh() {
    this.reload?.Reload();
    return this;
  }

  public geBack() {
    PageEventBus.getInstance.triggerEvent(
      new PageEventBusItem()
        .setEventName(PageEventEnum.PageGoBack)
    );
  }

  // 記錄 table toolbar action 的event
  public SetEvent_TableToolbarAction(
    action: PageAction,
    selectRows?: Array<any>,
    sec?: PageSection
  ) { }
  public SetEvent_TableRowAction(
    currentAction: PageAction,
    item?: any,
    sec?: PageSection
  ) { }
  public async SetEvent_TableSearchAction(
    currentAction: PageAction,
    conditions?: any,
    sec?: PageSection
  ) { }
  public async SetEvent_TablePageChange(event: any, sec?: PageSection, conditions?: any) { }
  public async SetEvent_TableUpdateRows(event: any, sec?: PageSection, conditions?: any) { }

  public async SetEvent_FormInit(e: any, currentItem: PageFormItem) { }
  public async SetEvent_FormChange(e: any, currentSec: PageSection) {
    if (this.autoSaveForm) {
      this.Saveing();
      this.debouncedSave(e, currentSec)
    }
  }
  public SetEvent_FormAction(e: any, currentAction: PageAction) { }
  public async SetEvent_FormUploading(sec?: PageSection, e?: any, currentItem?: PageFormItem) { }
  public SetEvent_FormDeleteImage(e: any, currentItem: PageFormItem) { }

  public SetEvent_Upload(event: any, sec?: PageSection) { }
  public SetEvent_BeforeUpload(event: any, sec?: PageSection) { }

  public SetEvent_PageToolbarAction(currentAction: PageAction, sec?: PageSection) { }
  public SetEvent_PageTabAction(currentAction: PageAction, sec?: PageSection) { }

  public SetEvent_TreeToolbarAction(
    action: PageAction,
    selectRows?: Array<any>,
    sec?: PageSection
  ) { }
  public SetEvent_TreeNodeSelected(item: PageTreeItem, sec?: PageSection) { }

  public SetEvent_DialogAction(action: PageAction, sec?: PageSection) { }
  public SetEvent_DialogGoBack(e: any) { }

  public SetEvent_SaveAction(sec?: PageSection) { }

  public SetEvent_Uploading(sec?: PageSection, e?: any) { }

  public SetEvent_UploadSelectedFiles(sec?: PageSection, e?: any) { }
  public SetEvent_UploadAfter(sec?: PageSection, e?: any) { }
  public async SetEvent_UploadCustomAfter(sec?: PageSection, e?: any, item?: PageFormItem): Promise<boolean> { return true; }
  public SetEvent_UploadBeforeSend(sec?: PageSection, e?: any) { }
  public SetEvent_UploadBefore(sec?: PageSection, e?: any) { }
  public SetEvent_UnUploadedRemove(sec?: PageSection, e?: any) { }
  public SetEvent_UploadedRemoveFile(sec?: PageSection, e?: any) { }
  public SetEvent_UploadError(sec?: PageSection, e?: any) { }

  public SetEvent_WorkflowAction(sec?: PageSection, nodes?: Array<PageNode>, edges?: Array<PageEdge>, viewport?: PageViewport, action?: PageAction) { }
  public SetEvent_WorkflowNodeAction(sec?: PageSection, action?: PageAction, node?: PageNode, nodes?: Array<PageNode>, edges?: Array<PageEdge>) { }
  public SetEvent_WorkflowEdgeAction(sec?: PageSection, action?: PageAction, edge?: PageEdge) { }
  public SetEvent_WorkflowRunChat(sec?: PageSection, wfobject?: any) { }

  public SetEvent_TimelineItemAction(sec?: PageSection, item?: PageTimelineItem) { }
  public SetEvent_ChatlineItemAction(sec?: PageSection, item?: PageChatItem) { }
  public SetEvent_ChatlineItemButtonAction(sec?: PageSection, item?: PageAction) { }
  public SetEvent_TimeRangeItemAction(sec?: PageSection, items?: Array<PageTimeRangeItem>) { }
  public SetEvent_SearchSectionAction(sec?: PageSection, input?: PageFormItem) { }
  public SetEvent_BlackListAction(sec?: PageSection) { }
  public SetEvent_NoteLTAction(e?: Event, item?: PageAction) { }

  public SetEvent_EditorChangeAction(e?: any, sec?: PageSection) { }
  public SetEvent_ListViewSearchGetNextDataAction(sec?: PageSection, pageIndex?: number, pageRows?: number) { }
  public SetEvent_ListViewSearchKeyword(sec?: PageSection, keyword?: string, conditions?: Array<STFormItem>) { }
  public SetEvent_ListViewClearSearchKeyword(sec?: PageSection) { }
  public SetEvent_CardTitleSubMenuClicked(e?: Event, menuItem?: MenuItem, subMenuItem?: MenuItem, sec?: PageSection, clickedData?: any) { }
  public SetEvent_CardTitleRenameComplete(name?: string, id?: string, sec?: PageSection) { }
  public SetEvent_CardPanelPaginatorUpdate(state?: PageState, sec?: PageSection) { }
  public SetEvent_CardPanelGetNextDataAction(sec?: PageSection) { }
  public SetEvent_TableViewCardPanelPaginatorUpdate(state?: PageState, sec?: PageSection) { }
  public SetEvent_TableViewCardPanelGetNextDataAction(sec?: PageSection) { }
  public SetEvent_ListViewAddNewItem(sec?: PageSection) { }
  public SetEvent_CardTitleClicked(sec?: PageSection, clickedDataProps?: IObjectGeneric) { }
  public SetEvent_TableViewCardRatingUpdate(sec?: PageSection, card?: PageCardItem) { }
  public SetEvent_TableViewCardDelete(sec?: PageSection, card?: PageCardItem) { }
  public SetEvent_TableViewKeywordSearch(sec?: PageSection, txt?: string) { }
  public SetEvent_TableViewKeywordSearchClear(sec?: PageSection) { }
  public SetEvent_TableViewTypeUpdate(sec?: PageSection, mode?: PageTableViewLayout) { }
  public SetEvent_TableViewCardClicked(sec?: PageSection, card?: PageCardItem) { }
  public SetEvent_PromptConfigCardClicked(sec?: PageSection, card?: PageCardItem) { }
  public SetEvent_PromptConfigFormUpdate(sec?: PageSection, data?: any) { }
  public SetEvent_PromptConfigAccordionUpdate(sec?: PageSection, data?: string[]) { }
  public SetEvent_PromptConfigScrollRightPage(sec?: PageSection, scrollTop?: number) { }
  public SetEvent_PromptConfigCardZoneUpdate(sec?: PageSection, cardZoneStatus?: boolean) { }
  public SetEvent_PromptConfigEditorUpdate(sec?: PageSection, data?: PageEditorData) { }
  public SetEvent_PromptConfigManualSave(sec?: PageSection) { }
  public SetEvent_AutoSaveAction(sec?: PageSection, data?: any) { }
  public SetEvent_UpdateLogData(sec?: PageSection, data?: any) { }
  public SetEvent_ShowCanCallAPI(sec?: PageSection, data?: any) { }
  public SetEvent_AgentEditPromptHistorySave(sec?: PageSection, data?: any) { }
  public SetEvent_AgentEditPromptHistoryLoad(sec?: PageSection) { }
  public SetEvent_IconBtnAction(sec?: PageSection, data?: any) { }
  public SetEvent_FormBtnAction(sec?: PageSection, data?: any) { }
  public SetEvent_PageAction(currentAction: PageAction) { }
  public SetEvent_SelectSearchInputChange(event: any, sec?: PageSection) { }
  public SetEvent_SelectSearchChangeSelected(event: any, sec?: PageSection) { }
  public SetEvent_KeyValueAdd(sec?: PageSection, data?: any) { }
  public SetEvent_KeyValueDelete(sec?: PageSection, data?: any, index?: any) { }
  public SetEvent_CardClick(sec?: PageSection, item?: PageCardItem) { }
  public SetEvent_TabRowEvent(sec?: PageSection, currentAction?: PageAction, data?: any) { }
  public SetEvent_TabChangeItem(sec?: PageSection, currentAction?: PageAction, data?: any) { }
  public SetEvent_ListClick(sec?: PageSection, currentAction?: PageAction, data?: any) { }
  public SetEvent_NewsMoreClick(sec?: PageSection, currentAction?: PageAction) { }
  public SetEvent_CardMoreClick(sec?: PageSection, item?: any, type?: string) { }
  public SetEvent_HistoryDeleteClick(sec?: PageSection, currentAction?: PageAction, data?: any, row?: any) { }
  public SetEvent_CardSelectClick(data?: any, sec?: PageSection) { }
}