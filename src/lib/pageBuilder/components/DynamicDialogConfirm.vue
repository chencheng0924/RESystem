<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';

const props = defineProps({
    text: {
        type: String,
    }
})

const dialogRef = inject("dialogRef");
const selectProduct = (data) => {
    //dialogRef.value.close(data);
};

const data  = ref('AAa')

onMounted(()=>{
    data.value  =dialogRef['value'].data.text
})

</script>

<template>
    <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 pt-[20px]">                   
         <div  v-html="data"></div>
    </div>
</template>
