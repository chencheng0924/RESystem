import { ref, Ref } from "vue";

export class useSTKeyValue {
    private locale?: any;
    private $t?: any;
    private $route?: any;
    constructor(t, locale, route) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;
    }
}