import { defineStore } from 'pinia'
import { ISong } from '@/data/types'

interface IState {
  songs: ISong[]
  filterBy: string
}

export const useSongsStore = defineStore('songs', {
  state: (): IState => ({
    songs: [],
    filterBy: '',
  }),
  getters: {
    getSongById: (state) => (id: string) =>
      state.songs.find((song) => song.id === id),
    filteredSongs: (state) => {
      const regex = new RegExp(state.filterBy, 'i')
      return state.songs.filter(
        (song) => regex.test(song.title) || regex.test(song.albumArtist)
      )
    },
  },
  actions: {},
})
