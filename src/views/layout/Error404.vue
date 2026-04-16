<template>
  <div>
    <main>
        <div class="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
          <div class="flex items-center justify-center flex-col">
             <div class="text-400px text-primary pt-40">
                  <img src="@/assets/img/error/not-found.svg" width="400" height="400"/> 
              </div>
              <div><Button  @click="gohome">返回首頁</Button></div>


          </div>
       
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
const { t, locale } = useI18n()
import { onMounted } from 'vue';
onMounted(() => {
  const lang = sessionStorage.getItem('locale')
  if (lang) {
    locale.value = lang
  }
})
const router = useRouter()
const gohome=()=>{
router.push('/')
}

</script>
<style lang="scss" scoped>

</style>