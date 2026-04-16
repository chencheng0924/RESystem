import { VStgTdxBikeAvailability, VStgTdxRailMetroLiveboardPt1m } from "@/api/dataApi";
import { LangData } from "../bus/BusService.model";

export class CStgTdxRailMetroLiveboardPt1m {
    private langCode: string;
    constructor(langCode: string, entiy?: VStgTdxRailMetroLiveboardPt1m) {
        this.entiy = entiy;
        this.langCode = langCode;
    }
    public entiy: VStgTdxRailMetroLiveboardPt1m;

    public get stationname(): LangData {
        return new LangData(this.entiy.stationname_zh_tw, this.entiy.stationname_en).setLangCode(this.langCode);
    }
    public get linename(): LangData {
        return new LangData(this.entiy.linename_zh_tw, this.entiy.linename_en).setLangCode(this.langCode);
    }

}