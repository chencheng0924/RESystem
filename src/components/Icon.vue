<template>

  <div v-if="props.name.indexOf('pi') != -1">
     <span :class="props.name" />
  </div>
  <div v-else>
    <svg :class="['icon', customClass ]" v-bind="$attrs">
      <use :xlink:href="`#${name}`" />
    </svg>
  </div>

  
</template>

<script setup>
import { defineProps ,ref} from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: 'text-foneTextLevel1',
  },
});


</script>

<style scoped>
.icon {
  width: 15px;
  height: 15px;
  fill: currentColor;
}
</style>
