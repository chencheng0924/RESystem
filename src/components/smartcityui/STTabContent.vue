<script setup lang="ts">
import { STTabAction } from './STTab.model';
import STTab from './STTab.vue';
import { PageSection } from '@/lib/pageBuilder/core/PageSection';
import { ComponentConvert } from '@/lib/pageBuilder/adapter/primevue.adapter';
const emit = defineEmits(['eventActionBtn'])
const props = defineProps({
    actions: {
        type: Array<STTabAction>,
    },
    activeId: {
        type: String,
    },
    section:{
        type:PageSection
    },
    tabListPt: {
        type: Object
    },
    tabPt: {
        type: Object
    }
})

const setAction = (item: STTabAction) => {
  
    emit('eventActionBtn', item)
}
</script>

<template>
   <div class="w-full">
      <STTab :actions="props.actions" :activeId="props.activeId" @eventActionBtn="setAction"
       :tabListPt="props.tabListPt" 
       :tabPt="props.tabPt"
       ></STTab>
      <component v-if="props.section"
      :id="props.section.Id" :is="{ ... ComponentConvert.getComponent(props.section) }"
                v-bind="{ ...props.section.Props, ...props.section.Attrs }" 
                :model-value="props.section.Props?.value"
                v-on="{ ...props.section.Events }" />
    </div>
</template>
