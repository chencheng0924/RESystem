<script setup lang="ts">
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { LoginController } from '@/composables/Login.controller.ts'
import { useI18n } from 'vue-i18n'
import InputMessage from '@/components/InputMessage.vue'
import ForgetPassword from '@/components/forgetPassword.vue'
import { EnvUtils } from '@/utils/envUtils';
import { RESystemStore } from '@/stores/RESystemStore/RESystemStore';
const resSystemStore = RESystemStore()
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const checked = ref(false);
const controller = new LoginController(t, locale, route, router)
const error = ref("")
const sccmName =  EnvUtils.getSysTitle();
const demoApiUrl = import.meta.env.VITE_DEMO_API_URL;

const login = async () => {
  checked.value = true;
  try {
    await fetch(`${demoApiUrl}/api/ez/login`, {
      // 替換成你的 API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ezMbId: controller.loginAccount.value.account,
        ezMbMinma: controller.loginAccount.value.password,
      }),
    }).then(response => response.json()).then(data => {
      if(data.message == "success"){
      console.log(data);
        resSystemStore.setToken(data.response.token)
        router.push('/demoHome')
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  } finally {
    checked.value = false;
  }
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    console.log('can login',controller.valueComplete.value)
    if(controller.valueComplete.value){
      login()
    }
  }
}

const links = ref([])

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)

  links.value = ( await controller.getOtherLoginLink())['data'];
  console.log(links.value );
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const updateInput = (v) => {
    //console.log(v);
    controller.checkValueComplete();
}

const loginFoxconnSSO=async ()=>{

  let url = controller.loginToCodeFlow();
  if(url != null || url != "")
  {
    error.value = ""
    checked.value = false;
    window.location.href=url;
    
  }
  else
  {
    checked.value = false;
    error.value = "登入失敗，無法用相信登入請改用帳號密碼登入"
  }

  
}

const keydownClick = (e) => {

  if(e.key == "Enter")
  {
    login();
  }

  console.log(e);
}


const inputGroupStyle = computed(() => ({
  root: {
    class: 'border-[#39393d] border-solid border-[1px]'
  }
}))

const inputGroupAddonStyle = computed(() => ({
  root: {
    class: '!bg-transparent !border-none'
  }
}))

const inputStyle = computed(() => ({
  root: {
    class: '!bg-transparent !border-none'
  }
}))

const rememberAccount = ref(false);


const isRemember = EnvUtils.getRemberTool();
const showPassword = ref(false)
function togglePasswordVisible() {
  showPassword.value = !showPassword.value
}


const loginLink=(item)=>
{
  if(item.url != "")
    window.location.href = item.url
}

</script>

<template>
  <div class="flex flex-col px-[10px]" v-if="!controller.showForgetPassword.value">
        <div class="flex justify-center items-center mb-4 ">
            <div class="flex justify-center items-center w-[60px] h-[60px]">
                <img src="@/assets/logo/logo.png" width="60px">
            </div>
            <div class="">
                <div class="text-center text-4xl font-bold text-white">{{ sccmName }}
                </div>
                <!-- <span class="text-center ext-muted-color text-xs">Supply Chain Management</span> -->
            </div>
        </div>
    <Fluid>
      <div class="flex">
        <div class="flex flex-col gap-4 w-full">
          <!-- <label for="account"
                    class="block text-surface-900 dark:text-surface-0 text-xl font-medium">帳號</label> -->
          <InputGroup :pt="inputGroupStyle" class="flex !items-center">
            <InputGroupAddon :pt="inputGroupAddonStyle">
              <img src="@/assets/img/icon/ic_account.svg" alt="">
              <!-- <i class="pi pi-user text-white/80"></i> -->
            </InputGroupAddon>
            <InputMessage v-model="controller.loginAccount.value.account" :placeHolder="'請輸入帳號'" id="account"
              @update:modelValue="(val) => { updateInput(val) }"
              :pt="inputStyle" />
            <img v-if="controller.loginAccount.value.account != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer mr-[12px] h-[18px]" @click="controller.loginAccount.value.account = ''">
          </InputGroup>

          <!-- <label for="pw" class="block text-surface-900 dark:text-surface-0 text-xl font-medium"
                    id="pw">密碼</label> -->

          <InputGroup :pt="inputGroupStyle" class="relative flex !items-center">
            <InputGroupAddon :pt="inputGroupAddonStyle">
              <img src="@/assets/img/icon/ic_password.svg" alt="">
              <!-- <i class="pi pi-lock text-white/80"></i> -->
            </InputGroupAddon>

            <InputText :type="showPassword ? 'text' : 'password'" v-model="controller.loginAccount.value.password"  fluid :feedback="false"
              :placeholder="'請輸入密碼'" @update:modelValue="(val) => { updateInput(val) }" :pt="inputStyle"  />
            <i :class="['pi',showPassword ? 'pi-eye-slash' : 'pi-eye','absolute top-1/2 -translate-y-1/2 cursor-pointer transition-all',controller.loginAccount.value.password !== '' ? 'right-10' : 'right-3']" style="color:#FFFFFF;z-index: 99;" @click="togglePasswordVisible"/>
            <img v-if="controller.loginAccount.value.password != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer mr-[12px] h-[18px]" @click="controller.loginAccount.value.password = ''">
          </InputGroup>

          <!-- <label for="captchaCode" class="block text-surface-900 dark:text-surface-0 text-xl font-medium"
                    id="pw">驗證碼</label> -->
          <!-- <InputGroup :pt="inputGroupStyle">
            <InputGroupAddon :pt="inputGroupAddonStyle">
              <img src="@/assets/img/icon/ic_code.svg" alt="">
            </InputGroupAddon>
            <InputMessage :maxlength="4" v-model="controller.loginAccount.value.captchaCode" :placeHolder="'請輸入驗證碼'" id="captchaCode"
              @update:modelValue="(val) => { updateInput(val) }" :pt="inputStyle" />
            <InputGroupAddon :pt="inputGroupAddonStyle">
              <div class="flex items-center gap-1">
                <img v-if="controller.loginAccount.value.captchaCode != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer  h-[18px]" @click="controller.loginAccount.value.captchaCode = ''">
                <div class="self-start cursor-pointer" @click="controller.getCaptchaImg()"><img
                    v-if="controller.loginCaptchaImg.value.image" class="h-[1.75rem] object-contain"
                    :src="`${controller.loginCaptchaImg.value.image}`" alt="captchaImg"></div>
                <img src="@/assets/img/icon/ic_refresh.svg" alt="" class="cursor-pointer" @click="controller.getCaptchaImg()">
              </div>
            </InputGroupAddon>
          </InputGroup> -->

          <div v-if="isRemember">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Checkbox v-model="rememberAccount" binary />
                 <label class="text-white/80 text-[14px]"  for="rememberme1">{{ t('Components.Login.Remember_Account') }}</label>
              </div>
              
              <!-- 
              <span @click="controller.toggleForgetPassword()" class="font-bold cursor-pointer text-fonePrimaryHover">{{ t('Components.Login.Forget_Password') }}</span>
             -->
            </div>
          </div>

  
          <!-- :disabled="!controller.valueComplete.value"  -->
          <Button :label="'登入'"
           @click="login" @keydown="keydownClick"  class="!bg-fonePrimaryMain h-[2rem]"/>

          <!-- <Button  :label="'SSO登入'" @click="loginFoxconnSSO" @keydown.enter="loginFoxconnSSO" /> -->
          <div class="w-full" v-if="checked">
            <ProgressBar mode="indeterminate" style="height: 2px"></ProgressBar>
          </div>
          <div class="w-full" v-if="error != ''">
            <Message severity="error" icon="pi pi-times-circle">{{ error }}</Message>
          </div>
        </div>
      </div>
    </Fluid>
  </div>
  <ForgetPassword :step="controller.forgetPasswordStep.value" v-else @backToLogin="(val) => { controller.toggleForgetPassword(val) }" />
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1920px) {
    .backgroungImg {
        background-size: cover;
    }
}

@media screen and (max-width: 375px) {
    .backgroungImg {
        background-size: cover;
    }
}

:deep(.p-inputtext){
  border: none;
  background: transparent;
  color: white !important;
}

:deep(.p-inputtext:enabled:focus){
  box-shadow: none;
}

:deep(.p-checkbox-box){
  background: transparent;
  border: 1px solid #39393d;
}
</style>
