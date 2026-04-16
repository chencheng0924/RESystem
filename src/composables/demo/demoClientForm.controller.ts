import { Ref, ref } from 'vue';
import { DemoService } from '@/service/demoService';

declare const liff: any;

type ClientRepairForm = {
  rtCommunityName: string;
  rtUnit: string;
  rtTitle: string;
  rtAddress: string;
  rtDescription: string;
  rtResidentName: string;
  rtResidentPhone: string;
  rtResidentMobile: string;
  rtContactName: string;
  rtContactPhone: string;
  rtContactMobile: string;
};

type FieldErrors = Record<keyof ClientRepairForm, string>;

type ClientFormFieldMeta = {
  key: keyof ClientRepairForm;
  label: string;
  type?: string;
  placeholder: string;
  textarea?: boolean;
};

export class DemoClientFormController {
  private demoService = new DemoService();
  private readonly liffId = '2009720730-LGyL4OOw';

  public idToken: Ref<string> = ref('');
  public isSubmitting: Ref<boolean> = ref(false);
  public isSuccessDialogVisible: Ref<boolean> = ref(false);
  public isErrorDialogVisible: Ref<boolean> = ref(false);
  public errorDialogMessage: Ref<string> = ref('');
  public liffErrorMessage: Ref<string> = ref('');

  public form: Ref<ClientRepairForm> = ref(this.emptyForm());
  public errors: Ref<FieldErrors> = ref(this.emptyErrors());
  public fieldMeta: ClientFormFieldMeta[] = [];

  constructor() {
    this.init();
  }

  private emptyForm(): ClientRepairForm {
    return {
      rtCommunityName: '',
      rtUnit: '',
      rtTitle: '',
      rtAddress: '',
      rtDescription: '',
      rtResidentName: '',
      rtResidentPhone: '',
      rtResidentMobile: '',
      rtContactName: '',
      rtContactPhone: '',
      rtContactMobile: '',
    };
  }

  private emptyErrors(): FieldErrors {
    return {
      rtCommunityName: '',
      rtUnit: '',
      rtTitle: '',
      rtAddress: '',
      rtDescription: '',
      rtResidentName: '',
      rtResidentPhone: '',
      rtResidentMobile: '',
      rtContactName: '',
      rtContactPhone: '',
      rtContactMobile: '',
    };
  }

  public async init() {
    this.initFieldMeta()
    this.liffErrorMessage.value = '';
    try {
      await liff.init({ liffId: this.liffId });
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const token = liff.getIDToken();
      this.idToken.value = token ?? '';
      if (!this.idToken.value) {
        this.liffErrorMessage.value = '讀取 LINE 登入資訊失敗，請重新開啟頁面。';
      }
    } catch (error) {
      this.liffErrorMessage.value = 'LIFF 初始化失敗，請稍後再試。';
      console.error(error);
    }
  }

  private validate(): boolean {
    const nextErrors = this.emptyErrors();
    const requiredFields: (keyof ClientRepairForm)[] = [
      'rtCommunityName',
      'rtUnit',
      'rtTitle',
      'rtAddress',
      'rtDescription',
      'rtResidentName',
      'rtResidentPhone',
      'rtResidentMobile',
      'rtContactName',
      'rtContactPhone',
      'rtContactMobile',
    ];

    requiredFields.forEach((field) => {
      if (!this.form.value[field]?.trim()) {
        nextErrors[field] = '此欄位為必填';
      }
    });

    this.errors.value = nextErrors;
    return Object.values(nextErrors).every((msg) => msg === '');
  }

  public async submit() {
    this.errorDialogMessage.value = '';
    this.isErrorDialogVisible.value = false;

    if (!this.validate()) return;
    if (!this.idToken.value) {
      await this.init();
      if (!this.idToken.value) {
        this.openErrorDialog('無法取得 LINE 身分資訊，請重新開啟頁面。');
        return;
      }
    }

    this.isSubmitting.value = true;
    try {
      const payload = {
        idToken: this.idToken.value,
        ...this.form.value,
      };
      const result = await this.demoService.addClientRepairRequest(payload);
      if (result?.status === 200) {
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

  private initFieldMeta() {
    this.fieldMeta = [
      { key: 'rtCommunityName', label: '社區名稱', placeholder: '請輸入社區名稱' },
      { key: 'rtUnit', label: '棟別/樓層/戶號', placeholder: '例如：A棟12樓1203' },
      { key: 'rtTitle', label: '報修主旨', placeholder: '例如：浴室漏水' },
      { key: 'rtAddress', label: '報修地址', placeholder: '請輸入完整地址' },
      { key: 'rtDescription', label: '問題描述', placeholder: '請詳細說明現況', textarea: true },
      { key: 'rtResidentName', label: '住戶姓名', placeholder: '請輸入住戶姓名' },
      { key: 'rtResidentPhone', label: '住戶市話', type: 'tel', placeholder: '請輸入住戶市話' },
      { key: 'rtResidentMobile', label: '住戶手機', type: 'tel', placeholder: '請輸入住戶手機' },
      { key: 'rtContactName', label: '聯絡人姓名', placeholder: '請輸入聯絡人姓名' },
      { key: 'rtContactPhone', label: '聯絡人市話', type: 'tel', placeholder: '請輸入聯絡人市話' },
      { key: 'rtContactMobile', label: '聯絡人手機', type: 'tel', placeholder: '請輸入聯絡人手機' },
    ]
  }

  public closeErrorDialog() {
    this.isErrorDialogVisible.value = false;
  }

  private openErrorDialog(message: string) {
    this.errorDialogMessage.value = message;
    this.isErrorDialogVisible.value = true;
  }
}
