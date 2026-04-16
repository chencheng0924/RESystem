<script setup lang="ts">
import { UsrEntity } from "@/model/entity/UsrEntity";
import { Logincheck } from "@/service/Logincheck";
import { RecentListHistoryStore } from "@/stores/RecentList/RecentListHistoryStore";
import { useGuestToken } from "@/stores/tokenStore";
import { UPPreferenceStore } from "@/stores/userProfilePreference/UPPreferenceStore";
import { ref, onMounted, watch } from "vue"
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLangStore } from '@/stores/langStore';
import { EnvUtils } from "@/utils/envUtils";
// import { UsrService } from "@/service/entity/Usr.service";
import { TokenData, TokenService, UserData } from "@/service/TokenService";
import { PageBuilder } from "@/lib/pageBuilder/base/PageBuilder";
import { PageAction } from "@/lib/pageBuilder/core/PageAction";
import { useDialog } from 'primevue/usedialog';
import { UILayoutController } from "../Core/UILayoutController";
import { MenuStore } from "../Store/MenuStore";
import PopupMenu from "../CPopupMenus/PopupMenu.vue"
import { SidebarMenuItem } from "../CSidebarMenu/SidebarMenu.model";
// 接收父組件傳遞的收合狀態
const props = defineProps({
    isMenuCollapsed: {
        type: Boolean,
        default: true
    },
      controller: {
    type: UILayoutController,
  },
})

const { t, locale } = useI18n();
const route = useRoute()
const version = EnvUtils.getVersion()
let userStore = UPPreferenceStore()
let uEntity: UsrEntity = userStore.getUserEntity();
let activeTenant = ref({ key: '', value: '--' })
let tenantsList = null
const router = useRouter()
const name = ref(uEntity?.name);
const chatName = name.value?.[0] ?? ''
const langStore = useLangStore()
langStore.reloadSetLang()
// const userService = new UsrService();
const tokenSvc = new TokenService();
const menuStore = MenuStore()

onMounted(async () => {
  SetTenantInit()
})

const menuBtn=(e,item:SidebarMenuItem)=>{
   props.controller.template.eventMenuClick(e,item,router)  
}

const menuNewBtn=(e,item:SidebarMenuItem)=>{
  props.controller.template.eventMenuRightClick(e,item,router)  
}


const popupMenuRef = ref(null)
const toggle = (event) => {
    popupMenuRef.value.togglePopup(event)
}

const toggleEvent = (event) => {
    if (menuStore.isMenuCollapsed) {
        toggle(event)
    }
}

const SetTenantInit = async () => {
    let tokenEntity = await tokenSvc.getCurrentToken();
    let uData = tokenEntity.getUser();
    // let tenants = await userService.getAvailableTenants(uEntity?.id)
    // tenantsList = tenants
    // activeTenant.value = tenants?.find(x => x.key == uData?.tenant) ;
}


const fastChangeTenant = async (e) => {
    props.controller.template.openChangeTenant(activeTenant.value , tenantsList);

    toggle(e);
}


const actionfunction = (e) => {
    const a = { Id: "versionCenter" }
    let ac = new PageAction(a);
    //controller.pageView.value.SetEvent_PageToolbarAction(ac, null);
}


</script>
<template>
    <div class="py-[12px] px-[10px] shadow-[0_5px_15px_0_rgba(0,0,0,0.05)] border-t-[1.5px] border-foneBorder">
        <div class="flex" :class="{ 'justify-center': isMenuCollapsed, 'justify-between': !isMenuCollapsed }">
           <div class="flex gap-3 items-center" :class="{ 
                'justify-center': menuStore.isMenuCollapsed ,
                'pl-[8px]':! menuStore.isMenuCollapsed 
                }">
                <Avatar :label="chatName" shape="circle" @click="toggleEvent"
                    :class="{ 'cursor-pointer': menuStore.isMenuCollapsed }" />
                <span v-if="!menuStore.isMenuCollapsed"
                    class="w-[140px] text-body1 text-foneTextLevel1 overflow-ellipsis overflow-hidden">
                    {{ name }}
                </span>
            </div>
            <Button v-if="!menuStore.isMenuCollapsed" type="button" @click="toggle" icon="pi pi-ellipsis-v" text 
                v-tooltip="t('Layout.Sidebar.Setting')" severity="secondary">
            </Button>
               <PopupMenu ref="popupMenuRef" :menus="props.controller.template.getPopupMenuDatas()"
            :avatarLabel="chatName" :name="name" :activeTenant="activeTenant.value" :version="version"
            @eventActionBtn="menuBtn"
            @eventActionNewBtn="menuNewBtn"
            @eventChangeVersion="actionfunction($event)"
            @eventChangeTenant="fastChangeTenant($event)"
            ></PopupMenu>
        </div>

    </div>

</template>