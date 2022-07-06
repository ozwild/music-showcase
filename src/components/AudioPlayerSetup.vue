<template>
  <div id="player">
    <div class="blur background">
      <div class="background" id="background"></div>
      <canvas id="canvas" :width="width" :height="height"></canvas>
    </div>
    <div><svg id="svg"></svg></div>

    <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />

    <div class="bottom-bar">
      <div class="box">
        <div>
          <div>
            <SongInfo :song="currentSong" />
            <a v-if="!isPlaying" href="#" @click="play">Continue</a>&nbsp;
            <a v-if="isPlaying" href="#" @click="stop">Stop</a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blur {
  filter: blur(2px);
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
#player {
  font-size: 1rem;
  .bottom-bar {
    .box {
      padding: 1em 1.3em;
    }
    background-color: yellow;
    color: #040405;
    position: fixed;
    bottom: 0;
    right: 0;
  }
}
</style>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { $ref, $, $$ } from 'vue/macros'
import { IAudioPlayerOptions, ISong } from '@/types/types'

import { FFTSizes, useAudioPlayer } from '@/composables/useAudioPlayer'
//import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'
//import TestVisualizer from '@/components/TestVisualizer.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong | null = $ref(null)
let bufferLength: number = $ref(0)
let dataArray: Float32Array = $ref(new Float32Array())
let canvas: HTMLCanvasElement = $ref()
let canvasCtx: CanvasRenderingContext2D | null = $ref(null)
let width = $ref(500)
let height = $ref(300)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

const audioPlayer = useAudioPlayer({
  fftSize: FFTSizes.LOW,
})

const {
  useSound,
  play,
  stop,
  pause,
  isPlaying,
  context,
  gainNode,
  analyserNode,
} = $(audioPlayer)

const playSong = (song: ISong) => {
  currentSong = song
  useSound(song.url)
}

watch($$(analyserNode), (value) => {
  bufferLength = value.frequencyBinCount
  dataArray = new Float32Array(bufferLength)
})

function draw() {
  requestAnimationFrame(draw)

  analyserNode.getFloatFrequencyData(dataArray)

  if (!canvasCtx) {
    return
  }

  canvasCtx.clearRect(0, 0, width, height)

  canvasCtx.lineWidth = 5
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)'
  canvasCtx.filter = 'blur'

  canvasCtx.beginPath()

  const sliceWidth = (width * 1.0) / bufferLength
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0
    const y = (-v * height) / 3
    canvasCtx.strokeStyle = `rgb(100, ${i / 4}, ${y / 4})`

    if (i === 0) {
      canvasCtx.moveTo(x, y)
    } else {
      canvasCtx.lineTo(x, y)
    }

    x += sliceWidth
  }

  canvasCtx.lineTo(width, height / 2)
  canvasCtx.stroke()
}

onMounted(() => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvasCtx = canvas.getContext('2d')
  width = window.innerWidth
  height = window.innerHeight
})

draw()
</script>
