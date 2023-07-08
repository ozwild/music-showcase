import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { unref } from 'vue'
import { useAppStore } from './AppStore'

interface IState {
  appKey: string
  isDark: boolean
}

export const useSettingsStore = defineStore('settings', {
  state: (): IState => {
    const app = useAppStore()
    const appKey = app.normalizedAppName
    const { stored } = useLocalStorage(app.normalizedAppName)
    const storedSettings = unref(stored) as IState
    return {
      ...storedSettings,
      appKey,
    }
  },
  actions: {
    backupSettingsToLocalStorage() {
      const appKey = this.appKey
      const { update } = useLocalStorage(appKey)
      update({ ...this.$state })
    },
  },
})
