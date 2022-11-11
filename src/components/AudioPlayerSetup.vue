<template>
  <Transition appear>
    <div id="player">
      <div
        class="layer player-background"
        :class="{ ['light-theme']: lightTheme, ['video-mode']: isOnVideoMode }"
      ></div>
      <div
        class="layer layer-1"
        :class="{ ['light-theme']: lightTheme, ['video-mode']: isOnVideoMode }"
      >
        <div v-if="!lightTheme" class="layer foreground"></div>
      </div>

      <div
        class="layer layer-2"
        :class="{ ['light-theme']: lightTheme, ['video-mode']: isOnVideoMode }"
      >
        <Transition>
          <div
            id="visualization-container"
            :class="{
              ['light-theme']: lightTheme,
              ['video-mode']: isOnVideoMode,
            }"
            ref="visualizationContainer"
          />
        </Transition>
        <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />
      </div>

      <div class="layer layer-3" v-if="currentSong && isOnVideoMode">
        <div class="video-player-wrapper">
          <div class="layer backdrop"></div>
          <div class="video-player-container">
            <video
              ref="videoElement"
              class="video-player"
              :src="currentSong?.url"
              crossorigin="anonymous"
              @canplay="loadedDataHandler"
              @pause="pausedHandler"
              @ended="endedHandler"
              @play="playHandler"
              controls
              autoplay
            ></video>
          </div>
        </div>
      </div>

      <div class="bottom-bar layer-4">
        <div class="box">
          <div class="bar-container">
            <div class="controls">
              <SongInfo :song="currentSong" />
              <audio
                v-if="currentSong && !currentSong?.isVideo"
                ref="audioElement"
                :src="currentSong?.url"
                crossOrigin="anonymous"
                @canplay="loadedDataHandler"
                @pause="pausedHandler"
                @ended="endedHandler"
                @play="playHandler"
                controls
                autoplay
              ></audio>
              <button @click="toggleLoRes">Lo Res.</button>
              <button @click="toggleAppTheme">Theme</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.layer-1 {
  z-index: 50;
  &.video-mode {
    filter: opacity(0.4);
  }
}
.layer-2 {
  z-index: 100;
  &.video-mode {
    //filter: blur(3px) opacity(0.6);
  }
}
.layer-3 {
  z-index: 500;
}
.layer-4 {
  z-index: 500;
}
.player-background {
  z-index: -1;
  background-color: #040405;
  &.light-theme {
    background-color: white;
  }
  &.video-mode {
    background-color: #040405;
  }
}
.foreground {
  background-color: #040405;
  mix-blend-mode: hue;
}
#visualization-container {
  position: fixed;
  z-index: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  //filter: blur(3px) opacity(0.5);
  /* &.light-theme {
    filter: blur(3px);
  } */

  canvas {
    width: 100%;
  }
}
video.background-video {
  position: fixed;
  top: 0;
  filter: blur(1px) opacity(0.6);
  filter: opacity(0.5) contrast(1.2);
}
.video-player-wrapper {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .layer.backdrop {
    background: black;
    filter: opacity(0.4);
  }
  .video-player-container {
    display: flex;
    padding: 2em;
    background: black;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    video.video-player {
      position: relative;
      display: block;
      width: 64%;
      filter: contrast(1.3) brightness(1.1) saturate(1.2);
    }
  }
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
import { ref, Ref, inject, Transition, onMounted, watch } from 'vue'
import { $ref } from 'vue/macros'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import SongInfo from '@/components/SongInfo.vue'
import SongList from '@/components/SongList.vue'
import ProgressInformation from '@/components/ProgressInformation.vue'
import { useAudioVisualizer } from '@/composables/useAudioVisualizer'
import { IAudioPlayerOptions, ISong, ILightThemeInjection } from '@/types/types'
import { lightThemeInjectionKey } from '@/utilities/injectionKeys'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

const { spawn } = useAudioVisualizer()
const { lightTheme, toggleLightTheme } = inject(
  lightThemeInjectionKey
) as ILightThemeInjection

const visualizationContainer: HTMLElement = $ref()
const audioElement: HTMLMediaElement = $ref()
const videoElement: HTMLMediaElement = $ref()
//const backgroundVideoElement: HTMLMediaElement = $ref()
let visualizer: Ref<AudioMotionAnalyzer | null> = ref(null)
let visualizerLoaded = $ref(false)
let videoLoaded = $ref(false)
let audioLoaded = $ref(false)
let currentSong: ISong = $ref()
let previousSong: ISong = $ref()
//let lightTheme = $ref(false)
let isOnVideoMode = $ref(false)

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

// eslint-disable-next-line @typescript-eslint/no-empty-function
function play() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function stop() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function pause() {}

const playSong = (song: ISong) => {
  if (currentSong) {
    previousSong = currentSong
  }
  currentSong = song
}

function toggleLoRes() {
  if (visualizer.value) {
    visualizer.value.loRes = !visualizer.value.loRes
  }
}

function toggleAppTheme() {
  toggleLightTheme()
  if (visualizer.value) {
    visualizer.value.gradient = lightTheme.value ? 'light' : 'outrun'
    //visualizer.value.loRes = lightTheme
  }
}

function resetPlaybackEnvironment() {
  visualizer.value?.disconnectInput()
  audioLoaded = false
  videoLoaded = false
}

function loadedDataHandler(e: Event) {
  console.log('AUDIO LOADED', e, visualizer.value?.connectedSources)

  if (!visualizerLoaded) {
    console.log('SPAWNING A NEW VISUALIZER')
    visualizer.value = spawn(visualizationContainer as HTMLElement, {})
    visualizer.value.gradient = lightTheme.value ? 'light' : 'outrun'
    visualizerLoaded = true
  }

  if (previousSong?.isVideo !== currentSong?.isVideo) {
    resetPlaybackEnvironment()
  }

  if (!audioLoaded && audioElement) {
    visualizer.value?.connectInput(audioElement)
    audioLoaded = true
    /* setTimeout(() => {
      visualizer.value?.connectInput(audioElement)
      audioLoaded = true
    }, 500) */
  }

  if (!videoLoaded && videoElement) {
    visualizer.value?.connectInput(videoElement)
    videoLoaded = true
    /* setTimeout(() => {
      visualizer.value?.connectInput(videoElement)
      videoLoaded = true
    }, 500) */
  }

  //visualizer.value?.disconnectInput()
  //visualizer.value?.connectInput(element as HTMLMediaElement)
}

watch(
  () => currentSong,
  () => {
    isOnVideoMode = !!currentSong?.isVideo
  }
)

function playHandler() {
  //if (backgroundVideoElement) backgroundVideoElement.play()

  visualizer.value?.toggleAnalyzer(true)
}

function endedHandler() {
  visualizer.value?.toggleAnalyzer(false)
}
function pausedHandler() {
  //if (backgroundVideoElement) backgroundVideoElement.pause()
  visualizer.value?.toggleAnalyzer(false)
}
</script>
