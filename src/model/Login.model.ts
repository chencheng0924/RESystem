
export class LoginAccount {
    account?: string = ''
    password?: string = ''
    captchaCode?: string = ''
    captchaId?: string = ''

    constructor(init?: Partial<LoginAccount>) {
        Object.assign(this, init)
    }
}

export class LoginCaptchaImg {
    image?: string
    id?: string

    constructor(init?) {
        Object.assign(this, init)
    }

    public setContentAndDate?(img: string, id: string) {
        this.image = img
        this.id = id
        return this
    }
}

