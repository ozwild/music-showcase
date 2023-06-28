import { ISong } from '@/data/types'
import { defineStore } from 'pinia'

interface IState {
  isPlaying: boolean
  wantsVideo: boolean
  currentSong: ISong | null
  mediaElement: HTMLVideoElement | null
}

export const usePlayerStore = defineStore('player', {
  state: (): IState => ({
    isPlaying: false,
    wantsVideo: true,
    currentSong: null,
    mediaElement: null,
  }),
})
