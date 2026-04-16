import { Geo } from "./GeoService";

export class Position {
    constructor(lat?: number, lon?: number) {
        if (lat)
            this.latitude = lat;
        if (lon)
            this.longitude = lon;
    }
    latitude: number;
    longitude: number;
    hasCurrentPos?: boolean = false;//是否取到定位
    insideKG?: boolean = false;// 是否在高雄地區
    KGlatitude?: number
    KGlongitude?: number
    unableBrowserLocation?: boolean

    public setHasCurrentPos(has: boolean) {
        this.hasCurrentPos = has;
        return this;
    }
    public setInsideKaohsiung(kg: boolean) {
        this.insideKG = kg;
        return this;
    }

    public setDefault() {
        this.latitude = 22.6878495;
        this.longitude = 120.3091251; // 左營高鐵
        return this;
    }

    public setKGPos() {
        this.KGlatitude = 22.6878495;
        this.KGlongitude = 120.3091251; // 左營高鐵
        return this;
    }

    public IsInSideKaohsiung() {
        if (this.hasCurrentPos == false)
            return false;

        return this.insideKG;
    }
    public HasCurrentPos() {
        return this.hasCurrentPos;
    }
    public isUnableBrowserLocation() {
        this.unableBrowserLocation = true
        return this
    }
}


export class Latlng {
    lat?: number
    lng?: number
    isFirst?: boolean

    constructor(init?: Partial<Latlng>) {
        Object.assign(this, init);
    }
    public setLatLng?(pos: Position) {
        this.lat = pos.latitude;
        this.lng = pos.longitude;
        return this;
    }
    public setIsFirst?(isFirst: boolean) {
        this.isFirst = isFirst;
        return this;
    }



}