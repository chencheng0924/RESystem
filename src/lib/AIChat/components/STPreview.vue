<template>
  <div class="live-preview">
    <iframe
      ref="previewFrame"
      class="preview-iframe"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from 'vue'

interface Props {
  html: string
  css: string
  js: string
}
const props = defineProps<Props>()

const previewFrame = ref<HTMLIFrameElement>()

const updateIframe=()=> {
 const iframe = previewFrame.value
  if (!iframe) return

  const doc = iframe.contentDocument
  if (!doc) return

  doc.open()
  doc.write('<!DOCTYPE html><html><head></head><body></body></html>')
  doc.close()

  // 插入 CSS
  const styleEl = doc.createElement('style')
  styleEl.textContent = `
    html, body { width: 100%; height: 100%; margin: 0; padding: 0; box-sizing: border-box; }
    ${props.css}
  `
  doc.head.appendChild(styleEl)

  // 插入 HTML
  const htmlWrapper = doc.createElement('div')
  htmlWrapper.innerHTML = props.html
  doc.body.appendChild(htmlWrapper)

  // 插入 JS 包在 window.onload
  const scriptEl = doc.createElement('script')
  scriptEl.type = 'text/javascript'
  scriptEl.textContent = `
    window.onload = () => {
      try {
        ${props.js}
      } catch (e) {
        console.error('Preview JS Error:', e)
      }
    }
  `
  doc.body.appendChild(scriptEl)
}



onMounted(() => {
  nextTick(() => {
    updateIframe()
  })
})

watch(() => [props.html, props.css, props.js], () => {
  updateIframe()
})

</script>

<style scoped>
.live-preview {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
