import { ref } from 'vue'
import { defineStore } from "pinia";

export const RESystemStore = defineStore('RESystemStore', () => {
  const token = ref<string>('');

  const setToken = (val:string) => {
    token.value = val
  }

  const getToken = () => {
    return token.value
  }
  return {
    token,
    setToken,
    getToken,
  }
}, {
  persist: {
    key: 'RESystemStore',
    storage: sessionStorage,
    paths: ['token'],
  },
})
