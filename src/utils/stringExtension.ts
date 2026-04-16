//import { LangData } from "@/service/busService.model";

export { }

const base = import.meta.env.VITE_BASE_URL
declare global {
    interface String {
        toNumber(): number;
        isEmptyOrNull(): boolean;

        getlogoSvg(): string;
        toUrl(): string;
        getImgPath(): string;
        getIcon(imgType: string): string; getProfileImg(imgType: string): string;

        getFirstChat(): string;
        getMarker(): string;
        getImg(): string;
        getFile(): string;
        getRoadNetwork(): string;
        getDashboardSvg(): string;
        getDashboardFile(): string;
    }
}


String.prototype.toNumber = function (): number {

    if (this == null)
        return -1;
    if (this == null || this == "" || this == "null")
        return -1;
    let num = Number(this);
    if (isNaN(num))
        return -1;
    return num;
}
String.prototype.isEmptyOrNull = function (): boolean {
    if (this == null || this == "" || this == "null")
        return true;

    return false;
}
String.prototype.getlogoSvg = function (): string {
    let fileName = this;

    return new URL(`../assets/logo/${fileName}`, import.meta.url).href
}

String.prototype.toUrl = function (): string {
    let Name = this;
    return new URL(`${base}${Name}`, import.meta.url).href
}

String.prototype.getImgPath = function (): string {
    let fileName = this;
    return new URL(`../assets/img/${fileName}`, import.meta.url).href
}


String.prototype.getIcon = function (imgType: string): string {
    let fileName = this;
    return new URL(`../assets/img/icon/${fileName}.${imgType}`, import.meta.url).href
}


String.prototype.getFirstChat = function (): string {
    if (this == null)
        return this;

    const match = this.match(/[^\p{P}\p{S}\p{Z}\p{C}]/u);
    return match ? match[0] : null;

}

String.prototype.getMarker = function (): string {
    let fileName = this;
    return new URL(`../assets/img/marker/${fileName}`, import.meta.url).href
}
String.prototype.getImg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/${fileName}`, import.meta.url).href
}
String.prototype.getFile = function (): string {
    let fileName = this;
    return new URL(`../assets/gltf/${fileName}`, import.meta.url).href
}
String.prototype.getRoadNetwork = function (): string {
    let fileName = this;
    return new
        URL(`../assets/roadNetwork/${fileName}.svg`, import.meta.url).href
}
String.prototype.getDashboardSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/dashboard/${fileName}.svg`, import.meta.url).href
}
String.prototype.getDashboardFile = function (): string {
    let fileName = this;
    return new URL(`../assets/img/dashboard/${fileName}`, import.meta.url).href
}
