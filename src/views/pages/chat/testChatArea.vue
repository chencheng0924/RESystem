<template>
  <div class="chat-page">
    <div class="chat-card">
      <Conversation class="chat-conversation">
        <ConversationContent v-if="messages.length > 0">
          <Message v-for="item in messages" :key="item.id" :from="item.role">
            <MessageContent>
              <MessageResponse v-if="item.text" :content="item.text" />

              <div v-if="item.files.length > 0" class="attachment-list">
                <template v-for="file in item.files" :key="file.filename + file.previewUrl">
                  <img
                    v-if="isImageFile(file)"
                    :src="file.previewUrl"
                    :alt="file.filename ?? 'uploaded image'"
                    class="attachment-image"
                  >
                  <a v-else :href="file.previewUrl" target="_blank" rel="noopener" class="attachment-link">
                    {{ file.filename || "附件" }}
                  </a>
                </template>
              </div>
            </MessageContent>
          </Message>
        </ConversationContent>

        <ConversationEmptyState v-else title="尚無訊息" description="輸入第一句話開始聊天" />
        <ConversationScrollButton />
      </Conversation>

      <PromptInput
        class="chat-input"
        accept="image/*"
        multiple
        @submit="handleSubmit"
        @error="handlePromptError"
      >
        <PromptInputHeader>
          <PromptPendingAttachments />
        </PromptInputHeader>
        <PromptInputBody>
          <PromptInputTextarea placeholder="輸入訊息，Enter 送出、Shift+Enter 換行" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments label="上傳圖片或檔案" />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>

            <PromptInputSpeechButton />
          </PromptInputTools>
          <PromptInputSubmit :disabled="isSending">
            <template #default>
              <img src="@/assets/img/icon/ic_send_light.svg" alt="">
            </template>
          </PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>

      <p v-if="promptError" class="prompt-error">
        {{ promptError }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FileUIPart } from "ai"
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input"
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation"
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInput,
} from "@/components/ai-elements/prompt-input"
import { computed, defineComponent, h, ref } from "vue"

type LocalMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  files: LocalAttachment[]
}

type LocalAttachment = {
  filename: string | undefined
  mediaType: string | undefined
  previewUrl: string
}

const messages = ref<LocalMessage[]>([])
const isSending = ref(false)
const promptError = ref("")
const speechSupported = typeof window !== "undefined"
  && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

const PromptPendingAttachments = defineComponent({
  name: "PromptPendingAttachments",
  setup: () => {
    const { files, removeFile } = usePromptInput()
    const previewFiles = computed(() => files.value.slice(0, 4))

    return () => {
      if (previewFiles.value.length === 0) {
        return null
      }

      return h(
        "div",
        { class: "pending-attachments" },
        previewFiles.value.map(file =>
          h("div", { class: "pending-item", key: file.id }, [
            file.mediaType?.startsWith("image/")
              ? h("img", {
                  class: "pending-thumb",
                  src: file.url,
                  alt: file.filename || "attachment",
                })
              : h("span", { class: "pending-file" }, file.filename || "附件"),
            h(
              "button",
              {
                class: "pending-remove",
                type: "button",
                onClick: () => removeFile(file.id),
              },
              "×",
            ),
          ]),
        ),
      )
    }
  },
})

const handleSubmit = async (payload: PromptInputMessage) => {
  const text = payload.text.trim()
  const files = normalizeFiles(payload.files || [])
  promptError.value = ""

  if ((!text && files.length === 0) || isSending.value) {
    return
  }

  messages.value.push({
    id: `user-${Date.now()}`,
    role: "user",
    text,
    files,
  })

  isSending.value = true

  await new Promise(resolve => setTimeout(resolve, 300))

  messages.value.push({
    id: `assistant-${Date.now()}`,
    role: "assistant",
    text: files.length > 0 ? `已收到：${text || "(無文字)"}，附件 ${files.length} 個` : `已收到：${text}`,
    files: [],
  })

  isSending.value = false
}

const isImageFile = (file: LocalAttachment) => {
  return Boolean(file.mediaType?.startsWith("image/"))
}

const handlePromptError = (error: { code: string; message: string }) => {
  promptError.value = error.message
}

const normalizeFiles = (files: FileUIPart[]) => {
  return files
    .map((raw) => {
      const source = raw as FileUIPart & { file?: File; url?: string }
      let previewUrl = source.url || ""

      if (!previewUrl && source.file instanceof File) {
        previewUrl = URL.createObjectURL(source.file)
      }

      if (!previewUrl) {
        return null
      }

      return {
        filename: source.filename,
        mediaType: source.mediaType,
        previewUrl,
      }
    })
    .filter((item): item is LocalAttachment => item !== null)
}
</script>

<style scoped lang="scss">
.chat-page {
  height: calc(100vh - 120px);
  padding: 16px;
}

.chat-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}

.chat-conversation {
  flex: 1;
  min-height: 0;
}

.chat-input {
  border-top: 1px solid #e5e7eb;
}

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.attachment-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.attachment-link {
  color: #2563eb;
  text-decoration: underline;
}

.prompt-error {
  margin: 0;
  padding: 8px 12px;
  color: #dc2626;
  font-size: 13px;
}

.pending-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  padding: 8px 8px 0;
}

.pending-item {
  position: relative;
}

.pending-thumb {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.pending-file {
  display: inline-block;
  max-width: 140px;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 12px;
  background: #f3f4f6;
}

.pending-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 999px;
  color: #fff;
  background: #111827;
  line-height: 18px;
  cursor: pointer;
}
</style>