import { ListItem } from "@/service/bus/BusService.model";

let baseUrl = import.meta.env.VITE_BACKEND_HOST;
export class SoundBuilder {
    constructor() {

    }
    public Audio(text, lang) {

        let url = `${baseUrl}/bsuper/Basic/Verify/GenerateCaptchaAudio/${text}`;

        let audioobj = new Audio(url);
        audioobj.play();



        // if (text == undefined || text == "")
        //     return;
        // text = this.convertText(text, lang);
        // const synth = window.speechSynthesis;
        // const utter = new SpeechSynthesisUtterance();
        // utter.lang = lang;//'zh';
        // utter.rate = 0.7;
        // utter.text = text
        // utter.volume = 1
        // utter.pitch = 1
        // synth.speak(utter)
    }
    private convertText(text: string, lang: string) {
        let mapData: Array<ListItem>;
        if (lang == 'zh-TW') {
            mapData = [
                new ListItem("0", "零"),
                new ListItem("1", "一"),
                new ListItem("2", "二"),
                new ListItem("3", "三"),
                new ListItem("4", "四"),
                new ListItem("5", "五"),
                new ListItem("6", "六"),
                new ListItem("7", "七"),
                new ListItem("8", "八"),
                new ListItem("9", "九")

            ];

        } else {
            mapData = [
                new ListItem("0", "zero"),
                new ListItem("1", "one"),
                new ListItem("2", "two"),
                new ListItem("3", "three"),
                new ListItem("4", "four"),
                new ListItem("5", "five"),
                new ListItem("6", "six"),
                new ListItem("7", "seven"),
                new ListItem("8", "eight"),
                new ListItem("9", "nine")

            ];

        }

        text = text.split('')
            .map(x => mapData.find(z => z.key == x).value).join();

        return text;
    }
    // private convertText(text: string) {

    //     const mapData: Array<ListItem> = [
    //         new ListItem("0", "零"),
    //         new ListItem("1", "一"),
    //         new ListItem("2", "二"),
    //         new ListItem("3", "三"),
    //         new ListItem("4", "四"),
    //         new ListItem("5", "五"),
    //         new ListItem("6", "六"),
    //         new ListItem("7", "七"),
    //         new ListItem("8", "八"),
    //         new ListItem("9", "九")

    //     ];
    //     text = text.split('')
    //         .map(x => mapData.find(z => z.key == x).value).join();

    //     return text;
    // }
}