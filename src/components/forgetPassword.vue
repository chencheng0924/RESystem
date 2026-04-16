<template>
  <div class="w-[500px] flex flex-col px-20">
    <div class="flex flex-col gap-2 mb-[1.5rem]">
      <div class="text-[1.5rem] text-white/80 font-bold">{{ t(controller.title.value) }}</div>
      <div class="text-white/80">{{ t(controller.subTitle.value) }}</div>
      <div v-if="controller.hasSendEmail.value" class="font-bold text-h3 text-white/80">
        {{ t('Components.ForgetPassword.SendMailSuccess') }}
      </div>
    </div>
    <div v-if="controller.step.value == ForgetPasswordStep.Email" class="flex flex-col gap-4 w-full">
      <InputGroup :pt="inputGroupStyle">
        <InputGroupAddon :pt="inputGroupAddonStyle">
          <img src="@/assets/img/icon/ic_mail.svg" alt="">
        </InputGroupAddon>
        <InputMessage v-model="controller.resetPasswordData.value.email" :placeHolder="t('Components.ForgetPassword.Email')" id="account"
          @update:modelValue="(val) => { updateInput(val) }"
          :pt="inputStyle" />
        <img v-if="controller.resetPasswordData.value.email != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer mr-[12px]" @click="controller.resetPasswordData.value.email = ''">
      </InputGroup>
      <Button :disabled="!controller.checkEmail() || controller.isCountingDown.value" class="cursor-pointer flex items-center !bg-[#9E8EFF] !text-[#1D1D1E] !font-bold" 
           :class="{ '!text-white': controller.isCountingDown.value }"
           @click="controller.sendCaptchaCode()">
        {{ controller.isCountingDown.value ? t('Components.ForgetPassword.resendSeconds', {seconds: controller.countdownSeconds.value}) : t('Components.ForgetPassword.sendMail') }}
      </Button>
      <!-- <InputGroup :pt="inputGroupStyle">
        <InputGroupAddon :pt="inputGroupAddonStyle">
          <img src="@/assets/img/icon/ic_captchaCode.svg" alt="">
        </InputGroupAddon>
        <InputMessage v-model="controller.resetPasswordData.value.captchaCode" :placeHolder="t('Components.ForgetPassword.CaptchaCode')" id="account"
          @update:modelValue="(val) => { updateInput(val) }"
          :pt="inputStyle" />
        <img v-if="controller.resetPasswordData.value.captchaCode != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer mr-[12px]" @click="controller.resetPasswordData.value.captchaCode = ''">
        <Button :disabled="!controller.checkEmail() || controller.isCountingDown.value" class="cursor-pointer flex items-center bg-transparent !text-[#9E8EFF] px-3 font-bold !border-l-[1px] !border-solid !border-[#39393d]" 
             :class="{ '!text-white': controller.isCountingDown.value }"
             @click="controller.sendCaptchaCode()">
          {{ controller.isCountingDown.value ? t('Components.ForgetPassword.resendSeconds', {seconds: controller.countdownSeconds.value}) : t('Components.ForgetPassword.Send') }}
        </Button>
      </InputGroup> -->
      <!-- <Button :disabled="!controller.valueComplete.value" class="!bg-[#9E8EFF] !text-[#1D1D1E] !font-bold" :label="t('Components.ForgetPassword.confirm')"
          @click="controller.changeStep(ForgetPasswordStep.ResetPassword)" /> -->
    </div>
    <div v-if="controller.step.value == ForgetPasswordStep.ResetPassword" class="flex flex-col gap-4 w-full">
      <InputGroup :pt="inputGroupStyle">
        <InputGroupAddon :pt="inputGroupAddonStyle">
          <img src="@/assets/img/icon/ic_lock.svg" alt="">
        </InputGroupAddon>
        <Password v-model="controller.resetPasswordData.value.password" :toggleMask="true" fluid :feedback="false"
        :placeholder="t('Components.ForgetPassword.Password')" @update:modelValue="(val) => { updatePassword(val) }" :pt="inputStyle" />
        <img v-if="controller.resetPasswordData.value.password != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer mr-[12px]" @click="controller.resetPasswordData.value.password = ''">
      </InputGroup>
      <div class="text-white/80 text-[14px] flex flex-col gap-2">
        <div>{{ t('Components.ForgetPassword.passwordRules') }}</div>
        <div v-for="(item,index) in controller.passwordRules.value" class="flex items-center gap-1">
          <img v-if="!item.isComplete" src="@/assets/img/icon/ic_uncheck.svg" alt="">
          <img v-else src="@/assets/img/icon/ic_check.svg" alt="">
          <div>{{ item.title }}</div>
        </div>
      </div>
      <InputGroup :pt="inputGroupStyle">
        <InputGroupAddon :pt="inputGroupAddonStyle">
          <img src="@/assets/img/icon/ic_lock.svg" alt="">
        </InputGroupAddon>
        <Password v-model="controller.resetPasswordData.value.confirmPassword" :toggleMask="true" fluid :feedback="false"
        :placeholder="t('Components.ForgetPassword.ConfirmPassword')" @update:modelValue="(val) => { updatePassword(val) }" :pt="inputStyle" />
        <img v-if="controller.resetPasswordData.value.confirmPassword != ''" src="@/assets/img/icon/ic_close.svg" alt="" class="cursor-pointer mr-[12px]" @click="controller.resetPasswordData.value.confirmPassword = ''">
      </InputGroup>
      <Button :disabled="!controller.passwordComplete.value" :label="t('Components.ForgetPassword.confirm')" class="!bg-[#9E8EFF] !text-[#1D1D1E] !font-bold"
      @click="controller.changeStep(ForgetPasswordStep.Success)" />
    </div>
    <div v-if="controller.step.value == ForgetPasswordStep.Success" class="flex flex-col gap-4 w-full">
      <Button class="!bg-[#9E8EFF] !text-[#1D1D1E] !font-bold" @click="backToLogin">
        <div class="text-[#1D1D1E]">
          {{ controller.successCountdown.value > 0 ? `${t('Components.ForgetPassword.BackToLogin')} (${controller.successCountdown.value}s)` : t('Components.ForgetPassword.BackToLogin') }}
        </div>
      </Button>
    </div>
    <Button v-if="controller.step.value !== ForgetPasswordStep.Success" class="bg-transparent border-none !text-[#9E8EFF] my-[1.5rem]" :label="t('Components.ForgetPassword.BackToLogin')"
    @click="backToLogin" />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { ForgetPasswordController } from '@/composables/forgetPassword.com.ts';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ForgetPasswordStep } from '@/model/forgetPassword.model';
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['backToLogin'])
const props = defineProps({
  step: {
    type: String,
  } 
})
const controller = new ForgetPasswordController(t, locale, route, props)
// 設置 Success step 倒數完成後的回調
controller.setSuccessTimeoutCallback(() => {
  backToLogin();
});

const updateInput = (v) => {
    controller.checkValueComplete();
}

const updatePassword = (v) => {
  controller.checkPassword();
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

const checkReset = () => {
  console.log('login');
}

const backToLogin = () => {
  controller.changeStep(ForgetPasswordStep.Email)
  emit('backToLogin', true)
}
</script>

<style lang="scss" scoped>

</style>