import { computed, ref, Ref } from "vue"
export class UseSTChartHeatMap {
    public gridRowData: Ref<Array<any>>;
    public gridColData: Ref<Array<any>>;
    public gridData: Ref<Array<any>>;
    public startColor: Ref<Object>;
    public endColor: Ref<Object>
    public steps: Ref<number>;
    constructor() {
        this.gridRowData = ref([])
        this.gridColData = ref([]);
        this.gridData = ref([])
        this.startColor = ref({ r: 158, g: 142, b: 255, a: 0 });
        this.endColor = ref({ r: 128, g: 107, b: 255, a: 1 });
        this.steps = ref(21)
        // this.init();
    }

    private init() {
        this.gridRowData.value = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        this.gridColData.value = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0') + ':00');
        this.gridData.value = [
            { date: '2024-11-11T05:00:00', degree: 8 },
            { date: '2024-11-17T14:00:00', degree: 5 },
            { date: '2024-11-16T13:00:00', degree: 9 },
            { date: '2024-11-15T10:00:00', degree: 13 },
            { date: '2024-11-15T10:00:00', degree: 20 },]
    }


    public getCellStyle(week, hour, gridData, labelData, startColor, endColor, steps) {
        let startColors = `rgba(${startColor.r},${startColor.g},${startColor.b},${startColor.a})`;
        let endColors = `rgba(${endColor.r},${endColor.g},${endColor.b},${endColor.a})`;

        const entry = gridData.find((item) => {
            const normalizedDate = item.date.replace(/\//g, "-");
            const entryDate = new Date(normalizedDate);
            const entryWeek = this.getWeekLabel(entryDate.getDay(), labelData);
            const entryHour = entryDate.getHours().toString().padStart(2, "0") + ':00';
            return entryWeek === week && entryHour === hour;
        });

        if (entry) {
            const alpha = entry.degree / steps;
            return {
                backgroundColor: `rgba(${startColor.r},${startColor.g},${startColor.b},${alpha})`//`rgba(128, 107, 255, ${alpha})`,
            };
        }
        return { backgroundColor: startColors }; // Default color"rgba(43, 40, 56, 1)" 
        // if (entry) {
        //     const colorIntensity = Math.floor((entry.degree / 20) * 255); // 根據 degree 計算顏色深度
        //     return {
        //         backgroundColor: `rgb(${255 - colorIntensity}, ${255 - colorIntensity}, 255)`
        //     };
        // }
        // return { backgroundColor: "#9E8EFF" };
    }


    public getCellContent(week, hour, data, labelData) {
        const entry = data.find((item) => {
            const normalizedDate = item.date.replace(/\//g, "-");
            const entryDate = new Date(normalizedDate);
            const entryWeek = this.getWeekLabel(entryDate.getDay(), labelData);
            const entryHour = entryDate.getHours().toString().padStart(2, "0");
            return entryWeek === week && entryHour === hour;
        });
        return entry ? entry.degree : ""; // 顯示 degree 或保持空白
    }

    public getWeekLabel(dayIndex, labelData) {
        // const labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
        return labelData[dayIndex];
    }

    public getHourLabel(hour, data) {
        // const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
        return data.includes(hour) ? hour : "";
    }

    public interPolate(start, end, factor) {
        return start + (end - start) * factor;
    }
}