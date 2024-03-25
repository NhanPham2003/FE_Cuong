import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('useOverlayStore', {
  state: () => ({
    overlayVisible: false,
  }),
})
