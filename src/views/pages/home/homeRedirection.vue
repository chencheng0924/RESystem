<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {LoginService } from '@/service/LoginService'
import { TokenService } from '@/service/TokenService';
const route = useRoute()
const router = useRouter();
const msg = ref("系統驗證中，請稍後...")

const getToken =  async ()=>{
  const loginSvc = new LoginService();
  let obj=route.query;
  let code:string = obj['code'] as string;
  let loginData = await loginSvc.loginToSSO(code)
  // const tokenSvc = new TokenService();
  // let t = await tokenSvc.getCurrentToken(route.query)
  // 轉跳

  if(loginData==null)
  {
    msg.value="登入驗證失敗，即將導轉至登入頁面...";
    setTimeout(()=>{
      // router.push("/login")
    },2000)
   
  }else{
    router.push("/")
  }
  console.log("loginData",loginData);
}

onMounted(async () => {
  await getToken();
  //router.push('/home')
});

</script>
<template>
     <div class="h-screen bg-white center">
              <div class="mx-auto max-w-[410px] pt-40">
                <img src="@/assets/img/wait.svg" alt="illustration">

                <div class="mt-7.5 text-center centerText">
				
                  <h2 class="mb-3 text-2xl font-bold text-black dark:text-white">
                   {{ msg }}
                  </h2>
                </div>
              </div>
    </div>
</template>