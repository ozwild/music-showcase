import { useMediaShell } from './useMediaShell'
import { ISong } from '@/data/types'
import { Ref, ref } from 'vue'

const nowPlaying: Ref<ISong | null> = ref(null)
const isPlaying: Ref<boolean> = ref(false)

const { audioElement } = useMediaShell()

const eventListeners = [
  {
    type: 'play',
    handler() {
      isPlaying.value = true
    },
  },
  {
    type: 'pause',
    handler() {
      isPlaying.value = false
    },
  },
]

function setNowPlaying(song: ISong) {
  nowPlaying.value = song
}

export function usePlayer() {
  console.log('audio', audioElement.value)

  eventListeners.forEach(({ type, handler }) => {
    audioElement.value.addEventListener(type, handler)
  })

  return {
    nowPlaying,
    isPlaying,
    currentTime: audioElement.value.currentTime,
    play: () => audioElement.value.play(),
    pause: audioElement.value.pause,
    setNowPlaying,
  }
}
