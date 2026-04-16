import { createApp } from 'vue'
import router from "./router/index";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import i18n from './plugins/i18n.ts'
import PrimeVue from 'primevue/config';
import { definePreset, updateSurfacePalette } from '@primevue/themes';
import Lara from '@primevue/themes/lara';
import Aura from '@primevue/themes/aura';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { localeTW } from '@/languages/primeVue-zhTW.ts'
import '@/utils/arrayExtension'
import '@/utils/stringExtension'
import '@/assets/styles.scss';
import '@/assets/style/tailwind.css';
import App from './App.vue'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';

import fadeMove from '@/utils/useFadeMove.ts'
import { useLayout } from '@/composables/layout.js';
const { layoutConfig, surfaces } = useLayout();
const baseTheme = layoutConfig.preset === 'Aura' ? Aura : Lara;
const surfacePalette = surfaces.value.find((surface) => surface.name === layoutConfig.surface)
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
// if (layoutConfig.darkTheme) {
//     document.documentElement.classList.add('app-dark');
// } else {
//     document.documentElement.classList.remove('app-dark');
// }

import { ColorTheme } from '@/theme/ColorTheme.ts'
const evPreset = definePreset(Lara, new ColorTheme().uiLibraryColor)
import { useDebounceFn } from '@vueuse/core'
//app.use
const app = createApp(App);
app.directive('tooltip', Tooltip);
app.use(VCalendar, {})
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(i18n);
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);

app.use(PrimeVue, {
    locale: localeTW,
    theme: {
        preset: evPreset,
        cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
        }
    }
})
updateSurfacePalette(surfacePalette?.palette)
app.directive('fadeMove', fadeMove)
import testDirective from '@/utils/useTestDirective.ts'
app.directive('testDirective', testDirective)
import Tooltip from 'primevue/tooltip';
app.directive('tooltip', Tooltip);
app.directive('prevent-reclick', {
    beforeMount(el, binding) {
        el.disabled = false; // 初始化时启用按钮
        el.addEventListener('click', () => {
            el.disabled = true; // 点击后禁用按钮
            setTimeout(() => {
                el.disabled = false; // 在指定的时间后重新启用按钮
            }, binding.value || 1000); // 使用 binding.value 来设置等待时间，默认为 1000 毫秒
        });
    },
    unmounted(el) {
        // // 组件卸载时移除事件监听器
        // el?.removeEventListener('click');
    },
});

app.directive('debounce', {
    mounted(el, binding) {
        const delay = binding.value?.delay || 300
        const inputElement = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea')
        if (!inputElement) return

        const handler = useDebounceFn((event) => {
            el.dispatchEvent(new CustomEvent('debounced-update', {
                detail: {
                    value: event.target.value,
                    originalEvent: event
                },
                bubbles: true
            }))
        }, delay)

        inputElement._vDebounceHandler = (event) => {
            handler(event)
        }

        inputElement.addEventListener('input', inputElement._vDebounceHandler)
    },

    unmounted(el) {
        const inputElement = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea')
        if (inputElement && inputElement._vDebounceHandler) {
            inputElement.removeEventListener('input', inputElement._vDebounceHandler)
            delete inputElement._vDebounceHandler
        }
    }
})


app.mount("#app");
