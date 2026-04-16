import mitt from 'mitt'

export const enum eventList{
  TEST_EVENT = 'test-event'
}

type Events = {
  [eventList.TEST_EVENT]: {
    message: string;
  };
}

// 創建並導出 emitter 實例
export const emitter = mitt<Events>()