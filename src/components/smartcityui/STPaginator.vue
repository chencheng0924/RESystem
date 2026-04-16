<script lang="ts" setup>
import { PageState } from 'primevue/paginator';
import { STPaginatorProps } from './STPaginator.model';
const props = defineProps<{
  props?: STPaginatorProps
}>()
const emit = defineEmits<{
  'update:first': [val: number],
  'update:rows': [val: number],
  'page': [event: PageState],
}>()
</script>
<template>
  <div v-if="!!props?.props">
    <Paginator 
      :rows="props.props?.rows"
      :totalRecords="props.props?.totalRecords"
      :rowsPerPageOptions="props.props?.rowsPerPageOptions"
      :first="props.props?.first"
      :alwaysShow="props.props?.alwaysShow"
      :pageLinkSize="props.props?.pageLinkSize"
      @update:first="(val) => emit('update:first', val)"
      @update:rows="(val) => emit('update:rows', val)"
      @page="(event) => emit('page', event)"
      :template="props.props?.template"
    >
    </Paginator>
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-paginator-prev) {
  &.p-disabled {
    @apply rotate-0 bg-[url('@/assets/img/icon/ic_arrow_disabled.svg')];
  }
  >svg {
    @apply hidden;
  }
  @apply hover:!bg-transparent !bg-[url('@/assets/img/icon/ic_arrow_enabled.svg')] !bg-center !bg-no-repeat !rotate-180;
}
:deep(.p-paginator-next) {
  &.p-disabled {
    @apply  bg-[url('@/assets/img/icon/ic_arrow_disabled.svg')]
  }
  >svg {
    @apply hidden;
  }
  @apply hover:!bg-transparent !bg-[url('@/assets/img/icon/ic_arrow_enabled.svg')] !bg-center !bg-no-repeat
}
:deep(.p-paginator-page) {
  @apply text-body2 hover:!bg-transparent
}
:deep(.p-paginator-page-selected) {
  @apply text-h5
}
</style>