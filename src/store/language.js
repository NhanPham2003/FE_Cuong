import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('useLanguageStore', {
  state: () => ({
    isEn: false,
  }),
})
