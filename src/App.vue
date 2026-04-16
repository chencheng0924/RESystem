

<script setup lang="ts">
import { TokenService } from './service/TokenService';
import { CountTime } from './utils/autoTrigger';
import { useRoute, useRouter } from 'vue-router';
import SvgSprite from '@/components/SvgSprite.vue';
import { onMounted, watch } from 'vue';
let tokenService = new TokenService()

let timer = new CountTime(1000*60 ,async ()=>{
  // test 
  console.log("auto timer")
  await tokenService.getCurrentToken();
})
const route = useRoute()
const filters=['Login','error404', 'demoClientForm', 'demoClientEvaluation']
function isFiltered(routeName: unknown, filters: string[]): boolean {
  return typeof routeName === 'string' && filters.includes(routeName)
}

watch(
  () => route.name,
  (newName) => {
    console.log('current route:', newName)

    if (isFiltered(newName, filters)) {
      console.log('⏹ stop timer (Login or error404)')
      timer?.stop()
    } else {
      console.log('▶️ start timer (normal route)')
      timer?.start()
    }
  },
  { immediate: true }
)

</script>

<template>
   <!-- SVG Sprite 必須放在最上層 -->
    <SvgSprite />
    
  <!-- @vue-skip -->
  <component :is="$route.meta.layout || 'div'">
    <router-view></router-view>
  </component>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>


<style>
.p-splitter{
  border: none !important;
  border-radius: 6px !important;
}

.p-splitter-gutter {
    padding-left: 2px;
    padding-right: 2px;
    background: var(--fone-bg) !important;
}
</style>