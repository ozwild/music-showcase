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
        <div
          class="layer foreground"
          :class="{
            ['light-theme']: lightTheme,
            ['video-mode']: isOnVideoMode,
          }"
        ></div>
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
        <AnimatedTree />

        <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />
      </div>

      <VideoPlayer
        v-if="currentSong && isOnVideoMode"
        class="media-player"
        :song="currentSong"
        @canplay="loadedVideoDataHandler"
        @pause="pausedHandler"
        @ended="endedHandler"
        @play="playHandler"
      />

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
                @canplay="loadedAudioDataHandler"
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
.layer-1 {
  z-index: 50;
  &.video-mode {
    //filter: opacity(0.4);
  }
}
.layer-2 {
  z-index: 100;
  &.video-mode {
    filter: opacity(0.6);
    mix-blend-mode: hard-light;
    //background-color: orangered;

    &.light-theme {
      filter: opacity(1);
      mix-blend-mode: luminosity;
      background-color: initial;
    }
  }
}
.media-player {
  z-index: 350;
}
.layer-4 {
  z-index: 500;
}
.player-background {
  z-index: -1;
  background-color: #040405;
  &.light-theme {
    background-color: white;

    &.video-mode {
      background-color: initial;
    }
  }
  &.video-mode {
    background-color: #040405;
  }
}
.foreground {
  background-size: 400% 400%;
  background-size: 200% 150%;
  background-image: radial-gradient(
    ellipse at bottom,
    black,
    darkviolet,
    darkorchid
  );
  filter: saturate(2) opacity(0.15);
  background-position: center 75%;

  &.light-theme {
    background-image: radial-gradient(ellipse at bottom, white, wheat, gold);
    // background-image: radial-gradient(ellipse at bottom, white, violet, orchid);
    // background-image: radial-gradient(ellipse at bottom, white, chartreuse, lime);
    filter: saturate(2) opacity(0.25);
  }
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
    position: absolute;
    width: 100%;
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
import { ref, Ref, inject, watch, provide } from 'vue'
import { $ref } from 'vue/macros'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import SongInfo from '@/components/SongInfo.vue'
import SongList from '@/components/SongList.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import ProgressInformation from '@/components/ProgressInformation.vue'
import AnimatedTree from '@/components/AnimatedTree.vue'
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

let videoLoaded = $ref(false)
let audioLoaded = $ref(false)
let currentSong: ISong = $ref()
let previousSong: ISong = $ref()
let isOnVideoMode = $ref(false)

let visualizer: Ref<AudioMotionAnalyzer | null> = ref(null)
let visualizerLoaded = $ref(false)

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
    visualizer.value.gradient = lightTheme.value ? 'light-rainbow' : 'outrun'
    //visualizer.value.loRes = lightTheme
  }
}

function resetPlaybackEnvironment() {
  visualizer.value?.disconnectInput()
  audioLoaded = false
  videoLoaded = false
}

function initializeVisualizer() {
  if (!visualizerLoaded) {
    visualizer.value = spawn(visualizationContainer as HTMLElement, {})
    visualizer.value.gradient = lightTheme.value ? 'light-rainbow' : 'outrun'
    visualizerLoaded = true
  }
}

function loadedVideoDataHandler(element: HTMLMediaElement) {
  initializeVisualizer()
  console.log('AUDIO LOADED', element)
  if (previousSong?.isVideo !== currentSong?.isVideo) {
    resetPlaybackEnvironment()
  }
  if (!videoLoaded) {
    visualizer.value?.connectInput(element)
    videoLoaded = true
  }
}

function loadedAudioDataHandler() {
  initializeVisualizer()

  if (previousSong?.isVideo !== currentSong?.isVideo) {
    resetPlaybackEnvironment()
  }

  if (!audioLoaded && audioElement) {
    visualizer.value?.connectInput(audioElement)
    audioLoaded = true
  }
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
