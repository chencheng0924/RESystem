<template>
  <div class="flex flex-col gap-[1rem] py-[1.5%]">
    <div class="text-2xl font-bold">案件管理</div>
    <Button label="新增案件" icon="pi pi-plus" class="w-max h-[34px]" @click="controller.addRepairTicket()" />
    <DataTable :value="controller.dataList.value" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]">
      <Column field="rtCode" header="案件編號"></Column>
      <Column field="rtCommunityName" header="社區"></Column>
      <Column field="rtUnit" header="單位"></Column>
      <Column field="rtAddress" header="地址"></Column>
      <Column field="rtResidentName" header="住戶名稱"></Column>
      <Column field="rtContactName" header="聯絡人"></Column>
      <Column field="rtTitle" header="主旨"></Column>
      <Column field="rtDescription" header="描述"></Column>
      <Column field="ticketStatus" header="狀態">
        <template #body="slotProps">
          <span>{{ slotProps.data.ticketStatus.rtsName }}</span>
        </template>
      </Column>
      <Column field="actions" header="操作">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <Button label="編輯" icon="pi pi-pencil" @click="controller.editRepairTicket(slotProps.data)" />
            <Button label="刪除" icon="pi pi-trash" />
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="controller.isAddRepairTicketDialogVisible.value" :modal="true">
      <template #header>
        <h3>{{ controller.addRepairTicketDialogHeader.value }}</h3>
      </template>
      <div class="flex flex-col gap-[1rem]">
        <div v-for="item in controller.addRepairTicketDialogFormList.value" :key="item.field" class="flex items-center gap-[1rem]">
          <label class="w-[70px]">{{ item.label }}:</label>
          <InputText v-if="item.type === 'input'" v-model="controller.addRepairTicketDialogForm.value[item.field]" />
        </div>
      </div>
      <template #footer>
        <Button label="取消" icon="pi pi-times" class="w-max h-[34px]" @click="controller.isAddRepairTicketDialogVisible.value = false" />
        <Button label="確認" icon="pi pi-check" class="w-max h-[34px]" @click="controller.submitRepairTicket()" />
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { DemoHomeController } from '@/composables/demo/demoHome.controller'
const controller = new DemoHomeController()
</script>
<style scoped lang="scss">

</style>