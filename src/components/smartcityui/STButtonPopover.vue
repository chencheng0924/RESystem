<script setup lang="ts">
import { ref } from 'vue';
import { STMenubarAction } from './STMenubar.model';
import { STButtonPopoverStyle, STButtonPopover } from './STButtonPopover.model';
import { MenuItem } from 'primevue/menuitem';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
    actions: {
        type: Array<STMenubarAction>,
    }
})
const  popoverList= ref(null)
const confirmDeletePopover = ref(null)
const currentSelectItem = ref<MenuItem>(null);



//-----------------------------------------------

const emit = defineEmits(["eventActionBtn","eventActionSubBtn"])
const actionBtn=(e,item:STMenubarAction)=>{
    currentSelectItem.value = item.toMenuItem();

    if(currentSelectItem.value.items != null && currentSelectItem.value.items.length > 0)
    {
        popoverList.value.toggle(e);
        return ;
    }
    
    emit("eventActionBtn",e,item)
}
const actionSubBtn=(e,item:MenuItem, btnItem:any)=>{
    (btnItem as STMenubarAction).Text = item.Text;
    if(item.key == 'delete'){
        confirmDeletePopover.value.toggle(e);
        setDeleteItem(e, item, btnItem, currentSelectItem.value)
    } else {
        emit("eventActionSubBtn",e, currentSelectItem.value , item)
        popoverList.value.toggle(e);
    }
}

const deleteItem = ref(null)
const setDeleteItem = (e?:Event, item?:MenuItem, btnItem?:any, currentSelectItem?:MenuItem) =>{
    deleteItem.value = {
        e:e,
        item:item,
        btnItem:btnItem,
        currentSelectItem:currentSelectItem.value
    }
}
const handleDeleteItem = () =>{
    (deleteItem.value.btnItem as STMenubarAction).Text = deleteItem.value.item.Text;
    emit("eventActionSubBtn",deleteItem.value.e, deleteItem.value.currentSelectItem , deleteItem.value.item)
    popoverList.value.toggle(deleteItem.value.e);
    confirmDeletePopover.value.toggle(false);
    deleteItem.value = null;
}

const btnText = ref()

const style = new STButtonPopoverStyle();
const controller = new STButtonPopover(emit, t, props);
</script>

<template>
   <div class="flex gap-[8px]">
    <Button v-for="(item, idx) in controller.convertActions()" :key="idx"  @click="actionBtn($event,item)" 
    :disabled="!item.Enable" :icon="item.Icon"
    :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
    :label="item.Text" v-tooltip.top="item.Tooltip" :iconPos="item.IconPos" :class="item.ClassName">
        <slot name="content"/>
        <template #icon v-if="!!item?.Url">
            <img :src="`${item?.Url}`.getIcon('svg')" alt="button icon">
        </template>
    </Button>
    <Popover ref="popoverList" :pt="style.getPopoverStyleOption()">
        <div class="p-[8px] flex flex-col gap-[4px]">
            <div v-for="(subitem, subidx) in currentSelectItem.items" :key="subidx"
            @click="actionSubBtn($event, subitem , currentSelectItem )"
            class="flex gap-[8px] p-[8px] hover:bg-commPrimaryBg rounded-[4px] cursor-pointer">
            <img v-if="!!subitem.url" :src="subitem.url.getIcon('svg')" >
            <i v-if="!!subitem.icon" :class="subitem.icon" ></i>
            <span class="text-body2 text-commTextLevel1">{{ subitem.label }}</span>
            </div>
        </div>
    </Popover>
    <Popover ref="confirmDeletePopover" :pt="style.getConfirmDeletePopoverStyleOption()">
        <div class="p-[8px] flex flex-col gap-[12px]">
            <div class="text-body2 text-commTextLevel1 font-bold">{{ t('Components.STCardTitle.Delete_Confirm') }}</div>
            <div class="flex gap-[8px] justify-end">
                <div class="w-[4.5rem] h-[2rem] flex justify-center items-center text-[12px] text-foneTextLevel1 bg-foneBgLevel1 border-foneBorder border-solid border-[1px] px-2 rounded-[4px] cursor-pointer" @click="confirmDeletePopover.toggle(false)">{{ t('Components.STCardTitle.Delete_Cancel_Button') }}</div>
                <div class="w-[4.5rem] h-[2rem] flex justify-center items-center text-[12px] text-foneBgLevel1 bg-foneThemeRed px-2 rounded-[4px] cursor-pointer" @click="handleDeleteItem">{{ t('Components.STCardTitle.Delete_Confirm_Button') }}</div>
            </div>
        </div>
    </Popover>
   </div>

</template>
