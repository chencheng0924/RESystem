<script setup lang="ts">
import Drawer from 'primevue/drawer'
import PageFactoryContentLR from '@/lib/pageBuilder/components/PageFactoryContentLR.vue';

import { PropType, onMounted, onUnmounted, ref, watch, computed, defineAsyncComponent } from "vue";
import STPanel from '@/components/smartcityui/STPanel.vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { ToastMessageOptions } from 'primevue/toast';
import { ReloadStore } from '@/stores/reloadStore.ts';
import { PageViewLayout } from '../core/PageViewLayout';
import { PageBuilder, DrawerControllerViewStore } from '../base/PageBuilder';
import { PageAction } from '../core/PageAction';
import { PageType } from '../enum/PageType'
import { PageLayoutStore } from '@/stores/PageLayout/PageLayoutStore'
import { PageSavingType } from '@/stores/PageLayout/PageSavingType';
import { PageEventBus, PageEventEnum } from '../mitt/PageEventBus';
import STWorkflow from '@/components/smartcityui/WF/STWorkflow.vue'
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { BaseKeyValue } from '../model/BaseKeyValue';
import DynamicDialog from 'primevue/dynamicdialog';
import { useDialog } from 'primevue/usedialog';
import { ApiErrorItem } from '@/utils/apiErrorShow';

const pageStore = PageLayoutStore()
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
    },
    isControllerView: {
        type: Boolean,
        default: false
    },
    controllerType: {
        type: String,
        default: ''
    },
    controllerPKID: {
        type: String,
        default: ''
    },
});

const actionItem = async (item: PageAction) => {
    console.log(item)
    controller.pageView.value = await controller.pageView.value.DrawerView.CallAction(controller.pageView.value, item);
}

watch(() => controller.pageView.value.DrawerView.UpdateKey,
    (newValue, oldValue) => {
        controller.updateDrawerSection();
        //controller.updateView(controller.pageView.value);
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

        console.log("reload.reloadKey1", reload.reloadKey++);
        reload.reloadKey++;
    }
)

const errorCount = ref(0);
const eventFunction = (eventName, data) => {

    //console.log(`${eventName}`,data);
    if (eventName == PageEventEnum.FormItemSaved) {
        pageStore.setSavingSaved()

    }
    else if (eventName == PageEventEnum.FormItemSaveFailed) {
        pageStore.setSavingFailed()
    }
    else if (eventName == PageEventEnum.FormItemSaveing) {
        pageStore.setSaving()
    }
    else if (eventName == PageEventEnum.PageSecUpdateAll) {
        controller.updateView(controller.pageView.value);

    }
    else if (eventName == PageEventEnum.PageSecUpdateByOne) {
        let path = data as string;
        controller.updateEntitySection(controller.pageView.value, path);

    }
    else if (eventName == PageEventEnum.ApiError) {
           toast.removeAllGroups();
        let item:ApiErrorItem = data as ApiErrorItem;
        toast.add({ severity: 'error', summary: `API Error: ${item.errorCode}`, detail: t(item.errorMsg), life: 5000 })
    }
    else if (eventName == PageEventEnum.PageSecDrawerUpdate) {
        let path = data as string;
        controller.updateDrawerSection();

    }
    else if (eventName == PageEventEnum.PageConfirm) {
        let item = data as BaseKeyValue;
        confirm1Dialog(item);
    }
    else if (eventName == PageEventEnum.PageDynamic) {
        let item = data as BaseKeyValue;
        dynamicDialogC(item);
    }
}

let updateControllerView = (controller) => {
    DrawerControllerViewStore.setControllrt(controller)
}
onMounted(async () => {
    toast.removeAllGroups();
    PageEventBus.getInstance.onMonitor(eventFunction);

})


onUnmounted(() => {
    PageEventBus.getInstance.offMonitor(eventFunction);
})


const dw = ref('!w-full md:!w-80 lg:!w-[40rem]');
watch(() => controller.pageView.value.DrawerView.Width,
    (newValue, oldValue) => {

        dw.value = `!w-full md:!w-80 lg:!w-[${newValue}]`;
    }
)

watch(() => controller.pageView.value.DrawerView.IsControllerView,
    (newValue) => {
        if (newValue) {
            dw.value = '!w-full md:!w-[800px] lg:!w-[850px]';
        }
    },
    { immediate: true }
)




const w = `!w-[${window.screen.width - 500}px]`;
//console.log(controller.pageView.value.PageSections)


const safeSecs = computed(() => controller.pageView.value.EntitySections)
const products = ref(new Array(4));

const confirm = useConfirm();
const confirm1Dialog = (item) => {
    confirm.require({
        group: 'templating',
        message: `${item.key}<br>${t('Dialog.Confirmation_Msg')}${item.value}`,
        header: t('Dialog.Confirmation'),
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: t('Dialog.Confirmation_Cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('Dialog.Confirmation_OK')
        },
        accept: () => {

        },
        reject: () => {

        }
    });
};


const dialog = useDialog();
const dynamicDialogConfirm = defineAsyncComponent(() => import('./DynamicDialogConfirm.vue'));
const dynamicDialogC = (item) => {
    const dialogRef = dialog.open(dynamicDialogConfirm, {
        props: {
            header: t('Dialog.Confirmation'),
            style: {
                width: '30vw',
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true,
            pt: {
                content: ({ props }) => ({
                    class: [
                        '!px-[24px]',
                    ]
                }),
                header: ({ props }) => ({
                    class: [
                        '!h-[56px] !px-[20px] !py-[14px]',
                        '!border-b-[1px] !border-foneBorder'
                    ]
                }),
                title: ({ props }) => ({
                    class: [
                        '!leading-[28px]'
                    ]
                }),
                footer: ({ props }) => ({
                    class: [
                        '!h-[64px] !px-[24px] !py-[12px]',
                        '!border-t-[1px] !border-foneBorder',
                    ]
                }),

            }
        },
        data: {
            text: `${item.key}<br>${t('Dialog.Confirmation_Msg')}${item.value}`
        },
        // templates: {
        //     footer: markRaw(FooterDemo)
        // },
        onClose: (options) => {
            const data = options.data;
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data.name };

                toast.add({ severity: 'info', ...summary_and_detail, life: 3000 });
            }
        },

    });
}
</script>


<template>

    <div>
        <div
            v-if="controller.pageView.value.EntitySections.length <= 0 && controller.pageView.value.PageType == PageType.VIEW">
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
                <Skeleton width="100%" height="7rem"></Skeleton>
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
        <div
            v-if="controller.pageView.value.EntitySections.length <= 0 && controller.pageView.value.PageType == PageType.SEARCH">
            <DataTable :value="products">
                <Column field="code" header="">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="name" header="">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="category" header="">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="quantity" header="">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">                   
                    <div  v-html="slotProps.message.message"></div>
                </div>
            </template>
        </ConfirmDialog> -->

        <DynamicDialog></DynamicDialog>

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

        <Drawer :dismissible="controller.pageView.value.DrawerView.IsDismissible"
            v-model:visible="controller.pageView.value.DrawerVisibleRight"
            :modal="controller.pageView.value.DrawerView.IsMode" :pt="controller.pageView.value.DrawerView.Pt"
            :position="controller.pageView.value.DrawerView.IsFullWidth ? 'full' : 'right'"
            :header="controller.pageView.value.DrawerView.DrawerSection.Title" :class="dw">
            <template #header>
                <div class="w-full flex justify-between">
                    <div class="flex items-center gap-2">
                        <Tag :severity="controller.pageView.value.DrawerView.DrawerSection.Badge.SeverityColor"
                            :value="t(controller.pageView.value.DrawerView.DrawerSection.Badge.Text)" />
                        <span class="font-bold text-2xl">{{ t(controller.pageView.value.DrawerView.DrawerSection.Title)
                        }}</span>
                    </div>
                    <div>
                        <Button icon="pi pi-window-maximize" variant="text" rounded aria-label="Filter"
                            severity="secondary"
                            @click="() => { controller.pageView.value.DrawerView.openFullScreen() }" />
                    </div>
                </div>
            </template>
            <Message severity="error" v-if="!!controller.pageView.value.DrawerView.Message.Text">
                <div v-html="t(controller.pageView.value.DrawerView.Message.Text)"></div>
            </Message>

            <div v-if="controller.pageView.value.DrawerView.IsControllerView == false"
                :key="controller.pageView.value.DrawerView.DrawerSection.Id">
                <component :key="controller.pageView.value.DrawerView.UpdateKey"
                    :id="controller.pageView.value.DrawerView.DrawerSection.Id"
                    :is="controller.getComponent(controller.pageView.value.DrawerView.DrawerSection)"
                    :type="controller.pageView.value.DrawerView.DrawerSection.SectionType"
                    v-bind="{ ...controller.pageView.value.DrawerView.DrawerSection.Props, ...controller.pageView.value.DrawerView.DrawerSection.Attrs }"
                    :model-value="controller.pageView.value.DrawerView.DrawerSection.Props?.value"
                    v-on="{ ...controller.pageView.value.DrawerView.DrawerSection.Events }" />
            </div>
            <div v-else :key="controller.pageView.value.DrawerView.EntityPKID">
                <PageFactoryContentLR :className="controller.pageView.value.DrawerView.EntityType"
                    :pkid="controller.pageView.value.DrawerView.EntityPKID" @update="updateControllerView">
                </PageFactoryContentLR>
            </div>
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon"
                        :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
                        v-for="(item, index) in controller.pageView.value.DrawerView.DrawerSection.FormOps.CustomAction"
                        :key="index" :label="t(item.Text)" v-prevent-reclick="2000" />
                </div>
            </template>
        </Drawer>

        <div v-if="controller.pageView.value.ProgressBar">
            <ProgressBar mode="indeterminate" style="height: 2px"></ProgressBar>
        </div>

        <div v-for="(sec, index) in controller.pageView.value.PageSections" :key="sec.Path" class="w-full">
            <div v-if="sec.IsPanel == false">
                <div class="w-full py-2" v-if="sec.Display" :class="{ ...sec.getClass() }">
                    <div :key="sec.Id">
                        <component :id="sec.Id" :is="controller.getComponent(sec)" :type="sec.SectionType"
                            v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                            v-on="{ ...sec.Events }" />
                    </div>

                </div>
            </div>
            <div v-else>
                <div class="w-full py-2" v-if="sec.Display">
                    <div class="text-center md:text-left flex align-items-center">
                        <div class="w-full" :key="sec.Id">
                            <STPanel toggleable :header="sec.Title">
                                <component :id="sec.Id" :is="controller.getComponent(sec)" :type="sec.SectionType"
                                    v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                                    v-on="{ ...sec.Events }" :key="sec.Id" />
                            </STPanel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(sec, index) in controller.pageView.value.EntitySections" :key="sec.Path" class="w-full">
            <div v-if="sec.IsPanel == false">
                <div class="w-full py-2" v-if="sec.Display" :key="sec.Id" :class="sec.getClass()">
                    <div class="text-center md:text-left flex align-items-center">
                        <component :id="sec.Id" :is="controller.getComponent(sec)" :type="sec.SectionType"
                            v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                            v-on="{ ...sec.Events }" />
                    </div>

                </div>
            </div>
            <div v-else>
                <div class="w-full py-2" v-if="sec.Display">
                    <div class="text-center md:text-left flex align-items-center">
                        <div class="w-full">
                            <STPanel toggleable :pt="{ headeractions: 'flex items-center' }">
                                <template #header key="header">
                                    <div class="flex items-center gap-2">
                                        <div class="w-[4px] h-[16px] bg-fonePrimaryMain"></div>
                                        <h4 class="font-bold">{{ t(sec.Title) }}</h4>
                                    </div>
                                </template>
                                <Message :closable="sec.Message.IsColse" :severity="sec.Message.SeverityColor"
                                    v-if="!!sec.Message.Text">
                                    <div v-html="sec.Message.Text"></div>
                                </Message>
                                <div :key="sec.Id">

                                    <component :id="sec.Id" :is="controller.getComponent(sec)"
                                        v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value"
                                        v-on="{ ...sec.Events }" @hook:mounted="() => console.log('mounted', sec.Id)" />
                                </div>
                                <template #icons v-if="sec.isFormEdit()">
                                    <div class="flex items-center gap-2">
                                        <div class="flex items-center gap-[4px] "
                                            v-if="controller.pageView.value.autoSaveForm && sec.isFormEdit()">
                                            <i class="pi pi-check !text-green-500 !font-black"
                                                v-show="pageStore.savingStatus == PageSavingType.SAVED"></i>
                                            <i class="pi pi-spin pi-spinner"
                                                v-show="pageStore.savingStatus == PageSavingType.SAVING"></i>
                                            <span class="text-h5 text-foneTextLevel2">{{ pageStore.savingStatusText
                                            }}</span>
                                        </div>
                                        <Button icon="pi pi-save" rounded text
                                            @click="() => { controller.saveEntitySection(sec); }" />
                                    </div>
                                </template>
                            </STPanel>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
