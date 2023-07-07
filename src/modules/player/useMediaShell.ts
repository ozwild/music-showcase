import { ref } from 'vue'

import mediaShell from './mediaShell'

const audioElement = ref(mediaShell.audioElement)
const videoElement = ref(mediaShell.videoElement)
const videoCanvasElement = ref(mediaShell.videoCanvasElement)

export function useMediaShell() {
  return {
    audioElement,
    videoElement,
    videoCanvasElement,
  }
}
