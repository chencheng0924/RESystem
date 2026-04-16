import { ref } from 'vue'
import { defineStore } from 'pinia'
import { TokenData } from '@/service/TokenService'
export const useGuestToken = defineStore('guestToken', () => {
    const guestToken = ref<TokenData>(null)
    return {
        guestToken
    }
})
export const useDeviceToken = defineStore('deviceToken', () => {
    const deviceToken = ref<String>('')
    return {
        deviceToken
    }
})