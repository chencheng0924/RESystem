<template>
  <div class="flex flex-col gap-[1rem] py-[1.5%]">
    <div class="text-2xl font-bold">維修人員綁定碼</div>
    <div class="flex items-center gap-[0.75rem]">
      <InputText
        :model-value="controller.tokenText.value"
        readonly
        placeholder="按下按鈕後會顯示 API 回傳內容"
        class="w-[520px]"
      />
      <Button
        label="產生綁定碼"
        icon="pi pi-refresh"
        :loading="controller.isGenerating.value"
        class="w-max h-[34px]"
        @click="controller.generateBindingCode()"
      />
    </div>
    <DataTable :value="controller.dataList.value" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]">
      <Column v-for="field in controller.tableColumns.value" :key="field" :field="field" :header="field">
        <template v-if="field === 'rsStatus'" #body="slotProps">
          <span>{{ slotProps.data.rsStatus === true ? '啟用' : '不啟用' }}</span>
        </template>
        <template v-else-if="field === 'createdAt' || field === 'updatedAt'" #body="slotProps">
          <span>{{ formatDate(slotProps.data[field]) }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { DemoRepairStaffController } from '@/composables/demo/demoRepairStaff.controller';

const controller = new DemoRepairStaffController();

function formatDate(value: unknown): string {
  if (value == null || value === '') return '';
  const m = moment(value as string);
  return m.isValid() ? m.format('YYYY-MM-DD HH:mm:ss') : String(value);
}
</script>
<style scoped lang="scss">

</style>