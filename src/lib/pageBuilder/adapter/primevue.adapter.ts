import { STTimeRangeItem } from './../../../components/smartcityui/STTimeSelect.model';

import STTable from "@/components/smartcityui/STTable.vue";
import {
  STConditionItem,
  STDataTableAction,
  STDataTableColumn,
  STDataTableCustomFunction,
  STDataTableProps,
  STTableShowMode,
  STTableViewLayout,
} from "@/components/smartcityui/STTable.model";
import { PageSectionType } from "../enum/PageSectionType";
import { PageAction } from "../core/PageAction";
import { PageView } from "../core/PageView";
import STForm from "@/components/smartcityui/STForm.vue";
import STPageTitle from "@/components/smartcityui/STPageTitle.vue";
import {
  STFormEvent,
  STFormItem,
  STFormProps,
} from "@/components/smartcityui/STForm.model";
import { PageFormItem } from "../core/PageFormItem";
import {
  STPageTitleAction,
  STPageTitleProps,
} from "@/components/smartcityui/STPageTitle.model";
import {
  STMenubarAction,
  STMenubarProps,
} from "@/components/smartcityui/STMenubar.model";
import STMenubar from "@/components/smartcityui/STMenubar.vue";
import STMenu from "@/components/smartcityui/STMenu.vue";
import { STMessageProps } from "@/components/smartcityui/STMessage.model";
import STMessage from "@/components/smartcityui/STMessage.vue";
import STMasterInfo from "@/components/smartcityui/STMasterInfo.vue";
import { STIconText, STMasterInfoProps } from "@/components/smartcityui/STMasterInfo.model";
import { STAvatar, STPosition, STTreeItem } from "@/components/smartcityui/STCommon.model";
import STTab from "@/components/smartcityui/STTab.vue";
import { STTabAction, STTabProps } from "@/components/smartcityui/STTab.model";
import { PageBuilder } from "../base/PageBuilder";
import STUploadFileManagement from "@/components/smartcityui/STUploadFileManagement.vue";
import {
  STUploadFileItem,
  STUploadFileManagementEvent,
  STUploadFileManagementProps,
} from "@/components/smartcityui/STUploadFileManagement.model";
import Upload from "@/components/smartcityui/STUpload.vue";
import { UploadProps, UploadEvent, UploadFile } from "@/components/smartcityui/STUpload.model";
import { PageTreeItem } from "../core/PageTreeItem";
import { STCardNumberProps } from "@/components/smartcityui/STCardNumber.model";
import STCardNumber from "@/components/smartcityui/STCardNumber.vue";
import STTree from "@/components/smartcityui/STTree.vue";
import { STTreeProps } from "@/components/smartcityui/STTree.model";
import STDialog from "@/components/smartcityui/STDialog.vue";
import {
  STDialogActions,
  STDialogContent,
  STDialogEvent,
  STDialogProps,
} from "@/components/smartcityui/STDialog.model";
import { STMarkdownProps } from "@/components/smartcityui/STMarkdown.model";
import STMarkdown from "@/components/smartcityui/STMarkdown.vue";
import { PageSection, PageSectionCardPanel, PageSectionCustom, PageSectionDashboardBar, PageSectionEditor, PageSectionTabContent, PageSectionCardTitle, PageSectionListViewSearch, PageSectionTableView, PageSectionAiChat, PageSectionSlider, PageSectionAttributePanel, PageSectionAIChatNew, PageSectionDialog, PageSectionKeyValue, PageSectionTabs } from "../core/PageSection";
import STFilter from "@/components/smartcityui/STFilter.vue";
import { STFilterEvent, STFilterProps } from "@/components/smartcityui/STFilter.model";
import STTimeline from "@/components/smartcityui/STTimeline.vue";
import { STTimelineEvent, STTimelineItem, STTimelineProps } from "@/components/smartcityui/STTimeline.model";
import { STTagProps, STTagType } from "@/components/smartcityui/STTag.model";
import { STButtonConfig, STButtonType } from "@/components/smartcityui/STButton.model";
import { PageTimelineItem } from "../core/PageTimelineItem";
import { PageTag } from "../core/PageTag";
import STChat from "@/components/smartcityui/STChat.vue";
import { STChatAlertItem, STChatDisplayType, STChatEvent, STChatItem, STChatProps } from "@/components/smartcityui/STChat.model";

import STFileDownload from '@/components/smartcityui/STFileDownload.vue'
import { STFileItem } from "@/components/smartcityui/STFileDownload.model";
import STAccordion from '@/components/smartcityui/STAccordion.vue'
import { STAccordionConfig } from "@/components/smartcityui/STAccordion.model";
import { PageChatItem } from "../core/PageChatItem";
import { IPageCustom } from "../interface/IPageCustom";
import STTabContent from "@/components/smartcityui/STTabContent.vue";
import { STTabContentProps } from "@/components/smartcityui/STTabContent.model";
import STSearchBar from '@/components/smartcityui/STSearchBar.vue'
import { PageItem, PageItemSeverityStyle } from "../enum/PageFormItemEnum";
import { STDashboardBarProps } from "@/components/smartcityui/STDashboardBar.model";
import STDashboardBar from '@/components/smartcityui/STDashboardBar.vue';
import { PageTimeRangeItem } from "../core/PageTimeRangeItem";

import STEditor from '@/components/smartcityui/STEditor.vue'
import { STEditorData, STEditorProps } from '@/components/smartcityui/STEditor.model';

import STCardTitle from '@/components/smartcityui/STCardTitle.vue'
import { STCardTitleProps } from '@/components/smartcityui/STCardTitle.model';

import STListViewSearch from '@/components/smartcityui/STListViewSearch.vue'
import { STListViewSearchProps, STListViewItem, STListViewShowType } from '@/components/smartcityui/STListViewSearch.model'
import { MenuItem } from 'primevue/menuitem';

import STCardPanel from '@/components/smartcityui/STCardPanel.vue'
import { STCardItem } from '@/components/smartcityui/STCardCustom.model';
import { STCardPanelLayout, STCardPanelMode, STCardPanelProps } from '@/components/smartcityui/STCardPanel.model';
import { STIconButtonProps } from '@/components/smartcityui/STIconButton.model';
import { STPaginatorProps } from '@/components/smartcityui/STPaginator.model';
import { PageState } from 'primevue/paginator';

import STTableView from '@/components/smartcityui/STTableView.vue'

import STAIChat from '@/lib/AIChat/components/STAIChat/STAIChat.vue'
import { PageCardTitleItem } from '../core/PageCardTitleItem';
import { IObjectGeneric } from '../interface/IObjectGeneric';
import { PageCardItem } from '../core/PageCardItem';
import { PageCardType } from '../enum/PageCardType';
import { PageTableViewLayout } from '../core/PageTableColumn';
import STSlider from '@/components/smartcityui/STSlider.vue'
import STAttributePanel from '@/components/smartcityui/STAttributePanel.vue'
import { STSliderProps } from '@/components/smartcityui/STSlider.model';
import { STAttributePanelProps } from '@/components/smartcityui/STAttributePanel.model';
import { STAccordionCustomConfig } from '@/components/smartcityui/STAccordionCustom.model';
import { PageEdge } from '../core/PageEdge';
import STWorkflow from '@/components/smartcityui/WF/STWorkflow.vue'

import { STworkflowProps, STNode, STNodePosition, STEdge, STWorkflowEvent } from '@/components/smartcityui/WF/STWorkflow.model';
import { PageNode } from '../core/PageNode';

import { STAichatAgentData, STAIChatDepsType, STAichatProps } from '@/lib/AIChat/model/STAIChat.model'
import { PageViewport } from '../core/PageViewport';
import STTreeForm from '@/components/smartcityui/STTreeForm.vue';
import { STTreeFromProps } from '@/components/smartcityui/STTreeForm.model';
import STMultiSelectSearch from '@/components/smartcityui/STMultiSelectSearch.vue';
import { STMultiSelectSearchProps, STMultiSelectSearchEvent } from '@/components/smartcityui/STMultiSelectSearch.model';
import STKeyValue from '@/components/smartcityui/STKeyValue.vue';
import {
  STKeyValueItem,
  STKeyValueEvent
} from "@/components/smartcityui/STKeyValue.model";
import { STMenuAction, STMenuProps } from '@/components/smartcityui/STMenu.model';
import STTabList from '@/components/smartcityui/STTabList.vue'
import { STTabListEvent } from '@/components/smartcityui/STTabList.model';

import STCardSelect from '@/components/smartcityui/STCardSelect.vue';
import { STCardSelectProps, STCardSelectEvent } from '@/components/smartcityui/STCardSelect.model';

import STVersion from '@/components/smartcityui/STVersion.vue';
import { STVersionProps } from '@/components/smartcityui/STVersion.model';



export class PageSectionFactory {
  static toPrimVueComp(self: PageBuilder, view: PageView, sec: PageSection) {
    if (sec.isPageCustom()) {
      let icustom = (<object>sec) as IPageCustom;
      if (icustom == null) {
        return sec;
      };

      return icustom.toComponent(self, view, sec).setRefreshId();
    }
    else if (sec.SectionType == PageSectionType.TABLE) {
      return PageSectionFactory.toPrimVueDataTable(self, view, sec).setRefreshId();
    } else if (sec.SectionType == PageSectionType.FORM)
      return PageSectionFactory.toPrimVueForm(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.PAGE_TITLE)
      return PageSectionFactory.toPrimVueTitle(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.PAGE_MENUBAR)
      return PageSectionFactory.toPrimVueMenubar(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.PAGE_MESSAGE)
      return PageSectionFactory.toPrimVueMessage(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.PAGE_MASTER_INFO)
      return PageSectionFactory.toPrimVueMasterInfo(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.PAGE_TABS)
      return PageSectionFactory.toPrimVueTabs(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.TABLE_SEARCH)
      return PageSectionFactory.toPrimVueDataTableSearch(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.FILE_UPLOAD)
      return PageSectionFactory.toPrimVueFileUpload(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.UPLOAD)
      return PageSectionFactory.toPrimVueUpload(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.DASHBOARD_CARDNUMBER)
      return PageSectionFactory.toPrimVueDashboardCardNumber(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.TREE)
      return PageSectionFactory.toPrimVueTree(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.DIALOG)
      return PageSectionFactory.toPrimVueDialog(self, view, sec);
    else if (sec.SectionType == PageSectionType.MARKDOWN)
      return PageSectionFactory.toPrimVueMarkdown(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.WORKFLOW)
      return PageSectionFactory.toPrimVueWorkflow(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.TABLE_SEARCH_FILTER)
      return PageSectionFactory.toPrimVueFilter(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.TIMELINE)
      return PageSectionFactory.toPrimVueTimeline(self, view, sec).setRefreshId();

    else if (sec.SectionType == PageSectionType.CHATLINE)
      return PageSectionFactory.toPrimVueChatline(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.FILE_DOWNLOAD)
      return PageSectionFactory.toPrimVueFileDownload(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.ACCORDION)
      return PageSectionFactory.toPrimVueAccordion(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.TABCONTENT)
      return PageSectionFactory.toPrimVueTabContent(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.SEARCHBAR)
      return PageSectionFactory.toPrimVueSearchBar(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.DASHBOARD_BAR)
      return PageSectionFactory.toPrimVueDashboardBar(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.EDITOR)
      return PageSectionFactory.toPrimVueEditor(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.CARDTITLE)
      return PageSectionFactory.toPrimVueCardTitle(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.LISTVIEW_SEARCH)
      return PageSectionFactory.toPrimVueListViewSearch(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.CARDPANEL)
      return PageSectionFactory.toPrimVueCardPanel(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.TABLE_VIEW)
      return PageSectionFactory.toPrimVueTableView(self, view, sec).setRefreshId()

    else if (sec.SectionType == PageSectionType.SLIDER)
      return PageSectionFactory.toPrimVueSlider(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.ATTRIBUTE_PANEL)
      return PageSectionFactory.toPrimVueAttributePanel(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.TREE_FORM)
      return PageSectionFactory.toPrimVueDataTreeForm(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.AI_CHAT_NEW)
      return PageSectionFactory.toPrimVueAiChatNew(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.MUlTI_SELECT_SEARCH)
      return PageSectionFactory.toPrimVueMultiSelectSearch(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.KeyValue)
      return PageSectionFactory.toPrimVueKeyValue(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.MENU)
      return PageSectionFactory.toPrimVueMenu(self, view, sec).setRefreshId();
    else if (sec.SectionType == PageSectionType.TabList)
      return PageSectionFactory.toPrimVueTabList(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.CARDSELECT)
      return PageSectionFactory.toPrimVueCardSelect(self, view, sec).setRefreshId()
    else if (sec.SectionType == PageSectionType.VERSION)
      return PageSectionFactory.toPrimVueVersion(self, view, sec).setRefreshId()

    return sec.setRefreshId();
  }

  static toPrimVueDataTable(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {

    sec.Component = STTable;
    let pros = new STDataTableProps();
    pros.setDatas(sec.TableOps.Datas);
    let newCols = sec.TableOps.Columns?.map((x) => {
      let tempCol = new STDataTableColumn({
        field: x.Field,
        header: x.Field,
        title: x.Title,
        actions: x.Actions,
        cellValue: x.CellValue,
        cellValueByHtml: x.CellValueByHtml,
        isCellHtml: x.IsCellHtml,
        isImage: x.IsImage,
        isFormItem: x.IsFormItem,
        truncateNum: x.TruncateNum
      });
      return tempCol;
    });
    pros.setColumns(newCols);
    let newAcs = sec.TableOps.CustomAction?.map((x) => {
      return new STDataTableAction(x);
    });
    pros.setActions(newAcs);


    // set sub
    let isSub = sec.TableOps.SubTable?.IsSubTable ?? false;
    if (isSub) {
      pros.setSubKey(sec.TableOps.SubTable?.SubTableKey);
      let subnewCols = sec.TableOps.SubTable?.Columns?.map((x) => {
        let tempCol = new STDataTableColumn({
          field: x.Field,
          header: x.Field,
          title: x.Title,
          actions: x.Actions,
          cellValue: x.CellValue,
          cellValueByHtml: x.CellValueByHtml,
          isCellHtml: x.IsCellHtml,
          isImage: x.IsImage,
          isFormItem: x.IsFormItem,
          showFilterCondition: x.showFilterCondition,
        });
        return tempCol;
      });

      pros.setSubColumns(subnewCols)
    }
    pros.setShowCheckBox(sec.TableOps.ShowCheckBox)
    pros.setPageParams(sec.TableOps.PageParams?.toSTDataTablePageParams())
    pros.setTableTotalRows(sec.TableOps?.TableTotalRows ?? sec.TableOps.Datas?.length)  // 設定總筆數
    pros.setEmptyTitleAndSubTitle(sec.EmptyTitle, sec.EmptySubTitle)


    sec.Props = pros;

    sec.Events = {
      eventActionBtn: async (item, seles) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TableToolbarAction(tempAction, seles, sec);
        self.updateView(view);
      },
      eventActionBtnByRow: async (item, data) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TableRowAction(tempAction, data, sec);
        self.updateView(view);
      },
      eventPageChange: async (event, conditions) => {
        await view.SetEvent_TablePageChange(event, sec, conditions);
        self.updateEntitySection(view, sec.Path);
      },
      eventUpdateRows: async (event, conditions) => {
        await view.SetEvent_TableUpdateRows(event, sec, conditions);
        self.updateEntitySection(view, sec.Path);
      }
    };
    return sec;
  }
  static toPrimVueForm(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STForm;
    let pros = new STFormProps();
    let item = sec.FormOps?.FormItems ?? [];
    item.forEach((x) => {
      if (sec.Edit == false)
        x.IsDisabled = true;

      if (x.AlwaysEnable)
        x.IsDisabled = !x.AlwaysEnable;

      if (x.Type == PageItem.PageSection) {
        let itemSec = x.Value as PageSection;
        if (itemSec.SectionType == PageSectionType.AI_CHAT) {
          x.Value = PageSectionFactory.toPrimVueAiChatNew(self, view, itemSec);
          x.ComponentType = STAIChat;
        }
        else {
          let formItemSec = x.Value as PageSectionCustom;
          if (formItemSec.isPageCustom()) {
            let icustom = (<object>formItemSec) as IPageCustom;
            if (icustom != null) {
              x.Value = icustom.toComponent(self, view, formItemSec)
            };
          }
        }//end else


      }

    });


    pros.setFormItems(item.filter(x => x.IsHidden == false).map((x) => {
      let stitem = new STFormItem(x);
      stitem.UploadFiles = x.UploadFiles?.map((y) => {
        return new UploadFile({
          name: y.Title,
          type: y.Type?.toString() ?? '',
          hasDelete: y.HasDelete
        }).setSize(y.Size).setStatus(y.Status)
      })

      return stitem;
    }));

    sec.Props = pros;

    sec.Events = new STFormEvent({
      change: async (event) => {
        let item: PageFormItem = event["targetItem"];
        let secItem = sec.FormOps?.FormItems?.find(
          (x) => x.Field == item?.Field
        );
        Object.assign(secItem, item);
        await view.SetEvent_FormChange(event, sec);
      },
      upload: async (e, formitem) => {
        let item: PageFormItem = formitem;
        await view.SetEvent_FormUploading(sec, e, item);
        self.updateEntitySection(view, sec.Path);
      },
      uploadCallback: async (e, formitem) => {
        let item: PageFormItem = formitem;
        return view.SetEvent_UploadCustomAfter(sec, e, item);

        // self.updateEntitySection(view, sec.Path);
      },
      btnAction: (e, action) => {
        const tempAction = new PageAction(action);
        view.SetEvent_FormAction(e, tempAction);
      },
      deleteImage: async (e, currentItem, imageDeleteItem) => {

        let secItem = sec.FormOps?.FormItems?.find((x) => x.Id == currentItem?.Id);
        secItem.Value = secItem.Value?.filter(x => x.UrlID != imageDeleteItem.UrlID);

        const tempAction = new PageFormItem(imageDeleteItem);
        view.SetEvent_FormDeleteImage(e, tempAction);
      },
      init: async (controller, item) => {
        const tempAction = new PageFormItem(item);
        await view.SetEvent_FormInit(controller, tempAction);
      },
      iconBtnEvent: async (data: any) => {
        await view.SetEvent_IconBtnAction(sec, data)
      },
      formBtnEvent: async (data: any) => {
        await view.SetEvent_FormBtnAction(sec, data)
      },
      addItem: async (data: any) => {
        await view.SetEvent_KeyValueAdd(sec, data)
      },
      deleteItem: async (data: any, index?: any) => {
        await view.SetEvent_KeyValueDelete(sec, data, index)
      },
      tabRowEvent: async (data: any) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TabRowEvent(sec, tempAction, data)
      },
      tabChangeItem: async (data: any) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TabChangeItem(sec, tempAction, data)
      },
      listClickEvent: async (data: any) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_ListClick(sec, tempAction, data)
      }
    });
    return sec;
  }
  static toPrimVueTitle(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STPageTitle;
    let pros = new STPageTitleProps();
    pros.setActions(sec.ToolbarActions.map((x) => new STPageTitleAction(x)));
    pros.title = sec.Title;
    pros.setIsInfo(sec.isInfoPage)
    sec.Props = pros;

    return sec;
  }
  static toPrimVueMenubar(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STMenubar;
    let pros = new STMenubarProps();
    if (sec.ToolbarActions.length == 0)
      sec.Display = false;
    pros.setActions(sec.ToolbarActions.map((x) => new STMenubarAction(x)));
    pros.title = sec.Title;
    sec.Props = pros;
    sec.Events = {
      eventActionBtn: async (item) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_PageToolbarAction(tempAction, sec);
        self.updateView(view);
      },
    };

    return sec;
  }
  static toPrimVueMessage(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STMessage;
    let pros = new STMessageProps({
      title: sec.Message.Title,
      text: sec.Message.Text,
      icon: "pi pi-info-circle",
      severity: sec.Message.SeverityColor,
      life: sec.Message.Life
    });

    sec.Props = pros;

    return sec;
  }
  static toPrimVueMasterInfo(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STMasterInfo;
    let tags = "";
    let tagv = "";
    if (sec.MasterInfoOps.IsTag) {
      tags = sec.MasterInfoOps.TagInfo.SeverityColor;
      tagv = sec.MasterInfoOps.TagInfo.Text;
    }
    let avatorObj = null;
    if (sec.MasterInfoOps.IsAvatar) {
      avatorObj = new STAvatar(sec.MasterInfoOps.AvatarInfo);
    }

    let pros = new STMasterInfoProps({
      title: sec.MasterInfoOps.Title,
      dateInfo: sec.MasterInfoOps.DateInfo,
      desc: sec.MasterInfoOps.Description,
      tagSeverity: tags,
      tagValue: tagv,
      avatar: avatorObj,
      cardpt: sec.MasterInfoOps.Cardpt,
      iconTexts: sec.MasterInfoOps.IconTexts.map(x => new STIconText({ icon: x.Icon, text: x.Text }))
    });

    sec.Props = pros;

    return sec;
  }
  static toPrimVueDashboardCardNumber(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STCardNumber;

    let props = new STCardNumberProps({
      title: sec.CardOps?.cardNumber?.Title,
      number: sec.CardOps?.cardNumber?.Number,
      subTitle: sec.CardOps?.cardNumber?.SubTitle,
      subDesc: sec.CardOps?.cardNumber?.SubDesc,
      icon: sec.CardOps?.cardNumber?.Icon,
      iconBlock: sec.CardOps?.cardNumber?.IconBlock,
    });

    sec.Props = props;

    return sec;
  }

  static toPrimVueDataTableSearch(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STTable;
    let pros = new STDataTableProps();
    // table data
    pros.setDatas(sec.TableOps.Datas);
    let newCols = sec.TableOps.Columns?.map((x) => {
      let tempCol = new STDataTableColumn({
        field: x.Field,
        header: x.Field,
        title: x.Title,
        actions: x.Actions,
        cellValue: x.CellValue,
        cellValueByHtml: x.CellValueByHtml,
        isCellHtml: x.IsCellHtml,
        isFormItem: x.IsFormItem,
        truncateNum: x.TruncateNum,
        showFilterCondition: x.showFilterCondition,
      });
      return tempCol;
    });
    pros.setColumns(newCols);
    let newAcs = sec.TableOps.CustomAction?.map((x) => {
      return new STDataTableAction(x);
    });
    pros.setActions(newAcs);

    // search
    pros.setShowCheckBox(sec.TableOps.ShowCheckBox)
    pros.setSearchEnable(sec.TableOps.IsSearchCondition);
    pros.setSearchActions(sec.FormOps.CustomAction);
    let item = sec.FormOps?.FormItems ?? [];
    pros.setSearchCondition(item.map((x) => new STConditionItem(x)));
    pros.setCustomFunction(new STDataTableCustomFunction(sec.TableOps.CustomObject))

    pros.setPageParams(sec.TableOps.PageParams?.toSTDataTablePageParams())
    pros.setTableTotalRows(sec.TableOps?.TableTotalRows ?? sec.TableOps.Datas?.length)  // 設定總筆數

    if (sec.TableOps?.EntityTabs?.length > 0) {
      pros.setTabActions(sec.TableOps?.EntityTabs.map((x) => {
        return new STTabAction(x);
      }));
    }
    pros.setSearchInput(sec.TableOps.SearchKeyWord ?? '');
    pros.setEmptyTitleAndSubTitle(sec.EmptyTitle, sec.EmptySubTitle)

    sec.Props = pros;
    sec.Events = {
      eventActionBtn: (item, seles) => {
        const tempAction = new PageAction(item);
        view.SetEvent_TableToolbarAction(tempAction, seles, sec);
        // self.updateView(view);   // updateView改在drawerSection CallAction 中
      },
      eventActionBtnByRow: (item, data) => {
        const tempAction = new PageAction(item);
        view.SetEvent_TableRowAction(tempAction, data, sec);
        // self.updateView(view);   // updateView改在drawerSection CallAction 中
      },
      eventSearchActionBtn: async (item, conditions) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TableSearchAction(tempAction, conditions, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventSearchKeyWordBtn: async (item, conditions) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TableSearchAction(tempAction, conditions, sec);

      },
      eventUploadAfter: (event) => {
        view.SetEvent_Upload(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventPageChange: async (event, conditions) => {
        await view.SetEvent_TablePageChange(event, sec, conditions);
        self.updateEntitySection(view, sec.Path);
      },
      eventUpdateRows: async (event, conditions) => {
        await view.SetEvent_TableUpdateRows(event, sec, conditions);
        self.updateEntitySection(view, sec.Path);
      },
      change: async (event) => {
        let item: PageFormItem = event["targetItem"];
        let secItem = sec.FormOps?.FormItems?.find(
          (x) => x.Field == item?.Field
        );
        Object.assign(secItem, item);
        await view.SetEvent_FormChange(event, sec);
      },
    };
    return sec;
  }

  static toPrimVueDataTreeForm(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STTreeForm;
    let pros = new STTreeFromProps();
    let treeActions = sec.TreeOps.ToolbarActions ?? [];
    let contextActions = sec.TreeOps.ContextActions ?? [];
    let treeModes = sec.TreeOps.SelectionTreeMode ?? 'single'
    let trees: Array<STTreeItem> = PageSectionFactory.PageTreeItemToSTTreeItem(
      sec.TreeOps?.Items ?? []
    );
    let treeSelectItems = sec.TreeOps.SelectionKeys
    let item = sec.FormOps?.FormItems ?? [];
    pros.setTreeItems(trees);
    pros.setTreeActions(treeActions);
    pros.setContextActions(contextActions);
    pros.setSelectionTreeMode(treeModes);
    pros.setSelectTreeItems(treeSelectItems);
    // table data
    pros.setSelectionKeys(sec.TreeOps.SelectionKeys);

    item.forEach((x) => {

      if (sec.Edit == false)
        x.IsDisabled = true;


      if (x.AlwaysEnable)
        x.IsDisabled = !x.AlwaysEnable;

      if (x.Type == PageItem.PageSection) {
        let itemSec = x.Value as PageSection;
        if (itemSec.SectionType == PageSectionType.AI_CHAT) {
          x.Value = PageSectionFactory.toPrimVueAiChatNew(self, view, itemSec);
          x.ComponentType = STAIChat;
        }
        else {
          let formItemSec = x.Value as PageSectionCustom;
          if (formItemSec.isPageCustom()) {
            let icustom = (<object>formItemSec) as IPageCustom;
            if (icustom != null) {
              x.Value = icustom.toComponent(self, view, formItemSec)
            };
          }
        }//end else
      }

    });


    pros.setFormItems(item.filter(x => x.IsHidden == false).map((x) => new STFormItem(x)//.setMaxSize().setUploadMultiple(true)
    ));
    sec.Props = pros;
    sec.Events = {
      eventTreeToolActionBtn: async (item, sels) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TreeToolbarAction(tempAction, sels, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventNodeSelect: (node) => {
        const tempNoe = new PageTreeItem(node);
        view.SetEvent_TreeNodeSelected(tempNoe, sec);
        // 清除重選
        let obj = {};
        obj[tempNoe.Pkid] = true;
        sec.TreeOps.SelectionKeys = node;

        self.updateEntitySection(view, sec.Path);
      },
      onNodeUnselect: (node) => {
        sec.TreeOps.SelectionKeys = node;
      },
      updateFormData: async (item, sels) => {
        sec.FormOps.FormItems.forEach((el) => {
          if (el.Field === 'name') {
            el.Value = item.value
          }
        })
      },
      change: async (event) => {
        let item: PageFormItem = event["targetItem"];
        let secItem = sec.FormOps?.FormItems?.find(
          (x) => x.Field == item?.Field
        );
        Object.assign({}, secItem, item || {});
        await view.SetEvent_FormChange(event, sec);
      },
      upload: async (e, formitem) => {
        let item: PageFormItem = formitem;
        await view.SetEvent_FormUploading(sec, e, item);
        self.updateEntitySection(view, sec.Path);
      },
      btnAction: (e, action) => {
        const tempAction = new PageAction(action);
        view.SetEvent_FormAction(e, tempAction);
      },
      deleteImage: async (e, currentItem, imageDeleteItem) => {

        let secItem = sec.FormOps?.FormItems?.find((x) => x.Id == currentItem?.Id);
        secItem.Value = secItem.Value?.filter(x => x.UrlID != imageDeleteItem.UrlID);

        const tempAction = new PageFormItem(imageDeleteItem);
        view.SetEvent_FormDeleteImage(e, tempAction);
      },
      init: async (controller, item) => {
        const tempAction = new PageFormItem(item);
        await view.SetEvent_FormInit(controller, tempAction);
      }
    };
    return sec;
  }

  static toPrimVueFileUpload(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STUploadFileManagement;
    let pros = new STUploadFileManagementProps();
    let item = sec.FormOps?.FormItems ?? [];
    let treeActions = sec.TreeOps.ToolbarActions ?? [];
    let contextActions = sec.TreeOps.ContextActions ?? [];
    let trees: Array<STTreeItem> = PageSectionFactory.PageTreeItemToSTTreeItem(
      sec.TreeOps?.Items ?? []
    );
    pros.setUploadItem(
      item.map((x) => new STUploadFileItem(x).setMaxSize()).firstOrDefault()
    );
    pros.setTreeItems(trees);
    pros.setTreeActions(treeActions);
    // table data
    pros.setDatas(sec.TableOps.Datas);
    let newCols = sec.TableOps.Columns?.map((x) => {
      let tempCol = new STDataTableColumn({
        field: x.Field,
        header: x.Field,
        title: x.Title,
        actions: x.Actions,
        cellValue: x.CellValue,
        cellValueByHtml: x.CellValueByHtml,
        isCellHtml: x.IsCellHtml,
      });
      return tempCol;
    });
    pros.setColumns(newCols);
    let newAcs = sec.TableOps.CustomAction?.map((x) => {
      return new STDataTableAction(x);
    });
    pros.setActions(newAcs);
    pros.setSelectionKeys(sec.TreeOps.SelectionKeys);
    pros.setContextActions(contextActions);
    pros.setEdit(sec.Edit);
    sec.Props = pros;
    sec.Events = new STUploadFileManagementEvent({
      eventUploadAfter: (event) => {
        view.SetEvent_Upload(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventBeforeUpload: (event) => {
        view.SetEvent_BeforeUpload(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventTreeToolActionBtn: async (item, sel) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TreeToolbarAction(tempAction, sel, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventNodeSelect: async (node) => {
        const tempNoe = new PageTreeItem(node);
        await view.SetEvent_TreeNodeSelected(tempNoe, sec);
        // 清除重選
        let obj = {};
        obj[tempNoe.Pkid] = true;
        sec.TreeOps.SelectionKeys = obj;
        self.updateEntitySection(view, sec.Path);
      },
      eventActionBtn: (item, seles) => {
        const tempAction = new PageAction(item);
        view.SetEvent_TableToolbarAction(tempAction, seles, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventActionBtnByRow: async (item, data) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TableRowAction(tempAction, data, sec);
        self.updateEntitySection(view, sec.Path);
      },

      eventUploader: async (e) => {
        await view.SetEvent_Uploading(sec, e);
        self.updateEntitySection(view, sec.Path);
      },
      eventBeforSend: (e) => { },
    });
    return sec;
  }
  static toPrimVueUpload(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = Upload;
    let pros = new UploadProps();
    sec.Props = pros;
    sec.Events = new UploadEvent({
      eventSelectedFiles: (event) => {
        view.SetEvent_UploadSelectedFiles(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventUploadAfter: (event) => {
        view.SetEvent_UploadAfter(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventCustomUploadAfter: (event) => {
        view.SetEvent_UploadCustomAfter(event, sec);
        // self.updateEntitySection(view, sec.Path);
      },
      eventBeforeSend: (event) => {
        view.SetEvent_UploadBeforeSend(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventBeforeUpload: (event) => {
        view.SetEvent_UploadBefore(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventRemove: (event) => {
        view.SetEvent_UnUploadedRemove(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventRemoveUploadedFile: (event) => {
        view.SetEvent_UploadedRemoveFile(event, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventError: (event) => {
        view.SetEvent_UploadError(event, sec);
        self.updateEntitySection(view, sec.Path);
      }
    });
    return sec;
  }
  static toPrimVueTabs(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STTab;
    let tabSec = sec as PageSectionTabs;
    let props = new STTabProps();
    props.setActions(sec.ToolbarActions.map((x) => new STTabAction(x)));
    props.activeId = view.TabId;
    props.setActiveValue();
    props.setTabPt(tabSec.TabPt);
    props.setTabListPt(tabSec.TabListPt);



    sec.Props = props;
    sec.Events = {
      eventActionBtn: (item) => {
        const tempAction = new PageAction(item);
        view.SetEvent_PageTabAction(tempAction, sec);
        //self.updateView(view);
      },
    };
    return sec;
  }
  static toPrimVueTree(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STTree;
    let pros = new STTreeProps();
    let treeActions = sec.TreeOps.ToolbarActions ?? [];
    let contextActions = sec.TreeOps.ContextActions ?? [];
    let treeModes = sec.TreeOps.SelectionTreeMode ?? 'single'
    let trees: Array<STTreeItem> = PageSectionFactory.PageTreeItemToSTTreeItem(
      sec.TreeOps?.Items ?? []
    );

    pros.setTreeItems(trees);
    pros.setTreeActions(treeActions);
    pros.setContextActions(contextActions);
    pros.setSelectionTreeMode(treeModes);
    // table data
    pros.setSelectionKeys(sec.TreeOps.SelectionKeys);

    sec.Props = pros;
    sec.Events = new STUploadFileManagementEvent({
      eventTreeToolActionBtn: async (item, sels) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TreeToolbarAction(tempAction, sels, sec);
        self.updateEntitySection(view, sec.Path);
      },
      eventNodeSelect: (node) => {
        const tempNoe = new PageTreeItem(node);
        view.SetEvent_TreeNodeSelected(tempNoe, sec);
        // 清除重選
        let obj = {};
        obj[tempNoe.Pkid] = true;
        sec.TreeOps.SelectionKeys = obj;

        self.updateEntitySection(view, sec.Path);
      },
    });
    return sec;
  }
  static toPrimVueDialog(self: PageBuilder, view: PageView, secOrg: PageSection) {

    let sec = secOrg as PageSectionDialog;
    sec.Component = STDialog;
    let pros = new STDialogProps();
    pros.SectionClass = sec.SectionClass ?? '';
    let formProps = new STFormProps();
    let item = sec.FormOps?.FormItems ?? [];
    formProps.setFormItems(item.map((x) => new STFormItem(x)));

    if (sec.customSection) {
      sec.customSection = PageSectionFactory.toPrimVueComp(self, view, sec.customSection) as PageSectionCustom;
    }
    pros.dialogContent = new STDialogContent({
      Component: sec.customSection ? sec.customSection.getComponent() : STForm,
      Props: sec.customSection ? sec.customSection.Props : formProps,
      Events: sec.customSection ? sec.customSection.Events : new STFormEvent({
        change: async (event) => {
          let item: PageFormItem = event["targetItem"];
          let secItem = sec.FormOps?.FormItems?.find(
            (x) => x.Field == item?.Field
          );
          Object.assign(secItem, item);
          await view.SetEvent_FormChange(event, sec);
        },
      })
    });

    pros.setControllerView(sec.IsControllerView)
      .setControllerType(sec.EntityType)
      .setControllerPKID(sec.EntityPKID)




    // pros.dialogContent = {
    //     Component: STForm,
    //     Props: formProps
    // }
    pros.mesage = sec.Message?.Text;
    pros.visible = view.DialogVisible;
    pros.title = sec.Title;
    pros.actions = sec.FormOps.CustomAction.map((x) => new STDialogActions(x));
    pros.isGoBack = sec.IsGoBack;
    //console.log('pros.actions', pros.actions)
    sec.Props = pros;

    sec.Events = new STDialogEvent({
      actionItem: async (ac, dialogConten: STDialogContent) => {
        let item = new PageAction(ac);
        sec.FormOps.FormItems = dialogConten.Props["items"];
        await view.DialogView.CallAction(view, item);
        await view.SetEvent_DialogAction(item, sec);
        if (view.DialogView.SourceSection?.Path)
          self.updateEntitySection(view, view.DialogView.SourceSection?.Path);
      },


    });
    return sec;
  }
  static toPrimVueMarkdown(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STMarkdown;
    let pros = new STMarkdownProps();
    let item = sec.FormOps?.FormItems ?? [];
    let content = item.firstOrDefault()?.Value;
    pros.setContent(content);
    pros.setView(!sec.Edit);

    sec.Props = pros;

    return sec;
  }
  static toPrimVueFilter(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STFilter;

    let item = sec.FormOps?.FormItems ?? [];
    item.forEach((x) => {
      if (x.AlwaysEnable)
        x.IsDisabled = !x.AlwaysEnable;
    })

    sec.Props = {
      props: new STFilterProps({ condList: item.map(x => new STFormItem(x)) })

    };

    sec.Events = new STFilterEvent({
      change: async (event) => {
        let item: PageFormItem = event["targetItem"];
        let secItem = sec.FormOps?.FormItems?.find(
          (x) => x.Field == item?.Field
        );
        Object.assign(secItem, item);
        await view.SetEvent_FormChange(event, sec);
      },
      search: async (e, conditions) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_TableSearchAction(tempAction, conditions, sec);
        self.updateView(view);
      },

    });
    return sec;
  }
  static toPrimVueTimeline(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STTimeline;

    let item = sec.TimelineItems;
    let timelines = item.map((x) => {

      let tag = { type: x.Tag?.SeverityColor.toString() as STTagType, value: x.Tag?.Text };
      let act = {
        label: x.Action?.Text,
        severity: x.Action?.SeverityColor.toString() as STButtonType,
        isText: x.Action?.IsText
      };
      return new STTimelineItem({
        id: x.Id,
        icon: x.Icon,
        title: x.Title,
        content: x.Content,
        time: x.Time,
        tag: new STTagProps(tag),
        action: new STButtonConfig(act)
      });
    })

    sec.Props = {
      props: new STTimelineProps(
        {
          data: timelines,
          lazyLoad: true

        })

    };

    sec.Events = new STTimelineEvent({
      eventActionBtn: async (e, item) => {
        let tag = new PageTag();
        tag.SeverityColor = item.type;
        tag.Text = item.type = item.value;

        let act = new PageAction({
          Text: item.label,
          SeverityColor: item.severity,
          IsText: item.isText
        });

        const tempAction = new PageTimelineItem({
          Id: item.id,
          Icon: item.icon,
          Title: item.title,
          Content: item.content,
          Time: item.time,
          Tag: tag,
          Action: act
        });
        await view.SetEvent_TimelineItemAction(sec, tempAction);
        self.updateView(view);
      }

    });
    return sec;
  }
  static toPrimVueChatline(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STChat;

    let item = sec.ChatOps.ChatlineItems;
    let chatlines = item.map((x) => {
      return new STChatItem(x.convertObject());
    })
    let aitem = sec.ChatOps.ChatAlertItems;
    let chatAlerts = aitem.map((x) => {
      let color = x.SeverityColor.toString() == '' ? 'primary' : x.SeverityColor.toString();
      let btncolor = x.Action?.SeverityColor.toString() == '' ? 'primary' : x.Action?.SeverityColor.toString();
      return new STChatAlertItem({
        title: x.Title,
        text: x.Text,
        icon: x.Icon,
        severity: color,
        life: x.Life,
        button: x.Action ? new STButtonConfig({
          id: x.Action?.Id,
          label: x.Action?.Text,
          severity: btncolor as STButtonType,
          icon: x.Action?.Icon,
          isText: x.Action?.IsText,
          isDisabled: !x.Action?.Enable
        }) : null,
        position: x.position as STPosition
      });
    })

    sec.Props = {
      props: new STChatProps(
        {
          contentList: chatlines,
          display: sec.ChatOps.DisplaySample ? STChatDisplayType.SIMPLE : STChatDisplayType.DETAIL,
          alertList: chatAlerts
        })

    };

    sec.Events = new STChatEvent({
      eventClick: async (e, item: STChatItem) => {
        sec.ChatOps.ChatlineItems.forEach((x) => {
          x.IsActive = false;
        })
        let currentItem = sec.ChatOps.ChatlineItems.find(x => x.Id == item.id);
        if (currentItem)
          currentItem.IsActive = true;


        let tempItem = new PageChatItem(item.convertObject());
        await view.SetEvent_ChatlineItemAction(sec, tempItem);
        self.updateView(view);
      },
      eventActionBtn: async (e, item: STButtonConfig) => {
        let color = item.severity.toString() == "primary" ? "" : item.severity.toString();
        let tempItem = new PageAction({
          Id: item.id,
          Text: item.label,
          SeverityColor: color as PageItemSeverityStyle,
          Icon: item.icon,
          IsText: item.isText,
          Enable: !item.isDisabled
        });
        await view.SetEvent_ChatlineItemButtonAction(sec, tempItem);
        self.updateView(view);
      }

    })

    return sec;
  }
  static toPrimVueTabContent(self: PageBuilder, view: PageView, sec: PageSection) {
    let tabcontentSec: PageSectionTabContent = sec as PageSectionTabContent;
    tabcontentSec.Component = STTabContent;

    let props = new STTabContentProps();
    props.setActions(sec.ToolbarActions.map((x) => new STTabAction(x)));
    props.setActiveValue();
    // add style
    props.setTabListPt(tabcontentSec.TabListPt)
    props.setTabPt(tabcontentSec.TabPt)
    // 子層轉換
    tabcontentSec.TargetSection = PageSectionFactory.toPrimVueComp(self, view, tabcontentSec.TargetSection)
    props.setSection(tabcontentSec.TargetSection);

    tabcontentSec.Props = props;
    tabcontentSec.Events = {
      eventActionBtn: async (item) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_PageTabAction(tempAction, sec);
        // self.updateView(view);
        self.updateEntitySection(view, tabcontentSec.Path)
      },
    };
    return tabcontentSec;
  }
  static toPrimVueDashboardBar(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STDashboardBar

    let dashboardSec = sec as PageSectionDashboardBar;
    let props = new STDashboardBarProps();
    let staction = dashboardSec.ToolbarActions.map((x) => {
      return new STMenubarAction(x).toSubMenuItems();
    })
    props.setActions(staction);
    props.setItems(dashboardSec.TimeSelectItems.map((x) => {
      let item = new STTimeRangeItem(x.toStartCharLowerCase())
      return item;
    }));
    dashboardSec.Props = props;

    dashboardSec.Events = {
      eventActionBtn: async (e, item) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_PageToolbarAction(tempAction, sec);
        self.updateEntitySectionByOther(view, sec.Path);
      },
      eventActionSubBtn: async (e, item, subMenuitem) => {
        const tempAction = new PageAction(item);
        let subAction = tempAction.MenuBtns?.find(x => x.Text == subMenuitem.label)
        await view.SetEvent_PageToolbarAction(subAction, sec);
        self.updateEntitySectionByOther(view, sec.Path);
      },
      eventActionDate: async (e, items: Array<STTimeRangeItem>) => {
        const rangeItems = items.map((x) => {
          let item = new PageTimeRangeItem()
            .toStartCharUpperCase(x);
          return item;
        })
        dashboardSec.setTimeSelectItems(rangeItems);
        sec = dashboardSec;
        await view.SetEvent_TimeRangeItemAction(sec, rangeItems);

        self.updateViewByEntity(view);
      },
      eventUpdateCustomDate: async (items) => {
        const rangeItems = items.map((x) => {
          let item = new PageTimeRangeItem()
            .toStartCharUpperCase(x);
          return item;
        })
        dashboardSec.setTimeSelectItems(rangeItems);
        sec = dashboardSec;
        await view.SetEvent_TimeRangeItemAction(sec, rangeItems);
        self.updateViewByEntity(view);
      },
    };

    return dashboardSec
  }

  static toPrimVueWorkflow(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    sec.Component = STWorkflow;
    let pros = new STworkflowProps();
    let nodes: Array<STNode> = sec.WFOption?.Nodes.map((x) => {
      return new STNode({
        id: x.Id,
        type: "normal",
        data: { label: x.NodeName, nodeType: x.NodeType, nodeDefId: x.NodeDefId },
        position: new STNodePosition({ x: x.PositionX, y: x.PositionY }),
      });
    });
    let edges: Array<STEdge> = sec.WFOption?.Edges.map((x) => {
      return new STEdge({
        id: x.Id,
        source: x.NodeFromId,
        target: x.NodeToId,
        data: { label: x.Label },
      });
    });
    pros.setViewport(
      sec.WFOption.InitPostionX ?? 0,
      sec.WFOption.InitPostionY ?? 0,
      sec.WFOption.Zoom ?? 1
    );
    pros.setActions(sec.WFOption?.Actions);
    pros.setNodes(nodes);
    pros.setEdges(edges);
    pros.setEdit(sec.Edit);
    sec.Props = pros;

    sec.Events = new STWorkflowEvent({
      eventToolbarAction: async (action, wfobject) => {
        let item = new PageAction(action);
        let nodes: Array<PageNode> = [];
        let edges: Array<PageEdge> = [];
        let viewport: PageViewport = {}
        if (wfobject != undefined && wfobject != null) {
          nodes = (wfobject.nodes as Array<STNode>).map((x) => {
            if (x.id.indexOf("vueflow__node") != -1) x.id = "";
            return new PageNode({
              Id: x.id,
              NodeDefId: x.data['nodeDefId'],
              NodeName: x.data["label"],
              NodeType: x.data["nodeType"],
              PositionX: x.position["x"],
              PositionY: x.position["y"],
            });
          });
          edges = (wfobject.edges as Array<STEdge>).map((x) => {
            if (x.id.indexOf("vueflow__edge") != -1) x.id = "";
            return new PageEdge({
              Id: x.id,
              NodeFromId: x.source,
              NodeToId: x.target,
              Label: x.data["label"],
            });
          });
          viewport = new PageViewport({
            windowPositionX: wfobject.viewport.x,
            windowPositionY: wfobject.viewport.y,
            windowScale: wfobject.viewport.zoom
          })

          sec.WFOption?.setPosition(wfobject.viewport.x, wfobject.viewport.y);
          sec.WFOption?.setZoom(wfobject.viewport.zoom);
        }

        await view.SetEvent_WorkflowAction(sec, nodes, edges, viewport, item);
        self.updateEntitySection(view, sec.Path);
      },
      eventNodeToolbarAction: async (node, action) => {
        if (node == null) return;
        let item = new PageAction(action);
        let pagenode = new PageNode({
          Id: node.id,
          NodeName: node.data["label"],
          NodeType: node.data["nodeType"],
          PositionX: node.position["x"],
          PositionY: node.position["y"],
          NodeDefId: node.data['nodeDefId'],
          RemoveCallback: node.removeCallback
        });
        await view.SetEvent_WorkflowNodeAction(sec, item, pagenode);
      },
      eventEdgeToolbarAction: async (edge, action) => {
        if (edge == null) return;
        let pageEdge = new PageEdge({
          Id: edge.id,
          NodeFromId: edge.source,
          NodeToId: edge.target,
          Label: edge.data["label"] ?? '',
        });
        await view.SetEvent_WorkflowEdgeAction(sec, action, pageEdge);
        // self.updateEntitySection(view, sec.Path);
        self.updateEntitySection(view, sec.Path);
      },
      eventRunChat: async (wfobject) => {
        await view.SetEvent_WorkflowRunChat(sec, wfobject);

      }


    });

    return sec;
  }

  // page tree item to ST tree item ---------------------------------------------------------
  static PageTreeItemToSTTreeItem(pItems: Array<PageTreeItem>) {
    if (pItems == null || pItems.length == 0) return Array<STTreeItem>();

    let sts: Array<STTreeItem> = [];
    for (let i = 0; i < pItems.length; i++) {
      let pItem = pItems[i];
      let stItem = new STTreeItem(pItem);
      stItem = PageSectionFactory.PageTreeItemToSTTreeItemRecursion(
        pItem,
        stItem
      );
      sts.push(stItem);
    }

    return sts;
  }
  static PageTreeItemToSTTreeItemRecursion(
    pItem: PageTreeItem,
    stItem: STTreeItem
  ) {
    if (pItem.Children == null || pItem.Children.length == 0)
      return stItem.setFolderIconClose();

    let stItems: Array<STTreeItem> = [];
    for (let i = 0; i < pItem.Children.length; i++) {
      let pItemTemp = pItem.Children[i];
      let stItemTemp = new STTreeItem(pItemTemp);

      stItemTemp = PageSectionFactory.PageTreeItemToSTTreeItemRecursion(
        pItemTemp,
        stItemTemp
      );
      stItems.push(stItemTemp);
    }
    stItem.setChildrens(stItems);
    return stItem.setFolderIconOpen();
  }


  static toPrimVueFileDownload(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STFileDownload

    let item = sec.FileItemList
    let newList = item.map((x) => {
      return new STFileItem(x.convertObject())
    })

    sec.Props = {
      props: newList
    }
    return sec
  }
  static toPrimVueAccordion(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STAccordion

    let item = sec.AccordionItemList
    let newList = item.map((x) => {
      return new STAccordionConfig(x.convertObject())
    })

    sec.Props = {
      data: newList,
      multiple: sec.AccordionMultiple
    }
    return sec
  }
  static toPrimVueSearchBar(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STSearchBar

    let item = sec.SearchBarInputField
    let newItem = new STFormItem(item.convertObject())
    sec.Props = {
      props: newItem
    }
    sec.Events = {
      clickSearch: async (input) => {
        await view.SetEvent_SearchSectionAction(sec, input)
        self.updateView(view)
      },
    }
    return sec
  }
  static toPrimVueEditor(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STEditor

    let secEditor = sec as PageSectionEditor;
    let editorData = new STEditorData().setHtmlValue(secEditor.getHtmlValue());
    sec.Props = new STEditorProps({
      data: editorData,
      height: secEditor.Height
    })
    sec.Events = {
      textChange: async (editorValue: STEditorData) => {
        secEditor.setHtmlValue(editorValue.htmlValue);
        await view.SetEvent_EditorChangeAction(editorValue, secEditor)
        //self.updateEntitySection(view, secEditor.Path)
      },
    }


    return secEditor
  }
  static toPrimVueCardTitle(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STCardTitle

    let secCardTitle = sec as PageSectionCardTitle
    let actions = secCardTitle.PageSecCardTitleProps.actionList.map((x) => {
      return new STMenubarAction(x).toSubMenuItems()
    })
    let secProps = new STCardTitleProps({
      id: secCardTitle.PageSecCardTitleProps.id,
      title: secCardTitle.PageSecCardTitleProps.title,
      actionList: actions,
      canEdit: secCardTitle.PageSecCardTitleProps.canEdit,
      needRename: secCardTitle.PageSecCardTitleProps.needRename
    })
    sec.Props = {
      props: secProps
    }
    sec.Events = {
      actionSubBtn: async (e: Event, menuItem: MenuItem, subMenuItem: MenuItem, clickedData: STCardTitleProps) => {
        let tempItem = new PageCardTitleItem({
          id: clickedData.id,
          title: clickedData.title,
          actionList: clickedData.actionList.map(x => {
            return new PageAction({
              Id: x.Id,
              url: x.url,
              Text: x.label
            })
          })
        })
        await view.SetEvent_CardTitleSubMenuClicked(e, menuItem, subMenuItem, sec, tempItem)
        // self.updateView(view)
      },
      renameCompleted: async (name: string, id: string) => {
        await view.SetEvent_CardTitleRenameComplete(name, id, sec)
        // self.updateView(view)
      },
      eventClicked: async (e: Event, clickedData: STCardTitleProps) => {
      }
    }


    return secCardTitle
  }
  static toPrimVueListViewSearch(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STListViewSearch

    let secListView = sec as PageSectionListViewSearch
    let actions = secListView.PageSecListViewSearchProps.listActionList?.map((x) => {
      return new STMenubarAction(x).toSubMenuItems()
    })
    let cardTitleDatas = secListView.PageSecListViewSearchProps.cardTitleList?.map(x => {
      return new STCardTitleProps({
        id: x.id,
        title: x.title,
        actionList: x.actionList.map(y => {
          return new STMenubarAction(y).toSubMenuItems()
        }),
        canEdit: x.canEdit,
        needRename: x.needRename
      })
    })
    let type = secListView.PageSecListViewSearchProps.showType?.toString() as STListViewShowType
    let secProps = new STListViewSearchProps({
      id: secListView.PageSecListViewSearchProps.id,
      title: secListView.PageSecListViewSearchProps.title,
      showType: type,
      dataList: secListView.PageSecListViewSearchProps.dataList,
      listByHtml: secListView.PageSecListViewSearchProps.listByHtml,
      listActionList: actions,
      cardTitleList: cardTitleDatas,
      isNewBtn: secListView.PageSecListViewSearchProps.isNewBtn,
      showPopover: secListView.PageSecListViewSearchProps.showPopover,
      searchConditions: secListView.PageSecListViewSearchProps.searchConditions,
      currentSelectId: secListView.PageSecListViewSearchProps.currentSelectId,
      isSearch: secListView.PageSecListViewSearchProps.isSearch,
      needRename: secListView.PageSecListViewSearchProps.needRename
    })
    let secList = secListView.TargetCustomSecList?.map(x => PageSectionFactory.toPrimVueComp(self, view, x))
    sec.Props = {
      props: secProps,
      customSecList: secList,
      searchKeyword: secListView.searchKeyword
    }
    sec.Events = {
      searchKeyword: async (val: string, conditions: Array<STFormItem>) => {
        await view.SetEvent_ListViewSearchKeyword(sec, val, conditions)
        // self.updateView(view)
        self.updateEntitySection(view, 'ListViewSearch')
      },
      clearSearchKeyword: async () => {
        await view.SetEvent_ListViewClearSearchKeyword(sec)
        // self.updateView(view)
        self.updateEntitySection(view, 'ListViewSearch')
      },
      addNewItem: async () => {
        await view.SetEvent_ListViewAddNewItem(sec)
        // self.updateView(view)
      },
      eventListItemClicked: async (props: IObjectGeneric) => {
        await view.SetEvent_CardTitleClicked(sec, props)
        self.updateEntitySectionByOther(view, 'ListViewSearch')
      },
      actionSubBtn: async (e: Event, menuItem: MenuItem, subMenuItem: MenuItem, clickedData: any) => {
        await view.SetEvent_CardTitleSubMenuClicked(e, menuItem, subMenuItem, sec, clickedData)
      },
      renameCompleted: async (name: string, id: string) => {
        await view.SetEvent_CardTitleRenameComplete(name, id, sec)
      },
    }


    return secListView
  }
  static toPrimVueCardPanel(self: PageBuilder, view: PageView, sec: PageSection) {
    const cardPanelSec: PageSectionCardPanel = sec as PageSectionCardPanel
    cardPanelSec.Component = STCardPanel
    let cpLayout = cardPanelSec.CardPanelLayout?.toString() as STCardPanelLayout
    let item = sec.CardItemList
    let newList = item.map((x) => {
      let iconList = x.FooterIconList?.map(y => {
        return new STIconButtonProps({
          id: y.Id,
          iconUrl: y.Url,
          label: y.Text
        })
      })
      let action = null;
      if ((!!x.FooterActionButton)) {
        let action = new STButtonConfig({
          id: x.FooterActionButton.Id,
          label: x.FooterActionButton.Text,
          severity: STButtonType.PRIMARY
        })
      }

      return new STCardItem(x.convertObject())
        .setFooterIconList(iconList)
        .setFooterActionButton(action)
    })
    let title = cardPanelSec.CardPanelTitle
    let cpShowMode = cardPanelSec.ShowMode?.toString() as STCardPanelMode
    let props = new STCardPanelProps()
      .setLayout(cpLayout)
      .setCardItemList(newList)
      .setCardPanelTitle(title)
      .setIfScroll(cardPanelSec.CardPanelIfScrollable)
      .setWrapperHeight(cardPanelSec.CardPanelWrapperHeight)
      .setCardWrapperClass(cardPanelSec.CardWrapperClass)
      .setCardContentClass(cardPanelSec.CardContentClass)
      .setRowCount(cardPanelSec.RowCount)
      .setColCount(cardPanelSec.ColCount)
      .setShowMode(cpShowMode)
    let paginatorProps = new STPaginatorProps({
      totalRecords: cardPanelSec.DataTotalCount,
      rows: cardPanelSec.PaginatorRows,
      first: cardPanelSec.PaginatorFirst
    })
    cardPanelSec.Props = {
      props: props,
      paginatorProps: paginatorProps,
      dataTotalCount: cardPanelSec.DataTotalCount,
      autoScroll: cardPanelSec.AutoScroll
    }

    cardPanelSec.Events = {
      eventCardAction: async (e: Event, card: STCardItem) => {
        // cardPanelSec.CardItemList.forEach(el => el.IsActive = false)
        // let clickedItem = cardPanelSec.CardItemList.find(x => x.Id == card.id)
        // if (clickedItem) clickedItem.IsActive = true
        // let tempCardItem = new PageCardItem({
        //   Id: card.id,
        //   Title: card.title,
        //   Icon: card.icon,
        //   Content: card.content,
        //   SubContent: card.subContent,
        // })
        // await view.SetEvent_CardPanelAction(e, tempCardItem, cardPanelSec)
        // self.updateView(view)
      },
      paginatorUpdate: async (state: PageState) => {
        await view.SetEvent_CardPanelPaginatorUpdate(state, sec)
        self.updateView(view)
      },
      getNextDataEvent: async () => {
        await view.SetEvent_CardPanelGetNextDataAction(sec)
        // 這邊的updateView由controller控制
      },
      eventCardRatingUpdate: async (card: STCardItem) => {
        console.log(card)
      }
    }
    return cardPanelSec
  }

  static toPrimVueTableView(
    self: PageBuilder,
    view: PageView,
    sec: PageSection
  ) {
    const tableViewSec: PageSectionTableView = sec as PageSectionTableView
    tableViewSec.Component = STTableView;
    let pros = new STDataTableProps();
    pros.setDatas(tableViewSec.TableOps.Datas);
    let newCols = tableViewSec.TableOps.Columns?.map((x) => {
      let tempCol = new STDataTableColumn({
        field: x.Field,
        header: x.Field,
        title: x.Title,
        actions: x.Actions,
        cellValue: x.CellValue,
        cellValueByHtml: x.CellValueByHtml,
        isCellHtml: x.IsCellHtml,
        isImage: x.IsImage,
        isFormItem: x.IsFormItem
      });
      return tempCol;
    });
    pros.setColumns(newCols);
    let newAcs = tableViewSec.TableOps.CustomAction?.map((x) => {
      return new STDataTableAction(x);
    });
    pros.setActions(newAcs);

    // card layout mode
    let cpLayout = tableViewSec.CardPanelLayout?.toString() as STCardPanelLayout
    let item = tableViewSec.CardItemList
    let newList = item?.map((x) => {
      let iconList = x?.FooterIconList?.map(y => {
        return new STIconButtonProps({
          id: y.Id,
          iconUrl: y.Url,
          label: y.Text
        })
      })
      let action = new STButtonConfig({
        id: x?.FooterActionButton?.Id,
        label: x?.FooterActionButton?.Text,
        severity: STButtonType.PRIMARY
      })
      return new STCardItem(x.convertObject())
        .setFooterIconList(iconList)
        .setFooterActionButton(action)
    })
    let cpShowMode = tableViewSec.ShowMode?.toString() as STCardPanelMode
    let cardProps = new STCardPanelProps()
      .setLayout(cpLayout)
      .setCardItemList(newList)
      .setIfScroll(tableViewSec.CardPanelIfScrollable)
      .setWrapperHeight(tableViewSec.CardPanelWrapperHeight)
      .setCardWrapperClass(tableViewSec.CardWrapperClass)
      .setCardContentClass(tableViewSec.CardContentClass)
      .setRowCount(tableViewSec.RowCount)
      .setColCount(tableViewSec.ColCount)
      .setShowMode(cpShowMode)
    let paginatorProps = new STPaginatorProps({
      totalRecords: tableViewSec.DataTotalCount,
      rows: tableViewSec.PaginatorRows,
      first: tableViewSec.PaginatorFirst
    })

    pros
      .setCardProps(cardProps)
      .setCardPaginatorProps(paginatorProps)
      .setCardDataTotalCount(tableViewSec.DataTotalCount)
      .setCardAutoScroll(tableViewSec.AutoScroll)
      .setLayoutMode(tableViewSec.LayoutMode?.toString() as STTableViewLayout)
      .setTableShowMode(tableViewSec.TableShowMode?.toString() as STTableShowMode)
      .setSearchEnable(true)
      .setSearchKeyword(tableViewSec.SearchKeyword)

    // set sub
    let isSub = tableViewSec.TableOps.SubTable?.IsSubTable ?? false;
    if (isSub) {
      pros.setSubKey(tableViewSec.TableOps.SubTable?.SubTableKey);
      let subnewCols = tableViewSec.TableOps.SubTable?.Columns?.map((x) => {
        let tempCol = new STDataTableColumn({
          field: x.Field,
          header: x.Field,
          title: x.Title,
          actions: x.Actions,
          cellValue: x.CellValue,
          cellValueByHtml: x.CellValueByHtml,
          isCellHtml: x.IsCellHtml,
          isImage: x.IsImage,
          isFormItem: x.IsFormItem
        });
        return tempCol;
      });
      pros.setSubColumns(subnewCols)
    }
    pros.setShowCheckBox(tableViewSec.TableOps.ShowCheckBox)

    // search
    pros.setSearchEnable(tableViewSec.TableOps.IsSearchCondition);
    pros.setSearchActions(tableViewSec.FormOps.CustomAction);
    let tableItem = tableViewSec.FormOps?.FormItems ?? [];
    pros.setSearchCondition(tableItem.map((x) => new STConditionItem(x)));
    pros.setCustomFunction(new STDataTableCustomFunction(tableViewSec.TableOps.CustomObject))

    tableViewSec.Props = pros;

    tableViewSec.Events = {
      eventActionBtn: async (item, seles) => {
        console.log('eventActionBtn')
        const tempAction = new PageAction(item);
        await view.SetEvent_TableToolbarAction(tempAction, seles, tableViewSec);
        // self.updateView(view);
      },
      eventActionBtnByRow: async (item, data) => {
        // console.log('eventActionBtnByRow')
        const tempAction = new PageAction(item);
        await view.SetEvent_TableRowAction(tempAction, data, tableViewSec);
        // self.updateView(view);
      },
      eventCardPaginatorUpdate: async (state: PageState) => {
        console.log('eventCardPaginatorUpdate')
        await view.SetEvent_TableViewCardPanelPaginatorUpdate(state, tableViewSec)
        self.updateEntitySection(view, sec.Path)
      },
      eventCardPanelGetNextData: async () => {
        console.log('eventCardPanelGetNextData')
        await view.SetEvent_TableViewCardPanelGetNextDataAction(sec)
      },
      eventCardRatingUpdate: async (card: STCardItem) => {
        let cardLayout = card.layoutType.toString() as unknown as PageCardType
        let tempCard = new PageCardItem({
          Id: card.id,
          LayoutType: cardLayout,
          Title: card.title,
          Content: card.content,
          RatingScore: card.ratingScore
        })
        await view.SetEvent_TableViewCardRatingUpdate(sec, tempCard)
      },
      eventCardDelete: async (card: STCardItem) => {
        let cardLayout = card.layoutType.toString() as unknown as PageCardType
        let tempCard = new PageCardItem({
          Id: card.id,
          LayoutType: cardLayout,
          Title: card.title,
          Content: card.content,
          RatingScore: card.ratingScore
        })
        await view.SetEvent_TableViewCardDelete(sec, tempCard)
      },
      eventCardClicked: async (card: STCardItem) => {
        let cardLayout = card.layoutType.toString() as unknown as PageCardType
        let tempCard = new PageCardItem({
          Id: card.id,
          LayoutType: cardLayout,
          Title: card.title,
          Content: card.content,
          RatingScore: card.ratingScore
        })
        await view.SetEvent_TableViewCardClicked(sec, tempCard)
      },
      eventSearch: async (txt: string) => {
        await view.SetEvent_TableViewKeywordSearch(sec, txt)
      },
      eventClearSearch: async () => {
        await view.SetEvent_TableViewKeywordSearchClear(sec)
      },
      updateTableViewType: async (type: STTableViewLayout) => {
        let tempType = type.toString() as PageTableViewLayout
        await view.SetEvent_TableViewTypeUpdate(sec, tempType)
      }
    };
    return sec;
  }

  static toPrimVueAiChat(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STAIChat
    // sec.Component = STAIChat

    let secAiChat: PageSectionAiChat = sec as PageSectionAiChat
    let agentEntity: STAichatAgentData = new STAichatAgentData(Object.assign({}, secAiChat.AiAgentData))
    sec.Props = new STAichatProps({
      defaultDataList: secAiChat.AiDefaultDataList,
      agentData: agentEntity,
      allowCreateChatRoom: secAiChat.AllowCreateChatRoom,
      visibleToolBar: secAiChat.VisibleToolBar,
      chatRoomId: secAiChat.ChatRoomId,
      chatMessages: secAiChat.ChatMessages,
      chatRoomDisabled: secAiChat.ChatRoomDisabled
    });
    sec.Events = {
      updateLogData: async (data: any) => {
        console.log('updateLogData', data)
        // await view.SetEvent_PromptConfigFormUpdate(sec, data)
        await view.SetEvent_UpdateLogData(sec, data)
      },
      showCanCallAPI: async (data: any) => {
        await view.SetEvent_ShowCanCallAPI(sec, data)
      }
    }

    return secAiChat
  }

  static toPrimVueSlider(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STSlider

    let secSlider: PageSectionSlider = sec as PageSectionSlider
    let props = new STSliderProps(secSlider.sliderProps)
    sec.Props = {
      sliderProps: props
    }
    sec.Events = {
    }

    return secSlider
  }

  static toPrimVueAttributePanel(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STAttributePanel

    let secAccordionGroup: PageSectionAttributePanel = sec as PageSectionAttributePanel

    let props = new STAttributePanelProps({
      dataList: secAccordionGroup.attributePanelProps.dataList?.map(x => {

        x.ContentList.forEach((item) => {
          if (item.Type == PageItem.PageSection) {
            let formItemSec = item.Value as PageSectionCustom;
            if (formItemSec.isPageCustom()) {
              let icustom = (<object>formItemSec) as IPageCustom;
              if (icustom != null) {
                item.Value = icustom.toComponent(self, view, formItemSec)
              };
            }
          }
        })


        return new STAccordionCustomConfig({
          title: x.Title,
          value: x.Value,
          contentList: x.ContentList.map(z => new STFormItem(z))
        })
      })
    })

    sec.Props = {
      attData: props
    }
    sec.Events = {
      updateFormData: async (data: any) => {
        // await view.SetEvent_PromptConfigFormUpdate(sec, data)
        await view.SetEvent_FormChange(data, sec)
      }
    }

    return secAccordionGroup
  }

  static toPrimVueMultiSelectSearch(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STMultiSelectSearch
    let pros = new STMultiSelectSearchProps()
    sec.Props = pros;
    sec.Events = new STMultiSelectSearchEvent({
      eventInputChange: (event) => {
        view.SetEvent_SelectSearchInputChange(event, sec)
        self.updateEntitySection(view, sec.Path)
      },
      eventSelectedChange: (event) => {
        view.SetEvent_SelectSearchChangeSelected(event, sec)
        self.updateEntitySection(view, sec.Path)
      },
    })

    return sec;
  }

  // TODO-DELELE: 測試用，之後會改成AI_CHAT
  static toPrimVueAiChatNew(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STAIChat

    let secAiChat: PageSectionAIChatNew = sec as PageSectionAIChatNew
    let agentEntity = new STAichatAgentData(secAiChat.AiAgentData)
    sec.Props = {
      defaultDataList: secAiChat.AiDefaultDataList,
      agentData: agentEntity,
      allowCreateChatRoom: secAiChat.AllowCreateChatRoom,
      visibleToolBar: secAiChat.VisibleToolBar,
      chatRoomId: secAiChat.ChatRoomId,
      chatMessages: secAiChat.ChatMessages,
      chatRoomDisabled: secAiChat.ChatRoomDisabled,
      depsType: secAiChat.DepsType ? new STAIChatDepsType(secAiChat.DepsType) : null,
      chatRoomDisabledMessage: secAiChat.ChatRoomDisabledMessage ?? 'Components.STAiChat.Choose_LLM_MSG',
      showSendMessage: secAiChat.ShowSendMessage,
      speechServiceResult: secAiChat.speechServiceResult
    }
    sec.Events = {
      updateLogData: async (data: any) => {
        console.log('updateLogData', data)
        // await view.SetEvent_PromptConfigFormUpdate(sec, data)
        await view.SetEvent_UpdateLogData(sec, data)
      },
      showCanCallAPI: async (data: any) => {
        await view.SetEvent_ShowCanCallAPI(sec, data)
      }
    }

    return secAiChat
  }
  static toPrimVueKeyValue(self: PageBuilder, view: PageView, secOrg: PageSection) {
    let sec = secOrg as PageSectionKeyValue;
    sec.Component = STKeyValue;
    let pros = new STKeyValueItem();

    let formProps = new STFormProps();
    let item = sec.FormOps?.FormItems ?? [];
    formProps.setFormItems(item.map((x) => new STFormItem(x)));

    if (sec.customSection) {
      sec.customSection = PageSectionFactory.toPrimVueComp(self, view, sec.customSection) as PageSectionCustom;
    }

    sec.Props = pros;

    sec.Events = new STKeyValueEvent({
      addItem: async (data: any) => {
        await view.SetEvent_KeyValueAdd(sec, data)
      },
      deleteItem: async (data: any) => {
        await view.SetEvent_KeyValueDelete(sec, data)
      }
    });
    return sec;
  }

  static toPrimVueMenu(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STMenubar;
    let pros = new STMenuProps();
    if (sec.ToolbarActions.length == 0)
      sec.Display = false;
    pros.setActions(sec.ToolbarActions.map((x) => new STMenuAction(x)));
    pros.title = sec.Title;
    sec.Props = pros;
    sec.Events = {
      eventActionBtn: async (item) => {
        const tempAction = new PageAction(item);
        await view.SetEvent_PageToolbarAction(tempAction, sec);
        //self.updateView(view);
      },
    };

    return sec;
  }

  static toPrimVueTabList(self: PageBuilder, view: PageView, sec: PageSection) {
    sec.Component = STTabList
    sec.Events = new STTabListEvent({
      notifyItem: async (data: any) => {
        await view.SetEvent_TabRowEvent(sec, data)
      }
    })
    // let item = sec.AccordionItemList
    // let newList = item.map((x) => {
    //   return new STAccordionConfig(x.convertObject())
    // })

    // sec.Props = {
    //   data: newList,
    //   multiple: sec.AccordionMultiple
    // }
    return sec
  }

  static toPrimVueCardSelect(self: PageBuilder, view: PageView, sec: PageSection) {
    const cardSelectSec = sec as any; // 或更具體的型別
    sec.Component = STCardSelect;

    let props = new STCardSelectProps({
      data: cardSelectSec.cardSelectProps?.data ?? [],
      mode: cardSelectSec.cardSelectProps?.mode ?? 'multiple'
    });

    sec.Props = props;
    sec.Events = new STCardSelectEvent({
      change: async (data: any) => {
        await view.SetEvent_CardSelectClick(data, sec)
      }
    })
    return sec;
  }

  static toPrimVueVersion(self: PageBuilder, view: PageView, sec: PageSection) {
    const versionSec = sec as any;
    sec.Component = STVersion;

    let props = new STVersionProps({
      data: versionSec.versionProps?.data ?? [],
    });

    sec.Props = props;
    return sec;
  }

}


export class ComponentConvert {
  static getComponent(sec: PageSection) {
    if (sec?.isPageCustom()) {
      let icustom = (<object>sec) as IPageCustom;
      if (icustom == null) {
        return null;
      };

      return icustom.getComponent();
    }
    else if (sec.SectionType == PageSectionType.TABLE) {
      return STTable;
    } else if (sec.SectionType == PageSectionType.FORM)
      return STForm
    else if (sec.SectionType == PageSectionType.PAGE_TITLE)
      return STPageTitle
    else if (sec.SectionType == PageSectionType.PAGE_MENUBAR)
      return STMenubar
    else if (sec.SectionType == PageSectionType.PAGE_MESSAGE)
      return STMessage
    else if (sec.SectionType == PageSectionType.PAGE_MASTER_INFO)
      return STMasterInfo
    else if (sec.SectionType == PageSectionType.PAGE_TABS)
      return STTab
    else if (sec.SectionType == PageSectionType.TABLE_SEARCH)
      return STTable
    else if (sec.SectionType == PageSectionType.FILE_UPLOAD)
      return STUploadFileManagement
    else if (sec.SectionType == PageSectionType.DASHBOARD_CARDNUMBER)
      return STCardNumber
    else if (sec.SectionType == PageSectionType.TREE)
      return STTree
    else if (sec.SectionType == PageSectionType.DIALOG)
      return STDialog
    else if (sec.SectionType == PageSectionType.MARKDOWN)
      return STMarkdown
    else if (sec.SectionType == PageSectionType.TABLE_SEARCH_FILTER)
      return STFilter
    else if (sec.SectionType == PageSectionType.TIMELINE)
      return STTimeline
    else if (sec.SectionType == PageSectionType.FILE_DOWNLOAD)
      return STFileDownload
    else if (sec.SectionType == PageSectionType.ACCORDION)
      return STAccordion
    else if (sec.SectionType == PageSectionType.CHATLINE)
      return STChat
    else if (sec.SectionType == PageSectionType.TABCONTENT)
      return STTabContent
    else if (sec.SectionType == PageSectionType.SEARCHBAR)
      return STSearchBar
    else if (sec.SectionType == PageSectionType.DASHBOARD_BAR)
      return STDashboardBar
    else if (sec.SectionType == PageSectionType.EDITOR)
      return STEditor
    else if (sec.SectionType == PageSectionType.CARDTITLE)
      return STCardTitle
    else if (sec.SectionType == PageSectionType.LISTVIEW_SEARCH)
      return STListViewSearch
    else if (sec.SectionType == PageSectionType.CARDPANEL)
      return STCardPanel
    else if (sec.SectionType == PageSectionType.TABLE_VIEW)
      return STTableView
    // return STAIChat
    else if (sec.SectionType == PageSectionType.SLIDER)
      return STSlider
    else if (sec.SectionType == PageSectionType.ATTRIBUTE_PANEL)
      return STAttributePanel

    else if (sec.SectionType == PageSectionType.WORKFLOW)
      return STWorkflow

    else if (sec.SectionType == PageSectionType.TREE_FORM)
      return STTreeForm

    // TODO-DELELE: 測試用，之後會改成AI_CHAT
    else if (sec.SectionType == PageSectionType.AI_CHAT_NEW)
      return STAIChat
    else if (sec.SectionType == PageSectionType.KeyValue)
      return STKeyValue
    else if (sec.SectionType == PageSectionType.MENU)
      return STMenu
    else if (sec.SectionType == PageSectionType.TabList)
      return STTabList
    else if (sec.SectionType == PageSectionType.CARDSELECT)
      return STCardSelect
    else if (sec.SectionType == PageSectionType.VERSION)
      return STVersion
  }
}