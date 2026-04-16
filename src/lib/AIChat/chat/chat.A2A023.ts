import { FilePart } from './../A2A/A2AMModel';
import { IChat } from '../interface/IChat';
import { ChatSendParams } from '../model/Chat.model';
import { AIChatStore, useAIChatStore } from '../store/AIChatStore';

import { A2AClient } from '../A2A/A2AClient';
import { EnvUtils } from '@/utils/envUtils';
import { TokenService } from '@/service/TokenService';
import { MessageSendParams, SendStreamingMessageSuccessResponse, Task, TaskArtifactUpdateEvent, TaskStatusUpdateEvent, TextPart } from '../A2A/A2AMModel';
import { ChatTraceType } from './chatFactoryManager';
import { DateExtension } from '@/utils/dateExtension';
import { MessageLog } from '../model/MessageLog.model';
import { FlowElement } from '../model/FlowNode.model';
import { events, stream } from 'fetch-event-stream';

export class A2A023Chat implements IChat {
  private chatSvc
  private AIChatStore: AIChatStore
  private tokenSvc = new TokenService();
  private client: A2AClient
  constructor() {
    this.AIChatStore = useAIChatStore()

  }

  private generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  public async sendMessage(params: ChatSendParams): Promise<any> {

    let token = await this.tokenSvc.getCurrentToken();
    let tokenString = token?.access_token;
    let agnetEntity = params.agentData.getEntity();
    let chatRoomSetting = this.AIChatStore.getChatSetting()


    return Promise.resolve([])
    //return await this.chatSvc.getChatRoomDataNew(chatRoomSetting, params.roomId, params.message, params.uploadData, params.signal)
  }
  public async sendMessageStream(params: ChatSendParams, callback): Promise<any> {

    let token = await this.tokenSvc.getCurrentToken();
    let tokenString = token?.access_token;
    let agnetEntity = params.agentData.getEntity();
    let chatRoomSetting = this.AIChatStore.getChatSetting()

    let url = `${EnvUtils.getRaiPath()}/A2A/${agnetEntity.agentType.key}/${agnetEntity.agentEntity.key}`
    // this.client = new A2AClient(url, {
    //   'Authorization': `Bearer ${tokenString}`
    // });
    let messageId = this.generateUUID();
    const startTime = Date.now()
    let logId = this.generateUUID()
    try {
      let paramData: any = {
        jsonrpc: "2.0",
        method: "message/stream",
        params: {
          message: {
            messageId: messageId,
            role: "user",
            parts: [
              {
                kind: "text",
                text: params.message
              },

            ],
            metadata: {
              isDebug: chatRoomSetting.isDebug,
              background: chatRoomSetting.userInitial ?? null
            },
            contextId: params.roomId,
            kind: "message",

          }
        },
        id: logId,


      };

      paramData = this.setFileDatapush(params, paramData);

      const body = JSON.stringify(paramData)
      let s = params.signal as AbortSignal;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${tokenString}`
        },
        body,

      })

      if (!response.body) throw new Error('串接SSE失敗')

      // TODO 下次可以改用這個寫 比較好拆分 , 沒有 event name 的就是主訊息
      // if (response.ok) {
      //   let stream = events(response);
      //   for await (let event of stream) {
      //     console.log('<<', event);
      //   }
      // }



      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let temp = ''
      callback(logId, ChatTraceType.START)
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        let lineText = this.parseSSEResult(chunk, logId);
        callback(lineText, ChatTraceType.PROCESSING)
        temp += chunk
      }
      //const chars = this.parseSSEResult(temp)
      const sessionId = response.headers['x-chat-sessionid']
      const endTime = Date.now()
      const duration = ((endTime - startTime) / 1000).toFixed(2) + '秒'

      const result = {
        data: '',
        sessionId: sessionId,
        createTime: startTime,
        duration: duration,

      }

      callback(result, ChatTraceType.END)



    } catch (ex) {
      console.log('sendMessageStream ', ex)
    }
  }

  private parseSSEResult(result: string, logId: string) {
    const lines = result.split('\n').filter(line => line.startsWith('data: '))

    const chars = lines.map(line => {
      try {
        const jsonStr = line.replace('data: ', '').trim()
        const obj: SendStreamingMessageSuccessResponse = JSON.parse(jsonStr)
        console.log('obj:', obj)

        // contentType: "text" => 其他類型
        if (obj == null || obj.result == null) {
          if (obj.hasOwnProperty('contentType') == true) {
            if (obj['contentType'] == "markdown") {
              this.LogData(obj);
            }
            else if (obj['eventType'] == "ExceptionEvent") {
              this.LogData(obj, obj['eventType']);
            }
            else if (obj['contentType'] == "text") {
              if (obj['elementName'] != undefined && obj['elementName'] != null && obj['elementName'] != "Speak") {
                this.FlowNodeLog(obj, logId)
              } else {
                this.GroupAgentStepLog(obj, logId);
              }

            }
          }
          return '';
        }

        if (obj.result.kind == 'artifact-update') {
          let texts = obj.result.artifact.parts.filter(x => x.kind == "text").map(x => x as TextPart);
          if (texts == null || texts.length == 0)
            return '';

          let conent = texts.map(x => x.text).join('');
          return conent;
        }


        return ''
      } catch (e) {
        return ''
      }
    })
    return chars.filter(c => c)
  }

  private setFileDatapush(params: ChatSendParams, paramData: any) {

    let isFileOrImg = params.uploadData.isFileOrImg();
    if (isFileOrImg == false)
      return paramData;

    let file = null;
    // 檔案
    if (params.uploadData.isResource() && (!!params.uploadData.resourceId) == true) {
      params.uploadData.resourceIds.forEach((x) => {

        file = {
          kind: "file",
          file: {
            mimeType: "fileResource",
            name: params.uploadData.type,
            uri: x
          }
        };

        paramData.params.message.parts.push(file)
      })

    }
    else if ((!!params.uploadData.imgBase64) == true) { // 圖片類

      params.uploadData.imgBase64s.forEach((x) => {

        file = {
          kind: "file",
          file: {
            name: "image",
            mimeType: params.uploadData.type,
            bytes: x
          }
        };
        paramData.params.message.parts.push(file)
      });

    }

    return paramData;
  }

  // 除錯記錄 
  private LogData(obj, eventType?: string) {
    let store = useAIChatStore()
    let logEntity = {
      data: [{
        ContentType: obj['contentType'],
        Content: obj.content,
      }],
      time: DateExtension.getDateFormat(Date.now),
      type: eventType ?? obj['contentType'],
      roomId: ''
    }
    console.log('LogData', logEntity);
    store.logData.push(logEntity)
  }
  // 群組代理使用
  private GroupAgentStepLog(obj, logId) {
    let store = useAIChatStore()
    // {"speaker":"30165442067314688","elementName":"Speak","contentType":"text","content":"##"}
    // 同一個 Speak 要一起顯示

    //console.log("store.messageLogData:", store.messageLogData);
    let currentSpeaker = store.messageLogData.find(x => x.id == logId && x.subid == obj.speaker);
    if (currentSpeaker == null) {
      let logEntity = new MessageLog({
        id: logId,
        subid: obj.speaker,
        contentType: obj['contentType'],
        content: obj.content,
        time: DateExtension.getDateFormat(Date.now),
        type: obj['contentType'],
      });
      store.messageLogData.push(logEntity);
      //console.log("currentSpeaker == null:", logEntity);
    }
    else {
      currentSpeaker.content += obj.content;
      //console.log("logEntity.Content:", logEntity);
    }

  }
  // 流程代理使用
  private FlowNodeLog(obj, logId) {
    let store = useAIChatStore()
    // {"nodeId":"30165442067314688","elementName":"","contentType":"text","content":"##"}
    // 同一個 nodeId 或 fromNodeId+toNodeId   要一起顯示
    let el = FlowElement.getElement(obj);
    let c = el.getContent();
    if (el == null || c == "") {
      return;
    }
    let currentNode = store.messageLogData.find(x => x.id == logId && x.subid == el.getID());
    if (currentNode == null) {
      let logEntity = new MessageLog({
        id: logId,
        subid: el.getID(),
        contentType: el.contentType,
        content: el.getContent(),
        time: DateExtension.getDateFormat(Date.now),
        type: el.contentType,
      });
      store.messageLogData.push(logEntity);
    }
    else {
      currentNode.content += el.getContent();
    }
  }

}