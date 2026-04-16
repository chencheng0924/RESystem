<template>
  <div class="flex flex-col gap-[1rem] py-[1.5%]">
    <div class="text-2xl font-bold">評價管理</div>
    <DataTable :value="controller.dataList.value" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]">
      <Column field="srRtId" header="案件 ID"></Column>
      <Column field="srId" header="評價 ID"></Column>
      <Column field="srWoId" header="派工 ID"></Column>
      <Column field="srOverallScore" header="整體評分"></Column>
      <Column field="srAttitudeScore" header="態度"></Column>
      <Column field="srQualityScore" header="品質"></Column>
      <Column field="srTimelinessScore" header="時效"></Column>
      <Column field="srComment" header="評論"></Column>
      <Column field="srSignedName" header="簽名姓名"></Column>
      <Column field="srSignatureUrl" header="簽名圖">
        <template #body="slotProps">
          <a
            v-if="slotProps.data.srSignatureUrl"
            :href="`${demoApiUrl}${slotProps.data.srSignatureUrl}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline"
          >
            連結
          </a>
          <span v-else>—</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { DemoRatingController } from '@/composables/demo/demoRating.controller';

const controller = new DemoRatingController();
const demoApiUrl = import.meta.env.VITE_DEMO_API_URL;
</script>
<style scoped lang="scss">

</style>
