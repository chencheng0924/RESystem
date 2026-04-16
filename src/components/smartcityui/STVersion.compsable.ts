import { ref, Ref } from "vue"
import { VersionRecord, GroupedVersionRecord } from "./STVersion.model.ts";

export class VersionHistoryController {
    public versions: Ref<VersionRecord[]>;
    public displayCount: Ref<number>;
    public loadMoreCount: number = 10;

    constructor() {
        this.versions = ref<VersionRecord[]>([]);
        this.displayCount = ref(10);
    }

    public setVersions(versions: VersionRecord[]) {
        // 將 timestamp 轉換為 Date 物件並排序
        this.versions.value = versions.map(v => ({
            ...v,
            timestamp: this.parseTimestamp(v.timestamp)
        })).sort((a, b) =>
            b.timestamp.getTime() - a.timestamp.getTime()
        );
    }

    private parseTimestamp(timestamp: Date | string): Date {
        if (timestamp instanceof Date) {
            return timestamp;
        }
        // 處理字串格式的時間戳記
        return new Date(timestamp);
    }

    public getCurrentVersion(): VersionRecord | undefined {
        return this.versions.value.find(v => v.isCurrent);
    }

    public getGroupedVersions(): GroupedVersionRecord[] {
        const displayVersions = this.versions.value.slice(0, this.displayCount.value);
        const grouped: GroupedVersionRecord[] = [];

        displayVersions.forEach(version => {
            const timeLabel = this.formatTimeLabel(version.timestamp);
            const existingGroup = grouped.find(g => g.timeLabel === timeLabel);

            if (existingGroup) {
                version.users.forEach(user => {
                    if (!existingGroup.users.find(u => u.userId === user.userId)) {
                        existingGroup.users.push(user);
                    }
                });
            } else {
                grouped.push({
                    timeLabel,
                    timestamp: version.timestamp,
                    users: [...version.users],
                    isCurrent: version.isCurrent
                });
            }
        });

        return grouped
    }

    private formatTimeLabel(date: Date | string): string {
        const dateObj = this.parseTimestamp(date);
        const now = new Date();
        const isToday = dateObj.toDateString() === now.toDateString();

        if (isToday) {
            return this.formatTime(dateObj);
        } else {
            return this.formatFullDateTime(dateObj);
        }
    }

    private formatTime(date: Date): string {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    private formatFullDateTime(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const time = this.formatTime(date);
        return `${year}-${month}-${day}, ${time}`;
    }

    public loadMore() {
        this.displayCount.value += this.loadMoreCount;
    }

    public hasMore(): boolean {
        return this.displayCount.value < this.versions.value.length;
    }
}
