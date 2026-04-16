<script setup lang="ts">
import { ref } from 'vue';
import STLayoutMenu from './STLayoutMenu.vue'
import STLayoutSidebarFooter from './STLayoutSidebarFooter.vue'
import STIcon from '@/components/Icon.vue'
import { UILayoutController } from '../Core/UILayoutController';
import { MenuStore } from '../Store/MenuStore';
const menuStore = MenuStore()
let isMenuCollapsed = ref(menuStore.isMenuCollapsed)
const toggleMenuCollapse = () => {
  menuStore.isMenuCollapsed = ! menuStore.isMenuCollapsed
  isMenuCollapsed.value = menuStore.isMenuCollapsed
}

const props = defineProps({
  controller: {
    type: UILayoutController,
  },

})

</script>
<template>
  <div class="flex relative mt-[60px]" :class="{ 'w-sideIconBar': isMenuCollapsed, 'w-sidebar': !isMenuCollapsed }">
    <div class="h-full flex overflow-hidden flex-grow flex-col bg-foneBgLevel2 sidebarShadow transition-all w-full">
      <div class="overflow-y-auto  px-[8px] pt-[20px] flex-1 min-h-0">
        <STLayoutMenu :isMenuCollapsed="isMenuCollapsed" :controller="props.controller"/>
      </div>
      <STLayoutSidebarFooter :isMenuCollapsed="isMenuCollapsed" :controller="props.controller"/>
    </div>
    <!-- 收合/展開按鈕 top-[calc(50%+44px)]-->
    <div v-tooltip="`${isMenuCollapsed ? $t('Layout.Sidebar.Collapse_Sidebar') : $t('Layout.Sidebar.Expand_Sidebar')}`"
      class="absolute  right-[-1px] cursor-col-resize w-[4px] h-full rounded-[2px] bg-[transparent]"
      @click="() => { toggleMenuCollapse() }">
      <!-- <STIcon v-if="!isMenuCollapsed" name="ic_close" customClass="!w-[18px] !h-[18px]" /> -->
    </div>
  </div>
</template>
<style>
.sidebarShadow {
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);
}
</style>