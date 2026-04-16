<script lang="ts" setup>
import { STFilterProps } from './STFilter.model'
import { STFormItemType } from './STForm.model'
import { STButtonType } from './STButton.model'
import { UseSTFilter, UseSTFilterStyle } from './STFilter.composable'
import STDatePicker from './STDatePicker.vue';
import { STDatePickerProps } from './STDatePicker.model'
import { STTagModeType } from './STTag.model'
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useDebounceFn } from '@vueuse/core'


const { t, locale } = useI18n()
const lang = locale.value
const props = defineProps<{
  props: STFilterProps
}>()
const controller = new UseSTFilter(props?.props?.condList)
const style = new UseSTFilterStyle()
const emit = defineEmits(['change', 'search'])
const change = (e, item) => {
  e['targetItem'] = item;
  emit('change', e);
}
const updateDropdown = (val: any, item) => {
  item.Value = val;
  var e = {};
  e['targetItem'] = item;
  e['value'] = val;
  emit('change', e);
}
const updateInput = (val, item) => {
  // console.log(val)
  // console.log(item)
  var e = {};
  e['targetItem'] = item;
  e['value'] = val;
  emit('change', e);
}
const verification = (formItem, $event) => {
  //console.log("verificationaaaa", formItem);
  if (formItem.verification != null) {
    formItem.verification(formItem, $event);
  }

}

const searchBtn = (e) => {
  // controller.setFinalCond();
  emit('search', e, controller.condList.value);
}

const resetBtn = (e) => {
  controller.resetCondValue()
  emit('search', e, controller.condList.value);
}

const debouncedAjax = useDebounceFn((item: any, currentValue: any) => {
    item.ListAjax(currentValue).then((x) => {
        item.List = x;
        //console.log("清單", tempItem.List);
    });

}, 800)
const onFilter = (item, e) => {
    console.log("onFilter", e)

    let currentValue = e['value'];
    if (item.RemoteAjaxMode) {
        if (typeof item.ListAjax == "function") {

            debouncedAjax(item, currentValue);
        }

    }

}




onMounted(() => {
    for (let i = 0; i < props?.props?.condList.length; i++) {
        const tempItem = props?.props?.condList[i];
        if (tempItem.ListAjax != null) {

            if (typeof tempItem.ListAjax == "function") {
                tempItem.ListAjax().then((x) => {
                    // 增加已選中的資料
                    let ds:Array<any> = x;
                    if(tempItem.Value != null && tempItem.Value.length > 0){
                        ds = [...tempItem.Value, ...x];
                        ds = ds.groupBy(x=>x.key).map(x=>x.members.firstOrDefault());
                    }
                    // 若搜尋的key超過原本搜尋的筆數，就把新搜出來的筆數加到ds中
                    if (tempItem.Value && !ds.some(item => item.key === tempItem.Value.key)) {
                        ds.push(tempItem.Value);
                    }

                    
                    tempItem.List = ds;
                })
            }

        }
    }

});

</script>
<template>
  <div class="w-full bg-foneBgLevel1">
    <div class="bg-foneBgLevel1 grid grid-cols-4 gap-[16px] w-full items-end m-0">
      <div v-for="(item, idx) in controller.condList.value" v-show="controller.isExpand.value ? idx < 3 : true">
        <div class="flex flex-col gap-[4px]">
          <label :for="item.Id" v-if="item.hasLabel">{{ t(item.Name) }}</label>
          <div>
            <ToggleSwitch v-if="item.Type === STFormItemType.ToggleSwitch" v-model="item.Value" />
          </div>
          

          <div v-if="item.Type === STFormItemType.MultiSelect" class="flex gap-[var(--label-gap)]">
                  <MultiSelect  :class="`w-full h-[2.75rem]`" :id="item.Id"
                      v-model="item.Value" :optionLabel="item.OptionLabel" :options="item.List"
                      @change="(e) => { change(e, item) }" :filter="item.HasFilter"
                      :placeholder=item.Placeholder :invalid="!!item.ErrorText"
                      :filterPlaceholder="item.FilterPlaceholder" :name="item.Id"
                      @update:modelValue="(e) => { updateDropdown(e, item) }" :disabled="item.IsDisabled"
                       @filter="(e) => { onFilter(item, e) }"
                       >
                      <template #option="slotProps">
                          <div class="align-items-center">
                              <div class="text-body2 text-TextLevelOne break-words whitespace-pre-line">{{
                                  slotProps.option[item.OptionLabel] }}</div>
                              <div v-if="slotProps.option?.SubName"
                                  class="break-words whitespace-pre-line text-body2 text-TextLevelTwo">{{
                                      slotProps.option?.SubName }}</div>
                          </div>
                      </template>
                  </MultiSelect>

            </div>
          <Select class="flex flex-1" v-if="item.Type === STFormItemType.Select" :id="item.Id" v-model="item.Value"
            :optionLabel="item.OptionLabel" :options="item.List" @change="(e) => { change(e, item) }"
            :filter="item.HasFilter" :placeholder=item.Placeholder :invalid="!!item.ErrorText"
            :filterPlaceholder="item.FilterPlaceholder" :name="item.Id"
            @update:modelValue="(e) => { updateDropdown(e, item) }" :inputId="item.Id"
             @filter="(e) => { onFilter(item, e) }"
             >
            <template #option="slotProps">
              <div class="align-items-center">
                <div class="text-body2 text-TextLevelOne break-words whitespace-pre-line">{{
                  slotProps.option[item.OptionLabel] }}</div>
                <div v-if="slotProps.option?.SubName"
                  class="break-words whitespace-pre-line text-body2 text-TextLevelTwo">
                  {{
                    slotProps.option?.SubName }}</div>
              </div>
            </template>
          </Select>

          <STDatePicker v-if="item.Type === STFormItemType.DatePicker" :props="item as STDatePickerProps" />

          <InputText class="flex flex-1" v-if="item.Type === STFormItemType.InputText" v-model="item.Value"
            :name="item.Id" :id="item.Id" :placeholder=item.Placeholder :invalid="!!item.ErrorText"
            @update:modelValue="(val) => { updateInput(val, item) }" @blur="verification(item, $event)"
            :aria-label="item.Name" :maxlength="item.Maxlength" :type=item.InputType :disabled="item.IsDisabled" />
            <InputNumber v-if="item.Type === STFormItemType.InputNumber" v-model="item.Value"
            :name="item.Id" :id="item.Id" :placeholder=item.Placeholder :invalid="!!item.ErrorText"
            @update:modelValue="(val) => { updateInput(val, item) }" @blur="verification(item, $event)"
            :aria-label="item.Name" :maxlength="item.Maxlength" :type=item.InputType :disabled="item.IsDisabled" />

          <Textarea v-if="item.Type === STFormItemType.Textarea" :props="item" />
        </div>
      </div>
      <div class="flex gap-[16px] whitespace-nowrap h-[32px] col-end-5 items-center mb-1.5">
        <div class="ml-auto flex gap-[8px]">
          <!-- <Button :label="t('Components.STFilter.Reset')" :severity="STButtonType.OUTLINED" outlined class="w-[80px]"
            :disabled="controller.checkDisabled().value" @click="resetBtn" :pt="style.buttonOutlineStyleOption.value"/> -->
          <Button :label="t('Components.STFilter.Reset')" :severity="STButtonType.OUTLINED" outlined class="w-[80px]"
             @click="resetBtn" :pt="style.buttonOutlineStyleOption.value"/>
          <Button :label="t('Components.STFilter.Apply')" :severity="STButtonType.PRIMARY" class="w-[80px]"
            :disabled="controller.checkDisabled().value" @click="searchBtn"  :pt="style.buttonStyleOption.value"/>
        </div>
        <div v-if="controller.condList.value.length > 3">
        <Button :label="t(controller.expandText.value)" :severity="STButtonType.PRIMARY" text
          :icon="controller.expandIcon.value" iconPos="right" 
          :class="{'w-[80px]': lang == 'en-US', 'w-[68px]': lang == 'zh-TW'}" 
          @click="controller.toggleExpand()" />
        </div>

      </div>
    </div>
    <!-- <div class="p-[24px] border-t-[1px] border-t-foneBorder flex gap-[8px]"
      v-if="controller.finalCondList.value.length > 0">
      <span class="text-h3 text-foneTextLevel1 whitespace-nowrap">篩選條件：</span>
      <STTag :mode="STTagModeType.GROUP" :groupProps="controller.finalCondList.value" />
    </div> -->
  </div>
</template>