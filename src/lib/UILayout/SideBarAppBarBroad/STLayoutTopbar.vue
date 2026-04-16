<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { RecentListHistoryStore } from '@/stores/RecentList/RecentListHistoryStore';
import { PageTitleStore } from '@/stores/PageTitle/PageTitleStore';
import { PageBuilder } from '@/lib/pageBuilder/base/PageBuilder';
import { PageAction } from '@/lib/pageBuilder/core/PageAction';
import { STIconButtonProps } from '@/components/smartcityui/STIconButton.model'
import { ThemeSwitchController, ThemeModeType } from '@/components/smartcityui/STThemeMode.compsable';
import { ThemeModeStore } from '@/stores/ThemeMode/ThemeModeStore'
import { useLangStore } from '@/stores/langStore';
import { EnvUtils } from '@/utils/envUtils';
import Icon from '@/components/Icon.vue'
import { STAction } from '@/components/smartcityui/STCommon.model';
import { UILayoutController } from '../Core/UILayoutController';
import { SidebarMenuItem } from '../CSidebarMenu/SidebarMenu.model';

const router = useRouter()
const langStore = useLangStore()
langStore.reloadSetLang()
const { t, locale } = useI18n()

const pageTitle = PageTitleStore().pageTitleItem;
const props = defineProps({
  isBack: {
    type: Boolean,
    default: true
  },
   controller: {
    type: UILayoutController,
  },
})



const actionfunction = (e, item: STAction) => {
  let menu = new SidebarMenuItem({ label: item.Tooltip, path: item.Url , icon: item.Icon, key: item.Id });
   props.controller.template.eventMenuClick(e,menu,router)  
}


// 載入選單的函數
const systemMenus = ref([]);
const loadMenus = async () => {
  const menus = await props.controller.template.getSystemMenuDatas();
  systemMenus.value = menus.map( (x:SidebarMenuItem)=>{
    return  x.toSTAction();
  })
}

onMounted(async () => {
  await loadMenus();
 
})



</script>
<template>
  <div class="flex w-screen bg-foneBgLevel1 justify-between fixed top-0 left-0 z-50 border-foneBorder border-b">
    <div class="w-sidebar h-topbar pl-[1.5rem] flex items-center justify-between">
      <router-link to="/" class="layout-topbar-logo">
        <div class="flex justify-start items-center ">
          <div class="flex justify-center items-center w-[40px] text-fonePrimaryMain">
            <img :src="props.controller.template.LogoPath">
          </div>
          <div class="px-2 text-center text-3xl font-bold font-Futura">
            {{ props.controller.template.LogoTitle }}
          </div>
        </div>
      </router-link>

    </div>
    <div class="grow h-topbar flex justify-between items-center px-[24px] z-10">
      <div class="flex gap-1 items-center">
        <div v-if="props.isBack == false ? props.isBack : pageTitle.IsBack">
          <Button @click="router.back()" icon="pi pi-angle-left" text rounded severity="secondary">
          </Button>
        </div>
        <span class="text-h1 text-foneTextLevel1">{{ t(pageTitle.Title) }}</span>
      </div>



      <div class="flex gap-[4px] items-center">
        <Button v-for="item in systemMenus" @click="actionfunction($event, item)" text v-tooltip.bottom="t(item.Tooltip)"
          severity="secondary" class="!w-[32px] !h-[32px]">
          <template #icon>
            <Icon :name="item.Icon" custom-class="text-foneTextLevel1 !w-[18px] !h-[18px]"></Icon>
          </template>
        </Button>
      </div>

    </div>
  </div>
</template>


<style lang="scss">
.p-button:hover {
  & span {
    font-weight: 700 !important;
  }

  & svg {
    color: var(--fone-primary-main)
  }
}
</style>