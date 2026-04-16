<script setup lang="ts">
import { defineComponent, PropType, onMounted, ref, computed, watch, nextTick } from "vue";
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

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const key = ref(0);
const toast = useToast();

const props = defineProps({
    pageLayout: {
        type: Object as PropType<PageViewLayout>,
        default: new PageViewLayout(),
        required: false
    },
    controllerName: {
        type: String,
        default: "Dashboard",
        required: false
    }
});

const emit = defineEmits(['submit', "change"])
let controller = new PageBuilder(t, locale, route, router, false);
controller.getInit(props.controllerName)

const actionItem = async (item: PageAction) => {
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

</script>


<template>
    <Toast>
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
        :header="controller.pageView.value.DrawerView.DrawerSection.Title" position="right" :class="dw">
        <template #header>
            <div class="flex items-center gap-2">
                <Tag :severity="controller.pageView.value.DrawerView.DrawerSection.Badge.SeverityColor"
                    :value="controller.pageView.value.DrawerView.DrawerSection.Badge.Text" />
                <span class="font-bold text-2xl">{{ controller.pageView.value.DrawerView.DrawerSection.Title }}</span>
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

    <div v-for="(sec, index) in controller.pageView.value.PageSections" :key="index" class="w-full grid grid-cols-1 !m-0">
        <div v-if="sec.IsPanel == false">
            <div class="w-full" v-if="sec.Display">
                <div class="">
                    <component :id="sec.Id" :is="{ ...sec.Component }" :type="sec.SectionType"
                        v-bind="{ ...sec.Props, ...sec.Attrs }" :model-value="sec.Props?.value" v-on="{ ...sec.Events }" />
                </div>

            </div>
        </div>
        <div v-else>
            <div class="w-full" v-if="sec.Display">
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

    <div class="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 pt-4 !m-0">
        <div v-for="(sec, index) in controller.pageView.value.EntitySections.filter(x => x.Display == true && x.RowIndex !=-1)"
            :key="sec.Id" class="w-full">

            <component :id="sec.Id" :is="controller.getComponent(sec)" 
            :type="sec.SectionType"
                v-bind="{ ...sec.Props, ...sec.Attrs }" 
                :model-value="sec.Props?.value" 
                v-on="{ ...sec.Events }" />
        </div>
    </div>

    <div class="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 py-4 !m-0">
        <div v-for="(sec, index) in controller.pageView.value.EntitySections.filter(x => x.Display == true && x.RowIndex ==-1)"
            :key="sec.Id" class="w-full">

            <component :id="sec.Id" :is="controller.getComponent(sec)" 
            :type="sec.SectionType"
                v-bind="{ ...sec.Props, ...sec.Attrs }" 
                :model-value="sec.Props?.value" 
                v-on="{ ...sec.Events }" />
        </div>
    </div>
</template>
