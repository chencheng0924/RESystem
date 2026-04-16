<script setup lang="ts">
import { ref } from 'vue';
import { STPageTitleAction } from './STPageTitle.model';
import { MenuItem } from "primevue/menuitem";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Icon from "@/components/Icon.vue"
const { t } = useI18n();
const router = useRouter()
const props = defineProps({
    title: {
        type: String,
    },
    actions: {
        type: Array<STPageTitleAction>,
            default:[]
    },
    isInfo: {
        type: Boolean,
        default: false
    }
})

const menus: Array<MenuItem> = props.actions.map(x => x.toMenuItem());
const home = ref({
    icon: 'pi pi-home',
    route: '/'
});

const setRouter = (item) => {
    if (item.url != null && item.url != "") {
        router.push(item.url)
    }
}
const getclass = (item) => {
    if (item.url != null && item.url != "") {
        return "text-foneTextLevel2";
    } else {
        return "text-foneTextLevel1 font-bold";
    }
}
const getLabel = (item) => {
    return t(item.label);
}
</script>

<template>
    <div class="flex items-center">
        <div class="pl-4 cursor-pointer flex items-center" v-if="props.isInfo" @click="router.back()">
            <img src="@/assets/img/leftArrow.svg" alt="">
            <p class="whitespace-nowrap">返回</p>
        </div>
        <div class="w-full h-full flex justify-start pr-4">
            <!-- <div class="text-3xl font-bold flex items-end justify-end">
                {{ props.title }}
            </div> -->
            <div class="flex items-end justify-end">
                <Breadcrumb  :model="menus" class="p-0">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="text-primary font-semibold">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else href="javascript:void(0)" @click="setRouter(item)">
                            <span :class="getclass(item)">{{ getLabel(item) }}</span>
    
                        </a>
                    </template>
                    <template #separator>
                          <Icon name="ic_arrow_right" custom-class="!w-[18px] !h-[18px] !text-foneTextDisable"></Icon>    
                    </template>
                </Breadcrumb>
            </div>
        </div>
    </div>
</template>
