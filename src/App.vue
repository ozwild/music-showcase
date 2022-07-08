<template>
  <Transition name="fade" mode="out-in" :duration="1500">
    <SplashPresentation v-if="showSplash" />
    <HelloWorld v-else />
  </Transition>
</template>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import SplashPresentation from './components/SplashPresentation.vue'

let showSplash = $ref(true)

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
