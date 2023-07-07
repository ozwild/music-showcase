import { Ref, ref, watch } from 'vue'
import { ISong } from '@/data/types'

import { useMediaShell } from './useMediaShell'

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const bufferedTimeRanges: Ref<{ start: number; end: number }[]> = ref([])
const nowPlaying: Ref<ISong | null> = ref(null)

const { audioElement, videoElement, videoCanvasElement } = useMediaShell()

document.body.append(
  // audioElement.value,
  // videoElement.value,
  videoCanvasElement.value
)

audioElement.value.addEventListener('play', () => {
  isPlaying.value = true
})

audioElement.value.addEventListener('pause', () => {
  isPlaying.value = false
})

audioElement.value.addEventListener(
  'timeupdate',
  () => {
    currentTime.value = audioElement.value.currentTime
  },
  false
)

audioElement.value.addEventListener('progress', () => {
  const audioBuffered = audioElement.value.buffered
  bufferedTimeRanges.value = []

  for (let i = 0; i < audioBuffered.length; i++) {
    const start = audioBuffered.start(i)
    const end = audioBuffered.end(i)
    bufferedTimeRanges.value.push({ start, end })
  }
})

audioElement.value.addEventListener('loadeddata', () => {
  duration.value = audioElement.value.duration
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
    videoCanvasElement,
    nowPlaying,
    isPlaying,
    audioElement,
    currentTime,
    bufferedTimeRanges,
    duration,
    loadSong: (song: ISong) => {
      if (nowPlaying.value !== song) {
        nowPlaying.value = song
      } else {
        audioElement.value.currentTime = 0
        audioElement.value.play()
      }
    },
    play: () => audioElement.value.play(),
    pause: () => audioElement.value.pause(),
    seek: (seconds: number) => {
      if (0 <= seconds && seconds <= duration.value) {
        audioElement.value.currentTime = seconds
      }
    },
    listen: {
      onPlayerStateChange: (listener: () => void) => {
        audioElement.value.addEventListener('play', listener)
        audioElement.value.addEventListener('pause', listener)
        audioElement.value.addEventListener('ended', listener)
      },
      onTimeUpdate: (listener: () => void) => {
        audioElement.value.addEventListener('timeupdate', listener)
      },
      onBuffering: (listener: () => void) => {
        audioElement.value.addEventListener('progress', listener)
      },
    },
    isThisSongPlaying: (song: ISong) =>
      nowPlaying.value !== null && nowPlaying.value.id === song.id,
  }
}
