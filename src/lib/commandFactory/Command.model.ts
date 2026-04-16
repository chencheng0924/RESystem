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
    Args: { [key: string]: string | boolean };
    constructor(init?) {
        Object.assign(this, init);
    }

    public setSessionId(id: string) {
        this.sessionId = id;
        return this
    }
}


export interface ICommandStrategy {
    CommandEntity: CommandEntity;
    execute(): any;
    setCommandEntity(command: CommandEntity): void;
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
        if (actionMethod in this._controller) {
            return this._controller[actionMethod](this.CommandEntity.Args);
        }

        let msg = `找不到指令動作 ${this.CommandEntity.MainCommand} ${this.CommandEntity.SubCommand}`;
        return msg
    }
}