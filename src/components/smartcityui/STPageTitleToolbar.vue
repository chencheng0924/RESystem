<script setup lang="ts">
import { ref } from 'vue';
import { STPageTitleAction } from './STPageTitle.model';
import { MenuItem } from "primevue/menuitem";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Icon from "@/components/Icon.vue"
import { PrimeVueTagStyling} from '@/theme/ComponentTheme'
import { BaseKeyValue } from '@/lib/pageBuilder/model/BaseKeyValue';
import { PageLayoutStore } from '@/stores/PageLayout/PageLayoutStore';
import { PageSavingType } from '@/stores/PageLayout/PageSavingType';
import { STAction } from './STCommon.model';
const { t } = useI18n();
const pageStore = PageLayoutStore()
const emit = defineEmits(['action' ])


const router = useRouter()
const props = defineProps({
    title: {
        type: String,
    },
    actions: {
        type: Array<STPageTitleAction>,
            default:[]
    },
    isInfo: {
        type: Boolean,
        default: false
    },
    rightActions:{
         type: Array<STAction>,
            default:[]
    },
    status:{
        type:BaseKeyValue,
        default:null
    },
    isSaveActions:{
         type: Boolean,
        default: true
    }
})

const menus: Array<MenuItem> = props.actions.map(x => x.toMenuItem());
const home = ref({
    icon: 'pi pi-home',
    route: '/'
});

const setRouter = (item) => {
    if(item?.url == "goback"){
        router.back();
    }
    else if (item.url != null && item.url != "") {
        router.push(item.url)
    }
}
const getclass = (item) => {
    if (item.url != null && item.url != "") {
        return "text-foneTextLevel2";
    } else {
        return "text-foneTextLevel1 font-bold";
    }
}
const getLabel = (item) => {
    return t(item.label);
}

const actionItem = (   e,item  )=>{
  emit('action', e,item)
}

const getbtnClass=(attrs)=>{

    if(attrs=="contrast"){
         return `group-hover:text-foneTextWhite`
    }
    else{
        return ''
    }
   
}

const btnPt={
     root: ({ props }) => ({
        class: [
            '!px-[8px]'
        ]
    }),
}
const popoverPt ={
    content: () => ({
      class: [
          '!py-[8px] !px-[0px]'
        ]
    }),
}

const listboxRef = ref(null) // Popover 彈窗實例
const toggleValue=ref(false);// 記錄目前 Popover 是開 or 關
const currentSTListSelectItem =ref(null) // 目前值

const btnLeftIcon = ref('')
const btnRightIcon = ref('ic_arrow_down')
const btnText = ref('')

const currentListRef=ref([])
const setUpIcon=()=>{
        btnRightIcon.value = "ic_arrow_up";
    }
const setDownIcon=()=>{
      btnRightIcon.value = "ic_arrow_down";
    }
const toggle = (event,item:STAction) => {
    currentListRef.value = item.MenuBtns;
    if(toggleValue.value==false){
        setUpIcon();
        toggleValue.value = true
    }else{
        setDownIcon();
        toggleValue.value = false
    }
   
    currentSTListSelectItem.value = item
    listboxRef.value.toggle(event)
}
const changeSelect=(e ,item )=>{

    btnText.value = item.Text;
    btnLeftIcon.value = item.Icon;

    toggle(e,currentSTListSelectItem.value)
    emit('action', e,item)
}

</script>

<template>
    <div class="flex items-center">

        <div class="w-full h-full flex justify-between pr-4">
            <div class="flex items-end justify-end items-center">
                <Breadcrumb  :model="menus" class="p-0">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="text-primary font-semibold">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else href="javascript:void(0)" @click="setRouter(item)">
                            <span :class="getclass(item)">{{ getLabel(item) }}</span>
    
                        </a>
                    </template>
                    <template #separator>
                          <Icon name="ic_arrow_right" custom-class="!w-[18px] !h-[18px] !text-foneTextDisable"></Icon>    
                    </template>
                </Breadcrumb>
                <div class="flex justify-start items-center pl-[8px]" v-if="props.status != null">
                    <Tag  v-if="props.status.value == '草稿' "  severity="contrast" :value="props.status.value" :pt="PrimeVueTagStyling.contrastPt()"></Tag>
                    <Tag v-else  severity="success"  :value="props.status.value" :pt="PrimeVueTagStyling.successPt()" ></Tag>
                </div>
                <div v-if="props.isSaveActions">
                     <div class="flex items-center pl-[16px]">
                           <Icon name="ic_success" custom-class="!w-[20px] !h-[20px] !text-statusSuccess"  v-if="pageStore.savingStatus == PageSavingType.SAVED"></Icon>                       
                          <ProgressSpinner style="width: 16px; height: 16px" strokeWidth="8" fill="transparent" animationDuration="1.5s"
                            aria-label="Custom ProgressSpinner" v-if="pageStore.savingStatus == PageSavingType.SAVING" />
                          <span class="pl-[4px] text-h5 text-foneTextLevel2">{{ pageStore.savingStatusText }}</span>
                        </div>
                </div>
            </div>

            <div v-if="rightActions.length > 0" class="flex justify-start items-center space-x-[8px]">
                <div v-for="item in props.rightActions">
                    <div v-if="item.Type==25 ">
                        <div class="h-[32px] w-[1px] bg-foneBorder"></div>
                    </div>
                    <div v-else-if="item?.MenuBtns?.length > 0">
                        <Button @click="toggle($event,item)" :disabled="!item.Enable"
                        :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
                        :label="t(item.Text)" v-tooltip.top="item.Tooltip" class="group"
                        iconPos="right"  :pt="btnPt">
                            <div class="flex justify-start items-center space-x-[4px]">
                                 <div>
                                      <Icon :name="btnLeftIcon == '' ? item.Icon : btnLeftIcon" :class="['!w-[18px] !h-[18px]', getbtnClass(item.SeverityColor)]" ></Icon>
                                </div>
                                <div>{{t( btnText=='' ? item.Text : btnText)}}</div>
                                <div class="h-[18px] w-[1px] bg-foneBorder"></div>
                                <div>
                                     <Icon :name="btnRightIcon" :class="['!w-[18px] !h-[18px]', getbtnClass(item.SeverityColor)]" ></Icon>
                                </div>
                            </div>      
                        </Button>
                        
                    </div>
                    <div v-else>
                        <Button @click="actionItem($event , item)" :disabled="!item.Enable"
                        :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
                        :label="t(item.Text)" v-tooltip.top="item.Tooltip" class="group" :pt="btnPt">
                            <template #icon=>
                                <Icon :name="item.Icon" :class="['!w-[18px] !h-[18px]', getbtnClass(item.SeverityColor)]" ></Icon>
                            </template>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Popover class="no-arrow" ref="listboxRef" :pt="popoverPt">
        <div class="flex flex-col px-[8px]">
            <ul class="max-w-[226px] space-y-[4px]">
                <div  v-for="subItem in currentListRef" >
                    <li 
                    class="flex w-full px-[8px] py-[5px] text-foneTextLevel1 hover:bg-fonePrimaryBg group
                        hover:text-fonePrimaryMain rounded-[4px] cursor-pointer justify-start items-center" @click="changeSelect($event,subItem)">
                            <div >
                                 <Icon :name="subItem.Icon" :class="['!w-[18px] !h-[18px] group-hover:text-fonePrimaryMain']" ></Icon>
                            </div>
                            <div class="flex flex-col pl-[8px]">
                               <div class="text-[14px] leading-[22px] font-bold">{{t(subItem.Text)  }} </div>
                               <div class="text-[12px] leading-[18px] text-foneTextLevel2 line-clamp-2">{{t(subItem.Message)  }}</div>
                                
                            </div>
                    </li>
                </div>
            </ul>
        </div>
    </Popover>


</template>
