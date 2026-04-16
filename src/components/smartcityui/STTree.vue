<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, PropType, Ref } from 'vue';
import { STTreeItem } from './STCommon.model';
import { STTreeAction } from './STTree.model';
import { STMenubarAction } from './STMenubar.model';
import { MenuItem } from 'primevue/menuitem';
import { DomEx } from '@/utils/domExtension';
import { useDialog } from 'primevue/usedialog';
import { SelectionMode } from '@vue-flow/core';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const props = defineProps({

    folderStyle: {
        type: String,
        default: 'height: 400px'
    },
    treeItems: {
        type: Array<STTreeItem>,
        default: []
    },
    treeActions: {
        type: Array<STTreeAction>,
        default: []
    },
    selectionKeys: {
        type: Object as PropType<Ref<any>>
    },
    contextActions: {
        type: Array<STTreeAction>,
        default: []
    },
    selectionTreeMode:{
        type: String as PropType<'single' | 'multiple' | 'checkbox'>,
        default: 'single'
    }
})

const exkeys = {};
let rootNodes = ref([]);
const selectedKey = ref(props.selectionKeys);//checkbox
const expandedKeys = ref({});
const menuActions: Array<STMenubarAction> = props.treeActions.map(x => new STMenubarAction(x));
const treeMode = props.selectionTreeMode

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
const emit = defineEmits(["eventTreeToolActionBtn",
    "eventNodeSelect", "eventActionBtn", "eventActionBtnByRow","onNodeUnselect"])


const onNodeSelect = (node) => {
    // emit('eventNodeSelect', new STTreeItem().toSTTreeItem(node))
    emit('eventNodeSelect', selectedKey)
}

const onNodeUnselect = (node) => {
    // console.log("onNodeUnselect", new STTreeItem().toSTTreeItem(node));
    emit('onNodeUnselect',selectedKey)
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

const openReName = (e) => {

}

</script>

<template>
    <div class="w-full">
        <div v-if="!!props.treeActions" class="w-full">
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
            <!-- {{rootNodes[0].label}} -->
            <Tree v-model:selectionKeys="selectedKey" :value="rootNodes" :selectionMode="treeMode"
                class="w-full md:w-[30rem] !pt-0" v-model:expandedKeys="expandedKeys" @nodeSelect="onNodeSelect"
                @contextmenu="onTreeRightClick($event)" @nodeUnselect="onNodeUnselect" @nodeExpand="onNodeExpand"
                @nodeCollapse="onNodeCollapse">
                <template #default="slotProps">
                    <div class="flex justify-start justify-items-center">
                        <div v-if="slotProps.node['preNodeValueByHtml']" class="pr-2"
                            v-html="slotProps.node['preNodeValueByHtml'](slotProps.node)"></div>
                        <div><b :data-Obj="`${JSON.stringify(slotProps.node.data)}`">{{ t(slotProps.node.label)
                                }}</b></div>
                        <div v-if="slotProps.node['postNodeValueByHtml']" class="pl-2"
                            v-html="slotProps.node['postNodeValueByHtml'](slotProps.node)"></div>
                    </div>
                </template>
            </Tree>
        </div>
    </div>
</template>
