<script setup lang="ts">
import { ThemeSwitchController, ThemeModeType } from './STThemeMode.compsable';

import { useI18n } from 'vue-i18n';
import STForm from './STForm.vue';
import { STFormItem, STFormItemType } from './STForm.model';
import { useLangStore } from '@/stores/langStore';
const { t } = useI18n();

const props = defineProps({
    text: {
        type: String,
    }
})

const langStore = useLangStore()

const LanguageItem = [
    new STFormItem({
        Id: 'language-setting',
        Type: STFormItemType.Select,
        IsRequest: false,
        Seq: 0,
        IsDisplayDiv: false,
        HasFilter: false,
        OptionLabel: "key",
        OptionValue: "value",
        List: [{ key: '繁體中文', value: 'zh-TW' }, { key: 'English', value: 'en-US' }],
        RowIndex: 0,
        ColIndex: 0,
        IsDisplay: false,
        Value: langStore.currentLang
    })
];
langStore.reloadSetLang()
const changeLang = () => {
    langStore.setLang()
    setTimeout(() => {
        location.reload();
    }, 50);
}


</script>


<template>
    <span class="text-h4 text-commTextLevel1">{{ t('Layout.Topbar.Language_Setting') }}</span>
    <div class="flex gap-[16px] justify-center  mt-[16px]">
        <STForm class="w-full" :items="LanguageItem" @change="changeLang" />
    </div>
</template>