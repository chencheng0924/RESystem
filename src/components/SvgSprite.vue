<template>
  <!-- 隱藏 SVG Sprite -->
  <div v-html="spriteContent" style="display: none;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// ?raw 會直接讀文字內容
//import spriteRaw from '@/assets/sprites/symbol.svg?raw';

import spriteRaw from '@/assets/sprites/sprite.symbol.svg?raw';

const spriteContent = ref('');

onMounted(() => {
  spriteContent.value = spriteRaw;
});
</script>
