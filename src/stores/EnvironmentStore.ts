import { defineStore } from 'pinia'

interface IState {
  appName: string
}

export const useEnvironmentStore = defineStore('environment', {
  state: (): IState => ({ appName: process.env.VUE_APP_NAME as string }),
  getters: {
    normalizedAppName: (state) => {
      return state.appName.toLowerCase().replaceAll(' ', '_')
    },
  },
})
