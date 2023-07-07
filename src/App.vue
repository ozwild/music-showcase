<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMediaDataStore } from './stores/MediaDataStore'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'

useMediaDataStore()
useMediaPlayer()
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');

body {
  background-color: var(--el-bg-color-page);
  margin-top: 0;
}

/* video {
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
  pointer-events: none;
} */

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
</style>

<template>
  <RouterView />
</template>
