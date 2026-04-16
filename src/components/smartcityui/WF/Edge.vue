<script setup lang="ts">
import type { Connection, EdgeProps } from '@vue-flow/core';
import { MarkerType, BaseEdge, EdgeLabelRenderer, useNodesData, useVueFlow } from "@vue-flow/core";
import { getBezierPath, getSmoothStepPath, Position } from '@vue-flow/core';
import { computed, nextTick, ref, watch } from 'vue';
import { ProcessStatus } from './STWorkflow.model';

const EDGE_PADDING_BOTTOM = 60;
const EDGE_PADDING_X = 20;
const EDGE_BORDER_RADIUS = 16;
const HANDLE_SIZE = 20; // Required to avoid connection line glitching when initially interacting with the handle

const isRightOfSourceHandle = (sourceX: number, targetX: number) => sourceX - HANDLE_SIZE > targetX;

export type CanvasEdgeProps = EdgeProps ;

const props = defineProps<CanvasEdgeProps>();
const emit = defineEmits(['add', 'edit', 'delete'])
const nodesData = useNodesData(() => [props.target, props.source])
const targetNodeData = computed(() => nodesData.value[0].data)
const connection = computed<Connection>(() => ({
	source: props.source,
	target: props.target,
	sourceHandle: props.sourceHandleId,
	targetHandle: props.targetHandleId,
}));
const edgeColor = computed(() => {
	if(props.selected && targetNodeData.value.status == null) return 'pink'
  switch(targetNodeData.value.status) {
    case ProcessStatus.ERROR:
      return '#f87171'
    case ProcessStatus.FINISHED:
      return '#42B983'
    case ProcessStatus.CANCELLED:
    case ProcessStatus.SKIPPED:
      return '#fbbf24'
    case ProcessStatus.RUNNING:
      return '#2563eb'
    default:
      return '#cccccc'
  }
})
const edgeStyle = computed(() => ({
	strokeWidth: 2,
	stroke: edgeColor.value,
}));

const renderToolbar = computed(() => props.selected);
const renderData = computed(() => getEdgeRenderData(props));
const labelPosition = computed(() => renderData.value.labelPosition);
const segments = computed(() => renderData.value.segments);


const edgeToolbarStyle = computed(() => ({
	transform: `translate(-50%, -50%) translate(${labelPosition.value[0]}px, ${labelPosition.value[1]}px)`,
}));

const getEdgeRenderData = (props) =>{
	const { targetX, targetY, sourceX, sourceY, sourcePosition, targetPosition } = props;
	const isConnectorStraight = sourceY === targetY;

	if (!isRightOfSourceHandle(sourceX, targetX)) {
		const segment = getBezierPath(props);
    return {
        segments: [segment],
        labelPosition: [segment[1], segment[2]],
        isConnectorStraight,
      };
	}

	const firstSegmentTargetX = (sourceX + targetX) / 2;
	const firstSegmentTargetY = sourceY + EDGE_PADDING_BOTTOM;
	const firstSegment = getSmoothStepPath({
		sourceX,
		sourceY,
		targetX: firstSegmentTargetX,
		targetY: firstSegmentTargetY,
		sourcePosition,
		targetPosition: Position.Right,
		borderRadius: EDGE_BORDER_RADIUS,
		offset: EDGE_PADDING_X,
	});
	const secondSegment = getSmoothStepPath({
		sourceX: firstSegmentTargetX,
		sourceY: firstSegmentTargetY,
		targetX,
		targetY,
		sourcePosition: Position.Left,
		targetPosition,
		borderRadius: EDGE_BORDER_RADIUS,
		offset: EDGE_PADDING_X,
	});

	return {
		segments: [firstSegment, secondSegment],
		labelPosition: [firstSegmentTargetX, firstSegmentTargetY],
		isConnectorStraight,
	};
}

const onAdd = (event) => emit('add', connection.value, event, props.id);
const onEdit = () => emit('edit', connection.value, props.id);
const onDelete = () => emit('delete', connection.value, props.id);
// const path = computed(() => getSmoothStepPath(props))
</script>
<template>
  <g>
    <BaseEdge
      ref="edgeRef" 
      v-for="(segment, index) in segments"
      :id="`${id}-${index}`"
      :key="segment[0]"
      :style="edgeStyle"
      :marker-end="markerEnd"
      :path="segment[0]"
      :interaction-width="40"
    />
  </g>

	<EdgeLabelRenderer>
    <div
			:data-source-node-name="data.source?.node"
			:data-target-node-name="data.target?.node"
      :style="edgeToolbarStyle"
      :class="[{[$style.edgeLabelWrapper]: true, 'vue-flow__edge-label': true, selected: props.selected }]"
		>
			<div class="mb-2" v-if="data.label">{{ data.label }}</div>
			<div class="flex gap-1" v-if="renderToolbar">
        <Button class="!p-0 !w-[18px] !h-[18px] !bg-[var(--p-button-outlined-primary-hover-background)] !border-0 pointer-events-auto" icon="pi pi-plus" size="small" @click="onAdd" type="button" rounded outlined v-tooltip.bottom="'新增'"></Button>
        <Button class="!p-0 !w-[18px] !h-[18px] !bg-[var(--p-button-outlined-primary-hover-background)] !border-0 pointer-events-auto" icon="pi pi-file-edit" size="small" @click="onEdit" type="button" rounded outlined v-tooltip.bottom="'編輯'"></Button>
        <Button class="!p-0 !w-[18px] !h-[18px] !bg-[var(--p-button-outlined-primary-hover-background)] !border-0 pointer-events-auto" icon="pi pi-trash" size="small" @click="onDelete" type="button" rounded outlined v-tooltip.bottom="'刪除'"></Button>
      </div>
		</div>
  </EdgeLabelRenderer>
	<svg>
		<defs>
			<marker
				id="custom-arrow-head"
				viewBox="-10 -10 20 20"
				refX="0"
				refY="0"
				markerWidth="12.5"
				markerHeight="12.5"
				markerUnits="strokeWidth"
				orient="auto-start-reverse"
			>
				<polyline
					stroke-linecap="round"
					stroke-linejoin="round"
					points="-5,-4 0,0 -5,4 -5,-4"
					stroke-width="2"
					stroke="context-stroke"
					fill="context-stroke"
				/>
			</marker>
		</defs>
	</svg>

</template>


<style lang="scss" module>
.edge {
	transition:
		stroke 0.3s ease,
		fill 0.3s ease;
}

.edgeLabelWrapper {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>