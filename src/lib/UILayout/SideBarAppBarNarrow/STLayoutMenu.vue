<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
const { t } = useI18n()
import SidebarMenu from '../CSidebarMenu/SidebarMenu.vue'
import { SidebarMenuItem } from '../CSidebarMenu/SidebarMenu.model';
import { UILayoutController } from '../Core/UILayoutController';
const route = useRoute();
const router = useRouter()
const props = defineProps({
  isMenuCollapsed: {
    type: Boolean,
    default: true
  },
   controller: {
    type: UILayoutController,
  },
})

// 載入選單的函數
const model = ref([]);
const loadMenus = async () => {
  const menus = await props.controller.template.getMenuDatas();
  model.value = menus
}

onMounted(async () => {
  await loadMenus();
})

const menuBtn=(e,item:SidebarMenuItem)=>{
   props.controller.template.eventMenuClick(e,item,router)  
}

const menuNewBtn=(e,item:SidebarMenuItem)=>{
  props.controller.template.eventMenuRightClick(e,item,router)  
}

</script>

<template>
  <nav id="menu" class="w-full h-full text-foneTextLevel1">

    <ul class="layout-menu">
      <li role="menuitem" class="flex flex-col mt-1" v-for="menu in model" >
          <SidebarMenu :menuItem="menu" @eventActionBtn="menuBtn" @eventActionNewBtn="menuNewBtn"></SidebarMenu>
      </li>
    </ul>   

  </nav>
</template>
