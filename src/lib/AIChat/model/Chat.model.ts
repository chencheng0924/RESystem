import { STAichatAgentData, STFileItem, STImgItem } from "./STAIChat.model";

export class ChatSendParams {
  roomId: string;
  message: string;
  uploadData?: ChatSendFileParams;
  signal?: AbortSignal;
  agentData?: STAichatAgentData
  isStream?: boolean = true;

  constructor(init?: Partial<ChatSendParams>) {
    Object.assign(this, init);
  }
}



export class ChatSendFileParams {
  imgBase64?: string
  imgBase64s?: Array<string> = []
  type?: string
  resourceId?: string
  resourceIds?: Array<string> = []
  constructor(init?) {
    Object.assign(this, init);
  }


  setFile(selectFileList: Array<STFileItem>) {
    if (selectFileList == undefined || selectFileList == null || selectFileList.length == 0)
      return this;
    let fileObject = selectFileList.firstOrDefault();
    if (fileObject == null)
      return this;

    this.resourceIds = selectFileList.map(x => x.fileId);

    this.type = 'fileResource';
    this.resourceId = fileObject.fileId;

    return this;
  }
  setImgBase64(selectImgList: Array<STImgItem>) {
    if (selectImgList == undefined || selectImgList == null || selectImgList.length == 0)
      return this;
    let imgObject = selectImgList.firstOrDefault();
    if (imgObject == null)
      return this;


    for (let i = 0; i < selectImgList.length; i++) {
      let img: string = selectImgList[i].imgBase64;
      let type: string = selectImgList[i].file.type;

      if (img == undefined || img == null || img == "")
        continue;

      this.type = type ? type : 'text';
      if (i == 0)
        this.imgBase64 = img;

      this.imgBase64s.push(img);
    }

    return this;
  }

  isFileOrImg() {
    if ((!!this.resourceId) == false && (!!this.imgBase64) == false)
      return false;


    return true;
  }

  isResource() {
    if (this.type == "fileResource")
      return true;


    return false;
  }

}