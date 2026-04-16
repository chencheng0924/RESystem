<script setup lang="ts">
import STIcon from '@/components/Icon.vue'
import { CutomsMenuController } from './STCutomsMenu.composable';
import { MenuService } from '@/service/MenuService';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { PageLayoutStore } from '@/stores/PageLayout/PageLayoutStore';
import { useRoute } from 'vue-router';
import { ReloadStore } from "@/stores/reloadStore";
import draggable from 'vuedraggable'
const controller = CutomsMenuController.getInstance();
const props = defineProps({
    isMenuCollapsed: {
        type: Boolean,
        default: false
    }
})

const route = useRoute();
const reloadStore = ReloadStore();
const svc = new MenuService();
const pageLayoutStore = PageLayoutStore();

// 計算屬性：統一管理樣式
const menuItemClasses = computed(() => ({
    base: 'flex items-center hover:text-fonePrimaryMain hover:bg-fonePrimaryBg rounded cursor-pointer',
    collapsed: 'justify-center px-[12px] py-[5px] my-1 ',
    expanded: 'px-[12px] py-[5px] my-1 gap-2'
}));

const textClasses = computed(() => ({
    base: 'text-body2 !font-normal whitespace-nowrap transition-opacity duration-150 flex-1 text-ellipsis overflow-hidden',
    collapsed: 'opacity-0 w-0 !flex-none',
    expanded: 'opacity-100',
}));

const iconClasses = computed(() => ({
    menuIcon: 'layout-menuitem-icon text-lg flex-shrink-0',
    chevron: 'text-sm transition-opacity duration-150'
}));

// 新增：群組標題樣式
const groupClasses = computed(() => ({
    base: 'flex items-center cursor-pointer hover:bg-fonePrimaryBg/50 rounded transition-colors',
    collapsed: 'justify-center px-[12px] py-[5px] gap-2',
    expanded: 'px-[12px] py-[5px] gap-2'
}));

// 組合樣式的輔助函數
const getMenuItemClass = (isActive = false, isChild = false) => [
    menuItemClasses.value.base,
    {
        'bg-fonePrimaryBg text-fonePrimaryMain': isActive,
        [menuItemClasses.value.collapsed]: props.isMenuCollapsed,
        [menuItemClasses.value.expanded]: !props.isMenuCollapsed
    }
];

// 新增：群組標題樣式
const getGroupClass = () => [
    groupClasses.value.base,
    {
        [groupClasses.value.collapsed]: props.isMenuCollapsed,
        [groupClasses.value.expanded]: !props.isMenuCollapsed
    }
];

// 文字樣式
const getTextClass = (isActive = false) => {
    return [
        textClasses.value.base,
        {
            '!font-bold !text-fonePrimaryClick': isActive,
            [textClasses.value.collapsed]: props.isMenuCollapsed,
            [textClasses.value.expanded]: !props.isMenuCollapsed,
        }
    ]
};

// 新增：群組文字樣式
const getGroupTextClass = () => [
    'text-body3 text-foneTextLevel2 whitespace-nowrap transition-opacity duration-150 flex-1',
    {
        [textClasses.value.collapsed]: props.isMenuCollapsed,
        [textClasses.value.expanded]: !props.isMenuCollapsed,
    }
];


// 選單項目
const renderMenuItem = (item: any, isChild = false) => {

    const hasChildren = item?.children && item?.children.length > 0;

    // 檢查是否為當前選中項，或者其子項被選中
    const isChildActive = hasChildren && item.children.some(
        (child: any) => pageLayoutStore.selectedItem === child.id
    );

    const isActive = pageLayoutStore.selectedItem === item.id || isChildActive;

    return {
        isActive,
    };
};

onMounted(async () => {
    const menus = await svc.getMenus()
    // 過濾掉常用選單，只保留可釘選的選單
    controller.model.value = menus.filter((menu: any) => menu.label !== undefined)
    // 從可釘選選單中過濾掉已經在常用選單中的項目
    controller.filterPinnedItemsFromModel()
})

const onDragEnd = () => {
    console.log('拖曳結束，新順序:', JSON.parse(JSON.stringify(controller.menus.value)));
};
</script>


<template>
    <span class="text-h4 text-commTextLevel1">{{ t('Layout.Topbar.Main_Menu') }} </span>
    <div class="flex gap-[16px] justify-center my-[16px]">
        <nav id="menu" class="w-full h-full text-foneTextLevel1">
            <ul class="layout-menu">
                <div class="mt-1">
                    <draggable v-model="controller.menus.value" item-key="id" tag="div" animation="200"
                        @end="onDragEnd">
                        <template #item="{ element: menu }">
                            <li role="menuitem" class="flex flex-col">
                                <div :to="menu.path" class="group">
                                    <div :class="getMenuItemClass(renderMenuItem(menu).isActive)">
                                        <div class="drag-handle mr-2">
                                            <STIcon name="ic_grip_vertical" customClass="!w-[18px] !h-[18px]"
                                                :class="[iconClasses.menuIcon, 'group-hover:!opacity-100 transition-opacity duration-200']" />
                                        </div>

                                        <STIcon :name="menu.icon" customClass="!w-[18px] !h-[18px]"
                                            :class="[iconClasses.menuIcon]" />
                                        <span :style="{
                                            color: renderMenuItem(menu).isActive ? 'var(--fone-primary-click)' : 'inherit',
                                            fontWeight: renderMenuItem(menu).isActive ? 'bold' : 'normal'
                                        }"
                                            class="text-body2 whitespace-nowrap transition-opacity duration-150 flex-1 text-ellipsis overflow-hidden">
                                            {{ t(menu.label) }}
                                        </span>

                                        <div v-tooltip.top="t('Layout.Sidebar.Menu_UnPin')" class="flex items-center"
                                            @click="controller.removeMenu(menu)">
                                            <!-- <STIcon name="ic_add" customClass="!w-[18px] !h-[18px] "
                                                :class="[iconClasses.menuIcon, 'opacity-0 group-hover:!opacity-100 transition-opacity duration-200']" /> -->
                                            <img v-if="menu.key != 'AIHome'" src="@/assets/img/icon/ic_filloff_blue.svg"
                                                alt=""
                                                class="opacity-0 group-hover:!opacity-100 transition-opacity duration-200">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </draggable>
                </div>
            </ul>
        </nav>
    </div>
    <span class="text-h4 text-commTextLevel1">{{ t('Layout.Topbar.Pin_Menu') }}</span>
    <div class="my-[16px]">
        <nav id="menu" class="w-full h-full text-foneTextLevel1">
            <ul class="layout-menu">
                <template v-for="(item, i) in controller.model.value" :key="item.key">
                    <div v-if="item.label" :class="getGroupClass()">
                        <span :class="getGroupTextClass()">{{ t(item.label) }}</span>
                    </div>
                    <div class="mt-1">
                        <li role="menuitem" class="flex flex-col" v-for="(menu, idx) in item.children" :key="menu.key">
                            <div :to="menu.path" class="group">
                                <div :class="getMenuItemClass(renderMenuItem(menu).isActive)">
                                    <STIcon :name="menu.icon" customClass="!w-[18px] !h-[18px]"
                                        :class="[iconClasses.menuIcon]" />
                                    <span :style="{
                                        color: renderMenuItem(menu).isActive ? 'var(--fone-primary-click)' : 'inherit',
                                        fontWeight: renderMenuItem(menu).isActive ? 'bold' : 'normal'
                                    }"
                                        class="text-body2 whitespace-nowrap transition-opacity duration-150 flex-1 text-ellipsis overflow-hidden">
                                        {{ t(menu.label) }}
                                    </span>
                                    <div v-tooltip.top="t('Layout.Sidebar.Menu_Pin')" class="flex items-center"
                                        @click="controller.addMenu(menu)">
                                        <img src="@/assets/img/icon/ic_pin_blue.svg" alt=""
                                            class="group-hover:!opacity-100 transition-opacity duration-200">
                                        <!-- <STIcon name="ic_pin" customClass="!w-[18px] !h-[18px] "
                                            :class="[iconClasses.menuIcon, 'opacity-0 group-hover:!opacity-100 transition-opacity duration-200']" /> -->
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </template>
            </ul>
        </nav>


    </div>

</template>