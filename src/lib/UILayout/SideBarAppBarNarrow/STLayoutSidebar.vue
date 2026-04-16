<script setup lang="ts">
import { ref } from 'vue';
import STLayoutMenu from './STLayoutMenu.vue'
import STLayoutSidebarFooter from './STLayoutSidebarFooter.vue'
import { MenuStore } from '../Store/MenuStore';
import { UILayoutController } from '../Core/UILayoutController';
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
  <div class="flex relative" :class="{ 'w-sideIconBar': isMenuCollapsed, 'w-sidebar': !isMenuCollapsed }">
    <div class="h-full flex overflow-hidden flex-grow flex-col bg-foneBgLevel2 sidebarShadow transition-all w-full">
      <div class="h-[69px] py-[23px] flex items-center" 
       :class="{ 'pl-[4px] ':isMenuCollapsed , 'pl-[8px] border-foneBorder border-b':!isMenuCollapsed  }"
      >
        <router-link to="/" class="layout-topbar-logo">
        <div class="flex justify-start items-center ">
          <div class="flex justify-center items-center w-[40px] text-fonePrimaryMain">
            <img :src="props.controller.template.LogoPath">
          </div>
          <div class="px-2 text-center text-3xl font-bold font-Futura" 
            :class="{ 'hidden ':isMenuCollapsed , 'block ':!isMenuCollapsed  }"
          >
            {{ props.controller.template.LogoTitle }}
          </div>
        </div>
      </router-link>
      </div>
      <div class="overflow-y-auto flex-1 min-h-0 px-[8px]">
        <STLayoutMenu :isMenuCollapsed="isMenuCollapsed"  :controller="props.controller"/>
      </div>
      <STLayoutSidebarFooter :isMenuCollapsed="isMenuCollapsed" :controller="props.controller" />
    </div>
    <!-- 收合/展開按鈕 top-[calc(50%+44px)]-->
    <div v-tooltip="`${isMenuCollapsed ? $t('Layout.Sidebar.Collapse_Sidebar') : $t('Layout.Sidebar.Expand_Sidebar')}`"
      class="absolute  right-[-1px] cursor-col-resize w-[4px] h-full rounded-[2px] bg-[transparent]"
      @click="() => { toggleMenuCollapse() }">

    </div>
  </div>
</template>
<style>
.sidebarShadow {
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);
}
</style>