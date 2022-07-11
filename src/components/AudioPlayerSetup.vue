<template>
  <Transition appear>
    <div id="player">
      <div class="layer background-layer">
        <PlayerBackground :tempo="tempo" :audioPlayer="audioPlayerComposable" />
        <canvas id="canvas-b" :width="width" :height="height"></canvas>
        <canvas id="canvas-a" :width="width" :height="height"></canvas>
      </div>

      <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />

      <div class="bottom-bar">
        <div class="box">
          <div class="bar-container">
            <div class="controls">
              <SongInfo :song="currentSong" />
              <ProgressInformation :audioPlayer="audioPlayerComposable" />
              <!-- <div>
                <p>MinValue: {{ minValue }}; MaxValue: {{ maxValue }}</p>
              </div> -->
              <a v-if="!isPlaying" href="#" @click="play">Continue</a>&nbsp;
              <a v-if="isPlaying" href="#" @click="stop">Stop</a>&nbsp;
              <a v-if="isPlaying" href="#" @click="pause">Pause</a>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
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

  position: fixed;
  transition: all cubic-bezier(0.47, 0, 0.745, 0.715);
  z-index: -1;
  //left: 50%;
  //transform: translateX(-50%);
  //min-width: 1920px;
  /* background: #222;
  background: radial-gradient(
      ellipse at bottom,
      rgb(150, 100, 100) 0%,
      white 100%
    ); */

  &.isPlaying {
    background: radial-gradient(
      ellipse at bottom,
      rgb(150, 100, 100) 0%,
      white 100%
    );
    //background: linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea);
    //animation: hueRotation 4s ease-in-out infinite forwards;
  }
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#canvas-b {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: scale(0.6, 1) translate(-112%, -79%) skew(0deg, -17deg);
  mix-blend-mode: color-dodge;
}

#canvas-a {
  position: fixed;
  left: 25%;
  top: 25%;
  transform: scale(0.75, 0.8) translate(-60%, -108%) skew(0deg, -20deg);
  transform: scale(0.5, 0.5) translate(-50%, -50%) skew(0deg, 0deg);
  z-index: -1;
  mix-blend-mode: luminosity;
  //filter: blur(0.5px);
  //mix-blend-mode: soft-light;
  //filter: blur(1px);
  opacity: 0.4;
}

#player {
  font-size: 1rem;
  .bottom-bar {
    .box {
      padding: 1em 1.3em;
    }
    .bar-container {
      display: flex;
      .controls {
        background-color: yellow;
        min-width: 250px;
        flex: 1;
      }
    }

    background: darkorange;
    color: #040405;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}

@keyframes hueRotation {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(120deg);
  }
}
</style>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { $ref, $, $$ } from 'vue/macros'
import { IAudioPlayerOptions, ISong } from '@/types/types'

import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { useCanvasRendering } from '@/composables/useCanvasRendering'
import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'
import PlayerBackground from './PlayerBackground.vue'
//import TestVisualizer from '@/components/TestVisualizer.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong = $ref()
let isDrawingAllowed: boolean = $ref(false)
let canvasA: HTMLCanvasElement = $ref()
let canvasACtx: CanvasRenderingContext2D | null = $ref(null)
let canvasB: HTMLCanvasElement = $ref()
let canvasBCtx: CanvasRenderingContext2D | null = $ref(null)
let width: number = $ref(window.innerWidth)
let height: number = $ref(window.innerHeight)
let lastDrawingTimestamp: number | undefined = $ref(undefined)
let tempo: number = $ref(500)
// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

const audioPlayerComposable = useAudioPlayer()

const {
  useSound,
  play,
  stop,
  pause,
  isPlaying,
  context,
  gainNode,
  instance: audioPlayer,
} = $(audioPlayerComposable)

watch($$(audioPlayer), (value) => {
  if (value) {
    registerAudioPlayerEventListeners()
  }
})

const {
  clearCanvas,
  canvasTint,
  drawBars,
  drawOsciloscope,
  drawHud,
  drawTensionLines,
  minValue,
  maxValue,
} = useCanvasRendering($$(context), $$(gainNode))

const playSong = (song: ISong) => {
  currentSong = song
  useSound(song.url)
}

function shouldTriggerBeatDraw(now?: number) {
  return !lastDrawingTimestamp || (now && now - lastDrawingTimestamp >= tempo)
}

function draw(now?: number) {
  if (canvasACtx) {
    clearCanvas(canvasACtx)
    drawHud(canvasACtx)
    drawOsciloscope(canvasACtx)
  }

  if (canvasBCtx) {
    clearCanvas(canvasBCtx)
    drawBars(canvasBCtx)
  }

  if (shouldTriggerBeatDraw(now)) {
    //if (canvasACtx) drawTensionLines(canvasACtx)
    //if (canvasBCtx) canvasTint(canvasBCtx)
    lastDrawingTimestamp = now
  }

  if (isDrawingAllowed) requestAnimationFrame(draw)
}

function stopDrawing() {
  setTimeout(() => {
    if (!isPlaying) isDrawingAllowed = false
  }, 1500)
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

watch(
  () => currentSong,
  (newValue: ISong) => {
    if (!newValue) return
    tempo = newValue.bpm
  }
)

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
