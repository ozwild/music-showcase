<template>
  <Transition name="fade" mode="out-in" :duration="1500">
    <SplashPresentation v-if="showSplash" />
    <AudioPlayerSetup v-else :songs="audioSources" />
  </Transition>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { ISong } from '@/types/types'
import AudioPlayerSetup from '@/components/AudioPlayerSetup.vue'
import SplashPresentation from './components/SplashPresentation.vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'

import {
  playerInjectionKey,
  lightThemeInjectionKey,
} from './utilities/injectionKeys'

import {
  getDefaultLightThemeValue,
  saveDefaultLightThemeValue,
} from '@/utilities/utilities'

import songs from '@/songs.json'

const audioSources: ISong[] = songs

let showSplash = $ref(false)

const lightTheme = ref(getDefaultLightThemeValue())

function toggleLightTheme() {
  lightTheme.value = !lightTheme.value
  saveDefaultLightThemeValue(lightTheme.value)
}

provide(lightThemeInjectionKey, {
  lightTheme,
  toggleLightTheme,
})

const player = useAudioPlayer({
  preload: true,
  html5: false,
  autoPlay: false,
})

provide(playerInjectionKey, player)

setTimeout(() => {
  showSplash = false
}, 4e3)
</script>
<style lang="scss">
html {
  font-family: monospace;
  font-size: 16px;
}
body {
  margin: 0;
}
</style>
