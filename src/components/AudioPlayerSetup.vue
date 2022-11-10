<template>
  <Transition appear>
    <div id="player">
      <div class="">
        <!-- <video
          v-if="!lightTheme"
          src="https://demo.audiomotion.me/backgrounds/Starfield.mp4"
          autoplay
          loop
        ></video> -->
        <div v-if="!lightTheme" class="dark-background"></div>
        <div id="visualization-container" ref="visualizationContainer" />
      </div>

      <SongList
        :songs="songs"
        :currentSong="currentSong"
        :lightTheme="lightTheme"
        @click="playSong"
      />

      <div class="bottom-bar">
        <div class="box">
          <div class="bar-container">
            <div class="controls">
              <SongInfo :song="currentSong" />
              <audio
                ref="audioElement"
                :src="currentSong?.url"
                crossOrigin="anonymous"
                @canplay="loadedDataHandler"
                @pause="pausedHandler"
                @play="playHandler"
                controls
                autoplay
              ></audio>
              <button @click="toggleLoRes">Lo Res.</button>
              <button @click="toggleTheme">Theme</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.dark-background {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #040405;
}
#visualization-container {
  position: fixed;
  z-index: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  canvas {
    width: 100%;
  }
}
video {
  position: fixed;
  top: 0;
}
#player {
  font-size: 1rem;
  audio {
    width: 100%;
  }
  .bottom-bar {
    .box {
      padding: 1em 1.3em;
    }
    .bar-container {
      display: flex;
      .controls {
        min-width: 250px;
        flex: 1;
      }
    }

    width: 90vw;
    color: #040405;
    position: fixed;
    bottom: 2vh;
    left: 5vw;
  }
}
</style>

<script lang="ts" setup>
import { ref, Ref, provide, Transition, onMounted } from 'vue'
import { $ref } from 'vue/macros'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { IAudioPlayerOptions, ISong } from '@/types/types'

import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'
import { useAudioVisualizer } from '@/composables/useAudioVisualizer'

const { spawn } = useAudioVisualizer()
const visualizationContainer: HTMLElement = $ref()
const audioElement: HTMLMediaElement = $ref()
let visualizer: Ref<AudioMotionAnalyzer | null> = ref(null)

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong = $ref()
let lightTheme = $ref(true)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

// eslint-disable-next-line @typescript-eslint/no-empty-function
function play() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function stop() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function pause() {}

const playSong = (song: ISong) => {
  currentSong = song
}

function toggleLoRes() {
  if (visualizer.value) {
    visualizer.value.loRes = !visualizer.value.loRes
  }
}

function toggleTheme() {
  if (visualizer.value) {
    if (lightTheme) {
      visualizer.value.gradient = 'outrun'
    } else {
      visualizer.value.gradient = 'light'
    }
  }
  lightTheme = !lightTheme
}

/* function drawCallback(instance: AudioMotionAnalyzer) {
  const ctx = instance.canvasCtx,
    baseSize = (instance.isFullscreen ? 40 : 20) * instance.pixelRatio

  ctx.font = `${baseSize * 3 * instance.pixelRatio}px Orbitron, sans-serif`

  ctx.fillStyle = '#fff8'
  ctx.textAlign = 'center'
  const x = instance.canvas.width - baseSize * 5
  const y = baseSize * 3
  ctx.fillText('Ozwild', x, y)
} */

function loadedDataHandler(e: Event) {
  console.log('AUDIO LOADED', e)

  if (!visualizer.value) {
    console.log('SPAWNING A NEW VISUALIZER')
    const element = e.target
    visualizer.value = spawn(visualizationContainer as HTMLElement, {
      source: element as HTMLMediaElement,
    })
  }

  //visualizer.value?.disconnectInput()
  //visualizer.value?.connectInput(element as HTMLMediaElement)
}

function pausedHandler() {
  visualizer.value?.toggleAnalyzer(false)
}

function playHandler() {
  visualizer.value?.toggleAnalyzer(true)
}
</script>
