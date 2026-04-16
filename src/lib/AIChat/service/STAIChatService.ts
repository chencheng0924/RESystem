import { BaseService } from "@/lib/pageBuilder/service/BaseService";
import { RawAxiosRequestConfig, ResponseType } from "axios";
import { STAichatAgentData } from "../model/STAIChat.model";
import { BaseResponseCode } from "@/lib/pageBuilder/service/BaseResponseCode";
import { EnvUtils } from "@/utils/envUtils";
import { ChatTraceType } from "../chat/chatFactoryManager";
import { ChatSendFileParams } from "../model/Chat.model";
let backendUrl = EnvUtils.getRaiPath()

export class STAiAgentService extends BaseService {
    constructor() {
        super();
    }
    private testChatRoomID: string = localStorage.getItem('chatRoomId');
    private streamConfig?: RawAxiosRequestConfig = { responseType: 'stream' as ResponseType };

    public async getChatRoomData(setting: any, roomId: string, inputMes: string, imgData?: any, signal?: AbortSignal) {
        //console.log(imgData)
        // this.testChatRoomID = localStorage.getItem('chatRoomId');
        this.testChatRoomID = roomId
        const data = {
            contentType: imgData.type ? imgData.type : 'text',
            content: imgData.imgBase64 ? imgData.imgBase64 : inputMes,
            additionalTextContent: imgData.imgBase64 ? inputMes : null
        }
        let params = {
            ChatRequest: {
                data: data,
                isDebug: setting.isDebug,
                userInitial: setting.userInitial
            },
            id: this.testChatRoomID

        };

        return await this.api.rai.AIChatRoom.Action.postByidChat(params).then((response: any) => {
            let duration: string
            if (response.timeMark) {
                duration = (response.timeMark.duration / 1000).toFixed(2) + '秒'
            }
            const sessionId = response.headers['x-chat-sessionid'];
            const result = [{
                data: response.data,
                sessionId: sessionId,
                createTime: response.timeMark.responseTime,
                duration: duration
            }]
            return result
        }).catch((error) => {
            return [];
        });
    }

    public async getAgentType() {
        const params = {
            PageRows: 50
        }
        return this.api.rai.AIAgent.Basic.get(params).then(res => {
            return res.data.data
        })
    }

    public async createRoom(agentData: STAichatAgentData) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const params = {
            WMBAIChatRoom:
                Object.assign(
                    {
                        name: agentData?.name ?? `webTest ${year}${month}${day}`,
                        isVisible: false
                    }, agentData.getEntity()
                )
        }

        return this.api.rai.AIChatRoom.Basic.post(params).then(res => {
            if (res.data) {
                return res.data.id;
            }
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }


    private setRoomIDInHistory(agentId: string, chatRoomId: string) {
        const historyList = localStorage.getItem('chatRoomIDHistoryList')
        const pastIds = historyList ? JSON.parse(historyList) : []
        const newHistory = [...pastIds, { agentID: agentId, chatRoomID: chatRoomId }]

        localStorage.setItem('chatRoomIDHistoryList', JSON.stringify(newHistory))
    }

    // 下載 xls
    public async downloadXlsByChatRoomId(chatRoomId: string, fileName?: string) {
        let url = `${backendUrl}/Extended/AIChatFeedback/AgentFeedBackResult/File`
        url += `?PageRows=100`
        url += "&type=Chat"
        url += `&chatRoomId=${chatRoomId}`

        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        xhr.open('get', url);
        xhr.setRequestHeader('Authorization', `Bearer ${this.api.getkeyBearer()}`);
        xhr.responseType = 'blob';
        xhr.onload = (e) => {

            if (xhr.status != 200)
                return;

            let blob = xhr.response;

            const link = document.createElement('a')
            let url = URL.createObjectURL(blob)
            link.href = url;
            link.download = `${fileName}`;
            link.click()
            URL.revokeObjectURL(link.href)
        }

        xhr.send(formData);

    }

    public async submitComment(data: any) {
        let params = {
            WMBAIChatFeedback: {
                sessionId: data.sessionId,
                score: data.score
            }
        }
        return this.api.rai.AIChatFeedback.Basic.post(params).then(res => {
            if (res.status != BaseResponseCode.SUCCESS) return null
            return res.data;
        }).catch(err => {
            return false
        })
    }

    public async submitCommentText(data: any, feedbackEntity: any) {
        let params = {
            WMBAIChatFeedbackDetail: {
                aiChatFeedbackEntity: {
                    key: feedbackEntity.id
                },
                feedbackContent: data.commentText
            }
        }
        return this.api.rai.AIChatFeedbackDetail.Basic.post(params).then(res => {
            if (res.status != BaseResponseCode.SUCCESS) return false
            return true
        }).catch(err => {
            return false
        })
    }

    public async getChatRoomDataNew(setting: any, roomId: string, inputMes: string, uploadData?: ChatSendFileParams, signal?: AbortSignal) {
        this.testChatRoomID = roomId

        let data = {}
        if (uploadData.resourceId) {
            data = {
                contentType: uploadData.type,
                content: uploadData.resourceId,
                additionalTextContent: inputMes
            }
        } else {
            data = {
                contentType: uploadData.type ? uploadData.type : 'text',
                content: uploadData.imgBase64 ? uploadData.imgBase64 : inputMes,
                additionalTextContent: uploadData.imgBase64 ? inputMes : null
            }
        }
        let params = {
            ChatRequest: {
                data: data,
                isDebug: setting.isDebug,
                userInitial: setting.userInitial
            },
            id: this.testChatRoomID

        };

        return await this.api.rai.AIChatRoom.Action.postByidChat(params).then((response: any) => {
            let duration: string
            if (response.timeMark) {
                duration = (response.timeMark.duration / 1000).toFixed(2) + '秒'
            }
            const sessionId = response.headers['x-chat-sessionid'];
            const result = {
                data: response.data,
                sessionId: sessionId,
                createTime: response.timeMark.responseTime,
                duration: duration
            }
            return result
        }).catch((error) => {
            return [];
        });
    }

    public async getChatRoomDataStream(setting: any, roomId: string, inputMes: string, uploadData?: any, signal?: AbortSignal, callback?: any) {
        const startTime = Date.now()
        this.testChatRoomID = roomId
        let data = {}
        if (uploadData.resourceId) {
            data = {
                contentType: uploadData.type,
                content: uploadData.resourceId,
                additionalTextContent: inputMes
            }
        } else {
            data = {
                contentType: uploadData.type ? uploadData.type : 'text',
                content: uploadData.imgBase64 ? uploadData.imgBase64 : inputMes,
                additionalTextContent: uploadData.imgBase64 ? inputMes : null
            }
        }

        let params = {
            ChatRequest: {
                data: data,
                isDebug: setting.isDebug,
                userInitial: setting.userInitial
            },
            id: this.testChatRoomID
        }

        const url = `${backendUrl}/Action/AIChatRoom/${params.id}/ChatServerSentEvent`
        const body = JSON.stringify(params.ChatRequest)
        let token = await this.api.gteToken()
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body,
            signal
        })

        if (!response.body) throw new Error('串接SSE失敗')

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let temp = ''
        callback('', ChatTraceType.START)
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })

            let lineText = this.parseSSEResult(chunk);
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
            createTime: Date.now(),
            duration: duration
        }

        callback(result, ChatTraceType.END)
        return result
    }

    private parseSSEResult(result: string) {
        const lines = result.split('\n').filter(line => line.startsWith('data: '))

        const chars = lines.map(line => {
            try {
                const jsonStr = line.replace('data: ', '').trim()
                const obj = JSON.parse(jsonStr)
                if (obj.ContentType != "text")
                    return '';
                return obj.Content || ''
            } catch (e) {
                return ''
            }
        })
        return chars.filter(c => c)
    }

    public async getchatRoom(id: string) {
        const params = {
            id: id
        }
        return this.api.rai.AIChatRoom.Basic.getByid(params).then(res => {
            return res?.data ?? null;
        }).catch((e) => {
            return null;
        })
    }
    public async updatChatRoom(id: string, agentData: STAichatAgentData) {
        agentData = new STAichatAgentData(agentData);
        const params = {
            WMBAIChatRoom: Object.assign(
                {
                    id: id
                }, agentData.getEntity()
            )
        }
        return this.api.rai.AIChatRoom.Basic.patch(params).then(res => {
            return res.data;
        }).catch((e) => {
            return null;
        })
    }
    public async getHistoryById(agentId: string) {
        if (agentId == '')
            return Promise.resolve([]);
        let param = {
            id: agentId
        }
        //console.log('agentId', agentId)
        return this.api.rai.AIChatRoom.Custom.getByidChatRoomHistorys(param).then(res => {

            //console.log('res', res.data.data)
            return res.data.data;
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }
    public async clearHistoryById(chatroomId: string) {
        if (chatroomId == '')
            return Promise.resolve([]);
        let param = {
            id: chatroomId
        }
        //console.log('agentId', agentId)
        return this.api.rai.AIChatRoom.Action.postByidClearHistory(param).then(res => {

            //console.log('res', res.data.data)
            return res.data;
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }

    // 上傳檔案類型
    public async getChatrRoomFileTypes(chatroomid: string) {

        const params = {
            chatRoomId: chatroomid
        }
        return this.api.rai.AIChatRoom.List.getBychatRoomIdFileExt(params).then(res => {
            if (res.data) {
                return res.data.data;
            }
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }

    sendFile(chatRoomId: string, file: File) {
        let param = {
            chatRoomId: chatRoomId,
            file: file
        }
        return this.api.raiUpload.AIFileResource.Basic.post(param).then((res) => {
            if (res.status != BaseResponseCode.SUCCESS)
                return null;
            return res.data;
        }).catch((error) => {
            return null;
        })
    }
}
