import { defineStore } from "pinia";
import { RecentItem, RecentListHistory } from "./RecentListHistory.moel";


export const RecentListHistoryStore = defineStore('RecentListHistoryStore', {
    persist: true,
    state: () => ({
        RecentList: [],
        CountLimit: 10
    }),
    getters: {
    },
    actions: {
        add(command: RecentItem) {
            if (this.RecentList.length == this.CountLimit) {
                this.RecentList.shift();// 移除第一個
            }
            if (this.RecentList.length > this.CountLimit) {
                this.RecentList = this.RecentList.slice(0, this.CountLimit);
            }

            this.RecentList = this.RecentList.filter(x => x.Id != command.Id);
            this.RecentList.push(command);
        },

        clearHistory() {
            this.RecentList.length = 0;
        }


    },
});
