<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
	isConnecting: {
		type: Boolean,
		default: false
	},
	isConnected: {
		type: Boolean,
		default: false
	},
})
const emit = defineEmits(['add'])
const isHovered = ref(false);
const isHandlePlusVisible = computed(()=>!props.isConnecting || isHovered.value)

function onMouseEnter() {
	isHovered.value = true;
}

function onMouseLeave() {
	isHovered.value = false;
}

</script>

<template>
	<div class="flex items-center translate-x-[50%] ml-[-12px] source" style="pointer-events: all;">
		<div :class="[$style.dot, 'source']" />
		<Transition name="canvas-node-handle">
			<svg :class="[$style.tail, 'source']" viewBox="0 0 70 24" 
				v-if="!props.isConnected" 
				v-show="isHandlePlusVisible"
				@mouseenter="onMouseEnter"
				@mouseleave="onMouseLeave"
			>
				<line class="line source" x1="0" y1="12" x2="47" y2="12" stroke-width="2"></line>
				<g class="plus clickable source" transform="translate(46, 0)">
					<rect class="clickable source" x="2" y="2" width="20" height="20" stroke-width="2" rx="4" fill="none"></rect>
					<path class="clickable source"  stroke="none" d="m16.40655,10.89837l-3.30491,0l0,-3.30491c0,-0.40555 -0.32889,-0.73443 -0.73443,-0.73443l-0.73443,0c-0.40554,0 -0.73442,0.32888 -0.73442,0.73443l0,3.30491l-3.30491,0c-0.40555,0 -0.73443,0.32888 -0.73443,0.73442l0,0.73443c0,0.40554 0.32888,0.73443 0.73443,0.73443l3.30491,0l0,3.30491c0,0.40554 0.32888,0.73442 0.73442,0.73442l0.73443,0c0.40554,0 0.73443,-0.32888 0.73443,-0.73442l0,-3.30491l3.30491,0c0.40554,0 0.73442,-0.32889 0.73442,-0.73443l0,-0.73443c0,-0.40554 -0.32888,-0.73442 -0.73442,-0.73442z"></path>
				</g>
			</svg>
		</Transition>
	</div>

</template>

<style lang="scss" module>
.line{
	width: 6px;
	height: 12px;
	background: var(--fone-text-level2);
}
.tail{
	width: 50px; height: 24px;
	fill: var(--fone-text-level2); 
	stroke: var(--fone-text-level2);    
	&:hover{
		fill: var(--fone-primary-main);
		stroke: var(--fone-primary-main);
	}
}
.dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: var(--fone-text-level2);
	// &:hover {
	// 	background: grey;
	// }
}


</style>

<style lang="scss">
.canvas-node-handle-enter-active,
.canvas-node-handle-leave-active {
	transform-origin: 0 center;
	transition-property: transform, opacity;
	transition-duration: 0.2s;
	transition-timing-function: ease;
}

.canvas-node-handle-enter-from,
.canvas-node-handle-leave-to {
	transform: scale(0);
	opacity: 0;
}
</style>