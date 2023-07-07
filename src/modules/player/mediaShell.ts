function syncVideoToAudioTime(
  videoElement: HTMLVideoElement,
  audioCurrentTime: number,
  { play = false, stop = false }
) {
  if (!videoElement.src) {
    return
  }
  videoElement.currentTime = audioCurrentTime - 0

  if (play) videoElement.play()
  if (stop) videoElement.pause()
}

function copyVideoToCanvas(
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement
) {
  const ctx = canvasElement.getContext('2d')
  let toggle = false

  if (!ctx) {
    return
  }

  const loop = () => {
    toggle = !toggle

    if (toggle) {
      requestAnimationFrame(loop)
      return
    }

    ctx.drawImage(videoElement, 0, 0, 240, 240)

    if (videoElement.paused) return

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}

const defaultCanvasSize = {
  width: 240,
  height: 240,
}

class MediaShell {
  audioElement: HTMLAudioElement
  videoElement: HTMLVideoElement
  videoCanvasElement: HTMLCanvasElement

  constructor() {
    this.audioElement = this.createAudioElement()
    this.videoElement = this.createVideoElement()
    this.videoCanvasElement = this.createVideoCanvasElement({
      ...defaultCanvasSize,
    })

    const { audioElement, videoElement, videoCanvasElement } = this

    audioElement.addEventListener('play', () =>
      syncVideoToAudioTime(videoElement, audioElement.currentTime, {
        play: true,
      })
    )
    audioElement.addEventListener('pause', () =>
      syncVideoToAudioTime(videoElement, audioElement.currentTime, {
        stop: true,
      })
    )

    audioElement.addEventListener('seeked', () => {
      syncVideoToAudioTime(videoElement, audioElement.currentTime, {
        play: true,
      })
    })

    videoElement.addEventListener(
      'play',
      () => copyVideoToCanvas(videoElement, videoCanvasElement),
      false
    )

    videoElement.addEventListener('playing', () => {
      syncVideoToAudioTime(videoElement, audioElement.currentTime, {
        play: true,
      })
    })
  }

  createAudioElement() {
    const audioElement = document.createElement('audio')
    audioElement.autoplay = true
    audioElement.crossOrigin = 'anonymous'
    audioElement.controls = true
    return audioElement
  }

  createVideoElement() {
    const videoElement = document.createElement('video')
    videoElement.muted = true
    videoElement.crossOrigin = 'anonymous'
    return videoElement
  }

  createVideoCanvasElement({
    width,
    height,
  }: {
    width: number
    height: number
  }) {
    const canvasElement = document.createElement('canvas')
    canvasElement.classList.add('video-canvas')
    canvasElement.height = height
    canvasElement.width = width
    return canvasElement
  }
}

export default new MediaShell()
