<script setup lang="ts">
import { onMounted, ref, watch, computed, nextTick, onUnmounted } from 'vue';
import 'primeicons/primeicons.css'
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Button from "primevue/button"
import { useRoute } from 'vue-router'
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { useTableStyle, useTable } from './STTable.composable'
import { STConditionItem, STDataTableAction, STDataTableColumn, STDataTableCustomFunction, STDataTablePageParams } from './STTable.model'
import STForm from './STForm.vue';
import STFilter from './STFilter.vue'
import { ActionEnum, STAction } from './STCommon.model'
import { ThemeSwitchController } from './STThemeMode.compsable';
import STTab from './STTab.vue';
import { STTabAction } from './STTab.model';
import { useDebounceFn } from '@vueuse/core'
import { PageEventBus, PageEventEnum } from '@/lib/pageBuilder/mitt/PageEventBus';

const style = new useTableStyle()
const controller = new useTable(t, locale, route)


const props = defineProps({
    searchEnable: {
        type: Boolean,
        default: false
    },
    searchConditions: {
        type: Array<STConditionItem>,
        default: [],
    },
    searchActions: {
        type: Array<STDataTableAction>,
        default: [],
    },
    //----------------------------------------
    actions: {
        type: Array<STDataTableAction>,
        default: [],
    },
    showCheckBox: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array<any>,
        default: [],
    },
    columns: {
        type: Array<STDataTableColumn>,
        default: [],
    },
    pageParams: {
        type: STDataTablePageParams,
        default: null
    },
    scrollHeight: {  // 如果有指定，就不會有paginator
        type: String,
        default: null
    },
    customObject: {
        type: STDataTableCustomFunction,
        default: new STDataTableCustomFunction()
    },
    //-------------------------------------
    isSubTable: {
        type: Boolean,
        default: false
    },
    subTableKey: {
        type: String,
    },
    subTableColumns: {
        type: Array<STDataTableColumn>,
        default: [],
    },
    tableTotalRows: {
        type: Number,
        default: 0
    },
    alignFrozen: {
        type: String,
        default: 'right'
    },
    frozen: {
        type: Boolean,
        default: true
    },
    //-------------------------------------
    tabActions: {
        type: Array<STTabAction>,
        default:[]
    },
    activeId: {
        type: String,
        default:'1'
    },
    searchInput:{
          type: String,
        default: ''
    },
    emptyTitle:{
        type: String,
        default: 'Layout.PageLayout.No_Data'
    },
     emptySubTitle:{
        type: String,
        default: ''
    }
})
const emit = defineEmits(['eventActionBtn', 'eventPageChange', 'eventUpdateRows',
    'eventSearchActionBtn', 'eventActionBtnByRow', 'eventUploadAfter',
    'eventUpdateSelection', 'change',
    'eventClearSearch' ,'eventSearchKeyWordBtn'
])
const actionItem = (item: STDataTableAction) => {
    emit('eventActionBtn', item, controller.selectedProduct.value)
}
const actionItemByRow = (item: STDataTableAction, data: any) => {
    emit('eventActionBtnByRow', item, data.data);
}
const pageChange = (event: any) => {
    emit('eventPageChange', event, props.searchConditions);
}
const searchActionItem = (item?: STDataTableAction) => {
    emit('eventSearchActionBtn', item, props.searchConditions);
}
const uploadAfter = (e) => {

    emit('eventUploadAfter', e)
}
const updateSelection = (val) => {
    emit('eventUpdateSelection', val)
}
const change = (e) => {
    emit('change', e)
}



const filterColumns = props.columns?.filter(x => x.isActions() == false && x.showFilterCondition?.tableColumn);
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

const showDefaultPaginator = computed(() => {
    if (props.scrollHeight) return false
    if (!props.data?.length) return false
    return !props.pageParams
})

let tableDatas = ref(props.data)

const eventFunction = (eventName, data) => {

  if (eventName == PageEventEnum.PageTableUpdate) {
        tableDatas.value = data;
    }
    
}
onMounted(() => {
    expandAll();
    if (props.pageParams && !props.pageParams.totalRows) {
        props.pageParams.totalRows = 0
    }
    addTextToPaginator()
    PageEventBus.getInstance.onMonitor(eventFunction);
})

onUnmounted(() => {
    PageEventBus.getInstance.offMonitor(eventFunction);
})

const truncate = (text: string, length: number) => {
    if (text == null || text == "")
        return "";
    return text.length > length ? text.slice(0, length) + '...' : text
}

const getText = (item, data) => {
    let text = item.cellValue == undefined ? truncate(data[item.field], item.truncateNum) : truncate(item.cellValue(item, data), item.truncateNum)
    return text;
}

const getTextFull = (item, data) => {
    let text = item.cellValue == undefined ? data[item.field] : item.cellValue(item, data)
    return text;
}

const IsInfo = (item, data) => {
    let text = getText(item, data);
    if (text == "")
        return false;

    if (text.length > item.truncateNum)
        return true;

    return false;
}

const op = ref();
const selectedText = ref();
const clickText = (e, item) => {
    op.value.hide();
    selectedText.value = item;
    nextTick(() => {
        op.value.show(e);
    });

}

const products = []

const addTextToPaginator = () => {
    // Paginator轉跳頁面input前後新增文字
    setTimeout(() => {
        document.querySelectorAll('.p-paginator-jtp-input .p-inputtext').forEach(el => {
            const prevSibling = el.previousSibling;
            const nextSibling = el.nextSibling;
            if (prevSibling && prevSibling.nodeType === Node.ELEMENT_NODE) {
                return;
            }
            if (nextSibling && nextSibling.nodeType === Node.ELEMENT_NODE) {
                return;
            }
            if (el) {
                const div = document.createElement('div');
                div.textContent = '跳至';
                div.className = 'flex items-center mx-2';
                el.parentNode.insertBefore(div, el);

                const divAfter = document.createElement('div');
                divAfter.textContent = '頁';
                divAfter.className = 'flex items-center mx-2';
                el.parentNode.insertBefore(divAfter, el.nextSibling);
            }
        });
        document.querySelectorAll('.p-paginator-rpp-dropdown .p-select-label').forEach(el => {
            const nextSibling = el.nextSibling;
            if (nextSibling && nextSibling.nodeType === Node.ELEMENT_NODE) {
                return;
            }
            if (el) {
                const divAfter = document.createElement('div');
                divAfter.textContent = '筆/頁';
                divAfter.className = 'flex items-center';
                el.parentNode.insertBefore(divAfter, el.nextSibling);
            }
        })
        document.querySelectorAll('.p-select-list-container .p-select-option .p-select-option-label').forEach(el => {
            if (el) {
                const divAfter = document.createElement('div');
                divAfter.textContent = '筆/頁';
                divAfter.className = 'flex items-center';
                el.parentNode.insertBefore(divAfter, el.nextSibling);
            }
        })
    }, 100);
}

const searchConditions = computed(() => props.searchConditions.filter(item => item.showFilterCondition.tableFilter))

const searchInput = ref(props.searchInput)
const clearKeyword = () => {
    searchInput.value = ''
   debouncedAjax()
}
const inputSearch = (e) => {

    debouncedAjax()
    //emit('eventSearch', searchInput.value)
}


const debouncedAjax = useDebounceFn(async () => {
   
    if(props.searchConditions.length== 0)
        return ;

    let item = props.searchConditions.firstOrDefault()
    if(item){
         item.Value =   searchInput.value as any;  
    }
   
    console.log('debouncedAjax')
    emit('eventSearchKeyWordBtn', new STAction(), props.searchConditions);

}, 500)

const inputSearchPt= {
    root: ({ props, context }) => ({
        class: [
                '!h-[32px]'
        ]
    })
}

</script>
<template>
    <div v-if="columns.length > 0" class="w-full h-full">
        <div v-if="props.searchEnable && props.searchConditions.length > 0" class="pb-2">
            <div class="w-full">

                <STFilter :props="{ condList: props.searchConditions }" @change="change" @search="searchActionItem()">
                </STFilter>
            </div>
        </div>
        <div class="py-3 flex justify-between" v-if="props.actions.length > 0 || props.searchActions.length > 0">
            <div v-if="props.actions.length > 0" class="flex justify-start gap-3">
                <div v-for="(item, index) in props.actions" :key="index">
                    <FileUpload v-if="item.Type == ActionEnum.TableImport" :id="item.Id" :name="item.Id" accept=".xlsx"
                        :maxFileSize="1000000" :auto="true" :chooseLabel="item.Text" @uploader="uploadAfter"
                        :customUpload="true" mode="basic"> </FileUpload>
                    <Button v-else @click="actionItem(item)" :disabled="controller.checkActionEnable(item)"
                        :icon="item.Icon" :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
                        :label="t(item.Text)" v-tooltip.top="item.Tooltip" />
                </div>
            </div>

           <div class="flex items-center" v-if="props.searchEnable==false">
            <IconField class="" :pt="inputSearchPt">
                <InputIcon class="pi pi-search !text-foneTextLevel1" />
                <InputText v-model="searchInput" :placeholder="t('Components.STTableView.Search_Placeholder')" class="!py-[5px]" @change="inputSearch"/>
                 <img :src="'ic_input_clear'.getIcon('svg')" alt="clear icon"
                            class="absolute right-[10px] top-[8px] cursor-pointer" v-if="searchInput != ''"
                            @click="clearKeyword">
            </IconField>

            </div>
            <!-- <div v-if="props.searchActions.length > 0">
                <Button @click="searchActionItem(item)" :disabled="!item.Enable" :icon="item.Icon"
                    :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
                    v-for="(item, index) in props.searchActions" :key="index" :label="t(item.Text)" />
            </div> -->
        </div>

        <!-- tab -->
         <div v-if="props.tabActions.length >0" class="pb-[24px] pt-[2px]">
             <STTab :actions="props.tabActions" :activeId="props.activeId" @eventActionBtn="searchActionItem"></STTab>
         </div>
       
        <DataTable v-model:selection="controller.selectedProduct.value" :value="tableDatas" scrollable resizableColumns
            columnResizeMode="fit" :scrollHeight="props.scrollHeight" tableStyle="min-width: 50rem" dataKey="id"
            v-model:expandedRows="expandedRows" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse"
            :paginator="showDefaultPaginator" :rows="10" size="small" @update:selection="updateSelection"
            :pt="style.dataTableStyleOption.value"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput"
            :rowsPerPageOptions="[10, 50, 100]"
            :currentPageReportTemplate="t('Components.STTable.Paginator_Total', { totalRecords: props.tableTotalRows })">
            <!-- :currentPageReportTemplate="`總共${props.tableTotalRows}筆，當前取{totalRecords}筆`" @update:selection="updateSelection"> -->
            <!-- :currentPageReportTemplate="t('Components.STTable.Paginator_Total_Records', { total: props.tableTotalRows, current: props.data.length })"  -->
            <!-- :selectionMode="actionColumn ? 'multiple' : null" -->
            <template #empty>
                <div class="flex flex-col items-center justify-center h-full">
                    <img class="object-contain mt-[16px]" :src="imgSearchEmpty" width="84" height="84" />
                    <div class="mt-[8px] mb-[4px] text-[24px] leading-[36px] text-foneTextLevel1 font-bold">{{ t(props.emptyTitle) }}</div>
                    <div v-if="props.emptySubTitle != '' " class="mb-[16px] text-[14px] leading-[22px] text-foneTextLevel2">{{ t(props.emptySubTitle) }}</div>
                </div>
            </template>
            <Column v-if="props.showCheckBox" selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <!-- <Column v-if="actionColumn?.actions?.length > 0" selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
            <Column expander style="width: 3rem" v-if="props.isSubTable" />

            <Column v-for="(item, index) in filterColumns" :key="index"
                :field="item.isKeyValue ? `${item.header}.value` : item.field" :header="t(item.title)"
                class="max-w-[30rem] truncate" :sortable="item.sort">
                <template #body="{ data }">
                    <div v-if="item.isImage" class="flex flex-wrap items-center max-w-72">
                        <Image class="p-1" :src="imgItem.key" :alt="imgItem.value" width="48" preview
                            v-for="imgItem in item.cellValue(item, data)" />
                    </div>
                    <div v-else-if="item.isFormItem" class="flex flex-wrap items-center max-w-72">
                        <STForm class="p-1" :items="item.cellValue(item, data)" />
                    </div>
                    <div v-else-if="item.isCellHtml == false" style="white-space:normal">
                        <span v-if="item.truncateNum == null">
                            {{ item.cellValue == undefined ? data[item.field] : item.cellValue(item, data) }}
                        </span>
                        <span v-if="item.truncateNum != null" class="truncate-text">
                            {{ getText(item, data) }}
                            <span class="pi pi-info-circle !text-blue-600 " v-if="IsInfo(item, data)"
                                @click="clickText($event, getTextFull(item, data))"></span>
                        </span>
                    </div>
                    <div v-else="item.isCellHtml" v-html="item.cellValueByHtml(item, data)" style="white-space:normal">
                    </div>
                </template>
            </Column>
            <Column :field="actionColumn.isKeyValue ? `${actionColumn.header}.value` : actionColumn.field"
                :header="t(actionColumn.title)" class="max-w-[30rem] w-[10%] truncate" v-if="!!actionColumn"
                alignFrozen="right" :frozen="props.frozen">
                <template #body="slotProps">
                    <Button v-tooltip.top="t(ac.Text)"
                        v-for="ac in props.customObject?.DataActionCustom == null ? actionColumn.actions : props.customObject.DataActionCustom(slotProps, actionColumn.actions)"
                        :icon="ac.Icon" text @click="actionItemByRow(ac, slotProps)" />
                </template>
            </Column>
            <template #expansion="slotProps" v-if="props.isSubTable">
                <div class="px-4 py-1" v-if="slotProps.data[subTableKey].length > 0">
                    <DataTable :value="slotProps.data[subTableKey]">
                        <Column v-for="(item, index) in subfilterColumns" :key="index"
                            :field="item.isKeyValue ? `${item.header}.value` : item.field" :header="item.title"
                            class="max-w-[30rem] truncate" :sortable="item.sort">
                            <template #body="{ data }">
                                <div v-if="item.isImage" class="flex flex-wrap items-center max-w-72">
                                    <Image class="p-1" :src="imgItem.key" :alt="imgItem.value" width="48" preview
                                        v-for="imgItem in item.cellValue(item, data)" />
                                </div>
                                <div v-else-if="item.isCellHtml == false">
                                    {{ item.cellValue == undefined ? data[item.field] : item.cellValue(item, data) }}
                                </div>
                                <div v-else="item.isCellHtml" v-html="item.cellValueByHtml(item, data)"></div>
                            </template>
                        </Column>
                        <Column
                            :field="subActionColumn.isKeyValue ? `${subActionColumn.header}.value` : subActionColumn.field"
                            :header="subActionColumn.title" class="max-w-[30rem] truncate" v-if="!!subActionColumn">
                            <template #body="slotProps">
                                <Button v-tooltip.top="ac.Text"
                                    v-for="ac in props.customObject?.DataActionCustom == null ? subActionColumn.actions : props.customObject.DataActionCustom(slotProps, subActionColumn.actions)"
                                    :icon="ac.Icon" text rounded :aria-label="ac.Text"
                                    @click="actionItemByRow(ac, slotProps)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
        <Paginator v-if="props.pageParams" v-model:first="props.pageParams.first" :rows="props.pageParams.pageRows"
            :totalRecords="props.pageParams.totalRows" @page="($event) => { pageChange($event) }"
            :pt="style.paginatorStyleOption.value"
            :currentPageReportTemplate="t('Components.STTable.Paginator_Total', { totalRecords: props.pageParams.totalRows })"
            template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput"
            :rowsPerPageOptions="[10, 50, 100]">
        </Paginator>
        <Popover ref="op">
            <div v-if="selectedText" class="rounded flex flex-col w-[500px]">
                <div class="max-h-[300px] overflow-auto whitespace-pre-wrap break-words">{{ selectedText }}</div>
            </div>
        </Popover>


    </div>
    <div v-else>
        <DataTable :value="products">
            <Column field="code" header="">
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column field="name" header="">
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column field="category" header="">
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column field="quantity" header="">
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
        </DataTable>
    </div>

</template>

<style lang="scss" scoped>
:deep(.p-datatable-table-container) {
    scrollbar-width: thin !important;
}

.p-paginator {
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

:deep(.p-datatable-thead) {
    .p-checkbox {
        .p-checkbox-box {
            background: transparent;
            border-color: var(--fone-text-level2);
        }
    }

    .p-checkbox-checked .p-checkbox-box {
        background: var(--fone-primary-main);
        border-color: var(--fone-primary-main);
    }
}

:deep(.p-paginator-page-selected) {
    background: var(--primary-color) !important;
    color: var(--fone-text-white) !important;
    border-radius: 4px !important;
}

:deep(.p-paginator) {
    justify-content: flex-end !important;
}
</style>
