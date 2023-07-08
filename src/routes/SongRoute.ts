import { RouteLocationNormalized } from 'vue-router'
import SongPage from '@/pages/SongPage.vue'
import { useMediaDataStore } from '@/stores'

export default {
  path: '/songs/:song',
  name: 'Song',
  component: SongPage,
  beforeEnter: (to: RouteLocationNormalized) => {
    const mediaStore = useMediaDataStore()

    const { song: songId } = to.params

    const song = mediaStore.getSongById(songId as string)

    if (!song) {
      console.log('redirect')
      return { name: 'NotFound' }
    }
  },
}
