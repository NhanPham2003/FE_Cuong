import { defineStore } from 'pinia'

export const useSnakBarStore = defineStore('useSnakBarStore', {
  state: () => ({
    snakbarVisible: false,
    snakbarContent: "",
    timeOut: 3000,
  }),
  actions: {
    setSnackBarContent( value) {
      this.snakbarVisible = false
      this.snakbarContent = value
      this.snakbarVisible = true
      setTimeout(() => {
        this.snakbarVisible = false
      }, this.timeOut)
    },
  },
})
