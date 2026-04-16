#### Stock模組


### 安裝
1. package.json -> dependencies 增加signalr SDK
"@microsoft/signalr": "^8.0.7",

2. 建立 IStockStrategy 實例 , 參考 SignalRConnect 寫法
SignalRConnect 目前綁定 AI模組

```
 class SignalRConnect implements IStockStrategy 
 {
    .....
 }


```

3.
```
 await controller.createRoom();
 let stock = StockFactory.startSignalR();// 先建立聊天室ID

```