<script setup lang="ts">
import Galleria from 'primevue/galleria'
import { CommentType } from '../../model/STAIChat.model'
import Popover from 'primevue/popover';
import moment from 'moment'
import { useRoute } from 'vue-router'
import { ref, watch, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n'
import { VMarkdownView } from 'vue3-markdown'
import { VoiceStatus } from '../../model/Voice.model'
import STLivePreview from '../STLivePreview.vue'
const route = useRoute()
const { t, locale } = useI18n()
import { useAiChatRoom, useStyle } from './STAIChatRoom.controller'
let store = useAIChatStore()


const style = new useStyle()
const emit = defineEmits(['openDialog', 'voicePlay', 'voiceStopPlay'])
const popoverRef = ref();
const controller = new useAiChatRoom(t, locale, route, emit, popoverRef)
const props = withDefaults(defineProps<{
  dataList?: Array<any>,
  isloading?: boolean,
  showResTime?: boolean,
  playStatus?: { index: number, status: VoiceStatus }
  messageBarList?: Array<{ icon: string, text: string, click: () => void }>,
  preview?:boolean
}>(), {
  dataList: () => ([]),
  isloading: () => (false),
  showResTime: () => (true),
  playStatus: () => ({ index: 0, status: VoiceStatus.STOPPED }),
  messageBarList: () => ([]),
  preview:()=>(false)
})

const chatList = computed(() => props.dataList as any[])
const isTypeing = computed(() => props.isloading)
const dynamicList = computed(() => {
  return controller.currentCommentType.value === CommentType.good ? controller.goodCommentList.value : controller.badCommentList.value;
});
const chatContainer = ref(null)
const move = () => {
  nextTick(() => {
    const container = chatContainer.value;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
}
const playStatus = computed(() => props.playStatus)

watch(() => chatList, (nv) => {
  move()
}, {
  immediate: true,
  deep: true,
})
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useAIChatStore } from '../../store/AIChatStore';
marked.setOptions({
  breaks: true, // <-- 加這行
  gfm: true
})

const isBase64 = (str: string) => {
  // 長度大於100且只包含 base64 字元
  return typeof str === 'string' && str.length > 100 && /^[A-Za-z0-9+/=]+$/.test(str);
}

const isJsonString = (str: string) => {
  // 判斷是不是json字串
  if (typeof str !== 'string') return false;
  try {
    const obj = JSON.parse(str);
    // 解析後是物件或陣列才算
    return obj && (typeof obj === 'object' || Array.isArray(obj));
  } catch (e) {
    return false;
  }
}

const chatContent = (item: any) => {
  let content = item.snapshot?.content ?? null;
  if (!content) return ''

  let contentType = item.snapshot?.contentType ?? 'text';

  if(contentType != undefined && contentType != null && contentType.indexOf("image/") != -1){
    return `<img src="data:${contentType};base64,${content}" alt="base64 image" style="max-width: 100%; height: auto; width: 6.25rem; height: 5rem; cursor: pointer;" />`
  }

  //console.log(item)
  // 檢查是否為 base64 字串
  if (isJsonString(content)) {
    const contentJson = JSON.parse(content)
    if( contentJson.data ==undefined || contentJson.data ==null){
      return DOMPurify.sanitize(marked(content) as string)
    }
    if(contentJson.data?.contentType ==undefined || contentJson.data?.contentType ==null){
      return DOMPurify.sanitize(marked(content) as string)
    }


    return `<img src="data:${contentJson.data.contentType};base64,${contentJson.data.content}" alt="base64 image" style="max-width: 100%; height: auto; width: 6.25rem; height: 5rem; cursor: pointer;" />`
  } 
  //"contentType": "image/png",
  
  else if (isBase64(content)) {
    return `<img src="data:image/png;base64,${content}" alt="base64 image" style="max-width:  100%; height: auto; width: 6.25rem; height: 5rem; cursor: pointer;" />`
  }
  return DOMPurify.sanitize(marked(content) as string)
}



const getStepLogData = (item:any) => {
  if (item ==undefined || item == null) 
  return []

  let content:string = item.content;
  let logid:string = item.logid;
  let currentSpeakers = store.messageLogData.filter(x => x.id == logid);
  if(currentSpeakers.length ==0)
    return [];


  return currentSpeakers;
}

const logchatContent=(content: string)=>{
  if (!content) return ''

 
  let c =  DOMPurify.sanitize(marked(content) as string)
  return `<div class="pi pi-lightbulb pr-[4px]"> </div><div>${c}</div>`;
}


const commentDisable = computed(() => {
  return controller.commentInputMes.value == '' && (controller.commentScore.value == 0 || controller.commentScore.value == null) && controller.selectCommentList.value.length == 0
})
</script>
<template>
  <!-- <div class="flex flex-col gap-[1rem] h-[calc(100vh-244px)] overflow-auto" ref="chatContainer"> -->
  <div class="flex flex-col gap-[1rem] h-full overflow-auto" ref="chatContainer">
    <!--  -->
    <div v-for="(item, index) in chatList" :key="index" class="self-start flex gap-[0.5rem]"
      :class="{ 'self-end items-end': !item.snapshot?.isResType, 'hidden': !item.snapshot?.content && !item.snapshot?.imgList }">
      <!-- <img v-if="item.snapshot?.isResType" class="w-[32px] self-start" src="@/assets/img/STAichat/chatAvatar.svg" alt=""> -->
      <div class="w-full flex flex-col" v-if="Object.values(item.snapshot).length > 0"
        :class="{ 'items-end': !item.snapshot.isResType }">

        <!-- 其他信息 -->
        <div v-for="log in getStepLogData(item.snapshot)" class="p-[12px] w-full text-foneTextLevel1 bg-foneBgLevel6 rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] mb-2">
          <div class="flex justify-start items-baseline" v-html="logchatContent(log.content)" ></div>
        </div>
       

        <div class="p-[12px] w-full text-foneTextLevel1"
          :class="{ 'bg-fonePrimaryBg rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]': !item.snapshot?.isResType, 'bg-transparent border-none px-0 py-[4px] border-[1px] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px]': item.snapshot?.isResType }">
          <!-- <div class="text-foneTextLevel1">{{ item.snapshot.content }}</div> -->
          <!-- <VMarkdownView :content="item.snapshot.content" :mode="'dark'" /> -->
          <div v-html="chatContent(item)" @click="controller.openHostoryImgShow($event, item.snapshot.content)"></div>
          <!-- <div v-html="safeHtml"></div> -->
          <div class="flex items-center flex-wrap max-w-[13rem] gap-2 mt-[0.5rem]"
            v-if="item.snapshot.imgList && item.snapshot.imgList.length">
            <div v-for="(item2, index2) in item.snapshot.imgList" :key="index2">
              <img @click="controller.openImgShow(item.snapshot.imgList, index2)"
                class="w-[6.25rem] h-[5rem] object-contain cursor-pointer" :src="item2.img" alt="">
            </div>
          </div>
        </div>
        <div class="self-start flex gap-2 mt-1 text-foneTextLevel1 flex-col"
          :class="{ 'self-end': !item.snapshot.isResType }">
          <div class="flex items-center gap-[8px]" v-if="item.snapshot.isResType">
            <!-- 預設為下面四個，若有帶入messageBarList，則會動態增加icon -->
            <span class="cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick" v-for="(item2, index2) in controller.convertActions(props)" :key="index2" :class="`${item2.icon}`" v-tooltip.bottom="item2.tooltip" @click="item2.click($event, item2.type, item)" />
            <!-- 複製 -->
            <span class="pi pi-copy cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick"
              v-tooltip.bottom="controller.hasCopy.value ? t('Components.STAiChat.Copy_Success') : t('Components.STAiChat.Copy')"
              @click="controller.copyText(item.snapshot.content)" />
            <!-- 評論：讚 -->
            <span class="pi pi-thumbs-up cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick"
              @click="controller.toggle($event, 'good', item)" />
            <!-- 評論：倒讚 -->
            <span class="pi pi-thumbs-down cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick"
              @click="controller.toggle($event, 'bad', item)" />
            <!-- 播放語音 -->
            <i v-if="playStatus.status === VoiceStatus.LOADING && index === playStatus.index" class="pi pi-spin pi-spinner" style="font-size: 14px; color: var(--fone-text-level-2)"/>
            <span v-else-if="playStatus.status === VoiceStatus.PLAYING && index === playStatus.index"
              class="pi pi-pause-circle cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick"
              @click="() => { controller.voiceStop() }" />
            <span v-else class="pi pi-caret-right cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick"
              v-tooltip.bottom="t('Components.STAiChat.Play')"
              @click="() => { controller.voicePlay(item.snapshot.content, index) }" />

             <!-- 預覽 -->
            <span v-if="props.preview" class="pi pi-desktop cursor-pointer text-foneTextLevel2 hover:text-fonePrimaryClick"
              @click="controller.openPreview($event, item)" ></span>
            <Popover ref="popoverRef">
              <div class="flex flex-col gap-3 p-[1rem]">
                <div class="flex flex-col">
                  <div class="text-h2">{{ controller.popoverTitle.value }}</div>
                  <div class="text-body2">{{ controller.popoverSubTitle.value }}</div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div v-for="(item, index) in dynamicList" :key="index"
                    class="py-1 px-2 border-foneTextDisable bg-foneBgDisable w-max cursor-pointer rounded-sm text-foneTextDisable"
                    @click="controller.selectToggle(item)"
                    :class="{ '!text-fonePrimaryClick !bg-fonePrimaryBg': controller.isSelected(item) }">
                    {{ item }}
                  </div>
                </div>
                <Rating v-model="controller.commentScore.value" />
                <inputText :placeholder="t('Components.STAiChat.More_Detail')"
                  v-model="controller.commentInputMes.value" class="w-full" :pt="style.inputStyle.value" />
                <div class="bg-fonePrimaryMain w-max px-3 py-1 text-foneTextWhite text-h3 rounded cursor-pointer"
                  @click="controller.submit(commentDisable)"
                  :class="{ '!bg-foneBgDisable !text-foneTextDisable': commentDisable }">{{
                  t('Components.STAiChat.Submit') }}</div>
              </div>
            </Popover>
          </div>
          <div class="flex gap-[4px] text-foneTextLevel2 items-center text-[12px]">
            {{ moment(item.snapshot.createTime).format('YYYY-MM-DD HH:mm:ss') }}
            <span v-if="item.snapshot.isResType && props.showResTime" class="text-foneTextLevel2 text-[12px]">（歷時：{{
              item.snapshot.duration }}）</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isTypeing" class="w-max h-[2.5rem] flex items-center">
      <!-- <img class="w-[32px] self-start" src="@/assets/img/STAichat/chatAvatar.svg" alt=""> -->
      <div class="flex py-2 pl-2 pr-8 rounded-xl h-full justify-center items-center">
        <div v-for="(item, index) in 3" :key="index"
          class="w-[0.5rem] h-[0.5rem] bg-foneTextLevel2 rounded-full mx-1 animate-pulse"
          :style="{ animationDelay: `${(index - 1) * 0.3}s` }"></div>
      </div>
    </div>
    <Galleria v-model:visible="controller.imgShowAll.value" :value="controller.showImgList.value" :numVisible="5"
      :responsiveOptions="controller.showImgList.value" containerStyle="max-width: 50%" :circular="true"
      :fullScreen="true" :showItemNavigators="true" :pt="style.galleriaStyle.value"
      :activeIndex="controller.activeIndex.value">
      <template #item="slotProps">
        <img class="!w-[43.75rem] h-[30rem] object-contain" :src="slotProps.item.img"
          style="width: 100%; display:block" />
      </template>
      <template #thumbnail="slotProps">
        <img class="w-[40px] h-[40px] object-contain" :src="slotProps.item.img" style="display: block" />
      </template>
    </Galleria>
  </div>

    <!-- 聊天室參數設定 -->
  <Drawer v-model:visible="controller.previewVisible.value" position="right" :header="t('AIChatRoom.Preview')" 
  :style="{ width:'900px !important' }" :dismissable="false" :modal="false">
    <STLivePreview :data="controller.previewContent.value"></STLivePreview>
  </Drawer>


</template>
<style scoped lang="scss">
:deep(.markdown-body) {
  background-color: transparent;
  font-size: 14px;
}

:deep(button) {
  background-color: transparent;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid var(--fone-border);
}

:deep(ul) {
  list-style: circle;
  padding: 20px;
}

:deep(hr) {
  display: none;
}
</style>