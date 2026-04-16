<script setup lang="ts">
import { ref, } from 'vue'
import { VueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from "@vue-flow/controls";
import { STNode, STEdge, STWorkflowAction, STworkflowProps, STViewport } from './STWorkflow.model.ts'
import Node from './Node.vue'
import Edge from './Edge.vue'
import { WorkflowController } from './STWorkflow.composable.ts'

const emit = defineEmits(['eventToolbarAction', 'eventNodeToolbarAction', 
'eventEdgeToolbarAction', 'eventMessage', 'eventAutoSave',
'eventRunChat'])
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

const controller = new WorkflowController(props as STworkflowProps, emit)
const dark = ref(false)


const selectedMember = ref(null);
const members = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);
</script>

<template>
    <div>

    
    <div class="relative w-full h-[calc(100vh-240px)]" @drop="controller.onDrop">
        <VueFlow :class="{ dark }" class="basic-flow" :nodes="controller.nodes.value" :edges="controller.edges.value"
            :min-zoom="0" :max-zoom="3" snap-to-grid pan-on-scroll
            @dragover="(event)=>controller.onDragOver(event)" @dragleave="()=>controller.onDragLeave()"
            >
            <Background pattern-color="#aaa" :gap="16" />

			<div v-if="controller.isDragOver.value" class="absolute left-0 bottom-0 top-0 right-0 bg-[#00000024] flex items-center justify-center">
				<p>Drop here</p>
			</div>

            <template #node-normal="nodeProps">
                <Node :id="nodeProps.id" :data="controller.resetNodeData(nodeProps.data)" :actions="controller.nodeToolbars.value" :edit="edit"
                    :graph="controller.graph" :selectItemId="controller.selectItemId.value"
                    @eventToolbarAction="(props, action) => controller.eventNodeToolbarAction(props, action)" 
                    @eventMouseMovein="()=>controller.onNodemoveIn(nodeProps.id)"
                    @eventMouseleave="()=>controller.selectItemId.value = null"/>
            </template>

            <template #edge-custom="edgeProps">
                <Edge v-bind="edgeProps" marker-end="url(#custom-arrow-head)"
                    @add="(connection, event, id) => controller.onAddConnection(connection, event, id)"
                    @edit="(connection, id) => controller.onEditConnection(connection, id)"
                    @delete="(connection, id) => controller.onDeleteConnection(connection, id)" />
            </template>

            <Panel class="process-panel flex gap-2" position="bottom-center">
                <Button severity="contrast" icon="pi pi-sitemap" @click="()=>controller.onTidyup()"  v-tooltip.bottom="'置中'"  label="置中"/>
                <Button severity="contrast" v-for="action of props.actions" :icon="action.Icon"  v-tooltip.bottom="action.Text"
                    @click="controller.eventActionClick(action)"  :label="action.Text" />
                <Button severity="contrast" icon="pi pi-plus"  
                label="新增" v-tooltip.bottom="'新增'" 
                @click="controller.eventActionClick()" />
                <!-- 
                 <Button label="Stop" @click="controller.eventWorkflowProcess('stop')" v-if="controller.isRunning.value" />
                <Button label="Run Workflow" @click="controller.eventWorkflowProcess('run')" v-else />
                <Button label="Reset" @click="controller.eventWorkflowProcess('reset')" />
                 -->

              
               
            </Panel>
        </VueFlow>
    </div>
    <Drawer v-model:visible="controller.drawerVisible.value" 
    :modal="false" 
    position="right" 
    header="功能節點" 
    style="
    top: 68px;
   
    overflow: hidden;
  "
    :pt="{ root: { class: 'w-[280px]' }, mask: { class: 'pointer-events-none'} }">
        <div class="flex flex-wrap gap-2">
             <ul class="w-full list-none p-0 m-0 flex flex-col">
                <li v-for="node of controller.nodeTypeMapping.value" :key="node.Type"          
                class="w-full flex items-center px-2 py-2 hover:bg-fonePrimaryBg hover:text-fonePrimaryClick cursor-pointer rounded-border" 
                @click="()=>controller.createNode(node)"
                @dragstart="controller.onDragStart($event, node)" 
                
                >
                    
                    <Avatar v-if="node.hasUrl()"  :image="node.url" class="mr-2" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
                    <Avatar v-if="node.hasUrl()==false" :label="node.Text[0]" class="mr-2" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
                    <div >
                        <span class="w-full font-medium">{{ node.Text }}</span>
                        <!-- <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div> -->
                    </div>
                </li>
            </ul>
        </div>
    </Drawer>

   

    </div>
</template>
<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
@import "@vue-flow/controls/dist/style.css";
@import "@vue-flow/minimap/dist/style.css";

.basic-flow {
    width: 100%;
    height: 100%;
}

.clickable {
    cursor: pointer;
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
<style lang="scss">
/**
 * Nodes
 */

.vue-flow__node {

    &,
    &.draggable {
        cursor: pointer;
    }

    &.dragging {
        cursor: grabbing;
    }

    &:has(.sticky--active) {
        z-index: 1 !important;
    }
}

.vue-flow__nodes:has(.bring-to-front) {
    z-index: 2 !important;
}

/**
 * Edges
 */

.vue-flow__edges:has(.bring-to-front),
.vue-flow__edge-label.selected {
    z-index: 1 !important;
}
</style>