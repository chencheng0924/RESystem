import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PageTablePageParams } from '@/lib/pageBuilder/core/PageTableColumn'
export const ReloadStore = defineStore('reloadStore', () => {
    const reloadKey = ref<number>(0)

    const reloadSearchCondition = ref<any>(null)
    const reloadPageParams = ref<PageTablePageParams>(new PageTablePageParams({
        TotalRows: 0,
        First: 0,
        PageIndex: 1,
        PageRows: 10,
    }))
    const resetSearchConditionAndPageParams = () => {
        reloadSearchCondition.value = null;
        reloadPageParams.value = new PageTablePageParams({
            TotalRows: 0,
            First: 0,
            PageIndex: 1,
            PageRows: 10,
        })
    }
    return {
        reloadKey,
        reloadSearchCondition,
        reloadPageParams,
        resetSearchConditionAndPageParams
    }
})
