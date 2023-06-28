import { defineStore } from 'pinia'

interface IState {
  initialized: boolean
  standby: boolean
}

export const useAnalyzerStore = defineStore('analyzer', {
  state: (): IState => ({
    initialized: false,
    standby: false,
  }),
})
