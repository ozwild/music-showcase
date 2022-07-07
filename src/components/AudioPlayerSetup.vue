<template>
  <div id="player">
    <div class="layer background-layer">
      <div class="layer" id="background"></div>
      <canvas
        class="canvas blur"
        id="canvas-b"
        :width="width"
        :height="height"
      ></canvas>
      <canvas
        class="canvas"
        id="canvas-a"
        :width="width"
        :height="height"
      ></canvas>
    </div>

    <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />

    <div class="bottom-bar">
      <div class="box">
        <div>
          <div>
            <SongInfo :song="currentSong" />
            <div>
              <p>MinValue: {{ minValue }}; MaxValue: {{ maxValue }}</p>
            </div>
            <a v-if="!isPlaying" href="#" @click="play">Continue</a>&nbsp;
            <a v-if="isPlaying" href="#" @click="stop">Stop</a>&nbsp;
            <a v-if="isPlaying" href="#" @click="pause">Pause</a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blur {
  filter: blur(3px);
}
.layer {
  position: static;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.background-layer {
    z-index: -1;
  }
}
#background {
  @extend .layer;
  background: linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea);
  background: linear-gradient(to right, aquamarine, #f2f2f2, beige, #eaeaea);
  background: linear-gradient(to right, #ada996, #f2f2f2, beige, #eaeaea);
  background: radial-gradient();
  position: fixed;
  z-index: -1;
  left: 50%;
  transform: translateX(-50%);
  min-width: 1920px;
}
.canvas {
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
import { onMounted, onUnmounted, watch } from 'vue'
import { $ref, $, $$ } from 'vue/macros'
import { IAudioPlayerOptions, ISong } from '@/types/types'

import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { useCanvasRendering } from '@/composables/useCanvasRendering'
//import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'
//import TestVisualizer from '@/components/TestVisualizer.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong | null = $ref(null)
let isDrawingAllowed = $ref(false)
let canvasA: HTMLCanvasElement = $ref()
let canvasACtx: CanvasRenderingContext2D | null = $ref(null)
let canvasB: HTMLCanvasElement = $ref()
let canvasBCtx: CanvasRenderingContext2D | null = $ref(null)
let width = $ref(window.innerWidth)
let height = $ref(window.innerHeight)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

const {
  useSound,
  play,
  stop,
  pause,
  isPlaying,
  context,
  gainNode,
  instance: audioPlayer,
} = $(useAudioPlayer())

watch($$(audioPlayer), (value) => {
  if (value) {
    registerAudioPlayerEventListeners()
  }
})

const { clearCanvas, drawBars, drawOsciloscope, minValue, maxValue } =
  useCanvasRendering($$(context), $$(gainNode))

const playSong = (song: ISong) => {
  currentSong = song
  useSound(song.url)
}

function draw() {
  if (canvasACtx) {
    clearCanvas(canvasACtx)
    drawOsciloscope(canvasACtx)
  }

  if (canvasBCtx) {
    clearCanvas(canvasBCtx)
    drawBars(canvasBCtx)
  }

  if (isDrawingAllowed) requestAnimationFrame(draw)
}

function stopDrawing() {
  setTimeout(() => {
    isDrawingAllowed = false
  }, 500)
}

function updateCanvasDimensions() {
  width = window.innerWidth
  height = window.innerHeight
}

function playHandler() {
  isDrawingAllowed = true
  draw()
}

function stopHandler() {
  stopDrawing()
}

function pauseHandler() {
  stopDrawing()
}

function registerAudioPlayerEventListeners() {
  if (!audioPlayer) {
    return
  }

  audioPlayer.on('play', playHandler)
  audioPlayer.on('stop', stopHandler)
  audioPlayer.on('pause', pauseHandler)
}

onMounted(() => {
  canvasA = document.getElementById('canvas-a') as HTMLCanvasElement
  canvasACtx = canvasA.getContext('2d')

  canvasB = document.getElementById('canvas-b') as HTMLCanvasElement
  canvasBCtx = canvasB.getContext('2d')

  window.addEventListener('resize', updateCanvasDimensions)
})

onUnmounted(() => {
  if (audioPlayer) {
    audioPlayer.off('play', playHandler)
    audioPlayer.off('stop', stopHandler)
    audioPlayer.off('pause', pauseHandler)
  }
  window.removeEventListener('resize', updateCanvasDimensions)
})
</script>
