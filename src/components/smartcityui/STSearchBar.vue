<script lang="ts" setup>
import { STFormItem } from './STForm.model';
import { UseSTSearchBar, UseSTSearchBarStyle } from './STSearchBar.composable'
const emit = defineEmits<{
  'clickSearch': [val: STFormItem],
  'updateInput': [val: string]
}>()
const props = withDefaults(defineProps<{
  props?: STFormItem,
}>(), {
  props: () => (new STFormItem()),
})
const controller = new UseSTSearchBar(emit, props.props)
const styles = new UseSTSearchBarStyle()
</script>
<template>
  <div class="w-full flex relative" v-if="!!props.props">

    <InputGroup class="h-[36px] relative">
      <InputText class="w-full" v-model="controller.inputFieldProps.Value" :name="controller.inputFieldProps.Id"
      :id="controller.inputFieldProps.Id" :placeholder="controller.inputFieldProps.Placeholder"
      @update:modelValue="(val) => { controller.updateInput(val) }" :aria-label="controller.inputFieldProps.Name"
      :type=controller.inputFieldProps.InputType :pt="styles.getInputTextStyle()" />

          <InputGroupAddon class="w-[30px]">
              <Button class="h-[24px]" icon="pi pi-search" severity="secondary" variant="text"
                  @click="controller.search()" />
            
          </InputGroupAddon>
      </InputGroup>
  
  
  </div>
</template>