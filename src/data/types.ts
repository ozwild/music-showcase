type Mode = 'Major' | 'Minor'
type Scale = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export type Key = `${Scale} ${Mode}`

export interface IRawData {
  songs: Partial<ISongPrecursor>[]
  albumArtists: IAlbumArtistPrecursor[]
  genres: IGenre[]
  tags: ITag[]
}
export interface ISongPrecursor {
  id: string
  draft: number
  type: string
  title: string
  albumArtistId: string
  albumArtist: string
  year?: number
  key?: string
  bpm?: number
  energy?: number
  danceability?: number
  happiness?: number
  audioUrl: string
  videoUrl?: string
}

export interface ISong {
  id: string
  draft: boolean
  title: string
  type?: ITag
  albumArtist?: IAlbumArtist
  meta: Partial<ISongMeta>
  source: ISource
}

export interface IAlbumArtistPrecursor {
  id: string
  name: string
  genreId: string
  genero: string
}

export interface IAlbumArtist {
  id: string
  name: string
  genre?: IGenre
}

export interface IGenre {
  id: string
  name: string
}

export interface ITag {
  id: string
  name: string
  description: string
}

export interface ISongMeta {
  year: number
  bpm: number
  key: Key
  energy: number
  danceability: number
  happiness: number
}

export interface ISource {
  audio: string
  video?: string
}
