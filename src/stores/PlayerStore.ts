import { defineStore } from 'pinia'
import { ISong } from '@/data/types'

interface IState {
  isPlaying: boolean
  wantsVideo: boolean
  currentSong: ISong | null
}

export const usePlayerStore = defineStore('player', {
  state: (): IState => ({
    isPlaying: false,
    wantsVideo: true,
    currentSong: null,
  }),
})
