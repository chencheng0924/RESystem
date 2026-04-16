<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { PageTitleStore } from '@/stores/PageTitle/PageTitleStore';
import { PageBuilder } from '@/lib/pageBuilder/base/PageBuilder';
import { ThemeSwitchController, ThemeModeType } from '@/components/smartcityui/STThemeMode.compsable';
import { useLangStore } from '@/stores/langStore';
import { MenuStore } from '../Store/MenuStore';
import { UILayoutController } from '../Core/UILayoutController';

const route = useRoute()
const router = useRouter()
const langStore = useLangStore()
langStore.reloadSetLang()
const { t, locale } = useI18n()
const controller = new PageBuilder(t, locale, route, router, false);
controller.getInit("UserProfile")
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


watch(() => controller.pageView.value.DrawerVisibleRight,
  (newValue, oldValue) => {
    controller.updateDrawerSection();
    controller.updateView(controller.pageView.value);
  }
)

const setting = ref(null)
const toggle = (event) => {
  setting.value.toggle(event)
}


const themeOptions = ref([
  { icon: 'pi pi-sun', value: `${ThemeModeType.LIGHT}` },
  { icon: 'pi pi-moon', value: `${ThemeModeType.DARK}` },
])

watch(() => controller.pageView.value.DrawerView.UpdateKey,
  (newValue, oldValue) => {
    controller.updateDrawerSection();
    controller.pageView.value.DrawerView.resetUpdateKey()
  }
)

const menuStore = MenuStore()

</script>
<template>
  <div class="flex w-screen bg-foneBgLevel1 justify-between fixed top-0 z-50 border-foneBorder border-b"
   :class="{ '!hidden':menuStore.isMenuCollapsed , '!block':!menuStore.isMenuCollapsed  }"
  >
    <div class="grow h-topbar flex justify-between items-center px-[21px] z-10">
      <div class="flex gap-1 items-center">
        <div v-if="props.isBack == false ? props.isBack : pageTitle.IsBack">
          <Button @click="router.back()" icon="pi pi-angle-left" text rounded severity="secondary">
          </Button>
        </div>
        <span class="text-h1 text-foneTextLevel1">{{ t(pageTitle.Title) }}</span>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.no-arrow.p-component.p-popover::before,
.no-arrow.p-component.p-popover::after {
  display: none;
}
</style>

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