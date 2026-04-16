// 全局存放計時器 ID
const intervals: number[] = []

// 新增計時器 ID
export const addInterval = (id: number) => {
    intervals.push(id)
}

// 刪除指定的計時器 ID
export const removeInterval = (id: number) => {
    const index = intervals.indexOf(id)
    if (index !== -1) {
        intervals.splice(index, 1)
    }
}

// 清除所有計時器,並清空 intervals 數組
export const clearAllIntervals = () => {
    intervals.forEach(id => window.clearInterval(id))
    intervals.length = 0
}