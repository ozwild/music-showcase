<template>
  <div class="media-player">
    <div
      v-if="!minimized"
      class="layer backdrop"
      :class="{
        ['light-theme']: lightTheme,
      }"
    ></div>

    <div class="container" :class="{ minimized: minimized }">
      <div
        class="main"
        :class="{ minimized: minimized, ['light-theme']: lightTheme }"
      >
        <video
          :class="{ minimized: minimized }"
          :src="song.url"
          crossorigin="anonymous"
          ref="videoElement"
          autoplay
          @play="playHandler"
          @pause="pauseHandler"
          @ended="$emit('ended')"
          @canplay="canPlayHandler"
          @loadedmetadata="videoPlayerLoadHandler"
        ></video>

        <div class="overlay" @click="playPauseToggle"></div>

        <div class="controls" ref="controlsElement" v-if="videoElement">
          <div class="timeline" @click="timelineClickHandler">
            <div
              class="fill"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <div
            role="button"
            class="icon-button control play"
            aria-label="play pause button"
            @click="playPauseToggle"
          >
            <span v-if="!isPlaying" class="material-symbols-sharp">
              play_arrow
            </span>
            <span v-if="isPlaying" class="material-symbols-sharp"> pause </span>
          </div>
          <div class="icon-button control stop" aria-label="stop"></div>
          <div class="timer">
            <span aria-label="timer">{{
              `${formatElapsed(currentTime)} / ${formatDuration(duration)}`
            }}</span>
          </div>
          <div
            v-if="!skipBackwardDisabled && !minimized"
            class="icon-button control rwd"
            aria-label="rewind"
            @click="skipBackward"
            @dblclick="() => false"
          >
            <span class="material-symbols-sharp"> replay_10 </span>
            <span class="icon-tooltip">Back 10s</span>
          </div>
          <div
            v-if="!skipForwardDisabled && !minimized"
            class="icon-button control fwd"
            aria-label="fast forward"
            @click="skipForward"
          >
            <span class="material-symbols-sharp"> forward_10 </span>
            <span class="icon-tooltip">Skip 10s</span>
          </div>
          <div
            v-if="!minimized"
            class="icon-button control"
            role="button"
            @click="minimize"
          >
            <span class="button-back"></span>
            <span class="material-symbols-sharp minimize-button"
              >picture_in_picture_alt
            </span>
            <span class="icon-tooltip">Minimizar</span>
          </div>

          <div
            v-if="minimized"
            class="icon-button control"
            role="button"
            @click="expand"
          >
            <span class="button-back"></span>
            <span
              class="material-symbols-sharp minimize-button"
              title="Expandir"
              >open_in_new
            </span>
          </div>

          <div
            v-if="!minimized"
            class="icon-button control"
            role="button"
            @click="fullscreen"
          >
            <span class="button-back"></span>
            <span class="material-symbols-sharp minimize-button"
              >fullscreen
            </span>
            <span class="icon-tooltip">Fullscreen</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-player {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
}

.layer.backdrop {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  filter: opacity(0.4);
  pointer-events: all;
  &.light-theme {
    background: tan;
    filter: opacity(0.2);
  }
}

.container {
  position: fixed;
  z-index: 1500;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  pointer-events: all;
  overflow: hidden;

  &.minimized {
    //width: 240px;
    transform: translate(-50%, -5em);
    top: unset;
    bottom: 0;

    .main {
      @media screen and (max-width: 540px) {
        width: 240px;
        height: auto;

        video {
          transform: scale(1.5) translateY(-2%);
          //height: auto;
        }
      }
    }
  }

  .main {
    display: grid;
    box-shadow: 2px 4px 12px -4px rgb(0 0 0 / 70%);
    width: 75vmin;

    @media screen and (max-width: 540px) {
      width: 100vmin;
      height: 100vmin;
    }

    &.minimized {
      width: 240px;

      video {
        transform: scale(1.5) translateY(-2%);
        height: 100%;
      }
    }

    &.light-theme {
    }

    video {
      width: 100%;

      @media screen and (max-width: 540px) {
        transform: scale(2) translateY(-2%);
        height: 100%;
      }
    }

    &:hover {
      .overlay,
      .controls {
        opacity: 1;
      }
    }

    .overlay {
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.1),
        transparent,
        transparent
      );
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.24s;
      opacity: 0;
    }

    .controls {
      display: flex;
      width: calc(100% - 2em);
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0.5em 1em;
      opacity: 0;
      transition: opacity 0.24s;

      .timeline {
        position: absolute;
        top: -15px;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.2);
        z-index: 2;
        cursor: pointer;
        .fill {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.4);
          left: 0;
          top: 0;
          width: 0;
          height: 4px;
          pointer-events: none;
          //margin: 4px 0;
        }
      }

      .timer {
        color: white;
        flex: 2 auto;
        position: relative;

        span {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
          position: absolute;
          z-index: 3;
          left: 19px;
          line-height: 33px;
          font-size: 14px;
        }
      }
    }

    &:hover .controls,
    &:focus-within .controls {
      opacity: 1;
    }

    &.light-theme {
      .icon-button {
        &.float {
          color: black;
          .button-back {
            background: rgba(180, 1750, 150, 0);
          }
          &:hover {
            .button-back {
              animation: pulse-light 1s cubic-bezier(0.075, 0.82, 0.165, 1)
                infinite;
            }
          }
        }
      }
    }

    &.light-theme {
      .controls {
        //background-color: wheat;
        //background: rgba(200, 200, 200, 0.7);
        .icon-button {
          &.control {
            //color: black;
          }
        }
      }
    }

    &.light-theme {
      .icon-button {
        &.float {
          color: black;
        }
      }
    }

    .icon-button {
      position: relative;
      cursor: pointer;

      &.float {
        color: white;
        .material-symbols-sharp {
          border-radius: 50%;
        }
        .button-back {
          background: rgba(200, 200, 230, 0);
          border-radius: 50%;
          width: 3em;
          height: 3em;
          display: block;
          top: -0.5em;
          left: -0.5em;
          position: absolute;
          z-index: 0;
          transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          transform: scale(0.65);
        }

        &:hover {
          .button-back {
            animation: pulse-dark 1s cubic-bezier(0.075, 0.82, 0.165, 1)
              infinite;
          }
        }
      }
    }

    .icon-button {
      &.control {
        position: relative;
        padding: 0 0.5em;
        text-align: center;
        opacity: 0.85;
        color: white;
        text-shadow: 0 1px rgb(0 0 0 / 40%);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        .icon-tooltip {
          visibility: hidden;
          position: absolute;
          font-size: 0.8em;
          font-family: system-ui;
          background: rgba(40, 40, 40, 0.85);
          border-radius: 4px;
          padding: 0.25em 0.5em;
          white-space: nowrap;
          bottom: 0;
          left: 1em;
          transform: translate(-50%, -4.5em);
          transition: all 0.24s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        &:hover {
          .icon-tooltip {
            visibility: visible;
          }
        }
      }

      .material-symbols-sharp {
        position: relative;
        z-index: 1;
        color: inherit;
        font-size: 2em;
        user-select: none;
      }

      &:hover {
        &.control {
          opacity: 0.9;
        }
      }
    }

    &.minimized {
      .icon-button {
        &.float {
          .button-back {
            width: 2em;
            height: 2em;
            top: -0.25em;
            left: -0.25em;
          }
        }
        .material-symbols-sharp {
          font-size: 1.5em;
        }
      }
    }
  }
}

.material-symbols-sharp {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

@keyframes pulse-dark {
  from {
    background: rgba(85, 25, 90, 0);
    transform: scale(0.65);
    box-shadow: 0 0 12px -2px rgba(200, 0, 200, 1);
  }
  to {
    background: rebeccapurple;
    transform: scale(1);
    box-shadow: 0 0 12px -6px rgba(200, 0, 200, 1);
  }
}

@keyframes pulse-light {
  from {
    background: rgba(200, 200, 230, 0);
    transform: scale(0.65);
  }
  to {
    background: rgba(200, 200, 230, 1);
    transform: scale(1);
  }
}
</style>

<script lang="ts" setup>
import { computed, onMounted, watch, inject } from 'vue'
import 'material-symbols'
import { ILightThemeInjection } from '@/types/types'
import { ISong } from '@/data/types'
import { lightThemeInjectionKey } from '@/utilities/injectionKeys'
import { formatDuration, formatElapsed } from '@/utilities/format'
import { usePlayerStore } from '@/stores/PlayerStore'

// eslint-disable-next-line vue/no-setup-props-destructure
const { song } = defineProps<{
  song: ISong
}>()

const videoElement: HTMLMediaElement = $ref()
const controlsElement: HTMLElement = $ref()
const { lightTheme } = inject(lightThemeInjectionKey) as ILightThemeInjection
const skipSize = $ref(10)

const playerStore = usePlayerStore()

console.log('Is Playing (store)', playerStore.isPlaying)

let isPlaying = $ref(false)
let duration = $ref(0)
let currentTime = $ref(0)
let minimized = $ref(false)
let skipBackwardDisabled = $ref(true)
let skipForwardDisabled = $ref(true)
let audioOnlyMode = $ref(false)

const emit = defineEmits<{
  (e: 'play', event: Event): void
  (e: 'pause', event: Event): void
  (e: 'ended', event: Event): void
  (e: 'canplay', videoElement: HTMLMediaElement): void
}>()

const progressPercentage = computed(() => (currentTime / duration) * 100)

function canPlayHandler() {
  duration = videoElement.duration
  videoElement.addEventListener('timeupdate', timeUpdateHandler)
}

function videoPlayerLoadHandler() {
  emit('canplay', videoElement)
}

function timeUpdateHandler() {
  currentTime = videoElement.currentTime
  updateSkipDisables()
}

function updateSkipDisables() {
  skipBackwardDisabled = currentTime <= 0
  skipForwardDisabled = currentTime >= duration
}

function playHandler(e: Event) {
  isPlaying = true
  playerStore.isPlaying = true
  emit('play', e)
}

function pauseHandler(e: Event) {
  isPlaying = false
  playerStore.isPlaying = false
  emit('pause', e)
}

function playPauseToggle() {
  if (isPlaying) {
    videoElement.pause()
  } else {
    videoElement.play()
  }
}

function timelineClickHandler(e: MouseEvent) {
  const { offsetX } = e
  const { clientWidth } = e.target as Element

  const wasPlaying = isPlaying

  if (offsetX && clientWidth) {
    if (wasPlaying) videoElement.pause()
    videoElement.currentTime = (offsetX / clientWidth) * duration
    if (wasPlaying) videoElement.play()
  }
}

function skipForward() {
  const { currentTime, duration } = videoElement

  if (currentTime + skipSize < duration) {
    videoElement.currentTime += skipSize
  } else {
    videoElement.currentTime = duration
    videoElement.pause()
  }
}

function skipBackward() {
  const { currentTime } = videoElement

  if (currentTime - skipSize > 0) {
    videoElement.currentTime -= skipSize
  } else {
    videoElement.currentTime = 0
    videoElement.pause()
  }
}

function minimize() {
  minimized = true
}

function expand() {
  minimized = false
}

function fullscreen() {
  videoElement.requestFullscreen()
}
</script>
