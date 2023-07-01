<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMediaDataStore } from './stores/MediaDataStore'
import { useMediaPlayer } from './player/useMediaPlayer'

useMediaDataStore()
useMediaPlayer()
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');

body {
  background-color: var(--el-bg-color-page);
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
  left: 50%;
  bottom: 2em;
  transform: translateX(-50%);
  z-index: 1;
  border-radius: 50%;
  box-shadow: var(--el-box-shadow-light);
}
</style>

<template>
  <RouterView />
</template>
./player/usePlayer ./stores/MediaDataStore
