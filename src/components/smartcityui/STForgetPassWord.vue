<script setup lang="ts">
import { ref } from 'vue';
import { UseLoginTabsStyle } from '@/components/smartcityui/STLogin.composable'
import { UseSTForgetPassWord } from '@/components/smartcityui/STForgetPassWord.composable'
import STForm from '@/components/smartcityui/STForm.vue'
import { STForgetPassWord } from './STForgetPassWord.model'
import { STFormItem } from './STForm.model';
const style = new UseLoginTabsStyle();
const controller = new UseSTForgetPassWord();
const emit = defineEmits(["confirmVerifyCode", "checkForm", "sendVerificationCode", "backToLogin"])

const props = defineProps({
    formTitle: {
        type: String,
    },
    formSubTitle: {
        type: String,
    },
    formItems: {
        type: Array<STFormItem>,
        required: true
    },
    buttonName: {
        type: String,
        default: '確認'
    },
    backButtionName: {
        type: String,
        default: '返回登入'
    },
    isShowBack: {
        type: Boolean,
        default: true
    }

})

const confirmVerifyCode = (item) => {
    emit('confirmVerifyCode', item)
}
const checkForm = (item) => {
    console.log(item);
    emit('checkForm', item)
}
const sendVerificationCode = () => {
    emit('sendVerificationCode')
}
const backToLogin = () => {
    emit('backToLogin')
}
</script>

<template>
    <div class="flex flex-col justify-center text-h1 ">
        {{ props.formTitle }}
        <div class="text-commTextLevel1 text-pageSubTitle pt-2 pb-6">
            {{ props.formSubTitle }}
        </div>
        <STForm :items="props.formItems" @change="(val: any) => checkForm(val.targetItem)"
            @sendVerificationCodeEvent="() => { sendVerificationCode() }" />
        <div class="flex flex-wrap w-full pt-[26px]">
            <Button class="w-full" :label="props.buttonName" :fluid="false" :pt="style.loginButtonStyle.value"
                @click="() => { confirmVerifyCode(props.formItems) }"></Button>
        </div>
        <div v-if="props.isShowBack" @click="() => { backToLogin() }"
            class="flex justify-center text-h4 text-fonePrimaryMain pt-4 cursor-pointer">
            {{ props.backButtionName }}</div>

    </div>
</template>   
