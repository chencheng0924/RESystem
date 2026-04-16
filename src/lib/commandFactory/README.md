#### 指令模組


### 安裝
1. commandFactory folder 底下檔案引入
Command.model.ts
CommandFactory.ts
CommandParser.ts

2. 新增自己的指令
2.1 新增一個檔案,放置在任意位置
ex : Command.example.strategy.ts

2.2 新建一個 Strategy(ex:CustomStrategy) , 在新建一個指領類別(ex:CustomController)

```
export class CustomStrategy extends CommangBaseStrategy {

    constructor() {
        super(new CustomController());
    }
    execute() {
        return super.execute();
    }
}

class CustomController {
    constructor() {
    }
    // 測試歡迎語
    showWelcome(params) {
        console.log('CustomController->showWelcome', params)
    }
}

```

3. 註冊指令 CommandFactory.ts
3.1 增加CommandType
```
export enum CommandType {
    HOST = "Host", //預設指令
    CUSTOM="custom"
}

//在 CommandFactory中的 init 註冊
 this.Context.registerStrategy(new CommandStrategyItem(CommandType.CUSTOM, new CustomStrategy()));

```

4. 調用 Command 
```
  let cmd = new CommandFactory();
  cmd.run('custom showWelcome para1=false param2="test string" ');
```
