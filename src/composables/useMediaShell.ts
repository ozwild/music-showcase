import { ref } from 'vue'

import { usePlayerStore } from '@/stores/PlayerStore'

const audio = ref(createAudio())
const video = ref(createVideoNode())

const videoCanvas = ref(createCanvas())

document.body.append(audio.value, video.value, videoCanvas.value)

function createAudio() {
  const audioNode = document.createElement('audio')
  audioNode.autoplay = true
  audioNode.crossOrigin = 'anonymous'
  audioNode.controls = true
  audioNode.addEventListener('play', () =>
    syncVideo(audioNode.currentTime, { play: true })
  )
  audioNode.addEventListener('pause', () =>
    syncVideo(audioNode.currentTime, { stop: true })
  )
  return audioNode
}

function createVideoNode() {
  const videoNode = document.createElement('video')
  videoNode.muted = true
  videoNode.crossOrigin = 'anonymous'
  videoNode.addEventListener(
    'play',
    () => {
      copyCurrentVideoFrameToCanvas(videoNode)
    },
    false
  )
  return videoNode
}

function createCanvas() {
  const canvasElement = document.createElement('canvas')
  canvasElement.classList.add('video-canvas')
  canvasElement.height = 240
  canvasElement.width = 240
  return canvasElement
}

function syncVideo(audioCurrentTime: number, { play = false, stop = false }) {
  const videoNode = video.value
  if (!video.value.src) {
    return
  }
  videoNode.currentTime = audioCurrentTime
  if (play) videoNode.play()
  if (stop) videoNode.pause()
}

function copyCurrentVideoFrameToCanvas(video: HTMLVideoElement) {
  const ctx = videoCanvas.value.getContext('2d')
  let toggle = false

  console.log('copying video to canvas', ctx, video, video.width, video.height)
  if (!ctx) {
    return
  }

  const loop = () => {
    toggle = !toggle

    if (toggle) {
      requestAnimationFrame(loop)
      return
    }
    console.log('drawing canvas')
    ctx.drawImage(video, 0, 0, 240, 240)

    if (video.paused) return

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}

function initialize() {
  const playerStore = usePlayerStore()
  playerStore.$subscribe((mutation, { currentSong }) => {
    if (currentSong) {
      const {
        source: { audio: audioUrl, video: videoUrl },
      } = currentSong

      if (audioUrl) {
        audio.value.src = audioUrl
      } else {
        audio.value.src = ''
        audio.value.removeAttribute('src')
      }

      if (videoUrl) {
        video.value.src = videoUrl
      } else {
        video.value.src = ''
        video.value.removeAttribute('src')
      }

      console.log('state', audioUrl, videoUrl)
    }
  })
}

export function useMediaShell() {
  initialize()
  return {
    audio,
    video,
  }
}
