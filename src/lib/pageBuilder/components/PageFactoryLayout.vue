<script setup lang="ts">
import { defineComponent, PropType, onMounted, ref, computed, watch, nextTick,onUnmounted } from "vue";
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
//-------primevue
import Drawer from 'primevue/drawer'
import STPanel from '@/components/smartcityui/STPanel.vue'
import STDialog from '@/components/smartcityui/STDialog.vue';
import STMarkdown from '@/components/smartcityui/STMarkdown.vue';
import { useToast } from "primevue/usetoast";
import { ToastMessageOptions } from 'primevue/toast';
import { STDialogContent } from '@/components/smartcityui/STDialog.model.ts';
//-------pageBuilder core
import { PageViewLayout } from "@/lib/pageBuilder/core/PageViewLayout";
import { PageBuilder } from "@/lib/pageBuilder/base/PageBuilder";
import { PageAction } from '@/lib/pageBuilder/core/PageAction';
import { PageSection } from '@/lib/pageBuilder/core/PageSection';
import { PageSectionType } from '@/lib/pageBuilder/enum/PageSectionType';
//------store
import { ReloadStore } from '@/stores/reloadStore.ts';
import { PageLayoutEnum } from '@/lib/pageBuilder/enum/PageLayoutEnum'
//import PagePanel from '@/components/pageLayout/PagePanel.vue'
import PagePanelTitle from '@/lib/pageBuilder/components/PagePanelTitle.vue'
//import NoteLTAction from "@/views/view/knowledgeBase/noteLTAction.vue";
import { STButtonConfig, STButtonType } from '@/components/smartcityui/STButton.model';
import { STIconButtonProps } from "@/components/smartcityui/STIconButton.model";
import { number } from "echarts";
import { PageEventBus, PageEventEnum } from '../mitt/PageEventBus';
import { ApiErrorItem } from "@/utils/apiErrorShow";

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const key = ref(0);
const toast = useToast();
const emit = defineEmits(['submit', "change"])
let controller = new PageBuilder(t, locale, route, router);
controller.setMittUpdateViewEvent(controller.pageView.value)

const props = defineProps({
  L: {   // 左側預設寬度
    type: Number,
    default: 22,
    required: false
  },
  expandControllerVisible: {   // 展開左/右側控制鈕
    type: Boolean,
    default: false,
    required: false
  }
});

const actionItem = async (item: PageAction) => {
  controller.pageView.value = await controller.pageView.value.DrawerView.CallAction(controller.pageView.value, item);

}

watch(() => controller.pageView.value.DrawerView.UpdateKey,
  (newValue, oldValue) => {
    //console.log('updateKey', newValue, oldValue)
    controller.updateDrawerSection();
    //controller.updateView(controller.pageView.value);
    controller.pageView.value.DrawerView.resetUpdateKey()
  }
)

watch(() => controller.pageView.value.DrawerVisibleRight,
  (newValue, oldValue) => {
    controller.updateDrawerSection();
    // exceptionUpdate() // fix (AiProject頁面，新增時左側active id會被重刷)
  }
)
watch(() => controller.pageView.value.DialogVisible,
  (newValue, oldValue) => {
    controller.updateDialogSection();
  }
)
watch(() => controller.pageView.value.currentToast.ToastKey,
  (newValue, oldValue) => {

    let t = controller.pageView.value.currentToast;
    let def = { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 } as ToastMessageOptions;
    let ops = {
      severity: t.SeverityColor.toString(),
      summary: t.Title,
      detail: t.Text,
      life: t.Time
    }

    Object.assign(def, ops);
    toast.add(def);
    //controller.updateDrawerSection();
  }
)
watch(() => controller.pageView.value.RouterPath.getRouter(),
  (newValue, oldValue) => {

    router.push(newValue)
    // controller = new PageBuilder(t, locale, route, newValue);
    // key.value++;
  }
)
const reload = ReloadStore()
watch(() => controller.pageView.value.reload.ReloadKey,
  (newValue, oldValue) => {

    console.log("reload.reloadKey", reload.reloadKey++);
    reload.reloadKey++;
  }
)

const dw = ref('!w-full md:!w-80 lg:!w-[40rem]');
const dwWidth = ref('40rem');
watch(() => controller.pageView.value.DrawerView.Width,
  (newValue, oldValue) => {

    // dw.value = `!w-full md:!w-80 lg:!w-[${newValue}] !w-[${newValue}]`;
    dw.value = `!w-[${newValue}]`;
    dwWidth.value = newValue;
  }
)

const leftBtn = new STIconButtonProps({
  iconUrl: 'ic_autofit_left_primary'.getIcon('svg'),
  tooltipText: '展開右側'
})
const rightBtn = new STIconButtonProps({
  iconUrl: 'ic_autofit_right_primary'.getIcon('svg'),
  tooltipText: '展開左側'
})
const splitterKey = ref(0)
const reRender = () => {
  splitterKey.value += 1
}

const LSize = ref(props.L)
const changeSize = (side: string) => {
  if (side == 'left') LSize.value = 1
  else LSize.value = 99
  reRender()
}

const exceptionUpdate = () => {
  if (route.path.includes('AIProject')) {
    controller.updateEntitySection(controller.pageView.value, 'AiProject_tabs')
    return
  } else if (route.path.includes('AIAgentEdit')) {
    controller.updateEntitySection(controller.pageView.value, 'AIAgentEdit')
    return
  }
  controller.updateView(controller.pageView.value);
}



const eventFunction=(eventName,data)=>{

  //console.log(`${eventName}`,data);
  if(eventName ==PageEventEnum.PageSecUpdateAll )
  {
      controller.updateView(controller.pageView.value);
    
  }
  else if(eventName ==PageEventEnum.PageSecUpdateByOne )
  {
    let path = data as string;
    controller.updateEntitySection(controller.pageView.value , path);

  }
  else if(eventName ==PageEventEnum.PageSecDrawerUpdate )
  {
    let path = data as string;
    controller.updateDrawerSection();

  }
  else if(eventName == PageEventEnum.ApiError)
  {
    toast.removeAllGroups();
    let item:ApiErrorItem = data as ApiErrorItem;
    toast.add({ severity: 'error', summary: `API Error: ${item.errorCode}`, detail: t(item.errorMsg), life: 5000 })
  }
}
onMounted(async () => {
    toast.removeAllGroups();
    PageEventBus.getInstance.onMonitor(eventFunction);
 
})


onUnmounted(()=>{
    PageEventBus.getInstance.offMonitor(eventFunction);
})



</script>


<template>
  <Toast>
  </Toast>

  <div v-if="controller.pageView.value.DialogVisible">
    <component :id="controller.pageView.value.DialogView.DialogSection.Id"
      :is="controller.getComponent(controller.pageView.value.DialogView.DialogSection)"
      :type="controller.pageView.value.DialogView.DialogSection.SectionType" v-bind="{
        ...controller.pageView.value.DialogView.DialogSection.Props,
        ...controller.pageView.value.DialogView.DialogSection.Attrs
      }" :model-value="controller.pageView.value.DialogView.DialogSection.Props?.value"
      v-on="{ ...controller.pageView.value.DialogView.DialogSection.Events }" />
  </div>

  <Drawer v-model:visible="controller.pageView.value.DrawerVisibleRight"
    :header="controller.pageView.value.DrawerView.DrawerSection.Title" position="right" :class="dw" :style="{ width: dwWidth + ' !important' }">
    <template #header>
      <div class="flex items-center gap-2">
        <Tag :severity="controller.pageView.value.DrawerView.DrawerSection.Badge.SeverityColor"
          :value="t(controller.pageView.value.DrawerView.DrawerSection.Badge.Text)" />
        <span class="font-bold text-2xl">{{ t(controller.pageView.value.DrawerView.DrawerSection.Title) }}</span>
      </div>
    </template>
    <Message severity="error" v-if="!!controller.pageView.value.DrawerView.Message.Text">
      <div v-html="t(controller.pageView.value.DrawerView.Message.Text)"></div>
    </Message>
    <div :key="controller.pageView.value.DrawerView.DrawerSection.Id" >
      <component :key="controller.pageView.value.DrawerView.UpdateKey"
      :id="controller.pageView.value.DrawerView.DrawerSection.Id"
      :is="controller.getComponent(controller.pageView.value.DrawerView.DrawerSection)"
      :type="controller.pageView.value.DrawerView.DrawerSection.SectionType"
      v-bind="{ ...controller.pageView.value.DrawerView.DrawerSection.Props, ...controller.pageView.value.DrawerView.DrawerSection.Attrs }"
      :model-value="controller.pageView.value.DrawerView.DrawerSection.Props?.value"
      v-on="{ ...controller.pageView.value.DrawerView.DrawerSection.Events }" />
    </div>
   

    <template #footer>
      <div class="flex items-center gap-2">
        <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon"
          :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
          v-for="(item, index) in controller.pageView.value.DrawerView.DrawerSection.FormOps.CustomAction" :key="index"
          :label="t(item.Text)" v-prevent-reclick="2000" />
      </div>
    </template>
  </Drawer>

  <div v-if="controller.pageView.value.ProgressBar">
    <ProgressBar mode="indeterminate" style="height: 2px"></ProgressBar>
  </div>

  <div v-for="(sec, index) in controller.pageView.value.PageSections" :key="index" class="w-full">
    <div v-if="sec.IsPanel == false">
      <div class="w-full py-2" v-if="sec.Display">
        <div class="" :key="sec.Id">
          <component :id="sec.Id" :is="{ ...sec.Component }" :type="sec.SectionType"
            v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value" v-on="{ ...sec.Events }" />
        </div>

      </div>
    </div>
    <div v-else>
      <div class="w-full py-2" v-if="sec.Display">
        <div class="text-center md:text-left flex align-items-center">
          <div class="w-full">
            <PagePanelTitle :props="sec.PanelItem">
              <component :id="sec.Id" :is="controller.getComponent(sec)" :type="sec.SectionType"
                v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value" v-on="{ ...sec.Events }" 
                :key="sec.Id"
                />
            </PagePanelTitle>
          </div>
        </div>

      </div>
    </div>



  </div>

  <div class="flex justify-between w-full h-full pt-2 !rounded-[6px]"
   >
    <Splitter class="w-full h-full" :key="splitterKey">
      <SplitterPanel class="flex justify-center " :size="LSize">
        <!-- 這邊div的高度會影響 ListView 的 lazy loading -->
        <div class="bg-foneBgLevel1 w-full overflow-y-scroll">
          <div
            v-for="(sec, index) in controller.pageView.value.EntitySections.filter(x => x.LayoutType == PageLayoutEnum.LEFT)"
            :key="index" class="h-full" v-memo="[sec.Props]">
            <div v-if="sec.IsPanel == false" class="h-full">
              <div class="w-full h-full" v-if="sec.Display">
                <div class="text-center md:text-left flex align-items-center h-full" :key="sec.Id">
                  <component v-memo="[sec.Id, sec.Props, sec.Attrs, sec.Events]" 
                    :is="controller.getComponent(sec)" 
                    v-bind="{ ...sec.Props, ...sec.Attrs }"  v-on="{ ...sec.Events }" />
                </div>

              </div>
            </div>
            <div v-else>
              <div class="w-full" v-if="sec.Display">
                <div class="text-center md:text-left flex align-items-center">
                  <div class="w-full">
                    <PagePanelTitle :props="sec.PanelItem">
                      <Message :closable="sec.Message.IsColse" :severity="sec.Message.SeverityColor"
                        v-if="!!sec.Message.Text">
                        <div v-html="sec.Message.Text"></div>
                      </Message>
                      <div :key="sec.Id">
                        <component v-memo="[sec.Id, sec.Props, sec.Attrs, sec.Events]" 
                          :is="controller.getComponent(sec)" v-bind="{ ...sec.Props, ...sec.Attrs }"
                           v-on="{ ...sec.Events }" />
                      </div>
                    </PagePanelTitle>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel class="flex items-start justify-center" :size="100 - LSize">
      
        <div class="w-full" >
          <div
            v-for="(sec, index) in controller.getEntitySectionByRight()"
            :key="index" class="pb-4" >
            <div v-if="sec.IsPanel == false" >
              <div class="w-full" v-if="sec.Display"  :class="sec.getClass()" >
                <div class="w-full" :key="sec.Id" :class="{'h-[calc(100vh-68px)]': controller.getEntitySectionByRight().length <=1 }">
                  <component v-memo="[sec.Id, sec.Props, sec.Attrs, sec.Events]" 
                    :is="controller.getComponent(sec)" :type="sec.SectionType"
                    v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value" v-on="{ ...sec.Events }" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="w-full" v-if="sec.Display">
                <div class="w-full text-center md:text-left flex align-items-center">
                  <div class="w-full">
                    <PagePanelTitle :props="sec.PanelItem" class="pt-4 px-4">
                      <Message :closable="sec.Message.IsColse" :severity="sec.Message.SeverityColor"
                        v-if="!!sec.Message.Text">
                        <div v-html="sec.Message.Text"></div>
                      </Message>
                      <div :key="sec.Id" >
                        <component v-memo="[sec.Id, sec.Props, sec.Attrs, sec.Events]"
                          :is="controller.getComponent(sec)" v-bind="{ ...sec.Props, ...sec.Attrs }"
                          :model-value="sec.Props?.value" v-on="{ ...sec.Events }" />
                      </div>
                    </PagePanelTitle>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

