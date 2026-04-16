<script setup lang="ts">
import STLayoutSidebar from './STLayoutSidebar.vue'
import STLayoutTopbar from './STLayoutTopbar.vue'
import { useI18n } from 'vue-i18n';
import { ReloadStore } from '@/stores/reloadStore';
import { ReloadMenuStore } from "@/stores/reloadMenuStore";
import { useRoute, useRouter } from 'vue-router';
import { PageBuilder } from '@/lib/pageBuilder/base/PageBuilder';
import { UILayout } from '../Core/UILayoutController';
import { onMounted, onUnmounted, watch } from 'vue';
import { PageSectionFactory } from '@/lib/pageBuilder/adapter/primevue.adapter';
import { PageAction } from '@/lib/pageBuilder/core/PageAction';
import { PageEventEnum, PageEventBus } from '@/lib/pageBuilder/mitt/PageEventBus';
const reload = ReloadStore()
const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const reloadMenu = ReloadMenuStore();
let pageBuilder = new PageBuilder(t, locale, route, router, false);
// layout 的 邏輯控制
const controller =UILayout.SideBarAppBarNarrow(pageBuilder) ;

const actionItem = async (item: PageAction) => {
    console.log(item)
     await controller.template.DrawerViewRef.value.CallAction(null, item);
}



watch(() => controller.template.DialogVisible.value,
    (newValue, oldValue) => {
       
      console.log(`newValue:${newValue} , oldValue:${oldValue}`)
        controller.template.DialogViewRef.value.DialogSection = PageSectionFactory.toPrimVueComp(
            pageBuilder, controller.template.customView,  controller.template.DialogViewRef.value.DialogSection);
    }
)

const eventFunction = (eventName, data) => {
    if (eventName == PageEventEnum.PageDialogClose) {
       controller.template.CloseDialog();
    }
}

onMounted(async () => {  
    PageEventBus.getInstance.onMonitor(eventFunction);
})


onUnmounted(() => {
    PageEventBus.getInstance.offMonitor(eventFunction);
})



const pt = {
  root: ({ props }) => ({
    class: [
      // Spacing
      //'!shadow-[0px_5px_15px_rgba(0, 0, 0, 0.05)]',
      '!shadow-none'
    ]
  }),
  header: ({ props }) => ({
    class: [
      '!px-[20px] !py-[14px]',
      '!border-b-[1px] !border-foneBorder',
      '!h-[56px]'

    ]
  }),
  title: ({ props }) => ({
    class: [
      '!text-[18px] !leading-[28px] font-bold'
    ]
  }),
  content: ({ props }) => ({
    class: [
      '!px-[20px] !pt-[20px] !pb-[0px]'
    ]
  }),
  pcCloseButton: ({ props }) => ({
    class: [
      '!rounded-none !h-[28px] !w-[28px]'
    ]
  }),
}




</script>
<template>
  <div class="w-screen h-screen flex flex-col overflow-hidden">
    <STLayoutTopbar :controller="controller"/>
    <div class="flex flex-grow overflow-hidden">
      <STLayoutSidebar :key="reloadMenu.reloadKey" :controller="controller" />
      <div class="flex-1 overflow-auto h-full px-3 pt-[75px] !bg-foneBg">
        <router-view :key="reload.reloadKey"></router-view>
      </div>

    </div>

    <Drawer :dismissible="controller.template.DrawerViewRef.value.IsDismissible" :pt="pt"
            v-model:visible="controller.template.DrawerVisibleRight.value"
            :modal="false" 
            :position="controller.template.DrawerViewRef.value.IsFullWidth ? 'full' : 'right'"
            :header="controller.template.DrawerViewRef.value.DrawerSection.Title" style="top:69px" >
            <template #header>
                <div class="w-full flex justify-between">
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-2xl">{{ t(controller.template.DrawerViewRef.value.DrawerSection.Title) }}</span>
                    </div>
                    <!-- <div>
                        <Button icon="pi pi-window-maximize" variant="text" rounded aria-label="Filter"
                            severity="secondary"
                            @click="() => { controller.template.DrawerViewRef.value.openFullScreen() }" />
                    </div> -->
                </div>
            </template>
            <div 
                :key="controller.template.DrawerViewRef.value.DrawerSection.Id">
                <component :key="controller.template.DrawerViewRef.value.UpdateKey"
                    :id="controller.template.DrawerViewRef.value.DrawerSection.Id"
                    :is="pageBuilder.getComponent(controller.template.DrawerViewRef.value.DrawerSection)"
                    :type="controller.template.DrawerViewRef.value.DrawerSection.SectionType"
                    v-bind="{ ...controller.template.DrawerViewRef.value.DrawerSection.Props, ...controller.template.DrawerViewRef.value.DrawerSection.Attrs }"
                    :model-value="controller.template.DrawerViewRef.value.DrawerSection.Props?.value"
                    v-on="{ ...controller.template.DrawerViewRef.value.DrawerSection.Events }" />
            </div>
           
            <template #footer v-if="controller.template.DrawerViewRef.value.DrawerSection.FormOps.CustomAction.length > 0">
                <div class="flex items-center gap-2">
                    <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon"
                        :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
                        v-for="(item, index) in controller.template.DrawerViewRef.value.DrawerSection.FormOps.CustomAction"
                        :key="index" :label="t(item.Text)" v-prevent-reclick="2000" />
                </div>
            </template>
        </Drawer>
       
        <!-- 對話框 -->
        <div v-if="controller.template.DialogVisible.value">
       
                <component :id="controller.template.DialogViewRef.value.DialogSection.Id"
                    :is="pageBuilder.getComponent(controller.template.DialogViewRef.value.DialogSection)"
                    :type="controller.template.DialogViewRef.value.DialogSection.SectionType" v-bind="{
                        ...controller.template.DialogViewRef.value.DialogSection.Props,
                        ...controller.template.DialogViewRef.value.DialogSection.Attrs
                    }" :model-value="controller.template.DialogViewRef.value.DialogSection.Props?.value"
                    v-on="{ ...controller.template.DialogViewRef.value.DialogSection.Events }" />

        </div>




  </div>
</template>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.p-button-secondary:not(:disabled):hover {
  background: transparent;
  border: transparent;
  color: #727272;
}
</style>