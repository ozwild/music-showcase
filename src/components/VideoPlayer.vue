<template>
  <div class="media-player">
    <div
      v-if="!videoTinyMode"
      class="layer backdrop"
      :class="{
        ['light-theme']: lightTheme,
      }"
    ></div>

    <div class="container" :class="{ minimized: videoTinyMode }">
      <div
        class="main"
        :class="{ minimized: videoTinyMode, ['light-theme']: lightTheme }"
      >
        <video
          :class="{ minimized: videoTinyMode }"
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
        <div class="top-bar">
          <div v-if="!videoTinyMode" class="icon-button" @click="minimize">
            <span class="button-back"></span>
            <span
              class="material-symbols-sharp minimize-button"
              title="Minimizar"
              >expand_more</span
            >
          </div>

          <div v-if="videoTinyMode" class="icon-button" @click="expand">
            <span class="button-back"></span>
            <span
              class="material-symbols-sharp minimize-button"
              title="Expandir"
              >expand_less</span
            >
          </div>
        </div>
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
  /* width: 100vw;
      height: 100vh; */
  display: flex;
  padding: 1em;
  border-radius: 4px;
  //top: 50%;
  //left: 50%;
  transform: translate(-50%, -40vh);
  mix-blend-mode: hard-light;
  //position: relative;
  //transition: all 0.2s;
  width: 75vmin;
  pointer-events: all;

  &.minimized {
    width: 240px;
    //position: initial;
    //transform: unset;
    transform: translate(-50%, -5em);
  }

  .main {
    //position: relative;
    //display: block;
    //width: 100%;
    //filter: contrast(1.3) brightness(1.1) saturate(1.2);
  }

  .main {
    filter: grayscale(0.3) contrast(1.3);
    filter: grayscale(0.3) contrast(1.3) brightness(1.1) saturate(1.2);
    display: flex;
    background-image: linear-gradient(
      45deg,
      white,
      rgba(200, 0, 200, 0.2),
      rgba(0, 200, 200, 0.2),
      rgba(0, 0, 0, 0.5)
    );
    background-size: 200%;
    box-shadow: 2px 4px 12px -4px rgb(0 0 0 / 70%);

    &.light-theme {
      background-image: linear-gradient(
        45deg,
        white,
        rgba(200, 120, 50, 0.25),
        rgba(90, 200, 50, 0.3),
        black
      );
      &.minimized {
        border: 4px solid white;
      }
    }

    &.minimized {
      border: 4px solid rgba(200, 200, 150, 0.4);
      border-radius: 4px;
    }

    video {
      filter: grayscale(0.5);
      mix-blend-mode: luminosity;
      width: 75vmin;

      &.minimized {
        width: 240px;
      }
    }

    .top-bar {
      display: flex;
      flex-direction: column;
      background: transparent;
      position: absolute;
      top: -1em;
      right: -1.1em;
    }

    &.minimized {
      .top-bar {
        top: -1em;
        right: -1.1em;
      }
    }

    &.light-theme {
      .icon-button {
        .material-symbols-sharp {
          color: black;
        }
        .button-back {
          background: rgba(250, 250, 250, 0.7);
        }

        &:hover {
          .button-back {
            animation: pulse-light 1s cubic-bezier(0.075, 0.82, 0.165, 1)
              infinite;
          }
        }
      }
    }

    .icon-button {
      position: relative;
      cursor: pointer;
      margin: 0.25em 0.25em;

      .material-symbols-sharp {
        position: relative;
        border-radius: 50%;
        z-index: 1;
        color: white;
        font-size: 2em;
      }

      .button-back {
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        width: 3em;
        height: 3em;
        display: block;
        top: -0.5em;
        left: -0.5em;
        position: absolute;
        z-index: 0;
        transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        transform: scale(0.75);
      }

      &:hover {
        .button-back {
          animation: pulse-dark 1s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
        }
      }

      &::after {
        content: '';
      }
    }

    &.minimized {
      .icon-button {
        .material-symbols-sharp {
          font-size: 1.5em;
        }
        .button-back {
          width: 2em;
          height: 2em;
          top: -0.25em;
          left: -0.25em;
        }
      }
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
  }
}

.material-symbols-sharp {
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' -25, 'opsz' 40;
}

@keyframes pulse-dark {
  from {
    background: rgba(0, 0, 0, 0.4);
    transform: scale(0.5);
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
    background: rgba(0, 0, 0, 0.4);
    transform: scale(0.5);
    box-shadow: 0 0 12px -2px rgba(200, 0, 200, 1);
  }
  to {
    background: wheat;
    transform: scale(1);
    box-shadow: 0 0 12px -6px rgba(200, 0, 200, 1);
  }
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
let videoTinyMode = $ref(false)
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
  videoTinyMode = true
}

function expand() {
  videoTinyMode = false
}
</script>
