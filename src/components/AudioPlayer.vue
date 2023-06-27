<template>
  <div id="player">
    <div class="blur background">
      <div class="background" id="background"></div>
      <canvas id="canvas" :width="width" :height="height"></canvas>
    </div>
    <div><svg id="svg"></svg></div>

    <div>
      <ol>
        <li
          class="li"
          :class="{ active: currentSong?.id === song.id }"
          v-for="song in songs"
          :key="song.id"
          @click="() => playSong(song)"
        >
          {{ song.title }}
        </li>
      </ol>
    </div>
    <div class="bottom-bar">
      <div class="box">
        <div>
          <div>
            <SongInfo :song="currentSong" />
            <a v-if="!isPlaying" href="#" @click="playAll">Play</a>&nbsp;
            <a href="#" @click="stop">Stop</a>
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
.li {
  background: yellow;
  padding: 2px 15px 2px 5px;
  display: contents;
  display: inline flow-root list-item;
  font-size: x-large;
  transform: scale(0.7);
  cursor: pointer;
  transition: all 0.6s;
  &.active {
    background: greenyellow;
  }
  &:hover {
    transform: scale(1);
    transition: all 0.3s;
    z-index: 1000;
  }
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
import { onMounted } from 'vue'
import { $ref } from 'vue/macros'

import SongInfo from '@/components/SongInfo.vue'

import { FFTSizes } from '@/composables/useAnalizer'
import { IAudioPlayerOptions, ISong } from '@/data/types'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()
const context: AudioContext = new AudioContext()
const analyser: AnalyserNode = new AnalyserNode(context, {
  fftSize: FFTSizes.LOW,
})
const bufferLength = analyser.frequencyBinCount
const dataArray: Float32Array = $ref(new Float32Array(bufferLength))

let currentSong: ISong | null = $ref(null)
let isPlaying: boolean = $ref(false)
let continuousPlay: boolean = $ref(false)
let duration: number = $ref(0)

let source: AudioBufferSourceNode | null = $ref(null)
let background: HTMLElement | null = $ref()
let canvas: HTMLCanvasElement = $ref()
let canvasCtx: CanvasRenderingContext2D | null = $ref(null)
let width = $ref(500)
let height = $ref(300)

function playSong(song: ISong) {
  currentSong = song

  if (source) {
    source.stop()
    source.removeEventListener('ended', playNextHook)
  }

  fetch(song.url, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  })
    .then((response) => response.arrayBuffer())
    .then((audioData) => {
      context.decodeAudioData(audioData, (buffer) => {
        source = context.createBufferSource()
        if (source) {
          source.connect(context.destination)
          source.connect(analyser)
          source.buffer = buffer
          duration = buffer.duration
          source.addEventListener('ended', playNextHook)
          play()
        }
      })
    })
}

function playNextHook() {
  if (continuousPlay && currentSong) {
    const index = songs.indexOf(currentSong)
    if (index < songs.length) playSong(songs[index])
  }
}

function playAll() {
  playSong(songs[0])
}

function play(offsetSeconds = 0) {
  if (source) {
    source.start(0, offsetSeconds)
    isPlaying = true
  }
}

function forward(seconds: number) {
  if (source) {
    source.stop()
    source.start(seconds)
  }
}

function stop() {
  if (source) {
    source.stop()
    isPlaying = false
  }
}

onMounted(() => {
  background = document.getElementById('background')
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvasCtx = canvas.getContext('2d')
  width = window.innerWidth
  height = window.innerHeight
})

function draw() {
  requestAnimationFrame(draw)

  analyser.getFloatFrequencyData(dataArray)

  if (!canvasCtx) {
    return
  }

  canvasCtx.clearRect(0, 0, width, height)

  canvasCtx.lineWidth = 1
  canvasCtx.strokeStyle = 'rgb(230, 235, 210)'
  canvasCtx.filter = 'blur'

  canvasCtx.beginPath()

  const sliceWidth = (width * 1.0) / bufferLength
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0
    const y = (-v * height) / 3

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

draw()
</script>
