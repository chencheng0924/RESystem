import { ref, Ref, nextTick, watch } from 'vue'
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { FileUploadPassThroughOptions } from 'primevue/fileupload'
import { STAichatAgentData, STAichatProps, STAiMessage, STAiMessageItem, STAiSettingProps, ChatNotice, ChatNoticeType, STAIChatDepsType, STImgItem, STFileItem } from '../../model/STAIChat.model'
import { STMenubarAction } from '@/components/smartcityui/STMenubar.model'
import { ThemeSwitchController } from '@/components/smartcityui/STThemeMode.compsable'
import { MenuItem } from 'primevue/menuitem'
import { STFormItem, STFormItemType } from '@/components/smartcityui/STForm.model'
import { STAction } from '@/components/smartcityui/STCommon.model'
import { DateExtension } from '@/utils/dateExtension'
import { STAIChatBuilder } from '../../STAIChatBuilder'
import { IAIChatDeps } from '../../interface/IAIChatDeps'
import { AIChatStore, useAIChatStore } from '@/lib/AIChat/store/AIChatStore'
import { VoiceTypeOptions } from '../../voice/voiceFactoryManager'
import { MicTypeOptions } from '../../microphone/micFactoryManager'
import { ChatSendFileParams, ChatSendParams } from '../../model/Chat.model'
import { StockFactory } from '@/lib/stockFactory/StockFactory'

import { ChatTraceType } from '../../chat/chatFactoryManager'
import { BaseService } from '@/service/BaseService'
import axios from "axios";
import { BaseResponseCode } from '@/lib/pageBuilder/service/BaseResponseCode'
import { EnvUtils } from '@/utils/envUtils'

export class useStyle {
  public inputStyle: Ref<InputTextPassThroughOptions>
  public fileStyle: Ref<FileUploadPassThroughOptions>

  constructor() {
    this.inputStyle = ref(this.getInputTextStyleOption())
    // this.fileStyle = ref(this.getFileStyleOption())
  }

  public getInputTextStyleOption() {
    return ({
      root: ({ props, context }) => ({
        // focus:!border-[#806BFF] hover:!border-[#806BFF]
        class: ['!w-full !border-0 !rounded-none !rounded-s-lg border-[1px] border-solid hover:!border-[#3f3f46] focus:!border-[#3f3f46] focus:!shadow-none']
      }),
    })
  }

  public getFileStyleOption() {
    return ({
      pcChooseButton: ({ }) => ({
        class: ['bg-white']
      }),
    })
  }
}
export class useAiChat {
  private locale?: any;
  private $t?: any;
  private $route?: any;
  private emit?: any;
  private baseSVC?: BaseService;
  public isMultipleFile?: Ref<boolean>

  private abortController: AbortController | null = null;

  public recordInputMes?: Ref<string>

  public type?: Ref<number>
  public startChatType?: Ref<boolean>
  public intutMes?: Ref<string>
  public saveInputMes?: Ref<string>

  public aiSvc?
  public chatRoomEntity?: any

  public apiChatData?: any
  public apiChatList?: Ref<any[]>
  public slowPushChatList?: Ref<any[]>
  public isTypeing?: Ref<boolean>

  public uploadFileSrc: any
  public selectImgList: Ref<STImgItem[]>
  public selectFileList: Ref<STFileItem[]>


  public agentData: Ref<STAichatAgentData>
  public allowCreateChatRoom: Ref<boolean>
  public currentRoomId: Ref<string>  // 之前有開過的聊天室（同個agentId）
  public isChatLoading: Ref<boolean> = ref(true)

  public chatRoomTopOptions: STMenubarAction[] = []  // 聊天室Toolbar中的下拉選單
  public themeController: ThemeSwitchController
  public chatSettingDrawerVisible: Ref<boolean> = ref(false)  // 聊天室設定drawer
  public chatSettingDrawerActions: STAction[] = []
  public chatSettingForm: Ref<STFormItem[]> = ref([])  // 聊天室設定參數form
  public enableSend: Ref<boolean> = ref(true)  // 是否能送出訊息（如果正在回應中就不行再送其他訊息）
  public noticeContent: Ref<ChatNotice>

  public deps: IAIChatDeps
  public tokenData?: Ref<{ inputTokenCount?: number; outputTokenCount?: number }>
  private AIChatStore: AIChatStore
  public playIndex: Ref<number> = ref(0)
  private resultTextWatcher: any

  public messageBarList: Ref<any[]> = ref([])
  public uploadFileList: Ref<any[]> = ref([])

  private isStream?: boolean = true;
  public isA2A?: boolean = true;

  private chatDepsType: STAIChatDepsType;// 基本設定 用哪個 chat , upload ...

  constructor(t, locale, route, props: STAichatProps, emit: any) {
    this.locale = locale;
    this.$t = t;
    this.$route = route;
    this.emit = emit;
    this.baseSVC = new BaseService()

    // 是否能上傳多張圖片
    this.isMultipleFile = ref(false)

    this.startChatType = ref(true)
    this.type = ref(2)
    this.intutMes = ref('')
    this.saveInputMes = ref(null)

    this.apiChatData = ref({})
    this.apiChatList = ref(props.chatMessages ?? [])
    this.slowPushChatList = ref([])
    this.isTypeing = ref(false)

    this.recordInputMes = ref('')

    this.uploadFileSrc = ref()
    this.selectImgList = ref([])
    this.selectFileList = ref([])

    this.agentData = ref(props.agentData)
    this.allowCreateChatRoom = ref(props.allowCreateChatRoom)
    this.currentRoomId = ref(props.chatRoomId)
    this.themeController = new ThemeSwitchController(false)
    this.noticeContent = ref(new ChatNotice())

    this.AIChatStore = useAIChatStore()

    this.chatDepsType = props.depsType
    this.setAIChatBuilder(props.depsType)

    this.messageBarList = ref([])
    this.uploadFileList = ref([])


    this.isChatLoading.value = false
    this.tokenData = ref<{ inputTokenCount?: number; outputTokenCount?: number } | null>(null)

  }

  public setcurrentRoomId(currentRoomId: string) {
    this.currentRoomId.value = currentRoomId;
  }

  public async initChatRoom() {
    if (this.hasHistoryRoom() == false) {
      await this.createRoom()

    }

    this.isStream = this.agentData.value?.llm?.isFunctionCallingStreamingSupported ?? true;

    // 取得File type by chatroom
    this.uploadFileList.value = await this.aiSvc.getChatrRoomFileTypes(this.currentRoomId.value)

    return this.currentRoomId.value;
  }

  public async createRoom() {
    this.currentRoomId.value = await this.aiSvc.createRoom(this.agentData.value)
  }


  public async getHistoryChatDatas() {
    if (this.hasHistoryRoom() == false)
      return;
    const history = await this.aiSvc.getHistoryById(this.currentRoomId.value)
    this.setHistoryChatData(history)
    this.getTokenData()
  }

  public async getTokenData() {
    const history = await this.aiSvc.getHistoryById(this.currentRoomId.value)
    if (history.length > 0) {
      const chatSessionId = history[history.length - 1].sessionId
      let url = `$apply=filter(sessionId eq '${chatSessionId}')/groupby((sessionId), aggregate(inputTokenCount with sum as inputTokenCount, outputTokenCount with sum as outputTokenCount, totalTokenCount with sum as total))`
      let baseUrl = EnvUtils.getRaiPath();
      let token = this.baseSVC.api.getkeyBearer();
      try {
        const res = await axios.get(`${baseUrl}/OData/AITokenUsageLog/ODataTokenUsageLog?${url}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            'content-type': 'application/json; odata.metadata=minimal; odata.streaming=true; charset=utf-8'
          }
        })
        if (res.status === BaseResponseCode.SUCCESS) {
          this.tokenData.value = res.data.value[0] ?? null
          //console.log('this.tokenData',this.tokenData)
        }
      } catch (err) {
        console.log("err", err)
        this.tokenData.value = null
      }
    }
  }


  private setAIChatBuilder(depsType?: STAIChatDepsType) {
    if (depsType) {
      // Mic、Voice的設定透過全域設定更新
      this.AIChatStore.setType(depsType)
    }
    const builder = new STAIChatBuilder()
      .setChatType(depsType?.chat)
      .setUploadType(depsType?.upload)
      .setMessageToolbarType(depsType?.messageToolbar)
      .setToolbarType(depsType?.toolbar)
    this.deps = builder.build()

    if (this.resultTextWatcher) this.resultTextWatcher()
    if (this.deps.microphone && this.deps.microphone.resultText) {
      this.resultTextWatcher = watch(
        () => this.deps.microphone.resultText.value,
        (newValue, oldValue) => {
          this.intutMes.value += newValue
        }
      )
    }
  }

  private hasHistoryRoom() {
    return this.currentRoomId.value != "" ? true : false
  }

  public getImageUrl(name) {
    return new URL(`/src/assets/img/STAichat/${name}.svg`, import.meta.url).href
  }

  public async send(message?: string, resend: boolean = false) {
    if (!this.enableSend.value) return

    let chatRoomSetting = this.AIChatStore.getChatSetting()
    this.isStream = chatRoomSetting.isStream ?? true;
    let isA2A = chatRoomSetting.isA2A ?? true;
    this.chatDepsType = new STAIChatDepsType(this.chatDepsType)
    if (isA2A)
      this.chatDepsType.setChatTypeA2A();
    else
      this.chatDepsType.setChatTypeDefault();

    this.setAIChatBuilder(this.chatDepsType);


    if (message) {
      this.intutMes.value = message
      this.selectImgList.value = []
    }
    if (this.intutMes.value || (!this.intutMes.value && this.selectImgList.value.length)) {
      this.saveInputMes.value = this.intutMes.value

      this.intutMes.value = ''
      this.startChatType.value = false

      if (!resend) {
        this.apiChatData.value = {
          content: this.saveInputMes.value,
          isResType: false,
          imgList: this.selectImgList.value,
          createTime: Date.now()
        }
      }
      this.enableSend.value = false
      this.isTypeing.value = true
      this.abortController = new AbortController();
      const imgData = new ChatSendFileParams()
        .setImgBase64(this.selectImgList.value)
        .setFile(this.selectFileList.value)

      // 清空
      this.selectImgList.value = []
      this.selectFileList.value = [];

      let isStream: boolean = this.isStream;

      const chatParams = new ChatSendParams({
        roomId: this.currentRoomId.value,  // 聊天室ID
        message: this.saveInputMes.value,  // 訊息
        uploadData: imgData,  // 上傳資料
        signal: this.abortController.signal,
        agentData: this.agentData.value,
        isStream: isStream
      });

      if (isStream) {
        await this.streamSend(chatParams)
      }
      else {
        await this.methodSend(chatParams)
      }

    }
  }

  public async methodSend(chatParams: ChatSendParams) {
    await this.deps.chat.sendMessage(chatParams).then(res => {
      console.log('res', res)
      const check = res.data.length > 0
      this.apiChatData.value = {
        content: check ? this.slowPush(res.data) : this.slowPush(['無', '法', '回', '答', '，', '請', '重', '新', '提', '問', '。']),
        sessionId: res.sessionId,
        isResType: true,
        createTime: res.createTime,
        duration: res.duration
      }
    }).catch(err => {
      console.log('err', err)
      this.apiChatData.value = {
        content: this.slowPush(['無', '法', '回', '答', '，', '請', '重', '新', '提', '問', '。']),
        isResType: true,
        createTime: Date.now()
      }
      this.enableSend.value = true
    }).finally(() => {

      this.isTypeing.value = false
    })
  }
  public async streamSend(chatParams: ChatSendParams) {
    let self = this;

    let stream = await this.deps.chat.sendMessageStream(chatParams, (datas, traceType) => {
      if (traceType == ChatTraceType.START) {
        self.apiChatData.value = {
          content: '',
          isResType: true,
          logid: datas
        }
      }
      else if (traceType == ChatTraceType.END) {
        let index = self.apiChatList.value.length - 1
        self.apiChatList.value[index].snapshot.sessionId = datas.sessionId
        self.apiChatList.value[index].snapshot.createTime = datas.createTime
        self.apiChatList.value[index].snapshot.duration = datas.duration
        self.enableSend.value = true
        self.isTypeing.value = false
      }
      else if (datas != "" && datas.length > 0) {
        const check = datas.join("");

        if (traceType == ChatTraceType.PROCESSING) {
          console.log(check);
          let index = self.apiChatList.value.length - 1
          self.apiChatList.value[index].snapshot.content += check
        }


      }



    });

    self.isTypeing.value = false
    console.log('stream', stream)

  }

  public apiReset() {
    if (this.isTypeing.value) {
      this.abortController.abort();
      this.isTypeing.value = false;
    }
  }

  public slowPush(data: any) {
    if (typeof data !== 'object') return
    const validElements = data.filter(el => el !== '' && el !== null);
    let result = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < validElements.length) {
        result += validElements[index];
        index++;
        this.apiChatList.value[this.apiChatList.value.length - 1].snapshot
          .content = result
      } else {
        this.enableSend.value = true
        clearInterval(interval);
      }
    }, 2);
  }

  public async getSubmit(val) {
    const comment = val.comment?.join(',') || ''
    if (comment.length > 0) {
      val.commentText = `${val.commentText},${comment}`
    }

    const resultEntity = await this.aiSvc.submitComment(val)
    const result = resultEntity == null ? false : true;
    const detailResult = val.commentText
      ? await this.aiSvc.submitCommentText(val, resultEntity)
      : true

    const isSuccess = result && detailResult
    isSuccess
      ? this.setInfoNotice('已收到回饋，感謝你提供意見反應!')
      : this.setWarnNotice('回饋失敗，請重新回饋!')

    if (!isSuccess) return
  }

  public uploadFile(event) {
    console.log('Img', this.selectImgList.value)
    if (this.isA2A == false && this.selectImgList.value.length > 0) {
      this.setWarnNotice(this.$t('Components.STAiChat.OnlyImg'))
      return;
    }
    const file = event.files[0];
    const reader = new FileReader();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.setWarnNotice('只能上傳 PNG、JPG 或 JPEG 格式的圖片')
      return;
    }

    reader.onload = async (e) => {
      const fullResult = e.target.result as string;
      const base64Data = fullResult.split(',')[1];
      this.selectImgList.value.push({ img: fullResult, imgBase64: base64Data, file: file })
      this.uploadFileSrc.value = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  public async uploadFileByAgent(event) {
    let self = this;
    console.log('file', this.selectFileList.value)
    if (this.isA2A == false && this.selectFileList.value.length > 0) {
      this.setWarnNotice(this.$t('Components.STAiChat.OnlyFile'))
      return;
    }


    const file = event.files[0];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    // 取得允許的副檔名陣列
    const allowExts = this.uploadFileList.value.map(item => item.key);

    // 判斷副檔名是否允許
    if (!allowExts.includes(ext)) {
      this.setWarnNotice(`僅允許上傳以下檔案類型: ${allowExts.join(', ')}`);
      return;
    } else {

      let fitem = new STFileItem({ file: file, fileName: file.name }).setFileExt(ext)

      await this.aiSvc.sendFile(this.currentRoomId.value, event.files).then(res => {
        if (res.isSuccess) {

          this.setInfoNotice(this.$t('Components.STAiChat.uploadSuccess'))
          fitem.setFileResourceId(res.resourceId)
          self.selectFileList.value.push(fitem);

        } else {
          this.setWarnNotice(this.$t('Components.STAiChat.uploadError'))
        }

      }).catch(err => {
        this.setWarnNotice(this.$t('Components.STAiChat.uploadError'))
      })
    }

  }

  public handleImgList(idx: number) {
    this.selectImgList.value.splice(idx, 1)
  }

  public handleFileList(idx: number) {
    this.selectFileList.value.splice(idx, 1)
  }

  private hasChatRoomId() {
    return this.currentRoomId.value?.length > 0
  }


  public async startSignalR() {
    const chatRoomId = localStorage.getItem('chatRoomId')
    if (chatRoomId) {
      StockFactory.startSignalR();
    }
  }

  private findChatRoomIdByAgent(chatHistoryList: any[]) {
    const targetRoom = chatHistoryList.find(room => room.agentID == this.agentData.value?.key)
    return targetRoom?.chatRoomID || ''
  }

  private resetRoomId() {
    this.currentRoomId.value = ''
  }

  public setHistoryChatData(history: any) {
    this.apiChatList.value = [...this.apiChatList.value, ...history]
      .map((x, index, arr) => {
        let duration = ''
        if (x.duration) {
          duration = x.duration
        } else {
          const sameSec = arr.filter(msg => msg.sessionId === x.sessionId)
          const currentIndex = sameSec.findIndex(msg => msg === x)
          if (currentIndex > 0) {
            const prevMessage = sameSec[currentIndex - 1]
            const timeDiff = new Date(x.createdDate).getTime() - new Date(prevMessage.createdDate).getTime()
            duration = (timeDiff / 1000).toFixed(2) + '秒'
          }
        }

        return new STAiMessage().setContentData(new STAiMessageItem({
          content: x.content,
          isResType: x.authorRole.toLowerCase() !== 'user' ? true : false,
          sessionId: x.sessionId,
          createTime: x.createdDate,
          duration: duration,
          contentType: x.contentType
        }));
      });
    this.startChatType.value = false
  }

  public async clearHistoryById() {

    const chatroomId = this.currentRoomId.value;
    console.log('clearHistoryById', chatroomId);
    await this.aiSvc.clearHistoryById(chatroomId);
    this.resetChatState()
  }

  private resetChatState() {
    this.apiChatList.value = []
  }

  public expandChatDetail() {
    console.log('TODO: 展開對話細節')
  }

  public uploadChatFiles(event) {
    console.log('TODO: 批次上傳檔案', event)
  }

  private setChatRoomTopDefaultOptions() {

    this.chatSettingDrawerActions = [
      new STAction({ Text: this.$t('Components.STAiChat.DialogOK'), Icon: "pi pi-check", Id: "ok", IsOutlined: true, SeverityColor: 'None' }),
      new STAction({ Text: this.$t('Components.STAiChat.DialogCanecl'), Icon: "pi pi-times", Id: "cancel", IsText: true, SeverityColor: 'danger' })
    ]


    let defaultSetting = this.AIChatStore.getChatSetting()
    this.setChatRoomSettingForm(defaultSetting)
  }

  public setChatRoomMessageBarDefaultOptions() {
    // 測試帶入messageBarList
    // this.messageBarList.value = [
    //   new STMessageBarAction({
    //     icon: 'pi pi-trash',
    //     click: () => {console.log('trash')},
    //     tooltip: 'trash'
    //   })
    // ]
  }

  // MT-NOTE: RDF1-234:暫時隱藏未完成的功能
  private setChatRoomSettingForm(defaultData?: STAiSettingProps) {

    this.isStream = this.agentData.value?.llm?.isFunctionCallingStreamingSupported ?? true;


    let defaultChatRoomSetting = this.AIChatStore.defaultSetting
    this.isA2A = defaultData?.isA2A ?? defaultChatRoomSetting.isA2A;
    this.chatSettingForm.value = [
      new STFormItem({
        Id: 'isDebug',
        Name: this.$t('Components.STAiChat.isDebug'),
        Type: STFormItemType.ToggleSwitch,
        Value: defaultData?.isDebug ?? defaultChatRoomSetting.isDebug,
        RowIndex: 0
      }),
      new STFormItem({
        Id: 'userInitial',
        Name: this.$t('Components.STAiChat.userInitial'),
        Type: STFormItemType.InputText,
        Value: defaultData?.userInitial ?? defaultChatRoomSetting.userInitial,
        RowIndex: 2
      }),

      new STFormItem({
        Id: 'showTotalTime',
        Name: this.$t('Components.STAiChat.showTotalTime'),
        Type: STFormItemType.ToggleSwitch,
        Value: defaultData?.showTotalTime ?? defaultChatRoomSetting.showTotalTime,
        RowIndex: 5
      }),
      new STFormItem({
        Id: 'STTSetting',
        Name: this.$t('Components.STAiChat.STTSetting'),
        Type: STFormItemType.Select,
        Value: defaultData?.STTSetting ?? defaultChatRoomSetting.STTSetting,
        OptionLabel: 'value',
        List: MicTypeOptions,
        RowIndex: 6
      }),
      new STFormItem({
        Id: 'STTLanguage',
        Name: this.$t('Components.STAiChat.STTLanguage'),
        Type: STFormItemType.Select,
        Value: JSON.parse(localStorage.getItem('chatRoomSettingNew'))?.STTLanguage || { 'playerName': 'cmn-TW-vs2-F01', 'key': 'cmn-TW', 'value': '中文' },
        OptionLabel: 'value',
        List: MicTypeOptions.find(x => x.key === (defaultData?.STTSetting?.key ?? defaultChatRoomSetting.STTSetting?.key))?.optionsList || [],
        RowIndex: 7
      }),
      new STFormItem({
        Id: 'TTSSetting',
        Name: this.$t('Components.STAiChat.TTSSetting'),
        Type: STFormItemType.Select,
        Value: defaultData?.TTSSetting ?? defaultChatRoomSetting.TTSSetting,
        OptionLabel: 'value',
        List: VoiceTypeOptions,
        RowIndex: 8
      }),
      new STFormItem({
        Id: 'TTSLanguage',
        Name: this.$t('Components.STAiChat.TTSLanguage'),
        Type: STFormItemType.Select,
        Value: JSON.parse(localStorage.getItem('chatRoomSettingNew'))?.TTSLanguage || { 'playerName': 'cmn-TW-vs2-F01', 'key': 'cmn-TW', 'value': '中文' },
        OptionLabel: 'value',
        List: VoiceTypeOptions.find(x => x.key === (defaultData?.TTSSetting?.key ?? defaultChatRoomSetting.TTSSetting?.key))?.optionsList || [],
        RowIndex: 9
      })
    ]

    if (this.isStream) {
      this.chatSettingForm.value.push(
        new STFormItem({
          Id: 'isStream',
          Name: this.$t('Components.STAiChat.isStream'),
          Type: STFormItemType.ToggleSwitch,
          Value: defaultData?.isStream ?? defaultChatRoomSetting.isStream,
          RowIndex: 0
        })
      );
    }
    this.chatSettingForm.value.push(
      new STFormItem({
        Id: 'isA2A',
        Name: this.$t('Components.STAiChat.isA2A'),
        Type: STFormItemType.ToggleSwitch,
        Value: defaultData?.isA2A ?? defaultChatRoomSetting.isA2A,
        RowIndex: 1
      })
    );





    let settingData = {} as any
    this.chatSettingForm.value.forEach(x => settingData[x.Id] = x.Value)
    settingData.finalShowTotalTime = defaultData?.finalShowTotalTime
    this.AIChatStore.setChatSetting(settingData)
  }

  private openSettingDrawer() {
    this.setChatRoomTopDefaultOptions()
    this.chatSettingDrawerVisible.value = true
  }

  private closeSettingDrawer() {
    this.chatSettingDrawerVisible.value = false
  }

  public actionSubBtn(e, menuItem: MenuItem, subMenuItem: MenuItem) {
    if (subMenuItem.key == 'clearChatRecord') {
      // 清除聊天記錄
      this.clearHistoryById()
    } else if (subMenuItem.key == 'chatDownload') {
      // 下載聊天記錄
      console.log('TODO: 下載聊天記錄')
      this.aiSvc.downloadXlsByChatRoomId(this.currentRoomId.value, `聊天記錄-${DateExtension.getDateFormat(Date.now(), 'YYYYMMDDHHmmss')}.xlsx`)
    } else if (subMenuItem.key == 'chatSetting') {
      // 聊天室設定
      this.openSettingDrawer()
    } else if (subMenuItem.key == 'chatLogData') {
      // 查看除錯紀錄
      this.emit('updateLogData')
    }
  }

  public showCodeDrawerAction() {
    this.emit('showCanCallAPI', this.currentRoomId.value)
  }

  public clickDrawerAction(action: STAction) {
    if (action.Id == 'cancel') {
      this.closeSettingDrawer()
    } else if (action.Id == 'ok') {
      let settingData = {} as any
      this.chatSettingForm.value.forEach(x => settingData[x.Id] = x.Value)
      settingData.finalShowTotalTime = settingData.showTotalTime
      this.AIChatStore.setChatSetting(settingData)
      this.setAIChatBuilder(this.chatDepsType);
      this.closeSettingDrawer()
    }


  }

  public setInfoNotice(message: string) {
    this.noticeContent.value
      .setVisible(true)
      .setType(ChatNoticeType.INFO)
      .setMessage(message)
    setTimeout(() => {
      this.noticeContent.value.setVisible(false)
    }, 3000)
  }

  public setWarnNotice(message: string) {
    this.noticeContent.value
      .setVisible(true)
      .setType(ChatNoticeType.WARN)
      .setMessage(message)
    setTimeout(() => {
      this.noticeContent.value.setVisible(false)
    }, 3000)
  }

  //////////////////////////////////////////////////////////
  // 重構
  //////////////////////////////////////////////////////////

  public micStartRecord() {
    this.deps?.microphone.startRecord()
  }

  public micStopRecord() {
    this.deps?.microphone.stopRecord()
  }

  public voicePlay(content: string, index: number) {
    this.playIndex.value = index
    this.deps?.voice.startPlay(content)
  }

  public voiceStop() {
    this.deps?.voice.stopPlay()
  }

  public changeChatSettingForm(e, item) {
    console.log(item)
    const targetFormItem = this.chatSettingForm.value.find(x => x.Id === item.Id);

    if (targetFormItem && targetFormItem.Value?.optionsList) {
      if (item.Id === 'STTSetting') {
        const sttLanguageFormItem = this.chatSettingForm.value.find(x => x.Id === 'STTLanguage');
        if (sttLanguageFormItem) {
          sttLanguageFormItem.List = targetFormItem.Value.optionsList;
          sttLanguageFormItem.Value = null;
        }
      } else if (item.Id === 'TTSSetting') {
        const ttsLanguageFormItem = this.chatSettingForm.value.find(x => x.Id === 'TTSLanguage');
        if (ttsLanguageFormItem) {
          ttsLanguageFormItem.List = targetFormItem.Value.optionsList;
          ttsLanguageFormItem.Value = null;
        }
      }
    }

  }

  public changeSettingForm(e) {

    let item = e['targetItem'];
    if (item.Id == "isA2A") {
      this.isA2A = item.Value
      let streamItem = this.chatSettingForm.value.find(x => x.Id === "isStream");
      if (streamItem && item.Value == true) {
        streamItem.Value = true;

      }

    }
  }

  public async checkChatRoom(id: string, agentData) {

    console.log('id', id)
    console.log('agentData', agentData)
    this.chatRoomEntity = await this.aiSvc.getchatRoom(id);
    console.log('chatRoomEntity', this.chatRoomEntity)
    if (this.chatRoomEntity == null)
      return null;

    let isupdate = false;
    if (this.chatRoomEntity['agentEntity'] == undefined || this.chatRoomEntity['agentEntity'] == null) {
      isupdate = true;
    }
    if (this.chatRoomEntity['agentEntity'].key == undefined || this.chatRoomEntity['agentEntity'].key == null) {
      isupdate = true;
    }
    if (isupdate) {
      await this.aiSvc.updatChatRoom(id, agentData);
    }

    return id;
  }


}

