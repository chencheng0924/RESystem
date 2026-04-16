import { ForgetPasswordStep, ResetPasswordData } from '@/model/forgetPassword.model';
import { Ref, ref } from 'vue'
import { LoginService } from '@/service/LoginService';
import { useToast } from "primevue/usetoast";

export class ForgetPasswordController {
    private $t?: any;
    private $route?: any;
    private locale?: any;
    private props?: any;

    public step?: Ref<ForgetPasswordStep> = ref(ForgetPasswordStep.Email);
    public title?: Ref<string> = ref('Components.ForgetPassword.Title');
    public subTitle?: Ref<string> = ref('Components.ForgetPassword.Email');

    public hasSendEmail?: Ref<boolean> = ref(false);
    public loginSvc?: LoginService
    public resetPasswordData?: Ref<ResetPasswordData>
    public valueComplete?: Ref<Boolean>;
    public passwordComplete?: Ref<Boolean>;
    public countdownSeconds?: Ref<number> = ref(0);
    public isCountingDown?: Ref<boolean> = ref(false);
    public passwordRules?: Ref<any[]>;
    public successCountdown?: Ref<number> = ref(5);
    private countdownTimer?: NodeJS.Timeout;
    private onSuccessTimeout?: () => void;
    public toast?: any;
    constructor(t, locale, route, props) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;
        this.props = props;
        this.loginSvc = new LoginService()
        this.resetPasswordData = ref(new ResetPasswordData({email: '', captchaCode: '', password: '', confirmPassword: ''}))
        this.valueComplete = ref(false);
        this.passwordComplete = ref(false);
        this.passwordRules = ref([
            {title: this.$t('Components.ForgetPassword.moreThan6'), isComplete: false},
            {title: this.$t('Components.ForgetPassword.englishRules'), isComplete: false},
        ])
        this.toast = useToast();
        this.init()
    }

    public async init() {
        this.getStep()
    }

    public getStep() {
        if(this.props?.step){
            this.changeStep(this.props.step as ForgetPasswordStep);
        } else {
            this.changeStep(ForgetPasswordStep.Email);
        }
    }

    public async changeStep(step: ForgetPasswordStep) {
        this.step.value = step;
        if(step == ForgetPasswordStep.ResetPassword) {
            this.subTitle.value = 'Components.ForgetPassword.ResetPassword';
        } else if(step == ForgetPasswordStep.Success) {
            this.title.value = 'Components.ForgetPassword.Success';
            this.subTitle.value = 'Components.ForgetPassword.BackToLogin_Success';

            let params = {
                token: this.$route.query.token,
                password: this.resetPasswordData.value.password,
                confirmPassword: this.resetPasswordData.value.confirmPassword,
            }
            await this.loginSvc.resetForgetPassword(params).then(res => {
                this.successCountdown.value = 5;
                this.startCountdown(this.successCountdown, () => {
                    if (this.onSuccessTimeout) {
                        this.onSuccessTimeout();
                    }
                });
            })
        }
    }

    public setSuccessTimeoutCallback(callback: () => void) {
        this.onSuccessTimeout = callback;
    }

    public checkCaptchaCode() {
        return (!!this.resetPasswordData.value.captchaCode == true && this.resetPasswordData.value.captchaCode.length == 6)
    }

    public checkEmail() {
        const email = this.resetPasswordData.value.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !!email && emailRegex.test(email);
    }

    public checkValueComplete() {
        this.valueComplete.value = (this.checkCaptchaCode() && this.checkEmail());
    }

    public checkPassword() {
        const password = this.resetPasswordData.value.password;
        
        // 第一個驗證：檢查密碼長度是否為8個字以上
        const isLengthValid = password && password.length >= 8;
        
        // 第二個驗證：檢查是否包含英文大寫或小寫、數字和特殊符號
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const isComplexValid = (hasUpperCase || hasLowerCase) && hasNumbers && hasSpecialChar;
        
        // 更新密碼規則的完成狀態
        if (this.passwordRules && this.passwordRules.value.length >= 2) {
            this.passwordRules.value[0].isComplete = isLengthValid;
            this.passwordRules.value[1].isComplete = isComplexValid;
        }
        
        this.passwordComplete.value = (password && this.resetPasswordData.value.confirmPassword && password == this.resetPasswordData.value.confirmPassword && isLengthValid && isComplexValid);
    }

    // countSeconds 倒數秒數
    // onComplete 倒數完成後的函式
    // isCounting 是否正在倒數
    private startCountdown(countSeconds: Ref<number>, onComplete?: Function, isCounting?: Ref<boolean>) {
        // 檢查是否已經在倒數中
        if (isCounting && isCounting.value) {
            return;
        } else if (isCounting) {
            // 設置倒數狀態
            isCounting.value = true;
        }
        
        // 清除之前的計時器
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }
        
        // 設置新的計時器
        this.countdownTimer = setInterval(() => {
            countSeconds.value--;
            
            // 當倒數到 0 時停止計時器
            if (countSeconds.value <= 0) {
                if (isCounting) {
                    isCounting.value = false;
                }
                countSeconds.value = 0;
                if (this.countdownTimer) {
                    clearInterval(this.countdownTimer);
                    this.countdownTimer = undefined;
                }
                // 執行完成回調
                if (onComplete) {
                    onComplete();
                }
            }
        }, 1000);
    }

    public async sendCaptchaCode() {
        this.hasSendEmail.value = true;
        await this.loginSvc.sendForgetPasswordEmail(this.resetPasswordData.value.email).then(res => {
            this.countdownSeconds.value = 60;
            this.startCountdown(
                this.countdownSeconds, 
                undefined, 
                this.isCountingDown
            );
        })
    }

    public startSuccessCountdown() {
        this.successCountdown.value = 5;
        this.startCountdown(
            this.successCountdown, 
            () => {
                if (this.onSuccessTimeout) {
                    this.onSuccessTimeout();
                }
            }
        );
    }
}
