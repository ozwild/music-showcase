<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useSongsStore } from './stores/SongBankStore'
import { useData } from './composables/useData'
import { useMediaShell } from './composables/useMediaShell'
import data from './data/DATA.json'

const { parseData } = useData()
const songsStore = useSongsStore()
const parsedData = parseData(data)

songsStore.loadData(parsedData)

useMediaShell()
</script>

<style lang="scss">
:root {
  --oz-app-bars: rgb(32, 0, 51);
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');

html {
  font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 14px;
}

body {
  margin: 0;
}

video {
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 480px;
  z-index: 2000;
  z-index: 10000;
  position: fixed;
  display: block;
  top: 100px;
  right: 100px;
}

audio {
  position: fixed;
  left: 12px;
  bottom: 12px;
  width: 460px;
  z-index: 2000;
  z-index: 10000;
  position: fixed;
  display: block;
  top: 340px;
  left: 100px;
}

canvas.video-canvas {
  position: fixed;
  left: 12px;
  bottom: 12px;
  z-index: 1000;
}
</style>

<template>
  <RouterView />
</template>
