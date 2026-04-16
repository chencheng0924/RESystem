<template>
  <div class="flex flex-col gap-[1rem]">
    <GoogleMapToolbar />
    <div v-for="(item, index) in controller.dataList.value" :key="index" class="flex justify-between p-[1rem] bg-[#2a2a32] rounded-xl">
      <div class="max-w-[150px]">{{ item.title }}</div>
      <div class="flex items-center gap-2">
        <ToggleSwitch v-if="item.hasSubRoute" @change="controller.handleItem(item)" v-model="item.subchecked" :pt="style.toggleSwitchOption.value" />
        <ToggleSwitch @change="controller.handleItem(item)" v-model="item.checked" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { useMapControll, useStyle } from './mapControll.composable'
const route = useRoute()
const controller = new useMapControll(t, locale, route)
const style = new useStyle()
import ToggleSwitch from 'primevue/toggleswitch';
</script>