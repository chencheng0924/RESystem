<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { VMarkdownView, VMarkdownEditor } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'
import MarkdownIt from 'markdown-it'
import mermaid from 'mermaid'

const md = new MarkdownIt()
const defaultFence = md.renderer.rules.fence!;
md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];
  if (token.info.trim() === 'mermaid') {
    return `<div class="mermaid">${token.content}</div>`;
  }
  return defaultFence(tokens, idx, options, env, slf);
};


const props = defineProps({
    content: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        default: 'light'
    },
    isView: {
        type: Boolean,
        default: true
    },
    isMermaid: {
        type: Boolean,
        default: false
    },
    index: {
        type: Number,
        default: 0
    }
})
let c = ref(props.content)

watch(() => props.content,
    (newValue, oldValue) => {
        c.value = newValue;
    }
)
const emit = defineEmits(['update:modelValue'])



watch(() => c.value,
    (newValue, oldValue) => {
        renderMermaid()
        emit('update:modelValue', newValue)
    }
)

const pt = {
    root: {
        class: ['!shadow-none']
    }
}

const renderMermaid = () => {
    console.log('props.isMermaid',props.isMermaid)
    console.log('c',c.value)
    nextTick(() => {
        const els = document.querySelectorAll('.mermaid');
        els.forEach((el, idx) => {
            const code = el.textContent || '';
            // id 每次都唯一
            const id = `mermaid-graph-${new Date().getTime()}-${props.index}-${idx}`;
            mermaid.render(id, code).then(({svg}) => {
                el.innerHTML = svg;
            })
        });
    });
}

onMounted(renderMermaid);

</script>

<template>
    <div class="w-full pt-2 pb-2">
        <div>
            <div v-if="props.isMermaid">
                <div v-if="c !== ''" v-html="md.render(c)" />
                <div v-else class="p-3">{{ $t('AIChatRoom.Action_Log_Empty_Content') }}</div>
            </div>
            <VMarkdownView v-if="props.isView && !props.isMermaid" :mode="props.mode" :content="c">
            </VMarkdownView>
            <VMarkdownEditor v-if="props.isView == false && !props.isMermaid" v-model="c">
            </VMarkdownEditor>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.markdown-body {
    outline: none !important;
    padding: 1rem !important;
}
</style>