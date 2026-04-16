<script setup lang="ts">
import STTree from './STTree.vue';
import STForm from './STForm.vue';
import { STFormItem } from './STForm.model';
import { PropType, ref, Ref, watch } from 'vue';
import { STTreeItem } from './STCommon.model';
import { STTreeAction } from './STTree.model';
const props = defineProps({
    items: {
        type: Array<STFormItem>,
        default: [],
    },
    labelGap: {  // label與input的間距
        type: String,
        default: '4px'
    },
    itemGap: {
        type: String,  // form裡的間距
        default: '16px'
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

const selectedKey = ref(props.selectionKeys);//checkbox
const emit = defineEmits<{
    updateFormData: [val: any],
    eventTreeToolActionBtn: [val: any],
    eventNodeSelect: [val: any],
    eventActionBtn: [val: any],
    eventActionBtnByRow: [val: any],
    onNodeUnselect:[val: any]
}>()


const inputChange = (val) => {
  emit('updateFormData', val)
}
</script>

<template>
    <div class="w-full">
        <STForm @change="inputChange" :items="props.items"></STForm>
        <STTree 
            v-model:selectionKeys="selectedKey"
            :treeItems="props.treeItems" 
            :selectionTreeMode="props.selectionTreeMode"
            @event-tree-tool-action-btn="(item) => emit('eventTreeToolActionBtn', item)"
            @event-node-select="(item) => emit('eventNodeSelect', item)"
            @on-node-unselect="(item) => emit('onNodeUnselect',item)"
            @event-action-btn="(item) => emit('eventActionBtn', item)"
            @event-action-btn-by-row="(item) => emit('eventActionBtnByRow', item)">
        </STTree>
    </div>
</template>
