<template>
  <Transition name="fade" mode="out-in" :duration="1500">
    <SplashPresentation v-if="showSplash" />
    <HelloWorld v-else />
  </Transition>
</template>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import SplashPresentation from './components/SplashPresentation.vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { provide } from 'vue'
import { playerInjectionKey } from './utilities/injectionKeys'

let showSplash = $ref(false)

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
