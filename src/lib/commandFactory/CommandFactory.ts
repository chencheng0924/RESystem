import { HostStrategy } from "./Command.example.strategy";
import { CommandEntity, ICommandStrategy } from "./Command.model";
import { CommandParser } from "./CommandParser";
//----------------------------------------------------------
//  快捷指令
//----------------------------------------------------------
export class Command {
    static Host(command: string) {
        let cmd = new CommandFactory();

        cmd.run(command);
    }
}





//----------------------------------------------------------
//  指令註冊中心
//----------------------------------------------------------
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


//----------------------------------------------------------
//   執行指令
//----------------------------------------------------------
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

    public run(command: string, sessionId?: string, source: string = "web") {
        if (this.Context.getStrategyCount() == 0) {
            console.error("沒有註冊任何指令動作")
            return;
        }

        // 用法
        //const command = 'mainCmd subCmd1 param1=value1 param2="value with spaces" param3=value3';
        const parser = new CommandParser(command);
        const entity: CommandEntity = parser.parse();
        if (sessionId) {
            entity.setSessionId(sessionId);
        }
        if (entity == null) {
            console.error(`指令解析錯誤 ${command}`)
            return;
        }
        this.Context.execute(entity);
    }

    // public signalRToCommand(signalRdata: SignalREventItem) {
    //     // 轉換成 指令 signalRdata --> command line
    //     const { content, elementName } = signalRdata;
    //     let output = content.replace(/"([^"]*)"/, function (match, p1) {
    //         return '"' + p1.replace(/\s+/g, '') + '"';
    //     });
    //     return `${elementName} ${output}`;
    // }
}



// 指令中心註冊
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
