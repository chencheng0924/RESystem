import { Ref, ref } from 'vue';
import { DemoService } from '@/service/demoService';

declare const liff: any;

type ClientEvaluationForm = {
  srOverallScore: number;
  srAttitudeScore: number;
  srQualityScore: number;
  srTimelinessScore: number;
  srComment: string;
};
type ScoreField = 'srOverallScore' | 'srAttitudeScore' | 'srQualityScore' | 'srTimelinessScore';

export class DemoClientEvaluationController {
  private demoService = new DemoService();
  private readonly liffId = '2009795132-yTHOewR8';

  public caseID: Ref<string> = ref('');
  public idToken: Ref<string> = ref('');
  public form: Ref<ClientEvaluationForm> = ref({
    srOverallScore: 5,
    srAttitudeScore: 5,
    srQualityScore: 5,
    srTimelinessScore: 5,
    srComment: '',
  });

  public isSubmitting: Ref<boolean> = ref(false);
  public isSuccessDialogVisible: Ref<boolean> = ref(false);
  public isErrorDialogVisible: Ref<boolean> = ref(false);
  public errorDialogMessage: Ref<string> = ref('');
  public caseIDErrorMessage: Ref<string> = ref('');
  public liffErrorMessage: Ref<string> = ref('');

  constructor() {
    void this.init();
  }

  public async init() {
    const caseIDParam = this.getCaseIDFromUrl();
    this.caseID.value = caseIDParam;
    if (!caseIDParam) {
      this.caseIDErrorMessage.value = '缺少案件編號，無法送出問卷。';
    }

    this.liffErrorMessage.value = '';
    try {
      await liff.init({ liffId: this.liffId });
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const token = liff.getIDToken();
      console.log('token', token);
      this.idToken.value = token ?? '';
      if (!this.idToken.value) {
        this.liffErrorMessage.value = '讀取 LINE 登入資訊失敗，請重新開啟頁面。';
      }
    } catch (error) {
      this.liffErrorMessage.value = 'LIFF 初始化失敗，請稍後再試。';
      console.error(error);
    }
  }

  private getCaseIDFromUrl(): string {
    const searchParams = new URLSearchParams(window.location.search);

    // 1) 一般情況：直接從 query 讀 caseID
    const directCaseID = (searchParams.get('caseID') || '').trim();
    if (directCaseID) return directCaseID;

    // 2) LINE LIFF 轉址情況：query 會包在 liff.state
    const liffStateRaw = (searchParams.get('liff.state') || '').trim();
    if (!liffStateRaw) return '';

    // liff.state 可能是百分比編碼，先嘗試解碼
    let liffState = liffStateRaw;
    try {
      liffState = decodeURIComponent(liffStateRaw);
    } catch {
      liffState = liffStateRaw;
    }

    // 2-1) liff.state 內容可能是完整路徑，例如 /demoClientEvaluation?caseID=xxx
    const queryPart = liffState.includes('?') ? liffState.slice(liffState.indexOf('?') + 1) : liffState;
    const stateParams = new URLSearchParams(queryPart);
    const stateCaseID = (stateParams.get('caseID') || '').trim();
    if (stateCaseID) return stateCaseID;

    // 2-2) 少數情況會再包一次編碼
    try {
      const decodedAgain = decodeURIComponent(queryPart);
      const nestedParams = new URLSearchParams(decodedAgain);
      return (nestedParams.get('caseID') || '').trim();
    } catch {
      return '';
    }
  }

  private validate(signatureDataUrl: string): boolean {
    if (this.caseIDErrorMessage.value) {
      this.openErrorDialog(this.caseIDErrorMessage.value);
      return false;
    }

    if (this.liffErrorMessage.value) {
      this.openErrorDialog(this.liffErrorMessage.value);
      return false;
    }

    if (!this.idToken.value) {
      this.openErrorDialog('無法取得 LINE 身分資訊，請重新開啟頁面。');
      return false;
    }

    const scoreFields: ScoreField[] = [
      'srOverallScore',
      'srAttitudeScore',
      'srQualityScore',
      'srTimelinessScore',
    ];
    const hasMissingScore = scoreFields.some((field) => !this.form.value[field]);
    if (hasMissingScore) {
      this.openErrorDialog('請完成所有評分欄位。');
      return false;
    }

    if (!signatureDataUrl) {
      this.openErrorDialog('請先完成手寫簽名。');
      return false;
    }

    return true;
  }

  public async submit(signatureDataUrl: string) {
    this.errorDialogMessage.value = '';
    this.isErrorDialogVisible.value = false;

    if (!this.idToken.value && !this.liffErrorMessage.value) {
      await this.init();
    }
    if (!this.validate(signatureDataUrl)) return;

    this.isSubmitting.value = true;
    try {
      const payload = {
        idToken: this.idToken.value,
        srRtId: this.caseID.value,
        srOverallScore: this.form.value.srOverallScore,
        srAttitudeScore: this.form.value.srAttitudeScore,
        srQualityScore: this.form.value.srQualityScore,
        srTimelinessScore: this.form.value.srTimelinessScore,
        srComment: this.form.value.srComment.trim(),
        srSignedName: '',
        srSignatureUrl: signatureDataUrl, // PNG base64 dataURL
      };
      const result = await this.demoService.addClientEvaluation(payload);
      if (result?.ok) {
        this.isSuccessDialogVisible.value = true;
        return;
      }
      this.openErrorDialog('系統忙碌中，請稍後再試。');
    } catch (error) {
      this.openErrorDialog('系統忙碌中，請稍後再試。');
      console.error(error);
    } finally {
      this.isSubmitting.value = false;
    }
  }

  public setScore(field: ScoreField, score: number) {
    this.form.value[field] = score;
  }

  public closeErrorDialog() {
    this.isErrorDialogVisible.value = false;
  }

  public closePage() {
    try {
      if (typeof liff !== 'undefined' && typeof liff.closeWindow === 'function') {
        liff.closeWindow();
        return;
      }
      window.close();
    } catch (error) {
      console.error(error);
    }
  }

  private openErrorDialog(message: string) {
    this.errorDialogMessage.value = message;
    this.isErrorDialogVisible.value = true;
  }
}
