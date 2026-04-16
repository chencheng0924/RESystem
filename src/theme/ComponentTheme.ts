import { ThemeSwitchController } from "@/components/smartcityui/STThemeMode.compsable";

export class PrimeVueTagStyling {
    static contrastPt() {
        return {
            root: ({ props, context }) => ({
                class: [
                    '!bg-foneBg !border-foneBorder !border-[1px] !rounded-[2px]'
                ]
            }),
            label: ({ props, context }) => ({
                class: [
                    '!text-[12px] !leading-[18px] !text-foneTextLevel2 font-normal'
                ]
            }),
        }

    };
    static successPt() {

        let themeController = new ThemeSwitchController(false);
        let mode = themeController.getModeString();

        return {
            root: ({ props, context }) => ({
                class: [
                    {
                        '!bg-[#E3F9E9] !border-[#71CBA2] !border-[1px] !rounded-[2px]': mode == 'light',
                        '!bg-[#2B2E2C] !border-[#71CBA2] !border-[1px] !rounded-[2px]': mode == 'dark',
                    }

                ]
            }),
            label: ({ props, context }) => ({
                class: [
                    {
                        '!text-[12px] !leading-[18px] !text-[#00A459] font-normal': mode == 'light',
                        '!text-[12px] !leading-[18px] !text-[#71CBA2] font-normal': mode == 'dark',
                    }

                ]
            }),
        };

    }
}


