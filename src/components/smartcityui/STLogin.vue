<script setup lang="ts">
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { UseLoginTabsStyle, UseLoginForm } from '@/components/smartcityui/STLogin.composable'
import STForm from '@/components/smartcityui/STForm.vue'
import { STFormItem, STFormItemType, STFormInputType } from './STForm.model'
import { STTabs } from './STLogin.model'

const style = new UseLoginTabsStyle();
const emit = defineEmits(["toggleSwitch", "refreshVerifyImg", "clearInputValue", "forgetPassWord", "tabChange", "refreshScanImg"])
const props = defineProps({
    pageTitle: {
        type: String,
    },
    pageSubTitle: {
        type: String,
    },
    tabs: {
        type: Array<STTabs>,
        required: true
    },
    formItems: {
        type: Array<STFormItem>,
        required: true
    },
    buttonName: {
        type: String,
        default: '登入'
    },
    scanImage: {
        type: String,
        default: ''
    },
    scanText: {
        type: String,
        default: ''
    },
    isShowRefresh: {
        type: Boolean,
        default: false
    }
})

const toggleSwitch = (val: boolean) => {
    emit('toggleSwitch', val)

}
const refreshVerifyImg = (val: boolean) => {
    emit('refreshVerifyImg', val)
}

const clearInputValue = (val) => {
    emit('clearInputValue', val)
}
const forgetPassWord = () => {
    emit('forgetPassWord')
}
const tabChange = (val) => {
    // console.log(val)
    emit('tabChange', val)
}
const refreshScanImg = () => {
    emit('refreshScanImg')
}
</script>

<template>
    <Tabs :value="props.tabs[0].value" @update:value="(val) => { tabChange(val) }">
        <div class="flex justify-center text-commTextLevel1 text-pageTitle">{{ props.pageTitle }}</div>
        <div class="flex justify-center text-commTextLevel1 text-pageSubTitle pb-[34.82px]">
            {{ props.pageSubTitle }}
        </div>
        <TabList :pt="style.loginTabListStyle.value">
            <Tab :pt="style.loginTabStyle.value" v-for="tab in props.tabs" :key="tab.title" :value="tab.value">{{
                tab.title
            }}
            </Tab>
        </TabList>
        <TabPanels :pt="style.loginTabPanelsStyle.value">
            <TabPanel :value="props.tabs[0].value">
                <STForm :items="props.formItems" @toggleEvent="(val) => { toggleSwitch(val) }"
                    @refreshVerifyImgEvent="(val) => { refreshVerifyImg(val) }"
                    @clearInputValueEvent="(val) => { clearInputValue(val) }"
                    @forgetPassWordEvent="() => { forgetPassWord() }" />
                <div class="flex flex-wrap w-full pt-[26px]">
                    <Button class="w-full" :label="props.buttonName" :fluid="false"
                        :pt="style.loginButtonStyle.value"></Button>
                </div>
            </TabPanel>
            <TabPanel :value="props.tabs[1].value">
                <div class="flex justify-center flex-col w-full pb-0 px-10">
                    <div class="flex justify-center relative items-center "
                        :class="{ 'before:absolute before:-inset-1 before:-skew-y-0 before:bg-[#FFFFFFD9] before:w-full before:h-full before:top-0 before:left-0': props.isShowRefresh }">
                        <img :src="props.scanImage" alt="scanImage" class="w-full h-auto block" />
                        <div v-if="props.isShowRefresh" @click="refreshScanImg()"
                            class="bg-fonePrimaryMain w-[40px] h-[40px] rounded-lg absolute flex justify-center items-center">
                            <img :src="'ic_refresh'.getIcon('svg')" alt="scanImage" />
                        </div>
                    </div>
                    <div class="text-commTextLevel1 text-body2 text-center pt-4">{{ props.scanText }}</div>
                </div>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>
