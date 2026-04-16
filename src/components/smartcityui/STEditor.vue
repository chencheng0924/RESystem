<!-- component底層為 Quill package -->
<script lang="ts" setup>
import { onMounted, ref, nextTick  } from "vue"
import { UseSTEditorStyle, UseSTEditor } from './STEditor.composable'
import { EditorTextChangeEvent } from 'primevue/editor'
import { STButtonType } from '@/components/smartcityui/STButton.model'
import { STEditorData } from './STEditor.model'
import Quill from 'quill'
import { useDebounceFn } from '@vueuse/core'

const emit = defineEmits(['textChange'])

//readonly 
const props = withDefaults(defineProps<{
  data?: STEditorData,
  modules?: any,
  height?: string,
  showPermissionPop: boolean,
  toolbarVisible: boolean
}>(), {
  modules: () => ({}),
  height: () => ('500px'),
  showPermissionPop: () => (true),
  toolbarVisible: () => (true)
})
const style = new UseSTEditorStyle()
const controller = new UseSTEditor(Quill, emit)


const onLoad = ({ instance }) => {
  // instance.setContents(instance.clipboard.convert({
  //   html: props.data?.htmlValue ?? ''
  // }))
  //instance.setContents(props.data?.htmlValue ?? '');
  // console.log(props.data?.htmlValue)
  document.querySelector('.ql-editor').innerHTML=props.data?.htmlValue ?? ''
}
onMounted(() => {
  controller.setModelValue(props.data ?? new STEditorData())
})

const firstUpdate = ref(true)
const changeText = useDebounceFn((val) => {
  if (firstUpdate.value) {
    firstUpdate.value = false
    return
  }
  controller.textChange(val)
}, 500)


</script>
<template>
  <div :style="{ '--visible-toolbar': props.toolbarVisible ? 'flex' : 'none' }">
    <Editor @load="onLoad" :pt="style.getEditorStyleOption()" ref="myQuillEditor"
      :editorStyle="`height: ${props.height}`" :modules="props.modules" @text-change="changeText">
      <template #toolbar>
        <div class="flex items-center gap-[2px]" :class="{'!hidden': !props.toolbarVisible}">
          <Button :label="controller.activePermission.value" @click="(e) => controller.togglePermissionPop(e)"
            :severity="STButtonType.OUTLINED" :outlined="true" :icon="'pi pi-angle-down'" iconPos="right"
            class="!w-[76px] !h-[32px] flex" v-if="props.showPermissionPop" />
          <Popover :ref="controller.popoverBtn" :pt="style.getPopoverStyleOption()">
            <div class="p-[8px] flex flex-col gap-[4px] w-[76px]">
              <div class="flex gap-[8px] p-[8px] hover:bg-commPrimaryBg rounded-[4px] cursor-pointer"
                v-for="item in controller.permissionList.value" :key="item + 'permission'"
                @click="(e) => controller.setPermission(e, item)">
                <span class="text-body2 text-commTextLevel1">{{ item }}</span>
              </div>
            </div>
          </Popover>
          <span class="ql-formats flex">
            <div v-tooltip.bottom="{ value: '字型大小', pt: style.getTooltipStyleOption() }" class="p-[8px]">
              <select class="ql-size">
                <option selected>內文</option>
                <option value="small">子標題</option>
                <option value="large">標題</option>
                <option value="huge">大標題</option>
              </select>
            </div>
            <div class="p-[8px]">
              <button v-tooltip.bottom="{ value: '粗體', pt: style.getTooltipStyleOption() }" class="ql-bold"></button>
            </div>
            <div class="p-[8px]">
              <button v-tooltip.bottom="{ value: '刪除線', pt: style.getTooltipStyleOption() }" class="ql-strike"></button>
            </div>
            <div class="p-[8px]">
              <button v-tooltip.bottom="{ value: '項目符號', pt: style.getTooltipStyleOption() }" class="ql-list"
                value="bullet"></button>
            </div>
            <div v-tooltip.bottom="{ value: '對齊', pt: style.getTooltipStyleOption() }" class="p-[8px]">
              <select class="ql-align">
                <option selected>left</option>
                <option value="right">right</option>
                <option value="center">center</option>
                <option value="justify">justify</option>
              </select>
            </div>
            <div v-tooltip.bottom="{ value: '字體顏色', pt: style.getTooltipStyleOption() }" class="p-[8px]">
              <select class="ql-color">
                <option value="#FFFFFF"></option>
                <option value="#9E8EFF"></option>
                <option value="#FFC700"></option>
                <option value="#62F65E"></option>
                <option value="#0AE7E7"></option>
              </select>
            </div>
            <!-- <div class="p-[8px]">
              <button class="ql-link"></button>
            </div>
            <STIconButton id="copy" :props="controller.copyBtn" @click="controller.copy()" /> -->
          </span>
        </div>
      </template>
    </Editor>
  </div>
</template>

<style lang="scss" scoped>
:deep(.p-editor-toolbar) {
  display: var(--visible-toolbar) !important;
}
:deep(.ql-editor) {
  padding: 16px;
  border-top: 1px solid var(--pdm-border) !important;
}
:deep(.ql-snow) {
  // tool: 字型大小
  .ql-picker.ql-size {
    width: 24px;
    height: 24px;
    .ql-picker-label {
      background-image: var(--pdm-ic-tool-size);
      &::before {
        display: none;
      }
      >svg {
        display: none;
      }
    }
    .ql-picker-options {
      .ql-picker-item {
        &.ql-selected {
          color: var(--pdm-primary-click) !important;
          background-color: var(--pdm-primary-bg) !important;
        }
        &:hover {
          color: var(--pdm-text-level1) !important;
          background-color: var(--pdm-primary-bg) !important;
        }
        &::before {
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
        }
      }
      .ql-picker-item[data-value=small] {
        &::before {
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }
      .ql-picker-item[data-value=large] {
        &::before {
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
        }
      }
      .ql-picker-item[data-value=huge] {
        &::before {
          font-size: 18px;
          font-weight: 700;
          line-height: 28px;
        }
      }
    }
  }
  // 直接覆蓋原本的css
  .ql-editor {
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 22px !important;
  }

  .ql-size-small {
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 22px !important;
  }


  .ql-size-large {
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 24px !important;
  }

  .ql-size-huge {
    font-size: 18px !important;
    font-weight: 700 !important;
    line-height: 28px !important;
  }

  // tool: 粗體
  .ql-bold {
    background-image: var(--pdm-ic-tool-bold);  
    background-repeat: no-repeat;
   
    >svg {
      display: none;
    }
  }

  // tool: 刪除線
  .ql-strike {
    background-image: var(--pdm-ic-tool-stright); 
    background-repeat: no-repeat;
    >svg {
      display: none;
    }
  }

  // tool: 項目符號
  .ql-list {
    background-image: var(--pdm-ic-tool-bullet);  
    background-repeat: no-repeat;
    >svg {
      display: none;
    }
  }

  // tool: 字型大小
  .ql-color.ql-picker.ql-color-picker {
    width: 24px;
    height: 24px;

    .ql-picker-label {
      background-image: var(--pdm-ic-tool-palette); 

      &::before {
        display: none;
      }

      >svg {
        display: none;
      }
    }

    .ql-picker-options[aria-hidden=false] {
      display: flex;
      flex-direction: column;
      .ql-picker-item {
        &.ql-selected {
          color: var(--pdm-primary-click) !important;
          background-color: var(--pdm-primary-bg) !important;
        }

        &:hover {
          color: var(--pdm-text-level1) !important;
          background-color: var(--pdm-primary-bg) !important;
        }

        &::before {
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
        }
      }

      .ql-picker-item {
        width: 120px;
        height: 40px;
        display: flex;
        gap: 8px;
        align-items: center;
        background-color: var(--pdm-bg) !important;
        &::before {
          content: '';
          width: 16px; height: 16px;
          border-radius: 50%;
          padding: 4px;
        }
      }

      .ql-picker-item[data-value="#FFFFFF"] {
        &::before {
          background-color: #FFFFFF;
        }
        &::after {
          content: '白色';
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .ql-picker-item[data-value="#9E8EFF"] {
        &::before {
          background-color: #9E8EFF;
        }

        &::after {
          content: '紫色';
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .ql-picker-item[data-value="#FFC700"] {
        &::before {
          background-color: #FFC700;
        }

        &::after {
          content: '黃色';
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .ql-picker-item[data-value="#62F65E"] {
        &::before {
          background-color: #62F65E;
        }

        &::after {
          content: '綠色';
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .ql-picker-item[data-value="#0AE7E7"] {
        &::before {
          background-color: #0AE7E7;
        }

        &::after {
          content: '藍色';
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }
      
    }
  }

  // tool: 對齊
  .ql-picker.ql-align {
    .ql-picker-label {
      background-image: var(--pdm-ic-tool-left);
      background-repeat: no-repeat;
      >svg {
        display: none;
      }
    }
    .ql-picker-item {
      display: flex;
      width: 120px;
      height: 40px;
      padding: 8px;
      align-items: center;
      gap: 8px;
      color: var(--pdm-text-level1) !important;
      &:hover {
        background-color: var(--pdm-primary-bg) !important;
        color: var(--pdm-text-level1) !important;
      }
      >svg {
        display: none;
      }
      &::before {
        content: '';
        width: 24px;
        height: 24px;
      }

      &::after {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }

    .ql-picker-item[data-label=left] {
      &::before {
        background-image: var(--pdm-ic-tool-left);  
      }
      &::after {
        content: '置左對齊';
      }
    }

    .ql-picker-item[data-label=right] {
      &::before {
        background-image: var(--pdm-ic-tool-right);  
      }

      &::after {
        content: '置右對齊';
      }
    }

    .ql-picker-item[data-label=center] {
      &::before {
        background-image: var(--pdm-ic-tool-mid); 
      }

      &::after {
        content: '置中對齊';
      }
    }

    .ql-picker-item[data-label=justify] {
      display: none;
    }
  }
}
</style>