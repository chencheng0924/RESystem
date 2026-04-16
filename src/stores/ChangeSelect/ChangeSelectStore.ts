import { defineStore } from "pinia";

export const ChangeSelectStore = defineStore('ChangeSelectStore', {
    persist: true,
    state: () => ({
        cardTitleClick: {} as any, //存專案 keyvalue

        currentTabId: '', // 存選中哪個代理  string

        mode: 'card',

        searchText: ''// 搜尋文字
    }),
    getters: {

    },
    actions: {
        // listview 中選中的Item : 如某專案
        setCardTitleClick(clickedDataProps: any) {
            this.cardTitleClick = clickedDataProps;
        },
        getCardTitleClick() {
            return this.cardTitleClick;
        },
        // 存選中哪個代理 
        setCurrentTab(tabid: string) {
            this.currentTabId = tabid;
        },
        getCurrentTab() {
            return this.currentTabId
        },

        setTableDisplayMode(mode) {
            this.mode = mode;
        },
        getTableDisplayMode() {
            return this.mode;
        },
        setSearchTxt(txt) {
            this.searchText = txt;
        },
        getSearchTxt() {
            return this.searchText;
        }
    },
});
