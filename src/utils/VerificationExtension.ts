import { z } from "zod";
export class VerificationExtension {
    static email(value) {
        if (value == undefined || value == null)
            return "";
        let errorText = "";
        const schema = z.string().email({ message: "信箱格式不正確" });
        try {
            schema.parse(value); // 如果驗證失敗，會拋出錯誤
        } catch (error) {

            if (error instanceof z.ZodError) {
                errorText = error.errors.map((err) => err.message).join(" ");
            } else {
                errorText = "An unexpected error occurred:";
            }
        }
        return errorText
    }
    static phone(value) {
        if (value == undefined || value == null)
            return "";
        let errorText = "";
        const schema = z.string()
            //.startsWith("09", { message: "請輸入09開頭" })
            .min(10, { message: "至少10碼" })
            .max(10, { message: "至多10碼" })
            .regex(/^[0-9]+$/, { message: "只能輸入數字" })
            ;
        try {
            schema.parse(value);
        } catch (error) {

            if (error instanceof z.ZodError) {
                errorText = error.errors.map((err) => err.message).join(" ");
            } else {
                errorText = "An unexpected error occurred:";
            }
        }
        return errorText
    }
    static maxLength(value, num: number = 10) {
        if (value == undefined || value == null)
            return "";
        let errorText = "";
        const schema = z.string()
            .max(num, { message: `至多${num}字` });
        try {
            schema.parse(value);
        } catch (error) {

            if (error instanceof z.ZodError) {
                errorText = error.errors.map((err) => err.message).join(" ");
            } else {
                errorText = "An unexpected error occurred:";
            }
        }
        return errorText
    }
}