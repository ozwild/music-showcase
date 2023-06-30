import { IRawData, ISong, Key } from '@/data/types'

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

export function useData() {
  return {
    parseData,
  }
}
