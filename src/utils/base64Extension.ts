import { Base64 } from 'js-base64';
export class Base64Extension {

    // string to base64
    static toBase64(target: string): string {
        return Base64.encode(target);
    }

    // base64 to string
    static toString(target: string): string {
        return Base64.decode(target);
    }

}