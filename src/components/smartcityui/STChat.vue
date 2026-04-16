<script lang="ts" setup>
import { STPosition } from './STCommon.model'
import { STChatProps, STChatDisplayType, STChatItemType } from './STChat.model'
import STMessageCrm from './STMessage.crm.vue';
import { ref } from 'vue';
import { STButtonConfig } from './STButton.model';
const props = defineProps<{
  props?: STChatProps
}>()

const contentList = ref(props?.props?.contentList);

const emit = defineEmits(['eventClick','eventActionBtn'])
const eventClick = (e,item) => {
  emit('eventClick', e, item );
}
const actionItem = (e,item: STButtonConfig) => {
    emit('eventActionBtn', e,item)
}

</script>



<template>
  <!-- 簡易模式（列表，可點擊） -->
  <div v-if="props.props?.display == STChatDisplayType.SIMPLE" class="flex flex-col">
    <div class="w-full" v-for="(item, idx) in contentList" :key="idx + 'chatContentSimple'">
      <div v-if="item.type == STChatItemType.CONTENT" @click="eventClick($event,item)"
        class="py-[12px] px-[20px] cursor-pointer flex gap-[16px] w-full border-b-[1px] border-b-commBorder"
        :class="{ 'bg-commPrimaryBg': item.isActive }">
        <Avatar :label="item.avatar.Label" :image="item.avatar.Image" :icon="item.avatar.Icon" :size="'normal'"
          :shape="'circle'" class="!min-w-[40px] !h-[40px] !flex" />
        <div class="flex flex-col w-[calc(100%-40px-16px)]">
          <div class="flex justify-between">
            <span class="text-h4 text-commTextLevel1">{{ item.name }}</span>
            <span class="text-body3 text-commTextLevel1">{{ item.time }}</span>
          </div>
          <div class="flex items-center">
            <div class="truncate text-body2 text-commTextLevel1">{{ item.content }}</div>
            <div v-if="!!item.unread" class="min-w-[16px] h-[16px] bg-commThemeRed rounded-full text-center text-body3 text-commTextLevel1 flex justify-center items-center">{{ item.unread }}</div>
          </div>
        </div>
      </div>
      <div v-if="item.type == STChatItemType.LOG" class="w-full py-[16px] text-body3 text-commTextLevel2 text-center">
        {{ item.content }}
      </div>
    </div>
  </div>

  <!-- 詳細模式（對話） -->
  <div v-if="props.props?.display == STChatDisplayType.DETAIL"
    class="flex flex-col px-[20px] pt-[24px] pb-[20px] bg-commBg relative">
    <div class="w-full flex flex-col gap-[16px] mb-[26px]">
      <div v-for="(alert, idx) in props.props.alertList" :key="idx + 'chatContentAlert'">
        <div v-if="alert.position == STPosition.TOP">
          <STMessageCrm :props="alert"  @eventActionBtn="actionItem"/>
        </div>
        <div v-if="alert.position == STPosition.BOTTOMCENTER"
          class="absolute bottom-[40px] left-[50%] translate-x-[-50%]">
          <div class="px-[12px] py-[4px] rounded-[4px] text-body2 text-commTextLevel1 bg-commBgBtn">{{ alert.text }}</div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-[40px] pb-[60px]">
      <div v-for="(item, idx) in props.props.contentList" :key="idx + 'chatContentDetail'">
        <div v-if="item.type == STChatItemType.CONTENT">
          <div class="flex gap-[16px]">
            <Avatar :label="item.avatar.Label" :image="item.avatar.Image" :icon="item.avatar.Icon" :size="'normal'"
              :shape="'circle'" class="!min-w-[32px] !h-[32px] !flex" />
            <div class="flex flex-col">
              <div class="flex gap-[4px] items-center">
                <span class="text-h3 text-commTextLevel1">{{ item.name }}</span>
                <span class="text-body2 text-commTextLevel2">｜{{ item.time }}</span>
              </div>
              <div class="py-[4px] text-body1 text-commTextLevel1">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <div v-if="item.type == STChatItemType.LOG" class="w-full text-body3 text-commTextLevel2 text-center my-[-16px]">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>