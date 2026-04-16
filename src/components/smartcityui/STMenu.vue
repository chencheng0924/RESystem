<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { STMenuAction } from './STMenu.model';
import { MenuItem } from "primevue/menuitem";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Icon from '@/components/Icon.vue'

const { t } = useI18n();
const router = useRouter()
const emit = defineEmits(['eventActionBtn', 'dragStart'])
const props = defineProps({
    draggable: {
        type: Boolean,
        default: false
    },
    actions: {
        type: Array<STMenuAction>,
            default:[]
    }
})
const setAction = (e) => {
    //console.log('setAction',e)
    emit('eventActionBtn', e.item)
}

const menus: ComputedRef<Array<MenuItem>> = computed(()=>props.actions?.map(x => x.toSubMenuItems(setAction).toMenuItem(setAction)));

const pt = {
    root: ({ props }) => ({
        class: [
            // Spacing
            '!border-[0px]'
        ]
    }),
    rootList: ({ props }) => ({
        class: [
            // Spacing
            'flex space-x-5'
        ]
    }),
    submenuLabel: ({ props }) => ({
        class: [
            // Spacing
            '!px-[8px] !text-[12px] !leading-[18px] !text-foneTextLevel2 !font-normal !py-[5px] !mt-[12px]'
        ]
    }),
    item: ({ props }) => ({
        class: [
            // Spacing
            //'!py-[5px] !mb-[4px]'
        ]
    }),
    itemContent: (options) => ({
        class: [
            // Spacing
            '!py-[5px] !mb-[4px] !px-[8px] !w-[164px] !rounded-[4px]',
        ]
    }),
    itemLink: ({ props }) => ({
        class: [
            // Spacing
            '!p-[0px]'
        ]
    }),

};

const onDragStart = (event, item) => {  
    emit('dragStart', event, item)
}
const getLabel = (item) => {
    return t(item.label);
}


const tt= (e)=>{
    console.log("tt",e);
}
</script>

<template>
    <div class="w-full" v-if="menus.length > 0">
        <div class="px-[8px] ">
            <Menu :model="menus" :pt="pt" @focus="tt" >
                 <!-- <template #submenuitem="{ item }">
                    <span class="!mt-[12px]">{{ getLabel(item)  }}</span>
                </template> -->
                <template #item="{ item, props  }">                
                    <a v-ripple v-bind="props.action">
                         <Icon :name="item.icon"  v-if="item.icon != ''"  ></Icon>
                        <span class="leading-[22px]">{{ getLabel(item)  }}</span>  
                    </a>
                </template>

                
            </Menu>
        </div>
    </div>
</template>


<style lang="scss">
.p-focus {
     & span{
        font-weight:700 !important;
     }
     & svg{
        color: var(--fone-primary-main)
     }
}
</style>