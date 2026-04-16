<script setup lang="ts">
import { ref } from 'vue';
import { STImageItem } from './STImageView.model';
import { ThemeSwitchController } from './STThemeMode.compsable';
import { STAction } from './STCommon.model';

const props = defineProps({
    images: {
        type: Array<STImageItem>,
       default: [],
    },
    disabled:{
        type:Boolean,
        default:false
    }
})

const imageRef = ref(props.images)

const emit = defineEmits(['eventDeleteImage'])
const deleteImage=(e,item)=>{

    imageRef.value = imageRef.value.filter(x=>x.UrlID != item.UrlID);
    emit('eventDeleteImage', e,item);
}

let themeController = new ThemeSwitchController(false);
let mode = themeController.getSearchEmptyImage();
let imgSearchEmpty = ref(mode)
</script>

<template>
   <div class="pt-3">
        <DataView :value="imageRef" layout="list" dataKey="id">
            <template #empty>
                <div class="flex justify-center h-24">
                    <img :src="imgSearchEmpty" width="84" height="84" />
                </div>
            </template>

            <template #list="slotProps">
                <div class="flex flex-col pt-3">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center px-3 pb-3 ">
                            <div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" 
                                :src="item.Url" :alt="item.Name" />
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start pl-3">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm"></span>
                                        <div class="text-lg font-medium mt-2">{{ item.Name }}</div>
                                    </div>
                                   
                                </div>
                                <div class="flex flex-col md:items-end">
                                    <div  v-if="props.disabled==false" >
                                        <Button size="small" severity="contrast" icon="pi pi-times"  text rounded  
                                        @click="($event)=>{ deleteImage($event,item)}"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>


        </DataView>

       
    </div>
</template>
