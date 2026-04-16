import { CommandEntity } from './commandUse'
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