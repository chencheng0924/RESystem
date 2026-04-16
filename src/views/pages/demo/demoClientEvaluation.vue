<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import SignaturePad from 'signature_pad';
import { DemoClientEvaluationController } from '@/composables/demo/demoClientEvaluation.controller';

const controller = new DemoClientEvaluationController();
const canvasRef = ref<HTMLCanvasElement | null>(null);
let signaturePad: SignaturePad | null = null;
const scoreItems: Array<{ key: 'srOverallScore' | 'srAttitudeScore' | 'srQualityScore' | 'srTimelinessScore'; label: string }> = [
  { key: 'srOverallScore', label: '整體滿意度' },
  { key: 'srAttitudeScore', label: '服務態度' },
  { key: 'srQualityScore', label: '維修品質' },
  { key: 'srTimelinessScore', label: '處理時效' },
];

const initSignaturePad = async () => {
  await nextTick();
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const cssWidth = canvas.clientWidth || 320;
  const cssHeight = 190;
  canvas.width = cssWidth * ratio;
  canvas.height = cssHeight * ratio;
  const context = canvas.getContext('2d');
  if (context) {
    context.scale(ratio, ratio);
  }

  signaturePad = new SignaturePad(canvas, {
    minWidth: 1,
    maxWidth: 3,
    penColor: '#111827',
    backgroundColor: 'rgba(255,255,255,0)',
  });
};

const clearSignature = () => {
  signaturePad?.clear();
};

const submit = async () => {
  const signatureDataUrl = signaturePad && !signaturePad.isEmpty() ? signaturePad.toDataURL('image/png') : '';
  await controller.submit(signatureDataUrl);
};

const closeSubmittingDialog = () => {
  return;
};

onMounted(() => {
  initSignaturePad();
});

onBeforeUnmount(() => {
  signaturePad?.off();
  signaturePad = null;
});
</script>

<template>
  <div class="min-h-screen bg-white px-5 pb-7 pt-4">
    <h1 class="mb-2 text-center text-[2rem] font-semibold tracking-[0.15em] text-[#222222]">客戶滿意度調查</h1>
    <h3 class="mb-4 text-center text-[1.2rem] font-bold text-[#6b7280]">案件編號：{{ controller.caseID.value }}</h3>
    <p class="mb-2 text-[1.2rem] font-bold text-[#222222] whitespace-nowrap">
      <span class="text-[#f04438]">*</span>
      星等說明 ( 5★ 非常滿意、1★ 非常不滿意 )
    </p>

    <div v-for="item in scoreItems" :key="item.key" class="mb-5">
      <p class="mb-2 text-[1.05rem] font-semibold text-[#222222]">
        <span class="text-[#f04438]">*</span>
        {{ item.label }}
      </p>
      <div class="flex flex-wrap justify-center gap-1 sm:gap-3">
        <button
          v-for="score in 5"
          :key="`${item.key}-${score}`"
          type="button"
          class="flex h-[50px] w-[50px] items-center justify-center border-none bg-transparent p-0 sm:h-[76px] sm:w-[76px]"
          @click="controller.setScore(item.key, score)"
        >
          <i
            class="pi !text-[2rem] sm:text-[3rem]"
            :class="controller.form.value[item.key] >= score ? 'pi-star-fill text-[#1ab9c8]' : 'pi-star text-[#97a3b6]'"
          ></i>
        </button>
      </div>
    </div>

    <p v-if="controller.liffErrorMessage.value" class="mb-3 text-[0.92rem] text-[#b42318]">
      {{ controller.liffErrorMessage.value }}
    </p>
    <p v-if="controller.caseIDErrorMessage.value" class="mb-3 text-[0.92rem] text-[#b42318]">
      {{ controller.caseIDErrorMessage.value }}
    </p>

    <label class="mb-2 block text-[1.15rem] font-medium text-[#222222]">意見回饋</label>
    <textarea
      v-model="controller.form.value.srComment"
      maxlength="1000"
      rows="5"
      placeholder="請輸入內容（最多1000字）"
      class="mb-4 w-full resize-none rounded-xl border border-[#d0d7e2] bg-white px-3 py-3 text-[1.1rem] outline-none focus:border-[#1ab9c8]"
    />

    <div class="mb-2 flex items-center justify-between">
      <label class="block text-[1.15rem] font-medium text-[#222222]">
        <span class="text-[#f04438]">*</span>
        手寫簽名
      </label>
      <button type="button" class="rounded-lg border border-[#d0d7e2] bg-white px-3 py-1 text-[0.95rem]" @click="clearSignature">
        清除重簽
      </button>
    </div>
    <div class="mb-6 rounded-xl border border-[#d0d7e2] bg-[#fcfdff] p-2">
      <canvas ref="canvasRef" class="signature-canvas block h-[190px] w-full rounded-lg bg-white"></canvas>
    </div>

    <p class="mb-8 text-[1.4rem] leading-[1.5] text-[#333333]">感謝您完成報修，請協助填寫問卷調查，以提升服務品質。</p>

    <button
      type="button"
      class="h-[56px] w-full rounded-full border-0 bg-[#1ab9c8] text-[1.8rem] font-bold text-white disabled:opacity-70"
      :disabled="controller.isSubmitting.value || !!controller.caseIDErrorMessage.value || !!controller.liffErrorMessage.value"
      @click="submit()"
    >
      {{ controller.isSubmitting.value ? '送出中...' : '填寫完成' }}
    </button>

    <Dialog v-model:visible="controller.isSuccessDialogVisible.value" :modal="true" :closable="false" class="w-[90vw] max-w-[360px]">
      <template #header>
        <h3 class="m-0 text-base font-bold">送出成功</h3>
      </template>
      <div class="text-[0.92rem] leading-7 text-[#1f2937]">已收到您的問卷資料，請按下方按鈕關閉頁面。</div>
      <template #footer>
        <Button label="關閉頁面" icon="pi pi-times" class="h-[40px] w-full" @click="controller.closePage()" />
      </template>
    </Dialog>

    <Dialog v-model:visible="controller.isSubmitting.value" :modal="true" :closable="false" :draggable="false" class="w-[84vw] max-w-[320px]">
      <template #header>
        <h3 class="m-0 text-base font-bold">資料送出中</h3>
      </template>
      <div class="flex items-center gap-3 py-1 text-[0.92rem] text-[#1f2937]">
        <i class="pi pi-spin pi-spinner text-[1.1rem] text-[#1756d8]"></i>
        <span>請稍候，正在送出您的問卷資料...</span>
      </div>
      <template #footer>
        <Button label="請稍候" class="h-[40px] w-full" disabled @click="closeSubmittingDialog()" />
      </template>
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
        <Button label="我知道了" icon="pi pi-check" class="h-[40px] w-full" @click="controller.closeErrorDialog()" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.signature-canvas {
  touch-action: none;
}
</style>
