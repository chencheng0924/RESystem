
export class LocalStore {

    getTheme(): string {
        let theme = localStorage.getItem('theme');
        if (!!theme == false)
            return null;

        try {
            return JSON?.parse(theme);
        }
        catch {
            return theme;
        }
    }
    setTheme(layoutConfig) {
        localStorage.setItem('theme', JSON.stringify(layoutConfig));
    }

}