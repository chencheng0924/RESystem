<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SidebarMenuItem } from './SidebarMenu.model';
import { MenuStore } from '../Store/MenuStore';
import STIcon from '@/components/Icon.vue'
import { useI18n } from 'vue-i18n'
import { useRoute ,useRouter} from 'vue-router';
import { string } from 'zod';
const { t } = useI18n()

const menuStore = MenuStore()
const props = defineProps({
    menuItem:{
        type:SidebarMenuItem,
        default:null
    },
    customClass:{
      type:String,
      default:""
    },
    forceExpand:{
      type:Boolean,
      default:false
    },
    forcePopup:{
      type:Boolean,
      default:false
    }


})
const emit = defineEmits(["eventActionBtn","eventActionNewBtn"])
const eventClick = (event,item:SidebarMenuItem) => {
  // 記錄選種選單 key
  menuStore.menuSelected = item.key;

  

  // 判斷是否有子選單
  if(item.isChildren){
    
    // //只有在往下展選單時 才會有強制 popup 與關閉
    if(props.forcePopup==false){
    
      let Collapsed = getMenuCollapsed.value;
      if(Collapsed){
          menuRef.value.isChildrenPopup=true;
      }else{
        menuRef.value.isChildrenPopup=false;
      }
    }
   


    menuRef.value.isChildrenCollapsed=!menuRef.value.isChildrenCollapsed;
    menuRef.value.switchChildrenIcon();


    return ;
  }

  emit('eventActionBtn',event, item)

}
const eventNewClick = (event, item:SidebarMenuItem) => {

  event.stopPropagation();

  emit('eventActionNewBtn', event,item)
}
const eventCollapsedClick = (event, item:SidebarMenuItem) => {

  event.stopPropagation();
   // 判斷是否有子選單
  if(item.isChildren){

    menuRef.value.isChildrenCollapsed=!menuRef.value.isChildrenCollapsed;
    menuRef.value.switchChildrenIcon();

    return ;
  }


}



const menuRef=ref(new SidebarMenuItem(props.menuItem))
menuRef.value.currentSelectKey = menuStore.menuSelected;
menuRef.value.setActive();

const getMenuCollapsed=computed(()=>{
  return props.forceExpand ? !props.forceExpand: menuStore.isMenuCollapsed
});


watch(() =>  menuStore.isMenuCollapsed,
    (newValue, oldValue) => {
      if(props.forcePopup==false){
      
        let Collapsed =oldValue;
        if(!Collapsed){
            menuRef.value.isChildrenCollapsed=true;
        }else{
            menuRef.value.isChildrenPopup=false;
            menuRef.value.switchChildrenIcon();

        }
      }
   
  }
)




</script>
<template>
    <div v-if="menuRef.isGroupTitle==false">
      
        <div class="group" :class="[menuRef.getClass(getMenuCollapsed) , props.customClass]" @click="eventClick($event,menuRef)"
          v-tooltip.right="!getMenuCollapsed ? '' : t(menuRef.label)"  >

          <!-- Left ICON  -->
           <div v-if="menuRef.icon != null && menuRef.icon != ''" >
             <STIcon :name="menuRef.icon" customClass="!w-[18px] !h-[18px]" :class="['layout-menuitem-icon text-lg flex-shrink-0']" />
          
           </div>
         
          <!-- midden text -->
          <span 
            class="text-body2 whitespace-nowrap transition-opacity duration-150 flex-1 text-ellipsis overflow-hidden group-hover:!text-fonePrimaryMain group-hover:!font-bold"
            :class="{
              'opacity-0 w-0 !flex-none': getMenuCollapsed,
              'opacity-100': !getMenuCollapsed,
              '!text-fonePrimaryClick !font-bold':menuRef.isActive,
              '!text-foneTextLevel1 !font-normal':!menuRef.isActive
            }">
            {{ t(menuRef.label) }} 
          </span>

          <!-- Right ICON  -->
          <div v-if="menuRef.isCanAdd && (getMenuCollapsed==false)"   v-tooltip.top="menuRef.getAddTooltip()"  class="flex items-center" @click="eventNewClick($event,menuRef)"  >
            <STIcon name="ic_add" customClass="!w-[18px] !h-[18px]"
              :class="['layout-menuitem-icon text-lg flex-shrink-0', 'opacity-0 group-hover:!opacity-100 transition-opacity duration-200']" />
          
          </div>
           <!-- Has Children ICON  -->
          <div v-if="menuRef.isChildren  && (getMenuCollapsed==false)"   class="flex items-center" @click="eventCollapsedClick($event,menuRef)"  >
            <STIcon :name="menuRef.childrenIcon" customClass="!w-[18px] !h-[18px]"
              :class="['layout-menuitem-icon text-lg flex-shrink-0']" />
          
          </div>
        </div>
        <div v-if="menuRef.isChildrenCollapsed==false && menuRef.isChildren && menuRef.isChildrenPopup==false && getMenuCollapsed==false" >
          <!-- 子選單 -->
          <ul class="layout-menu">
              <li role="menuitem" class="flex flex-col mt-1" v-for="subMenu in menuRef.children" >
                  <SidebarMenu :menuItem="subMenu" customClass="!pl-[34px]"   @eventActionBtn="eventClick($event,subMenu)" ></SidebarMenu>
              </li>
          </ul> 

        </div>
        <div v-else-if="menuRef.isChildrenCollapsed==false && menuRef.isChildren && menuRef.isChildrenPopup==true" >
          <!-- 子選單 -->
          <div :class="['absolute bg-foneBgLevel2 p-[8px] rounded-[6px] z-[999] border-1 border-foneBorder',
                getMenuCollapsed ? 'ml-[45px] !mt-[-32px]' : 'ml-[228px] !mt-[-32px]'
              ]">
            <ul class="layout-menu">
                <li role="menuitem" class="flex flex-col mt-1" v-for="subMenu in menuRef.children" >
                    <SidebarMenu :menuItem="subMenu" customClass="" :forceExpand="true" 
                    @eventActionBtn="eventClick($event,subMenu)"
                    ></SidebarMenu>
                </li>
            </ul> 
          </div>
         
        </div>


    </div>
    <div v-else>
       <div v-if="!getMenuCollapsed && menuRef.label" :class="[
        'flex items-center hover:bg-fonePrimaryBg/50 rounded transition-colors',
        'px-[12px] py-[5px] gap-2',
        '!mt-[12px]'
       ]" >
          <span :class="[
            'text-body3 text-foneTextLevel2 whitespace-nowrap transition-opacity duration-150 flex-1 opacity-100'
          ]">{{ t(menuRef.label) }}</span>
        
        </div>
        <div v-else class="py-[8px] flex justify-center">
          <div class="h-[1px] w-[24px] bg-foneBorder my-2 "></div>
        </div>
    </div>

</template>