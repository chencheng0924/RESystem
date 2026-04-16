<template>
  <div class="flex flex-col gap-[1rem] py-[1.5%]">
    <div class="text-2xl font-bold">派工管理</div>
    <Button label="新增派工" icon="pi pi-plus" class="w-max h-[34px]" @click="controller.addWorkOrder()" />
    <DataTable :value="controller.dataList.value" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]">
      <Column field="woId" header="派工 ID"></Column>
      <Column field="woRtId" header="案件 ID"></Column>
      <!-- <Column field="woStaffLine" header="師傅 LINE"></Column> -->
      <Column field="woStaffName" header="師傅姓名"></Column>
      <Column field="woStaffPhone" header="師傅電話"></Column>
      <Column field="woStatusTypeId" header="狀態類型"></Column>
      <Column field="woScheduledAt" header="預約時間">
        <template #body="slotProps">
          <span>{{ formatScheduledAtDisplay(slotProps.data.woScheduledAt) }}</span>
        </template>
      </Column>
      <Column field="woRepairContent" header="派工內容"></Column>
      <Column field="woImages" header="圖片">
        <template #body="slotProps">
          <div v-if="slotProps.data.woImages" class="flex items-center gap-2">
            <img :src="slotProps.data.woImages" alt="圖片" class="w-[100px] h-[100px]" />
          </div>
          <div v-else>
            <span>無圖片</span>
          </div>
        </template>
      </Column>
      <Column field="actions" header="操作">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <Button label="編輯" icon="pi pi-pencil" @click="controller.editWorkOrder(slotProps.data)" />
            <Button label="刪除" icon="pi pi-trash" />
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="controller.isWorkOrderDialogVisible.value" :modal="true">
      <template #header>
        <h3>{{ controller.workOrderDialogHeader.value }}</h3>
      </template>
      <div class="flex flex-col gap-[1rem]">
        <div v-for="item in controller.workOrderDialogFormList.value" :key="item.field" class="flex items-center gap-[1rem]">
          <label class="w-[100px]">{{ item.label }}:</label>
          <InputText
            v-if="item.type === 'input'"
            :model-value="controller.workOrderDialogForm.value[item.field]"
            @update:model-value="(v: string) => (controller.workOrderDialogForm.value[item.field] = v)"
          />
          <DatePicker
            v-if="item.type === 'date'"
            v-model="scheduledAtPicker"
            show-time
            hour-format="24"
            fluid
            show-icon
            icon-display="input"
            class="min-w-[240px]"
          />
        </div>
      </div>
      <template #footer>
        <Button label="取消" icon="pi pi-times" class="w-max h-[34px]" @click="controller.isWorkOrderDialogVisible.value = false" />
        <Button label="確認" icon="pi pi-check" class="w-max h-[34px]" @click="controller.submitWorkOrder()" />
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DatePicker from 'primevue/datepicker';
import { DemoRepairController } from '@/composables/demo/demoRepair.controller';

const controller = new DemoRepairController();

/** 列表顯示：年月日 時分秒 */
function formatScheduledAtDisplay(value: unknown): string {
  if (value == null || value === '') return '';
  const m = moment(value as string);
  return m.isValid() ? m.format('YYYY-MM-DD HH:mm:ss') : String(value);
}

function parseWoScheduledAt(s: string): Date | null {
  if (!s?.trim()) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
  if (m) {
    const d = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s.replace(' ', 'T'));
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatWoScheduledAt(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** DatePicker 綁定 Date，表單仍存 API 字串 `YYYY-MM-DD HH:mm:ss` */
const scheduledAtPicker = computed({
  get: () => parseWoScheduledAt(controller.workOrderDialogForm.value.woScheduledAt),
  set: (v: Date | Date[] | null | undefined) => {
    if (v == null) {
      controller.workOrderDialogForm.value.woScheduledAt = '';
      return;
    }
    const raw = Array.isArray(v) ? v[0] : v;
    if (!(raw instanceof Date) || Number.isNaN(raw.getTime())) {
      controller.workOrderDialogForm.value.woScheduledAt = '';
      return;
    }
    controller.workOrderDialogForm.value.woScheduledAt = formatWoScheduledAt(raw);
  },
});
</script>
<style scoped lang="scss">

</style>
