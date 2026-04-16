<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import 'primeicons/primeicons.css'
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Paginator, { PageState } from 'primevue/paginator';
import Button from "primevue/button"
import { useRoute } from 'vue-router'
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { UseTableViewStyle, UseTableView } from './STTableView.composable'
import { STConditionItem, STDataTableAction, STDataTableColumn, STDataTableCustomFunction, STDataTablePageParams, STTableShowMode, STTableViewLayout } from './STTable.model'
import STForm from './STForm.vue';
import STFilter from './STFilter.vue'
import { ThemeSwitchController } from './STThemeMode.compsable';
import { ActionEnum } from './STCommon.model'
import { MenuItem } from 'primevue/menuitem';
import { STMenubarAction } from './STMenubar.model';
import { STCardPanelMode, STCardPanelProps } from './STCardPanel.model';
import { STPaginatorProps } from './STPaginator.model';
import STTable from './STTable.vue';

const style = new UseTableViewStyle()

const props = withDefaults(defineProps<{
    searchEnable?: boolean,
    searchConditions?: Array<STConditionItem>,
    searchActions?: Array<STDataTableAction>,
    actions?: Array<STDataTableAction>,
    showCheckBox?: boolean,
    data?: Array<any>,
    columns?: Array<STDataTableColumn>,
    pageParams?: STDataTablePageParams,
    scrollHeight?: string,
    customObject?: STDataTableCustomFunction,
    isSubTable?: boolean,
    subTableKey?: string,
    subTableColumns?: Array<STDataTableColumn>,
    cardProps?: STCardPanelProps,
    cardPaginatorProps?: STPaginatorProps,
    cardDataTotalCount?: number,
    cardAutoScroll?: boolean,
    layoutMode?: STTableViewLayout,  // 預設顯示Table layout
    tableShowMode?: STTableShowMode,  // Table顯示的模式（paginator / infinite scroll）
    searchKeyword?: string
}>(), {
    searchEnable: () => (false),
    searchConditions: () => ([]),
    searchActions: () => ([]),
    actions: () => ([]),
    showCheckBox: () => (false),
    data: () => ([]),
    columns: () => ([]),
    pageParams: () => (null),
    scrollHeight: () => ('calc(100vh - 400px)'),
    customObject: () => (new STDataTableCustomFunction()),
    isSubTable: () => (false),
    subTableKey: () => (''),
    subTableColumns: () => ([]),
    cardAutoScroll: () => (false),
    layoutMode: () => (STTableViewLayout.TABLE),
    tableShowMode: () => (STTableShowMode.SCROllABLE),
    searchKeyword: () => ('')
})

const controller = new UseTableView(t, locale, route, props.layoutMode)
const emit = defineEmits(['eventActionBtn', 'eventPageChange', 'eventSearchActionBtn', 'eventActionBtnByRow', 'eventUploadAfter', 'eventExportAction', 'eventExportSubBtn', 'eventCardPaginatorUpdate', 'eventCardPanelGetNextData', 'eventCardRatingUpdate', 'eventCardDelete', 'eventCardClicked', 'eventSearch', 'eventClearSearch', 'updateTableViewType'])
const actionItem = (item: STDataTableAction) => {
    emit('eventActionBtn', item, controller.selectedProduct.value)
}
const actionItemByRow = (item: STDataTableAction, data: any) => {
    emit('eventActionBtnByRow', item, data);
}
const pageChange = (event: any) => {
    emit('eventPageChange', event);
}
const searchActionItem = (item: STDataTableAction) => {
    emit('eventSearchActionBtn', item, props.searchConditions);
}
const uploadAfter = (e) => {

    emit('eventUploadAfter', e)
}

const exportTable = (e, item: STMenubarAction) => {
    emit("eventExportAction", e, item)
}
const actionExportSubBtn = (e, item: STMenubarAction, subMenuitem: MenuItem) => {
    emit("eventExportSubBtn", e, item, subMenuitem)
}

const paginatorUpdate = (state: PageState) => {
    emit('eventCardPaginatorUpdate', state)
}

const cardPanelUpdate = () => {
    emit('eventCardPanelGetNextData')
}

const cardRatingUpdate = (card) => {
    emit('eventCardRatingUpdate', card)
}

const cardDelete = (card) => {
    emit('eventCardDelete', card)
}

const cardClicked = (card) => {
    emit('eventCardClicked', card)
}

const search = () => {
    emit('eventSearch', searchInput.value)
}

const clearKeyword = () => {
    searchInput.value = ''
    emit('eventClearSearch')
}

const filterColumns = props.columns?.filter(x => x.isActions() == false);
let actionColumn = props.columns?.filter(x => x.isActions() == true).firstOrDefault();

let themeController = new ThemeSwitchController(false);
let mode = themeController.getSearchEmptyImage();
let imgSearchEmpty = ref(mode)

//-------------------------------------------
// sub table 
const expandedRows = ref({});
const subfilterColumns = props.subTableColumns?.filter(x => x.isActions() == false);
let subActionColumn = props.subTableColumns?.filter(x => x.isActions() == true).firstOrDefault();
const onRowExpand = (event) => {

};
const onRowCollapse = (event) => {

};

const expandAll = () => {
    expandedRows.value = props.data.reduce((acc, p) => (acc[p.id] = true) && acc, {});
};

onMounted(() => {
    expandAll();
})

import STCardPanel from '@/components/smartcityui/STCardPanel.vue'
const cardMode = ref(controller.layoutMode.value == STTableViewLayout.TABLE ? false : true)

const tableScrollable = computed(() => {
    return props.tableShowMode == STTableShowMode.SCROllABLE ? true : false
})

const searchInput = ref(props.searchKeyword)
const updateTableViewType = () => {
    let tableType = cardMode.value ? STTableViewLayout.CARD : STTableViewLayout.TABLE
    emit('updateTableViewType', tableType)
}

const tableActionDisable = (item: STDataTableAction) => {
    if (!item.Enable) 
        return true

    if (item.Type == ActionEnum.TableDeletes && controller.selectedProduct.value.length == 0) 
        return true

    if (item.Type == ActionEnum.TableRowEdit && controller.selectedProduct.value.length != 1) 
        return true

    return false;
}
const updateSelection = (val) => {
    controller.selectedProduct.value = val
}
</script>
<template>
    <div v-if="columns.length > 0" class="w-ful pb-[16px]"
        :style="{ '--toggle-switch-on-icon': `url('${`${'ic_line_' + themeController.getModeString()}`.getIcon('svg')}')`,
         '--toggle-switch-off-icon': `url('${`${'ic_grid_' + themeController.getModeString()}`.getIcon('svg')}')`,
         'height': `calc(100vh - 350px)`}">
        <div v-if="props.searchEnable" class="pb-2">
            <div class="w-full">
                <!-- <STForm :items="props.searchConditions"></STForm> -->
                <STFilter :props="{ condList: props.searchConditions }"></STFilter>
            </div>

        </div>
        <div class="pb-[16px] flex justify-end items-center" :class="{ 'justify-between': props.actions.length > 0 }">
            <div class="flex gap-[16px] items-center">
                <div v-if="props.actions.length > 0" class="flex justify-start gap-3">
                    <div v-for="(item, index) in props.actions" :key="index">

                        <FileUpload v-if="item.Type == ActionEnum.TableImport" :id="item.Id" :name="item.Id"
                            accept=".xlsx" :maxFileSize="1000000" :auto="true" :chooseLabel="item.Text"
                            @uploader="uploadAfter" :customUpload="true" mode="basic"> </FileUpload>

                        <STButtonPopover class="p-0" v-else-if="item.Type == ActionEnum.TableExport" :actions="[item]"
                            @eventActionBtn="(e: Event, item: STMenubarAction) => exportTable(e, item)"
                            @eventActionSubBtn="(e: Event, item: STMenubarAction, subMenuitem: MenuItem) => actionExportSubBtn(e, item, subMenuitem)">
                            <template #content>
                                <div class="flex items-center gap-[4px]">
                                    <img :src="'ic_arrow_turnupright'.getIcon('svg')" alt="export icon">
                                    <span class="text-h4">{{ item.Text }}</span>
                                    <div class="flex items-center gap-[4px]">
                                        <div class="w-[2px] h-[22px] bg-[#9E8EFF33] ml-[8px]"></div>
                                        <img :src="'ic_arrow_down_primary'.getIcon('svg')" alt="arrow icon">
                                    </div>
                                </div>
                            </template>
                        </STButtonPopover>
                        <Button v-else @click="actionItem(item)" :disabled="tableActionDisable(item)" :icon="item.Icon"
                            :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
                            :label="item.Text" v-tooltip.top="item.Tooltip" class="h-[36px]" />
                    </div>

                </div>
                <div class="flex items-center ">
                    <InputGroup class="h-[36px] relative">
                        <InputText v-model="searchInput" :placeholder="t('Components.STTableView.Search_Placeholder')" />
                        <img :src="'ic_input_clear'.getIcon('svg')" alt="clear icon"
                            class="absolute right-[65px] top-[30%] cursor-pointer" v-if="searchInput != ''"
                            @click="clearKeyword">
                        <InputGroupAddon class="w-[30px]">
                            <!-- <Button class="h-[24px]" icon="pi pi-search" severity="secondary" variant="text"
                                @click="search" /> -->
                            <img class="cursor-pointer" :src="`ic_search_${themeController.getModeString()}`.getIcon('svg')" alt="search icon" @click="search">
                        </InputGroupAddon>
                    </InputGroup>

                </div>
            </div>
            <ToggleSwitch v-model="cardMode" @update:modelValue="updateTableViewType" />
        </div>

        <template v-if="!cardMode">
            <STTable :scrollHeight="props.scrollHeight" :searchEnable="false" :data="props.data"
                :columns="props.columns" @eventActionBtnByRow="(item, data) => actionItemByRow(item, data)"
                @eventUpdateSelection="(val) => updateSelection(val)" />
           
        </template>
        <template v-else>
            <template v-if="props?.cardProps">
                <STCardPanel :props="props.cardProps" :paginatorProps="props.cardPaginatorProps"
                    :dataTotalCount="props.cardDataTotalCount" :autoScroll="props.cardAutoScroll"
                    @paginatorUpdate="paginatorUpdate" @getNextDataEvent="cardPanelUpdate"
                    @eventCardRatingUpdate="cardRatingUpdate" @eventDeleteCard="cardDelete"
                    @eventCardAction="cardClicked" />
            </template>
        </template>
    </div>
    <div v-else>
        沒資料
    </div>

</template>

<style lang="scss" scoped>
:deep(.p-datatable-table-container) {
    scrollbar-width: thin !important;
}
:deep(.p-paginator) {
    display: flex;
    align-items: center;
    justify-content: end !important;
    flex-wrap: wrap;
    background: var(--p-paginator-background);
    color: var(--p-paginator-color);
    padding: var(--p-paginator-padding);
    border-radius: var(--p-paginator-border-radius);
    gap: var(--p-paginator-gap);
}

:deep(.p-datatable-column-header-content) {
    .p-checkbox {
        &.p-checkbox-checked {
            .p-checkbox-box {
                >svg {
                    display: none;
                }

                &::after {
                    content: '';
                    width: 8px;
                    height: 2px;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-image: url('@/assets/img/icon/ic_table_check_all.svg');
                }
            }
        }
    }
}

:deep(.p-checkbox) {
    width: 16px !important;
    height: 16px !important;

    .p-checkbox-box {
        width: 16px !important;
        height: 16px !important;
    }

    &.p-checkbox-checked {
        .p-checkbox-box {
            >svg {
                display: none;
            }

            &::after {
                content: '';
                width: 10px;
                height: 7px;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url('@/assets/img/icon/ic_table_check.svg');
            }
        }
    }
}

:deep(.p-toggleswitch) {
    width: 60px;
    height: 32px;
    
    .p-toggleswitch-slider {
        position: relative;
        border-radius: 4px;
        background: var(--fone-bg-level1);
        border: 1px solid var(--fone-border);
        &:hover {
           background: var(--fone-bg-level1) !important;
        }
        &::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-image: var(--toggle-switch-on-icon);
            // background-image: url('@/assets/img/icon/ic_line.svg');
            background-size: cover;
            top: 50%;
            transform: translateY(-50%);
            left: 5px;
        }
        &::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-image: var(--toggle-switch-off-icon);
            // background-image: url('@/assets/img/icon/ic_grid.svg');
            background-size: cover;
            top: 50%;
            transform: translateY(-50%);
            right: 5px;
            opacity: 0.3;
        }
        .p-toggleswitch-handle {
            border-radius: 1.5px;
            width: 24px;
            height: 24px;
            top: 40%;
            left: 3px;
         
            opacity: 0.3;
            background: var(--fone-primary-bg);
            color:  var(--fone-primary-main);
        }
    }

    &.p-toggleswitch-checked {
        .p-toggleswitch-slider {
           
            background: var(--fone-bg-level1);
             border: 1px solid var(--fone-border);
            .p-toggleswitch-handle {
                left: 30px;
                 color:  var(--fone-primary-main);
                  background: var(--fone-primary-bg);
            }
            &::before {
                opacity: 0.3;
            }
            &::after {
                opacity: 1;
            }
        }
    }
}

:deep(.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider) {
    background: var(--fone-bg-level1) !important;
     border: 1px solid var(--fone-border);
}

:deep(.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider ) {
    background: var(--fone-bg-level1);
     border: 1px solid var(--fone-border);

}

</style>