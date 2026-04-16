<script setup lang="ts">
import { MenuItem } from 'primevue/menuitem';
import { STMenubarAction } from './STMenubar.model';
import { STTimeRangeItem } from './STTimeSelect.model';

const props = defineProps({
  timeRangeItems: {
    type: Array<STTimeRangeItem>,
    default: null,
  },
  rightActions: {
        type: Array<STMenubarAction>,
    }
})


const emit = defineEmits(["eventActionBtn","eventActionSubBtn","eventActionDate","eventUpdateCustomDate"])
const actionBtn=(e,item:STMenubarAction)=>{
    emit("eventActionBtn",e,item)
}
const actionSubBtn=(e, item:STMenubarAction ,subMenuitem:MenuItem)=>{

    emit("eventActionSubBtn",e,item,subMenuitem)
}



const actionDate=(e,items)=>{
   
  emit("eventActionDate",e,items)
}
const updateDatePicker=(items)=> {
     
  emit("eventUpdateCustomDate",items)
}


</script>

<template>
   
      <div class="flex items-center justify-between">
        <STTimeSelect :timeRangeItems="props.timeRangeItems" 
        @eventActionBtn="actionDate" @eventUpdateCustomDate="updateDatePicker"></STTimeSelect>
        <STButtonPopover :actions="rightActions" @eventActionBtn="actionBtn" @eventActionSubBtn="actionSubBtn"></STButtonPopover>
      </div>

</template>
