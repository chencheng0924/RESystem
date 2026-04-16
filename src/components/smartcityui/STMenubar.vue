<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { STMenubarAction } from './STMenubar.model';
import { MenuItem } from "primevue/menuitem";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter()
const emit = defineEmits(['eventActionBtn', 'dragStart'])
const props = defineProps({
    draggable: {
        type: Boolean,
        default: false
    },
    actions: {
        type: Array<STMenubarAction>,
            default:[]
    }
})

const menus: ComputedRef<Array<MenuItem>> = computed(()=>props.actions?.map(x => x.toMenuItem()));
const setAction = (item) => {
    emit('eventActionBtn', item)
}

const pt = {
    rootList: ({ props }) => ({
        class: [
            // Spacing
            'flex space-x-5'
        ]
    }),
};

const onDragStart = (event, item) => {  
    emit('dragStart', event, item)
}
const getLabel = (item) => {
    return t(item.label);
}
</script>

<template>
    <div class="w-full" v-if="menus.length > 0">
        <div>
            <Menubar :model="menus" :pt="pt">
                <template #item="{ item, props, hasSubmenu }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ getLabel(item) }}</span>
                        </a>
                    </router-link>
                    <button v-else v-ripple :class="{'text-[#aaa]': !item.Enable}" @click="setAction(item)" :disabled="!item.Enable" :draggable="item.Type > 0 && item.Enable && draggable" @dragstart="onDragStart($event, item)">
                        <span :class="item.icon" />
                        <span class="ml-2" >{{ getLabel(item) }}</span>
                        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                    </button>
                </template>
            </Menubar>
        </div>
    </div>
</template>
