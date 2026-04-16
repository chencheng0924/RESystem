<template>
  <div class="number-ticker">
    <span class="number-display" :style="{ fontSize: fontSize, color: color, fontWeight: fontWeight }">
      {{ displayValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Props {
  value: number
  duration?: number
  fontSize?: string
  color?: string
  fontWeight?: string
  format?: (value: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1000,
  fontSize: '2rem',
  color: '#333',
  fontWeight: 'bold',
  format: (value: number) => value.toLocaleString()
})

const displayValue = ref(props.format(props.value))

// 數字動畫函數
const animateNumber = (startValue: number, endValue: number) => {
  const startTime = Date.now()
  const duration = props.duration

  const updateNumber = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用 easeOutQuart 緩動函數
    const easeProgress = 1 - Math.pow(1 - progress, 4)
    const currentValue = startValue + (endValue - startValue) * easeProgress

    displayValue.value = props.format(Math.round(currentValue))

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

// 監聽 value 變化
watch(() => props.value, (newValue, oldValue) => {
  if (oldValue !== undefined && newValue !== oldValue) {
    animateNumber(oldValue, newValue)
  } else {
    displayValue.value = props.format(newValue)
  }
}, { immediate: true })

onMounted(() => {
  displayValue.value = props.format(props.value)
})
</script>

<style scoped>
.number-ticker {
  display: inline-block;
}

.number-display {
  transition: all 0.3s ease;
}
</style> 