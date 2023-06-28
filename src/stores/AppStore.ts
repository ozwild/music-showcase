import { defineStore } from 'pinia'

interface IState {
  showPlayerOverlay: boolean
}

export const useAppStore = defineStore('app', {
  state: (): IState => ({
    showPlayerOverlay: false,
  }),
  actions: {
    togglePlayerOverlay() {
      this.showPlayerOverlay = !this.showPlayerOverlay
    },
  },
})
