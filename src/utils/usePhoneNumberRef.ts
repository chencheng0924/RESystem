import { customRef } from 'vue'

export function usePhoneNumberRef(initialValue: string = '') {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 4) {
      return numbers
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`
    } else {
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7, 10)}`
    }
  }
  return customRef((track, trigger) => {
    let value = initialValue
    return {
      get() {
        track() // 追蹤誰在使用這個值
        return value
      },
      set(newValue: string) {
        value = formatPhoneNumber(newValue)
        trigger() // 通知所有依賴這個值的地方更新
      }
    }
  })
}