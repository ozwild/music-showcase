import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { unref } from 'vue'
import { useEnvironmentStore } from './EnvironmentStore'

interface IState {
  isDark: boolean
  showNowPlayingPanel: boolean
  runAnalyzer: boolean
}

export const useSettingsStore = defineStore('settings', {
  state: (): IState => {
    const environmentStore = useEnvironmentStore()
    const { stored } = useLocalStorage(environmentStore.normalizedAppName)
    const storedSettings = unref(stored) as IState

    return {
      ...storedSettings,
      showNowPlayingPanel: false,
      runAnalyzer: false,
    }
  },
  actions: {
    toggleNowPlayingPanel() {
      this.showNowPlayingPanel = !this.showNowPlayingPanel
    },
  },
})
