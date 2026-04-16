<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { STUploadFileItem, STUploadFileManagementAction } from './STUploadFileManagement.model';
import STTable from './STTable.vue';
import STMenubar from './STMenubar.vue';
import { STMenubarAction } from './STMenubar.model';
import { STDataTableAction, STDataTableColumn } from './STTable.model';
import { STTreeItem } from './STCommon.model';
import { STTreeAction } from './STTree.model';
import { MenuItem } from 'primevue/menuitem';
import { DomEx } from '@/utils/domExtension';

const props = defineProps({
    item: {
        type: STUploadFileItem,
        default: new STUploadFileItem(),
    },
    folderStyle: {
        type: String,
        default: 'height: 400px'
    },
    treeItems: {
        type: Array<STTreeItem>,
        default: []
    },
    treeActions: {
        type: Array<STUploadFileManagementAction>,
        default: []
    },

    data: {
        type: Array<any>,
        default: []
    },
    columns: {
        type: Array<STDataTableColumn>,
        default: []
    },
    actions: {
        type: Array<STDataTableAction>,
        default: []
    },

    selectionKeys: {
        type: Object,
        default: {}
    },
    contextActions: {
        type: Array<STTreeAction>,
        default: []
    },
    edit: {
        type: Boolean,
        default: true
    }
})

const exkeys = {};
let rootNodes = ref([]);
const selectedKey = ref(props.selectionKeys);
const expandedKeys = ref({});
const menuActions: Array<STMenubarAction> = props.treeActions.map(x => new STMenubarAction(x));

// 展開---------------------------------
const expandAll = () => {
    for (let node of rootNodes.value) {
        expandNode(node);
    }
    expandedKeys.value = { ...expandedKeys.value };
};
const collapseAll = () => {
    expandedKeys.value = {};
};
const expandNode = (node) => {
    if (node.children && node.children.length) {
        expandedKeys.value[node.key] = true;

        for (let child of node.children) {
            expandNode(child);
        }
    }
};

// onMounted---------------------------------
onMounted(() => {
    if (props.treeItems != undefined && props.treeItems != null && props.treeItems.length > 0)
        rootNodes.value = props.treeItems.map(x => x.toPrimeVueTreeNode());

    // 預設全展
    expandAll();
})

// emit---------------------------------
const emit = defineEmits(['eventUploadAfter', "eventBeforeUpload", "eventRemove", "eventRemoveUploadedFile", "eventTreeToolActionBtn",
    "eventNodeSelect", "eventActionBtn", "eventActionBtnByRow"
    , "eventUploader", "eventBeforSend"
])

const tableActionItem = (item: STDataTableAction, sels) => {
    emit('eventActionBtn', item, sels)
}
const tableActioItemByRow = (item: STDataTableAction, data: any) => {
    emit('eventActionBtnByRow', item, data);
}

const uploadAfter = (e) => {

    emit('eventUploadAfter', e)
}

const beforeUpload = (e) => {
    emit('eventBeforeUpload', e)
}
const uploader = (e) => {

    console.log("uploader", e)
    emit('eventUploader', e)
}
const beforSend = (e) => {
    console.log("beforSend", e)
    emit('eventBeforSend', e)
}



const eventRemove = (e) => {
    console.log("eventRemove");
    emit('eventRemove', e)
}

const eventRemoveUploadedFile = (e) => {
    console.log("eventRemoveUploadedFile");
    emit('eventRemoveUploadedFile', e)
}


const onNodeSelect = (node) => {
    emit('eventNodeSelect', new STTreeItem().toSTTreeItem(node))
}

const onNodeUnselect = (node) => {
    //console.log("onNodeUnselect", new STTreeItem().toSTTreeItem(node));
};

const onNodeExpand = (node) => {
    console.log("onNodeExpand", node);
};

const onNodeCollapse = (node) => {
    console.log("onNodeCollapse", node);
};

const actionItem = (item) => {
    emit('eventTreeToolActionBtn', item)
}

// 右鍵選單
const menu = ref();
const contextMenuItems: Array<MenuItem> = props.contextActions.map(x => new STTreeAction(x).toMenuItem());
const contextMenuItemSelected = ref(null);
const onTreeRightClick = (event) => {
    if (menu == null)
        return;

    let target = event.target as HTMLElement;
    let nodeStr = "";
    if (target.dataset['obj'] == null) {
        let els = event.target?.children as Array<HTMLElement>;
        //console.log(event);
        let findNode = null;
        for (let i = 0; i < els.length; i++) {
            let one = els[i];
            if (one.className == "p-tree-node-label") {
                findNode = one;
                break;
            }

        }

        if (findNode == null || findNode == undefined)
            return;

        let element = DomEx.parseHTML(findNode.innerHTML);
        nodeStr = element.children[0]?.getAttribute("data-obj");
    } else {
        nodeStr = target.dataset['obj'];
    }

    menu.value?.show(event);
    try {

        contextMenuItemSelected.value = JSON.parse(nodeStr);
        //console.log(contextMenuItemSelected.value);
    }
    catch (e) {
        //console.log(e);
    }



};

const setAction = (e, item) => {

    emit('eventTreeToolActionBtn', item, [contextMenuItemSelected.value])
}

const menuPT = {
    itemContent: ({ props }) => ({
        class: [
            '!px-2 !py-2'
        ]
    }),
};


</script>

<template>
    <div>
        <div class="w-full py-2" v-if="props.edit">
            <FileUpload :id="props.item.Id" :name="props.item.Name" :url="`${props.item.Url}${props.item.UrlID}`"
                @upload="uploadAfter($event)" :multiple="props.item.UploadMultiple" :maxFileSize="props.item.Maxlength"
                @remove="eventRemove" @removeUploadedFile="eventRemoveUploadedFile" @uploader="uploader"
                @beforeSend="beforSend" @beforeUpload="beforeUpload" :customUpload="true">
                <template #empty>
                    <span>{{ props.item.Placeholder }}</span>
                </template>
            </FileUpload>
        </div>
        <div class="w-full py-2">
            <Splitter :style="props.folderStyle">
                <SplitterPanel class="flex flex-col" :size="25" :minSize="10">
                    <div v-if="!!props.treeActions" class="w-full pt-4 px-4">
                        <STMenubar :actions="menuActions" @eventActionBtn="actionItem"></STMenubar>
                    </div>

                    <div>
                        <ContextMenu ref="menu" :model="contextMenuItems" :pt="menuPT" v-if="contextActions.length > 0">
                            <template #item="{ item, props }">
                                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                        <span :class="item.icon" />
                                        <span class="ml-2">{{ item.label }}</span>
                                    </a>
                                </router-link>
                                <a v-else v-ripple href="javascript:void(0)" @click="setAction($event, item)">
                                    <span :class="item.icon" />
                                    <span class="ml-2">{{ item.label }}</span>
                                </a>
                            </template>
                        </ContextMenu>
                        <Tree v-model:selectionKeys="selectedKey" :value="rootNodes" selectionMode="single"
                            scrollHeight="400px" class="w-full md:w-[30rem]" v-model:expandedKeys="expandedKeys"
                            @nodeSelect="onNodeSelect" @nodeUnselect="onNodeUnselect" @nodeExpand="onNodeExpand"
                            @contextmenu="onTreeRightClick($event)" @nodeCollapse="onNodeCollapse">
                            <template #default="slotProps">
                                <div class="flex justify-start justify-items-center">
                                    <div v-if="slotProps.node['preNodeValueByHtml']" class="pr-2"
                                        v-html="slotProps.node['preNodeValueByHtml'](slotProps.node)"></div>
                                    <div><b :data-Obj="`${JSON.stringify(slotProps.node.data)}`">{{ slotProps.node.label
                                            }}</b></div>
                                    <div v-if="slotProps.node['postNodeValueByHtml']"
                                        class="pl-2 flex justify-start items-center gap-1"
                                        v-html="slotProps.node['postNodeValueByHtml'](slotProps.node)"></div>
                                </div>
                            </template>
                        </Tree>
                    </div>
                </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center" :size="75">

                    <STTable :data="props.data" :columns="props.columns" :actions="props.actions"
                        @eventActionBtn="tableActionItem" @eventActionBtnByRow="tableActioItemByRow"></STTable>

                </SplitterPanel>
            </Splitter>
        </div>
    </div>
</template>
