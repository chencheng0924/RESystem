<script setup lang="ts">
import { STAvatar } from "./STCommon.model"
import { STIconText } from "./STMasterInfo.model";
import Icon from "@/components/Icon.vue"
const props = defineProps({
    title: {
        type: String,
    },
    dateInfo: {
        type: String,
    },
    desc: {
        type: String,
    },
    tagSeverity: {
        type: String,
    },
    tagValue: {
        type: String,
    },
    avatar: {
        type: STAvatar,
    },
    cardpt:{
        type: Object,
        default: null
    },
    iconTexts:{
        type: Array<STIconText>,
        default: []
    }
})


type AvatarSize = 'normal' | 'large' | 'xlarge';
type AvatarShape = 'square' | 'circle';

const pt = {
    root: {
        class: [
            '!shadow-none',
            '!h-[92px]',
        ]
    },
    body: ({ props }) => ({
        class: [
            // Spacing
            '!p-[16px]'
        ]
    }),
}

const avatarPt={
      root: ({ props }) => ({
        class: [
            // Spacing
            '!w-[60px] !h-[60px]'
        ]
    }),
    
}

</script>

<template>
    <div class="w-full">
        <Card :pt="props.cardpt ?? pt">
            <template #content>
                <div class="flex items-center">
                    <div class="flex items-center pr-[12px]" v-if="avatar != null">
                        <Avatar 
                         :pt="avatarPt" 
                        :label="avatar?.Label?.[0]" 
                            :image="avatar?.Image" :icon="avatar?.Icon"
                            :size="avatar?.Size as AvatarSize" 
                            :shape="avatar?.Shape as AvatarShape"  />
                    </div>
                    <div class="w-full">
                        <div class="w-full flex items-center justify-between">
                            <!--主文字 -->
                            <div>
                                <span class="font-bold text-[18px] !leading-[28px]">{{ props.title }}</span>
                                <Tag class="ml-4" v-if="props.tagSeverity != ''" :severity="props.tagSeverity"
                                    :value="props.tagValue">
                                </Tag>
                            </div>
                           <!--附屬文字 -->
                            <div>
                                <div v-if="props.iconTexts.length > 0" class="flex items-center justify-end">
                                    <div class="flex justify-start items-center" v-for="(iconText,index) in props.iconTexts">
                                        <Icon :name="iconText.icon" class="mr-[4px]" custom-class="text-foneTextLevel2"></Icon>                                   
                                        <div class="text-foneTextLevel2">{{ iconText.text ?? '' }}</div>
                                        <Divider layout="vertical" class="border-[1px] border-foneBorder !h-[16px] !p-[0px] !mx-[8px]" v-if="index != props.iconTexts.length-1"/>
                                    </div>
                                </div>
                                <span v-else class="text-[12px] leading-[18px] text-foneTextLevel2">{{ props.dateInfo }}</span>
                            </div>
                            
                        </div>

                        <div class="w-full text-[14px] leading-[22px] !mt-[4px]  text-foneTextLevel1">{{ props.desc }}</div>


                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
