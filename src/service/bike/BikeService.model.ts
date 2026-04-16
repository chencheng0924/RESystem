import { VStgTdxBikeAvailability } from "@/api/dataApi";

export class CStgTdxBikeAvailability {
    private langCode: string;
    constructor(langCode: string, entiy?: VStgTdxBikeAvailability) {
        this.entiy = entiy;
        this.langCode = langCode;
    }
    public entiy: VStgTdxBikeAvailability;

}