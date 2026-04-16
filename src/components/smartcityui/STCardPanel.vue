<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { STCardItem } from './STCardCustom.model';
import { STCardPanelProps, STCardPanelLayout, STCardPanelMode } from './STCardPanel.model'
import { STPaginatorProps } from './STPaginator.model';
import { PageState } from 'primevue/paginator';
import { STSkeletonProps, STSkeletonType } from '@/components/smartcityui/STSkeleton.model'
import { ThemeSwitchController } from './STThemeMode.compsable';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const props = defineProps<{
  props?: STCardPanelProps,
  paginatorProps?: STPaginatorProps,
  dataTotalCount?: number,   // 資料總共幾筆
  autoScroll?: boolean,    // 是否自動滾動至底部（發生在更新資料後）
}>()
const emit = defineEmits<{
  'eventCardAction': [e: Event, card: STCardItem],
  'paginatorUpdate': [state: PageState],
  'getNextDataEvent',
  'eventCardRatingUpdate': [card: STCardItem],
  'eventDeleteCard': [card: STCardItem]
}>()

const clickBtn = (e: Event, card: STCardItem) => {
  emit('eventCardAction', e, card)
}
const scrollStyle = () => {
  return [
    `height: ${props?.props?.wrapperHeight}; overflow: scroll;`
  ]
}
const gridStyle = () => {
  return [
    `grid-template-columns: repeat(${props.props.rowCount}, minmax(0, 1fr));`,
    `grid-auto-rows: max-content`
  ]
}
const paginatorModeStyle = () => {
  if (props.props.showMode != STCardPanelMode.PAGINATOR) return []
  return [
    'overflow: hidden',
    `grid-template-rows: repeat(${props.props.colCount}, minmax(0, 1fr))`
  ]
}

const updatePage = (state: PageState) => {
  emit('paginatorUpdate', state)
}

const cardRefs = ref<{ cardEl: HTMLDivElement | null }[]>([])
const setCardRef = (el: any, idx: number) => {
  if (el) cardRefs.value[idx] = el
}

const isLoading = ref(true)
const skeletonProps = new STSkeletonProps({
  type: STSkeletonType.CARD_IMG_WITH_FOOTER
})
let observer: IntersectionObserver
const observerTarget = ref(null)
const cardListView = ref(null)

let themeController = new ThemeSwitchController(false)
let mode = themeController.getSearchEmptyImage()
let imgSearchEmpty = ref(mode)

const cardRatingUpdate = (card: STCardItem) => {
  emit('eventCardRatingUpdate', card)
}

const deleteCard = (card: STCardItem) => {
  emit('eventDeleteCard', card)
}

onMounted(() => {
  nextTick(() => {
    const activeCards = props.props?.cardItemList.filter(el => el.isActive)
    // TODO: 這邊之後改成取isActive==true的id
    const cardEl = cardRefs.value[11]?.cardEl
    cardEl?.scrollIntoView({ block: 'center' })

    if (cardListView.value && props.autoScroll) {
      cardListView.value.scrollTo({
        top: (cardListView.value.scrollHeight / 3)
      })
      isLoading.value = false
    }
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && props.props.showMode == STCardPanelMode.INFINITE_SCROLL) {
        isLoading.value = true
        setTimeout(() => {
          emit('getNextDataEvent')
        }, 2000)
      }
    })
    if (observerTarget.value) {
      observer.observe(observerTarget.value)
    }
  })
})

onBeforeUnmount(() => {
  if (!observer) return
  observer.disconnect()
})
</script>
<template>
  <div class="flex flex-col h-full w-full">
    <!-- 標題 -->
    <div class="text-h1 text-foneTextLevel1" v-if="!!props.props?.title">{{ props.props?.title }}</div>

    <div v-if="props.props?.cardItemList.length == 0" class="w-full flex flex-col justify-center items-center gap-[24px]">
      <img :src="imgSearchEmpty" width="84" height="84"/>
      <span class="text-h3">無資料</span>
    </div>

    <!-- wrap排版 -->
    <div v-if="props.props?.layout == STCardPanelLayout.WRAP" class="flex flex-wrap w-full gap-[16px]"
      :style="scrollStyle()">
      <STCardCustom v-for="(card, idx) in props.props?.cardItemList" :cardWrapperClass="props.props.cardWrapperClass"
        :cardContentClass="props.props.cardContentClass" :key="idx + 'card'" :props="card"
        @click="clickBtn($event, card)" />
    </div>

    <!-- column排版 -->
    <div v-if="props.props?.layout == STCardPanelLayout.COLUMN" class="flex flex-col w-full gap-[16px]"
      :style="scrollStyle()">
      <STCardCustom :ref="el => setCardRef(el, idx)" v-for="(card, idx) in props.props?.cardItemList"
        :cardWrapperClass="props.props.cardWrapperClass" :cardContentClass="props.props.cardContentClass"
        :key="idx + 'card'" :props="card" @click="clickBtn($event, card)" />
    </div>

    <!-- grid排版(目前showMode頁籤模式/無限滾動模式只有在grid layout下有效) -->
    <div v-if="props.props?.layout == STCardPanelLayout.GRID" class="grid w-full gap-[16px] m-0 relative"
      :style="[...scrollStyle(), ...gridStyle(), ...paginatorModeStyle()]" ref="cardListView">
      <STCardCustom v-for="(card, idx) in props.props?.cardItemList" :cardWrapperClass="props.props.cardWrapperClass"
        :cardContentClass="props.props.cardContentClass" :key="idx + 'card'" :props="card"
        @click="clickBtn($event, card)" @eventRatingUpdate="cardRatingUpdate" @eventDeleteCard="deleteCard" />
      <template v-if="isLoading && props.props?.showMode == STCardPanelMode.INFINITE_SCROLL && props.props.cardItemList?.length < props?.dataTotalCount">
        <STSkeleton :props="skeletonProps" v-for="x in 6" :key="x+'skeleton'" />
      </template>
      <div ref="observerTarget" v-if="props.props?.cardItemList.length < props?.dataTotalCount && props.props.showMode == STCardPanelMode.INFINITE_SCROLL"></div>
      <Divider class="!w-full col-span-3" align="center" type="solid" v-if="props.props?.cardItemList.length == props?.dataTotalCount">
        <span class="text-body4 text-foneTextLevel2">{{ t('Components.STCardPanel.End') }}</span>
      </Divider>
    </div>


    <!-- Paginator -->
    <div v-if="props.props?.showMode == STCardPanelMode.PAGINATOR && props.paginatorProps" class="flex justify-center mt-[12px]">
      <STPaginator :props="props.paginatorProps" @page="updatePage" />
    </div>
  </div>
</template>