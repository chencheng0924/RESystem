<template>
    <div ref="editContainer" class="code-editor" :style="{ '--height': $props.height }"></div>
</template>
<script>
import { getCurrentInstance, onMounted, watch, nextTick } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import * as md from "monaco-editor/esm/vs/basic-languages/markdown/markdown.js";
import "monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js";
import "monaco-editor/esm/vs/base/browser/ui/codicons/codiconStyles.js";
import "monaco-editor/esm/vs/editor/contrib/wordOperations/browser/wordOperations.js";
import "monaco-editor/esm/vs/editor/contrib/linesOperations/browser/linesOperations.js";
import "monaco-editor/esm/vs/editor/contrib/dnd/browser/dnd.js";
import "monaco-editor/esm/vs/editor/contrib/multicursor/browser/multicursor.js";
import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js";
import 'monaco-editor/esm/vs/editor/contrib/suggest/browser/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/browser/suggest.js';


import { ThemeSwitchController } from '@/components/smartcityui/STThemeMode.compsable';
import { STMarkdownEditorStore } from './STMarkdownEditor.store';
import {MarkdownEditorService} from '@/components/smartcityui/Markdown/STMarkdownEditor.service'
const WORD_SEPARATORS =
	'`~!@#$%^&*()-=+[{]}\\|;:\'\",.<>/?' // USUAL_WORD_SEPARATORS
	+ "·！￥…*（）—【】：；'\'\"'','《》，。？" // 中文符号。
	+ "「」｛｝＜＞・～＠＃＄％＾＆＊＝『』"; // 日韩符号。

// 给自定义的两个语法 TOC 和 Directive 添加解析支持。
const { tokenizer } = md.language;
tokenizer.root.unshift([/^(\[\[TOC]])/, ["keyword.toc"]]);
tokenizer.root.unshift([
	/^(@\w+)(!?\[)((?:[^\]\\]|@escapes)*)(]\([^)]+\))/,
	["type.directive", "string.link", "", "string.link"],
]);



// // 解决vite Monaco提示错误
// self.MonacoEnvironment = {
//     getWorker() {
//         return new JsonWorker();
//     },
// };
export default {
    props: {
        value: String,
        readOnly:{
            type:Boolean,
            default:false
        },
        height: {
            type: String,
            default: '500px'
        },
        insertText: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        let monacoEditor = null;
        const { proxy } = getCurrentInstance();
        const store = STMarkdownEditorStore()
       
        watch(
            () => props.insertText,
            (value) => {
                nextTick(() => {
                    if (value == '') return
                    if (store.focusColumn == 0) {
                        // 如果沒有特別focus在哪行，就插入到最後一行的下面
                        const lastLine = monacoEditor.getModel().getLineCount()
                        monacoEditor.executeEdits('', [
                            {
                                range: new monaco.Range(lastLine + 1, 0, lastLine + 1, 0),
                                text: value,
                            }
                        ])
                        return
                    }
                     console.log(`==>lineNumber: ${store.focusLine} column:${store.focusColumn} `)
                    monacoEditor.executeEdits('', [
                        {
                            range: new monaco.Range(store.focusLine, store.focusColumn, store.focusLine, store.focusColumn),
                            text: value,
                        }
                    ])
                })
            },
            { immediate: true }
        )

        watch(
            () => props.value,
            (value) => {
                // 防止改变编辑器内容时光标重定向
                if (value !== monacoEditor?.getValue()) {
                    monacoEditor.setValue(value);
                }
            },
        );

        onMounted(async () => {
            const markdownEditorSVC = new MarkdownEditorService()
            let themeController = new ThemeSwitchController(false);
            let theme = themeController.getModeString() =='light' ? 'vs-light' : 'vs-dark'
            monacoEditor = monaco.editor.create(proxy.$refs.editContainer, {
                value: props.value,
                readOnly: props.readOnly,
                language: 'markdown',
                theme:theme,
                selectOnLineNumbers: true,
                lineNumbers: "on",
                lineNumbersMinChars: 4, // 增加行號的最小寬度
                renderSideBySide: false,
                lineHeight: 22,
                fontSize: 12,
                scrollbar: {
                    useShadows: false,
                },
                minimap:{
                    enabled:false
                },
                wordWrap:true,
                automaticLayout:true,
                wordSeparators: WORD_SEPARATORS,
		        //...addonContext.options.value,
            });
            // 监听值变化
            monacoEditor.onDidChangeModelContent(() => {
                const currenValue = monacoEditor?.getValue();
                emit('update:value', currenValue);
            });
            
            // focus事件
            monacoEditor.onDidChangeCursorPosition((el) => {
                console.log("el",el)
                if(el.source =="mouse"){
                store.setFocusLine(el.position.lineNumber)
                store.setFocusColumn(el.position.column)

                console.log(`lineNumber: ${store.focusLine} column:${store.focusColumn} `)
                }
                
            })
            const replacementsResult = await markdownEditorSVC.getReplacements()
            let variables = {}
            if(replacementsResult){
                variables = replacementsResult.reduce((acc, item) => {
                    const key = item.command.replace(/[{}]/g, ""); // 去掉 {}
                    acc[key] = [
                        {
                        label: item.description,
                        insertText: key,
                        documentation: key
                        }
                    ];
                    return acc;
                }, {});
            }
            let completionProviderRegistered = false;
            if(!completionProviderRegistered){
                monaco.languages.registerCompletionItemProvider("markdown", {
                    triggerCharacters: ["{"], // 輸入 { 會觸發
                    provideCompletionItems: (model, position) => {

                        const word = model.getWordUntilPosition(position);
                        const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                        };

                        // 產生建議項目
                        const suggestions = [];

                        Object.keys(variables).forEach(group => {
                            variables[group].forEach(item => {
                                suggestions.push({
                                label: `${group}.${item.label}`,   // 清單顯示
                                kind: monaco.languages.CompletionItemKind.Variable,
                                insertText: `${item.insertText}`, // 插入結果
                                documentation: item.documentation,
                                range
                                });
                            });
                        });
                        const unique = suggestions.filter(
                            (v, i, arr) =>
                            arr.findIndex(x => x.label === v.label && x.insertText === v.insertText) === i
                        );
                        return { suggestions: unique };
                    }
                });
                completionProviderRegistered = true;
            }
        });
        return {};
    },
};
</script>
<style scoped>
.code-editor {
    width: 100%;
    min-height: var(--height);
}

</style>
