import SongPage from '@/pages/SongPage.vue'
import { useSongsStore } from '@/stores/SongBankStore'
import { RouteLocationNormalized } from 'vue-router'

export default {
  path: '/songs/:song',
  name: 'Song',
  component: SongPage,
  beforeEnter: (to: RouteLocationNormalized) => {
    const songStore = useSongsStore()

    const { song: songId } = to.params
    const songs = songStore.songs

    const [song] = songs.filter((song) => song.id === songId)

    if (!song) {
      console.log('redirect')
      return { name: 'NotFound' }
    }
  },
}