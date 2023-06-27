export interface ISong {
  id: string
  title: string
  albumArtist: string
  url?: string
  isVideo?: boolean
  meta: ISongMeta
  audioUrl?: string
  videoUrl?: string
}

export interface ISongMeta {
  bpm?: number
  key?: string
  energy?: number
  danceability?: number
  happiness?: number
}
