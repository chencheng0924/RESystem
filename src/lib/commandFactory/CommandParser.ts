import { CommandEntity } from "./Command.model";

// 將轉化完的字串變為CommandEntity型態
export class CommandParser {
    Input: string;

    constructor(input: string) {
        this.Input = input;
    }

    parse(): CommandEntity {
        const matches = this.convertToArray(this.Input)
        if (matches[0] == 'chart') {
            matches[2] = this.formatJSONString(matches[2])
        }
        // const regex = /"([^"]+)"|(\S+)/g;
        // const matches = this.Input.match(regex);

        if (!matches || matches.length < 2) {
            throw null;
        }

        const MainCommand = matches[0].replace(/(^"|"$)/g, '');
        const SubCommand = matches[1].replace(/(^"|"$)/g, '');
        const Args: { [key: string]: string } = {};

        for (let i = 2; i < matches.length; i++) {
            // 用：判斷是否為物件
            const check = matches[i].includes(':')
            if (!check) {
                const params = matches[i].split(/\s+/);
                params.forEach(param => {
                    const [key, value] = param.split('=');
                    Args[key] = value ? value.replace(/(^"|"$)/g, '') : '';
                });
            } else {
                const [key, value] = matches[i].split(/=(.+)/);
                Args[key] = value ? value.replace(/(^"|"$)/g, '') : '';
            }
        }

        return new CommandEntity({ MainCommand, SubCommand, Args });
    }

    public formatJSONString(inputString) {
        let processedString = inputString.replace(/\s+/g, ' ').trim();
        if (!processedString.startsWith('options=')) {
            processedString = 'options=' + processedString;
        }

        return processedString;
    };

    private convertToArray(input: string) {
        // 移除字串前後的空白
        input = input.trim();

        // 找到第一個空格的位置
        const firstSpaceIndex = input.indexOf(' ');

        if (firstSpaceIndex === -1) {
            // 如果沒有空格,整個字串就是第一個元素
            return [input, '', ''];
        }

        // 提取第一個元素 (指令)
        const command = input.slice(0, firstSpaceIndex);

        // 提取剩餘的部分
        const rest = input.slice(firstSpaceIndex + 1).trim();

        // 查找 msg= 的位置
        const msgIndex = rest.indexOf('msg=');

        if (msgIndex !== -1) {
            // 如果找到 msg=，將剩餘部分分為兩個元素
            const subCommand = rest.slice(0, msgIndex).trim();
            const params = rest.slice(msgIndex);
            return [command, subCommand, params];
        } else {
            const firstWord = rest.split(' ')[0];
            const parts = rest.split(' ');
            const result = parts.slice(1).join(' ');
            return [command, firstWord, result];
        }
    }
}