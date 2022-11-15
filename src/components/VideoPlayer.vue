<template>
  <div class="video-player">
    <video
      :src="song.url"
      crossorigin="anonymous"
      ref="videoElement"
      controls
      autoplay
      @play="playHandler"
      @pause="pauseHandler"
      @ended="$emit('ended')"
      @canplay="canPlayHandler"
    >
      <!-- fallback content here -->
    </video>
    <div class="controls" ref="controlsElement">
      <button
        class="play"
        data-icon="P"
        aria-label="play pause toggle"
        @click="playPauseToggle"
      >
        <span v-if="!isPlaying" class="material-symbols-sharp">
          play_arrow
        </span>
        <span v-if="isPlaying" class="material-symbols-sharp"> pause </span>
      </button>
      <button class="stop" data-icon="S" aria-label="stop"></button>
      <div class="timer">
        <div></div>
        <span aria-label="timer">00:00</span>
      </div>
      <button class="rwd" data-icon="B" aria-label="rewind">
        <span class="material-symbols-sharp"> history </span>
      </button>
      <button class="fwd" data-icon="F" aria-label="fast forward">
        <span class="material-symbols-sharp"> update </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.material-symbols-sharp {
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' -25, 'opsz' 40;
}

video {
  width: 360px;
}

.controls {
  visibility: hidden;
  //opacity: 0.5;
  width: 400px;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -200px;
  background-color: black;
  box-shadow: 3px 3px 5px black;
  transition: 1s all;
  display: flex;
}

.player:hover .controls,
.player:focus-within .controls {
  opacity: 1;
}

.timer {
  line-height: 38px;
  font-size: 10px;
  font-family: monospace;
  text-shadow: 1px 1px 0px black;
  color: white;
  flex: 5;
  position: relative;
}

.timer div {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  left: 0;
  top: 0;
  width: 0;
  height: 38px;
  z-index: 2;
}

.timer span {
  position: absolute;
  z-index: 3;
  left: 19px;
}
</style>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import 'material-symbols'
import { ISong } from '@/types/types'

// eslint-disable-next-line vue/no-setup-props-destructure
const { song } = defineProps<{
  song: ISong
}>()

const videoElement: HTMLMediaElement = $ref()
const controlsElement: HTMLElement = $ref()
let isPlaying = $ref(false)

const emit = defineEmits<{
  (e: 'play', event: Event): void
  (e: 'pause', event: Event): void
  (e: 'ended', event: Event): void
  (e: 'canplay', event: Event, videoElement: HTMLMediaElement): void
}>()

function canPlayHandler(e: Event) {
  emit('canplay', e, videoElement)
}

function playHandler(e: Event) {
  isPlaying = true
  emit('play', e)
  console.log('2WATCH ISPLAYING', videoElement)
}

function pauseHandler(e: Event) {
  isPlaying = false
  emit('pause', e)
  console.log('2WATCH ISPLAYING', videoElement)
}

function playPauseToggle() {
  //console.log(isPlaying.value, videoElement.paused)
  if (isPlaying) {
    videoElement.pause()
  } else {
    videoElement.play()
  }
}

onMounted(() => {
  videoElement.removeAttribute('controls')
  controlsElement.style.visibility = 'visible'
})
</script>
