<script setup lang="ts">
import Drawer from 'primevue/drawer'

import { PropType, onMounted, onUnmounted, ref,watch } from "vue";
import STPanel from '@/components/smartcityui/STPanel.vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { ToastMessageOptions } from 'primevue/toast';
import { ReloadStore } from '@/stores/reloadStore.ts';
import { PageViewLayout } from '../core/PageViewLayout';
import { PageBuilder } from '../base/PageBuilder';
import { PageAction } from '../core/PageAction';
import { PageType} from '../enum/PageType'
import { PageEventBus, PageEventEnum } from '../mitt/PageEventBus';
import PageFactoryContent from './PageFactoryContent.vue';
import { ThemeSwitchController } from '@/components/smartcityui/STThemeMode.compsable';

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const key = ref(0);
const toast = useToast();
const emit = defineEmits(['submit', "change"])
let controller = new PageBuilder(t, locale, route, router);

const props = defineProps({
    pageLayout: {
        type: Object as PropType<PageViewLayout>,
        default: new PageViewLayout(),
        required: false
    }

});

const actionItem = async (item: PageAction) => {
    console.log(item)
    controller.pageView.value = await controller.pageView.value.DrawerView.CallAction(controller.pageView.value, item);
}

watch(() => controller.pageView.value.DrawerView.UpdateKey,
    (newValue, oldValue) => {
        controller.updateDrawerSection();
        controller.updateView(controller.pageView.value);
        controller.pageView.value.DrawerView.resetUpdateKey()
    }
)

watch(() => controller.pageView.value.DrawerVisibleRight,
    (newValue, oldValue) => {
        controller.updateDrawerSection();
        // controller.updateView(controller.pageView.value);
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
onMounted(() => {
    toast.removeAllGroups();
})

const dw = ref('!w-full md:!w-80 lg:!w-[40rem]');
watch(() => controller.pageView.value.DrawerView.Width,
    (newValue, oldValue) => {

        dw.value = `!w-full md:!w-80 lg:!w-[${newValue}]`;
    }
)


const w = `!w-[${window.screen.width - 500}px]`;
//console.log(controller.pageView.value.PageSections)

const className = ref('');
const pkid = ref('');

const eventFunction=(eventName,data)=>{

    console.log(`${eventName}`,data);
    if(eventName == PageEventEnum.PageClick)
    {
        className.value = data.className;
        pkid.value = data.pkid;

        console.log(className.value)
        console.log( pkid.value)
    }
}

onMounted(()=>{
    PageEventBus.getInstance.onMonitor(eventFunction);
})

onUnmounted(()=>{
    PageEventBus.getInstance.offMonitor(eventFunction);
})

// 取得顏色切換
let themeController = new ThemeSwitchController(false);
let mode = themeController.getSearchEmptyImage();
let imgSearchEmpty = ref(mode)
</script>


<template>

<div class="h-full py-2">
<Splitter class="h-full bg-commBg">

   <SplitterPanel  >
<div class="w-full pr-3">
     <div v-if="controller.pageView.value.EntitySections.length <=0 && controller.pageView.value.PageType == PageType.VIEW">
            <div class="flex justify-end mt-4">
                <Skeleton width="24rem" height="1.5rem"></Skeleton>
            </div>
            <div class="pt-3">
                <Skeleton width="100%" height="3rem" class="pt-4"></Skeleton>
            </div>
            <div class="flex mb-4 pt-4">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div>
                    <Skeleton width="10rem" class="mb-2"></Skeleton>
                    <Skeleton width="5rem" class="mb-2"></Skeleton>
                    <Skeleton height=".5rem"></Skeleton>
                </div>
            </div>
            <div>
                <Skeleton width="100%" height="7rem" ></Skeleton>
            </div>
            <div class="pt-3">
                <Skeleton width="100%" height="3rem" class="pt-4"></Skeleton>
            </div>
           
          
            <Skeleton width="100%" height="150px"></Skeleton>
            <div class="flex justify-between mt-4">
                <Skeleton width="24rem" height="2rem"></Skeleton>
                <Skeleton width="24rem" height="2rem"></Skeleton>
            </div>
        
    </div>

    <Toast >
    </Toast>
    <div v-if="controller.pageView.value.DialogVisible">
        <component :id="controller.pageView.value.DialogView.DialogSection.Id"
            :is="{ ...controller.pageView.value.DialogView.DialogSection.Component }"
            :type="controller.pageView.value.DialogView.DialogSection.SectionType" v-bind="{
                ...controller.pageView.value.DialogView.DialogSection.Props,
                ...controller.pageView.value.DialogView.DialogSection.Attrs
            }" :model-value="controller.pageView.value.DialogView.DialogSection.Props?.value"
            v-on="{ ...controller.pageView.value.DialogView.DialogSection.Events }" />
    </div>

    <Drawer v-model:visible="controller.pageView.value.DrawerVisibleRight"
        :position="controller.pageView.value.DrawerView.IsFullWidth ? 'full' : 'right'"
        :header="controller.pageView.value.DrawerView.DrawerSection.Title" :class="dw">
        <template #header>
            <div class="w-full flex justify-between">
                <div class="flex items-center gap-2">
                    <Tag :severity="controller.pageView.value.DrawerView.DrawerSection.Badge.SeverityColor"
                        :value="controller.pageView.value.DrawerView.DrawerSection.Badge.Text" />
                    <span class="font-bold text-2xl">{{ controller.pageView.value.DrawerView.DrawerSection.Title }}</span>  
                </div>
                <div>
                    <Button icon="pi pi-window-maximize" variant="text" rounded aria-label="Filter"  severity="secondary"
                    @click="()=>{controller.pageView.value.DrawerView.openFullScreen()}" />
                </div>
               
            </div>
        </template>
        <Message severity="error" v-if="!!controller.pageView.value.DrawerView.Message.Text">
            <div v-html="controller.pageView.value.DrawerView.Message.Text"></div>
        </Message>
        <component :key="controller.pageView.value.DrawerView.UpdateKey"
            :id="controller.pageView.value.DrawerView.DrawerSection.Id"
            :is="controller.pageView.value.DrawerView.DrawerSection.Component"
            :type="controller.pageView.value.DrawerView.DrawerSection.SectionType"
            v-bind="{ ...controller.pageView.value.DrawerView.DrawerSection.Props, ...controller.pageView.value.DrawerView.DrawerSection.Attrs }"
            :model-value="controller.pageView.value.DrawerView.DrawerSection.Props?.value"
            v-on="{ ...controller.pageView.value.DrawerView.DrawerSection.Events }" />

        <template #footer>
            <div class="flex items-center gap-2">
                <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon"
                    :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
                    v-for="(item, index) in controller.pageView.value.DrawerView.DrawerSection.FormOps.CustomAction"
                    :key="index" :label="item.Text" v-prevent-reclick="2000" />
            </div>
        </template>
    </Drawer>

    <div v-if="controller.pageView.value.ProgressBar">
        <ProgressBar mode="indeterminate" style="height: 2px"></ProgressBar>
    </div>

    <div v-for="(sec, index) in controller.pageView.value.PageSections" :key="index" class="w-full">
        <div v-if="sec.IsPanel == false">
            <div class="w-full py-2" v-if="sec.Display">
                <div class="">
                    <component :id="sec.Id" :is="{ ...sec.Component }" :type="sec.SectionType"
                        v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                        v-on="{ ...sec.Events }" />
                </div>

            </div>
        </div>
        <div v-else>
            <div class="w-full py-2" v-if="sec.Display">
                <div class="text-center md:text-left flex align-items-center">
                    <div class="w-full">
                        <STPanel toggleable :header="sec.Title">
                            <component :id="sec.Id" :is="{ ...controller.getComponent(sec) }" :type="sec.SectionType"
                                v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                                v-on="{ ...sec.Events }" />
                        </STPanel>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-for="(sec, index) in controller.pageView.value.EntitySections" :key="index" class="w-full">
        <div v-if="sec.IsPanel == false">
            <div class="w-full py-2" v-if="sec.Display">
                <div class="text-center md:text-left flex align-items-center">
                    <component :id="sec.Id" :is="{ ...controller.getComponent(sec) }" :type="sec.SectionType"
                        v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                        v-on="{ ...sec.Events }" />
                </div>

            </div>
        </div>
        <div v-else>
            <div class="w-full py-2" v-if="sec.Display">
                <div class="text-center md:text-left flex align-items-center">
                    <div class="w-full">
                        <STPanel toggleable>
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <div class="w-[4px] h-[16px] bg-fonePrimaryMain"></div>
                                    <h4 class="font-bold">{{ sec.Title }}</h4>
                                </div>
                            </template>
                            <Message :closable="sec.Message.IsColse" :severity="sec.Message.SeverityColor"
                                v-if="!!sec.Message.Text">
                                <div v-html="sec.Message.Text"></div>
                            </Message>
                            <div>
                                <component :id="sec.Id" :is="{ ...controller.getComponent(sec) }"
                                    v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                                    v-on="{ ...sec.Events }" />
                            </div>
                            <template #icons v-if="sec.isFormEdit()">
                                <Button icon="pi pi-save" rounded text
                                    @click="() => { controller.saveEntitySection(sec); }" />
                            </template>
                        </STPanel>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</SplitterPanel>
<SplitterPanel class="">
    <div v-if="pkid==''" class="pt-40">
        <div class="flex justify-center h-24">
                    <img :src="imgSearchEmpty" width="84" height="84"/>
                    
        </div>
        <div class="flex justify-center" >無資料</div>
    </div>
    <div class="h-full px-3" style="overflow: auto;" :key="pkid">
        <PageFactoryContent :className="className" :pkid="pkid"></PageFactoryContent>
    </div>
</SplitterPanel>
</Splitter >
</div>


</template>
