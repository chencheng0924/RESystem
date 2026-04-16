export class PageAiChatAgentData {
  key?: string;
  name?: string;
  type?: PageAIAgentType = PageAIAgentType.AGENT;
  llm?: PageLLMAttributes

  constructor(init?: Partial<PageAiChatAgentData>) {
    Object.assign(this, init);
  }

  setTypeByAgent() {
    this.type = PageAIAgentType.AGENT;
    return this;
  }
  setTypeByChatGroup() {
    this.type = PageAIAgentType.CHATGROUP;
    return this;
  }
  setTypeBySummary() {
    this.type = PageAIAgentType.SUMMARY;
    return this;
  }
  setTypeByFlow() {
    this.type = PageAIAgentType.FLOW;
    return this;
  }
  setTypeByProxy() {
    this.type = PageAIAgentType.PROXY;
    return this;
  }
  setTypeByLibrary() {
    this.type = PageAIAgentType.LIBRARY;
    return this;
  }

  setType(currentType: PageAIAgentType) {
    this.type = currentType;
    return this;
  }
  setTypeString(currentType: PageAIAgentType) {
    this.type = currentType;
    return this;
  }
  setLLMData(llm: PageLLMAttributes) {
    this.llm = llm;
    return this;
  }
}


export enum PageAIAgentType {
  AGENT,
  CHATGROUP,
  SUMMARY,
  FLOW,
  PROXY,
  LIBRARY
}

export enum PageAIAgentTypeList {
  Standard = 'Standard',
  Proxy = 'Proxy',
  Summary = 'Summary',
  Flow = 'Flow',
  GroupChat = 'GroupChat',
  Library = 'Library'
}

export class PageLLMAttributes {
  id?: string;
  name?: string;
  isFunctionCallingSupported?: boolean;
  isFunctionCallingStreamingSupported?: boolean;

  constructor(init?) {
    Object.assign(this, init);
  }
}