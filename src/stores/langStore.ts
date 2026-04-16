import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePrimeVue } from "primevue/config"
import { localeTW } from '@/languages/primeVue-zhTW'
import { localeEN } from '@/languages/primeVue-enUS'
import moment from 'moment'
import 'moment/dist/locale/zh-tw'
import { Session } from '@/utils/sessionManagement'

export const useLangStore = defineStore('lang', () => {
  const langCode = ref<string>('zh-TW')
  const { locale } = useI18n()
  const primevue = usePrimeVue()
  // 當前語系
  const currentLang = computed(() => {
    return locale.value
  })
  const setLang = (current?: string) => {
    const en = "en-US"
    const tw = "zh-TW"


    if (current == null) {
      currentLang.value == en ? locale.value = tw : locale.value = en;
      primevue.config.locale = current == en ? localeEN : localeTW;
      langCode.value = currentLang.value;
      currentLang.value == en ? moment.locale(en) : moment.locale(tw);
      Session.setSessionLang(currentLang.value);
    }
    else {
      locale.value = current;
      primevue.config.locale = current == en ? localeEN : localeTW;
      langCode.value = current;
      current == en ? moment.locale(en) : moment.locale(tw);
      Session.setSessionLang(current);
    }

  }
  const reloadSetLang = () => {
    let lang = Session.getSessionLang();
    if (lang == undefined || lang == null || lang == "")
      return;

    setLang(lang);
  }
  return {
    currentLang,
    setLang,
    reloadSetLang
  }
})