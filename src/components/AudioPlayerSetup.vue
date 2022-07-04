<script lang="ts" setup>
import { useAudioPlayer } from '../composables/useAudioPlayer'
import { IAudioPlayerOptions } from '../types/types'

interface IProps extends IAudioPlayerOptions {
  sources: string | string[]
}

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  sources = [],
  autoPlay = false,
  loop = false,
  preload = true,
  html5 = false,
  formats = [],
  xhr = undefined,
} = defineProps<IProps>()

const { play, stop, pause, useSound, isPlaying, duration, progress } =
  useAudioPlayer({
    autoPlay,
    loop,
    preload,
    html5,
    formats,
    xhr,
  })
</script>

<template>
  <div>
    <div>
      <ol>
        <li
          v-for="source in sources"
          :key="source"
          @click="() => useSound(source)"
        >
          {{ source }}
        </li>
      </ol>
    </div>
    <div>
      <ul>
        <li>Is Playing: {{ isPlaying ? 'Yes' : 'No' }}</li>
        <li v-if="progress">Progress: {{ progress.toFixed(2) }}%</li>
        <li>Duration: {{ duration }}</li>
      </ul>
    </div>
    <div>
      <button v-if="!isPlaying" @click="() => play()">Play</button>
      <button v-if="isPlaying" @click="() => stop()">Stop</button>
      <button v-if="isPlaying" @click="() => pause()">Pause</button>
    </div>
  </div>
</template>
