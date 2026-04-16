<script setup lang="ts">
import { onBeforeMount, onMounted, ref, computed, watchEffect } from 'vue';
import STErrorText from '@/components/smartcityui/STErrorText.vue'
import { STFormItem, STFormItemType, STFormInputType } from './STForm.model.ts'
import { useForm } from './STForm.composable.ts'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useI18n } from 'vue-i18n'
import STUploadFile from './STUploadFile.vue';
import Upload from '@/components/smartcityui/STUpload.vue';
import STMarkdown from './STMarkdown.vue';
import { UseFormItemStyle, } from '@/components/smartcityui/STForm.composable'
import STPasswordRule from './STPasswordRule.vue';
import { STPasswordRuleType } from '@/components/smartcityui/STPasswordRule.model'
// import STAichatComponent from '@/lib/ai/components/STAichat/STAichatComponent/STAichatComponent.vue'
import STAIChat from '@/lib/AIChat/components/STAIChat/STAIChat.vue'
import { STSliderProps } from '@/components/smartcityui/STSlider.model'
import { SliderSlideEndEvent } from 'primevue/slider'
import STMultiSelectSearch from '@/components/smartcityui/STMultiSelectSearch.vue'
import STKeyValue from '@/components/smartcityui/STKeyValue.vue'
import { useDebounceFn } from '@vueuse/core'
import { ThemeSwitchController } from './STThemeMode.compsable.ts';
import { dataTool } from 'echarts';
import STAccordion from './STAccordion.vue';
import STTabList from './STTabList.vue'
import STTxt from './STTxt.vue'
import Icon from "@/components/Icon.vue"
import STListSelect from './STListSelect.vue';
import STIcon from '@/components/Icon.vue'
import STThemeMode from './STThemeMode.vue';
import STSystemLanguage from './STSystemLanguage.vue';
import STCutomsMenu from './STCutomsMenu.vue';
const { t, locale } = useI18n()
const emit = defineEmits(['submit', 'change', "upload",
    "refreshVerifyImgEvent", "toggleEvent", "clearInputValueEvent",
    "forgetPassWordEvent", "sendVerificationCodeEvent",
    "init", "selectChange", "formBtnEvent", "iconBtnEvent", "addItem", "deleteItem", "tabRowEvent", "tabChangeItem", "listClickEvent"
])
const style = new UseFormItemStyle();
const props = defineProps({
    /*  modelValue: {
         type: any,
     }, */
    items: {
        type: Array<STFormItem>,
        default: [],
    },
    labelGap: {  // label與input的間距
        type: String,
        default: '4px'
    },
    itemGap: {
        type: String,  // form裡的間距
        default: '16px'
    }

})
const controller = new useForm(t, locale, route)
controller.setItems(props.items);

let themeController = new ThemeSwitchController(false);
let mode = themeController.getModeString();
let mdMode = ref(mode);
//---------------------------------------------
// Event 
const updateInput = (val, item) => {
    var e = {};
    e['targetItem'] = item;
    e['value'] = val;
    emit('change', e);
}
const change = (e, item) => {
    e['targetItem'] = item;
    emit('selectChange', e, item)
}
const verification = (formItem, $event) => {
    //console.log("verificationaaaa", formItem);
    if (formItem.verification != null) {
        formItem.verification(formItem, $event);
    }

}

const inputRegular = (item, $event) => {
    const regex = /^[a-zA-Z0-9\u4e00-\u9fff._@,\-()[\]\s]+$/;
    if (!regex.test(item.Value)) {
        // 移除非法字元
        item.Value = item.Value.replace(/[^a-zA-Z0-9\u4e00-\u9fff._@,\-()[\]\s]/g, "");
    }
}

const updateDropdown = (val: any, item) => {
    item.Value = val;
    var e = {};
    e['targetItem'] = item;
    e['value'] = val;
    emit('change', e);
}
const submit = () => {
    emit('submit', props.items)
}
const upload = (e, item) => {
    emit('upload', e, item)
}

const CheckboxGroup = (val, item) => {

    item.Value = val;
    //console.log("item", item);
    var e = {};
    e['targetItem'] = item;
    e['value'] = val;
    emit('change', e);
}
const updateMarkdown = (val, item) => {
    item.Value = val;
    //console.log(item)
    var e = {};
    e['targetItem'] = item;
    e['value'] = val;
    emit('change', e);
}
const refreshVerifyImgEvent = () => {
    emit('refreshVerifyImgEvent')
}

const btnAction = (data) => {
    emit('formBtnEvent', data)
}

const iconBtnAction = (data) => {
    emit('iconBtnEvent', data)
}

const toggleEvent = (item) => {
    emit('toggleEvent', item)
    if (item.toggle == false) {
        item.InputType = STFormInputType.Text
        item.toggle = true
    } else {
        item.InputType = STFormInputType.Password
        item.toggle = false
    }

}

const clearInputValueEvent = (item) => {
    emit('clearInputValueEvent', item)
    console.log("clearInputValueEvent", item);
    item.Value = '';

}

const forgetPassWordEvent = () => {
    emit("forgetPassWordEvent");
}

const sendVerificationCodeEvent = () => {
    emit("sendVerificationCodeEvent");
}

const updateSlider = (val, item) => {

    item.Value = val
    var e = {};
    e['targetItem'] = item;
    e['value'] = val;
    emit('change', e);
}

const handleAddKeyValueItem = (data) => {
    emit("addItem", data)
}
const handleDeleteKeyValueItem = (data, index) => {
    emit("deleteItem", data, index)
}

const debouncedAjax = useDebounceFn((item: any, currentValue: any) => {
    item.ListAjax(currentValue).then((x) => {
        //item.ListAjax().then((y) => {
        item.List = controller.addValueToListIfNotExists(x, item.Value, item.OptionValue, []);
        // })
        // console.log("清單", item.List);
    });

}, 800)
const onFilter = (item, e) => {
    // console.log("onFilter", e)
    let currentValue = e['value'];
    if (item.RemoteAjaxMode) {
        if (typeof item.ListAjax == "function") {
            debouncedAjax(item, currentValue);
        }

    }

}
const onFilter1 = (item, e) => {
    let currentValue = e;
    if (item.RemoteAjaxMode) {
        if (typeof item.ListAjax == "function") {
            debouncedAjax1(item, currentValue);
        }
    }
}
const debouncedAjax1 = useDebounceFn((item: any, currentValue: any) => {
    item.ListAjax(currentValue).then((x) => {
        item.List = x
    });
}, 300)



onMounted(() => {
    for (let i = 0; i < props.items.length; i++) {
        const tempItem = props.items[i];
        if (tempItem?.ListAjax != null) {

            if (typeof tempItem.ListAjax == "function") {
                tempItem.ListAjax().then((x) => {
                    if (x == undefined)
                        x = [];
                    // 增加已選中的資料
                    let ds: Array<any> = x ?? [];
                    if (tempItem.Value != null && tempItem.Value.length > 0) {
                        ds = [...tempItem.Value, ...x];
                        ds = ds.groupBy(x => x.key).map(x => x.members.firstOrDefault());
                    }
                    let list = Array.isArray(tempItem.Value) ? tempItem.Value : [tempItem.Value]
                    tempItem.List = controller.addValueToListIfNotExists(ds, list, tempItem.OptionValue);
                })
            }

        }
    }

});


const CompomentInit = (controller, item) => {
    emit('init', controller, item);
}

const checkboxGroups = ref([]);
const allGroupsHaveSingleMember = computed(() => {
    const groups = controller.getItemGroupBy();
    return groups.every(group => group.members.length === 1);
});

const maxMemberCount = ref(1);

watchEffect(() => {
    const groups = controller.getItemGroupBy();
    if (groups == undefined)
        return;
    if (!Array.isArray(groups)) {
        console.warn('getItemGroupBy() did not return an array or is undefined:', groups);
    } else {
        maxMemberCount.value = Math.max(1, ...groups.map(group => group.members?.length || 0));
    }
});

const multiSelectHeaderStyle = computed(() => {
    return {
        '--multi-select-content': locale.value === 'zh-TW' ? '"全選"' : '"Select All"'
    }
})

const tabRowEvent = (data) => {
    emit("tabRowEvent", data)
}
const tabChangeClick = (idx) => {
    emit("tabChangeItem", idx)
}

const multiSelectPt={
      chipItem: ({ props, context }) => ({
        class: [
          '!border-[1px] !border-foneBorder !rounded-[2px]',
        ]
      }),

    }


//  STFormItemType.List --------------------------
const listClickEvent = (item) => {
    emit("listClickEvent", item)
}

//  STFormItemType.ListSelect --------------------------
const listSelectChange=(item ,e,datas)=>{
    e['targetItem'] = item;
    e['datas'] = datas;
    e['IsRemove']=false;
    emit('change', e, item)
}
const listSelectReomveItem=(item , e,datas)=>{
    e['targetItem'] = item;
    e['datas'] = datas;
    e['IsRemove']=true;
    emit('change', e, item)
}


const radioButtonPt={
     root: ({ props, context }) => ({
        class: [
          '!h-[16px] !w-[16px]'
        ]
      }),
      box: ({ props, context }) => ({
        class: [
          '!h-[16px] !w-[16px]'
        ]
      }),
    icon: ({ props, context }) => ({
        class: [
           '!h-[8px] !w-[8px]'
        ]
      }),

    }

</script>

<!-- :class="{'!w-[calc(50%-8px)]': gItem.members.length == 1 && !allGroupsHaveSingleMember}" -->
<template>
    <form @submit.prevent="submit">
        <Fluid>
            <div class="flex flex-col gap-[var(--item-gap)]"
                :style="[{ '--label-gap': props.labelGap, '--item-gap': props.itemGap, '--member-count': maxMemberCount }, multiSelectHeaderStyle]">
                <template v-for="(gItem, idx) in controller.getItemGroupBy()">
                   
                    <div class="w-full m-auto gridWrapper grid grid-cols-1 gap-4 md:grid-cols-[repeat(var(--member-count),minmax(0,1fr))]"
                        :class="{ 'hidden': !props.items[idx].showFilterCondition?.form }">
                        <template v-for="item in gItem.members">
                            <div v-if="item.IsInfoSearch && item.showFilterCondition?.form"
                                class="gridContent flex flex-col gap-[var(--label-gap)]"
                                :class="{ 'sm:col-span-full': gItem.members.length == 1 }">
                                <label v-if="item.hasLabel" :for="item.Id" class="text-start">
                                    <span v-if="item.IsRequest" class="!text-red-600">*</span>
                                    {{ t(item.Name) }}
                                </label>
                              
                                <div v-if="item.IsDisplay" class="w-full">{{ item.Value }}</div>
                                <div v-else class="w-full">
                                    <STMessage :className="item.beforeMessage.className"
                                        v-if="item.beforeMessage.text != null" :severity="item.beforeMessage.severity"
                                        :text="t(item.beforeMessage.text)" />
                                    <Divider v-if="item.Type === STFormItemType.Divider"></Divider>
                                    <Rating v-if="item.Type === STFormItemType.Rating" v-model="item.Value"
                                        @change="(e) => { updateInput(e, item) }" />
                                    <Select v-if="item.Type === STFormItemType.Select" class="w-full h-[2.75rem]"
                                        :id="item.Id" v-model="item.Value" :optionValue="item.OptionValue"
                                        :optionLabel="item.OptionLabel" :options="item.List"
                                        @change="(e) => { change(e, item) }" :filter="item.HasFilter"
                                        :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Select_Placeholder', { name: t(item.Name) })}`"
                                        :invalid="!!item.ErrorText" :filterPlaceholder="item.FilterPlaceholder"
                                        :name="item.Id" @update:modelValue="(e) => { updateDropdown(e, item) }"
                                        :disabled="item.IsDisabled" @filter="(e) => { onFilter(item, e) }"
                                        :dataKey="item.OptionLabel"
                                        >
                                        <template #option="slotProps">
                                            <div class="align-items-center">
                                                <div
                                                    class="text-body2 text-TextLevelOne break-words whitespace-pre-line">
                                                    {{
                                                    slotProps.option[item.OptionLabel] }}</div>
                                                <div v-if="slotProps.option?.SubName"
                                                    class="break-words whitespace-pre-line text-body2 text-TextLevelTwo">
                                                    {{
                                                    slotProps.option?.SubName }}</div>
                                            </div>
                                        </template>
                                    </Select>
                                    <MultiSelect v-if="item.Type === STFormItemType.MultiSelect"
                                        class="w-full h-[2.75rem]" display="chip" :id="item.Id" v-model="item.Value"
                                        :optionLabel="item.OptionLabel" :options="item.List"
                                        @change="(e) => { change(e, item) }" :filter="item.HasFilter"
                                        :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Select_Placeholder', { name: t(item.Name) })}`"
                                        :invalid="!!item.ErrorText"
                                        :filterPlaceholder="item.FilterPlaceholder" :name="item.Id"
                                        @update:modelValue="(e) => { updateDropdown(e, item) }" :disabled="item.IsDisabled"
                                        :optionValue="item.OptionValue" :appendTo="'self'"
                                       @filter="(e) => { onFilter(item, e) }"
                                       :pt="multiSelectPt"
                                        >
                                        <template #option="slotProps">
                                            <div class="align-items-center">
                                                <div
                                                    class="text-body2 text-TextLevelOne break-words whitespace-pre-line">
                                                    {{
                                                    slotProps.option[item.OptionLabel] }}</div>
                                                <div v-if="slotProps.option?.SubName"
                                                    class="break-words whitespace-pre-line text-body2 text-TextLevelTwo">
                                                    {{
                                                    slotProps.option?.SubName }}</div>
                                            </div>
                                        </template>
                                        <template #chipicon="propsChip">
                                             <Icon name="ic_close" custom-class="!w-[14px] !h-[14px] !text-foneTextLevel2" @click="propsChip.removeCallback"></Icon>
                                        </template>
                                    </MultiSelect>

                                    <STMultiSelectSearch v-if="item.Type === STFormItemType.MultiSelectSearch"
                                        v-model:selected="item.Value as any[]" :options="item.List as any[] ?? []"
                                        :dialogTitle="item.Name" :invalid="!!item.ErrorText" :disabled="item.IsDisabled"
                                        @inputChange="(e) => { onFilter1(item, e) }"
                                        @selectedChange="(e) => { change(e, item), updateDropdown(e, item) }">
                                    </STMultiSelectSearch>

                                    <DatePicker class="w-full" v-if="item.Type === STFormItemType.DatePicker"
                                        v-model="item.Value" showIcon fluid iconDisplay="input" :name="item.Id"
                                        :id="item.Id"
                                        :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Select_Placeholder', { name: t(item.Name) })}`"
                                        :invalid="!!item.ErrorText"
                                        @update:modelValue="(val) => { updateInput(val, item) }"
                                        :disabled="item.IsDisabled" />

                                    <InputText v-if="item.Type === STFormItemType.InputText" class="w-full"
                                        v-model="item.Value" :name="item.Id" :id="item.Id"
                                        :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                        :invalid="!!item.ErrorText"
                                        @update:modelValue="(val) => { updateInput(val, item) }"
                                        @blur="verification(item, $event)" :aria-label="item.Name"
                                        :maxlength="item.Maxlength" :type=item.InputType :disabled="item.IsDisabled"
                                        :pt="style.inputTextStyle.value" />

                                    <InputText v-if="item.Type === STFormItemType.InputTextRegular" class="w-full"
                                        v-model="item.Value" :name="item.Id" :id="item.Id"
                                        :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                        :invalid="!!item.ErrorText"
                                        @update:modelValue="(val) => { updateInput(val, item) }"
                                        @blur="verification(item, $event)" :aria-label="item.Name"
                                        :maxlength="item.Maxlength" @input="inputRegular(item, $event)"
                                        :type=item.InputType :disabled="item.IsDisabled"
                                        :pt="style.inputTextStyle.value" />

                                    <!-- <InputText v-if="item.Type === STFormItemType.InputText" class="w-full"
                                        v-model="item.Value" :name="item.Id" :id="item.Id" :placeholder=item.Placeholder
                                        :invalid="!!item.ErrorText" @blur="verification(item, $event)"
                                        :aria-label="item.Name" :maxlength="item.Maxlength" :type=item.InputType
                                        :disabled="item.IsDisabled" :pt="style.inputTextStyle.value"
                                        v-debounce="{ delay: 500 }"
                                        @debounced-update="(event) => updateInput(event.detail.value, item)" /> -->

                                    <InputNumber v-if="item.Type === STFormItemType.InputNumber" class="w-full"
                                        v-model="item.Value" :name="item.Id" :id="item.Id"
                                        :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                        :invalid="!!item.ErrorText"
                                        @update:modelValue="(val) => { updateInput(val, item) }" :aria-label="item.Name"
                                        :disabled="item.IsDisabled" showButtons :max="item.SliderMax"
                                        :min="item.SliderMin" :step="item.SliderStep" />

                                    <Upload v-if="item.Type === STFormItemType.Upload" :id="item.Id" :name="item.Id"
                                        :styleType="item.UploadStyleType" :auto="item.UploadAuto"
                                        :showUploadStatus="item.UploadShowStatus" :acceptFileType="item.AcceptFileType"
                                        v-model:disabled="item.IsDisabled" :uploadOnce="item.UploadOnce"
                                        :postUrl="item.Url" :multiple="item.UploadMultiple"
                                        :maxFileSize="item.Maxlength" @eventUploadAfter="upload($event, item)"
                                        :uploadFunction="item.UploadCallback" :current-files="item.UploadFiles">
                                    </Upload>
                                    <!-- <STUploadFile v-if="item.Type === STFormItemType.Upload" :name="item.Id" :id="item.Id"
                                        :emptyMessage=item.Placeholder :postUrl="item.Url" :multiple="item.UploadMultiple"
                                        :maxFileSize="item.Maxlength" @eventUploadAfter="upload($event,item)"
                                        :accept="item.AcceptFileType" :disabled="item.IsDisabled">
                                    </STUploadFile> -->

                                    <div v-if="item.Type === STFormItemType.Checkbox">
                                        <Checkbox v-model="item.Value" :inputId="item.Id" :name="item.Id" :binary="true"
                                            @update:modelValue="(val) => { updateInput(val, item) }" />
                                        <label :for="item.Id" class="ml-2"> {{ item.Name }}</label>
                                    </div>
                                    <div v-if="item.Type === STFormItemType.CheckboxGroup" class="w-full flex">
                                        <div v-for="category of item.List" :key="category.key"
                                            class="flex flex-wrap justify-center gap-2">
                                            <Checkbox v-model="item.Value" :inputId="category.key" :name="category.key"
                                                :value="category"
                                                @update:modelValue="(val) => { CheckboxGroup(val, item) }" />
                                            <label :for="category.key" class="pr-4"> {{ category.value }}</label>
                                        </div>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.Textarea" class="w-full">
                                        <Textarea v-model="item.Value" rows="5" :name="item.Id" :id="item.Id"
                                            @update:modelValue="(val) => { updateInput(val, item) }"
                                            :disabled="item.IsDisabled" :class="item.ClassName" autoResize />
                                        <!-- <Textarea v-model="item.Value" rows="5" :name="item.Id" :id="item.Id"
                                            :disabled="item.IsDisabled" :class="item.ClassName"
                                            v-debounce="{ delay: 500 }"
                                            @debounced-update="(event) => updateInput(event.detail.value, item)" /> -->
                                    </div>
                                    <div v-if="item.Type === STFormItemType.ToggleSwitch" class="w-full">
                                        <ToggleSwitch v-model="item.Value" :name="item.Id" :id="item.Id"
                                            @update:modelValue="(val) => { updateInput(val, item) }"
                                            :disabled="item.IsDisabled" />
                                    </div>

                                    <div v-if="item.Type === STFormItemType.MarkDown" class="w-full">
                                        <STMarkdown :isView="item.IsDisabled" v-model:content="item.Value"
                                            :mode="mdMode" @update:modelValue="(val) => { updateMarkdown(val, item) }">
                                        </STMarkdown>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.Account" class="w-full">
                                        <IconField class="w-full">
                                            <InputIcon :pt="style.inputIconStyle.value">
                                                <img :src="item.Img" :alt="''">
                                            </InputIcon>
                                            <InputText v-model="item.Value" :name="item.Id" :id="item.Id"
                                                :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                                :invalid="!!item.ErrorText"
                                                @update:modelValue="(val) => { updateInput(val, item) }"
                                                @blur="verification(item, $event)" :aria-label="item.Name"
                                                :maxlength="item.Maxlength" :type=item.InputType
                                                :disabled="item.IsDisabled" :pt="style.inputTextStyle.value"
                                                class="!pl-[40px]" />
                                            <InputIcon :pt="style.inputIconStyle.value" v-if="item.Value">
                                                <img :src="item.CloseImg" :alt="''"
                                                    @click="(val) => { clearInputValueEvent(item) }">
                                            </InputIcon>
                                        </IconField>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.Password" class="w-full">
                                        <IconField class="w-full">
                                            <InputIcon :pt="style.inputIconStyle.value" v-if="item.Img != ''">
                                                <img :src="item.Img" :alt="'arrow down icon'">
                                            </InputIcon>
                                            <Password v-model="item.Value" :name="item.Id" :id="item.Id"
                                                :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                                :invalid="!!item.ErrorText"
                                                @update:modelValue="(val) => { updateInput(val, item) }"
                                                @blur="verification(item, $event)" :aria-label="item.Name"
                                                :maxlength="item.Maxlength" :type=item.InputType
                                                :disabled="item.IsDisabled" :pt="style.inputTextStyle.value"
                                                :class="{ '!pl-[40px]': item.Img != '' }" autocomplete="on" />
                                            <InputIcon class="flex " :pt="style.inputIconStyle.value">
                                                <img v-if="item.Value" :src="item.CloseImg" :alt="''"
                                                    @click="(val) => { clearInputValueEvent(item) }">
                                                <img v-if='item.toggle' :src="item.toggleOnImg" :alt="''"
                                                    @click="(val) => { toggleEvent(item) }">
                                                <img v-else :src="item.toggleOffImg" :alt="''"
                                                    @click="(val) => { toggleEvent(item) }">
                                            </InputIcon>
                                        </IconField>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.VerificationImg" class="w-full">
                                        <IconField class="w-full">
                                            <InputIcon :pt="style.inputIconStyle.value">
                                                <img :src="item.Img" :alt="''">
                                            </InputIcon>
                                            <InputText v-model="item.Value" :name="item.Id" :id="item.Id"
                                                :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                                :invalid="!!item.ErrorText"
                                                @update:modelValue="(val) => { updateInput(val, item) }"
                                                @blur="verification(item, $event)" :aria-label="item.Name"
                                                :maxlength="item.Maxlength" :type=item.InputType
                                                :disabled="item.IsDisabled" :pt="style.inputTextStyle.value"
                                                class="!pl-[40px]" />
                                            <InputIcon class="flex !top-[30%]">
                                                <img v-if="item.Value" :src="item.CloseImg" :alt="''"
                                                    @click="(val) => { clearInputValueEvent(item) }">
                                                <img :src="item.VerifyImg" :alt="'arrow down icon'">
                                                <img :src="item.RefreshImg" :alt="'Refresh'"
                                                    @click="refreshVerifyImgEvent()">
                                            </InputIcon>
                                        </IconField>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.CheckboxPassword"
                                        class="w-full flex justify-between">
                                        <div>
                                            <Checkbox v-model="item.Value" :inputId="item.Id" :name="item.Id"
                                                :binary="true" @update:modelValue="(val) => { updateInput(val, item) }"
                                                :pt="style.checkboxStyle.value" />
                                            <label :for="item.Id" class="ml-2"> {{ item.Name }} </label>
                                        </div>
                                        <div class="text-fonePrimaryMain text-h5 cursor-pointer"
                                            @click="() => { forgetPassWordEvent() }">
                                            {{ item.buttonLabel }}
                                        </div>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.PasswordRule"
                                        class="w-full flex justify-between">
                                        <STPasswordRule :checkValue="item.Value"
                                            :check-rule-type-list="[STPasswordRuleType.LEAST_NUM]" />
                                        <!-- <STPasswordRule :checkValue="item.Value" /> -->
                                        <!-- <STPasswordRule :checkValue="item.Value" :check-rule-type-list="[STPasswordRuleType.LEAST_NUM]" /> -->

                                    </div>
                                    <div v-if="item.Type === STFormItemType.VerificationCode" class="w-full">
                                        <IconField class="w-full">
                                            <InputIcon :pt="style.inputIconStyle.value">
                                                <img :src="item.Img" :alt="''">
                                            </InputIcon>
                                            <InputText v-model="item.Value" :name="item.Id" :id="item.Id"
                                                :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                                :invalid="!!item.ErrorText"
                                                @update:modelValue="(val) => { updateInput(val, item) }"
                                                @blur="verification(item, $event)" :aria-label="item.Name"
                                                :maxlength="item.Maxlength" :type=item.InputType
                                                :disabled="item.IsDisabled" :pt="style.inputTextStyle.value"
                                                class="!pl-[40px]" />
                                            <InputIcon class="flex">
                                                <img v-if="item.Value" :src="item.CloseImg" :alt="''" class="pr-2"
                                                    @click="(val) => { clearInputValueEvent(item) }">
                                                <div class="border-l-2 border-commBorder pl-2"></div>
                                                <div class="text-h4 text-fonePrimaryMain cursor-pointer"
                                                    @click="() => { sendVerificationCodeEvent() }">{{
                                                    item.buttonLabel }}</div>
                                            </InputIcon>

                                        </IconField>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.Tag" class="w-full">
                                        <Tag :severity="item.Value.SeverityColor" :value="item.Value.Text" />
                                    </div>
                                    <div v-if="item.Type === STFormItemType.ProgressBar" class="w-full">
                                        <ProgressBar :value="item.Value.key" style="width: 100px;">{{ item.Value.value
                                            }}
                                        </ProgressBar>

                                    </div>

                                    <STThemeMode v-if="item.Type === STFormItemType.ThemeSwitch"></STThemeMode>
                                    <STSystemLanguage v-if="item.Type === STFormItemType.SystemLanguage"></STSystemLanguage>
                                    <!--
                                    <STAichatComponent v-if="item.Type === STFormItemType.AI"
                                    @eventInit="(c)=>{ CompomentInit(c,item)}"
                                    ></STAichatComponent> -->

                                    <STAIChat v-if="item.Type === STFormItemType.AI"
                                        @eventInit="(c) => { CompomentInit(c, item) }"></STAIChat>

                                    <div v-if="item.Type === STFormItemType.Slider"
                                        class="w-full flex items-center gap-[8px]">
                                        <Slider class="w-full" v-model="item.Value"
                                            @slideend="(val: SliderSlideEndEvent) => updateSlider(val.value, item)"
                                            :min="item.SliderMin" :max="item.SliderMax" :step="item.SliderStep"
                                            :range="item.SliderRange" :disabled="item.IsDisabled" />
                                        <InputNumber
                                            :placeholder="item.Placeholder ? item.Placeholder : `${t('Components.STForm.Input_Placeholder', { name: t(item.Name) })}`"
                                            :disabled="item.IsDisabled"
                                            @update:modelValue="(val) => { updateSlider(val, item) }" class="!w-[120px]"
                                            v-model="item.Value" mode="decimal"
                                            :minFractionDigits="item.MinFractionDigits"
                                            :maxFractionDigits="item.MaxFractionDigits" showButtons
                                            :min="item.SliderMin" :max="item.SliderMax" :step="item.SliderStep" />
                                    </div>

                                    <div v-if="item.Type === STFormItemType.PageSection" class="w-full">
                                        <component :id="item.Value?.Id" :is="{ ...item.ComponentType }"
                                            :type="item.Value?.SectionType"
                                            v-bind="{ ...item.Value?.Props, ...item.Value?.Attrs }"
                                            :model-value="item.Value?.Props?.value" v-on="{ ...item.Value?.Events }" />
                                    </div>

                                    <div v-if="item.Type === STFormItemType.IconButton" class="w-full">
                                        <span @click="iconBtnAction(item)"
                                            :class="`${item.Icon} cursor-pointer text-black`"></span>
                                    </div>
                                    <div v-if="item.Type === STFormItemType.Button" class="w-full">
                                        <Button @click="btnAction(item)" :label="item.BtnLabel"
                                            :severity="item.Btnseverity" variant="outlined"></Button>
                                    </div>
                                    <div v-if="item.Type === STFormItemType.KeyValue" class="w-full">
                                        <STKeyValue v-on:add-key-value-item="(data) => { handleAddKeyValueItem(data) }"
                                            v-on:delete-key-value-item="(data, index) => { handleDeleteKeyValueItem(data, index) }"
                                            v-model="item.Value"
                                            @update:modelValue="(val) => { updateInput(val, item) }" />
                                    </div>

                                    <div v-if="item.Type === STFormItemType.Accordion" class="w-full">
                                        <STAccordion :data="item.Value" :tag="item.Tag" :time="item.Time" :name="item.Id" :id="item.Id" />
                                    </div>
                                    <div v-if="item.Type === STFormItemType.TabList" class="w-full">
                                        <STTabList v-on:tab-change-event="(idx) => { tabChangeClick(idx) }"
                                            @tabRowEvent="(data) => { tabRowEvent(data) }" :datas="item.Value"
                                            :element-datas="item" />
                                    </div>
                                    <div v-if="item.Type === STFormItemType.Txt" class="w-full">
                                        <STTxt :datas="item.Value" />
                                    </div>
                                    <div v-if="item.Type === STFormItemType.RadioButton" class="w-full flex">
                                        <div class="flex flex-col gap-[15px]">
                                            <div v-for="radioItem in item.List" :key="radioItem.key" class="flex items-center h-[16px]">
                                                <RadioButton v-model="item.Value" :inputId="radioItem.key" name="dynamic" :value="radioItem" :pt="radioButtonPt"/>
                                                <label :for="radioItem.key" class="pl-[8px] leading-[22px]">{{ radioItem.value }}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="item.Type === STFormItemType.List" class="w-full">
                                        <div class="flex items-center justify-between cursor-pointer"
                                            @click="listClickEvent(item)">{{ item.Value }}
                                            <STIcon name="ic_arrow_right" customClass="!w-[18px] !h-[18px]" />
                                        </div>
                                    </div>

                                     <div v-if="item.Type === STFormItemType.ListSelect" class="w-full">
                                        <STListSelect  v-bind="{ ...item.Value , ...{selectAjax: item.ListAjax} }"
                                        @change="(e,datas)=>{listSelectChange(item,e,datas)}" 
                                        @removeItem="(e,datas)=>{ listSelectReomveItem(item,e,datas)}"
                                        />
                                    </div>


                                    <STErrorText :text="t(item.ErrorText ?? '')" />

                                    <STCutomsMenu v-if="item.Type === STFormItemType.CustomMenu">
                                    </STCutomsMenu>
                                </div>
                            </div>
                        </template>
                    </div>

                    <!-- <div class="flex flex-wrap">
                    <Button label="Submit" :fluid="false"></Button>
                    </div> -->
                </template>
            </div>
        </Fluid>
    </form>
</template>
<style scoped lang="scss">
:deep(.p-multiselect) {
    .p-multiselect-overlay {
        .p-multiselect-header {
            &::after {
                content: var(--multi-select-content);
            }
        }
    }
}

:deep(.p-inputnumber-input) {
    &::placeholder {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 20px);
        box-sizing: border-box;
    }
}
</style>