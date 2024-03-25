import { defineStore } from 'pinia'

export const useChatStore = defineStore('useChatStore', {
  state: () => ({
    chatBox: [],
  }),
})
