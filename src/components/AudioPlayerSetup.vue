<template>
  <Transition appear>
    <div id="player">
      <div class="layer background-layer">
        <div class="canvas-background"></div>
        <div class="canvas-background-gradient"></div>
        <!-- <canvas id="canvas-d" :width="width" :height="height"></canvas> -->
        <canvas id="canvas-c" :width="width" :height="height"></canvas>

        <canvas id="canvas-a" :width="width" :height="height"></canvas>

        <canvas id="canvas-b" :width="width" :height="height"></canvas>
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

.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: background 2s;
  background: aqua;
  background: fuchsia;
  background: yellow;
  background: chartreuse;
}

.canvas-background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(0deg, black, #999, transparent, #efefff, white);
}

#canvas-a {
  position: fixed;
  left: 5%;
  bottom: 0;
  transform: perspective(29px) rotateX(36deg) rotateY(0deg) rotateZ(-270deg)
    translateZ(0px);
  z-index: 50;
  mix-blend-mode: plus-lighter;
  background: slategray;
}

#canvas-b {
  position: absolute;
  bottom: -18vh;
  left: 0;
  z-index: 100;
  mix-blend-mode: lighten;
}

#canvas-c {
  position: fixed;
  left: -25%;
  top: -24%;
  z-index: 10;
  transform: perspective(90px) rotateX(-18deg) rotateY(-0.2deg) rotateZ(0deg)
    translate3d(20vw, 0vh, 1vh);
  mix-blend-mode: plus-lighter;
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

let width: number = $ref(window.innerWidth)
let height: number = $ref(window.innerHeight)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

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

const { clearCanvas, drawBars, drawOsciloscope, drawHud } = useCanvasRendering(
  $$(context),
  $$(gainNode)
)

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
