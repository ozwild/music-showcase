<template>
  <div id="player">
    <div class="background">
      <div class="background blur" id="background">
        <canvas id="canvas-a" :width="width" :height="height"></canvas>
      </div>
      <canvas id="canvas-b" :width="width" :height="height"></canvas>
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
  filter: blur(5px);
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
import { onMounted, onUnmounted } from 'vue'
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
let canvasA: HTMLCanvasElement = $ref()
let canvasACtx: CanvasRenderingContext2D | null = $ref(null)
let canvasB: HTMLCanvasElement = $ref()
let canvasBCtx: CanvasRenderingContext2D | null = $ref(null)
let width = $ref(window.innerWidth)
let height = $ref(window.innerHeight)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

const audioPlayer = useAudioPlayer()

const { useSound, play, stop, pause, isPlaying, context, gainNode } =
  $(audioPlayer)

const { clearCanvas, drawBars, drawOsciloscope, minValue, maxValue } =
  useCanvasRendering($$(context), $$(gainNode))

const playSong = (song: ISong) => {
  currentSong = song
  useSound(song.url)
}

function draw() {
  requestAnimationFrame(draw)

  if (canvasACtx) {
    clearCanvas(canvasACtx)
    drawOsciloscope(canvasACtx)
  }

  if (canvasBCtx) {
    clearCanvas(canvasBCtx)
    drawBars(canvasBCtx)
  }
}

function updateCanvasDimensions() {
  console.log('resize handler')
  width = window.innerWidth
  height = window.innerHeight
}

onMounted(() => {
  canvasA = document.getElementById('canvas-a') as HTMLCanvasElement
  canvasACtx = canvasA.getContext('2d')

  canvasB = document.getElementById('canvas-b') as HTMLCanvasElement
  canvasBCtx = canvasB.getContext('2d')

  window.addEventListener('resize', updateCanvasDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasDimensions)
})

draw()
</script>
