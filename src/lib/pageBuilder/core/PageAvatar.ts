export class PageAvatar {
    constructor(init?) {
        Object.assign(this, init);

    }
    Label?: string = '';
    Icon?: string = '';
    Image?: string = '';

    Size?: string = 'large';//"normal" | "large" | "xlarge"
    Shape?: string = 'circle';//"square" | "circle"
    BadgeNumber?: number = 0;
    IsBage?: boolean = false;

    setLable(l: string) {
        this.Label = l;
        return this;
    }
    setIcon(icon: string) {
        this.Icon = icon;
        return this;
    }

    setImage(img: string) {
        this.Image = img;
        return this;
    }

    setSize(Size: string) {
        this.Size = Size;
        return this;
    }

}