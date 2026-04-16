<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { STNode, STEdge, STWorkflowAction, STWorkflowActionEnum, STNodeTypeEnum, STworkflowProps, STViewport } from '../STWorkflow.model'
import NormalNode from './NormalNode.vue'
import CustomEdge from './CustomEdge.vue'
import { WorkflowController } from './STWorkflow.composable'


const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject, onEdgesChange, updateNode
} = useVueFlow()

const emit = defineEmits(['eventToolbarAction', 'eventNodeToolbarAction', 'eventEdgeToolbarAction'])
const props = defineProps({
    nodes: {
        type: Array<STNode>,
        default: []
    },
    edges: {
        type: Array<STEdge>,
        default: []
    },
    actions: {
        type: Array<STWorkflowAction>,
        default: []
    },
    edit: {
        type: Boolean,
        default: true
    },
    viewport: {
        type: STViewport,
        default: new STViewport()
    }
})
const controller = new WorkflowController(props as STworkflowProps);

const dark = ref(false)
onInit((vueFlowInstance) => {
    controller.wfInstance.value = vueFlowInstance;
    vueFlowInstance.fitView()
    vueFlowInstance.setViewport({ x: props.viewport.x, y: props.viewport.y, zoom: props.viewport.zoom })

})
onNodeDragStop(({ event, nodes, node }) => {
    //console.log('Node Drag Stop', { event, nodes, node })
    updateNode(node.id, { position: node.position })

    controller.updateNodePostion(node);

})
onConnect((connection) => {
    if (props.edit == false)
        return;
    addEdges(connection)
})

onEdgesChange((e) => {
    //console.log(e);
    if (e.length <= 0)
        return;
    let one = e[0];
    if (one.type == "add") {
        one.item.type = "custom";
    }
})


const actionItem = (item: STWorkflowAction) => {

    let isSave = controller.setToolbarActionItem(item);
    if (isSave == false)
        return;
    let wfObject = toObject();
    console.log(wfObject);
    emit('eventToolbarAction', item, wfObject)
}

const eventNodeToolbarAction = (props, action) => {
    let node = controller.setNodeToolbarAction(props, action);
    emit('eventNodeToolbarAction', node, action);//node =>props
}
const eventEdgeToolbarAction = (id, props) => {
    let edge = controller.setEdgeToolbarAction(id);
    console.log("id", id);
    console.log("edge", edge);
    emit('eventEdgeToolbarAction', edge);//node =>props
}

</script>

<template>
    <div class="w-full h-[500px]">
        <div v-if="!!props.actions" class="w-full">
            <STMenubar :actions="controller.toolbars.value" @eventActionBtn="actionItem"></STMenubar>
        </div>

        <VueFlow :nodes="controller.nodes.value" :edges="controller.edges.value" :class="{ dark }" class="basic-flow"
            :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4">
            <Background pattern-color="#aaa" :gap="16" />
            <template #node-normal="resizableNodeProps">
                <NormalNode :id="resizableNodeProps.id" :data="resizableNodeProps.data" :edit="controller.edit"
                    :actions="controller.nodeToolbars.value" :toolbarVisible="resizableNodeProps['toolbarVisible']"
                    @eventToolbarAction="eventNodeToolbarAction" />
            </template>
            <template #edge-custom="props">
                <CustomEdge v-bind="props" @eventEdit="eventEdgeToolbarAction" />
            </template>

            <!-- <MiniMap /> -->

        </VueFlow>
    </div>
</template>


<style>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.1/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.1/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

.basic-flow.dark {
    background: #2d3748;
    color: #fffffb
}

.basic-flow.dark .vue-flow__node {
    background: #4a5568;
    color: #fffffb
}

.basic-flow.dark .vue-flow__node.selected {
    background: #333;
    box-shadow: 0 0 0 2px #2563eb
}

.basic-flow .vue-flow__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center
}

.basic-flow.dark .vue-flow__controls {
    border: 1px solid #FFFFFB
}

.basic-flow .vue-flow__controls .vue-flow__controls-button {
    border: none;
    border-right: 1px solid #eee;
    width: 32px !important;
    height: 32px !important;
    font-size: 24px !important;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button span {
    font-size: 24px !important;

}

.basic-flow .vue-flow__controls .vue-flow__controls-button svg {
    height: 100%;
    width: 100%;
    max-width: 24px !important;
    max-height: 24px !important;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button {
    background: #333;
    fill: #fffffb;
    border: none
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button:hover {
    background: #4d4d4d
}

.basic-flow.dark .vue-flow__edge-textbg {
    fill: #292524
}

.basic-flow.dark .vue-flow__edge-text {
    fill: #fffffb
}


.vue-flow__node-normal {
    background: #fff;
    color: #1d1b1b;
    padding: 10px;
    border: 1px solid #1d1b1b;
    border-radius: 4px;
}

.vue-flow__node-normal.selected {

    border: 2px solid #2563eb;

}

.vue-flow__node-toolbar {
    display: flex;
    align-items: center;
    background: var(--p-menubar-background);
    border: 1px solid var(--p-menubar-border-color);
    border-radius: var(--p-menubar-border-radius);
    color: var(--p-menubar-color);
    padding: var(--p-menubar-padding);
    gap: var(--p-menubar-gap);
}

.vue-flow__node-toolbar button {

    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
}

.vue-flow__node-toolbar button.selected {
    background: #2563eb;
}

.vue-flow__node-toolbar button:hover {
    background: #2563eb;
}

.vue-flow__node-menu {
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.vue-flow__node-menu.selected {
    box-shadow: 0 0 0 2px #2563eb;
}
</style>