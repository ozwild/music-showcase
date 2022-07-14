<template>
  <Transition appear>
    <div id="player">
      <div class="layer background-layer">
        <div class="canvas-background"></div>
        <canvas id="canvas-d" :width="width" :height="height"></canvas>
        <canvas id="canvas-c" :width="width" :height="height"></canvas>
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
  position: fixed;
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

.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(0deg, cyan, transparent, transparent);
  mix-blend-mode: multiply;
}

#canvas-b {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  //transform: scale(0.6, 1) translate(-112%, -79%) skew(0deg, -17deg);
  transform: perspective(100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  transform-origin: 250px;
  //mix-blend-mode: color-dodge;
}

#canvas-a {
  position: fixed;
  left: 5%;
  top: 35%;
  // transform: scale(0.75, 0.8) translate(-60%, -108%) skew(0deg, -20deg);
  // transform: scale(0.5, 0.5) translate(-50%, -50%) skew(0deg, 0deg);
  transform: perspective(10px) rotateX(10deg) rotateY(0deg) rotateZ(-90deg);
  transform: perspective(0.001px) rotateX(1deg) rotateY(0deg) rotateZ(-90deg)
    scale3d(0.75, 0.7, 1);
  transform: perspective(14px) rotateX(8deg) rotateY(0deg) rotateZ(-270deg)
    translate3d(0vh, 0vh, 1vh);
  //transform-origin: 250px;
  z-index: 50;
  background: azure;
  mix-blend-mode: luminosity;
  mix-blend-mode: plus-lighter;
  filter: invert(1);
  //filter: blur(0.5px);
  //mix-blend-mode: soft-light;
  //filter: blur(1px);
  // opacity: 0.4;
}

#canvas-c {
  position: fixed;
  left: -25%;
  top: 10%;
  /* transform: perspective(75px) rotateX(35deg) rotateY(120deg) rotateZ(250deg)
    scale3d(0.75, 0.7, 1) translate3d(33vh, 0vh, -21vh); */
  transform: perspective(255px) rotateX(-20deg) rotateY(180deg) rotateZ(180deg)
    scale3d(0.75, 0.7, 1) translate3d(-55vh, -4vh, -10vh);
  z-index: 10;
  mix-blend-mode: lighten;
  filter: blur(1px);
}

#canvas-d {
  position: fixed;
  left: 0%;
  top: 10%;
  transform: perspective(75px) rotateX(35deg) rotateY(-90deg) rotateZ(-250deg)
    scale3d(0.75, 0.7, 1) translate3d(33vh, 0vh, -21vh);
  z-index: 11;
  mix-blend-mode: plus-lighter;
  opacity: 0.5;
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
import { onMounted, onUnmounted, watch, provide, inject } from 'vue'
import { $ref, $, $$ } from 'vue/macros'
import { IAudioPlayer, IAudioPlayerOptions, ISong } from '@/types/types'
import { playerInjectionKey } from '@/utilities/injectionKeys'
import { useCanvasRendering } from '@/composables/useCanvasRendering'

import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong = $ref()
let isDrawingAllowed: boolean = $ref(false)
let canvasA: HTMLCanvasElement = $ref()
let canvasACtx: CanvasRenderingContext2D | null = $ref(null)
let canvasB: HTMLCanvasElement = $ref()
let canvasBCtx: CanvasRenderingContext2D | null = $ref(null)
let canvasC: HTMLCanvasElement = $ref()
let canvasCCtx: CanvasRenderingContext2D | null = $ref(null)
let canvasD: HTMLCanvasElement = $ref()
let canvasDCtx: CanvasRenderingContext2D | null = $ref(null)
let width: number = $ref(window.innerWidth)
let height: number = $ref(window.innerHeight)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

//const audioPlayerComposable = useAudioPlayer()
const audioPlayerComposable = inject(playerInjectionKey) as IAudioPlayer

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

function draw(now?: number) {
  if (canvasACtx) {
    clearCanvas(canvasACtx)
    drawHud(canvasACtx)
    drawOsciloscope(canvasACtx)
  }

  if (canvasCCtx) {
    clearCanvas(canvasCCtx)
    drawHud(canvasCCtx)
    drawOsciloscope(canvasCCtx)
  }

  if (canvasDCtx) {
    clearCanvas(canvasDCtx)
    drawHud(canvasDCtx)
    drawOsciloscope(canvasDCtx)
  }

  if (canvasBCtx) {
    clearCanvas(canvasBCtx)
    drawBars(canvasBCtx)
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

onMounted(() => {
  canvasA = document.getElementById('canvas-a') as HTMLCanvasElement
  canvasACtx = canvasA.getContext('2d')
  canvasC = document.getElementById('canvas-c') as HTMLCanvasElement
  canvasCCtx = canvasC.getContext('2d')
  canvasD = document.getElementById('canvas-d') as HTMLCanvasElement
  canvasDCtx = canvasD.getContext('2d')

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
