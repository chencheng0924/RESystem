
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Icon from "@/components/Icon.vue"
import { BaseKeyValue } from '@/lib/pageBuilder/model/BaseKeyValue';
import { STListSelectItem } from './STListSelect.model';
const { t, locale } = useI18n()

const emit = defineEmits(['change' ,'removeItem' ])

const props = defineProps({
    datas:{
        type:Array<STListSelectItem>,
        default:[]
    },
    selectAjax:{  // 右側選
        type:Function,
    },
})

const selectListRef = ref([]) // 下拉清單
const listDatasRef = ref(props.datas?.map(x=>new STListSelectItem(x)))

onMounted(()=>{

    if(listDatasRef.value.length ==0){
        listDatasRef.value=[ new STListSelectItem().setEmpty()]      
    }

    if(props.selectAjax != undefined && props.selectAjax != null){
         props.selectAjax().then((x) => {     
           selectListRef.value =x;          
        });
    }

})


const listboxRef = ref(null) // Popover 彈窗實例
const toggleValue=ref(false);// 記錄目前 Popover 是開 or 關
const currentSTListSelectItem =ref(null) // 目前值
const toggle = (event,item:STListSelectItem) => {
    if(toggleValue.value==false){
        item.setUpIcon();
        toggleValue.value = true
    }else{
        item.setDownIcon();
        toggleValue.value = false
    }
   
    currentSTListSelectItem.value = item
    listboxRef.value.toggle(event)
}
// 判斷是否選中
const PopoverActive = (itemkv)=>{
    if(itemkv.key == currentSTListSelectItem.value.EditorKeyValue?.key)
        return true;

    return false;
}

const changeSelect=(e ,item )=>{

    currentSTListSelectItem.value.EditorKeyValue = item; // 更新值
    let temp = listDatasRef.value.find(x=>x.NameKeyValue.key == currentSTListSelectItem.value.NameKeyValue.key);
    if(temp)
        temp.EditorKeyValue = item;// 更新值

    toggle(e,currentSTListSelectItem.value)
    emit('change', e,listDatasRef.value)
}

const removeItem =(e)=>{
   listDatasRef.value= listDatasRef.value.filter(x=>x.NameKeyValue.key != currentSTListSelectItem.value.NameKeyValue.key);
    toggle(e,currentSTListSelectItem.value)
    emit('removeItem', e, listDatasRef.value)
}
//------------------------------------------------------
// Style
//------------------------------------------------------
const avatarPt={
    root:()=>({
        class:[
            '!w-[24px] !h-[24px]',
            '!bg-[#00B6C0]'
        ]
    }),
     label: () => ({
      class: [
          '!text-[12px] !leading-[18px] !text-foneTextWhite'
        ]
    }),
}

const btnPt={
    root:()=>({
        class:[
            '!border-[0px] !h-24px',
        ]
    }),
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
const dividerPt={
    root:()=>({
        class:[
            '!py-[8px] !px-[0px] !my-[0px]',
        ]
    }),
}


</script>

<template>
    <div class="pt-[12px]">
        <div v-for="item in listDatasRef" class="flex justify-between items-center pb-[12px]">
                    <div class="flex justify-start items-center">
                        <Avatar :label="item.getAvatar()"  :pt="avatarPt"  shape="circle"  v-if="item.IsAvatar" />
                        <div class="ml-[8px] flex-1" :id="item.NameKeyValue.key">{{ item.NameKeyValue.value }}</div>
                    </div>
                    <!--- text --->  
                    <div v-if="item.IsShowListButton" class="h-[24px]" >
                       <Button :label="item.EditorKeyValue?.value ?? '' " 
                       iconPos="right" @click="toggle( $event,item)"   
                       severity="secondary" variant="text" :pt="btnPt">                        
                        <template #icon>
                            <div class="p-button-icon p-button-icon-right flex items-center">
                                 <Icon :name="item.ListButtonIcon" custom-class="!w-[14px] !h-[14px] !text-fonePrimaryMain !text-bold"></Icon>
                            </div>
                        </template>
                       </Button>
                    </div>

        </div>  

    </div>
    <Popover class="no-arrow" ref="listboxRef" :pt="popoverStyle()">
          <div class="flex flex-col px-[8px]">
            <ul class="min-w-[100px] space-y-[4px]">
                <div  v-for="item in selectListRef" >
                     <li v-if="PopoverActive(item)==false"
                    class="flex w-full px-[8px] py-[5px] text-foneTextLevel1 hover:bg-fonePrimaryBg text-[14px] leading-[22px] 
                        hover:text-fonePrimaryMain rounded-[4px] cursor-pointer justify-start items-center" @click="changeSelect($event,item)">
                        <span>{{ t(item.value) }}</span>
                    </li>
                     <li v-else
                    class="flex w-full px-[8px] py-[5px] bg-fonePrimaryBg  text-[14px] leading-[22px]
                        text-fonePrimaryMain rounded-[4px] cursor-pointer justify-start items-center" @click="changeSelect($event,item)">
                        <span>{{ t(item.value) }}</span>
                    </li>
                </div>
                
            </ul>
          </div>
          <Divider  :pt="dividerPt"/>
           <div class="flex flex-col px-[8px]">
            <ul class="space-y-[4px]">
                     <li 
                    class="flex w-full px-[8px] py-[5px] text-foneTextLevel1 hover:bg-fonePrimaryBg text-[14px] leading-[22px] 
                        hover:text-fonePrimaryMain rounded-[4px] cursor-pointer justify-start items-center" @click="removeItem($event)">
                        <span>{{ t('Components.STListSelect.removeItem') }}</span>
                    </li>
            </ul>
          </div>
    </Popover>
</template>
