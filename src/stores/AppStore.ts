import { defineStore } from 'pinia'

interface IState {
  appName: string
  isLoading: boolean
  showNowPlayingPanel: boolean
  runAnalyzer: boolean
}

export const useAppStore = defineStore('app', {
  state: (): IState => {
    return {
      appName: process.env.VUE_APP_NAME as string,
      showNowPlayingPanel: false,
      runAnalyzer: false,
      isLoading: true,
    }
  },
  getters: {
    normalizedAppName: (state) => {
      return state.appName.toLowerCase().replaceAll(' ', '_')
    },
  },
})
