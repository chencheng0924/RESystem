<script lang="ts" setup>
import FileUpload from 'primevue/fileupload';
import { btnType, STAichatAgentData, STAIChatDepsType } from '../../model/STAIChat.model'
import aiChatRoom from '../STAIChatRoom/STAIChatRoom.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { ThemeSwitchController } from '@/components/smartcityui/STThemeMode.compsable'
import { ChatRoomMagement } from '@/lib/AIChat/store/ChatRoomMgmt';
import { useAiChat, useStyle } from './STAIChat.controller'
import { AIChatStore, useAIChatStore } from '@/lib/AIChat/store/AIChatStore'

import { } from '@/lib/AIChat/store/AIChatStore'
let themeController = new ThemeSwitchController(false)
const route = useRoute()
const { t, locale } = useI18n()

const userStore = UPPreferenceStore();
let userEntity = new UsrEntity(userStore.getUserEntity());


const style = new useStyle()
const AIChatStoreObj: AIChatStore = useAIChatStore()
const showResTime = ref(AIChatStoreObj?.getChatSetting()?.finalShowTotalTime) // 用於觸發響應式更新
const props = withDefaults(defineProps<{
  defaultDataList?: Array<any>,
  agentData?: STAichatAgentData,
  allowCreateChatRoom?: boolean,
  visibleToolBar?: boolean,
  chatRoomId?: string,
  chatMessages?: Array<any>,
  chatRoomDisabled?: boolean,
  depsType?: STAIChatDepsType,
  chatRoomDisabledMessage?:string
}>(), {
  defaultDataList: () => ([]),
  allowCreateChatRoom: () => (false),
  visibleToolBar: () => (false),
  chatRoomDisabled: () => (false),
  chatRoomDisabledMessage:()=>('Components.STAiChat.Choose_LLM_MSG')
})
const emit = defineEmits(["eventInit", "updateLogData", "showCanCallAPI"])
const controller = new useAiChat(t, locale, route, props, emit)
let chatroomMgmt;


const defaultDataList = computed(() => props.defaultDataList)
import { useRefHistory } from '@vueuse/core'
import { STIconButtonProps } from '@/components/smartcityui/STIconButton.model';
import { MenuItem } from 'primevue/menuitem';
import { STAction } from '@/components/smartcityui/STCommon.model';
import { MicStatus } from '../../model/Mic.model';
import { UPPreferenceStore } from '@/stores/userProfilePreference/UPPreferenceStore';
import { UsrEntity } from '@/model/entity/UsrEntity';
const { history, undo, redo } = useRefHistory(controller.apiChatData)
watch(() => controller.apiChatData.value, (newValue) => {
  // controller.apiChatList.value = history.value.reverse()
  controller.apiChatList.value.push(...history.value.slice(0, 1).reverse())
  controller.getTokenData()
})

const expandChatIcon = new STIconButtonProps({
  iconUrl: `ic_expand_chat_${themeController.getModeString()}`.getIcon('svg'),
  tooltipText: '展開聊天細節'
})
const uploadFilesIcon = new STIconButtonProps({
  iconUrl: `ic_upload_files_${themeController.getModeString()}`.getIcon('svg'),
  tooltipText: '批次上傳問答'
})

const actionItem = (action: STAction) => {
  controller.clickDrawerAction(action)
  if (action.Id === 'ok') {
    showResTime.value = AIChatStoreObj.getChatSetting()?.finalShowTotalTime
  }
}

const handleEnterKey = (e: KeyboardEvent) => {
  if (e.isComposing || controller.intutMes.value.trim() == '') return

  // Case 1: Alt + Enter - 新增換行符號
  if (e.altKey) {
    controller.intutMes.value += '\n';
    return;
  }

  // Case 2: Shift + Enter - 允許換行不做任何處理
  if (e.shiftKey) {
    return;
  }

  // Case 3: 單純 Enter - 送出訊息
  e.preventDefault()
  controller.send();
}

const preview = ref(false)
onMounted(async () => {
  emit("eventInit", controller)

  if (props.agentData == undefined || props.agentData == null)
    return;

  console.log('props.agentData.key : ', props.agentData?.key);

  chatroomMgmt = new ChatRoomMagement(props.agentData?.key, userEntity.id);
  let currentRoomID = '';
  // 1. 先判斷是否有傳初始 chatroom
  if (props.chatRoomId == null || props.chatRoomId == '') {
    currentRoomID = chatroomMgmt.getChatRoomId();
  } else {
    currentRoomID = props.chatRoomId;
  }

  // 2. 檢查 chatromm 存不存在 , 資料是否其全
  if (currentRoomID != "") {
    currentRoomID = await controller.checkChatRoom(currentRoomID, props.agentData);
  }


  controller.setcurrentRoomId(currentRoomID);
  // 3. 判斷是否建立新的 chatRomm , 並儲存
  currentRoomID = await controller.initChatRoom();
  chatroomMgmt.setChatRoomId(currentRoomID);

  console.log('last currentRoomID : ', currentRoomID);


  controller.getHistoryChatDatas();

  chatroomMgmt.startSignalR()


  preview.value = props.agentData.isGroupAgent();

})

</script>
<template>
  <div class="text-[#d3d3d3] h-full flex flex-col justify-between w-full">
    <div v-if="controller.isChatLoading.value" class="w-full h-[300px] flex items-center justify-center">
      <ProgressSpinner />
    </div>
    <div v-else class="h-full flex flex-col flex-grow">
      <div v-if="props.visibleToolBar"
        class="px-[12px] border-b-[1px] border-foneBorder flex justify-between items-center sticky top-0 bg-foneBgLevel1">
        <div class="text-foneTextLevel1">{{ controller.chatRoomEntity?.name }} - {{ controller.chatRoomEntity?.id }}
        </div>
        <div class="flex items-center  gap-[8px] chatToolbar p-[8px]">
          <span class="pi pi-code cursor-pointer text-foneTextLevel1"
            @click="() => controller.showCodeDrawerAction()"></span>
          <!-- 有預設的toolbar，但可以增加帶入自定義的toolbar -->
          <STButtonPopover :actions="controller.chatRoomTopOptions"
            @eventActionSubBtn="(e, menuItem: MenuItem, subMenuItem: MenuItem) => controller.actionSubBtn(e, menuItem, subMenuItem)" />

          <!-- <FileUpload mode="basic" @select="controller.uploadChatFiles($event)" :multiple="true" customUpload auto severity="secondary" class="p-button-outlined"/> -->
        </div>
      </div>
      <div v-if="controller.startChatType.value || controller.apiChatList.value.length == 0"
        class="px-[12px] flex flex-col items-center flex-grow">
        <div class="flex flex-col justify-center items-center gap-[16px] mt-[24px]">
          <img class="w-[56px] h-[56px]" src="@/assets/img/STAichat/chatAvatar.svg" alt="">
          <div class="flex flex-col gap-[4px] items-center">
            <div class="text-h2 text-foneTextLevel2">{{ t('Components.STAiChat.Recommend_Title') }}</div>
            <div class="text-body2 text-foneTextLevel2 text-center">{{ t('Components.STAiChat.Recommend_SubTitle') }}
            </div>
          </div>
        </div>
        <div v-if="defaultDataList.length > 0" class="mb-[1rem] flex flex-wrap h-[calc(100vh-350px)] overflow-auto">
          <div v-for="(item, index) in defaultDataList" :key="index"
            class="w-[48%] m-[1%] h-max border-[1px] border-[#39393D] border-solid p-[1rem] rounded flex flex-col gap-3 cursor-pointer"
            @click="controller.send(item.content)">
            <img class="w-[1rem] h-[1rem] object-contain" :src="controller.getImageUrl(item.img)" alt="img">
            <div class="text-h3">{{ item.title }}</div>
            <div class="text-body2">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div v-else class="px-[12px] pt-[12px] flex-grow h-[calc(100%-65px-143px-12px-12px)]">
        <aiChatRoom :dataList='controller.apiChatList.value' :isloading="controller.isTypeing.value"
          @sendComment="(val) => controller.getSubmit(val)" :showResTime="showResTime"
          @voicePlay="(val, index) => controller.voicePlay(val, index)" @voiceStop="controller.voiceStop()"
          :playStatus="{ index: controller.playIndex.value, status: controller.deps.voice.playStatus.value }"
          :messageBarList="controller.messageBarList.value" :preview="preview" />
      </div>
      <!-- <div class="w-full flex gap-[12px] px-[12px] pb-[12px] sticky bottom-0 bg-foneBgLevel1 text-black items-center justify-center">
        <div><i class="pi pi-arrow-up"></i>{{ controller.tokenData.value?.inputTokenCount ?? '-' }}</div>
        <div><i class="pi pi-arrow-down"></i>{{ controller.tokenData.value?.outputTokenCount ?? '-' }}</div>
      </div> -->
      <div v-if="!props.chatRoomDisabled"
        class="w-full flex gap-[12px] px-[12px] pb-[12px] sticky bottom-0 bg-foneBgLevel1">

        <div @keydown.enter="(e) => handleEnterKey(e)" class="w-full">
          <div v-if="controller.type.value == btnType.Mic">
            <div class="flex flex-col items-center text-[#806BFF] gap-[2rem]">
              <img src="@/assets/img/STAichat/voice.svg" alt="">
              <div v-if="controller.recordInputMes.value == ''" class="flex flex-col justify-center items-center">
                <div>{{ t('Components.STAiChat.Listening') }}</div>
                <div>{{ t('Components.STAiChat.Listening_SubTitle') }}</div>
              </div>
              <div v-else class="text-h3 text-[#d3d3d3]">{{ controller.recordInputMes.value }}</div>
              <div
                class="w-max flex justify-center items-center border-[#9E8EFF] border-[1px] border-solid py-1 cursor-pointer rounded-md gap-2 px-2"
                @click="controller.micStopRecord()">
                <img src="@/assets/img/STAichat/close3.svg" alt="">
                {{ t('Components.STAiChat.Cancel_Button_Text') }}
              </div>
            </div>
          </div>
          <div v-if="controller.type.value == btnType.text"
            class="w-full h-full bg-foneBgLevel1 rounded-lg flex flex-col justify-center border-solid border-[1px] border-foneBorder focus-within:!border-fonePrimaryClick focus-within:!border-[1px] focus-within:!border-solid">
            <InputGroup>
              <div class="w-full relative">
                <img v-if="controller.intutMes.value !== ''" src="@/assets/img/STAichat/Close.svg"
                  class="absolute right-[2%] top-[calc(50%-8px)] cursor-pointer" alt=""
                  @click="() => controller.intutMes.value = ''">
                <Textarea rows="5" :placeholder="t('Components.STAiChat.Can_Ask_Anything')"
                  v-model="controller.intutMes.value" class="w-full" :pt="style.inputStyle.value" />
              </div>

              <!---上傳 -->
              <InputGroupAddon>
                <FileUpload v-if="controller.uploadFileList.value.length > 0" mode="basic"
                  @select="controller.uploadFileByAgent($event)" customUpload auto severity="secondary"
                  class="p-button-outlined fileupload"
                  :accept="controller.uploadFileList.value.map(item => item.key).join(',')"
                  :disabled="!controller.isA2A && controller.selectImgList.value.length > 0">
                </FileUpload>
                <FileUpload mode="basic" @select="controller.uploadFile($event)" customUpload auto severity="secondary"
                  class="p-button-outlined" accept=".png,.jgp,.jpeg"
                  :disabled="!controller.isA2A && controller.selectFileList.value.length > 0">
                </FileUpload>
              </InputGroupAddon>
              <!---麥克風 -->
              <InputGroupAddon>
                <!---麥克風 icon -->
                <img v-if="controller.deps.microphone.recordStatus.value === MicStatus.STOPPED"
                  @click="controller.micStartRecord()" class="w-[1.5rem] h-[1.5rem] cursor-pointer"
                  :src="`Mic_${themeController.getModeString()}`.getIcon('svg')">
                <!---loading icon  -->
                <i v-if="controller.deps.microphone.recordStatus.value === MicStatus.LOADING"
                  class="pi pi-spin pi-spinner" style="font-size: 14px; color: var(--fone-text-level-2)" />
                <!---stop icon  -->
                <span v-if="controller.deps.microphone.recordStatus.value === MicStatus.RECORDING"
                  @click="controller.micStopRecord()"
                  class="cursor-pointer pi pi-stop-circle text-foneTextLevel2 hover:text-fonePrimaryClick" />
              </InputGroupAddon>

              <!---傳送 -->
              <InputGroupAddon v-if="controller.intutMes.value || controller.selectImgList.value.length">
                <div class="bg-fonePrimaryMain w-full h-full flex justify-center items-center rounded"
                  @click="controller.send()">
                  <img class="w-[1.5rem] h-[1.5rem] cursor-pointer"
                    :src="`ic_send_${themeController.getModeString()}`.getIcon('svg')">
                </div>
              </InputGroupAddon>

            </InputGroup>


            <!-- <ul>
                  <li v-for="(file, index) in controller.selectFileList.value" :key="file.fileName" class="flex items-center gap-2">
                    <span>{{ file.fileName }}</span>
                    <button class="px-2 py-1 bg-red-500 text-white rounded" @click="removeFile(index)">刪除</button>
                  </li>
                </ul> -->

            <div class="flex items-center"
              v-if="controller.selectImgList.value.length > 0 || controller.selectFileList.value.length > 0">
              <div class="px-[10.5px] py-[8.75px] relative" v-for="(item, index) in controller.selectImgList.value"
                :key="index">
                <img class="w-[58px] h-[58px] object-contain" :src="item.img" alt="">
                <span @click.stop="controller.handleImgList(index)"
                  class="pi pi-times absolute top-[2px] right-[2px] cursor-pointer"></span>
              </div>
              <div class="px-[10.5px] py-[8.75px] relative" v-for="(item, index) in controller.selectFileList.value"
                :key="index">
                <img class="w-[58px] h-[58px] object-contain" :src="item.imgPath" alt="">
                <span @click.stop="controller.handleFileList(index)"
                  class="pi pi-times absolute top-[2px] right-[2px] cursor-pointer"></span>
                <div class="text-foneTextLevel2 text-[10px] fileText">{{ item.fileName }}</div>
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>

    <!-- <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="controller.showSubmitMessage.value" 
           class="flex items-center w-max gap-[1rem] absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-[#2A2A32] text-white px-4 py-3 rounded-md shadow-lg z-50 whitespace-nowrap">
           <img :src="controller.showWarn.value ? controller.getImageUrl('Success') : controller.getImageUrl('warning')" alt="">
           <div>{{ controller.submitMessage.value }}</div>
           <img class="cursor-pointer" @click="() => controller.showSubmitMessage.value = false" src="@/assets/img/STAichat/close2.svg" alt="">
      </div>
    </Transition> -->

    <Message v-if="controller.noticeContent.value.visible"
      class="absolute bottom-[150px] left-[50%] translate-x-[-50%] w-fit"
      :severity="controller.noticeContent.value.type" :life="controller.noticeContent.value.duration">
      {{ controller.noticeContent.value.message }}
    </Message>
    <Message icon="pi pi-info-circle" severity="info" class="absolute bottom-[30px] left-[50%] translate-x-[-50%]"
      v-if="props.chatRoomDisabled">{{ t(props.chatRoomDisabledMessage) }}</Message>
  </div>

  <!-- 聊天室參數設定 -->
  <Drawer v-model:visible="controller.chatSettingDrawerVisible.value" position="left"
    :header="t('AIChatRoom.Action_Setting')" class="!w-[30rem]">
    <STForm :items="controller.chatSettingForm.value"
      @selectChange="(e, item) => controller.changeChatSettingForm(e, item)"
      @change="(e) => controller.changeSettingForm(e)" />
    <template #footer>
      <div class="flex items-center gap-2">
        <Button @click="actionItem(item)" :disabled="!item.Enable" class="flex-auto" :icon="item.Icon"
          :outlined="item.IsOutlined" :severity="item.SeverityColor" :text="item.IsText"
          v-for="(item, index) in controller.chatSettingDrawerActions" :key="index" :label="item.Text"
          v-prevent-reclick="2000" />
      </div>
    </template>
  </Drawer>
</template>
<style lang="scss" scoped>
:deep(.p-inputgroupaddon) {
  width: 40px;
  height: 42px;
  border-left: none;
  background: transparent;
  padding: 2.5px;
  border: none;

  &:last-child {
    border: none;
  }
}

:deep(.p-fileupload) {
  .fileupload {
    margin-top: 2px !important;
    margin-right: 2px !important;
    background-image: var(--fileupload-pic-icon) !important;
    background-size: 20px 20px;
    background-repeat: no-repeat;

    &:hover {
      border: none;
      background-color: transparent;
      background-image: var(--input-pic-icon);
      background-size: 20px 20px;
      background-repeat: no-repeat;
    }
  }

  .p-button {
    width: 24px;
    height: 24px;
    background-image: var(--input-pic-icon);
    padding: 0;
    border: none;

    >svg {
      display: none;
    }

    &:hover {
      border: none;
      background-color: transparent;
      background-image: var(--input-pic-icon);
    }

    .p-button-label {
      display: none;
    }
  }
}

.chatToolbar {
  :deep(img) {
    width: 20px;
    height: 20px;
  }

  :deep(.p-fileupload) {
    .p-button {
      width: 14px;
      height: 14px;
      background-image: var(--upload-pic-icon);
      background-size: 14px 14px;

      >svg {
        display: none;
      }

      &:hover {
        border: none;
        background-color: transparent;
        background-image: var(--upload-pic-icon);
      }
    }
  }
}

.fileText {
  width: 58px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
</style>