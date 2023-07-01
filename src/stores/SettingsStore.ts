import { defineStore } from 'pinia'

interface IState {
  showNowPlayingPanel: boolean
  runAnalyzer: boolean
}

export const useSettingsStore = defineStore('settings', {
  state: (): IState => ({
    showNowPlayingPanel: false,
    runAnalyzer: false,
  }),
  actions: {
    toggleNowPlayingPanel() {
      this.showNowPlayingPanel = !this.showNowPlayingPanel
    },
  },
})
