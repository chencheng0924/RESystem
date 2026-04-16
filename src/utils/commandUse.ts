export class SignalREventItem {
  elementName?: string;
  contentType?: string;
  content?: string;
}

export class CommandFactory {
  private Context: CommandContext;
  constructor(init?) {
      Object.assign(this, init);
      this.init();
  }

  private init() {
      this.Context = new CommandContext();

      // 註冊指令動作(以便strategies比對指令類型)
      this.Context.registerStrategy(new CommandStrategyItem(CommandType.HOST, new HostStrategy()));
  }

  public run(command: string, sessionId?: string, isResetMap: boolean = true, source: string = "web") {
      if (this.Context.getStrategyCount() == 0) {
          console.error("沒有註冊任何指令動作")
          return;
      }

      // 用法
      //const command = 'mainCmd subCmd1 param1=value1 param2="value with spaces" param3=value3';
      const parser = new CommandParser(command);
      const entity: CommandEntity = parser.parse();
      entity.setResetMap(isResetMap);
      if(sessionId){
          entity.setSessionId(sessionId);
      }
      if (entity == null) {
          console.error(`指令解析錯誤 ${command}`)
          return;
      }
      this.Context.execute(entity);
  }

  public signalRToCommand(signalRdata: SignalREventItem) {
      // 轉換成 指令 signalRdata --> command line
        const { content, elementName } = signalRdata;
        let output = content.replace(/"([^"]*)"/, function(match, p1) {
          return '"' + p1.replace(/\s+/g, '') + '"';
        });
        return `${elementName} ${output}`;
  }
}

export interface ParsedCommand {
  MainCommand: string;
  SubCommand: string;
  Args: { [key: string]: string | boolean };
}

export class CommandEntity implements ParsedCommand {
  sessionId?: string;
  isResetMap?: boolean = true;
  MainCommand: string;
  SubCommand: string;
  Args: { [key: string]: string | boolean};
  constructor(init?) {
      Object.assign(this, init);
  }

  public setSessionId(id: string){
      this.sessionId = id;
      return this
  }
  public setResetMap(reset: boolean){
      this.isResetMap = reset;
      return this
  }
}

// 將轉化完的字串變為CommandEntity型態
export class CommandParser {
  Input: string;

  constructor(input: string) {
      this.Input = input;
  }

  parse(): CommandEntity {
      const matches = convertToArray(this.Input)
      if(matches[0]== 'chart'){
          matches[2] = this.formatJSONString(matches[2])
      }
      // const regex = /"([^"]+)"|(\S+)/g;
      // const matches = this.Input.match(regex);

      if (!matches || matches.length < 2) {
          throw null;
      }

      const MainCommand = matches[0].replace(/(^"|"$)/g, '');
      const SubCommand = matches[1].replace(/(^"|"$)/g, '');
      const Args: { [key: string]: string } = {};

      for (let i = 2; i < matches.length; i++) {
          // 用：判斷是否為物件
          const check = matches[i].includes(':')
          if(!check){
              const params = matches[i].split(/\s+/);
              params.forEach(param => {
                const [key, value] = param.split('=');
                Args[key] = value ? value.replace(/(^"|"$)/g, '') : '';
              });
          } else {
              const [key, value] = matches[i].split(/=(.+)/);
              Args[key] = value ? value.replace(/(^"|"$)/g, '') : '';
          }
      }

      return new CommandEntity({ MainCommand, SubCommand, Args });
  }

  public formatJSONString(inputString) {
      let processedString = inputString.replace(/\s+/g, ' ').trim();
      if (!processedString.startsWith('options=')) {
        processedString = 'options=' + processedString;
      }
      
      return processedString;
  };
}

export interface ICommandStrategy {
  CommandEntity: CommandEntity;
  execute(): any;
  setCommandEntity(command: CommandEntity): void;
}
export enum CommandType {
  HOST = "Host", //預設指令
}


export class CommandStrategyItem {
  public Type: CommandType;
  public Strategy: ICommandStrategy;
  constructor(t: CommandType, s: ICommandStrategy) {
      this.Type = t;
      this.Strategy = s;
  }
}

// 指令中心
export class CommandContext {
  private strategies: Array<CommandStrategyItem> = [];

  constructor() {
      this.strategies = [];
  }
  getStrategyCount() {
      return this.strategies.length;
  }

  registerStrategy(item: CommandStrategyItem) {
      this.strategies.push(item);
  }

  // 比對指令類型，並執行對應指令
  execute(entity: CommandEntity) {
      const item = this.strategies.find(x => x.Type == entity.MainCommand);
      if (item) {
          item.Strategy.setCommandEntity(entity)
          return item.Strategy.execute()
      }
      return `找不到控制命令類別 : ${entity.MainCommand}`;
  }
}

// 執行指令動作中心
export class CommangBaseStrategy implements ICommandStrategy {
  CommandEntity: CommandEntity;
  private _controller?: any;

  constructor(controller: any) {
      this._controller = controller;
  }

  setCommandEntity(command: CommandEntity) {
      this.CommandEntity = command;
      return this;
  }
  execute() {
      if (this.CommandEntity == null)
          return;

      let actionMethod = this.CommandEntity.SubCommand;
      if (actionMethod in this._controller){
          return this._controller[actionMethod](this.CommandEntity.Args);
      }

      let msg = `找不到指令動作 ${this.CommandEntity.MainCommand} ${this.CommandEntity.SubCommand}`;
      return msg
  }
}

// 指令種類
// 1.Host(預設)
export class HostStrategy extends CommangBaseStrategy {

  constructor() {
      super(new HostController());
  }
  execute() {
      return super.execute();
  }
}

class HostController {
  constructor() {
  }
  // 測試歡迎語
  showWelcome(params) {
    console.log('HostController->showWelcome', params)
  }
}


// 轉換method(可移至utils)
function convertToArray (input: string)  {
  // 移除字串前後的空白
  input = input.trim();
  
  // 找到第一個空格的位置
  const firstSpaceIndex = input.indexOf(' ');
  
  if (firstSpaceIndex === -1) {
    // 如果沒有空格,整個字串就是第一個元素
    return [input, '', ''];
  }
  
  // 提取第一個元素 (指令)
  const command = input.slice(0, firstSpaceIndex);
  
  // 提取剩餘的部分
  const rest = input.slice(firstSpaceIndex + 1).trim();
  
  // 查找 msg= 的位置
  const msgIndex = rest.indexOf('msg=');
  
  if (msgIndex !== -1) {
    // 如果找到 msg=，將剩餘部分分為兩個元素
    const subCommand = rest.slice(0, msgIndex).trim();
    const params = rest.slice(msgIndex);
    return [command, subCommand, params];
  } else {
    const firstWord = rest.split(' ')[0];
    const parts = rest.split(' ');
    const result = parts.slice(1).join(' ');  
    return [command, firstWord, result];
  }
}