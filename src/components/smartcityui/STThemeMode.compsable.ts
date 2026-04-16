import { ReloadStore } from "@/stores/reloadStore";
import { ref, Ref } from "vue"

export enum ThemeModeType {
    LIGHT,
    DARK,
    SYSTEM
}


export class ThemeSwitchController {
    private storeThemeKey = "themeMode";
    public themeMode: Ref<ThemeModeType>;
    public currentTheme: Ref<Boolean>;

    constructor(apply: boolean = false) {
        this.themeMode = ref(ThemeModeType.LIGHT);
        this.currentTheme = ref(true);
        this.initTheme(apply)
    }

    private initTheme(apply) {
        const savedTheme = this.getThemeByLocalStorage();
        if (!!savedTheme) {
            this.themeMode.value = savedTheme.toNumber();
        } else {
            this.themeMode.value = ThemeModeType.LIGHT;
        }
        if (apply)
            this.applyTheme()
    }

    private getThemeByLocalStorage() {
        let mode = localStorage.getItem(this.storeThemeKey);
        return mode;
    }
    private setThemeByLocalStorage() {
        let mode = localStorage.setItem(this.storeThemeKey, this.themeMode.value.toString());
        return mode;
    }

    private applyTheme() {
        if (this.themeMode.value == ThemeModeType.LIGHT) {
            document.documentElement.classList.remove('themeDark')
            document.documentElement.classList.add('themeLight');
        }
        else if (this.themeMode.value == ThemeModeType.DARK) {
            document.documentElement.classList.remove('themeLight')
            document.documentElement.classList.add('themeDark');
        } else {
            // system
            document.documentElement.classList.remove('themeLight')
            document.documentElement.classList.remove('themeDark')
        }


        const reload = ReloadStore();
        reload.reloadKey++;

    }

    public change(e) {
        console.log("e", e)
        this.themeMode.value = e
        this.setThemeByLocalStorage();
        this.applyTheme()
    }

    public getSearchEmptyImage() {
        if (this.themeMode.value == ThemeModeType.LIGHT)
            return 'light_searchEmpty.png'.getImgPath()
        else
            return 'dark_searchEmpty.png'.getImgPath()
    }

    public getModeString() {
        if (this.themeMode.value == ThemeModeType.LIGHT)
            return 'light'
        else
            return 'dark';
    }


}