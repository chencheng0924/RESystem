<template>
    <div class="w-full h-screen">
         <STPreview :html="htmlCode" :css="cssCode" :js="jsCode" />
    </div>
 
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import STPreview from './STPreview.vue'

const props = defineProps({
  data: {
   type:String
  },
 
})


const htmlCode = ref('<h1>Hello World</h1>')
const cssCode = ref('h1 { color: red; }')
const jsCode = ref('console.log("Hello from JS")')


const getHtmlCodeBlock=(text: string )=> {
        const pattern = /```html\n([\s\S]+?)\n```/;
        const match = text.match(pattern);
        return match ? match[1].trim() : text.trim();
    }
const getJSCodeBlock=(text: string)=> {
        const pattern = /```javascript\n([\s\S]+?)\n```/;
        const match = text.match(pattern);
        return match ? match[1].trim() : text.trim();
    }
const getCSSCodeBlock=(text: string)=> {
        const pattern = /```css\n([\s\S]+?)\n```/;
        const match = text.match(pattern);
        return match ? match[1].trim() : text.trim();
    }

onMounted(()=>{
    let text = props.data
    htmlCode.value =  getHtmlCodeBlock(text)
    cssCode.value =  getCSSCodeBlock(text)
    jsCode.value =  getJSCodeBlock(text)

    // console.log(htmlCode.value);
    // console.log(cssCode.value);
    // console.log(jsCode.value);

})


</script>
