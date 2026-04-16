<script lang="ts" setup>
import { watchEffect } from 'vue';
import { UseSTCardTitleStyle, UseSTCardTitle } from './STCardTitle.composable'
import { STCardTitleProps } from './STCardTitle.model';
import { MenuItem } from "primevue/menuitem";
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const style = new UseSTCardTitleStyle()
const props = defineProps<{
  props?: STCardTitleProps
}>()
const emit = defineEmits<{
  'actionSubBtn': [e: Event, menuItem: MenuItem, subMenuItem: MenuItem, clickedData: STCardTitleProps],
  'renameCompleted': [val: string, id: string],
  'eventClicked': [e: Event, clickedData: STCardTitleProps]
}>()
const controller = new UseSTCardTitle(emit, t)

watchEffect(() => {
  if (props.props) {
    controller.setProps(props.props)
  }
})
</script>
<template>
  <div class="w-full h-full flex justify-between items-center bg-foneBgLevel1 rounded-[4px] cursor-pointer hover:text-fonePrimaryClick">
    <InputText v-if="controller.canEdit.value" v-model="controller.props.value.title" :placeholder="t('Components.STCardTitle.Search_Placeholder')"
      :pt="style.getInputFieldStyleOption()" @vue:mounted="(el) => el.el?.focus()" @blur="controller.editStatusChange()"
      @keyup.enter="controller.editStatusChange()" />
    <div class="line-clamp-1 pl-[12px] text-body2 grow h-full flex items-center" v-else @click="(e) => controller.eventClickCardTitle(e)">{{ controller.props.value?.title }}</div>
    <STButtonPopover :actions="props.props?.actionList"
      @eventActionSubBtn="(e, menuItem: MenuItem, subMenuItem: MenuItem) => controller.actionSubBtn(e, menuItem, subMenuItem)"/>
  </div>
</template>