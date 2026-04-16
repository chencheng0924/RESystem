<script setup lang="ts">
import { ref ,watch} from 'vue';
import PageFactoryContentLR from '@/lib/pageBuilder/components/PageFactoryContentLR.vue';
import { DrawerControllerViewStore, PageBuilder } from '@/lib/pageBuilder/base/PageBuilder';
import { PageAction } from '@/lib/pageBuilder/core/PageAction';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()

const props = defineProps({
    pageC:{
        type:PageBuilder,
        default:""
    },
    

})

let updateControllerView = (controller) => {
    DrawerControllerViewStore.setControllrt(controller)
}
const actionItem = async (item: PageAction) => {
    console.log(item)
    props.pageC.pageView.value = await props.pageC.pageView.value.DrawerView.CallAction(props.pageC.pageView.value, item);
}


const dw = ref('!w-full md:!w-80 lg:!w-[40rem]');
watch(() => props.pageC.pageView.value.DrawerView.Width,
    (newValue, oldValue) => {

        dw.value = `!w-full md:!w-80 lg:!w-[${newValue}]`;
    }
)

watch(() => props.pageC.pageView.value.DrawerView.IsControllerView,
    (newValue) => {
        if (newValue) {
            dw.value = '!w-full md:!w-[800px] lg:!w-[850px]';
        }
    },
    { immediate: true }
)
watch(() => props.pageC.pageView.value.DrawerVisibleRight,
    (newValue, oldValue) => {
        props.pageC.updateDrawerSection();
        // controller.updateView(controller.pageView.value);
    }
)
watch(() => props.pageC.pageView.value.DialogVisible,
    (newValue, oldValue) => {
        props.pageC.updateDialogSection();
    }
)
//--------------------------------------


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
}
</script>
<template>
    <Drawer :dismissible="props.pageC.pageView.value.DrawerView.IsDismissible"
            v-model:visible="props.pageC.pageView.value.DrawerVisibleRight"
            :modal="props.pageC.pageView.value.DrawerView.IsMode" :pt="props.pageC.pageView.value.DrawerView.Pt"
            :position="props.pageC.pageView.value.DrawerView.IsFullWidth ? 'full' : 'right'"
            :header="props.pageC.pageView.value.DrawerView.DrawerSection.Title" :class="dw">
            <template #header>
                <div class="w-full flex justify-between">
                    <div class="flex items-center gap-2">
                        <Tag  v-if="props.pageC.pageView.value.DrawerView.DrawerSection.Badge.Text != ''"
                        :severity="props.pageC.pageView.value.DrawerView.DrawerSection.Badge.SeverityColor"
                            :value="t(props.pageC.pageView.value.DrawerView.DrawerSection.Badge.Text)" />
                        <span class="font-bold text-2xl">{{ t(props.pageC.pageView.value.DrawerView.DrawerSection.Title)
                        }}</span>
                    </div>
                    <div>
                        <Button icon="pi pi-window-maximize" variant="text" rounded aria-label="Filter"
                            severity="secondary"
                            @click="() => { props.pageC.pageView.value.DrawerView.openFullScreen() }" />
                    </div>
                </div>
            </template>
            <Message severity="error" v-if="!!props.pageC.pageView.value.DrawerView.Message.Text">
                <div v-html="t(props.pageC.pageView.value.DrawerView.Message.Text)"></div>
            </Message>

            <div v-if="props.pageC.pageView.value.DrawerView.IsControllerView == false"
                :key="props.pageC.pageView.value.DrawerView.DrawerSection.Id">
                <component :key="props.pageC.pageView.value.DrawerView.UpdateKey"
                    :id="props.pageC.pageView.value.DrawerView.DrawerSection.Id"
                    :is="props.pageC.getComponent(props.pageC.pageView.value.DrawerView.DrawerSection)"
                    :type="props.pageC.pageView.value.DrawerView.DrawerSection.SectionType"
                    v-bind="{ ...props.pageC.pageView.value.DrawerView.DrawerSection.Props, ...props.pageC.pageView.value.DrawerView.DrawerSection.Attrs }"
                    :model-value="props.pageC.pageView.value.DrawerView.DrawerSection.Props?.value"
                    v-on="{ ...props.pageC.pageView.value.DrawerView.DrawerSection.Events }" />
            </div>
            <div v-else :key="props.pageC.pageView.value.DrawerView.EntityPKID">
                <PageFactoryContentLR :className="props.pageC.pageView.value.DrawerView.EntityType"
                    :pkid="props.pageC.pageView.value.DrawerView.EntityPKID" @update="updateControllerView">
                </PageFactoryContentLR>
            </div>
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon"
                        :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
                        v-for="(item, index) in props.pageC.pageView.value.DrawerView.DrawerSection.FormOps.CustomAction"
                        :key="index" :label="t(item.Text)" v-prevent-reclick="2000" />
                </div>
            </template>
        </Drawer>
</template>