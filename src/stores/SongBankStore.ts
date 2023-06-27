import { defineStore } from 'pinia'
import { ISong } from '@/data/types'

interface IState {
  allSongs: ISong[]
  songs: ISong[]
  filterBy: string
}

export const useSongsStore = defineStore('songs', {
  state: (): IState => ({
    allSongs: [],
    songs: [],
    filterBy: '',
  }),
  actions: {
    filter(filterBy: string) {
      this.filterBy = filterBy
      const regex = new RegExp(filterBy, 'i')
      this.songs = this.allSongs.filter(
        (song) => regex.test(song.title) || regex.test(song.albumArtist)
      )
    },
  },
})
