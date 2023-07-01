import { Ref, ref, watch } from 'vue'
import { useMediaShell } from './useMediaShell'
import { ISong } from '@/data/types'

const isPlaying = ref(false)
const nowPlaying: Ref<ISong | null> = ref(null)

const { audioElement, videoElement, videoCanvasElement } = useMediaShell()

document.body.append(
  audioElement.value,
  videoElement.value,
  videoCanvasElement.value
)

audioElement.value.addEventListener('play', () => {
  isPlaying.value = true
})

audioElement.value.addEventListener('pause', () => {
  isPlaying.value = false
})

watch(nowPlaying, () => {
  if (!nowPlaying.value) return

  const {
    source: { audio: audioUrl, video: videoUrl },
  } = nowPlaying.value

  if (audioUrl) {
    audioElement.value.src = audioUrl
  } else {
    audioElement.value.src = ''
    audioElement.value.removeAttribute('src')
  }

  if (videoUrl) {
    videoElement.value.src = videoUrl
  } else {
    videoElement.value.src = ''
    videoElement.value.removeAttribute('src')
  }
})

export function useMediaPlayer() {
  return {
    nowPlaying,
    isPlaying,
    currentTime: audioElement.value.currentTime,
    play: () => audioElement.value.play(),
    pause: () => audioElement.value.pause(),
    listen: {
      onPlayerStateChange: (listener: () => void) => {
        audioElement.value.addEventListener('play', listener)
        audioElement.value.addEventListener('pause', listener)
        audioElement.value.addEventListener('ended', listener)
      },
    },
    isThisSongPlaying: (song: ISong) =>
      nowPlaying.value !== null && nowPlaying.value.id === song.id,
  }
}
