<script setup lang="ts">
import { STAction } from './STCommon.model';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const props = defineProps({
    title: {
        type: String,
         default:''
    },
     desc: {
        type: String,
         default:''
    },
     actions: {
        type: Array<STAction>,
        default:[]
    }
})
const emit = defineEmits(['eventActionBtn'
])
const actionItem = (item: STAction) => {
    emit('eventActionBtn', item)
}
</script>

<template>
    <div class="w-full h-screen rounded-[8px] flex flex-col items-center justify-start pt-[136px] bg-foneBgLevel1">
        <img src="@/assets/img/EmptyNew.png" alt="" width="84" >
        <div class="text-[24px] leading-[36px] font-bold pb-[4px]">
            {{ t(props.title) }}
        </div>
        <div class="text-[14px] leading-[22px] pb-[16px]">
            {{ t(props.desc) }}
        </div>
        <div v-if="props.actions.length > 0" class="flex justify-start gap-3">
           
            <div v-for="(item, index) in props.actions" :key="index">
                <Button @click="actionItem(item)" 
                    :icon="item.Icon" 
                    :severity="item.SeverityColor" 
                    :outlined="item.IsOutlined" 
                    :text="item.IsText"
                    :label="t(item.Text)" v-tooltip.top="item.Tooltip" ></Button>

            </div>
          
        </div>
    </div>
   
</template>
