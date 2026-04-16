import moment from "moment";
import "moment-timezone";


export class DateExtension {
    constructor() { }

    public static getDiffDay(startDay, endDay) {
        const type = "days";
        const arrivalStart = moment(startDay, 'YYYY/MM/DD')
        const arrivalend = moment(endDay, 'YYYY/MM/DD')
        const diffTime = arrivalend.diff(arrivalStart, type)
        return diffTime;
    }
    public static getTimestampTodate(unixTimestamp: number) {
        let dstring = moment.unix(unixTimestamp).format("YYYY/MM/DD HH:mm:ss");
        return new Date(dstring);
    }
    // 跟現在比 差多少分鐘
    public static getDiffMinutesByNow(targetDate) {
        const type = "minutes";
        const arrivalT = moment(targetDate, 'HH:mm')

        const now = moment()
        const diffTime = arrivalT.diff(now, type)
        return diffTime;
    }

    public static getTimestampByNow(minutes: number = 0) {
        const now = moment().add(minutes, 'minutes');
        let timestamp = now.format("X");
        return timestamp;
    }

    public static getCalendarDate(date) {

        let d = moment(date);
        let d2 = d.format("YYYYMMDD");
        let d3 = d.format("HH");
        return `${d2}T${d3}${d.minutes()}00`;
    }
    public static getDateFormat(date, fornate: string = 'YYYY-MM-DD HH:mm:ss') {
        if (date == null || date == '')
            return '';
        let dObj = new Date(date);
        //console.log("dObj", dObj,);
        let off = dObj.getTimezoneOffset();
        if (off < 0)
            off = off * -1;
        let d = moment(dObj).utcOffset(off);//補回時差
        let d2 = d.format(fornate);
        return d2;
    }
    public static getDateFormatByDateObject(date) {
        let dObj = date;
        //console.log("dObj", dObj,);
        let off = dObj.getTimezoneOffset();
        if (off < 0)
            off = off * -1;
        let d = moment(dObj).utcOffset(off);//補回時差
        let d2 = d.format("YYYY-MM-DD HH:mm:ss");
        return d2;
    }
    public static toFormat(date, f) {
        let dObj = new Date(date);
        let off = dObj.getTimezoneOffset();
        if (off < 0)
            off = off * -1;
        let d = moment(dObj).utcOffset(off);//補回時差
        let d2 = d.format(f);
        return d2;
    }

    public static getWeekday(date) {
        let d = moment(date);
        return d.isoWeekday()

    }

    // 取幾個月(前/後)的日期
    public static getDateByMonths = (months: number = 6, date: Date = new Date()): Date => {
        return moment.utc(date)
            .add(months, 'months') // 使用 add，因為負數會自動變成減法
            .startOf('day')
            .toDate();
    }

    public static getUTC(date) {
        const result = moment.tz(date, 'Asia/Taipei').format();
        return result;
    }

    public static getDateByDay = (days: number = 6, date: Date = new Date()): Date => {
        return moment.utc(date)
            .add(days, 'days') // 使用 add，因為負數會自動變成減法
            .startOf('day')
            .toDate();
    }
}