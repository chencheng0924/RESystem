<script setup lang="ts">
import { UseSTTabPanelStyle } from './STTabPanel.composable'
const styles = new UseSTTabPanelStyle()
const props = defineProps({
  value: {
    type: String
  }
})
</script>
<template>
  <TabPanel :value="props.value" :pt="styles.getTabPanelStyleOption()">
    <slot></slot>
  </TabPanel>
</template>