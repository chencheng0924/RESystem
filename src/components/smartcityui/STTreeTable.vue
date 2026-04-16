<script setup lang="ts">
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Button from "primevue/button"
import { useRoute } from 'vue-router'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { STConditionItem, STDataTableAction, STDataTableColumn, STDataTableCustomFunction, STDataTablePageParams } from './STTable.model'
import STForm from './STForm.vue';
import { ActionEnum } from './STCommon.model'
import { ThemeSwitchController } from './STThemeMode.compsable';

const props = defineProps({
  
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
   
    scrollHeight: {  // 如果有指定，就不會有paginator
        type: String,
        default: null
    },
    customObject: {
        type: STDataTableCustomFunction,
        default: new STDataTableCustomFunction()
    },
    //-------------------------------------
    alignFrozen: {
        type: String,
        default: 'right'
    },
    frozen:{
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['eventActionBtn','eventActionBtnByRow'])
const actionItem = (item: STDataTableAction) => {
    emit('eventActionBtn', item)
}
const actionItemByRow = (item: STDataTableAction, data: any) => {
    emit('eventActionBtnByRow', item, data.node);
}


let themeController = new ThemeSwitchController(false);
let mode = themeController.getSearchEmptyImage();
let imgSearchEmpty = ref(mode)

const filterColumns = props.columns?.filter(x => x.isActions() == false && x.showFilterCondition?.tableColumn);
let actionColumn = props.columns?.filter(x => x.isActions() == true).firstOrDefault();

const products=[]


</script>
<template>
    <div v-if="columns.length > 0" class="w-full h-full px-[1.5rem]">

        <div class="py-3 flex justify-between" v-if="props.actions.length > 0 ">
            <div v-if="props.actions.length > 0" class="flex justify-start gap-3">
                <div v-for="(item, index) in props.actions" :key="index">

                    <Button  @click="actionItem(item)"  :icon="item.Icon"
                        :severity="item.SeverityColor" :outlined="item.IsOutlined" :text="item.IsText"
                        :label="t(item.Text)" v-tooltip.top="item.Tooltip" />
                </div>
            </div>
        </div>
        <TreeTable :value="props.data">

            <template #empty>
                <div class="flex flex-col items-center justify-center h-full gap-4 py-5">
                    <img class="object-contain" :src="imgSearchEmpty" width="84" height="84"/>
                    <div class="text-h3 text-commTextLevel1">{{ t('Layout.PageLayout.No_Data') }}</div>
                </div>
            </template>

             <Column v-if="props.showCheckBox" selectionMode="multiple" headerStyle="width: 3rem"></Column>
           
            <Column v-for="(item, index) in filterColumns" :key="index"
                :field="item.isKeyValue ? `${item.header}.value` : item.field" :header="t(item.title)"
                class="max-w-[30rem] truncate" :sortable="item.sort"
                :expander="index==0 ? true :false"
                >
                <template #body="{ data ,node}">
                    <div v-if="item.isImage" class="flex flex-wrap items-center max-w-72">
                        <Image class="p-1" :src="imgItem.key" :alt="imgItem.value" width="48" preview
                            v-for="imgItem in item.cellValue(item, data)" />
                    </div>
                    <div v-else-if="item.isFormItem" class="flex flex-wrap items-center max-w-72">
                        <STForm class="p-1" :items="item.cellValue(item, data)" />
                    </div>
                    <div v-else-if="item.isCellHtml == false" style="white-space:normal">
                       <span v-if="item.truncateNum ==null">
                            {{ item.cellValue == undefined ? data[item.field] : item.cellValue(item, data) }}
                       </span>
                   
                       <span v-if="item.truncateNum !=null"  class="truncate-text">
                           {{ item.cellValue == undefined ?  node[item.field] : item.cellValue(item, data) }}
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
            
        </TreeTable>

<!--         
        <Paginator v-if="props.pageParams" v-model:first="props.pageParams.first" :rows="props.pageParams.pageRows"
            :totalRecords="props.pageParams.totalRows" @page="($event) => { pageChange($event) }"
            :pt="style.paginatorStyleOption.value" :currentPageReportTemplate="t('Components.STTable.Paginator_Total', { totalRecords: props.pageParams.totalRows })"
            template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput" :rowsPerPageOptions="[10, 50, 100]">
        </Paginator>-->
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