<script setup lang="ts">
import { ref ,watch} from 'vue';
import { SidebarMenuItem } from '../CSidebarMenu/SidebarMenu.model';
import SidebarMenu from '../CSidebarMenu/SidebarMenu.vue'
import STIcon from '@/components/Icon.vue'
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()

const props = defineProps({
    avatarLabel:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""
    },
    activeTenant:{
        type:String,
        default:""
    },
    menus:{
        type: Array<SidebarMenuItem>,
        default:[]
    },
    version:{
        type:String,
        default:""
    }
   

})
const emit = defineEmits(["eventActionBtn","eventActionNewBtn" ,"eventChangeTenant","eventChangeVersion"])

const menuBtn=(e,item:SidebarMenuItem)=>{
   emit('eventActionBtn',e,item)
    togglePopup(e)
}

const menuNewBtn=(e,item:SidebarMenuItem)=>{
  emit('eventActionNewBtn',e,item)
   togglePopup(e)
}
const changeVersion=(e)=>{
  emit('eventChangeVersion',e)
  togglePopup(e)
}



const op = ref(null)
const togglePopup = (event) => {
    op.value.toggle(event)
}
const tenantName = ref(props.activeTenant)
const changeTenant=(e)=>{
    emit('eventChangeTenant',e)
}

// 開方法出去
defineExpose({
  togglePopup
})



//--------------------------------------
watch(() => props.activeTenant,
    (newValue, oldValue) => {
        tenantName.value=newValue
    }
)

let pt = {
      content: ({ props, context }) => ({
        class: [
           '!px-[16px] !pt-[16px] !pb-[8px]',
        ]
      }),
    }


</script>
<template>
    <Popover ref="op" :pt="pt">
        <div class="flex items-center h-[62px]">
            <Avatar :label="props.avatarLabel" shape="circle" class="!h-[42px] !w-[42px]" />
            <div class="flex flex-col pl-[12px]">
                <span class="text-[16px] leading-[24px] text-foneTextLevel1 font-bold">{{ props.name }}</span>
                <span class="text-[14px] leading-[22px] cursor-pointer !text-fonePrimaryMain flex justify-start items-center"
                    @click="changeTenant($event)">
                    <span>
                        {{ tenantName }}
                    </span>
                       <STIcon name="ic_filter" customClass="!w-[18px] !h-[18px]"  class="pl-[4px]"/>
                </span>
            </div>
        </div>
        <div class="py-[8px] w-[270px]">

            <div class="mb-1">
                <nav>
                    <ul class="layout-menu">
                        <li role="menuitem" class="flex flex-col mt-1" v-for="menu in menus" >
                            <SidebarMenu :menuItem="menu" @event-action-btn="menuBtn" @event-action-new-btn="menuNewBtn" :forceExpand="true"></SidebarMenu>
                        </li>
                    </ul>   
                </nav>
            </div>

        </div>
        <div class="border-solid border-t-[1px] border-t-foneBorder py-[8px] text-foneTextLevel2 cursor-pointer flex items-center justify-center"
            @click="changeVersion($event)">
            <span>
                 {{ t('Dialog.VersionTitle') }} {{ version }} 
            </span>
             <STIcon name="ic_arrow_right" customClass="!w-[18px] !h-[18px]"  class="pl-[4px]"/>

        </div>
    </Popover>
</template>