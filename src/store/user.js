import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
    avatar: {},
    sessionId: '',
  }),
})
