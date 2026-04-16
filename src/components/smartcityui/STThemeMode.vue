<script setup lang="ts">
import { ThemeSwitchController, ThemeModeType } from './STThemeMode.compsable';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    text: {
        type: String,
    }
})

const controller = new ThemeSwitchController();
const radioButtonPt={
     root: ({ props, context }) => ({
        class: [
          '!h-[16px] !w-[16px]'
        ]
      }),
      box: ({ props, context }) => ({
        class: [
          '!h-[16px] !w-[16px]'
        ]
      }),
    icon: ({ props, context }) => ({
        class: [
           '!h-[8.5px] !w-[8.5px]'
        ]
      }),

    }

</script>

<template>
    <span class="text-h4 text-commTextLevel1">{{ t('Layout.Topbar.Theme_Mode') }}</span>
    <div class="flex gap-[16px] justify-between mt-[16px]">
        <label class="flex flex-col" for="light">
            <img :src="'lightmode.svg'.getImgPath()" alt="lightmode">
            <div
                class="bg-[#F3F3F3] border-solid border-transparent !border-x-[#D8D8D8] !border-b-[#D8D8D8] border-x-[1px] border-b-[1px] rounded-br-[4px] rounded-bl-[4px] p-[8px] flex gap-[8px] items-center">
                <RadioButton v-model="controller.themeMode.value" inputId="light" name="theme" :pt="radioButtonPt"
                    :value="ThemeModeType.LIGHT" @update:modelValue="(e) => { controller.change(e) }" />
                <span class="text-[#333333]">{{ t('Layout.Topbar.Light') }}</span>
            </div>
        </label>
        <label for="dark" class="flex flex-col">
            <img :src="'darkmode.svg'.getImgPath()" alt="darkmode">
            <div
                class="bg-[#2E2E2E] border-solid border-transparent !border-x-[#39393D] !border-b-[#39393D] border-x-[1px] border-b-[1px] rounded-br-[4px] rounded-bl-[4px] p-[8px] flex gap-[8px] items-center">
                <RadioButton v-model="controller.themeMode.value" inputId="dark" name="theme" :pt="radioButtonPt"
                    :value="ThemeModeType.DARK" @update:modelValue="(e) => { controller.change(e) }" />
                <div class="!text-[#FFFFFFCC]">{{ t('Layout.Topbar.Dark') }}</div>
            </div>
        </label>
    </div>
    <div class="flex gap-[16px] justify-between mt-[16px]">
        <label class="flex flex-col" for="system">
            <img :src="'systemmode.svg'.getImgPath()" alt="lightmode">
            <div
                class="bg-[#F3F3F3] border-solid border-transparent !border-x-[#D8D8D8] !border-b-[#D8D8D8] border-x-[1px] border-b-[1px] rounded-br-[4px] rounded-bl-[4px] p-[8px] flex gap-[8px] items-center">
                <RadioButton v-model="controller.themeMode.value" inputId="system" name="theme" :pt="radioButtonPt"
                    :value="ThemeModeType.SYSTEM" @update:modelValue="(e) => { controller.change(e) }" />
                <span class="text-[#333333]">{{ t('Layout.Topbar.System') }}</span>
            </div>
        </label>
    </div>
</template>
<style scoped lang="scss">

</style>
