<script lang="ts" setup>
import { DemoClientFormController } from '@/composables/demo/demoClientForm.controller';

const controller = new DemoClientFormController();
</script>
<template>
  <div class="min-h-screen bg-[#f3f5f8] px-[14px] pb-[28px] pt-[16px]">
    <div class="mb-3 rounded-[14px] bg-gradient-to-br from-[#1756d8] to-[#3d8df5] px-4 py-[18px] text-white">
      <h1 class="m-0 text-[1.2rem] font-bold leading-[1.35] text-white">住戶報修表單</h1>
      <p class="mb-0 mt-2 text-[0.9rem] opacity-80">請完整填寫以下資訊，我們會盡快協助處理。</p>
    </div>

    <div
      v-if="controller.liffErrorMessage.value"
      class="mb-3 rounded-[10px] bg-[#ffe8e8] px-3 py-[10px] text-[0.84rem] text-[#b42318]"
    >
      {{ controller.liffErrorMessage.value }}
    </div>

    <div class="rounded-[14px] bg-white p-[14px] shadow-[0_8px_24px_rgba(26,41,66,0.08)]">
      <div v-for="item in controller.fieldMeta" :key="item.key" class="mb-3 flex flex-col gap-1.5">
        <label class="text-[0.9rem] font-semibold text-[#1f2937]">
          {{ item.label }}
          <span class="ml-0.5 text-[#f04438]">*</span>
        </label>

        <textarea
          v-if="item.textarea"
          v-model="controller.form.value[item.key]"
          class="min-h-[92px] w-full resize-y rounded-[10px] border border-[#d0d7e2] bg-white px-3 py-[10px] text-[0.93rem] text-[#1f2937] outline-none transition-colors focus:border-[#3b82f6]"
          :placeholder="item.placeholder"
          rows="4"
        />
        <input
          v-else
          v-model="controller.form.value[item.key]"
          class="w-full rounded-[10px] border border-[#d0d7e2] bg-white px-3 py-[10px] text-[0.93rem] text-[#1f2937] outline-none transition-colors focus:border-[#3b82f6]"
          :type="item.type || 'text'"
          :placeholder="item.placeholder"
        />

        <p v-if="controller.errors.value[item.key]" class="m-0 text-[0.8rem] text-[#b42318]">
          {{ controller.errors.value[item.key] }}
        </p>
      </div>

      <button
        class="w-full rounded-xl border-0 bg-[#1756d8] p-3 text-[0.98rem] font-bold text-white disabled:opacity-70"
        :disabled="controller.isSubmitting.value"
        @click="controller.submit()"
      >
        {{ controller.isSubmitting.value ? '送出中...' : '送出報修' }}
      </button>
    </div>

    <Dialog v-model:visible="controller.isSuccessDialogVisible.value" :modal="true" :closable="false" class="w-[90vw] max-w-[360px]">
      <template #header>
        <h3 class="m-0 text-base font-bold">送出成功</h3>
      </template>
      <div class="text-[0.92rem] leading-7 text-[#1f2937]">
        已收到您的報修資料，請按下方按鈕關閉頁面。
      </div>
      <template #footer>
        <Button label="關閉頁面" icon="pi pi-times" class="w-full h-[40px]" @click="controller.closePage()" />
      </template>
    </Dialog>

    <Dialog v-model:visible="controller.isSubmitting.value" :modal="true" :closable="false" :draggable="false" class="w-[84vw] max-w-[320px]">
      <template #header>
        <h3 class="m-0 text-base font-bold">資料送出中</h3>
      </template>
      <div class="flex items-center gap-3 py-1 text-[0.92rem] text-[#1f2937]">
        <i class="pi pi-spin pi-spinner text-[1.1rem] text-[#1756d8]"></i>
        <span>請稍候，正在送出您的報修資料...</span>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="controller.isErrorDialogVisible.value"
      :modal="true"
      :closable="false"
      class="w-[90vw] max-w-[360px]"
    >
      <template #header>
        <h3 class="m-0 text-base font-bold text-[#b42318]">送出失敗</h3>
      </template>
      <div class="text-[0.92rem] leading-7 text-[#1f2937]">
        {{ controller.errorDialogMessage.value }}
      </div>
      <template #footer>
        <Button label="我知道了" icon="pi pi-check" class="w-full h-[40px]" @click="controller.closeErrorDialog()" />
      </template>
    </Dialog>
  </div>
</template>