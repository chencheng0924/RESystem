import { LoginAccount, LoginCaptchaImg } from '@/model/Login.model';
import { LoginService } from '@/service/LoginService';
import { Ref, ref } from 'vue'

export class LoginController {
    private $t?: any;
    private $route?: any;
    private locale?: any;
    public loginAccount?: Ref<LoginAccount>
    public loginSvc?: LoginService
    public loginCaptchaImg?: Ref<any>
    public valueComplete?: Ref<Boolean>;
    constructor(t, locale, route) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;
        this.loginAccount = ref(new LoginAccount({ account: '', password: '' }));
        this.loginCaptchaImg = ref({})
        this.loginSvc = new LoginService()
        this.valueComplete = ref(false);
        this.init()
    }

    public async init() {
        sessionStorage.removeItem('token')
        await this.getCaptchaImg()
    }

    // 獲取驗證碼
    public async getCaptchaImg() {
        // const result = await this.loginSvc.getCaptchaImg()
        // this.loginCaptchaImg.value = new LoginCaptchaImg().setContentAndDate(result.image, result.id)
        // this.loginAccount.value.captchaId = result.id
    }

    // 獲取token
    public async getCaptchaToken() {
        return this.loginSvc.login(this.loginAccount.value)
    }

    private checkCaptchaCode() {
        return (!!this.loginAccount.value.captchaCode == true && this.loginAccount.value.captchaCode.length == 4)
    }
    private checkAccount() {
        return !!this.loginAccount.value.account == true;
    }
    private checkPassword() {
        return !!this.loginAccount.value.password == true;
    }

    public checkValueComplete() {

        this.valueComplete.value = (this.checkCaptchaCode() && this.checkAccount() && this.checkPassword());

    }
}
