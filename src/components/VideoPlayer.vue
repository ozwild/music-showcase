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
          controls
          autoplay
          @play="playHandler"
          @pause="pauseHandler"
          @ended="$emit('ended')"
          @canplay="canPlayHandler"
        ></video>

        <div class="controls" ref="controlsElement">
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
            <div></div>
            <span aria-label="timer">00:00</span>
          </div>
          <div class="icon-button control rwd" aria-label="rewind">
            <span class="material-symbols-sharp"> history </span>
          </div>
          <div class="icon-button control fwd" aria-label="fast forward">
            <span class="material-symbols-sharp"> update </span>
          </div>
          <div
            v-if="!minimized"
            class="icon-button float"
            role="button"
            @click="minimize"
          >
            <span class="button-back"></span>
            <span
              class="material-symbols-sharp minimize-button"
              title="Minimizar"
              >expand_more</span
            >
          </div>

          <div
            v-if="minimized"
            class="icon-button float"
            role="button"
            @click="expand"
          >
            <span class="button-back"></span>
            <span
              class="material-symbols-sharp minimize-button"
              title="Expandir"
              >expand_less</span
            >
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
  bottom: 0;
  left: 50%;
  display: flex;
  //padding: 1em;
  border-radius: 4px;
  transform: translate(-50%, -40vh);
  mix-blend-mode: hard-light;
  width: 75vmin;
  pointer-events: all;

  &.minimized {
    width: 240px;
    transform: translate(-50%, -5em);
  }

  .main {
    display: grid;
    background-image: linear-gradient(
      45deg,
      white,
      rgba(200, 0, 200, 0.2),
      rgba(0, 200, 200, 0.2),
      rgba(0, 0, 0, 0.5)
    );
    background-size: 200%;
    box-shadow: 2px 4px 12px -4px rgb(0 0 0 / 70%);
    filter: grayscale(0.3) contrast(1.3);
    filter: grayscale(0.3) contrast(1.3) brightness(1.1) saturate(1.2);

    &.light-theme {
      background-image: linear-gradient(
        45deg,
        white,
        rgba(200, 120, 50, 0.25),
        rgba(90, 200, 50, 0.3),
        black
      );
    }

    video {
      filter: grayscale(0.5);
      mix-blend-mode: luminosity;
      width: 75vmin;

      &.minimized {
        width: 240px;
      }
    }

    .controls {
      background-color: black;
      display: flex;
      width: 100%;
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
        background-color: wheat;
        background: rgba(200, 200, 200, 0.7);
        .icon-button {
          &.control {
            color: black;
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
        padding: 0 0.5em;
        text-align: center;
        opacity: 0.65;
        color: white;
        transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .material-symbols-sharp {
        position: relative;
        z-index: 1;
        color: inherit;
        font-size: 2em;
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

.player:hover .controls,
.player:focus-within .controls {
  opacity: 1;
}

.timer {
  color: white;
  flex: 2 auto;
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
import { computed, onMounted, watch, inject } from 'vue'
import 'material-symbols'
import { ISong, ILightThemeInjection } from '@/types/types'
import { lightThemeInjectionKey } from '@/utilities/injectionKeys'

// eslint-disable-next-line vue/no-setup-props-destructure
const { song } = defineProps<{
  song: ISong
}>()

const videoElement: HTMLMediaElement = $ref()
const controlsElement: HTMLElement = $ref()
const { lightTheme } = inject(lightThemeInjectionKey) as ILightThemeInjection

let isPlaying = $ref(false)
let minimized = $ref(false)
let audioOnlyMode = $ref(false)

const emit = defineEmits<{
  (e: 'play', event: Event): void
  (e: 'pause', event: Event): void
  (e: 'ended', event: Event): void
  (e: 'canplay', event: Event, videoElement: HTMLMediaElement): void
}>()

watch(
  () => song,
  () => {
    audioOnlyMode = !song?.isVideo
  }
)

onMounted(() => {
  videoElement.removeAttribute('controls')
  controlsElement.style.visibility = 'visible'
})

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

function minimize() {
  minimized = true
}

function expand() {
  minimized = false
}
</script>
