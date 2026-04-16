<script setup lang="ts">
import { Handle, Position, useVueFlow, useNodeConnections } from "@vue-flow/core";
import { NodeToolbar } from '@vue-flow/node-toolbar'
import HandleTarget from "./HandleTarget.vue";
import HandleDots from "./HandleDots.vue";
import { ProcessStatus, STWorkflowAction } from './STWorkflow.model';
import { computed, toRef, ref } from "vue";

const emit = defineEmits(['eventToolbarAction', 'eventMouseMovein', 'eventMouseleave'])
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
  edit: {
    type: Boolean,
    defaut: true
  },
  graph: {
    type: Object,
  },
  selectItemId: {
    type: String,
  }
})

const isStartNode = toRef(() => props.data.nodeType == 1)
const isEndNode = toRef(() => props.data.nodeType == 2)
const status = toRef(() => props.data.status)
const bgColor = computed(() => {
  switch (status.value) {
    case ProcessStatus.ERROR:
      return '#f87171'
    case ProcessStatus.FINISHED:
      return '#42B983'
    case ProcessStatus.CANCELLED:
      return '#fbbf24'
    default:
      return 'var(--p-drawer-background)'
  }
})


const updateNodeData = (props, action, event) => {
  emit('eventToolbarAction', props, action)
}
const isConnected = computed(()=> props.graph.value.successors(props.id) ? props.graph.value.successors(props.id).length > 0 : true)
const eventMouseMovein = ()=> emit('eventMouseMovein')
const eventmouseleave = () => emit('eventMouseleave')
</script>

<template>
  <div
    @mouseenter="eventMouseMovein"
    @mouseleave="eventmouseleave"
  >

    <!-- <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
      <Button
        v-for="action of actions"
        :icon="action.Icon" type="button" rounded outlined
        class="!w-[18px] !h-[18px] !p-3 !border-0" :pt="{ root: 'hover:!border-[0px]' }"
        :class="{ selected: action === data.action }"
        :key="action.Id"
        @click="updateNodeData(props, action, $event)"
      >
      </Button>
    </NodeToolbar> -->
    <div v-if="props.id == props.selectItemId" data-type="NodeToolbarButton" class="flex absolute top-100 pt-1 justify-center w-full">
      <Button data-type="NodeToolbarButton" v-for="action of props.actions" :key="action.Id" :icon="action.Icon" type="button" rounded outlined
      class="!w-[18px] !h-[18px] !p-3 !border-0" size="small" :pt="{ root: 'hover:!border-[0px]' }"
      @click="updateNodeData(props, action, $event)"></Button>
    </div>
    <div
      class="w-[130px] bg-foneTextLevel3 flex items-center justify-center py-2 border border-[2px] rounded-[8px]"
      :style="{ 
        backgroundColor: bgColor, 
        boxShadow: status === ProcessStatus.RUNNING ? '0 0 10px rgba(0, 0, 0, 0.5)' : '' ,
        borderColor: props.id == props.selectItemId ? 'var(--p-button-primary-background)': '#aaa'
      }">
      <div v-if="status === ProcessStatus.RUNNING" class="spinner my-[0.45rem]" />
       <Avatar v-if="data.url != '' "  :image="data.url" class="mr-2" shape="circle" />
      <div> {{ data.label }}</div>
     
    </div>
  </div>

  <Handle type="target" class="handle" :position="Position.Left" v-if="!isStartNode">
    <HandleTarget />
  </Handle>

  <Handle class="handle" type="source" :position="Position.Right" v-if="!isEndNode">
    <HandleDots :isConnecting="props.data.connecting" :isConnected="isConnected" />
  </Handle>

</template>
<style scoped>
.handle {
  width: 12px;
  height: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 0;
  z-index: 1;
  background: transparent;
  border-radius: 0;
}


.spinner {
  border: 3px solid var(--fone-text-level2);
  border-top: 3px solid #2563eb;
  border-radius: 20%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
