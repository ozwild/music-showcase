import { defineStore } from 'pinia'
import { IAlbumArtist, IGenre, ISong, ITag } from '@/data/types'

interface IState {
  songs: ISong[]
  albumArtists: IAlbumArtist[]
  genres: IGenre[]
  tags: ITag[]
  filterBy: string
}

export const useSongsStore = defineStore('songs', {
  state: (): IState => ({
    songs: [],
    filterBy: '',
    albumArtists: [],
    genres: [],
    tags: [],
  }),
  getters: {
    getSongById: (state) => (id: string) =>
      state.songs.find((song) => song.id === id),
    filteredSongs: (state) => {
      const regex = new RegExp(state.filterBy, 'i')
      return state.songs.filter(
        (song) =>
          regex.test(song.title) ||
          (song.albumArtist && regex.test(song.albumArtist.name))
      )
    },
  },
  actions: {
    loadData({
      songs,
      albumArtists,
      genres,
      tags,
    }: {
      songs: ISong[]
      albumArtists: IAlbumArtist[]
      genres: IGenre[]
      tags: ITag[]
    }) {
      this.songs = songs
      this.albumArtists = albumArtists
      this.genres = genres
      this.tags = tags
    },
  },
})
