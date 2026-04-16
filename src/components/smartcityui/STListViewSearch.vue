<script lang="ts" setup>
import { STListViewSearchProps, STListViewShowType } from './STListViewSearch.model';
import { UseSTListViewSearch } from './STListViewSearch.composable'
import { PageSection } from '@/lib/pageBuilder/core/PageSection';
import { ComponentConvert } from '@/lib/pageBuilder/adapter/primevue.adapter'
import { IObjectGeneric } from '@/lib/pageBuilder/interface/IObjectGeneric';
import { MenuItem } from "primevue/menuitem";
import { STCardTitleProps } from './STCardTitle.model';
import { STFormItemType } from './STForm.model'
import STForm from './STForm.vue';
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue';
const { t, locale } = useI18n()

const props = withDefaults(defineProps<{
  props?: STListViewSearchProps,
  customSecList?: PageSection[],
  searchKeyword?: string,

}>(), {
  searchKeyword: () => (''),
  autoScroll: () => (false)
})
const emit = defineEmits<{
  'getNextDataEvent': [pageIndex: number, pageRows: number],
  'searchKeyword': [val: string],
  'clearSearchKeyword',
  'addNewItem',
  'eventListItemClicked': [val: IObjectGeneric],
  'renameCompleted': [val: string, id: string],
  'eventClicked': [e: Event, clickedData: STCardTitleProps],
  'change': [e: IObjectGeneric]
}>()
const controller = new UseSTListViewSearch(emit, props.props, props.searchKeyword)

const updateDropdown = (val: any, item) => {
  item.Value = val;
  var e = {};
  e['targetItem'] = item;
  e['value'] = val;
  emit('change', e);
}
onMounted(() => {
  controller.setCurrentActiveId();
})


</script>
<template>
  <div class="w-full bg-foneBgLevel1 gap-[8px] h-full px-[16px] py-[16px]" v-if="props.props">
    <div class="flex justify-between items-center" v-if="props.props.isSearch">
      <div class="text-h3">{{ controller.props.value.title }}</div>
      <span class="pi pi-plus cursor-pointer" @click="() => controller.addNewItem()" v-if="props.props.isNewBtn"></span>
    </div>
    <div v-if="props.props.searchConditions.length > 0" class="mt-[12px]">
      <div v-for="(item, index) in props.props.searchConditions" :key="index">
        <STForm :items="props.props.searchConditions" />
        <!-- <Select v-if="item.Type === STFormItemType.Select" class="w-full h-[2.75rem]" :id="item.Id" v-model="item.Value"
          :optionLabel="item.OptionLabel" :options="item.List"
          :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Select_Placeholder', { name: t(item.Name) })}`"
          :invalid="!!item.ErrorText" :filterPlaceholder="item.FilterPlaceholder" :name="item.Id"
          @update:modelValue="(e) => { updateDropdown(e, item) }">
          <template #option="slotProps">
            <div class="align-items-center">
              <div class="text-body2 text-TextLevelOne break-words whitespace-pre-line">{{
                slotProps.option[item.OptionLabel] }}</div>
            </div>
          </template>
        </Select> -->
      </div>
    </div>
    <div class="flex justify-between items-center mt-[12px] gap-[16px] relative" v-if="props.props.isSearch">
      <InputText v-model="controller.searchInput.value"
        :placeholder="t('Components.STListViewSearch.Search_Placeholder')" class="w-full h-[36px]" />
      <img :src="'ic_input_clear'.getIcon('svg')" alt="clear icon"
        class="absolute right-[60px] top-[30%] cursor-pointer" @click="controller.clearInput()"
        v-if="controller.searchInput.value != ''">
      <div class="p-[8px] flex items-center justify-center bg-fonePrimaryMain rounded-[4px] cursor-pointer"
        @click="() => controller.searchKeyword()">
        <img :src="'ic_search_dark'.getIcon('svg')" alt="search icon">
      </div>
    </div>
    <Divider align="left" type="solid" v-if="props.props.isSearch"></Divider>
    <div class="flex flex-col gap-[4px] h-[calc(100%-120px)] overflow-y-scroll" ref="cardList">
      <div v-if="props.props.showType == STListViewShowType.BY_HTML">
        <div v-for="(data, idx) in props.props.dataList">
          <div v-html="props.props.listByHtml(data)" class="rounded-[4px] cursor-pointer hover:text-fonePrimaryClick"
            @click="() => controller.listItemClicked(data, idx)" :style="controller.clickedStyle(idx)"></div>
          <STButtonPopover v-if="props.props.showPopover" :actions="props.props?.listActionList"
            @eventActionSubBtn="(e, menuItem: MenuItem, subMenuItem: MenuItem) => controller.actionSubBtn(e, menuItem, subMenuItem, data)" />
        </div>
      </div>
      <div v-if="props.props.showType == STListViewShowType.CARD_TITLE" class="flex flex-col">
        <STCardTitle v-for="(item, idx) in props.props.cardTitleList" :props="item"
          :style="controller.activeStyle(item, idx)"
          @actionSubBtn="(e, menuItem: MenuItem, subMenuItem: MenuItem) => controller.actionSubBtn(e, menuItem, subMenuItem, item)"
          @renameCompleted="(val: string, id: string) => controller.renameCompleted(val, id)"
          @eventClicked="(e: Event, clickedData: STCardTitleProps) => controller.eventClickCardTitle(e, clickedData)"
          @click="() => controller.listItemClicked(item, idx)" />
      </div>

      <div v-if="props.props.showType == STListViewShowType.COMPONENT" v-for="(sec, idx) in props.customSecList">
        <component v-if="sec" :id="sec.Id" :is="{ ...ComponentConvert.getComponent(sec) }"
          v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value" v-on="{ ...sec.Events }"
          :style="controller.clickedStyle(idx)" @click="() => controller.listItemClicked(sec.Props, idx)" />
      </div>

      <Divider align="center" type="solid">
        <span class="text-body4 text-scmTextLevel2">{{ t('Components.STListViewSearch.The_End') }}</span>
      </Divider>
    </div>
  </div>
</template>