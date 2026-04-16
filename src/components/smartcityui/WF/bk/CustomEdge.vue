<script lang="ts" setup>
import type { EdgeProps, Position } from '@vue-flow/core'
import { EdgeLabelRenderer, getBezierPath, MarkerType, useVueFlow } from '@vue-flow/core'
import ButtonGroup from 'primevue/buttongroup';
import { computed, type CSSProperties } from 'vue'

interface CustomEdgeProps<T = any> extends EdgeProps<T> {
    id: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    sourcePosition: Position
    targetPosition: Position
    data: T
    markerEnd: string
    style?: CSSProperties

}
const emit = defineEmits(['eventEdit'])

const props = defineProps<CustomEdgeProps>()

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))

const me = MarkerType.Arrow;
const editOption = (id, node) => {
    emit('eventEdit', id, node)
}

</script>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<template>
    <path :id="id" :style="style" class="vue-flow__edge-path" :d="path[0]" :marker-end="me" />

    <EdgeLabelRenderer>
        <div :style="{
            pointerEvents: 'all',
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }" class="nodrag nopan">
            {{ props.data['label'] }}
            <button class="edgebutton" @click="removeEdges(id)" v-tooltip.top="'刪除'" v-if="props.data['edit'] ?? true">
                <span class="pi pi-times" />
            </button>
            <button class="edgebutton" @click="editOption(id, props)" v-tooltip.top="'編輯'"
                v-if="props.data['edit'] ?? true">
                <span class="pi pi-pencil" />
            </button>

        </div>
    </EdgeLabelRenderer>
</template>

<style>
.edgebutton {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    cursor: pointer;
}

.edgebutton:hover {
    box-shadow: 0 0 0 4px pink, 0 0 0 4px #f05f75;
}
</style>
