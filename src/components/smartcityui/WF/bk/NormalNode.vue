<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { STWorkflowAction } from '../STWorkflow.model';
import { NodeToolbar } from '@vue-flow/node-toolbar'

const emit = defineEmits(['eventToolbarAction'])


const props = defineProps({
    id: {
        type: String
    },
    data: {
        type: Object,
    },
    actions: {
        type: Array<STWorkflowAction>,
    },
    toolbarVisible: {
        type: Boolean,
        defaut: false
    },
    edit: {
        type: Boolean,
        defaut: true
    }
})

const updateNodeData = (props, action) => {
    emit('eventToolbarAction', props, action)
}

const getNodeColor = (node) => {

    if (node.nodeType == "3")
        return "!text-blue-600";
}

</script>

<template>
    <Handle id="target_left" type="target" :position="Position.Left" />
    <Handle id="target_top" type="target" :position="Position.Top" />
    <div v-if="props.edit">
        <NodeToolbar :is-visible="props.toolbarVisible" :position="Position.Bottom">
            <Button v-for="action of props.actions" :key="action.Id" type="button" :icon="action.Icon"
                severity="success" rounded outlined @click="updateNodeData(props, action)" :v-tooltip.top="action.Text">

            </Button>
        </NodeToolbar>
    </div>
    <div class="p-1" :class="getNodeColor(props.data)">{{ props.data.label }}</div>
    <Handle id="source_right" type="source" :position="Position.Right" />
    <Handle id="source_bottom" type="source" :position="Position.Bottom" />
</template>
