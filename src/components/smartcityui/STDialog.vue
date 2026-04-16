<script setup lang="ts">
import { onMounted, onUnmounted,ref, watch } from 'vue';
import { DialogControllerViewStore, STDialogActions, STDialogContent } from './STDialog.model';
import { useI18n } from 'vue-i18n';
import PageFactoryContentLR from '@/lib/pageBuilder/components/PageFactoryContentLR.vue';
import { STAction } from './STCommon.model';
import { PageEventBus, PageEventEnum } from '@/lib/pageBuilder/mitt/PageEventBus';
import Icon from "@/components/Icon.vue"
import { DialogTitleItem } from '@/lib/pageBuilder/model/DialogTitleItem';

const { t, locale } = useI18n()
const props = defineProps({
    visible: {
        type: Boolean,
    },
    title: {
        type: String
    },
    dialogContent: {
        type: STDialogContent,
        default: new STDialogContent()
    },
    actions: {
        type: Array<STDialogActions>
    },
    mesage: {
        type: String
    },
    btnPostionStyle:{
        type:String,
        default:'justify-end'
    },
    isControllerView:{
        type: Boolean,
        default: false
    },
    controllerType:{
        type: String,
        default:''
    },
    controllerPKID:{
        type: String,
        default:''
    },
    isGoBack:{
        type: Boolean,
        default: false
    },
    SectionClass:{
         type: String,
         default:''
    }
})

const gobackValue= ref(props.isGoBack);
const titleValue = ref(props.title);

const emit = defineEmits(['actionItem' , 'gobackfunction'])

const actionItem = (item) => {
    emit('actionItem', item, props.dialogContent);
}

const closeFun = () => {
   emit('actionItem', new STAction({Type: 7,}), props.dialogContent);
}


let dialogpt = {
      content: ({ props, context }) => ({
        class: [
           '!px-[24px]',
        ]
      }),
       header:({ props, context }) => ({
        class: [
          '!h-[56px] !px-[20px] !py-[14px]',
          '!border-b-[1px] !border-foneBorder'
        ]
      }),
       title:({ props, context }) => ({
        class: [
          '!leading-[28px]'
        ]
      }),
      footer:({ props, context }) => ({
        class: [
          '!h-[64px] !px-[24px] !py-[12px]',
          '!border-t-[1px] !border-foneBorder',
        ]
      }),

    }
let cvDialogpt = {
      content: ({ props, context }) => ({
        class: [
          '!p-[0px]',
        ]
      }),
       header:({ props, context }) => ({
        class: [
          '!h-[56px] !px-[20px] !py-[14px]',
          '!border-b-[1px] !border-foneBorder',
        ]
      }),
       title:({ props, context }) => ({
        class: [
          '!leading-[28px]'
        ]
      }),
      footer:({ props, context }) => ({
        class: [
          '!h-[64px] !px-[24px] !py-[12px]',
          '!border-t-[1px] !border-foneBorder',
        ]
      }),
    }   
 
let footDialogBtn= {
      root: ({ props, context }) => ({
        class: [
           '!h-[40px] !text-[16px]  !leading-[24px]',
        ]
      }),
      
    }

let updateControllerView=(controller)=>{
    DialogControllerViewStore.setControllrt(controller)
}


const gobackfunction=(e)=>{
    let controller = DialogControllerViewStore.getController();
    console.log('controller',controller)
    controller?.pageView.value.SetEvent_DialogGoBack(e);

}

const eventFunction = (eventName, data) => {

  if (eventName == PageEventEnum.PageDialogUpdate) {
        let titleItem :DialogTitleItem = data as DialogTitleItem;
      console.log("event 收到")
      gobackValue.value=titleItem.isGoBack;
      titleValue.value = titleItem.Title;

    }
    
}

onMounted(async () => {  
    PageEventBus.getInstance.onMonitor(eventFunction);
})


onUnmounted(() => {
    PageEventBus.getInstance.offMonitor(eventFunction);
})



</script>

<template>
    <Dialog v-model:visible="props.visible" modal header="Edit Profile" 
    :pt="props.isControllerView==true ? cvDialogpt  : dialogpt"
    :closable="false" 
    class="min-w-[360px] min-h-[6rem] !bg-foneBgLevel2"
    >
        <template #header >
                 <div class="inline-flex items-center justify-center">
                     <Button v-if="gobackValue"
                     @click="gobackfunction($event)" text severity="secondary" class="!w-[18px] !h-[18px] !mr-[6px]"> 
                        <template #icon>
                        <Icon name="ic_arrow_left" custom-class="!w-[18px] !h-[18px] !text-foneTextLevel1"></Icon>
                        </template>
                    </Button>
                    <span class="font-bold whitespace-nowrap !text-[18px]">{{ t(titleValue) }}</span>
                </div>
                <div class="ml-auto">
                    <Button icon="pi pi-times" text rounded severity="secondary" @click="closeFun" class="!text-foneTextLevel1" />
                </div>        
        </template>
        <Message severity="error" v-if="!!props.mesage">{{ props.mesage }}</Message>

        <div v-if="props.isControllerView==false" :class="props.SectionClass"> 
            <component :id="props.dialogContent.Id" :is="{...props.dialogContent.Component}"  
                v-bind="{ ...props.dialogContent.Props, ...props.dialogContent.Attrs }"
                :model-value="props.dialogContent.value" v-on="{ ...props.dialogContent.Events }"  
                />
        </div>
        <div v-else :key="props.controllerPKID">
                <PageFactoryContentLR 
                :className="props.controllerType" 
                :pkid="props.controllerPKID"
                @update="updateControllerView"
                ></PageFactoryContentLR>
        </div>


        <template #footer v-if="props?.actions?.length > 0">
            <div class="flex justify-start"   v-for="(item, index) in props.actions">
                <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon" :pt="footDialogBtn"
                :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
               :key="index" :label="t(item.Text)" :class="item.class" />
            </div>
          
        </template>
    </Dialog>
</template>


<style>
/* .p-dialog-header {
    padding: 14px 20px 14px 20px !important;
    border-bottom: 1px solid !important;
    border-color: var(--fone-border) !important;
    
} */
</style>