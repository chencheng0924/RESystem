export class ResetPasswordData {
  email?: string = ''
  captchaCode?: string = ''
  password?: string = ''
  confirmPassword?: string = ''

  constructor(init?: Partial<ResetPasswordData>) {
      Object.assign(this, init)
  }
}

export enum ForgetPasswordStep {
  Email = 'Email',
  ResetPassword = 'ResetPassword',
  Success = 'Success'
}