import { ForgetPasswordStep } from '@/model/forgetPassword.model';
import { LoginAccount, LoginCaptchaImg } from '@/model/Login.model';
import { LoginService } from '@/service/LoginService';
import { Ref, ref } from 'vue'

export class LoginController {
    private $t?: any;
    private $route?: any;
    private $router?: any;
    private locale?: any;
    public loginAccount?: Ref<LoginAccount>
    public loginSvc?: LoginService
    public loginCaptchaImg?: Ref<any>
    public valueComplete?: Ref<Boolean>;
    public showForgetPassword?: Ref<Boolean>;
    public forgetPasswordStep?: Ref<ForgetPasswordStep>;
    constructor(t, locale, route, router) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;
        this.$router = router;
        this.loginAccount = ref(new LoginAccount({ account: '', password: '' }));
        this.loginCaptchaImg = ref({})
        this.loginSvc = new LoginService()
        this.valueComplete = ref(false);
        this.showForgetPassword = ref(false);
        this.forgetPasswordStep = ref(ForgetPasswordStep.Email);
        this.init()
    }

    public async init() {
        sessionStorage.removeItem('token')
        this.getRouteQuery()

    }

    public getRouteQuery() {
        const routeQuery = this.$route.query
        if (routeQuery && routeQuery.showType == 1) {
            this.changeShowForgetPassword(true);
            this.changeForgetPasswordStep(ForgetPasswordStep.ResetPassword);
        } else {
            this.changeShowForgetPassword(false);
            this.changeForgetPasswordStep(ForgetPasswordStep.Email);
        }
    }

    public toggleForgetPassword(isFromForgetPassword: boolean = false) {
        this.showForgetPassword.value = !this.showForgetPassword.value;
        if (isFromForgetPassword) {
            this.changeForgetPasswordStep(ForgetPasswordStep.Email);
            this.$router.replace({ query: {} });
        }
    }

    public changeShowForgetPassword(show: boolean) {
        this.showForgetPassword.value = show;
    }

    public changeForgetPasswordStep(step: ForgetPasswordStep) {
        this.forgetPasswordStep.value = step;
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

        // this.valueComplete.value = (this.checkCaptchaCode() && this.checkAccount() && this.checkPassword());
        this.valueComplete.value = true
    }

    public loginToCodeFlow() {
        let url = this.loginSvc.loginToCodeflowURL();
        return url
    }

    // 第三方登入
    public getOtherLoginLink() {
        return this.loginSvc.getLoginLink();
    }

}
