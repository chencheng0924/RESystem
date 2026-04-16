<script setup lang="ts">
import { computed, ref } from 'vue';
import { STTabAction, STTabProps } from './STTab.model';
import STTabPanels from './STTabPanel.vue';
const emit = defineEmits(['eventActionBtn'])
const props = defineProps({
    actions: {
        type: Array<STTabAction>,
    },
    activeId: {
        type: String,
    },
    tabListPt: {
        type: Object
    },
    tabPt: {
        type: Object
    }
})

const setAction = (item: STTabAction) => {
    propsentity.value = item.Id;
    emit('eventActionBtn', item)
}

let propsentity = ref(props.activeId)
if(props.actions != undefined && props.actions != null && props.actions.length > 0)
    propsentity.value = props.actions?.find(x=>x.Active==true)?.Id ?? null;

// 如果沒指定tab pt就預設style
const tabListPtOption = computed(() => {
    if (!!props.tabListPt) {
        return Object.keys(props?.tabListPt!)?.length != 0 ? props.tabListPt : defaultTabListPt
    } else {
        return defaultTabListPt
    }
})
const defaultTabListPt = {
    tabList: {
        class: [
            '!w-full !flex !gap-[24px]',
            '!border-solid !border-b-[1px]',
            '!bg-transparent'
        ]
    }
}
const tabPtOption = computed(() => {
    if (!!props.tabPt) {
        return Object.keys(props?.tabPt!)?.length != 0 ? props.tabPt : defaultTabPt
    } else {
        return defaultTabPt
    }
})
const defaultTabPt = {
    root: ({ props, context }) => ({
        class: [
            '!bg-transparent',
            'cursor-pointer select-none whitespace-nowrap',
            'user-select-none',
            '!border-b-[1px] !border-t-0',
            'py-[12px] px-0',
            {
            'border-transparent': !context.active,
            '!text-body1 !text-commTextLevel2': !context.active,
            '!text-primary !text-h3': context.active,
            }
        ]
    })
}
</script>

<template>

   <div class="w-full">
        <Tabs :value="propsentity">
            <TabList :pt="tabListPtOption">
                <Tab :pt="tabPtOption" :value="tab.Id" v-for="tab in props.actions" @click="setAction(tab)">
                    <span>{{ tab.Text }}</span>
                    <span class="text-commTextLevel2 text-body2" v-if="!!tab?.Message">{{ tab.Message }}</span>
                </Tab>

            </TabList>

        </Tabs>
    </div>
</template>
