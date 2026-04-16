<script lang="ts" setup>
import { ref } from 'vue';
import { STCardItem, STCardItemType } from './STCardCustom.model'
import { STIconButtonProps } from './STIconButton.model'
import { UseSTCardCustom } from './STCardCustom.composable'
import { useI18n } from 'vue-i18n'
import { ThemeSwitchController } from './STThemeMode.compsable';
import Icon from "@/components/Icon.vue"
import { STAction } from './STCommon.model';
import { PrimeVueTagStyling} from '@/theme/ComponentTheme'
const { t } = useI18n()
const props = defineProps<{
  props?: STCardItem,
  cardWrapperClass?: string,
  cardContentClass?: string
}>()
const emit = defineEmits<{
  'click': [val: STCardItem],
  'eventRatingUpdate': [val: STCardItem],
  'eventDeleteCard': [val: STCardItem]
}>()
const controller = new UseSTCardCustom(emit, props.props)
const click = (card: STCardItem) => {
  emit('click', card)
}

const cardEl = ref<HTMLDivElement | null>(null)
defineExpose({ cardEl })

let themeController = new ThemeSwitchController(false);
let mode = ref(themeController.getModeString()) ;

const contrastPt= {
    root: ({ props, context }) => ({
        class: [
           '!bg-foneBg !border-foneBorder !border-[1px] !rounded-[2px]'
        ]
    }),
    label:({ props, context }) => ({
        class: [
           '!text-[12px] !leading-[18px] !text-foneTextLevel2 font-normal'
        ]
    }),
}

const successPt= {
    root: ({ props, context }) => ({
        class: [
          {
          '!bg-[#E3F9E9] !border-[#71CBA2] !border-[1px] !rounded-[2px]':mode.value=='light',
          '!bg-[#2B2E2C] !border-[#71CBA2] !border-[1px] !rounded-[2px]':mode.value=='dark',
          }
           
        ]
    }),
    label:({ props, context }) => ({
        class: [
          {
          '!text-[12px] !leading-[18px] !text-[#00A459] font-normal':mode.value=='light',
          '!text-[12px] !leading-[18px] !text-[#71CBA2] font-normal':mode.value=='dark',
          }
           
        ]
    }),
}


const listboxRef = ref(null) // Popover 彈窗實例
const toggle = (event) => {
  event.stopPropagation();
  

  listboxRef.value.toggle(event)
}
const popoverStyle = () => {
  return {
    content: () => ({
      class: [
          '!py-[8px] !px-[0px]'
        ]
    }),
  }
}
const editActions=[
  new STAction({ Text: "Components.STTable.Edit" , Id:"Edit" , Icon:"ic_edit"}),
   new STAction({ Text:"Components.STTable.Delete" , Id:"Delete", Icon:"ic_trash"}),
  
]

const changeSelect=(e,item)=>{
   listboxRef.value.toggle(e)

   if(item.Id=="Delete"){
    controller.deleteCard();
   }
   else{
    click(controller.props.value)
   }


}

</script>
<template>
  <!-- LR -->
  <div v-if="props.props?.layoutType == STCardItemType.LR"
    class="h-[100px] bg-foneHomeCard flex justify-between gap-[8px] items-center px-[24px] rounded-[8px] hover:bg-fonePrimaryClick group cursor-pointer"
    @click="click(props.props)" :class="props.cardWrapperClass">
    <div class="flex flex-col">
      <span class="text-h3 text-foneTextWhite line-clamp-1">{{ t(props.props.title) }}</span>
      <div class="hidden group-hover:!flex">
        <div class="gap-[4px] items-center text-foneTextWhite text-h5 py-[5px] flex">
          {{ t('Home.View') }}
          <img :src="'ic_right'.getIcon('svg')" alt="arrow">
        </div>
      </div>
    </div>
    <img :src="`${props.props.icon}`.getImgPath()" alt="cube" class="object-contain">
  </div>

  <!-- TLRB -->
  <div v-if="props.props?.layoutType == STCardItemType.TLRB"
    class="h-[86px] flex flex-col gap-[8px] p-[16px] rounded-[8px] bg-foneBgLevel1 border-solid border-[1px] border-transparent hover:!border-fonePrimaryClick cursor-pointer"
    @click="click(props.props)" :class="[props.cardWrapperClass, {'bg-fonePrimaryBg': props.props.isActive}]"
    ref="cardEl">
    <div class="flex justify-between items-center">
      <span class="text-h3 text-foneTextLevel1 line-clamp-1"
        :class="{ '!text-fonePrimaryClick': props.props.isActive }">{{ props.props.title }}</span>
      <img v-if="!!props.props?.icon" :src="`${props.props.icon}`.getIcon('svg')" :alt="props.props.icon">
    </div>
    <div class="w-full line-clamp-1 text-body3 text-foneTextLevel2" :class="props.cardContentClass">{{
      props.props.content }}</div>
    <div class="w-fill flex justify-between items-center"
      v-if="!!props.props.subIconL || !!props.props.subIconR || !!props.props.subContent">
      <div class="flex gap-[4px] items-center">
        <img :src="`${props.props.subIconL}`.getIcon('svg')" alt="card left icon" class="w-[16px] h-[16px]"
          v-if="!!props.props.subIconL">
        <span class="text-body4 text-foneTextLevel2" v-if="!!props.props.subContent">{{ props.props.subContent }}</span>
      </div>
      <img :src="`${props.props.subIconR}`.getIcon('svg')" alt="card right icon" v-if="!!props.props.subIconR">
      <Avatar v-if="!!props.props.subDesc" :label="props.props.subDesc" :size="'normal'" :shape="'circle'"
        class="!w-[16px] !h-[16px] !flex" style="background-color: #686EFF; font-weight: 700; font-size: 8px;" />
    </div>
  </div>

  <!-- IMG_WITH_FOOTER -->
  <div v-if="props.props?.layoutType == STCardItemType.IMG_WITH_FOOTER"
    :class="[props.cardWrapperClass, {'bg-fonePrimaryBg': props.props.isActive}]"
    class="w-full h-[200px] flex flex-col p-[16px] bg-foneBgLevel1 rounded-[8px] border-[1px] border-foneBorder justify-between hover:bg-fonePrimaryBg group">
    <div class="flex w-full gap-[16px] cursor-pointer grow" @click="click(controller.props.value)">
      <img :src="props.props.imgUrl" alt="card img" class="w-[60px] h-[60px] object-cover shrink-0" v-if="props.props.imgUrl != ''">
      <Avatar :label="props.props.title?.slice(0, 2).toLocaleUpperCase()" 
        style="font-size: 18px; font-weight: bold; color: white;" 
        :style="controller.avatarBg.value" 
        shape="circle" 
        class="!min-w-[48px] !h-[48px] !flex shrink-0 " v-else />
      <div class="flex flex-col gap-[8px] min-w-0 flex-1 ">
        <div class="flex flex-col gap-[4px] w-full overflow-hidden">
          <div class="text-h3 group-hover:text-fonePrimaryClick overflow-hidden text-ellipsis whitespace-nowrap">{{ props.props.title }}</div>
          <div class="text-body2 overflow-hidden text-ellipsis whitespace-nowrap">{{ props.props.subTitle }}</div>
        </div>
        <div class="line-clamp-2 break-all text-[#24C995]">{{ props.props.content }}</div>
      </div>
    </div>
    <div class="flex flex-col">
      <Divider align="left" type="solid"></Divider>
      <div class="flex justify-between">
        <!-- <div class="flex gap-[2px]">
          <STIconButton
            :props="new STIconButtonProps({ id: iconBtn.id, iconUrl: iconBtn.iconUrl, label: iconBtn.label })"
            v-for="(iconBtn, idx) in props.props.footerIconList" :key="'iconBtn' + idx" class="p-0" />
        </div> -->
     
        <Rating readonly   v-model="controller.props.value.ratingScore" @update:modelValue="controller.ratingUpdate" />
        <Button  icon="pi pi-trash" variant="text" severity="secondary" rounded
        @click="controller.deleteCard" id="cardDelete"  class="p-0" /> 
        <!-- <STIconButton @click="controller.deleteCard" :props="new STIconButtonProps({ id: 'delete', iconUrl: 'ic_trash'.getIcon('svg') })" class="p-0" /> -->
      </div>
    </div>
  </div>

  <!-- AGENT_CARD -->
  <div  v-if="props.props?.layoutType == STCardItemType.AGENT_CARD" class="group" >

            <div class="h-[136px] rounded-[8px] p-[16px]"
                :class="{
                    'group-hover:shadow-none group-hover:border-foneBorder group-hover:border-[1px] !bg-foneBg':mode=='dark',
                    'group-hover:shadow-[0px_4px_15px_0px_#626B7640] !bg-foneBg':mode=='light'
                }"
                @click="click(controller.props.value)"
            >
                <!--- header --->
                <div class="flex justify-between items-start group-hover:items-center">
                    <div>
                        <Avatar 
                        :image="'AgentDefault.png'.getImgPath()"
                      
                            style="font-size: 18px; font-weight: bold; color: white;" 
                            shape="circle" 
                            class="!min-w-[42px] !h-[42px]" />
                    </div>
                    <!--- text --->  
                    <div class="group-hover:hidden">
                        <div class="flex justify-start items-center">
                          <Tag v-if="props.props.content == '草稿' "  severity="contrast" :value="props.props.content" :pt="PrimeVueTagStyling.contrastPt()"></Tag>
                          <Tag v-else   severity="success"  :value="props.props.content" :pt="PrimeVueTagStyling.successPt()" ></Tag>
                        </div>
                    </div>
                    <!--- btn --->  
                    <div class="hidden group-hover:!block">
                      <div class="flex justify-start items-center">
                         <div class="cursor-pointer w-[64px] h-[32px] text-[14px] !font-bold leading-[22px] !text-fonePrimaryMain !bg-foneCardHoverbtnBackground flex justify-center items-center rounded-[4px]">
                          {{ t('Components.STCardCustom.View') }}
                        </div>
                        <div class="h-[20px] w-[1px] bg-foneBorder mx-[8px]"></div>
                        <div>
                            <Button  text  severity="secondary" class="!w-[32px] !h-[32px]" @click="toggle">
                            <template #icon>
                                <Icon name="ic_ellipsis" custom-class="text-fonePrimaryMain !w-[18px] !h-[18px]"></Icon>
                            </template>
                            </Button>
                        </div>
                      </div>
                       
                    </div>
                </div>  
                <!--- body --->
                <div class="text-[16px] font-bold mt-[8px] mb-[4px] leading-[24px] group-hover:text-fonePrimaryHover">{{ props.props.title  }}</div>
                <div class="text-[14px] leading-[22px] text-foneTextLevel2 line-clamp-2">{{ props.props.subTitle }}</div>
            </div>


  </div>

  <Popover class="no-arrow" ref="listboxRef" :pt="popoverStyle()">
    <div class="flex flex-col px-[8px]">
      <ul class="min-w-[100px] space-y-[4px]">
          <div  v-for="item in editActions" >
                <li  @click="changeSelect($event,item)"
              class="flex w-full px-[8px] py-[5px] text-foneTextLevel1 hover:bg-fonePrimaryBg text-[14px] leading-[22px] 
                  hover:text-fonePrimaryMain rounded-[4px] cursor-pointer justify-start items-center" >
                  <span class="pr-[4px]">
                     <Icon :name="item.Icon" custom-class="!w-[18px] !h-[18px]"></Icon>
                  </span>
                  <span>{{ t(item.Text) }}</span>
              </li>

          </div>
          
      </ul>
    </div>
         
  </Popover>

</template>

