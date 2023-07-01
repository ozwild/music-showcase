import { defineStore } from 'pinia'
import { IAlbumArtist, IGenre, IRawData, ISong, ITag, Key } from '@/data/types'

import data from '@/data/DATA.json'

interface IState {
  songs: ISong[]
  albumArtists: IAlbumArtist[]
  genres: IGenre[]
  tags: ITag[]
  filterBy: string
}

const parseData = ({
  songs: precursorSongs,
  albumArtists: precursorAlbumArtists,
  genres,
  tags,
}: IRawData) => {
  const albumArtists = precursorAlbumArtists.map(({ id, name, genreId }) => ({
    id,
    name,
    genre: genres.find((genre) => genre.id === genreId),
  }))

  const songs = precursorSongs.map(
    ({
      id,
      draft,
      type,
      title,
      albumArtistId,
      audioUrl,
      videoUrl,
      year,
      bpm,
      key,
      energy,
      danceability,
      happiness,
    }) => ({
      id: id as string,
      draft: draft === 1,
      title: title as string,
      type: tags.find((tag) => tag.id === (type as string)),
      albumArtist: albumArtists.find((artist) => artist.id === albumArtistId),
      source: { audio: audioUrl as string, video: videoUrl },
      meta: {
        year,
        bpm,
        key: key as Key,
        energy,
        danceability,
        happiness,
      },
    })
  )

  return { songs: songs as ISong[], albumArtists, genres, tags }
}

const { songs, albumArtists, genres, tags } = parseData(data)

export const useMediaDataStore = defineStore('mediaData', {
  state: (): IState => ({
    songs,
    albumArtists,
    genres,
    tags,
    filterBy: '',
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
  actions: {},
})
